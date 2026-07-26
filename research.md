---
layout: page
title: 研究笔记
permalink: /research/
hide_title: true
wide: true
---

{% assign notes = site.notes | sort: 'updated' | reverse %}

<div class="research-hub" markdown="0">
  <section class="research-intro motion-enter" aria-labelledby="research-intro-title">
    <div class="intro-lead">
      <p class="research-kicker">我的学习笔记</p>
      <h1 id="research-intro-title">从数学基础开始，一路学到语言模型。</h1>
    </div>
    <div class="intro-aside">
      <p>课程学到哪，笔记就写到哪。公式、代码和论文放在一起，之后查起来更方便。</p>
      <div class="research-intro-actions">
        <a class="action-link action-link-primary" href="#research-tracks">查看笔记分类 <span aria-hidden="true">&darr;</span></a>
        <a class="action-link action-link-secondary" href="{{ '/about' | relative_url }}">关于这个博客 <span aria-hidden="true">&rarr;</span></a>
      </div>
    </div>
  </section>

  <section class="research-principles motion-enter motion-enter-delay-1" aria-label="学习脉络">
    <article class="research-principle">
      <h2>基础</h2>
      <p>补线性代数、概率和张量，也熟悉 Python 与 PyTorch。</p>
    </article>
    <article class="research-principle">
      <h2>模型</h2>
      <p>跟着课程实现模型，把公式、代码和训练结果对起来。</p>
    </article>
    <article class="research-principle">
      <h2>论文与实验</h2>
      <p>读论文时记下问题和方法，再用小实验检查自己的理解。</p>
    </article>
  </section>

  <section id="research-tracks" class="research-tracks motion-enter motion-enter-delay-2" aria-labelledby="research-tracks-title">
    <div class="section-heading-row">
      <div>
        <p class="section-kicker">笔记分类</p>
        <h2 id="research-tracks-title" class="section-heading">正在整理</h2>
      </div>
      {% if notes.size > 0 %}<span class="research-count">{{ notes | size }} 篇</span>{% endif %}
    </div>
    {% if notes.size > 0 %}
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
        <div class="track-card {{ track.class }} is-planned" aria-label="{{ track.label }}（待补）">
          <h3>{{ track.label }}</h3>
          <p>{{ track.description }}</p>
          <span class="track-card-action">还没写</span>
        </div>
        {% endif %}
      {% endfor %}
    </div>
    {% endif %}
  </section>

  {% if notes.size == 0 %}
    <section class="empty-note-state" aria-labelledby="first-notes-title">
      <p class="research-kicker">准备开始</p>
      <h2 id="first-notes-title">这里还没有笔记。</h2>
      <p>我准备先整理数学和张量，再写 D2L、PyTorch、Transformer 与 LLM。</p>
      <ul class="research-roadmap">
        <li><strong>数学与张量</strong><br>形状、点积、范数与微积分。</li>
        <li><strong>D2L 与 PyTorch</strong><br>数据、训练与常见问题。</li>
        <li><strong>Transformer 与 LLM</strong><br>从注意力到推理系统。</li>
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
