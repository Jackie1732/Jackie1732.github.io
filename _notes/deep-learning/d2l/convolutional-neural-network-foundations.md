---
title: "D2L 卷积神经网络：理论基础"
description: "记录从全连接层到卷积的推导、参数共享、局部性、多通道表示、平移性质、卷积计算成本与 LeNet 结构。"
date: 2026-07-31
updated: 2026-08-03
permalink: /notes/deep-learning/d2l/convolutional-neural-network-foundations/
track: foundations
content_type: study-note
status: active
audience: "正在学习 D2L 卷积神经网络理论基础的读者。"
prerequisites: [多层感知机, 矩阵乘法]
categories: [deep-learning]
tags: [d2l, convolutional-neural-network, convolution, parameter-sharing, translation-equivariance, channels, padding, stride, pooling, lenet, pytorch]
series: "D2L 基础"
series_order: 6
math: true
toc: true
---

## 摘要

- 将图像展平后使用全连接层，会丢失二维空间结构并产生大量独立参数。
- 四阶权重张量只是将全连接权重恢复为输入位置与输出位置的二维坐标表示。
- 从绝对坐标改为相对偏移属于重新编号，将不同位置的同类权重绑定在一起才形成参数共享。
- 卷积通过参数共享与局部性减少参数，并通过多个通道学习不同的空间特征。
- LeNet 依次使用卷积、激活与汇聚提取空间特征，再通过全连接层完成图像分类。

## 从全连接层到二维图像表示

设输入图像为 $\mathbf X\in\mathbb R^{h\times w}$，隐藏表示为 $\mathbf H\in\mathbb R^{h\times w}$。保留二维坐标后，全连接层可以写为：

$$
[\mathbf H]_{i,j}
=
[\mathbf U]_{i,j}
+
\sum_k\sum_l
[\mathsf W]_{i,j,k,l}[\mathbf X]_{k,l}.
\tag{1}\label{eq:spatial-fully-connected}
$$

| 对象 | 含义 |
| --- | --- |
| $[\mathbf X]_{k,l}$ | 输入图像位置 $(k,l)$ 的像素 |
| $[\mathbf H]_{i,j}$ | 隐藏表示位置 $(i,j)$ 的输出 |
| $[\mathbf U]_{i,j}$ | 输出位置 $(i,j)$ 的偏置 |
| $[\mathsf W]_{i,j,k,l}$ | 输入位置 $(k,l)$ 到输出位置 $(i,j)$ 的权重 |

四个下标同时指出连接的输入位置与输出位置。该表达与向量形式 $\mathbf h=\mathbf W\mathbf x+\mathbf b$ 表示同一个全连接层，只是权重矩阵被重新排列为带空间坐标的四阶张量。每个输出位置仍然连接全部输入位置，因此参数数量随输入与输出像素数的乘积增长。

## 从绝对位置到相对偏移

令输入位置相对于输出位置的偏移为：

$$
a=k-i,
\qquad
b=l-j.
$$

由此得到 $k=i+a$、$l=j+b$，并定义：

$$
[\mathsf V]_{i,j,a,b}
=
[\mathsf W]_{i,j,i+a,j+b}.
$$

$\mathsf W_{i,j,k,l}$ 到 $\mathsf V_{i,j,a,b}$ 的变化只是在绝对输入坐标与相对偏移之间重新编号，两种写法中的权重一一对应，模型结构与参数数量保持不变。

卷积继续施加两个结构约束：

1. 参数共享令 $[\mathsf V]_{i,j,a,b}=[\mathbf V]_{a,b}$，相同相对偏移在各输出位置使用同一个权重。
2. 局部性令窗口之外的 $[\mathbf V]_{a,b}$ 为零，每个输出位置只依赖邻近输入。

卷积层由此写为：

$$
[\mathbf H]_{i,j}
=
u+
\sum_{a=-\Delta}^{\Delta}
\sum_{b=-\Delta}^{\Delta}
[\mathbf V]_{a,b}
[\mathbf X]_{i+a,j+b}.
\tag{2}\label{eq:local-shared-convolution}
$$

