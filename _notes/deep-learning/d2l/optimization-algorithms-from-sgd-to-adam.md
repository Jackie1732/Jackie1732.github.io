---
title: "D2L 优化算法：从 SGD 到 Adam"
description: "记录梯度下降、动量法与自适应优化器的状态、更新公式、差异和适用边界。"
date: 2026-09-01
updated: 2026-09-01
permalink: /notes/deep-learning/d2l/optimization-algorithms-from-sgd-to-adam/
track: foundations
content_type: study-note
status: active
audience: "已经理解反向传播、正在区分常用优化器的读者。"
prerequisites: [微积分, 反向传播, 小批量训练]
categories: [deep-learning]
tags: [d2l, optimization, sgd, momentum, adagrad, rmsprop, adadelta, adam, adamw, pytorch]
series: "D2L 基础"
series_order: 11
math: true
toc: true
---

## 摘要

- 反向传播负责计算损失关于模型参数的梯度，优化器负责把当前梯度和历史状态转换为参数更新量。
- SGD 对全部参数使用同一个全局学习率；动量法进一步累计历史梯度，使持续一致的方向得到加强、来回振荡的方向相互抵消。
- AdaGrad、RMSProp 和 Adadelta 根据各坐标近期或累计的平方梯度调整步长，以适应不同参数上的梯度尺度。
- Adam 同时维护梯度的一阶矩和二阶矩估计，可以理解为带动量的 RMSProp，并通过偏差修正补偿状态的零初始化。
- AdamW 将权重衰减从 Adam 的梯度归一化中分离，使正则化不再被各参数的自适应步长重新缩放。
- batch size、梯度裁剪、权重衰减和学习率调度都会影响训练，但它们分别控制梯度来源、梯度上限、参数规模和时间步长，不能与优化器本身混为一谈。

## 优化器在训练流程中的位置

设模型参数为 $\boldsymbol\theta\in\mathbb R^d$，第 $t$ 次迭代抽取的小批量为 $\mathcal B_t$，其大小为 $B$。若损失对批内样本取平均，则当前小批量梯度为：

$$
\mathbf g_t
=
\nabla_{\boldsymbol\theta}
\left[
\frac{1}{B}
\sum_{i\in\mathcal B_t}
l_i(\boldsymbol\theta_{t-1})
\right].
\tag{1}\label{eq:minibatch-gradient}
$$

一次训练迭代中的职责可以分为五步：

1. 前向传播根据当前参数计算预测和损失。
2. 反向传播计算式 $\eqref{eq:minibatch-gradient}$ 中的梯度 $\mathbf g_t$。
3. 若启用梯度裁剪，则先限制 $\mathbf g_t$ 的范数或分量。
4. 优化器根据当前梯度和自己的历史状态计算更新量 $\mathbf u_t$。
5. 使用 $\boldsymbol\theta_t=\boldsymbol\theta_{t-1}-\mathbf u_t$ 更新参数。

优化器不负责决定损失函数，也不重新执行反向传播。Momentum、RMSProp 和 Adam 保存的速度或矩估计是由历史梯度递推得到的优化器状态，不是模型在前向传播中产生的隐藏状态，也不需要正确标签直接监督。

同一小批量中的样本不会各自按先后顺序改写同一个模型。框架先将各样本对参数的梯度求和或求平均，得到一个合并梯度，再对共享参数执行一次更新。因此，batch size 为 $2$ 表示两个样本共同形成一次梯度估计，而不是存在两个独立网络。

## 梯度下降、SGD 与小批量 SGD

三者使用相同的基本更新规则，区别在于每一步用多少训练样本估计梯度。

| 方法 | 单步梯度来源 | 单步特点 |
| --- | --- | --- |
| 批量梯度下降 | 完整训练集 | 梯度稳定，但一次更新的计算和存储成本高 |
| 随机梯度下降 | 一个随机样本 | 更新便宜，噪声较大，难以充分利用矩阵并行计算 |
| 小批量随机梯度下降 | 一个随机小批量 | 在梯度稳定性与硬件效率之间折中 |

