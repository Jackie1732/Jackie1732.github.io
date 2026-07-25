---
title: "D2L 3.1–3.7 线性模型：从回归到 Softmax 分类"
description: "记录线性回归、小批量随机梯度下降与 softmax 多分类的数学关系及 PyTorch 实现。"
date: 2026-07-23
updated: 2026-07-25
permalink: /notes/deep-learning/d2l/linear-models-regression-to-softmax/
track: foundations
content_type: study-note
status: active
audience: "正在学习 D2L 线性回归、softmax 回归与 PyTorch 训练循环的读者。"
prerequisites: [向量点积, 偏导数, 条件概率, 自动微分]
categories: [deep-learning]
tags: [d2l, linear-regression, softmax, cross-entropy, sgd, optimization, pytorch]
series: "D2L 基础"
series_order: 4
math: true
toc: true
---

## 摘要

- 线性回归使用线性输出和平方损失预测连续值，softmax 回归使用多个线性输出和交叉熵完成多分类。
- 小批量随机梯度下降依据当前批次的平均梯度更新模型参数。
- softmax 将每个样本的 logits 转换为和为 $1$ 的类别概率，交叉熵衡量模型分配给真实类别的概率。
- 从零实现显式编写参数、softmax、交叉熵和更新规则，简洁实现将相同职责交给 PyTorch 层、损失函数与优化器。

## 线性模型与记号

训练集包含 $n$ 个样本。第 $i$ 个样本由特征向量 $\mathbf{x}^{(i)}\in\mathbb{R}^{d}$ 和标量标签 $y^{(i)}$ 构成。

| 符号 | 含义 | 形状 |
| --- | --- | --- |
| $\mathbf{x}^{(i)}$ | 第 $i$ 个样本的特征 | $d$ 维向量 |
| $y^{(i)}$ | 第 $i$ 个样本的标签 | 标量 |
| $\mathbf{w}$ | 权重参数 | $d$ 维向量 |
| $b$ | 偏置参数 | 标量 |
| $\hat y^{(i)}$ | 第 $i$ 个样本的预测值 | 标量 |

单个样本和整个训练集的预测分别写为：

$$
\hat y^{(i)}
=
\mathbf{w}^{\mathsf T}\mathbf{x}^{(i)}+b,
\qquad
\hat{\mathbf y}
=
\mathbf X\mathbf w+b\mathbf 1_n.
\tag{1}\label{eq:linreg-prediction}
$$

其中 $\mathbf X\in\mathbb{R}^{n\times d}$ 的每一行对应一个样本，$\mathbf 1_n$ 表示长度为 $n$ 的全 $1$ 向量。偏置 $b$ 在样本维度上进行广播。线性模型的训练目标是最小化损失函数 $L(\mathbf w,b)$，即在训练集上使预测值尽可能接近真实标签。

## 从平方损失到参数梯度

第 $i$ 个样本的残差记为 $r^{(i)}=\hat y^{(i)}-y^{(i)}$。D2L 使用带有系数 $\frac12$ 的平方损失，并以所有样本损失的均值衡量模型在训练集上的表现：

$$
l^{(i)}(\mathbf w,b)
=
\frac12\left(r^{(i)}\right)^2,
\qquad
L(\mathbf w,b)
=
\frac1n\sum_{i=1}^{n}l^{(i)}(\mathbf w,b).
\tag{2}\label{eq:linreg-loss}
$$

系数 $\frac12$ 与平方项求导产生的系数 $2$ 相消，因此 $\partial l^{(i)}/\partial r^{(i)}=r^{(i)}$。结合

$$
\frac{\partial r^{(i)}}{\partial\mathbf w}
=
\mathbf x^{(i)},
\qquad
\frac{\partial r^{(i)}}{\partial b}
=
1,
$$

链式法则给出单个样本的参数梯度：

$$
\begin{aligned}
\nabla_{\mathbf w}l^{(i)}
&=
\frac{\partial l^{(i)}}{\partial r^{(i)}}
\frac{\partial r^{(i)}}{\partial\mathbf w}
=
r^{(i)}\mathbf x^{(i)},\\
\frac{\partial l^{(i)}}{\partial b}
&=
\frac{\partial l^{(i)}}{\partial r^{(i)}}
\frac{\partial r^{(i)}}{\partial b}
=
r^{(i)}.
\end{aligned}
\tag{3}\label{eq:single-sample-gradient}
$$

