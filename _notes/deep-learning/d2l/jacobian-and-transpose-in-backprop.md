---
title: "从计算图到批量反传：梯度传播、停止梯度与线性层"
description: "从计算图、上游梯度与微分出发，推导停止梯度、单样本与批量线性层的反向传播。"
date: 2026-07-17
updated: 2026-07-22
permalink: /notes/deep-learning/d2l/jacobian-and-transpose-in-backprop/
track: foundations
content_type: study-note
status: active
audience: "正在学习 D2L、PyTorch 自动求导与反向传播的读者。"
prerequisites: [矩阵乘法, 偏导数, 列向量]
categories: [deep-learning]
tags: [d2l, mathematics, deep-learning, pytorch]
series: "D2L 基础"
series_order: 3
math: true
toc: true
---

## 摘要

- 线性映射 $y=Ax$ 的 Jacobian 为 $A$。
- 标量损失 $L(y)$ 的输入梯度满足 $\nabla_xL=A^T\nabla_yL$。
- 批量线性层 $Z=XW+b$ 的反向传播给出 $\nabla_XL=G_ZW^T$、$\nabla_WL=X^TG_Z$ 与 $\nabla_bL=G_Z^T\mathbf{1}$。
- 停止梯度算子保持前向数值，并为其输入指定零梯度的反向规则。

## 对象与坐标约定

线性层的推导涉及输入向量、向量值映射和标量损失。

| 对象 | 输入与输出 | 一阶变化的表示 |
| --- | --- | --- |
| 输入向量 $x$ | $x\in\mathbb{R}^n$ | 坐标向量 |
| 线性映射 $y=Ax$ | $\mathbb{R}^n\to\mathbb{R}^m$ | Jacobian 矩阵 $A$ |
| 损失 $L(y)$ | $\mathbb{R}^m\to\mathbb{R}$ | 梯度 $\nabla_yL$ |

单个样本采用列向量约定：

$$
x\in\mathbb{R}^{n\times1},\qquad
A\in\mathbb{R}^{m\times n},\qquad
y=Ax\in\mathbb{R}^{m\times1}.
$$

该约定使线性映射与函数复合具有一致的书写顺序：

$$
B(Ax)=(BA)x.
$$

批量计算采用 PyTorch 常用的行样本约定。第 $r$ 行保存第 $r$ 个样本的特征向量。

## Jacobian 描述向量输出的一阶变化

向量函数 $y(x):\mathbb{R}^n\to\mathbb{R}^m$ 的 Jacobian 采用行对应输出、列对应输入的约定：

$$
J_y(x)=\left[\frac{\partial y_i}{\partial x_j}\right]_{i,j}
\in\mathbb{R}^{m\times n}.
$$

Jacobian 给出输入微小变化 $dx$ 所引起的输出变化：

$$
dy\approx J_y(x)\,dx.
$$

令：

$$
y=Ax,\qquad
y_i=\sum_{j=1}^{n}A_{ij}x_j.
$$

各元素的偏导数满足：

$$
\frac{\partial y_i}{\partial x_j}=A_{ij}.
$$

因此：

$$
J_y(x)=A,\qquad dy=A\,dx.
$$

线性映射满足精确微分关系 $dy=A\,dx$。Jacobian 的另一种排布约定会将相同的偏导数数组写为 $A^T$，因此推导时需要先声明行列约定。

## 计算图、叶子张量与梯度累积

前向传播计算张量数值，并记录张量之间的运算依赖。该依赖结构称为计算图。张量构成图中的节点，运算构成节点之间的有向边。

设：

$$
x\xrightarrow{\times}y=x^2\xrightarrow{\operatorname{sg}}u\xrightarrow{\times}z=ux\xrightarrow{\operatorname{sum}}L.
$$

其中 $\operatorname{sg}$ 表示停止梯度算子。该图同时包含从 $x$ 到 $y$ 的路径和从 $x$ 到 $z$ 的直接路径。

