---
title: "D2L 循环神经网络：序列建模基础"
description: "记录序列概率分解、文本预处理、语言模型、循环计算与通过时间反向传播的定义、推导和边界。"
date: 2026-08-08
updated: 2026-09-03
permalink: /notes/deep-learning/d2l/recurrent-neural-networks/
track: foundations
content_type: study-note
status: draft
audience: "正在学习 D2L 循环神经网络的读者。"
prerequisites: [线性代数, 概率, 多层感知机, 反向传播]
categories: [deep-learning]
tags: [d2l, recurrent-neural-network, sequence-modeling, pytorch]
series: "D2L 基础"
series_order: 8
math: true
toc: true
---

## 摘要

- 一阶马尔可夫条件将当前状态对完整历史的依赖缩短为对前一状态的依赖。
- 联合分布写成从 $t=1$ 开始的统一乘积时，需要用 $P(x_1\mid x_0)=P(x_1)$ 处理初始项。
- 对离散中间状态的求和表示边缘化：同一条状态转移路径上的概率相乘，不同中间路径的概率相加。
- 文本预处理依次完成规范化、词元化、词频统计、词表构建与语料索引化，将原始文本转换为保留顺序的整数序列。
- 语言模型估计序列中下一个词元的条件概率；有限阶 $n$ 元语法以较短历史换取可统计性，但仍受长尾分布和组合稀疏性限制。
- 困惑度是平均负对数似然的指数，等于真实词元预测概率几何平均数的倒数，可解释为每一步的等效不确定程度。
- 随机采样只打乱子序列之间的次序，不破坏子序列内部顺序；顺序分区则使同一行在相邻小批量之间保持连续。
- 通过时间反向传播将各时间步对共享参数的梯度相加；隐藏状态梯度同时接收当前输出和未来状态两条路径的贡献。
- 循环权重的高次幂会使长距离梯度集中到主导方向，并依据其尺度产生梯度爆炸或梯度消失。
- 固定截断直接舍弃窗口外的梯度；随机截断以较高方差换取期望无偏，二者都不截断前向传递的隐藏状态数值。

## 一阶马尔可夫分解中的初始项

概率链式法则将序列联合分布分解为：

$$
P(x_1,\ldots,x_T)
=
P(x_1)
\prod_{t=2}^{T}
P(x_t\mid x_1,\ldots,x_{t-1}).
$$

一阶马尔可夫条件假设给定前一状态后，更早的历史不再为当前状态提供额外信息：

$$
P(x_t\mid x_1,\ldots,x_{t-1})
=
P(x_t\mid x_{t-1}).
$$

因此，联合分布可以写为：

$$
P(x_1,\ldots,x_T)
=
P(x_1)
\prod_{t=2}^{T}P(x_t\mid x_{t-1}).
$$

若要进一步压缩成从 $t=1$ 开始的乘积：

$$
P(x_1,\ldots,x_T)
=
\prod_{t=1}^{T}P(x_t\mid x_{t-1}),
$$

则必须约定 $P(x_1\mid x_0)=P(x_1)$。该约定只负责处理第一个因子的边界记号，表示虚构的初始状态 $x_0$ 不为 $x_1$ 提供额外信息；马尔可夫条件负责缩短其余各项的条件历史。

## 对中间状态求和

设 $X_t$ 是离散随机变量，状态空间为 $\mathcal X$。教材中的 $\sum_{x_t}$ 是 $\sum_{x_t\in\mathcal X}$ 的简写，表示让中间状态遍历所有可能取值，而不是沿时间下标求和。

已知 $X_{t-1}=b$ 时，两步后到达 $X_{t+1}=a$ 的概率为：

$$
P(X_{t+1}=a\mid X_{t-1}=b)
=
\sum_{c\in\mathcal X}
P(X_{t+1}=a\mid X_t=c)
P(X_t=c\mid X_{t-1}=b).
$$

其中每个乘积表示经过一个确定中间状态 $c$ 的路径概率；求和将所有互斥且完备的中间路径合并。这一操作称为对 $X_t$ 边缘化。若 $X_t$ 是连续变量，离散求和需要替换为积分。

## 从原始文本到词元索引

文本预处理依次完成规范化、词元化、词频统计、词表构建与语料索引化。规范化规则取决于任务；本次实现将非英文字母替换为空格并统一为小写，以减少教学语料中的词元种类，但同时舍弃了标点、数字和大小写携带的信息，不能视为真实任务的固定做法。