残差决定更新方向，特征向量决定各权重分量接收的梯度大小。

## 小批量随机梯度下降

每次迭代从训练集中随机抽取样本集合 $\mathcal B$，并记 batch size 为 $m=|\mathcal B|$。小批量平均损失及其梯度为：

$$
\begin{aligned}
L_{\mathcal B}
&=
\frac1m\sum_{i\in\mathcal B}l^{(i)},\\
\nabla_{\mathbf w}L_{\mathcal B}
&=
\frac1m\sum_{i\in\mathcal B}r^{(i)}\mathbf x^{(i)},\\
\frac{\partial L_{\mathcal B}}{\partial b}
&=
\frac1m\sum_{i\in\mathcal B}r^{(i)}.
\end{aligned}
\tag{4}\label{eq:minibatch-gradient}
$$

给定学习率 $\eta>0$，参数沿小批量平均损失的负梯度方向更新：

$$
\mathbf w
\leftarrow
\mathbf w-\eta\nabla_{\mathbf w}L_{\mathcal B},
\qquad
b
\leftarrow
b-\eta\frac{\partial L_{\mathcal B}}{\partial b}.
\tag{5}\label{eq:minibatch-update}
$$

随机性来自每次迭代抽取的小批量。训练过程通过重复抽样、计算梯度和更新参数，使模型逐步接近较低损失区域。

## batch size 的作用

batch size 决定一次参数更新使用的样本数量。

| batch size | 梯度来源 | 计算特征 |
| --- | --- | --- |
| $m=1$ | 单个随机样本 | 更新频率高，梯度波动较大 |
| $1<m<n$ | 随机小批量 | 兼顾梯度稳定性与计算效率 |
| $m=n$ | 完整训练集 | 梯度稳定，单次更新成本较高 |

小批量梯度是完整训练集梯度的随机估计。batch size 增大时，梯度估计的波动通常减小，矩阵计算的并行度通常提高。batch size 与学习率属于训练前配置的超参数，$\mathbf w$ 与 $b$ 属于训练过程中更新的模型参数。

## PyTorch 训练循环

一次迭代依次完成梯度清理、前向计算、损失计算、反向传播和参数更新：

~~~python
optimizer.zero_grad()
prediction = model(features)
loss = loss_fn(prediction, labels)
loss.backward()
optimizer.step()
~~~

loss.backward() 计算公式 \eqref{eq:minibatch-gradient} 对应的梯度，optimizer.step() 执行公式 \eqref{eq:minibatch-update} 对应的参数更新。

## 常用损失函数与初始化方法

PyTorch 在 `torch.nn` 中提供常用损失函数。

| 任务 | 常用损失函数 |
| --- | --- |
| 回归 | `MSELoss`、`L1Loss`、`SmoothL1Loss`、`HuberLoss` |
| 二分类 | `BCELoss`、`BCEWithLogitsLoss` |
| 多分类 | `CrossEntropyLoss`、`NLLLoss` |
| 概率分布 | `KLDivLoss`、`GaussianNLLLoss` |

PyTorch 在 `torch.nn.init` 中提供参数初始化函数。

| 初始化方式 | 常用函数 |
| --- | --- |
| 常数初始化 | `zeros_`、`ones_`、`constant_` |
| 随机初始化 | `uniform_`、`normal_`、`trunc_normal_` |
| Xavier 初始化 | `xavier_uniform_`、`xavier_normal_` |
| Kaiming 初始化 | `kaiming_uniform_`、`kaiming_normal_` |
| 正交初始化 | `orthogonal_` |

## 访问线性回归的梯度

`backward()` 将梯度累积到模型参数的 `.grad` 属性。线性层的权重梯度和偏置梯度可以在反向传播后访问：

~~~python
trainer.zero_grad()
l = loss(net(X), y)
l.backward()

weight_grad = net[0].weight.grad
bias_grad = net[0].bias.grad
~~~

当前模型中，`weight_grad` 的形状为 `(1, 2)`，`bias_grad` 的形状为 `(1,)`。梯度需要在下一次梯度清理前读取或复制。

## 从条件似然到交叉熵

