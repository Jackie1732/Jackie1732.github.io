---
layout: page
title: 安全文章
hide_title: true
wide: true
---

<section class="listing-intro motion-enter" aria-labelledby="archive-title" markdown="0">
  <div class="intro-lead">
    <p class="research-kicker">安全与开发</p>
    <h1 id="archive-title">做过的题，踩过的坑，都放在这里。</h1>
  </div>
  <div class="intro-aside">
    <p>主要是靶场、CTF、应急响应题目和开发笔记。文章按时间排列，想找具体内容也可以用主题导航。</p>
    <div class="listing-intro-meta">
      <span><strong>{{ site.posts | size }}</strong> 篇文章</span>
      <a href="{{ '/tags' | relative_url }}">按主题浏览 <span aria-hidden="true">→</span></a>
    </div>
  </div>
</section>

<section class="archive" markdown="0">
  <div class="section-heading-row">
    <div>
      <p class="section-kicker">按年份</p>
      <h2 class="section-heading">全部文章</h2>
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
