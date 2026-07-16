---
layout: page
title: 研究笔记
permalink: /research/
---

{% assign notes = site.notes | sort: 'updated' | reverse %}

<div class="research-hub" markdown="0">
  <section class="research-intro">
    <p class="research-kicker">Evergreen Knowledge Base</p>
    <h2>Deep Learning 与 LLM 研究笔记</h2>
    <p>这里存放会持续修订的课程笔记、概念梳理、论文阅读和实验复盘。时间流文章仍保留在博客归档中；研究笔记则按知识主题组织。</p>
  </section>

  <section class="research-tracks" aria-labelledby="research-tracks-title">
    <div class="section-heading-row">
      <h2 id="research-tracks-title" class="section-heading">学习与研究路线</h2>
      <span class="research-count">{{ notes | size }} 篇笔记</span>
    </div>
    <div class="track-grid">
      {% for item in site.note_track_map %}
        {% assign track_key = item[0] %}
        {% assign track = item[1] %}
        {% assign track_notes = notes | where: "track", track_key %}
        <a class="track-card {{ track.class }}" href="#{{ track_key }}">
          <span class="track-card-count">{{ track_notes | size }}</span>
          <h3>{{ track.label }}</h3>
          <p>{{ track.description }}</p>
        </a>
      {% endfor %}
    </div>
  </section>

  {% if notes.size == 0 %}
    <section class="empty-note-state">
      <h2>知识库正在建立</h2>
      <p>第一篇笔记可从 <code>templates/ai-research-note.md</code> 复制到 <code>_notes/</code> 对应目录开始。发布后会自动出现在所属路线、首页预览和标签页。</p>
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
