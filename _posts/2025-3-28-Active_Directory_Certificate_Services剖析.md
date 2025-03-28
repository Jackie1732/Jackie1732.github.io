---
layout: post
title: ADCS中各项技术详解与剖析
---

## 0x01 Active Directory 证书服务简介

---

​	AD CS(Active Directory Certificate Services)服务为一个Windows Server角色，旨在为负责颁发与管理在安全通信与身份验证协议中所使用的公钥基础结构(PKI)证书。数字证书可用于对电子文档与消息进行加密和数字签名，保证数据的完整性与保密性。AD CS服务主要包含以下重要组成：

### 1.证书颁发机构CA(Certificate Authority)

​	证书颁发机构是整个公钥基础设施(PKI)中的核心组件，负责生成、管理、分发与撤销数字证书。在AD CS中，通常会根据业务类型的不同，部署一层或多层CA层次结构，常见的CA结构有根CA、下级CA、策略CA&中间CA。CA的主要功能模块有证书模板、自动注册、CRL发布、AIA发布、证书注册管理&OSCP响应器。对于CA的功能模块与具体操作，在后文的证书处理过程会详细介绍。

### 2.Web注册(Web Enrollment)

​	Web注册使得用户可以通过Web浏览器连接到CA，以便申请证书和检索证书吊销列表(CRL)。用户无需直接访问CA服务器，就可以远程申请证书和查询证书状态。在CA服务器上，管理员可以通过Windows Server的功能向导来安装Web注册组件。安装完成后，Web注册会通过IIS(Internet Information Services)来提供服务。

### 3.联机响应程序OCSP(Online Certificate Status Protocol)

​	OCSP是一种用于实时查询证书状态的协议。在AD CS环境中，联机相应程序服务(OCSP 响应器)允许客户端系统快速检查证书是否被吊销。OCSP响应器通过向客户端返回已签名的响应来提供证书的吊销状态信息，确保证书在其生命周期内始终处于有效状态。OCSP机制与证书吊销列表CRL相对，用于消除CRL中可能存在的延迟和过时的证书吊销信息，提供了更及时和实时的证书状态验证。

### 4.网络设备注册服务NDES(Network Device Enrollment Service)

​	NDES允许不具有域账户的网络设备想证书颁发机构请求并获取证书。该服务通过使用Simple Certificate Enrollment Protocol(SCEP)协议实现设备的自动化证书注册，从而使设备能够参与到企业的公钥基础设施环境中，提升网络的安全性。

### 5.TPM密钥证明(TPM Key Attestation)

​	TPM密钥证明技术通过受信任的平台模块(TPM)来加强证书安全性。TPM是一种硬件安全模块，用于保护私钥和其他加密信息。TPM密钥证明允许证书颁发机构CA验证私钥是否收到TPM硬件的保护，并且TPM是否受信任，从而确保私钥不会被导出到未经授权的设备，并将用户身份和设备紧密绑定。

### 6.证书注册策略Web服务(Certificate Enrollment Policy Web Service)

​	证书注册策略Web服务允许客户端通过Web服务获取与证书注册相关的策略信息。通过该服务，客户端可以了解哪些证书模板、申请规则以及证书注册策略在其环境中可用，进而决定如何正确地请求和申请证书。

### 7.证书注册Web服务(Certificate Enrollment Web Service)

​	证书注册Web服务与证书注册策略Web服务配合使用时，证书注册Web服务能够在客户端计算机不是域成员，或者域成员计算机未连接到域的情况下，基于策略进行证书注册。

---

## 0x02 Active Directory 证书生成流程

---

### 1.证书请求阶段

​		客户端需要请求证书。首先客户端会生成一对公钥和私钥，在生成密钥对时，客户端会选择一个加密算法(RSA、ECC等)，常见长度为2048位(RSA)或更长，256位或384位(ECC)。将生成的公钥和私钥分别存储在客户端设备上。
​	客户端通过证书注册Web服务向CA提交一个证书请求文件，该文件包含了客户端的公钥、证书用途(身份验证、加密、数字签名等)以及其他相关信息。在生成证书请求时，客户端通常会使用PKCS#10格式来封装证书申请信息。

### 2.证书注册策略Web服务查询

​	在请求过程中，客户端会域证书注册策略Web服务进行交互，获取证书请求所需的策略信息。该服务会提供注册模板和证书申请规则。

### 3.证书请求提交和审批

​	客户端通过证书注册Web服务将请求提交给证书颁发机构CA。CA会审核证书请求，确认申请者身份是否合法。证书请求通过审批后，CA会使用其私钥签发证书。

### 4.证书生成

​	CA会对客户端的公钥进行签名，生成证书。证书包含：申请者的公钥、申请者的身份信息、签发者CA的信息、证书有效期等。CA生成的证书通常是X.509格式，一旦CA签发了证书，客户端会将其下载并存储在本地证书存储区，供后续使用。

