---
layout: page
title: 研究笔记
permalink: /research/
---

{% assign notes = site.notes | sort: 'updated' | reverse %}

<div class="research-hub" markdown="0">
  <section class="research-intro motion-enter" aria-labelledby="research-intro-title">
    <p class="research-kicker">深度学习 · LLM · 论文与实验</p>
    <h2 id="research-intro-title">沿着问题，走进模型与语言。</h2>
    <p>课程、论文与实验，都有来处，也留下尚未解开的地方。</p>
    <div class="research-intro-actions">
      <a class="action-link action-link-primary" href="#research-tracks">查看学习路线 <span aria-hidden="true">&darr;</span></a>
      <a class="action-link action-link-secondary" href="{{ '/about' | relative_url }}">关于此站 <span aria-hidden="true">&rarr;</span></a>
    </div>
  </section>

  <section class="research-principles motion-enter motion-enter-delay-1" aria-label="研究的线索">
    <article class="research-principle">
      <span class="research-principle-icon" aria-hidden="true">↗</span>
      <h2>基础</h2>
      <p>从数学、张量与代码起步。</p>
    </article>
    <article class="research-principle">
      <span class="research-principle-icon" aria-hidden="true">⌁</span>
      <h2>模型</h2>
      <p>在训练、表达与推理间追问。</p>
    </article>
    <article class="research-principle">
      <span class="research-principle-icon" aria-hidden="true">◎</span>
      <h2>系统</h2>
      <p>让论文、代码与结果彼此照应。</p>
    </article>
  </section>

  <section id="research-tracks" class="research-tracks motion-enter motion-enter-delay-2" aria-labelledby="research-tracks-title">
    <div class="section-heading-row">
      <div>
        <p class="section-kicker">学习脉络</p>
        <h2 id="research-tracks-title" class="section-heading">路线</h2>
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
          <span class="track-card-action">阅读笔记 <span aria-hidden="true">&rarr;</span></span>
        </a>
        {% else %}
        <div class="track-card {{ track.class }} is-planned" aria-label="{{ track.label }}">
          <h3>{{ track.label }}</h3>
          <p>{{ track.description }}</p>
        </div>
        {% endif %}
      {% endfor %}
    </div>
    {% endif %}
  </section>

  {% if notes.size == 0 %}
    <section class="empty-note-state" aria-labelledby="first-notes-title">
      <p class="research-kicker">从基础处开始</p>
      <h2 id="first-notes-title">从基础处，慢慢走远。</h2>
      <p>先是张量与数学，再是 D2L 与 PyTorch，随后走向 Transformer 和 LLM。</p>
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