深度学习中通常把“小批量随机梯度下降”简称为 SGD。数据加载器决定 $\mathbf g_t$ 来自一个样本还是一个小批量，优化器只执行：

$$
\boldsymbol\theta_t
=
\boldsymbol\theta_{t-1}
-\eta\mathbf g_t,
\tag{2}\label{eq:sgd-update}
$$

其中 $\eta>0$ 是学习率。梯度指向损失局部增长最快的方向，所以式 $\eqref{eq:sgd-update}$ 沿负梯度方向移动。学习率过大可能跨过低损失区域并发生震荡，过小则使训练进展缓慢。

若损失已经对批内样本取平均，梯度中已经包含 $1/B$，优化器不应再次除以 batch size。部分从零实现先对批内损失求和，再在参数更新函数中除以 $B$；两种写法的目标都是得到平均梯度，不能同时执行。

SGD 不保存梯度历史，额外状态最少，但所有参数坐标共享同一个学习率。当损失曲面在不同方向上的曲率差异很大时，一个方向可能反复震荡，而另一个方向前进缓慢。

## 动量法

动量法（Momentum）为每个参数维护速度 $\mathbf v_t$。采用 D2L 的记号，其更新为：

$$
\begin{aligned}
\mathbf v_t
&=\beta\mathbf v_{t-1}+\mathbf g_t,\\
\boldsymbol\theta_t
&=\boldsymbol\theta_{t-1}-\eta\mathbf v_t,
\end{aligned}
\tag{3}\label{eq:momentum-update}
$$

其中 $\mathbf v_0=\mathbf 0$，$0\leq\beta<1$ 控制保留多少历史。展开递推可得：

$$
\mathbf v_t
=
\mathbf g_t
+\beta\mathbf g_{t-1}
+\beta^2\mathbf g_{t-2}
+\cdots.
$$

因此，连续多步方向相近的梯度会在速度中累积；符号来回变化的梯度会部分抵消。动量法能够在狭长谷底中减小横向振荡，同时沿长期一致的方向加速。

有些资料写作 $\mathbf v_t=\beta\mathbf v_{t-1}+(1-\beta)\mathbf g_t$。该形式把速度定义为梯度的指数加权平均，尺度与式 $\eqref{eq:momentum-update}$ 不同，需要相应调整学习率；两套公式不能只替换一项后直接比较。

Nesterov 动量先沿既有速度向前试探，再在试探位置计算梯度：

$$
\widetilde{\mathbf g}_t
=
\nabla L(\boldsymbol\theta_{t-1}-\eta\beta\mathbf v_{t-1}),
$$

随后用 $\widetilde{\mathbf g}_t$ 代替式 $\eqref{eq:momentum-update}$ 中的 $\mathbf g_t$。它利用对下一位置的近似预判修正速度，但仍属于动量法的扩展。

## AdaGrad

SGD 对每个参数使用相同的学习率，AdaGrad 则累计每个坐标过去的平方梯度：

$$
\begin{aligned}
\mathbf s_t
&=\mathbf s_{t-1}+\mathbf g_t\odot\mathbf g_t,\\
\boldsymbol\theta_t
&=\boldsymbol\theta_{t-1}
-\eta\frac{\mathbf g_t}{\sqrt{\mathbf s_t}+\epsilon}.
\end{aligned}
\tag{4}\label{eq:adagrad-update}
$$

$\odot$、平方、开方和除法均按元素执行，$\epsilon>0$ 用于防止分母为零。某个坐标若长期出现较大梯度，其 $s_{t,j}$ 会快速增大，该坐标的有效学习率 $\eta/(\sqrt{s_{t,j}}+\epsilon)$ 就会降低；稀疏或很少更新的坐标可以保留较大的步长。