| 张量 | 来源 | 图中的角色 |
| --- | --- | --- |
| $x$ | 用户创建且 requires_grad=True | 叶子张量，保存最终累积的梯度 |
| $y=x^2$ | 张量运算 | 非叶子张量，保存运算的反向规则 |
| $u=y.\operatorname{detach}()$ | 停止梯度 | 叶子张量，作为后续运算中的固定数值 |
| $L=\operatorname{sum}(z)$ | 张量运算 | 标量损失，提供反向传播的起点 |

叶子张量通常由用户直接创建。需要梯度的叶子张量在反向传播后将梯度累积到 .grad 属性。由运算产生的非叶子张量携带 grad_fn，该对象保存相应运算的反向规则。每次前向传播创建一张新的动态计算图。

detach() 返回与原张量共享数值的张量，并在该位置建立计算图边界。独立的数据副本可由 y.detach().clone() 创建。梯度累积通过 zero_grad() 或 x.grad.zero_() 清理。

## 标量损失与上游梯度

训练目标通常为标量损失。给定目标向量 $t$，平方误差定义为：

$$
L(y)=\frac12\lVert y-t\rVert_2^2.
$$

输出端梯度记为：

$$
g_y=\nabla_yL.
$$

对于平方误差：

$$
g_y=y-t.
$$

上游梯度表示损失对当前节点输出的敏感度。反向传播在每个节点执行链式法则。若节点满足 $v=f(u)$，则：

$$
\nabla_uL=J_f(u)^T\nabla_vL.
$$

标量关系 $v=cu$ 给出局部导数 $dv/du=c$，因此：

$$
\frac{\partial L}{\partial u}
=
\frac{\partial L}{\partial v}\,c.
$$

当 loss 为标量时，loss.backward() 以 $\partial L/\partial L=1$ 作为反向传播的初始梯度。计算图中的每个操作依据自身的局部导数产生新的上游梯度，并将来自多条路径的贡献相加。

## 乘法节点的局部梯度

设乘法节点满足：

$$
z=ux.
$$

该节点的微分为：

$$
dz=x\,du+u\,dx.
$$

上游梯度记为：

$$
g_z=\frac{\partial L}{\partial z}.
$$

链式法则给出两个输入端的梯度：

$$
\frac{\partial L}{\partial u}
=
g_zx,
\qquad
\frac{\partial L}{\partial x}
=
g_zu.
\tag{1}\label{eq:multiply-backward}
$$

局部偏导数 $\partial z/\partial u=x$ 固定 $x$ 的当前数值，局部偏导数 $\partial z/\partial x=u$ 固定 $u$ 的当前数值。上游梯度 $g_z$ 将这两个局部敏感度转换为损失梯度。

## 停止梯度的反向规则

停止梯度算子满足：

$$
\operatorname{sg}(v)=v,
\qquad
\frac{\partial\operatorname{sg}(v)}{\partial v}=0.
\tag{2}\label{eq:stop-gradient}
$$

该算子保持前向数值，并指定零梯度的反向规则。令：

$$
y=x^2,\qquad
u=\operatorname{sg}(y),\qquad
z=ux.
$$

前向数值满足 $z=x^3$。反向规则 \eqref{eq:stop-gradient} 给出：

$$
\frac{dz}{dx}
=
\frac{\partial z}{\partial u}\frac{du}{dx}
+
\frac{\partial z}{\partial x}
=
x\cdot0+u
=
x^2.
\tag{3}\label{eq:detached-product-backward}
$$

普通复合函数 $z=x^3$ 的导数为 $3x^2$。公式 \eqref{eq:detached-product-backward} 是带有停止梯度规则的计算图导数。

设一次前向传播的输入为 $x_0$，则 $u_0=x_0^2$。反向传播将 $u_0$ 作为固定值，并计算函数 $\tilde z(x;x_0)=u_0x$ 在 $x=x_0$ 的导数：

$$
\left.\frac{\partial\tilde z(x;x_0)}{\partial x}\right|_{x=x_0}
=u_0
=x_0^2.
$$

该表达式给出 detach 后梯度与普通复合函数导数的关系。

## 转置在输入反传中的来源

