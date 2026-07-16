---
layout: page
title: 主题导航
permalink: /tags
---

<div class="tags-page" markdown="0">

  <p class="tags-intro">按平台、技术方向与学习主题浏览全部内容。研究笔记与时间流文章会一起出现在对应主题下。</p>

  {% comment %} Build a tag count map {% endcomment %}
  {% assign all_tags_arr = "" | split: "" %}
  {% assign content_items = site.posts | concat: site.notes %}
  {% for item in content_items %}
    {% include resolve_tags.html post=item %}
    {% for tag in resolved_tags %}
      {% assign tag_trimmed = tag | strip %}
      {% if tag_trimmed != "" %}
        {% assign all_tags_arr = all_tags_arr | push: tag_trimmed %}
      {% endif %}
    {% endfor %}
  {% endfor %}

  {% assign unique_tags = all_tags_arr | uniq | sort %}

  <div class="tags-cloud">
    {% for tag in unique_tags %}
      {% assign count = 0 %}
      {% for t in all_tags_arr %}
        {% if t == tag %}{% assign count = count | plus: 1 %}{% endif %}
      {% endfor %}
      {% assign tag_info = site.tag_map[tag] %}
      {% if tag_info %}
        <a href="#{{ tag }}" class="tag-cloud-item {{ tag_info.class }}">
          {{ tag_info.label }} <span class="tag-count">{{ count }}</span>
        </a>
      {% else %}
        <a href="#{{ tag }}" class="tag-cloud-item tag-other">
          {{ tag }} <span class="tag-count">{{ count }}</span>
        </a>
      {% endif %}
    {% endfor %}
  </div>

  {% for tag in unique_tags %}
    {% assign tag_info = site.tag_map[tag] %}
    <section class="tag-section" id="{{ tag }}">
      <h3 class="tag-section-title">
        {% if tag_info %}{{ tag_info.label }}{% else %}{{ tag }}{% endif %}
      </h3>
      <ul class="archive-list">
        {% for item in content_items %}
          {% include resolve_tags.html post=item %}
          {% assign found = false %}
          {% for rt in resolved_tags %}
            {% assign rt_trimmed = rt | strip %}
            {% if rt_trimmed == tag %}{% assign found = true %}{% endif %}
          {% endfor %}
          {% if found %}
          <li class="archive-item">
            {% assign item_date = item.updated | default: item.date %}
            {% if item_date %}<time>{{ item_date | date: "%Y-%m-%d" }}</time>{% endif %}
            <a href="{{ item.url | relative_url }}">{{ item.title }}</a>
            {% if item.difficulty %}
              {% include render_difficulty.html difficulty=item.difficulty %}
            {% endif %}
          </li>
          {% endif %}
        {% endfor %}
      </ul>
    </section>
  {% endfor %}

</div>
