<div align="center">

# >_ GAiLO-Blog

**Security, Deep Learning & LLM Research Notes**

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-deployed-brightgreen?logo=github)](https://Jackie1732.github.io/)
[![Jekyll](https://img.shields.io/badge/Jekyll-3.10-red?logo=jekyll)](https://jekyllrb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue)](/license.md)
[![Posts](https://img.shields.io/badge/Posts-60%2B-green)]()

*Looking for light.*

[**访问博客 →**](https://Jackie1732.github.io/)

</div>

---

## About

个人技术博客，记录网络安全研究、软件开发、深度学习与 LLM 学习过程中的笔记、Writeup 和实验心得。

- 暗色主题 · 响应式布局 · 移动端适配
- 自动标签检测 · 难度等级徽章
- Markdown 全语法支持（代码高亮、任务列表、折叠面板、脚注等）
- `_posts` 时间流文章与 `_notes` 可持续修订的研究笔记分离
- CSS 优先的轻量交互，支持键盘导航与“减少动态效果”系统偏好

## Content

| 标签 | 内容 |
|:---:|------|
| 🟢 **HackTheBox** | HTB 靶机渗透测试 Writeup |
| 🔵 **春秋云境** | 春秋云境靶场实战记录 |
| 🟣 **玄机** | 应急响应与安全运维 |
| 🟠 **域渗透** | Active Directory 攻防技术 |
| 🩵 **Go** | Go 语言项目与学习笔记 |
| 🔴 **Java** | Java 开发笔记 |
| 🩷 **开发** | 通用开发记录 |
| 🟡 **CTF** | CTF 竞赛 Writeup |
| 🧠 **研究笔记** | Deep Learning、LLM、论文阅读与实验复盘 |

文章支持难度标记：`🟢 Easy` · `🟠 Medium` · `🔴 Hard` · `🟣 Insane`

## Tech Stack

| 组件 | 技术 |
|------|------|
| 框架 | Jekyll 3.10 · github-pages 232 |
| 样式 | SCSS · Inter · JetBrains Mono |
| 解析 | kramdown + GFM · Rouge 代码高亮 |
| 部署 | GitHub Actions → GitHub Pages |

## Quick Start

```bash
# 克隆仓库
git clone https://github.com/Jackie1732/Jackie1732.github.io.git
cd Jackie1732.github.io

# 安装依赖 & 本地预览（macOS / Linux）
bundle install
bundle exec jekyll serve
# → http://localhost:4000
```

### Windows：将构建环境固定在 F 盘

仓库提供 [`scripts/build-jekyll.ps1`](scripts/build-jekyll.ps1)。它不改系统 `PATH`，而是在当前 PowerShell 进程中将 Ruby、Gem、Bundler 缓存和生成站点分别指向 `F:\Ruby33-x64` 与 `F:\dev-tools\jekyll`：

```powershell
# 安装 / 更新依赖并构建静态站点到 F:\dev-tools\jekyll\site
.\scripts\build-jekyll.ps1

# 本地预览（http://127.0.0.1:4000）
.\scripts\build-jekyll.ps1 -Serve
```

如需放在其他盘，可传入 `-RubyRoot` 与 `-ToolRoot` 参数。`Gemfile.lock` 已纳入版本控制，用于固定本地可复现的依赖解析结果。

## Research Notes

历史安全文章继续放在 `_posts/`，以保持现有链接不变。新的课程与研究型内容放在 `_notes/`，会自动发布到 `/notes/.../`，并由 [研究笔记](https://jackie1732.github.io/research/) 页面按路线聚合。

```text
_notes/
  deep-learning/
    d2l/
  llm/
  papers/
  experiments/
```

从 [`templates/ai-research-note.md`](templates/ai-research-note.md) 复制模板开始。每篇笔记应明确填写：

```yaml
updated: 2026-07-16
track: deep-learning # foundations | deep-learning | llm | papers | experiments
tags: [d2l, pytorch]
series: d2l
math: true
toc: true
```

`track` 是知识库的主分类，`tags` 用于细粒度检索；不要依赖标题关键词为新笔记自动分类。设置 `math: true` 后，页面会按需加载 MathJax，以支持 TeX 公式。

## 写下笔记

新笔记从问题出发，写下推演、验证与参考。安全内容只属于授权的场景。

[`templates/ai-research-note.md`](templates/ai-research-note.md) 提供一个简洁的起点。

## License

[MIT License](/license.md)