卷积实现通常直接保存小型卷积核 $\mathbf V$。若将卷积展开为一个巨大权重矩阵，该矩阵会包含按空间规律重复的共享值，并因局部性而包含大量零值。

## 多输入通道与多输出通道

彩色图像在每个空间位置包含多个输入通道。卷积层也会产生多个输出通道，使不同卷积核能够学习不同类型的局部特征。多通道卷积表示为：

$$
[\mathsf H]_{i,j,d}
=
\sum_{a=-\Delta}^{\Delta}
\sum_{b=-\Delta}^{\Delta}
\sum_c
[\mathsf V]_{a,b,c,d}
[\mathsf X]_{i+a,j+b,c}.
\tag{3}\label{eq:multi-channel-convolution}
$$

| 下标 | 含义 |
| --- | --- |
| $a,b$ | 卷积窗口内的空间偏移 |
| $c$ | 输入通道编号 |
| $d$ | 输出通道编号 |

一个输出通道 $d$ 对应一套覆盖全部输入通道的卷积核 $\mathsf V_{:,:,:,d}$。输入为 RGB 图像、卷积核大小为 $3\times3$、输出通道数为 $16$ 时，权重包含 $3\times3\times3\times16$ 个元素。输出通道表示模型学习得到的特征映射，后续卷积层会把这些特征映射作为新的输入通道继续组合。

## 平移等变性与平移不变性

D2L 使用平移不变性概括同一个局部检测器在不同位置复用的性质。卷积层本身更严格的表述是平移等变性。设 $T_\delta$ 表示将图像平移 $\delta$，卷积特征提取器 $F$ 满足：

$$
F(T_\delta\mathbf X)
=
T_\delta F(\mathbf X).
$$

输入中的目标发生平移后，输出特征图中的响应也发生相应平移。分类网络经过全局汇聚形成图像级输出 $g$ 后，才更接近平移不变性：

$$
g(T_\delta\mathbf X)
\approx
g(\mathbf X).
$$

等变性保留目标位置，不变性降低最终判断对目标位置的敏感度。两者适用于不同的网络阶段与任务目标。

## 平移不变性的适用边界

平移性质是一种归纳偏置。它与任务规律一致时可以减少参数并提高样本效率，与任务规律不一致时会限制模型表示能力。

| 情形 | 性能影响 |
| --- | --- |
| 位置本身具有语义 | 自动驾驶中的天空与道路、医学图像中的解剖位置、文档版面中的区域位置都包含预测信息，过强的不变性会丢失这些信息 |
| 任务需要定位 | 目标检测、关键点检测和语义分割需要输出空间坐标，图像级不变表示无法独立完成定位 |
| 下采样产生混叠 | 步幅卷积与池化会跳过采样位置，输入移动一个像素可能改变被保留的样本并显著改变输出 |
| 图像边界破坏共享假设 | 填充区域与图像内部的统计性质不同，同一卷积核在边界处面对不同上下文 |
| 固定采样网格不适应形变 | 旋转、尺度变化和非刚性形变超出单纯平移共享能够表达的范围 |

## 现代视觉系统中的平衡方法

现代工程系统通常保留卷积的局部共享优势，并依据任务有选择地保留位置与几何信息。

| 设计方法 | 作用 |
| --- | --- |
| 分阶段控制不变性 | 前部卷积层保持空间特征图，分类头使用全局汇聚获得图像级不变性；检测与分割头继续保留坐标和高分辨率特征 |
| 显式位置表示 | CoordConv 为输入附加横纵坐标通道，视觉 Transformer 使用位置编码或相对位置偏置，使模型能够按任务需要学习位置依赖 |
| 多尺度特征 | 特征金字塔融合不同分辨率的特征，使小目标与大目标都能在合适尺度上被定位 |
| 可变形采样 | 可变形卷积学习采样偏移，使局部窗口适应物体形状与姿态，而不局限于固定矩形网格 |
| 抗混叠下采样 | 在步幅采样前进行低通滤波，减轻一个像素平移导致的输出突变 |
| 数据增强与边界设计 | 随机平移、裁剪和尺度变化用于学习任务所需的稳健性；反射填充、有效卷积或边界裁剪用于减轻填充伪影 |