---

## 0x03 Kerberos身份验证增强——PKINIT技术

---

### 1.传统的PKCA认证流程

#### 1.1 Step 1

​	client向服务端，即KDC(Key Distribution Center,密钥分发中心)发送用户信息，包括计算机名,IP地址,TGS(Ticket Granting Service,票据授予服务)等域控信息。KDC接受后验证收到的信息是否存在于AD(Account Database,账户数据库)中，如果均存在就返回：

- 存储于AD中的client的username对应的hash加密的SessionKey，此SessionKey为随机生成；

- KDC通过KDC内部某个特定用户对应的NTLM hash加密SessionKey和客户端信息，这里的SessionKey与上一点的SessionKey一致，加密完成后一同发送给客户端。(即TGT。注意此处的KDC内部特定账户一般指Windows Active Directory域内的krbtgt用户，此账户密钥为KDC保存的专用密钥，用于加密TGT，确保只有KDC可以解密该票证。在Windows AD域内的权限维持技术中的黄金票据制作中就涉及到krbtgt账户的NTLM hash，限于篇幅此处不作详细介绍)

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/ADCS-homework/01.jpg?raw=true)

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/ADCS-homework/02.jpg?raw=true)

#### 1.2 step 2

​	client继续向服务端KDC发送消息，TGT(Ticket Granting Ticket,票据中心授予的票据)、用客户端hash解出的SessionKey、使用SessionKey加密的消息(client消息、时间戳客户端信息)、服务端信息、client info。

​	服务端KDC收到消息后，TGS没有SessionKey，但收到的TGT拥有SessionKey，TGS可以用KDC中特定账户的Hash解密TGT，然后利用得到的TGT中的SessionKey来解密客户端发来的使用SessionKey加密的信息，解密后校验时间戳(防重放攻击)。通过校验后，比较SessionKey加密中的客户端信息于第一步中返回给客户端TGT中的客户端信息是否相同，认证通过后将返回一个数据包给客户端。包中包含：

- 用之前的SessionKey加密的Server SessionKey(KDC又一次随机生成的一串随机字符，用于客户端与服务端通信的SessionKey，没有则无法认证)；

- 返回的票据Ticket，内容是上一步中的服务器各项信息与票据的到期时间endtime。KDC通过服务器信息中的计算机名去AD提取对应的Hash(Server SessionKey)值，来加密票据。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/ADCS-homework/03.jpg?raw=true)

#### 1.3 step 3

​	client无法解密Ticket，但是client中拥有Server SessionKey，用其加密client信息与时间戳发送给服务端。服务端首先使用特定账户的Hash解密Ticket，Ticket中包含Server SessionKey，服务端利用Server SessionKey去解密收到的客户端信息与时间戳，拿去与票据中的信息比较，来判断票据中的到期时间。

### 2.Kerberos协议扩展——PKINIT机制

#### 2.1 传统Kerberos的局限性

​	传统的Kerberos协议在最初的AS(Authentication Service,获取TGT阶段)时，主要依赖于用户口令或口令派生的对称密钥来核对AS-REQ/AS-REP进行加密与验证。若用户密码为弱口令、或遭到泄露，攻击者就有机会离线暴力破解票据中的加密内容，从而冒充用户。

#### 2.1.1 AS-REP Roasting攻击

​	此项攻击技术的原理是基于AD域环境中的配置不当问题。Kerberos预身份验证配置是默认情况下为Active Directory环境中的每个用户启用的一项功能。当用户需要访问资源时，Kerberos预身份验证过程首先向驻留于DC(Domain Controller,域控制器)上的密钥分发中心KDC发送AS-REQ(Authentication Server Request,身份验证服务器请求)信息。该请求消息包含一个时间戳，并使用发出请求的用户NTLM hash进行加密。KDC将时间戳与自己的用户NTLM hash记录进行匹配，并使用AS-REP(Authentication Server Response,身份验证服务器响应)消息进行响应。此AS-REP中包含加密的TGT与请求用户的NTLM hash值。
​	但如果域用户禁用了Kerberos预身份验证，攻击者就可以请求该用户的身份验证数据，KDC将返回一条带有加密TGT的AS-REP消息，此消息可以离线破解以获取受害者账户的密码。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/ADCS-homework/04.jpg?raw=true) 

​	我们可以使用hashcat、john等密码爆破工具，尝试爆破上述密文并获取用户密码。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/ADCS-homework/05.jpg?raw=true)

#### 2.1.1 Kerberoasting攻击

