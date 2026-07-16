---
layout: page
title: AI/LLM 研究笔记
permalink: /research/
---

{% assign notes = site.notes | sort: 'updated' | reverse %}

<div class="research-hub" markdown="0">
  <section class="research-intro motion-enter" aria-labelledby="research-intro-title">
    <p class="research-kicker">Public, revisable, evidence-aware</p>
    <h2 id="research-intro-title">把学习过程整理成可被复用的理解。</h2>
    <p>这里记录深度学习与 LLM 方向的课程笔记、概念推导、论文阅读和实验复盘。它们面向公开读者：先交代问题与结论，再给出前置知识、验证依据、局限性和更新时间。</p>
    <div class="research-intro-actions">
      <a class="action-link action-link-primary" href="#research-tracks">查看学习路线 <span aria-hidden="true">&darr;</span></a>
      <a class="action-link action-link-secondary" href="{{ '/about' | relative_url }}">了解写作原则 <span aria-hidden="true">&rarr;</span></a>
    </div>
  </section>

  <section class="research-principles motion-enter motion-enter-delay-1" aria-label="笔记写作标准">
    <article class="research-principle">
      <span class="research-principle-icon" aria-hidden="true">↗</span>
      <h2>结论先行</h2>
      <p>每篇笔记优先回答“这解决什么问题、适用于什么范围”，避免只留下学习流水账。</p>
    </article>
    <article class="research-principle">
      <span class="research-principle-icon" aria-hidden="true">⌁</span>
      <h2>可复现优先</h2>
      <p>涉及实验时尽量说明环境、版本、数据、代码与结果边界，区分事实、推导和个人判断。</p>
    </article>
    <article class="research-principle">
      <span class="research-principle-icon" aria-hidden="true">◎</span>
      <h2>持续修订</h2>
      <p>知识会更新。文章会标记最后更新时间与验证状态，欢迎通过 GitHub 提出勘误或讨论。</p>
    </article>
  </section>

  <section id="research-tracks" class="research-tracks motion-enter motion-enter-delay-2" aria-labelledby="research-tracks-title">
    <div class="section-heading-row">
      <div>
        <p class="section-kicker">Learning map</p>
        <h2 id="research-tracks-title" class="section-heading">学习与研究路线</h2>
      </div>
      {% if notes.size > 0 %}
      <span class="research-count">{{ notes | size }} 篇已发布</span>
      {% else %}
      <span class="research-count">首批内容整理中</span>
      {% endif %}
    </div>
    <div class="track-grid">
      {% for item in site.note_track_map %}
        {% assign track_key = item[0] %}
        {% assign track = item[1] %}
        {% assign track_notes = notes | where: "track", track_key %}
        {% if track_notes.size > 0 %}
        <a class="track-card {{ track.class }}" href="#{{ track_key }}">
          <span class="track-card-count">{{ track_notes | size }}</span>
          <h3>{{ track.label }}</h3>
          <p>{{ track.description }}</p>
          <span class="track-card-action">查看笔记 <span aria-hidden="true">&rarr;</span></span>
        </a>
        {% else %}
        <div class="track-card {{ track.class }} is-planned" aria-label="{{ track.label }}：内容筹备中">
          <span class="track-card-status">筹备中</span>
          <h3>{{ track.label }}</h3>
          <p>{{ track.description }}</p>
          <span class="track-card-action">即将开放</span>
        </div>
        {% endif %}
      {% endfor %}
    </div>
  </section>

  {% if notes.size == 0 %}
    <section class="empty-note-state" aria-labelledby="first-notes-title">
      <p class="research-kicker">Coming next</p>
      <h2 id="first-notes-title">首批公开笔记正在整理</h2>
      <p>将从最容易复用的基础主题开始，逐步扩展为可连续阅读的路线，而不是一次性堆放零散条目。</p>
      <ul class="research-roadmap">
        <li><strong>数学与张量基础：</strong>形状、点积、范数与微积分在深度学习中的角色。</li>
        <li><strong>D2L 与 PyTorch：</strong>数据预处理、训练循环和常见错误的可复现实践。</li>
        <li><strong>LLM 核心路径：</strong>Transformer、预训练、微调、RAG 与系统评测。</li>
      </ul>
    </section>
  {% endif %}

  {% for item in site.note_track_map %}
    {% assign track_key = item[0] %}
    {% assign track = item[1] %}
    {% assign track_notes = notes | where: "track", track_key %}
    {% if track_notes.size > 0 %}
    <section id="{{ track_key }}" class="research-note-section" aria-labelledby="{{ track_key }}-title">
      <div class="section-heading-row">
        <h2 id="{{ track_key }}-title" class="section-heading">{{ track.label }}</h2>
        <span class="research-count">{{ track_notes | size }} 篇</span>
      </div>
      <ul class="research-note-list">
        {% for note in track_notes %}
          <li class="research-note-card">
            <div class="research-note-card-meta">
              {% if note.series %}<span class="note-series">系列：{{ note.series }}</span>{% endif %}
              {% if note.updated %}<time datetime="{{ note.updated | date_to_xmlschema }}">更新于 {{ note.updated | date: "%Y-%m-%d" }}</time>{% endif %}
            </div>
            <h3><a href="{{ note.url | relative_url }}">{{ note.title }}</a></h3>
            {% if note.description %}<p>{{ note.description }}</p>{% endif %}
            <div class="research-note-card-tags">{% include render_tags.html tags=note.tags %}</div>
          </li>
        {% endfor %}
      </ul>
    </section>
    {% endif %}
  {% endfor %}
</div>