正向微分满足：

$$
dy=A\,dx.
$$

标量损失的微分满足：

$$
dL=(\nabla_yL)^Tdy.
$$

代入正向微分可得：

$$
\begin{aligned}
dL
&=(\nabla_yL)^TA\,dx\\
&=(A^T\nabla_yL)^Tdx.
\end{aligned}
$$

输入梯度的定义为：

$$
dL=(\nabla_xL)^Tdx.
$$

比较两式得到：

$$
\nabla_xL=A^T\nabla_yL.
\tag{1}\label{eq:linear-input-backward}
$$

该式也满足内积恒等式：

$$
\langle g_y,A\,dx\rangle
=\langle A^Tg_y,dx\rangle.
$$

矩阵 $A$ 将输入扰动映射到输出空间。矩阵 $A^T$ 将输出端梯度映射回输入空间。前一层的激活值接收该输入梯度，并继续执行反向传播。[^d2l-autograd]

## 单样本的权重梯度

单样本线性层满足 $y=Ax$。元素形式给出：

$$
\frac{\partial L}{\partial A_{ij}}
=
\frac{\partial L}{\partial y_i}
\frac{\partial y_i}{\partial A_{ij}}
=
\frac{\partial L}{\partial y_i}x_j.
$$

矩阵形式为：

$$
\nabla_A L=(\nabla_yL)x^T.
\tag{2}\label{eq:single-sample-weight-backward}
$$

公式 \eqref{eq:linear-input-backward} 与公式 \eqref{eq:single-sample-weight-backward} 分别给出输入梯度和权重梯度。

## 批量线性层的矩阵推导

设 batch 大小为 $B$，输入特征数为 $d$，输出特征数为 $m$。行样本约定下：

$$
X\in\mathbb{R}^{B\times d},\qquad
W\in\mathbb{R}^{d\times m},\qquad
b\in\mathbb{R}^{m},\qquad
Z=XW+\mathbf{1}_B b^T.
$$

其中 $\mathbf{1}_B\in\mathbb{R}^{B}$ 为全 $1$ 列向量。目标张量记为 $T\in\mathbb{R}^{B\times m}$。逐元素均方误差的标量损失定义为：

$$
L=\frac{1}{2Bm}\lVert Z-T\rVert_F^2.
$$

输出端梯度为：

$$
G_Z=\nabla_ZL=\frac{Z-T}{Bm}.
\tag{3}\label{eq:output-gradient}
$$

线性层的微分为：

$$
dZ=dX\,W+X\,dW+\mathbf{1}_B\,db^T.
$$

Frobenius 内积将标量损失微分写为：

$$
dL=\operatorname{tr}(G_Z^T\,dZ).
$$

将 $dZ$ 代入并按 $dX$、$dW$ 与 $db$ 分组：

$$
\begin{aligned}
dL
&=\operatorname{tr}(G_Z^TdXW)
+\operatorname{tr}(G_Z^TXdW)
+\operatorname{tr}(G_Z^T\mathbf{1}_Bdb^T)\\
&=\operatorname{tr}\!\left((G_ZW^T)^TdX\right)
+\operatorname{tr}\!\left((X^TG_Z)^TdW\right)
+\left(G_Z^T\mathbf{1}_B\right)^Tdb.
\end{aligned}
$$

因此批量线性层的反向传播公式为：

$$
\nabla_XL=G_ZW^T,
\qquad
\nabla_WL=X^TG_Z,
\qquad
\nabla_bL=G_Z^T\mathbf{1}_B.
\tag{4}\label{eq:batch-linear-backward}
$$

偏置梯度等于 $G_Z$ 在 batch 维度上的求和。该求和来自同一个偏置向量对每个样本输出的共享作用。

## 单样本数值核验

设：

$$
A=
\begin{bmatrix}
1&2\\
3&4\\
5&6
\end{bmatrix},
\qquad
x=
\begin{bmatrix}1\\2\end{bmatrix},
\qquad
t=
\begin{bmatrix}4\\10\\18\end{bmatrix}.
$$