​	首先我们介绍SPN(Service Principal Name,主体服务名称)。SPN为服务实例的唯一标识符。Active Directory域服务和Windows提供对服务主体名称SPN的支持，SPN是Kerberos机制的关键组件，客户端通过对该机制对服务进行身份验证。若想使用Kerberos协议来认证服务，那么必须正确配置SPN。在Kerberos使用SPN对服务进行身份认证之前，必须在服务实例用于登录的账户对象上注册SPN，并且只能在一个账户上注册给定的SPN。如果服务实例的登陆账户发生改变，必须在新账户下重新注册SPN。当客户端想要连接到某个服务时，他将查找该服务的实例，并为该实例编写SPN，然后连接到该服务并显示服务的SPN以进行身份验证。

​	Kerberos使用所请求服务的NTLM hash来加密给定服务主体名称(SPN)的KRB_TGS票据。当域用户向域控制器KDC发送针对已注册SPN的任何服务的TGS票据请求时，KDC会生成KRB_TGS。攻击者可以离线使用爆破工具来暴力破解服务账户的密码，因为该票据已使用服务账户的NTLM hash进行了加密。

### 2.2 PKINIT技术

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/ADCS-homework/06.jpg?raw=true)

​	为预防上述离线爆破等安全隐患，我们引入证书服务(即AD CS)来解决AD域中的票据传递所引起的密钥爆破&NTLM hash泄露造成的PTH(Pass The Hash,哈希传递)。

#### 2.2.1 客户端生成密钥对

​	首先Client在Windows证书存储(Windows Certificate Store)中生成一对公私钥，用于后续的身份验证和代码签名等。Client在本地再生成CSR(Certificate Signing Request,准备证书请求)，其中包含：1.主题信息Subject：标识证书所有者，如CN=User或CN=ServiceName等；2.上一步生成的公钥；3.EKU(Extended Key Usage,扩展密钥用法)：表示证书可悲用于代码签名或客户端身份验证等的用途，如”Code-Signing”、”Client Authentication”等。

​	在Windows AD域环境中，企业CA往往还会配置各种证书的模板。客户端可以根据需要选择合适的模板，使得CA能够依据模板进行颁发策略和权限检查。CVE-2022-26923的利用条件之一就有含有漏洞的证书模板，在下文中会有详细介绍。

#### 2.2.2 客户端向企业CA提交CSR

​	客户端通过企业CA的接口(例如通过MMC中的”证书颁发”插件，或通过自动注册机制、使用certreq命令行工具等)将CSR发送给企业CA，其中包含客户端公钥、Subject信息以及扩展属性等。

​	CA首先根据客户端请求中所使用的证书模板进行匹配。检查CSR的各项配置是否符合模板要求，并校验用户在AD域内的权限，确定其是否有足够权限申请此类型的证书。

#### 2.2.3 企业CA签发并返回证书

​	当模板和权限检查通过后，企业CA根据CSR生成最终的X.509证书，证书中包含客户端公钥、主题名称、有效期及EKU等信息。CA使用自己的私钥对证书进行数字签名，保证证书完整性和合法性。CA将签名好的证书返回给Client。Client将证书存储到本地的Windows证书存储中，与私钥进行绑定。

---

## 0x04 传统Kerberos认证流量分析

---

​	分析Kerberos协议报文时笔者将选用Rootkit.org环境进行详细的抓包分析。登录进入域内jerry账户，我们先klist purge把所有的缓存票据给清空。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/ADCS-homework/07.jpg?raw=true)

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/ADCS-homework/08.jpg?raw=true) 

​	接下来我们使用Rubeus.exe进行域内任意用户票据的请求。清空wireshark的数据包，我们进行administrator用户的票据的请求。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/ADCS-homework/09.jpg?raw=true)

​	请求到了administrator的TGT，我们再使用此TGT进行ST的请求。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/ADCS-homework/10.jpg?raw=true)

​	最后我们就可以使用此获得的票据，直接访问域控的服务。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/ADCS-homework/11.jpg?raw=true)

### 1.AS-REQ分析

​	用户输入帐密访问域内服务，机器会向KDC的AS认证服务发送一个AS-REQ请求。请求中主要包含用户NTLM加密的timestamp等信息。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/ADCS-homework/12.jpg?raw=true)

​	标明kerberos版本号，消息类型，预身份验证域请求体。在PADATA中包含一些加密信息，req-body中则会包含服务端与域的整体信息，并填充预防重放攻击的到期时间等。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/ADCS-homework/13.jpg?raw=true)

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/ADCS-homework/14.jpg?raw=true)

### 2.AS-REP分析

​	KDC收到请求后通过AD中的AS查询到用户的NTLM，解密成功且timestamp检查无误后，返回krbtgt用户的NTLM加密后的TGT域用户NTLM加密的随机生成的Login sessionkey。整体返回包内容如下，我们重点分析ticket与enc-part部分的内容。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/ADCS-homework/15.jpg?raw=true)

Ticket中主要包含加密后的用户PAC信息，请求服务名称等内容。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/ADCS-homework/16.jpg?raw=true)

