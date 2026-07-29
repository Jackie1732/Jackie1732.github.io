---
title: "D2L 多层感知机：表示、泛化、初始化与分布偏移"
description: "记录多层感知机的非线性结构、PyTorch 实现、泛化控制、参数初始化与分布偏移纠正。"
date: 2026-07-26
updated: 2026-07-29
permalink: /notes/deep-learning/d2l/multilayer-perceptron-and-regularization/
track: foundations
content_type: study-note
status: active
audience: "正在学习 D2L 多层感知机、泛化方法与分布偏移的读者。"
prerequisites: [线性回归, softmax 回归, 矩阵乘法, 自动微分]
categories: [deep-learning]
tags: [d2l, multilayer-perceptron, activation-function, overfitting, weight-decay, dropout, xavier-initialization, distribution-shift, pytorch]
series: "D2L 基础"
series_order: 5
math: true
toc: true
---

## 摘要

- 多层感知机在线性层之间加入非线性激活函数，使模型能够表示输入特征之间更复杂的关系。
- Fashion-MNIST 分类模型将每张图像展平为长度为 $784$ 的向量，再经过隐藏层、ReLU 和输出层得到 $10$ 个 logits。
- 模型选择依据验证集表现完成，训练误差与验证误差的相对变化用于判断欠拟合和过拟合。
- 权重衰减在经验损失中加入 $L_2$ 惩罚项，使参数更新同时考虑数据拟合与权重规模。
- 暂退法在训练阶段随机清零并缩放隐藏层激活值，使模型减少对固定神经元组合的依赖。
- Xavier 初始化根据一层的输入与输出数量设置权重方差，以维持前向信号和反向梯度的数值尺度。
- 训练分布与目标分布不同时，可以在相应假设下通过重要性加权纠正协变量偏移和标签偏移。

## 从线性模型到多层感知机

softmax 回归使用单个仿射变换将输入直接映射到输出。该结构能够表示线性决策边界，对像素之间的组合关系表达有限。

设小批量输入为 $\mathbf X\in\mathbb R^{B\times d}$，隐藏单元数为 $h$，类别数为 $q$。单隐藏层多层感知机的前向计算为：

$$
\mathbf H
=
\operatorname{ReLU}(\mathbf X\mathbf W_1+\mathbf b_1),
\qquad
\mathbf O
=
\mathbf H\mathbf W_2+\mathbf b_2.
\tag{1}\label{eq:mlp-forward}
$$

各对象的形状为：

| 对象 | 形状 | 含义 |
| --- | --- | --- |
| $\mathbf X$ | $(B,d)$ | 小批量输入 |
| $\mathbf W_1$ | $(d,h)$ | 输入层到隐藏层的权重 |
| $\mathbf H$ | $(B,h)$ | 隐藏表示 |
| $\mathbf W_2$ | $(h,q)$ | 隐藏层到输出层的权重 |
| $\mathbf O$ | $(B,q)$ | 各类别的 logits |

隐藏层和输出层均为全连接层。每个输出单元使用上一层的全部输入，因此两层的权重参数数量分别为 $dh$ 和 $hq$。

### 激活函数提供非线性

连续堆叠仿射变换仍然只能得到一个仿射变换。若隐藏层省略激活函数，则：

$$
\begin{aligned}
\mathbf O
&=
(\mathbf X\mathbf W_1+\mathbf b_1)\mathbf W_2+\mathbf b_2\\
&=
\mathbf X(\mathbf W_1\mathbf W_2)
+
(\mathbf b_1\mathbf W_2+\mathbf b_2).
\end{aligned}
\tag{2}\label{eq:linear-layer-collapse}
$$

式中的两层结构可以合并为新的权重和偏置。ReLU 在层间加入分段线性变换：

$$
\operatorname{ReLU}(x)=\max(x,0).
\tag{3}\label{eq:relu}
$$

ReLU 保留正输入并将负输入映射为 $0$。隐藏单元由此形成不同的激活区域，多个区域共同构成更复杂的输入输出关系。sigmoid 将输入映射到 $(0,1)$，tanh 将输入映射到 $(-1,1)$。本章的 Fashion-MNIST 多层感知机采用 ReLU。

## Fashion-MNIST 模型的张量流动

Fashion-MNIST 中每张图像的形状为 $(1,28,28)$。全连接层接收二维张量，其中第一维是 batch，第二维是样本特征，因此图像需要先展平：

