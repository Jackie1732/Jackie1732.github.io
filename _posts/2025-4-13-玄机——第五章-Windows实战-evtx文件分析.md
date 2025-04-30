---
layout: post
title: 玄机——第五章-Windows实战-evtx文件分析
---

首先我们需要下载附件，并查看windows系统日志`evtx`文件。翻看`security`日志下的事件ID`4624`，我们可以得知黑客远程登录Windows的IP为`192.168.36.133`。注意windows登录日志记录的事件ID为`4624`&`4625`

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/第五章-Windows实战-evtx文件分析/01.png?raw=true)

黑客修改了登陆用户的用户名。我们需要查看`security`日志并尝试捕捉到修改后的用户名。这里打了一个小非预期。已知黑客大概率上线后会提权，我们直接查看分配特权的事件ID`4672`，在众多系统账户中找到一个可疑账户的权限分配。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/第五章-Windows实战-evtx文件分析/02.png?raw=true)

正常的预期做法是查看`4720`、`4722`、`4732`,对应为创建用户账户、启用用户账户、向安全组内添加成员。注意`4728`是添加至全局组,`4732`是添加至本地组。

接下来审计恶意用户尝试访问的关键文件名称。我们转向事件ID`4663`，即试图访问对象的记录日志。这里有几个敏感文件都记录了位置，就需要我们猜一下了。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/第五章-Windows实战-evtx文件分析/03.png?raw=true)

经尝试此文件即为我们要提交的目标文件名。

接下来需要我们审计最后一次重启数据库服务的进程ID号。转向应用程序日志，按时间排序并审计来源于`Mysql`的日志。除去12月的日志，10月日志最后一次mysql启动的日志如下

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/第五章-Windows实战-evtx文件分析/04.png?raw=true)

最后我们需要统计黑客上线后对系统执行的重启的次数。转向`System`日志，查询事件ID`1074`，统计后发现此恶意账户重启了两次电脑。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/第五章-Windows实战-evtx文件分析/05.png?raw=true)

注意修改用户名后使用其用户第一次的`reboot`，日志并不会将其记录为该用户的`reboot`请求，而会记录为SYSTEM发起的windows更新请求。