工程设计的目标通常是获得任务所需程度的平移稳健性。分类任务更重视类别对位置的稳定性，检测和分割任务更重视特征随目标位置同步移动的等变性。

## 填充与步幅下的计算和存储成本

设单个输入样本为 $\mathbf X\in\mathbb R^{c_i\times h\times w}$，卷积核为 $\mathbf W\in\mathbb R^{c_o\times c_i\times k_h\times k_w}$。输入通道数和输出通道数分别为 $c_i$ 与 $c_o$，卷积核的高度和宽度分别为 $k_h$ 与 $k_w$，步幅为 $(s_h,s_w)$。

教材公式通常用 $(p_h,p_w)$ 表示两个方向上的总填充量。输出高度和宽度为：

$$
h_o
=
\left\lfloor
\frac{h+p_h-k_h}{s_h}
\right\rfloor+1,
\qquad
w_o
=
\left\lfloor
\frac{w+p_w-k_w}{s_w}
\right\rfloor+1.
\tag{4}\label{eq:convolution-output-shape}
$$

PyTorch 的 `padding=(p_h,p_w)` 表示每一侧的填充量。对称填充下的总填充量分别为 $2p_h$ 和 $2p_w$，公式中的 $p_h,p_w$ 需要相应替换为 $2p_h,2p_w$。

定义：

$$
R=c_i k_h k_w,
\qquad
Q=c_o h_o w_o.
$$

$R$ 是一个输出元素覆盖的输入元素数量，$Q$ 是输出张量的元素总数。后续计算以单个样本、普通直接卷积和单位膨胀为计数范围。

### 前向传播的计算成本

一个输出元素的计算为：

$$
Y_{d,i,j}
=
b_d+
\sum_{c=1}^{c_i}
\sum_{a=1}^{k_h}
\sum_{b=1}^{k_w}
W_{d,c,a,b}X_{c,i+a,j+b}.
$$

每个输出元素需要 $R$ 次乘法，全部 $Q$ 个输出元素所需的乘法次数为：

$$
M_{\mathrm{forward}}
=QR
=c_oc_ik_hk_wh_ow_o.
\tag{5}\label{eq:convolution-forward-multiplications}
$$

不计算偏置时，每个输出元素需要 $R-1$ 次加法，因此：

$$
A_{\mathrm{forward}}
=Q(R-1).
$$

加入偏置需要为每个输出元素增加一次加法，此时加法次数为 $QR$。工程实现常将一次乘法和一次累加记作一次乘加运算，前向传播的乘加次数为：

$$
\operatorname{MACs}_{\mathrm{forward}}
=c_oc_ik_hk_wh_ow_o.
$$

### 前向传播的内存占用

输入、卷积核、输出和偏置分别包含：

$$
N_X=c_ihw,
\qquad
N_W=c_oc_ik_hk_w,
\qquad
N_Y=c_oh_ow_o,
\qquad
N_b=c_o
$$

个元素。保存这些张量所需的元素总数为：

$$
N_{\mathrm{forward}}
=
c_ihw+c_oc_ik_hk_w+c_oh_ow_o+c_o.
\tag{6}\label{eq:convolution-forward-memory}
$$

使用 `float32` 时，每个元素占用 $4$ 字节，对应的基础内存量为 $4N_{\mathrm{forward}}$ 字节。实际卷积库还可能分配算法工作区，因此该表达描述张量本身的存储量。

### 反向传播的梯度与内存占用

设后一层传回的梯度为 $\mathbf G_Y=\partial L/\partial\mathbf Y$。卷积层需要计算输入梯度、卷积核梯度和偏置梯度：

| 梯度 | 形状 | 元素数量 |
| --- | --- | ---: |
| $\mathbf G_Y=\partial L/\partial\mathbf Y$ | $c_o\times h_o\times w_o$ | $c_oh_ow_o$ |
| $\mathbf G_X=\partial L/\partial\mathbf X$ | $c_i\times h\times w$ | $c_ihw$ |
| $\mathbf G_W=\partial L/\partial\mathbf W$ | $c_o\times c_i\times k_h\times k_w$ | $c_oc_ik_hk_w$ |
| $\mathbf G_b=\partial L/\partial\mathbf b$ | $c_o$ | $c_o$ |