| 阶段 | 张量形状 |
| --- | --- |
| 原始小批量 | $(B,1,28,28)$ |
| 展平结果 | $(B,784)$ |
| 隐藏层线性输出 | $(B,256)$ |
| ReLU 输出 | $(B,256)$ |
| 分类输出 | $(B,10)$ |

展平只重新组织张量形状，像素值和 batch 对应关系保持不变。多层感知机将每个像素视为独立输入特征，图像的二维空间邻接关系在该表示中没有得到显式保留。

## 从零实现

从零实现显式创建两层参数，并直接写出公式 \eqref{eq:mlp-forward}：

~~~python
num_inputs, num_hiddens, num_outputs = 784, 256, 10

W1 = nn.Parameter(torch.randn(num_inputs, num_hiddens) * 0.01)
b1 = nn.Parameter(torch.zeros(num_hiddens))
W2 = nn.Parameter(torch.randn(num_hiddens, num_outputs) * 0.01)
b2 = nn.Parameter(torch.zeros(num_outputs))

def relu(X):
    return torch.max(X, torch.zeros_like(X))

def net(X):
    X = X.reshape((-1, num_inputs))
    H = relu(X @ W1 + b1)
    return H @ W2 + b2
~~~

`reshape((-1, num_inputs))` 将每个样本整理为长度为 $784$ 的向量，`-1` 由 PyTorch 根据元素总数推导为当前 batch 大小。网络返回 logits，`CrossEntropyLoss` 在损失计算中完成 log-softmax 与负对数似然。

参数列表交给随机梯度下降优化器：

~~~python
params = [W1, b1, W2, b2]
loss = nn.CrossEntropyLoss(reduction="none")
trainer = torch.optim.SGD(params, lr=0.1)
~~~

多层感知机与 softmax 回归使用相同的训练循环。模型结构决定前向传播过程，损失函数、反向传播和优化器继续承担误差计算、梯度计算和参数更新。

## PyTorch 简洁实现

`nn.Sequential` 按声明顺序连接各层：

~~~python
net = nn.Sequential(
    nn.Flatten(),
    nn.Linear(784, 256),
    nn.ReLU(),
    nn.Linear(256, 10)
)

def init_weights(m):
    if type(m) == nn.Linear:
        nn.init.normal_(m.weight, std=0.01)

net.apply(init_weights)
~~~

`init_weights` 是普通函数。函数定义本身不会改变 `nn.Linear` 的构造过程。`net.apply(init_weights)` 会遍历网络及其子模块，并对两个 `nn.Linear` 层执行正态分布权重初始化。当前函数只修改权重，偏置保持线性层创建时的初始值。

训练配置与执行入口为：

~~~python
loss = nn.CrossEntropyLoss(reduction="none")
trainer = torch.optim.SGD(net.parameters(), lr=0.1)
train_iter, test_iter = d2l.load_data_fashion_mnist(batch_size=256)
d2l.train_ch3(net, train_iter, test_iter, loss, 10, trainer)
~~~

一次小批量训练依次完成前向传播、损失计算、梯度清理、反向传播和参数更新。`train_ch3` 在多个 epoch 中重复该过程，并计算训练指标和测试指标。

## 训练误差、验证误差与模型选择

训练误差来自参与参数更新的训练集。泛化误差描述模型在同分布新样本上的期望误差，实际实验使用独立数据集对其进行估计。

数据通常划分为三个部分：

| 数据 | 作用 |
| --- | --- |
| 训练集 | 计算梯度并更新模型参数 |
| 验证集 | 选择模型结构、训练轮数和正则化强度 |
| 测试集 | 在模型选择完成后评估最终结果 |

欠拟合表示模型尚未充分捕捉训练数据中的主要规律，通常表现为训练误差和验证误差均较高。过拟合表示模型对训练样本的拟合继续增强，验证集表现已经停止改善或开始下降。该现象常见于模型容量相对较大、训练样本较少或训练轮数较多的情况。

模型参数增多时，可表示函数的集合随之扩大。较大的函数集合更容易找到训练误差较低的解，也更容易吸收有限训练样本中的随机噪声。训练集与验证集之间的误差差距由此增大。

## 多项式回归中的拟合状态

D2L 使用三次多项式生成带噪声的数据：

$$
y
=
5+1.2x-3.4\frac{x^2}{2!}
+5.6\frac{x^3}{3!}
+\varepsilon,
\qquad
\varepsilon\sim\mathcal N(0,0.1^2).
\tag{4}\label{eq:polynomial-data}
$$