softmax 将单个样本的输出转换为概率向量 $\hat{\mathbf y}$，其中 $\hat y_j=P(y=j\mid\mathbf x)$。设训练集包含 $n$ 个样本，$\mathbf X$ 表示全部特征，$\mathbf Y$ 表示全部标签。在给定各自特征后，各样本的标签通常视为条件独立，因此整个数据集的条件概率等于各样本条件概率的乘积：

$$
P(\mathbf Y\mid\mathbf X)
=
\prod_{i=1}^{n}
P\left(\mathbf y^{(i)}\mid\mathbf x^{(i)}\right).
$$

最大似然估计选择使该乘积最大的模型参数。对数函数保持数值的大小顺序，负号将最大化问题转换为最小化问题，对数的乘法规则再将样本概率的乘积转换为损失之和：

$$
\begin{aligned}
\underset{\boldsymbol\theta}{\arg\max}\;
P_{\boldsymbol\theta}(\mathbf Y\mid\mathbf X)
&=
\underset{\boldsymbol\theta}{\arg\min}\;
\left[-\log P_{\boldsymbol\theta}(\mathbf Y\mid\mathbf X)\right],\\
-\log P(\mathbf Y\mid\mathbf X)
&=
\sum_{i=1}^{n}
-\log P\left(\mathbf y^{(i)}\mid\mathbf x^{(i)}\right).
\end{aligned}
$$

单个标签 $\mathbf y$ 是长度为 $q$ 的 one-hot 向量。若真实类别为 $k$，则 $y_k=1$，其余分量为 $0$。单个样本的条件概率及其负对数可以写为：

$$
\begin{aligned}
P(\mathbf y\mid\mathbf x)
&=
\prod_{j=1}^{q}\hat y_j^{\,y_j}
=
\hat y_k,\\
l(\mathbf y,\hat{\mathbf y})
&=
-\log P(\mathbf y\mid\mathbf x)
=
-\sum_{j=1}^{q}y_j\log\hat y_j
=
-\log\hat y_k.
\end{aligned}
$$

索引 $i$ 遍历训练样本，索引 $j$ 遍历一个样本的全部类别。类别求和中只有真实类别对应的项得到保留。以 $\mathbf y=(0,1,0)$ 和 $\hat{\mathbf y}=(0.1,0.7,0.2)$ 为例，单样本损失为 $-\log 0.7\approx0.357$。模型赋予真实类别的概率越大，损失越小。深度学习框架通常对小批量中的单样本损失取均值。

## Softmax 回归的前向计算

设小批量包含 $B$ 张图像，每个样本具有 $d$ 个输入特征，分类任务具有 $q$ 个类别。线性层首先计算 logits：

$$
\mathbf O=\mathbf X\mathbf W+\mathbf b,
\qquad
\mathbf X\in\mathbb R^{B\times d},
\quad
\mathbf W\in\mathbb R^{d\times q},
\quad
\mathbf O\in\mathbb R^{B\times q}.
\tag{6}\label{eq:softmax-linear}
$$

softmax 按样本处理 logits。第 $i$ 个样本属于第 $j$ 类的预测概率为：

$$
\hat y_j^{(i)}
=
\frac{\exp\left(o_j^{(i)}\right)}
{\sum_{k=1}^{q}\exp\left(o_k^{(i)}\right)}.
\tag{7}\label{eq:softmax}
$$

指数函数保证各项为正，分母使同一样本的全部类别概率之和为 $1$。每一行独立归一化，因此一个批次中不同样本通常得到不同的概率分布。

Fashion-MNIST 图像的原始形状为 $(B,1,28,28)$。线性层将每张图像视为 $28\times28=784$ 个输入特征，因此前向计算先保留 batch 维度并展平其余维度：

| 阶段 | 张量形状 | 含义 |
| --- | --- | --- |
| 原始图像 | $(B,1,28,28)$ | $B$ 张单通道图像 |
| 展平结果 | $(B,784)$ | 每张图像对应一个特征向量 |
| 线性输出 | $(B,10)$ | 每张图像对应 10 个类别的 logits |
| 标签 | $(B,)$ | 每个样本对应一个类别索引 |

展平操作只改变张量形状并保留像素值，其可训练参数数量为零。线性分类器将像素视为一组输入特征，卷积网络会在前部保留图像的二维空间结构。

## Softmax 与交叉熵的梯度

将公式 \eqref{eq:softmax} 代入单样本交叉熵后，可以写成：