例如第一次迭代有 $\mathbf g_1=(4,0.5)$、$\eta=0.1$，忽略 $\epsilon$。SGD 的两个坐标分别移动 $0.4$ 和 $0.05$；AdaGrad 得到 $\mathbf s_1=(16,0.25)$，归一化梯度为 $(1,1)$，两个坐标均移动 $0.1$。这个例子只展示按坐标缩放的作用，不表示不同坐标在后续始终具有相同步长。

AdaGrad 的问题在于 $\mathbf s_t$ 只增不减。即使很早以前的大梯度已经不再代表当前损失曲面，它仍会永久压低有效学习率，训练后期可能过早停滞。

## RMSProp

RMSProp 用平方梯度的指数加权平均代替 AdaGrad 的无限累加：

$$
\begin{aligned}
\mathbf s_t
&=\gamma\mathbf s_{t-1}
+(1-\gamma)\mathbf g_t\odot\mathbf g_t,\\
\boldsymbol\theta_t
&=\boldsymbol\theta_{t-1}
-\eta\frac{\mathbf g_t}{\sqrt{\mathbf s_t}+\epsilon},
\end{aligned}
\tag{5}\label{eq:rmsprop-update}
$$

其中 $0\leq\gamma<1$。较早的平方梯度以 $\gamma^k$ 的速度衰减，所以 $\mathbf s_t$ 主要反映近期梯度尺度。RMSProp 保留了 AdaGrad 的按坐标自适应能力，同时允许有效学习率在梯度变小后重新增大，因而不再必然单调衰减到接近零。

RMSProp 只根据平方梯度调节尺度，不直接累计梯度方向。它通常仍需要设置全局学习率 $\eta$，而 $\gamma$ 决定二阶状态对历史变化的响应速度。

## Adadelta

Adadelta 在 RMSProp 的平方梯度状态之外，再维护历史更新量的平方状态。令 $\mathbf s_t$ 表示平方梯度的指数加权平均，$\mathbf r_t$ 表示平方更新量的指数加权平均：

$$
\begin{aligned}
\mathbf s_t
&=\rho\mathbf s_{t-1}
+(1-\rho)\mathbf g_t\odot\mathbf g_t,\\
\Delta\boldsymbol\theta_t
&=
\frac{\sqrt{\mathbf r_{t-1}+\epsilon}}
{\sqrt{\mathbf s_t+\epsilon}}
\odot\mathbf g_t,\\
\boldsymbol\theta_t
&=\boldsymbol\theta_{t-1}-\Delta\boldsymbol\theta_t,\\
\mathbf r_t
&=\rho\mathbf r_{t-1}
+(1-\rho)
\Delta\boldsymbol\theta_t\odot\Delta\boldsymbol\theta_t.
\end{aligned}
\tag{6}\label{eq:adadelta-update}
$$

分母根据近期梯度尺度缩小更新，分子根据近期实际更新尺度恢复合适的量级。原始算法借此消除显式的全局学习率；框架实现仍可能提供学习率参数，用于对整个更新量再做统一缩放。Adadelta 需要为每个参数保存两份状态，结构比 RMSProp 更复杂，但避免了 AdaGrad 的无限累计。

## Adam

Adam 同时维护梯度的一阶矩估计 $\mathbf m_t$ 和二阶原点矩估计 $\mathbf v_t$：

$$
\begin{aligned}
\mathbf m_t
&=\beta_1\mathbf m_{t-1}
+(1-\beta_1)\mathbf g_t,\\
\mathbf v_t
&=\beta_2\mathbf v_{t-1}
+(1-\beta_2)\mathbf g_t\odot\mathbf g_t.
\end{aligned}
\tag{7}\label{eq:adam-moments}
$$

$\mathbf m_t$ 平滑梯度方向，作用接近动量；$\mathbf v_t$ 平滑平方梯度，作用接近 RMSProp。两者从零初始化，在训练初期会系统性偏小。Adam 使用：