输入被扩展为：

$$
\left[
1,\,
x,\,
\frac{x^2}{2!},\,
\ldots,\,
\frac{x^{19}}{19!}
\right].
\tag{5}\label{eq:polynomial-features}
$$

阶乘缩放控制高次特征的数值范围。代码中的三次 `train` 调用分别创建独立的线性模型：

| 使用的特征 | 模型状态 | 原因 |
| --- | --- | --- |
| 前 4 列 | 正常拟合 | 特征阶数与数据生成过程一致 |
| 前 2 列 | 欠拟合 | 模型缺少二次项和三次项 |
| 全部 20 列 | 容易过拟合 | 高次项提供了拟合训练噪声的额外自由度 |

`evaluate_loss` 遍历数据迭代器，累计逐样本损失并除以元素数量。训练函数每隔若干 epoch 记录训练损失和测试损失，因此两条曲线能够展示模型对已见样本和新样本的拟合差异。

## 权重衰减

权重向量 $\mathbf w=(w_1,\ldots,w_d)^{\mathsf T}$ 决定各输入特征对预测结果的影响程度。平方 $L_2$ 范数为：

$$
\lVert\mathbf w\rVert_2^2
=
\sum_{j=1}^{d}w_j^2.
$$

它是欧氏长度 $\lVert\mathbf w\rVert_2$ 的平方。平方运算保留向量长度的大小顺序，并使 $\frac12\lVert\mathbf w\rVert_2^2$ 的梯度直接等于 $\mathbf w$。

在线性模型 $\hat y=\mathbf w^{\mathsf T}\mathbf x+b$ 中，输入扰动 $\Delta\mathbf x$ 引起的预测变化满足：

$$
\lvert\Delta\hat y\rvert
=
\lvert\mathbf w^{\mathsf T}\Delta\mathbf x\rvert
\leq
\lVert\mathbf w\rVert_2
\lVert\Delta\mathbf x\rVert_2.
\tag{6}\label{eq:weight-sensitivity}
$$

权重范数较大时，模型对相同输入扰动具有更高的潜在敏感度，也更容易利用有限训练样本中的局部波动。该解释要求各特征具有可比较的尺度，因此数值特征通常先进行标准化。

权重衰减使用平方 $L_2$ 范数衡量参数规模。在线性回归损失 $L(\mathbf w,b)$ 上加入惩罚项后，训练目标为：

$$
J(\mathbf w,b)
=
L(\mathbf w,b)
+
\frac{\lambda}{2}\lVert\mathbf w\rVert_2^2.
\tag{7}\label{eq:l2-objective}
$$

其中 $\lambda\geq0$ 控制数据拟合与参数规模之间的权衡。目标函数对权重的梯度为：

$$
\nabla_{\mathbf w}J
=
\nabla_{\mathbf w}L+\lambda\mathbf w.
$$

梯度下降更新由此写为：

$$
\mathbf w
\leftarrow
(1-\eta\lambda)\mathbf w
-\eta\nabla_{\mathbf w}L.
\tag{8}\label{eq:weight-decay-update}
$$

第一项在每次更新中按比例缩小已有权重，第二项依据当前小批量的数据损失调整权重。较小的权重限制了单个特征对预测结果的放大程度，从而降低模型对训练样本局部波动的敏感度。

数据梯度推动有助于降低训练损失的权重，衰减项持续将权重拉向零。参数接近稳定点时满足：

$$
\nabla_{\mathbf w}L
\approx
-\lambda\mathbf w.
$$

有效特征产生的数据梯度可以抵消部分衰减，使对应权重保持非零。$\lambda$ 较小时参数主要依据数据损失更新，$\lambda$ 增大时权重约束随之增强，过大的 $\lambda$ 会使模型容量不足并形成欠拟合。正则化强度通常依据验证集误差选择。

PyTorch 优化器可以通过 `weight_decay` 参数加入该项：

~~~python
trainer = torch.optim.SGD(
    net.parameters(),
    lr=0.01,
    weight_decay=lambd
)
~~~

偏置控制函数的整体平移，权重控制模型对输入变化的敏感度。工程实现通常对权重应用衰减，并依据模型结构将偏置和归一化层参数排除在衰减范围之外。上例将 `net.parameters()` 作为一个参数组，精细控制时可以使用多个优化器参数组分别配置 `weight_decay`。

## 暂退法与扰动稳健性

