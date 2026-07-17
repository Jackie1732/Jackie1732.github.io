---
layout: page
title: 学术写作格式
description: "研究笔记、论文阅读与实验复盘的格式约定。"
permalink: /writing/academic/
article_tools: true
math: true
mermaid: true
bibliography: true
---

研究笔记可以轻一些，但证据链不应含糊。本页约定了本站可直接构建、可长期维护的学术写法。

## 从元数据开始

论文阅读、实验复盘和组会分享都放在 `_notes/`。用 `paper`、`experiment` 或 `presentation` 填写来源与复现条件；布局会只在字段存在时展示相应记录卡。

```yaml
content_type: paper-review # study-note | paper-review | experiment | group-meeting
status: active             # draft | active | reviewed | archived
math: true
mermaid: true
bibliography: true

paper:
  title: "论文原题"
  authors: "First Author et al."
  venue: "Conference or Journal"
  year: 2025
  doi: "10.xxxx/example"
  arxiv: "2501.00001"
  pdf: "https://..."
  code: "https://github.com/..."

experiment:
  dataset: "数据集与版本"
  environment: "Python 3.12 · PyTorch 2.x"
  hardware: "GPU / CPU"
  seed: 42
  commit: "abc1234"
  artifacts: "https://..."
```

## 公式、编号与交叉引用

需要公式的页面设置 `math: true`。行内公式使用 `$...$`，展示公式使用 `$$...$$`。本站启用了 AMS 编号与同页交叉引用；标签在单篇文章内保持唯一即可。

$$
\nabla_{\mathbf{x}} L=A^\mathsf{T}\nabla_{\mathbf{y}}L
\tag{1}\label{eq:linear-backward}
$$

例如，公式 \eqref{eq:linear-backward} 描述线性层把输出端梯度传回输入端的方式。化学式也可直接写作 $\ce{2H2 + O2 -> 2H2O}$。

长公式会在自身容器中横向滚动，而不会撑破正文阅读列。不要在 Markdown 中使用 `\(...\)`；当前 GFM 解析会吞掉这对反斜杠，统一使用 `$...$` 与 `$$...$$`。

## 图、表与实验曲线

论文图、实验曲线和架构图优先以版本化的 SVG、PNG 或 WebP 保存；图的生成脚本、数据版本与随机种子应和文章一起记录。这样浏览器只负责阅读，图像本身也可用于演示文稿与归档。

{% include figure.html src="/assets/figures/academic-writing-flow.svg" alt="问题、方法、证据与结论构成的研究文章证据链" number="1" caption="一篇研究文章最小的证据链。" source="本站示例图" %}

复用图组件时写：

```liquid
{% raw %}{% include figure.html
  src="/assets/figures/example.svg"
  alt="图像的文字等价说明"
  number="2"
  caption="图注应说明图展示了什么。"
  source="数据集或生成脚本"
  label="fig:example"
%}{% endraw %}
```

简单比较可用 GFM 表格；需要图注、行/列范围或复杂单元格时，使用原生 HTML 表格和 `caption`。窄屏下表格会成为可聚焦的横向滚动区域。

<table>
  <caption>表 1. 复现记录中应留下的最小信息。</caption>
  <thead>
    <tr><th scope="col">维度</th><th scope="col">应记录内容</th><th scope="col">目的</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">数据</th><td>版本、切分与预处理</td><td>判断结果是否可比较</td></tr>
    <tr><th scope="row">运行</th><td>环境、硬件、随机种子与提交</td><td>让他人能够复跑</td></tr>
    <tr><th scope="row">结论</th><td>指标、误差与失效条件</td><td>避免只展示最佳结果</td></tr>
  </tbody>
</table>

## 流程图与架构图

需要可编辑的流程图时设置 `mermaid: true`，再使用 `mermaid` 围栏。它按页从固定版本的 Mermaid 加载，并以严格安全模式渲染；加载失败时会保留可读的源码块。

```mermaid
flowchart LR
  Q[问题] --> H[假设]
  H --> E[实验]
  E --> R[结果]
  R --> C[结论与边界]
```

对已经定稿、需要长期引用的图，建议仍导出 SVG 并使用图组件；这比浏览器即时渲染更稳定。

## 引用、脚注与参考文献

参考文献由 `_bibliography/references.bib` 中的 BibTeX 条目统一维护。正文使用 `{% raw %}{% cite citation-key %}{% endraw %}`，并在 front matter 设置 `bibliography: true`；构建时会按文中出现顺序生成文末文献表。

Transformer 的原始论文可这样引用：{% cite vaswani2017attention %}；课程材料也应标明版本与链接，例如 {% cite zhang2023d2l %}。

脚注适合放补充性来源、术语或不打断正文的限定：[^source-note]

[^source-note]: 关键结论仍应在正文附近给出可验证的出处，而不是只在文末堆链接。

## 提示、代码与可读性

普通引用块仍是引用。若要标记写作边界，可单独写一个 GitHub 风格的提示块：

> [!IMPORTANT]
>
> 结果必须区分“观察到的事实”“由事实作出的推断”和“尚未验证的假设”。

代码块会显示语言标签与复制按钮；长代码保持自身横向滚动。标题右侧的 `#` 可复制小节链接，右侧目录会随阅读位置标出当前章节。

```python
def report(metric, seed):
    return {"metric": metric, "seed": seed}
```

## 边界

本站现在支持 Markdown/GFM、数学公式、化学式、脚注、BibTeX 引用、图注、语义表格、Mermaid、代码高亮、打印样式与复现实验元数据。复杂交互图表不作为正文唯一证据：应同时保存数据、生成脚本和静态导出图。跨文章公式编号与不受信任的原始 HTML 不在支持范围内。