词元化决定序列的基本单位。按单词切分时，每个单词是一个词元，序列较短但词表较大，并且容易出现未登录词。按字符切分时，每个字符和空格分别作为词元，词表很小且几乎可以拼出任意单词，但序列更长，单个词元携带的语义也更少。《时光机器》的教学实现采用字符级语料，主要用于降低后续序列预测的输入、输出和词表管理复杂度。

词频统计可以暂时展平各行，因为它只计算每种词元的出现次数，不关心位置。词表根据统计结果为不同词元分配唯一整数索引，可以按最低频率过滤稀有词元，并在普通词元之前放置 `<unk>` 等保留词元。词表同时维护两种相反的映射：

| 数据结构 | 查询方向 | 主要用途 |
| --- | --- | --- |
| `token_to_idx` | 词元 $\rightarrow$ 索引 | 将文本数值化；未收录词元映射到 `<unk>` |
| `idx_to_token` | 索引 $\rightarrow$ 词元 | 将索引还原为可读文本 |

语料索引化按照原顺序遍历每次词元出现，并将其替换为词表索引，不执行去重。因此，语料库长度表示全部词元位置的数量，词表长度表示不同词元种类与特殊词元的数量，两者不属于同一统计口径。本次加载函数还会将各行展平为一个长序列，但没有插入显式的行边界词元；这会丢失原有行边界，是为简化教学数据而接受的限制。

## 语言模型与序列数据集

### 从联合概率到下一个词元预测

对词元序列 $x_1,\ldots,x_T$，概率链式法则给出：

$$
P(x_1,\ldots,x_T)
=
\prod_{t=1}^{T}P(x_t\mid x_1,\ldots,x_{t-1}).
$$

语言模型的基本职责是估计乘积中的条件概率，即根据当前位置之前的词元为下一个词元分配概率。完整历史随序列长度增长，直接统计几乎不可能覆盖所有组合，因此 $n$ 元语法只保留固定长度的最近历史：

| 模型 | 条件概率形式 | 保留的历史 |
| --- | --- | --- |
| 一元语法 | $P(x_t)$ | 不使用历史 |
| 二元语法 | $P(x_t\mid x_{t-1})$ | 前一个词元 |
| 三元语法 | $P(x_t\mid x_{t-2},x_{t-1})$ | 前两个词元 |

以二元语法为例，最大似然估计使用相对频率：