这些梯度张量包含的元素总数为：

$$
N_{\mathrm{backward}}
=
c_oh_ow_o+c_ihw+c_oc_ik_hk_w+c_o.
\tag{7}\label{eq:convolution-backward-memory}
$$

训练还需要保留输入以计算卷积核梯度，并保留卷积核以计算输入梯度。将前向张量与对应梯度同时计入时，基础存储量可近似写为：

$$
N_{\mathrm{training}}
\approx
2\left(
c_ihw+c_oc_ik_hk_w+c_oh_ow_o+c_o
\right).
$$

该估计不包含框架工作区和优化器状态。Adam 会为每个参数额外保存一阶矩与二阶矩，因此还会增加两份参数规模的状态张量。

### 反向传播的计算成本

卷积核中一个参数会在全部输出空间位置参与计算，其梯度为：

$$
\frac{\partial L}{\partial W_{d,c,a,b}}
=
\sum_{i,j}
\frac{\partial L}{\partial Y_{d,i,j}}
X_{c,i+a,j+b}.
$$

计算全部卷积核梯度所需的乘法次数为：

$$
M_W
=c_oc_ik_hk_wh_ow_o.
$$

输入梯度需要将每个输出梯度与对应卷积核参数相乘，并把结果累加回输入位置。该过程可表示为转置卷积，其乘法次数约为：

$$
M_X
=c_oc_ik_hk_wh_ow_o.
$$

完整反向传播同时计算卷积核梯度与输入梯度，因此主要乘法次数为：

$$
M_{\mathrm{backward}}
\approx
M_W+M_X
=
2c_oc_ik_hk_wh_ow_o.
\tag{8}\label{eq:convolution-backward-computation}
$$

加法次数与乘法次数处于相同数量级。偏置梯度通过 $\partial L/\partial b_d=\sum_{i,j}\partial L/\partial Y_{d,i,j}$ 得到，其计算成本相对于卷积核梯度和输入梯度较小。

一次训练迭代包括一次前向传播和一次反向传播，卷积主体的计算成本约为单次前向推理的三倍。批量大小为 $n$ 时，输入、输出和主要计算量均乘以 $n$，卷积核参数数量保持不变。

## LeNet 的结构原理

LeNet 是早期具有代表性的卷积神经网络。其主体由卷积编码器与全连接分类器组成。卷积编码器保留图像的空间结构并逐步提取局部特征，全连接分类器将空间特征整合为类别得分。

{% include figure.html
  src='/assets/figures/deep-learning/d2l/lenet.svg'
  alt='LeNet从输入图像经过两组卷积汇聚层和三层全连接层得到分类结果的数据流'
  number='1'
  caption='LeNet中的数据流。卷积编码器提取空间特征，全连接分类器输出类别得分。'
  source='D2L 6.6'
  source_url='https://zh.d2l.ai/chapter_convolutional-neural-networks/lenet.html'
%}

本笔记采用 D2L 的 PyTorch 简化结构。输入是 Fashion-MNIST 中的 $28\times28$ 单通道图像，第一层卷积使用宽度为 2 的填充，使空间尺寸保持为 $28\times28$。网络的数据形状按以下顺序变化：

| 阶段 | 运算 | 单个样本的输出形状 | 作用 |
| --- | --- | --- | --- |
| 输入 | 灰度图像 | $1\times28\times28$ | 保留二维像素结构 |
| 卷积块一 | $5\times5$ 卷积，6 个输出通道，Sigmoid | $6\times28\times28$ | 提取基础局部模式并增加特征通道 |
| 汇聚一 | $2\times2$ 平均汇聚，步幅为 2 | $6\times14\times14$ | 将高度和宽度分别减半 |
| 卷积块二 | $5\times5$ 卷积，16 个输出通道，Sigmoid | $16\times10\times10$ | 组合低层模式并形成更多高层特征 |
| 汇聚二 | $2\times2$ 平均汇聚，步幅为 2 | $16\times5\times5$ | 继续压缩空间分辨率并扩大感受范围 |
| 展平 | 将通道与空间维度合并 | $400$ | 建立卷积特征与全连接层之间的形状接口 |
| 全连接层一 | $400\rightarrow120$，Sigmoid | $120$ | 汇总整幅图像的特征 |
| 全连接层二 | $120\rightarrow84$，Sigmoid | $84$ | 形成更紧凑的分类表示 |
| 输出层 | $84\rightarrow10$ | $10$ | 产生十个类别的 logits |

