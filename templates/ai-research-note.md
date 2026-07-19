---
title: "笔记标题"
description: "一句话写下问题与结论。"
updated: 2026-07-16
track: deep-learning
content_type: study-note # study-note | paper-review | experiment | group-meeting
status: active # draft | active | reviewed | archived
audience: "具备基础 Python 阅读能力的读者。"
prerequisites: [Python, 线性代数基础]
categories: [deep-learning]
tags: [d2l, pytorch]
series: d2l
series_order: 1
math: true
mermaid: false
article_tools: true
bibliography: false
toc: true

# 论文阅读时取消注释并填写；没有该块时不会展示。
# paper:
#   title: "论文原题"
#   authors: "First Author et al."
#   venue: "Conference or Journal"
#   year: 2025
#   doi: "10.xxxx/example"
#   arxiv: "2501.00001"
#   pdf: "https://..."
#   code: "https://github.com/..."

# 实验复盘时取消注释；提交应指向可复现代码的 commit。
# experiment:
#   dataset: "数据集与版本"
#   environment: "Python 3.12 · PyTorch 2.x"
#   hardware: "GPU / CPU"
#   seed: 42
#   commit: "abc1234"
#   artifacts: "https://..."

# 组会或公开分享时取消注释。
# presentation:
#   event: "组会名称"
#   date: 2026-07-17
#   slides: "https://..."
---

## 摘要

- 结论与边界。
- 可以继续追问的地方。

## 问题

本文想回答什么。

## 推演

概念、公式、代码与判断。

行内公式：$\mathbf{x} \in \mathbb{R}^d$。

展示公式：

$$
\lVert \mathbf{x} \rVert_2 = \sqrt{\sum_i x_i^2}
$$

## 验证

环境、数据、方法与结果。

## 局限

尚未回答的部分。

## 更新

- 2026-07-16：初稿。

## 参考

文献条目放在 `_bibliography/references.bib`，正文引用写作：`{% raw %}{% cite citation-key %}{% endraw %}`。将 `bibliography` 设为 `true` 后，文末会按 GB/T 7714—2015 顺序编码制自动生成已引用条目，无需手写编号列表。

## 图、表与提示块

```liquid
{% raw %}{% include figure.html
  src="/assets/figures/example.svg"
  alt="图像的文字等价说明"
  number="1"
  caption="图注说明图展示的事实。"
  source="数据集或生成脚本"
%}{% endraw %}
```

> [!NOTE]
>
> 提示块用于边界、风险或复现说明；普通引用仍使用普通引用块。
