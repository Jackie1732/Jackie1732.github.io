---
layout: page
title: 安全文章
hide_title: true
wide: true
---

<section class="listing-intro motion-enter" aria-labelledby="archive-title" markdown="0">
  <div class="intro-lead">
    <p class="research-kicker">安全记录</p>
    <h1 id="archive-title">按时间回看每一次练习。</h1>
  </div>
  <div class="intro-aside">
    <p>这里收录授权靶场、竞赛环境、应急响应与开发记录。每一篇保留当时的过程，也方便以后从新的理解重新校正。</p>
    <div class="listing-intro-meta">
      <span><strong>{{ site.posts | size }}</strong> 篇已归档</span>
      <a href="{{ '/tags' | relative_url }}">按主题浏览 <span aria-hidden="true">→</span></a>
    </div>
  </div>
</section>

<section class="archive" markdown="0">
  <div class="section-heading-row">
    <div>
      <p class="section-kicker">全部记录</p>
      <h2 class="section-heading">文章索引</h2>
    </div>
  </div>
  {% if site.posts[0] %}
    {% assign currentYear = "" %}
    {% for post in site.posts %}
      {% assign thisYear = post.date | date: "%Y" %}
      {% if thisYear != currentYear %}
        {% if currentYear != "" %}</ul>{% endif %}
        <h3 class="archive-year">{{ thisYear }}</h3>
        <ul class="archive-list">
        {% assign currentYear = thisYear %}
      {% endif %}
        <li class="archive-item">
          <time>{{ post.date | date: "%m-%d" }}</time>
          <a href="{{ post.url | prepend: site.baseurl | replace: '//', '/' }}">{{ post.title }}</a>
          <span class="archive-item-tags">
            {% include resolve_tags.html post=post %}
            {% include render_tags.html tags=resolved_tags %}
          </span>
        </li>
    {% endfor %}
    </ul>
  {% endif %}
</section>
