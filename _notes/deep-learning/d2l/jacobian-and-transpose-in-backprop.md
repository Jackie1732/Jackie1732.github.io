---
title: "从 Jacobian 到批量反传：线性层的转置结构"
description: "从 Jacobian、上游梯度与微分出发，推导单样本和批量线性层的输入、权重与偏置梯度。"
date: 2026-07-17
updated: 2026-07-21
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

## 小结

1. 线性映射 $y=Ax$ 的 Jacobian 为 $A$。
2. 标量损失将输出端梯度按 $A^T$ 传回输入端。
3. 单样本权重梯度为 $(\nabla_yL)x^T$。
4. 批量线性层的输入、权重和偏置梯度由公式 \eqref{eq:batch-linear-backward} 给出。
5. backward() 计算并累积梯度，优化器依据参数梯度执行更新。

## 参考资料

[^d2l-autograd]: A. Zhang 等，[*Dive into Deep Learning*：Automatic Differentiation](https://d2l.ai/chapter_preliminaries/autograd.html)。

- A. Zhang 等，[*Dive into Deep Learning*：Linear Algebra](https://d2l.ai/chapter_preliminaries/linear-algebra.html)。
- PyTorch，[*Autograd mechanics*](https://docs.pytorch.org/docs/stable/notes/autograd.html)。