卷积部分呈现通道数量增加、空间尺寸降低的变化：

$$
1\times28\times28
\longrightarrow
6\times14\times14
\longrightarrow
16\times5\times5.
$$

通道数量从 1 增加到 6 和 16，使网络能够同时表示更多类型的局部特征。汇聚层降低空间分辨率，使后续单元能够整合更大范围的信息，并减少进入全连接层的特征数量。`Flatten` 只改变张量的排列方式，$16\times5\times5=400$ 个特征值保持不变。

该结构的两个卷积层共有 $2572$ 个参数，三个全连接层共有 $59134$ 个参数，总参数量为 $61706$。全连接分类器占据主要参数量，卷积编码器使用较少参数完成局部特征提取与空间压缩。

输出层产生的十个 logits 对应 Fashion-MNIST 的十个类别。交叉熵损失将 logits 与真实标签转换为一个标量损失，反向传播再沿输出层、全连接层、展平、汇聚层和卷积层依次计算梯度。平均汇聚层与展平操作没有可训练参数，但会继续把梯度传向前面的卷积层，使卷积核与全连接层参数能够进行端到端更新。

LeNet 使用 Sigmoid 与平均汇聚体现其历史时期的网络设计。现代卷积网络常使用 ReLU、最大汇聚或步幅卷积，卷积特征提取、空间下采样与最终分类的整体分工仍然延续。

## 小结

1. 四阶权重张量是全连接层权重矩阵的空间坐标表示。
2. $\mathsf W_{i,j,k,l}$ 到 $\mathsf V_{i,j,a,b}$ 属于重新编号，$\mathsf V_{i,j,a,b}$ 到 $\mathbf V_{a,b}$ 属于参数共享约束。
3. 局部性限制卷积核只处理邻近像素，参数共享使同一局部检测器能够在不同位置复用。
4. 输入通道描述每个位置已有的特征，输出通道描述卷积层学习得到的多种特征映射。
5. 卷积层主要提供平移等变性，图像级汇聚进一步形成平移不变性。
6. 现代视觉系统通过位置表示、多尺度特征、可变形采样和抗混叠下采样平衡不变性与空间信息。
7. 卷积前向传播的主要计算量为 $c_oc_ik_hk_wh_ow_o$，完整反向传播需要分别计算卷积核梯度与输入梯度，主要计算量约为前向传播的两倍。
8. LeNet 通过两组卷积、激活与汇聚逐步提取空间特征，再将 $16\times5\times5$ 的特征展平并交给三层全连接分类器。

## 阅读来源

- A. Zhang 等，[D2L：6.1 从全连接层到卷积](https://zh.d2l.ai/chapter_convolutional-neural-networks/why-conv.html)。
- A. Zhang 等，[D2L：6.3 填充和步幅](https://zh.d2l.ai/chapter_convolutional-neural-networks/padding-and-strides.html)。
- A. Zhang 等，[D2L：6.6 卷积神经网络（LeNet）](https://zh.d2l.ai/chapter_convolutional-neural-networks/lenet.html)。
- R. Liu 等，[An Intriguing Failing of Convolutional Neural Networks and the CoordConv Solution](https://arxiv.org/abs/1807.03247)。
- R. Zhang，[Making Convolutional Networks Shift-Invariant Again](https://arxiv.org/abs/1904.11486)。
- T.-Y. Lin 等，[Feature Pyramid Networks for Object Detection](https://doi.org/10.1109/CVPR.2017.106)。
- J. Dai 等，[Deformable Convolutional Networks](https://arxiv.org/abs/1703.06211)。
