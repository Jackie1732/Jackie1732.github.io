---
layout: page
title: 归档
---

<div class="archive-stats">
  <span>共 <strong>{{ site.posts | size }}</strong> 篇文章</span>
</div>

<section class="archive">
  {% if site.posts[0] %}
    {% assign currentYear = "" %}
    {% for post in site.posts %}
      {% capture thisYear %}{{ post.date | date: '%Y' }}{% endcapture %}
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