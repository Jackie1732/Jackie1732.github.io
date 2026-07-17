---
title: "从 Jacobian 到转置：线性层怎样传回梯度"
description: "区分向量函数的 Jacobian 与标量损失的梯度，理解线性层反向传播中为何出现 A 的转置。"
date: 2026-07-17
updated: 2026-07-17
permalink: /notes/deep-learning/d2l/jacobian-and-transpose-in-backprop/
track: foundations
content_type: study-note
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

- 对向量函数 $y=Ax$，导数是 Jacobian 矩阵 $A$，而不是 $A^T$。
- 当 $y$ 再经过标量损失 $L(y)$ 时，才有

  $$
  \nabla_x L=A^T\nabla_y L.
  $$

- $A^T$ 的职责是把输出端的梯度传回输入端；若要更新权重 $A$，单个样本对应的梯度是 $(\nabla_yL)x^T$。

## 先把三个对象分开

线性层的讨论里，最容易混在一起的是向量、向量值函数与标量函数：

| 对象 | 输入与输出 | 描述它的一阶变化 |
| --- | --- | --- |
| 输入向量 $x$ | $x\in\mathbb{R}^n$ | 它本身没有导数 |
| 线性映射 $y=Ax$ | $\mathbb{R}^n\to\mathbb{R}^m$ | Jacobian：$A$ |
| 损失 $L(y)$ | $\mathbb{R}^m\to\mathbb{R}$ | 梯度：$\nabla_yL$ |

真正被训练的复合函数是：

$$
x\longrightarrow y=Ax\longrightarrow L(y)\in\mathbb{R}.
$$

因此，“$Ax$ 的梯度是 $A^T$”并不准确。更严谨的说法是：

$$
\nabla_x\bigl(L(Ax)\bigr)=A^T\nabla_yL.
$$

## 向量为什么通常写成列？

抽象向量没有行、列之分。选定一组基后，才用坐标记录它；把坐标写为列向量是最常见的约定。

$$
x\in\mathbb{R}^{n\times1},\qquad
A\in\mathbb{R}^{m\times n},\qquad
y=Ax\in\mathbb{R}^{m\times1}.
$$

这样线性映射和函数复合的顺序一致：先做 $A$，再做 $B$，便写成 $B(Ax)=(BA)x$。

行向量同样合法。若 $x_{\mathrm{row}}$ 是 $1\times n$ 行向量，则同一个映射可写为：

$$
y_{\mathrm{row}}=x_{\mathrm{row}}A^T.
$$

区别只是所有矩阵乘法的左右顺序与转置都要一并改变；并不是行向量“不能表示函数输入”。

## Jacobian：向量输出的一阶变化

对一般向量函数 $y(x):\mathbb{R}^n\to\mathbb{R}^m$，采用“行对应输出、列对应输入”的约定：

$$
J_y(x)=\left[\frac{\partial y_i}{\partial x_j}\right]_{i,j}
\in\mathbb{R}^{m\times n}.
$$

它回答的是：输入发生一个很小的变化 $dx$ 时，输出会如何变化？

$$
dy\approx J_y(x)\,dx.
$$

现在令：

$$
y=Ax,\qquad
y_i=\sum_{j=1}^{n}A_{ij}x_j.
$$

于是：

$$
\frac{\partial y_i}{\partial x_j}=A_{ij},
\qquad
\boxed{J_y(x)=A.}
$$

线性映射没有高阶项，因此这里的关系是精确的：

$$
dy=A\,dx.
$$

有些资料把 Jacobian 排成“列对应输出、行对应输入”，会把同一组偏导写成 $A^T$。这是 Jacobian 的排版约定不同，不是导数本身变了。

## 标量损失：把输出变成可优化的目标

模型输出 $y$ 往往有多个分量，但训练需要一个可以比较、可以最小化的数。给定目标 $t$，平方误差就是一个常见的标量损失：

$$
L(y)=\frac12\lVert y-t\rVert_2^2.
$$

它的输出梯度：

$$
g_y=\nabla_yL
$$

表示：分别轻微改变每个 $y_i$ 时，损失会怎样变化。对于上面的平方误差，有 $g_y=y-t$。