$$
l(\mathbf y,\hat{\mathbf y})
=
\log\sum_{k=1}^{q}\exp(o_k)
-
\sum_{j=1}^{q}y_jo_j.
$$

对第 $j$ 个 logit 求导得到：

$$
\frac{\partial l}{\partial o_j}
=
\frac{\exp(o_j)}{\sum_{k=1}^{q}\exp(o_k)}
-
y_j
=
\hat y_j-y_j.
\tag{8}\label{eq:softmax-cross-entropy-gradient}
$$

预测概率高于标签值时，该类别的梯度为正，梯度下降会降低对应 logit。真实类别满足 $y_j=1$，其预测概率低于 $1$ 时梯度为负，梯度下降会提高对应 logit。该梯度将 softmax 概率与交叉熵目标连接为直接的预测误差。

## 从零实现的步骤

从零实现显式保留 softmax 回归的每个计算环节。

1. 初始化权重 $\mathbf W\in\mathbb R^{784\times10}$ 和偏置 $\mathbf b\in\mathbb R^{10}$，并为参数启用梯度记录。
2. 将输入由 $(B,1,28,28)$ 变换为 $(B,784)$。
3. 计算 logits $\mathbf O=\mathbf X\mathbf W+\mathbf b$。
4. 对每一行 logits 计算 softmax 概率。
5. 根据标签索引提取真实类别概率并计算 $-\log\hat y_{y}$。
6. 对批量损失执行反向传播，并使用小批量随机梯度下降更新参数。
7. 使用 `argmax` 取得预测类别，累计训练损失、训练准确率和测试准确率。

核心前向计算可以写为：

~~~python
def softmax(X):
    X_exp = torch.exp(X)
    return X_exp / X_exp.sum(dim=1, keepdim=True)

def net(X):
    X = X.reshape((-1, W.shape[0]))
    return softmax(X @ W + b)

def cross_entropy(y_hat, y):
    return -torch.log(y_hat[range(len(y_hat)), y])
~~~

`reshape((-1, W.shape[0]))` 让 PyTorch 根据元素总数推导 batch 维度，并将每个样本整理为长度为 $784$ 的向量。交叉熵通过行索引和标签索引取得每个样本真实类别的预测概率。

## PyTorch 简洁实现

简洁实现使用 PyTorch 组件表达相同的计算关系：

~~~python
net = nn.Sequential(
    nn.Flatten(),
    nn.Linear(784, 10)
)
net.apply(init_weights)

loss = nn.CrossEntropyLoss(reduction="none")
trainer = torch.optim.SGD(net.parameters(), lr=0.1)

train_ch3(net, train_iter, test_iter, loss, num_epochs, trainer)
~~~

`nn.Flatten()` 将每个图像展平为长度为 $784$ 的向量，`nn.Linear(784, 10)` 生成 10 个类别的 logits。`CrossEntropyLoss` 以数值稳定的方式组合 log-softmax 与负对数似然，因此网络末尾直接输出 logits。`SGD` 保存参数引用和学习率，并在 `step()` 中执行参数更新。

两种实现的职责对应关系如下：

| 计算职责 | 从零实现 | PyTorch 简洁实现 |
| --- | --- | --- |
| 输入展平 | `reshape` | `nn.Flatten` |
| 线性映射 | `X @ W + b` | `nn.Linear` |
| 概率与损失 | `softmax` 和自定义交叉熵 | `nn.CrossEntropyLoss` |
| 参数梯度 | `backward()` | `backward()` |
| 参数更新 | 自定义 `sgd` | `torch.optim.SGD` |

## 训练、评估与预测

`train_epoch_ch3` 遍历训练集的全部小批量。每个批量依次执行前向传播、损失计算、梯度清理、反向传播和参数更新，并累计损失与正确预测数量。

~~~python
for X, y in train_iter:
    y_hat = net(X)
    l = loss(y_hat, y)
    trainer.zero_grad()
    l.mean().backward()
    trainer.step()
~~~

`train_ch3` 重复调用单轮训练函数，并在每个 epoch 后计算测试准确率和更新训练曲线。`predict_ch3` 从测试迭代器读取样本，以 `argmax` 取得概率或 logits 最大的类别索引，再将真实标签与预测标签共同显示。

