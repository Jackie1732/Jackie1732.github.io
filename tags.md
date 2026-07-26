---
layout: page
title: 主题
permalink: /tags
hide_title: true
wide: true
---

<div class="tags-page" markdown="0">
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

  <section class="listing-intro motion-enter" aria-labelledby="tags-title">
    <div class="intro-lead">
      <p class="research-kicker">主题索引</p>
      <h1 id="tags-title">从线索进入，不必按时间阅读。</h1>
    </div>
    <div class="intro-aside">
      <p>安全文章与研究笔记共用一套主题索引。先选一个概念，再沿着相关记录继续读下去。</p>
      <p class="listing-count"><strong>{{ unique_tags | size }}</strong> 个主题</p>
    </div>
  </section>

  <div class="listing-body">
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
        <h2 class="tag-section-title">
          {% if tag_info %}{{ tag_info.label }}{% else %}{{ tag }}{% endif %}
        </h2>
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

</div>