$$
\widehat{\mathbf m}_t
=
\frac{\mathbf m_t}{1-\beta_1^t},
\qquad
\widehat{\mathbf v}_t
=
\frac{\mathbf v_t}{1-\beta_2^t}
\tag{8}\label{eq:adam-bias-correction}
$$

进行偏差修正，再更新参数：

$$
\boldsymbol\theta_t
=
\boldsymbol\theta_{t-1}
-\eta
\frac{\widehat{\mathbf m}_t}
{\sqrt{\widehat{\mathbf v}_t}+\epsilon}.
\tag{9}\label{eq:adam-update}
$$

当 $t=1$ 时，未修正的一阶矩只有真实梯度的 $1-\beta_1$ 倍，未修正的二阶矩只有平方梯度的 $1-\beta_2$ 倍。式 $\eqref{eq:adam-bias-correction}$ 正是对零初始化造成的这部分缩小进行补偿，而不是对梯度本身做额外放大。

常见默认值为 $\beta_1=0.9$、$\beta_2=0.999$、$\epsilon=10^{-8}$。$\beta_1$ 控制方向平滑，$\beta_2$ 控制梯度尺度平滑，$\eta$ 仍决定整体更新速度。Adam 对不同坐标自适应缩放并利用动量，通常能较快得到可用结果，但这不保证它在所有任务上都取得最佳验证性能。

## AdamW 与权重衰减

若直接把 $L_2$ 惩罚的梯度 $\lambda\boldsymbol\theta$ 加入 Adam 的损失梯度，它也会进入一阶矩和二阶矩，再被各坐标的自适应分母缩放。此时参数收缩不再是统一的按比例衰减。

AdamW 使用损失梯度更新矩估计，并将权重衰减作为独立步骤：

$$
\boldsymbol\theta_t
=
(1-\eta\lambda)\boldsymbol\theta_{t-1}
-\eta
\frac{\widehat{\mathbf m}_t}
{\sqrt{\widehat{\mathbf v}_t}+\epsilon}.
\tag{10}\label{eq:adamw-update}
$$

其中第一项负责按比例缩小参数，第二项负责依据损失梯度优化。对普通 SGD 而言，适当换算系数后，$L_2$ 正则化与权重衰减可以等价；对 Adam 这类自适应算法，两者一般不等价。需要配合权重衰减训练自适应模型时，AdamW 的职责划分更直接。

## 状态、计算和适用特点

下表中的额外状态以每个可训练参数元素为单位，不计参数本身和梯度。

| 算法 | 额外状态 | 是否按坐标调节步长 | 主要特点 | 主要限制 |
| --- | ---: | --- | --- | --- |
| SGD | $0$ | 否 | 规则简单、状态开销最低 | 对学习率和损失曲面尺度敏感 |
| Momentum | $1$ | 否 | 减少振荡，沿稳定方向加速 | 需要选择学习率和动量系数 |
| AdaGrad | $1$ | 是 | 适合稀疏、更新频率不均的参数 | 有效学习率只减不增 |
| RMSProp | $1$ | 是 | 只保留近期平方梯度，避免永久衰减 | 仍需调节全局学习率和衰减系数 |
| Adadelta | $2$ | 是 | 同时利用梯度尺度与更新尺度 | 状态更多，实际使用频率较低 |
| Adam | $2$ | 是 | 结合动量与自适应缩放，初期通常收敛较快 | 状态开销较高，最佳泛化并无统一保证 |
| AdamW | $2$ | 是 | 将权重衰减与 Adam 更新解耦 | 仍需联合调节学习率与衰减系数 |

不存在脱离任务、模型和训练预算后仍然最优的单一优化器。较稳妥的实验顺序是先选取与模型类型相符的常用基线，再在相同数据划分和训练预算下调节学习率，最后比较验证集指标，而不是只比较训练损失下降速度。