`train_ch3`、`train_epoch_ch3` 和 `predict_ch3` 是教材定义的教学辅助函数。教材构建过程会根据 `#@save` 标记将函数收集到与教材版本匹配的工具模块。本地笔记本可以直接定义并调用这些函数。`d2l 1.0.3` 采用以 `Trainer` 为中心的新版接口，当前练习继续使用本地函数可以保持与教材本节的训练逻辑一致。

训练损失持续下降而测试准确率停止提高时，模型的训练集拟合仍在加强，泛化能力已经接近当前模型与数据条件下的上限。验证集用于选择训练轮数，早停、权重衰减、数据扩充和模型容量控制用于减小训练集与未见数据之间的性能差距。

## 优化补充：二阶导数与曲率

设单个参数为 $\theta$。一阶导数 $g(\theta)=dL/d\theta$ 表示损失在当前位置的坡度，二阶导数 $h(\theta)=d^2L/d\theta^2$ 表示坡度随参数变化的速度。损失在当前位置附近可以写成：

$$
L(\theta+\delta)
\approx
L(\theta)
+
g(\theta)\delta
+
\frac12h(\theta)\delta^2.
\tag{9}\label{eq:second-order-approximation}
$$

式中的一阶项描述沿 $\delta$ 移动引起的主要变化，二阶项描述曲率带来的修正。曲率较大的方向对步长更敏感。

多个参数组成参数向量 $\boldsymbol\theta$。对应的二阶导数构成 Hessian 矩阵 $\mathbf H=\nabla_{\boldsymbol\theta}^{2}L$。若参数数量为 $p$，完整 Hessian 包含 $p^2$ 个元素。Hessian-vector product 直接计算某个方向上的梯度变化：

$$
\mathbf H\mathbf v
=
\left.
\frac{d}{d\varepsilon}
\nabla L(\boldsymbol\theta+\varepsilon\mathbf v)
\right|_{\varepsilon=0}.
\tag{10}\label{eq:hessian-vector-product}
$$

$\mathbf H\mathbf v$ 的输出规模为 $p$，其含义是参数沿 $\mathbf v$ 方向移动时梯度的变化速度。当前线性回归训练使用一阶梯度，二阶信息用于连接后续的曲率分析与优化方法。

## 小结

1. 线性回归与 softmax 回归共享线性映射和小批量梯度更新结构，输出含义与损失函数决定具体任务。
2. softmax 在类别维度归一化 logits，交叉熵只保留真实类别对应的负对数概率。
3. softmax 与交叉熵的组合梯度为 $\hat{\mathbf y}-\mathbf y$。
4. 从零实现展示各项计算，简洁实现使用 `Flatten`、`Linear`、`CrossEntropyLoss` 和 `SGD` 封装相同职责。
5. 单轮训练负责批量更新，完整训练负责 epoch 循环与评估，预测函数负责类别索引与标签显示。

## 阅读来源

- A. Zhang 等，[D2L：3.1 线性回归](https://zh.d2l.ai/chapter_linear-networks/linear-regression.html)。
- A. Zhang 等，[D2L：3.2 线性回归的从零实现](https://zh.d2l.ai/chapter_linear-networks/linear-regression-scratch.html)。
- A. Zhang 等，[D2L：3.3 线性回归的简洁实现](https://zh.d2l.ai/chapter_linear-networks/linear-regression-concise.html)。
- A. Zhang 等，[D2L：3.4 softmax 回归](https://zh.d2l.ai/chapter_linear-networks/softmax-regression.html)。
- A. Zhang 等，[D2L：3.5 图像分类数据集](https://zh.d2l.ai/chapter_linear-networks/image-classification-dataset.html)。
- A. Zhang 等，[D2L：3.6 softmax 回归的从零实现](https://zh.d2l.ai/chapter_linear-networks/softmax-regression-scratch.html)。
- A. Zhang 等，[D2L：3.7 softmax 回归的简洁实现](https://zh.d2l.ai/chapter_linear-networks/softmax-regression-concise.html)。
- D2L，[版本说明与新版训练接口](https://github.com/d2l-ai/d2l-en/releases)。
- PyTorch，[损失函数 API](https://docs.pytorch.org/docs/stable/nn.html#loss-functions)。
- PyTorch，[参数初始化 API](https://docs.pytorch.org/docs/stable/nn.init.html)。
- PyTorch，[自动微分 API](https://docs.pytorch.org/docs/stable/autograd.html)。