正向结果为：

$$
y=Ax=
\begin{bmatrix}5\\11\\17\end{bmatrix}.
$$

平方误差损失的输出端梯度为：

$$
\nabla_yL=y-t=
\begin{bmatrix}1\\1\\-1\end{bmatrix}.
$$

输入梯度与权重梯度分别为：

$$
\nabla_xL=A^T\nabla_yL=
\begin{bmatrix}-1\\0\end{bmatrix},
$$

$$
\nabla_AL=(\nabla_yL)x^T=
\begin{bmatrix}
1&2\\
1&2\\
-1&-2
\end{bmatrix}.
$$

该结果满足公式 \eqref{eq:linear-input-backward} 与公式 \eqref{eq:single-sample-weight-backward}。

## PyTorch 中的梯度存储与参数更新

批量线性层可由下列计算表达：

~~~python
Z = X @ W + b
loss = 0.5 * ((Z - target) ** 2).mean()
loss.backward()
~~~

在此定义下，loss.backward() 计算公式 \eqref{eq:batch-linear-backward} 的各项，并将叶子张量的梯度累积到对应的 .grad 属性：

~~~python
X.grad  # G_Z @ W.T
W.grad  # X.T @ G_Z
b.grad  # G_Z.sum(dim=0)
~~~

优化器依据参数梯度执行更新：

$$
W\leftarrow W-\eta\nabla_WL,
\qquad
b\leftarrow b-\eta\nabla_bL.
$$

训练循环在新的反向传播前清理上一轮累积的参数梯度：

~~~python
optimizer.zero_grad()
loss.backward()
optimizer.step()
~~~

## 工程中的梯度边界

停止梯度用于定义哪些计算结果作为固定目标，哪些参数接收当前损失的梯度。

| 场景 | 前向关系 | 梯度接收范围 |
| --- | --- | --- |
| 教师—学生训练 | $t=\operatorname{sg}(f_{\mathrm{teacher}}(x))$，$L=\ell(f_{\mathrm{student}}(x),t)$ | 学生模型参数 |
| DQN 目标值 | $t=r+\gamma\operatorname{sg}(\max_aQ_{\mathrm{target}}(s',a))$ | 当前价值网络参数 |
| GAN 判别器更新 | $L_D=\ell(D(G(\epsilon)_{\operatorname{sg}}),1)$ | 判别器参数 |
| 截断时间反向传播 | $h_{k+1}=\operatorname{sg}(h_{k+1})$ | 当前时间块的模型参数 |
| 指标与数据导出 | $v=\operatorname{sg}(\hat y)$ | 训练图以外的记录与可视化流程 |

教师模型输出、强化学习目标值和生成器样本在相应训练步骤中构成固定监督信号。循环网络在时间块边界停止梯度，计算图长度与显存占用由时间块长度控制。日志、可视化和 NumPy 转换使用停止梯度后的张量，记录流程与训练图保持独立。

## 小结

1. 计算图记录前向运算依赖，并在反向传播时提供局部导数规则。
2. 叶子张量保存累积梯度，非叶子张量连接相邻计算节点。
3. 乘法节点 $z=ux$ 向两个输入分别传递 $g_zx$ 与 $g_zu$。
4. 停止梯度算子保持前向数值，并在反向传播中将输入梯度设为零。
5. 线性映射 $y=Ax$ 的 Jacobian 为 $A$，标量损失的输入梯度为 $A^T\nabla_yL$。
6. 批量线性层的输入、权重和偏置梯度由公式 \eqref{eq:batch-linear-backward} 给出。

## 参考资料

[^d2l-autograd]: A. Zhang 等，[*Dive into Deep Learning*：Automatic Differentiation](https://d2l.ai/chapter_preliminaries/autograd.html)。

- A. Zhang 等，[*Dive into Deep Learning*：Linear Algebra](https://d2l.ai/chapter_preliminaries/linear-algebra.html)。
- PyTorch，[*Autograd mechanics*](https://docs.pytorch.org/docs/stable/notes/autograd.html)。