enc-part内容则更为复杂

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/ADCS-homework/17.jpg?raw=true)

### 3.TGS_REQ分析

​	用户通过AS_REP拿到TGT票据，并用自己的Hash 解密获得Login session key。再用Login session key 加密客户端用户名、时间戳等信息，和TGT 一起向KDC 的TGS 服务发起请求，请求服务票据。（这一步不需要账号或者密码。主要以TGT 作为凭证）

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/ADCS-homework/18.jpg?raw=true)

Padata内容

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/ADCS-homework/19.jpg?raw=true)

Req-body内容，包含了请求的用户名&指定服务&支持的加密类型

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/ADCS-homework/20.jpg?raw=true)

### 4.TGS_REP分析

​	TGS 服务收到请求后，使用 Login session key 对authenticator 解密，获取到请求的用户名和时间戳。并检查时间戳在5分钟的有效范围内。KDC 使用krbtgt 用户的hash解密TGT 票据，把解密后的用户名等信息与authenticator 解密后的内容比对，相同则认证通过，颁发服务票据。返回服务票据（ST）与Login session key加密的Server Session key和请求的服务名称。服务票据（ST）中包含Server Session key、客户端名称、票据有效时间、PAC等信息。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/ADCS-homework/21.jpg?raw=true)

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/ADCS-homework/22.jpg?raw=true)

## 0x05 关于PKINIT技术的薄弱点与攻击手法

​	在域内使用PKINIT技术改进Kerberos自身薄弱点，有利于避免NTLM的泄露与设备的登录认证。但新技术也会引发新的安全隐患。如域内PassTheCertificate/影子凭证(Shadow Certificate)/UnPAC哈希攻击等攻击技术。下面我们将逐项介绍影子凭证(Shadow Certificate)攻击手法，从攻击者的角度剖析AD CS的薄弱性。

### 1. Shadow Certificate

#### 1.1 简介

​	在2019年欧洲黑帽大会期间，提到了一种修改目标计算机或用户账户`msDS-KeyCredentialLink`属性的域内权限维持技术。影子凭证(Shadow Certificate)可以简略地理解为Windows中的msDS-KeyCredentialLink属性值。

​	Active Directory中的User和Machine对象有msDS-KeyCredentialLink属性，在其中可设置原始公钥。当试图使用PKINIT进行预认证时，KDC将检查认证账户是否知晓匹配的私钥。若可匹配将发送一个TGT，以此实现对目标对象的持久和隐蔽的访问。在获取高权限用户后，通过给目标用户添加Shadow Credential(即msDS-KeyCredentialLink属性)，结合攻击工具获取到pfx私钥证书文件，再使用pfx文件申请目标用户的TGT，进而获取其NTLM hash。简而言之，只要能改变某个账号的msDS-KeyCredentialLink属性，就可以获得到这个账号的TGT和NTLM hash。可修改msDS-KeyCredentialLink属性的用户组：

- 域管理员(Domain Admins)；

- 高权限用户(GenericAll or GenericWrite权限)；

- Enterprise Key Admins；

- Key Admins；

- 机器账户(只能修改自身属性)

#### 1.2 攻击原理详解

​	在Kerberos认证协议中，TGT只能通过验证一个名为”预认证”的第一步来获得，预认证可以以对称方式(DES、RC4、AES128、AES256密钥)或非对称方式(证书)进行认证。非对称的预认证方式被称为PKINIT。基于PKINIT协议，客户端使用自身私钥对预验证数据进行加密，KDC使用客户端的公钥进行解密。此过程域数字证书类似。当公钥被设置在目标的msDS-KeyCredentialLink中时，生成的证书可以使用Pass-the-Certificate来获得TGT和进一步访问。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/ADCS-homework/23.jpg?raw=true)

在证书信任模型中，公钥基础设施(PKI)允许KDC和客户端使用数字证书交换双方各自的公钥。

- 客户端使用Client私钥加密Client证书和时间戳，发送给KDC；

- 服务端使用Client公钥验证Client证书链的合法性以及确认解密后的时间戳正常；

- 服务端返回TGT和会话密钥（Session Key）

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/ADCS-homework/24.jpg?raw=true)

​	在密钥信任模型中，支持无密码身份验证，并且PKINIT身份验证是基于原始密钥数据。客户端公钥存储在msDS-KeyCredentialLink属性中，该属性的值为密钥凭证(Key Credentials)，包含创建日期、所有者的可分辨名称、GUID和公钥等信息的序列化对象。

​	在密钥信任模型下，域控使用客户端msDS-KeyCredentialLink 属性中的公钥进行解密预身份验证数据。

​	在证书信任模型下，域控验证客户端证书的信任链，使用其中的公钥进行解密Pre-Authentication数据。认证成功后将交换会话密钥。

 
![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/ADCS-homework/25.jpg?raw=true)