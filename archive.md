---
layout: page
title: 安全文章
---

<div class="archive-intro" markdown="0">
  <p>按时间排列的攻防、应急响应与开发记录。也可以从 <a href="{{ '/tags' | relative_url }}">主题</a> 进入。</p>
</div>

<div class="archive-stats" markdown="0">
  <span>共 <strong>{{ site.posts | size }}</strong> 篇</span>
</div>

<section class="archive" markdown="0">
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