$$
\widehat P(x'\mid x)
=
\frac{n(x,x')}{n(x)},
$$

其中 $n(x,x')$ 是相邻词元对的出现次数，$n(x)$ 是作为条件的词元出现次数。增加上下文可以表达更具体的局部关系，但可能组合的数量会快速增长，许多合理组合在有限语料中一次也没有出现。若直接使用频数估计，这些组合的概率将变为零，并使包含它们的整个序列概率也变为零。

拉普拉斯平滑通过给计数加入小的正量，为未观察到的组合保留非零概率。它缓解了零概率问题，但不能消除高阶组合的数据稀疏性。词频还通常呈现长尾分布：按频率排序后，第 $i$ 个词元的频率近似满足齐普夫定律 $n_i\propto i^{-\alpha}$。少量高频词元占据大量位置，大量低频词元只有很少证据；二元、三元组合的长尾通常更加严重。

### 从序列似然到困惑度

设模型在真实前缀 $x_1,\ldots,x_{t-1}$ 下，为实际出现的词元 $x_t$ 分配概率：

$$
q_t=P_\theta(x_t\mid x_1,\ldots,x_{t-1}).
$$

模型为整段真实序列分配的似然是 $\prod_{t=1}^{n}q_t$。直接使用该乘积会产生数值下溢，而且序列越长，乘积通常越小，无法公平比较不同长度的文本。取负对数将乘法变为加法，再除以词元数，得到每个词元的平均负对数似然：

$$
\overline L
=
-\frac{1}{n}\sum_{t=1}^{n}\log q_t.
$$

其中 $-\log q_t$ 是模型面对实际词元时的惊讶度。真实词元概率越接近 1，该项越接近 0；概率趋近 0 时，该项趋向正无穷。平均操作消除了词元数量带来的线性增长，但结果仍处于对数尺度。困惑度对其取指数：

$$
\begin{aligned}
\operatorname{PPL}
&=\exp(\overline L)\\
&=\exp\left(-\frac{1}{n}\sum_{t=1}^{n}\log q_t\right)\\
&=\left(\prod_{t=1}^{n}\frac{1}{q_t}\right)^{1/n}\\
&=\frac{1}{\left(\prod_{t=1}^{n}q_t\right)^{1/n}}.
\end{aligned}
$$

因此，困惑度严格等于真实词元预测概率几何平均数的倒数，而不是概率的算术平均数。几何平均保留了序列似然的乘法结构：某个位置为真实词元分配极低概率时，不能被其他位置的高概率轻易掩盖。若几何平均概率为 $1/k$，困惑度就是 $k$，可直观理解为模型的不确定性相当于每一步在 $k$ 个等概率候选中选择；这只是等效解释，不表示模型每一步实际只考虑 $k$ 个词元。

| 预测情况 | 实际词元概率 | 困惑度 |
| --- | --- | --- |
| 完美预测 | 每一步均为 $1$ | $1$ |
| 在大小为 $\lvert V\rvert$ 的词表上均匀预测 | 每一步均为 $1/\lvert V\rvert$ | $\lvert V\rvert$ |
| 某一步将实际词元概率推向 $0$ | 至少一个 $q_t\to0$ | 趋向正无穷 |

均匀预测给出了有意义的比较基线，而不是任意模型困惑度的数学上限；一个较差的模型可能经常令 $q_t<1/\lvert V\rvert$，从而得到高于词表大小的困惑度。从信息论看，测试集上的平均负对数似然估计交叉熵：

$$
H(P,Q)=H(P)+D_{\mathrm{KL}}(P\Vert Q).
$$

真实分布 $P$ 固定时，最小化交叉熵等价于缩小模型分布 $Q$ 与真实分布的差异。训练通常直接最小化数值更稳定的交叉熵，困惑度只是它的单调指数变换，因此两项指标对模型优劣的排序一致。

困惑度的比较要求使用相同测试语料、词表和词元化方式。字符级、单词级与子词级的“每一步”含义不同，其困惑度不能直接横向比较。该指标只评价模型为真实后续词元分配概率的能力，不直接衡量事实正确性、推理能力或生成文本的整体质量。

### 将长语料转换为小批量

给定词元索引序列，训练样本使用长度为 `num_steps` 的连续子序列作为输入 $X$，并将同一序列向后移动一个位置作为标签 $Y$：

$$
X=[x_j,x_{j+1},\ldots,x_{j+s-1}],
\qquad
Y=[x_{j+1},x_{j+2},\ldots,x_{j+s}],
$$

其中 $s=\texttt{num\_steps}$。因此，$X$ 中每个位置的监督目标都是原语料中的下一个词元；返回张量的形状均为 `(batch_size, num_steps)`。

| 采样策略 | 子序列内部 | 相邻小批量之间 | 主要特点 |
| --- | --- | --- | --- |
| 随机采样 | 保持原始顺序和连续性 | 通常不连续 | 随机打乱完整子序列的起点，使各片段近似独立出现 |
| 顺序分区 | 保持原始顺序和连续性 | 同一行继续向后推进 | 保留跨小批量的连续位置关系 |

随机采样先从一个随机偏移开始，将长语料划分为固定长度的完整子序列，再打乱这些子序列的起始位置并组成小批量。被打乱的是子序列之间的抽取次序，而不是每个子序列内部的词元。顺序分区则先把语料整理为 `batch_size` 条长序列，再沿每一行依次截取窗口，使后一小批量能够承接前一小批量的位置。两种方法都会舍弃不足以组成完整窗口或完整小批量的少量首尾词元，这是固定形状批量计算带来的边界处理。

## 激活函数与梯度裁剪

基础 RNN 使用 `tanh` 更新隐藏状态：

$$
\mathbf H_t
=
\tanh\left(
\mathbf X_t\mathbf W_{xh}
+\mathbf H_{t-1}\mathbf W_{hh}
+\mathbf b_h
\right),
$$

其中：

$$
\tanh(x)=\frac{e^x-e^{-x}}{e^x+e^{-x}},
\qquad
\tanh'(x)=1-\tanh^2(x).
$$

`tanh` 将隐藏状态限制在 $(-1,1)$，但通过时间反向传播仍会反复乘以循环权重 $\mathbf W_{hh}$；权重的放大作用足够强时，梯度仍可能爆炸。ReLU 满足 $\operatorname{ReLU}(x)=\max(0,x)$，其正区间输出无上界且导数为 $1$，既可能使隐藏状态持续增大，也不会在正区间主动衰减梯度，因此换用 ReLU 后通常更需要保留梯度裁剪。

范数裁剪在梯度超过阈值 $\theta$ 时执行：

$$
\mathbf g
\leftarrow
\min\left(1,\frac{\theta}{\lVert\mathbf g\rVert}\right)\mathbf g.
$$

它保持梯度方向并限制单次更新规模，用于降低训练突然失稳的风险，但不保证困惑度单调下降。

## 通过时间反向传播

为突出时间依赖，D2L 暂时省略偏置并使用恒等激活函数。单个样本在时间步 $t$ 的计算为：

$$
\mathbf h_t
=
\mathbf W_{hx}\mathbf x_t
+\mathbf W_{hh}\mathbf h_{t-1},
\qquad
\mathbf o_t
=
\mathbf W_{qh}\mathbf h_t,
$$

总损失是 $T$ 个时间步损失的平均：

$$
L=\frac{1}{T}\sum_{t=1}^{T}l(\mathbf o_t,y_t).
$$

令 $\boldsymbol\delta_t^o=\partial L/\partial\mathbf o_t$、$\boldsymbol\delta_t^h=\partial L/\partial\mathbf h_t$。输出层参数在每个时间步共享，因此其梯度是各时间步外积之和：

$$
\frac{\partial L}{\partial\mathbf W_{qh}}
=
\sum_{t=1}^{T}
\boldsymbol\delta_t^o\mathbf h_t^{\mathsf T}.
$$

最后一个隐藏状态只影响当前输出；其余隐藏状态既影响当前输出，也影响下一隐藏状态。反向递推为：

$$
\begin{aligned}
\boldsymbol\delta_T^h
&=\mathbf W_{qh}^{\mathsf T}\boldsymbol\delta_T^o,\\
\boldsymbol\delta_t^h
&=\mathbf W_{qh}^{\mathsf T}\boldsymbol\delta_t^o
+\mathbf W_{hh}^{\mathsf T}\boldsymbol\delta_{t+1}^h,
\qquad t<T.
\end{aligned}
$$

展开递推可见，距离当前时刻 $k$ 步的损失需要经过 $k$ 次循环权重：

$$
\boldsymbol\delta_t^h
=
\sum_{s=t}^{T}
\left(\mathbf W_{hh}^{\mathsf T}\right)^{s-t}
\mathbf W_{qh}^{\mathsf T}\boldsymbol\delta_s^o.
$$

隐藏层参数同样在各时间步共享，故：

$$
\frac{\partial L}{\partial\mathbf W_{hx}}
=
\sum_{t=1}^{T}\boldsymbol\delta_t^h\mathbf x_t^{\mathsf T},
\qquad
\frac{\partial L}{\partial\mathbf W_{hh}}
=
\sum_{t=1}^{T}\boldsymbol\delta_t^h\mathbf h_{t-1}^{\mathsf T}.
$$

实际模型使用 `tanh` 时，先计算激活前梯度 $\boldsymbol\delta_t^a=\boldsymbol\delta_t^h\odot(1-\mathbf h_t^2)$，再用 $\boldsymbol\delta_t^a$ 计算隐藏层权重与偏置的梯度。一次小批量会汇总全部 batch 和时间步的损失，调用一次 `backward()`，最后对每组共享参数更新一次，而不是每个时间步分别更新。

### 矩阵幂与梯度方向

设实对称矩阵 $\mathbf M$ 的正交归一特征向量为 $\mathbf v_i$，满足 $\mathbf M\mathbf v_i=\lambda_i\mathbf v_i$。递推可得：

$$
\mathbf M^k\mathbf v_i=\lambda_i^k\mathbf v_i.
$$

将任意向量写为 $\mathbf x=\sum_i a_i\mathbf v_i$，则：

$$
\mathbf M^k\mathbf x
=
\lambda_1^k
\left[
a_1\mathbf v_1
+\sum_{i=2}^{n}
a_i\left(\frac{\lambda_i}{\lambda_1}\right)^k\mathbf v_i
\right].
$$

原题若要得到唯一的 $\mathbf v_1$ 方向，还需满足 $|\lambda_1|>|\lambda_2|$ 且 $a_1\ne0$。此时其与直线 $\operatorname{span}(\mathbf v_1)$ 的夹角 $\theta_k$ 满足：

$$
\tan\theta_k
\leq
\frac{\lVert\mathbf x_\perp\rVert}{|a_1|}
\left|\frac{\lambda_2}{\lambda_1}\right|^k
\longrightarrow0.
$$

连续分布产生的随机向量满足 $a_1=0$ 的概率为零。对应到 RNN，令 $\mathbf M=\mathbf W_{hh}^{\mathsf T}$，远距离梯度正是 $\mathbf M^k\mathbf x$：$|\lambda_1|>1$ 时主导分量可能爆炸，$|\lambda_1|<1$ 时趋于消失；其他方向还会相对衰减，使长距离梯度逐渐集中到主导方向。真实 RNN 的权重未必对称，非线性激活也会引入额外雅可比矩阵，但反复矩阵乘法造成的尺度与方向问题仍然存在。

### 固定截断与随机截断

固定截断在预定的 $\tau$ 个时间步后切断计算图，始终忽略更早的梯度，因此是有偏但稳定的近似。当前训练代码在相邻小批量之间调用 `state.detach_()`：隐藏状态数值继续前传，梯度不能越过边界，`num_steps` 决定单次反向传播的最长窗口。

随机截断为历史梯度路径引入：

$$
\xi_t
=
\begin{cases}
0,&\text{概率 }1-\pi_t,\\
\pi_t^{-1},&\text{概率 }\pi_t,
\end{cases}
\qquad
E[\xi_t]=1.
$$

当 $\xi_t=0$ 时切断过去的梯度；保留路径时乘以 $\pi_t^{-1}$，补偿其他迭代中的丢弃，使梯度估计在期望上等于完整梯度。跨越 $k$ 个边界的路径出现概率较低，同时获得对应的逆概率权重，因此估计方差可能很大。随机截断与随机抽取文本子序列不同；实践中通常采用计算稳定、带轻度短期偏置的固定截断。

## 小结

1. 一阶马尔可夫条件保留最近状态，舍去给定该状态后不再提供额外信息的更早历史。
2. 条件 $P(x_1\mid x_0)=P(x_1)$ 只是把初始分布并入统一乘积的边界约定。
3. 对中间状态求和表示枚举所有可能路径：路径内部相乘，互斥路径之间相加。
4. 文本预处理将原始文本依次转换为规范化文本、词元序列、词表和整数语料库；规范化会改变可学习的信息，必须服从具体任务。
5. 词频统计只关心各种词元的出现次数，语料索引化则保留每次出现的位置与顺序。
6. 字符级词元化以更长的序列换取更小的词表，适合简化教学实现，但不是所有真实任务的默认选择。
7. 语言模型通过条件概率预测下一个词元，$n$ 元语法以有限历史近似完整历史。
8. 平滑只能缓解未见组合的零概率问题，不能消除高阶词元组合的长尾与数据稀疏性。
9. 困惑度是平均负对数似然的指数，也是实际词元预测概率几何平均数的倒数；数值越接近 1，模型越确定。
10. 随机采样和顺序分区都保持子序列内部顺序，区别在于相邻小批量是否继续沿原语料推进。
11. `tanh` 限制隐藏状态的取值但不能彻底阻止梯度爆炸；ReLU 的正区间无界且导数为 $1$，因此两者都可能需要梯度裁剪。
12. 通过时间反向传播将当前输出和未来隐藏状态传来的梯度相加，并汇总共享参数在所有时间步的贡献。
13. 循环矩阵幂的主导尺度决定长距离梯度趋于爆炸还是消失，谱间隔则使梯度方向逐渐集中。
14. 固定截断以有偏换取稳定和效率；随机截断用逆概率加权保持期望正确，但会增加梯度方差。

## 阅读来源

- A. Zhang 等，[D2L：8.1 序列模型](https://zh.d2l.ai/chapter_recurrent-neural-networks/sequence.html)。
- A. Zhang 等，[D2L：8.2 文本预处理](https://zh.d2l.ai/chapter_recurrent-neural-networks/text-preprocessing.html)。
- A. Zhang 等，[D2L：8.3 语言模型和数据集](https://zh.d2l.ai/chapter_recurrent-neural-networks/language-models-and-dataset.html)。
- A. Zhang 等，[D2L：8.4 循环神经网络](https://zh.d2l.ai/chapter_recurrent-neural-networks/rnn.html)。
- A. Zhang 等，[D2L：8.5 循环神经网络的从零开始实现](https://zh.d2l.ai/chapter_recurrent-neural-networks/rnn-scratch.html)。
- A. Zhang 等，[D2L：8.6 循环神经网络的简洁实现](https://zh.d2l.ai/chapter_recurrent-neural-networks/rnn-concise.html)。
- A. Zhang 等，[D2L：8.7 通过时间反向传播](https://zh.d2l.ai/chapter_recurrent-neural-networks/bptt.html)。