把向量输出压成一个标量，并不是为了数学形式好看，而是为了让优化器有一个明确的目标：沿哪个方向调整参数，能使损失下降。

## 转置在哪里出现？

由正向传播：

$$
dy=A\,dx.
$$

又因为 $L$ 是标量函数：

$$
dL=(\nabla_yL)^Tdy.
$$

将前式代入：

$$
\begin{aligned}
dL
&=(\nabla_yL)^TA\,dx\\
&=(A^T\nabla_yL)^Tdx.
\end{aligned}
$$

另一方面，按输入梯度的定义：

$$
dL=(\nabla_xL)^Tdx.
$$

比较两式便得到：

$$
\boxed{\nabla_xL=A^T\nabla_yL.}
$$

这也可由内积理解：

$$
\langle g_y,A\,dx\rangle
=\langle A^Tg_y,dx\rangle.
$$

正向的 $A$ 把输入扰动送往输出；反向的 $A^T$ 把输出端“对损失的敏感度”传回输入端。这里的 $x$ 常常是前一层的激活值，因此这个梯度会继续向网络更前方传播。[^d2l-autograd]

## 一个数值例子

令：

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

正向计算为：

$$
y=Ax=
\begin{bmatrix}5\\11\\17\end{bmatrix}.
$$

取平方误差：

$$
L=\frac12\lVert y-t\rVert_2^2,
\qquad
\nabla_yL=y-t=
\begin{bmatrix}1\\1\\-1\end{bmatrix}.
$$

向输入端反传：

$$
\nabla_xL=
\begin{bmatrix}
1&3&5\\
2&4&6
\end{bmatrix}
\begin{bmatrix}1\\1\\-1\end{bmatrix}
=
\begin{bmatrix}-1\\0\end{bmatrix}.
$$

这说明当前位置附近，增大 $x_1$ 会使损失下降；$x_2$ 的一阶影响恰好为零。

## 传回梯度，不等于直接更新输入

若 $x$ 是原始数据，通常不会在训练中修改它。$\nabla_xL$ 的主要作用是继续传给前一层。

若 $A$ 才是待训练的权重，那么对单个样本：

$$
\frac{\partial L}{\partial A_{ij}}
=\frac{\partial L}{\partial y_i}x_j,
\qquad
\boxed{\nabla_A L=(\nabla_yL)x^T.}
$$

在上面的例子中：

$$
\nabla_A L=
\begin{bmatrix}1\\1\\-1\end{bmatrix}
\begin{bmatrix}1&2\end{bmatrix}
=
\begin{bmatrix}
1&2\\
1&2\\
-1&-2
\end{bmatrix}.
$$

优化器随后才会更新参数：

$$
A\leftarrow A-\eta\nabla_A L.
$$

## 用 PyTorch 验证

```python
import torch

A = torch.tensor(
    [[1.0, 2.0], [3.0, 4.0], [5.0, 6.0]],
    requires_grad=True,
)
x = torch.tensor([1.0, 2.0], requires_grad=True)
t = torch.tensor([4.0, 10.0, 18.0])

y = A @ x
loss = 0.5 * ((y - t) ** 2).sum()
loss.backward()

print(x.grad)  # tensor([-1.,  0.])
print(A.grad)
# tensor([[ 1.,  2.],
#         [ 1.,  2.],
#         [-1., -2.]])
```

`x.grad` 对应 $A^T\nabla_yL$；`A.grad` 对应 $(\nabla_yL)x^T$。

## 小结

1. 对向量函数 $y=Ax$，其 Jacobian 是 $A$。
2. 对标量复合函数 $L(Ax)$，其输入梯度是 $A^T\nabla_yL$。
3. 训练权重时，单个样本的线性层满足 $\nabla_A L=(\nabla_yL)x^T$。

## 参考资料

[^d2l-autograd]: A. Zhang 等，[*Dive into Deep Learning*：Automatic Differentiation](https://d2l.ai/chapter_preliminaries/autograd.html)。

- A. Zhang 等，[*Dive into Deep Learning*：Linear Algebra](https://d2l.ai/chapter_preliminaries/linear-algebra.html)。
- PyTorch，[*Autograd mechanics*](https://docs.pytorch.org/docs/stable/notes/autograd.html)。