SGD 或 Momentum 的状态较少，更新规律容易分析；Adam 或 AdamW 对梯度尺度不均和噪声较大的问题通常更易起步，但每个参数需要两份矩状态。模型很大时，这部分优化器状态会成为显著的训练显存开销。

## 与优化器相邻但不同的机制

| 机制 | 控制对象 | 与优化器的关系 |
| --- | --- | --- |
| batch size | 梯度由多少样本共同估计 | 改变梯度噪声与计算效率，不规定参数更新公式 |
| 梯度裁剪 | 当前反向传播得到的梯度 | 通常在优化器读取梯度前执行，防止单次更新因梯度爆炸而失控 |
| 权重衰减 | 参数规模 | 可作为独立参数收缩步骤，也可能被实现为损失中的正则项 |
| 学习率调度 | 不同训练阶段的全局步长 | 按迭代次数或验证指标改变优化器使用的 $\eta_t$ |

梯度裁剪与降低学习率都能减小单次更新，但作用不同。降低学习率会缩小每一步，包括正常梯度；范数裁剪只在梯度超过阈值时按比例缩小整组梯度，并保持其方向。权重衰减则直接作用于参数，不以梯度是否爆炸为判断条件。

学习率调度器也不是新的优化器。它将固定的 $\eta$ 改为随训练进度变化的 $\eta_t$，可以与 SGD、Momentum、AdamW 等算法组合使用。优化器决定如何利用当前梯度和历史状态，调度器决定该更新在当前阶段采用多大的全局尺度。

## 小结

1. 反向传播产生梯度，优化器读取梯度和历史状态后更新模型参数，两者职责不同。
2. 一个小批量只形成一次合并梯度和一次共享参数更新，不会为批内每个样本分别维护网络。
3. SGD 使用负梯度和全局学习率直接更新，是其他一阶优化器的比较基线。
4. 动量法累计历史梯度方向，能够加强持续方向并抵消往返振荡。
5. AdaGrad 累计全部平方梯度，适合稀疏坐标，但有效学习率可能过早衰减。
6. RMSProp 只保留近期平方梯度，允许各坐标的有效学习率随新梯度尺度继续变化。
7. Adadelta 同时维护平方梯度和平方更新量，以近期更新尺度校准当前步长。
8. Adam 结合一阶动量、二阶自适应缩放和零初始化偏差修正。
9. AdamW 将参数衰减与 Adam 的矩估计解耦，避免正则项被自适应分母重新缩放。
10. 优化器选择必须结合学习率、训练预算、验证指标和状态开销评估，不能仅依据训练损失的早期下降速度。

## 阅读来源

- A. Zhang 等，[D2L：11.5 小批量随机梯度下降](https://zh.d2l.ai/chapter_optimization/minibatch-sgd.html)。
- A. Zhang 等，[D2L：11.6 动量法](https://zh.d2l.ai/chapter_optimization/momentum.html)。
- A. Zhang 等，[D2L：11.7 AdaGrad 算法](https://zh.d2l.ai/chapter_optimization/adagrad.html)。
- A. Zhang 等，[D2L：11.8 RMSProp 算法](https://zh.d2l.ai/chapter_optimization/rmsprop.html)。
- A. Zhang 等，[D2L：11.9 Adadelta](https://zh.d2l.ai/chapter_optimization/adadelta.html)。
- A. Zhang 等，[D2L：11.10 Adam 算法](https://zh.d2l.ai/chapter_optimization/adam.html)。
- PyTorch，[`torch.optim` 优化器文档](https://docs.pytorch.org/docs/stable/optim.html)。
- D. P. Kingma、J. Ba，[Adam: A Method for Stochastic Optimization](https://arxiv.org/abs/1412.6980)。
- I. Loshchilov、F. Hutter，[Decoupled Weight Decay Regularization](https://arxiv.org/abs/1711.05101)。