深度网络能够学习复杂的特征交互，也具有拟合训练噪声和随机标签的能力。较低的训练误差只描述模型对已见样本的拟合程度，泛化还要求模型对无关的小扰动保持稳定：

$$
\mathbf x\approx\mathbf x'
\quad\Longrightarrow\quad
f(\mathbf x)\approx f(\mathbf x').
$$

训练时注入随机噪声会让模型持续接触同一样本或隐藏表示的扰动版本，从而降低对局部偶然细节的依赖。暂退法将该思想应用于隐藏层激活值。设激活值为 $h$，丢弃概率为 $p$，并令 $m\sim\operatorname{Bernoulli}(1-p)$，则反向暂退法定义为：

$$
h'
=
\frac{m}{1-p}h
=
\begin{cases}
0, & \text{概率为 }p,\\
\dfrac{h}{1-p}, & \text{概率为 }1-p.
\end{cases}
\tag{9}\label{eq:inverted-dropout}
$$

缩放因子保证激活值的期望保持不变：

$$
\mathbb E[h']
=
p\cdot0
+
(1-p)\frac{h}{1-p}
=
h.
$$

随机掩码取 $0$ 时，当前激活值不会参与下一层计算，其反向梯度也为 $0$。该操作只在当前一次前向传播中临时关闭对应神经元，模型参数和网络结构保持不变。下一次前向传播会重新采样掩码。

暂退法使神经元无法持续依赖固定的协作组合，并促使多个隐藏单元共同形成较稳定的表示。每次随机掩码也可以视为从共享参数的网络中采样一个子网络。

PyTorch 通常在隐藏层激活函数之后插入 `nn.Dropout`：

~~~python
net = nn.Sequential(
    nn.Flatten(),
    nn.Linear(784, 256),
    nn.ReLU(),
    nn.Dropout(0.2),
    nn.Linear(256, 256),
    nn.ReLU(),
    nn.Dropout(0.5),
    nn.Linear(256, 10)
)
~~~

`net.train()` 使暂退法在训练阶段生成随机掩码，`net.eval()` 使暂退层在评估阶段直接传递激活值。训练阶段已经通过 $1/(1-p)$ 完成期望尺度校正，因此评估阶段无需继续缩放。

## 参数初始化与 Xavier 方法

参数初始化需要打破同层神经元之间的对称性，并控制前向激活值与反向梯度的数值尺度。权重过小时，信号和梯度容易逐层缩小；权重过大时，二者容易逐层放大。框架会在创建层时执行默认随机初始化，显式初始化函数需要通过 `net.apply` 等调用入口作用于已有网络。

设全连接层具有 $n_{\mathrm{in}}$ 个输入，单个输出为：

$$
o_i
=
\sum_{j=1}^{n_{\mathrm{in}}}w_{ij}x_j.
$$

假设权重具有零均值和方差 $\sigma^2$，输入具有零均值和方差 $\gamma^2$，并近似满足相互独立，则：

$$
\operatorname{Var}(o_i)
=
n_{\mathrm{in}}\sigma^2\gamma^2.
$$

前向传播希望满足 $n_{\mathrm{in}}\sigma^2=1$，反向传播依据相同结构希望满足 $n_{\mathrm{out}}\sigma^2=1$。Xavier 初始化对两个条件取折中：

$$
\boxed{
\sigma^2
=
\frac{2}{n_{\mathrm{in}}+n_{\mathrm{out}}}
}
\tag{10}\label{eq:xavier-variance}
$$

正态版本从 $\mathcal N(0,\sigma^2)$ 中采样权重。均匀分布 $U(-a,a)$ 的方差为 $a^2/3$，因此均匀版本使用：

$$
a
=
\sqrt{\frac{6}{n_{\mathrm{in}}+n_{\mathrm{out}}}}.
$$

PyTorch 可以显式应用 Xavier 均匀初始化：

~~~python
def init_weights(m):
    if isinstance(m, nn.Linear):
        nn.init.xavier_uniform_(m.weight)
        nn.init.zeros_(m.bias)

net.apply(init_weights)
~~~

### 对称性与偏置梯度

同一隐藏层的神经元在网络结构中具有排列对称性。交换两个隐藏单元及其与下一层对应的连接后，网络可以表示相同的函数。若这些单元的输入权重和对应输出权重采用完全相同的初值，它们会产生相同的激活值并接收相同的梯度，后续更新仍会保持一致。随机权重初始化为各单元提供不同的起点，使其能够学习不同特征。

设线性层对小批量执行：

$$
\mathbf Z
=
\mathbf X\mathbf W+\mathbf 1_B\mathbf b^{\mathsf T},
\qquad
\mathbf G
=
\frac{\partial L}{\partial\mathbf Z}.
$$

偏置沿 batch 维广播到每个样本，其梯度沿该维累加：

$$
\frac{\partial L}{\partial b_j}
=
\sum_{i=1}^{B}
\frac{\partial L}{\partial Z_{ij}}.
\tag{11}\label{eq:bias-gradient}
$$

损失采用 batch 均值时，$1/B$ 已包含在上游梯度 $\mathbf G$ 中。偏置通常可以初始化为零，因为随机权重已经打破隐藏单元的对称性，不同单元在反向传播中会获得不同的偏置梯度。

该初始化推导忽略了激活函数并使用了独立性近似。Xavier 初始化常用于线性、tanh 和 sigmoid 结构，使用 ReLU 或 Leaky ReLU 的网络通常采用考虑激活截断效应的 Kaiming 初始化。

## 环境与分布偏移

训练数据来自源分布 $q(\mathbf x,y)$，模型部署时的数据来自目标分布 $p(\mathbf x,y)$。两者不一致时称为分布偏移。常见类型及其假设为：

| 类型 | 发生变化的分布 | 保持不变的分布 | 主要处理方式 |
| --- | --- | --- | --- |
| 协变量偏移 | $p(\mathbf x)\ne q(\mathbf x)$ | $p(y\mid\mathbf x)=q(y\mid\mathbf x)$ | 按 $p(\mathbf x)/q(\mathbf x)$ 加权 |
| 标签偏移 | $p(y)\ne q(y)$ | $p(\mathbf x\mid y)=q(\mathbf x\mid y)$ | 按 $p(y)/q(y)$ 加权 |
| 概念偏移 | $p(y\mid\mathbf x)\ne q(y\mid\mathbf x)$ | 原预测关系发生变化 | 使用新的带标签数据更新模型 |

### 经验风险与实际风险

训练集上的平均损失称为经验风险，目标分布中损失的期望称为实际风险：

$$
\widehat R_q(f)
=
\frac{1}{n}\sum_{i=1}^{n}l(f(\mathbf x_i),y_i),
\qquad
R_p(f)
=
\mathbb E_{p(\mathbf x,y)}
\left[l(f(\mathbf x),y)\right].
\tag{12}\label{eq:empirical-true-risk}
$$

训练样本来自目标分布时，经验风险使用有限样本近似实际风险。训练样本来自另一分布 $q$ 时，普通平均损失对应 $q$ 下的期望，需要依据偏移类型进行纠正。

### 协变量偏移纠正

协变量偏移表示输入出现频率发生变化，同时给定输入后的标签规律保持不变。目标风险可以改写为源分布下的加权风险：

$$
\begin{aligned}
R_p(f)
&=
\iint l(f(\mathbf x),y)p(y\mid\mathbf x)p(\mathbf x)
\,d\mathbf x\,dy\\
&=
\mathbb E_{q(\mathbf x,y)}
\left[
\frac{p(\mathbf x)}{q(\mathbf x)}
l(f(\mathbf x),y)
\right].
\end{aligned}
\tag{13}\label{eq:covariate-shift-risk}
$$

因此训练样本的权重与加权经验风险为：

$$
\beta_i
=
\frac{p(\mathbf x_i)}{q(\mathbf x_i)},
\qquad
\widehat R_{\mathrm{weighted}}(f)
=
\frac{1}{n}\sum_{i=1}^{n}
\beta_i l(f(\mathbf x_i),y_i).
\tag{14}\label{eq:importance-weighted-risk}
$$

$\beta_i>1$ 表示该类输入在目标环境中更加常见，训练时需要提高其损失权重。$\beta_i<1$ 表示该类输入在训练集中占比偏高。

密度比可以通过来源分类器估计。分别从 $p(\mathbf x)$ 和 $q(\mathbf x)$ 采集等量样本，并用 $z=1$ 和 $z=-1$ 标记来源，则：

$$
\frac{P(z=1\mid\mathbf x)}
{P(z=-1\mid\mathbf x)}
=
\frac{p(\mathbf x)}{q(\mathbf x)}.
$$

逻辑回归令 $P(z=1\mid\mathbf x)=\operatorname{sigmoid}(h(\mathbf x))$，对应的概率比为 $\exp(h(\mathbf x))$，由此得到 $\beta(\mathbf x)=\exp(h(\mathbf x))$。目标分布中出现的输入需要在源分布中具有非零概率，过大的权重通常通过上限截断来控制训练方差。

### 标签偏移纠正

标签偏移表示类别比例发生变化，同时每个类别内部的特征分布保持不变。目标风险可以写为：

$$
R_p(f)
=
\mathbb E_{q(\mathbf x,y)}
\left[
\frac{p(y)}{q(y)}
l(f(\mathbf x),y)
\right].
\tag{15}\label{eq:label-shift-risk}
$$

因此类别 $y_i$ 的训练样本使用权重：

$$
\beta_i
=
\frac{p(y_i)}{q(y_i)}.
$$

源分布中的 $q(y)$ 可以直接统计。目标数据缺少标签时，可以在源验证集上估计混淆矩阵 $\mathbf C$，其中 $C_{ij}=P(\hat y=i\mid y=j)$，再统计模型在目标数据上的平均预测分布 $\boldsymbol\mu(\hat{\mathbf y})$。标签偏移假设给出：

$$
\mathbf C\,p(\mathbf y)
=
\boldsymbol\mu(\hat{\mathbf y}).
\tag{16}\label{eq:label-shift-confusion}
$$

混淆矩阵可逆且分类器具有足够区分能力时，可以由该线性系统估计目标标签分布 $p(\mathbf y)$，进而计算各类别的权重。

### 概念偏移

概念偏移表示给定相同输入后的标签规律发生变化，即 $p(y\mid\mathbf x)\ne q(y\mid\mathbf x)$。旧样本加权只能调整旧关系的重要程度，无法提供新的输入与标签关系。缓慢变化的广告点击、新闻兴趣、垃圾邮件模式和设备状态可以通过持续收集近期标签、周期性微调、滑动时间窗口或在线学习处理。标签定义或任务目标突然变化时，需要依据新概念重新标注数据并训练模型。

## 小结

1. 多层感知机通过隐藏层和非线性激活函数扩展线性模型的表示能力。
2. `Flatten`、两个 `Linear` 层和 ReLU 构成 Fashion-MNIST 单隐藏层模型的主要张量流。
3. 从零实现显式管理参数与矩阵运算，简洁实现使用 PyTorch 模块封装相同计算。
4. 训练误差反映训练集拟合程度，验证误差用于模型与超参数选择。
5. 多项式阶数展示模型容量与欠拟合、过拟合之间的关系。
6. 权重衰减通过 $L_2$ 惩罚限制参数规模，并在更新中产生按比例缩小权重的项。
7. 暂退法通过保持期望不变的随机掩码扰动隐藏层激活，并在评估阶段关闭随机性。
8. 随机权重初始化打破同层神经元的参数对称性，偏置梯度由各样本对应的上游梯度累加得到。
9. Xavier 初始化以输入和输出连接数共同确定权重方差，在前向与反向传播的尺度稳定之间取得折中。
10. 经验风险使用有限训练样本近似实际风险，分布偏移会改变该近似所对应的数据总体。
11. 协变量偏移和标签偏移可以在相应条件分布不变时通过重要性加权纠正，概念偏移通常需要新的带标签数据。

## 阅读来源

- A. Zhang 等，[D2L：4.1 多层感知机](https://zh.d2l.ai/chapter_multilayer-perceptrons/mlp.html)。
- A. Zhang 等，[D2L：4.2 多层感知机的从零开始实现](https://zh.d2l.ai/chapter_multilayer-perceptrons/mlp-scratch.html)。
- A. Zhang 等，[D2L：4.3 多层感知机的简洁实现](https://zh.d2l.ai/chapter_multilayer-perceptrons/mlp-concise.html)。
- A. Zhang 等，[D2L：4.4 模型选择、欠拟合和过拟合](https://zh.d2l.ai/chapter_multilayer-perceptrons/underfit-overfit.html)。
- A. Zhang 等，[D2L：4.5 权重衰减](https://zh.d2l.ai/chapter_multilayer-perceptrons/weight-decay.html)。
- A. Zhang 等，[D2L：4.6 暂退法](https://zh.d2l.ai/chapter_multilayer-perceptrons/dropout.html)。
- A. Zhang 等，[D2L：4.8 数值稳定性和模型初始化](https://zh.d2l.ai/chapter_multilayer-perceptrons/numerical-stability-and-init.html)。
- A. Zhang 等，[D2L：4.9 环境和分布偏移](https://zh.d2l.ai/chapter_multilayer-perceptrons/environment.html)。
