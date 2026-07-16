---
layout: page
title: 关于本站
permalink: /about
---

<section class="about-intro" markdown="0">
  <p class="research-kicker">About GAiLO-Blog</p>
  <h2>一个面向公开读者的技术学习与实践站点。</h2>
  <p>这里记录我在安全研究、深度学习与 LLM 系统方向的长期学习和实践。目标不是堆放个人流水账，而是把问题、判断过程和可复用的经验整理成陌生读者也能理解、检索和继续验证的内容。</p>
  <div class="about-intro-actions">
    <a class="action-link action-link-primary" href="{{ '/research/' | relative_url }}">浏览 AI/LLM 笔记 <span aria-hidden="true">&rarr;</span></a>
    <a class="action-link action-link-secondary" href="{{ '/archive' | relative_url }}">浏览安全文章 <span aria-hidden="true">&rarr;</span></a>
  </div>
</section>

<section class="about-grid" aria-label="内容范围" markdown="0">
  <article class="about-card">
    <p class="about-card-kicker">Security</p>
    <h2>安全文章</h2>
    <p>围绕授权靶场、CTF、公开漏洞材料与防守视角的复盘，尽量解释攻击路径背后的关键观察，以及相应的检测和缓解思路。</p>
  </article>
  <article class="about-card">
    <p class="about-card-kicker">AI / LLM</p>
    <h2>研究笔记</h2>
    <p>覆盖数学基础、深度学习、Transformer、论文阅读和实验。文章会逐步补充前置知识、参考资料、实验条件与结论边界。</p>
  </article>
  <article class="about-card">
    <p class="about-card-kicker">Engineering</p>
    <h2>开发与复盘</h2>
    <p>记录工具、代码和系统实现中真正踩过的坑。能复现的部分给出环境和版本，仍在探索的部分会如实标为进行中。</p>
  </article>
</section>

<section class="writing-principles" aria-labelledby="writing-principles-title" markdown="0">
  <div class="section-heading-row">
    <div>
      <p class="section-kicker">Editorial policy</p>
      <h2 id="writing-principles-title" class="section-heading">写作与更新原则</h2>
    </div>
  </div>
  <ol class="writing-principle-list">
    <li><strong>读者优先：</strong>先交代问题、结论与适用范围，再展开过程；避免只对“当时的自己”有意义的缩写和上下文。</li>
    <li><strong>证据优先：</strong>引用资料、实验结果与个人推导会尽量区分；不确定的结论会标注限制与待验证项。</li>
    <li><strong>修订优先：</strong>知识和工具都会变化。内容会尽量标注更新时间；欢迎通过 GitHub 提出勘误、补充或不同观点。</li>
  </ol>
</section>

<section class="safety-note" aria-labelledby="safety-note-title" markdown="0">
  <h2 id="safety-note-title">安全内容说明</h2>
  <p>安全相关文章仅面向授权靶场、竞赛环境、公开材料和防守学习。真实目标的测试应先取得明确授权；本文站不提供针对未授权系统的操作建议。</p>
</section>

<section class="about-contact" aria-labelledby="about-contact-title" markdown="0">
  <h2 id="about-contact-title">联系与反馈</h2>
  <p>发现错误、希望讨论某个主题，或想补充参考资料，欢迎通过 <a href="https://github.com/{{ site.github_username }}" target="_blank" rel="noopener">GitHub</a> 联系；也可以发送邮件至 <a href="mailto:{{ site.author.email }}">{{ site.author.email }}</a>。</p>
</section>
