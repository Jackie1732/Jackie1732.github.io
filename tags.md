---
layout: page
title: 标签
permalink: /tags
---

<div class="tags-page">

  {% comment %} Build a tag count map {% endcomment %}
  {% assign all_tags_arr = "" | split: "" %}
  {% for post in site.posts %}
    {% include resolve_tags.html post=post %}
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
        {% for post in site.posts %}
          {% include resolve_tags.html post=post %}
          {% assign found = false %}
          {% for rt in resolved_tags %}
            {% assign rt_trimmed = rt | strip %}
            {% if rt_trimmed == tag %}{% assign found = true %}{% endif %}
          {% endfor %}
          {% if found %}
          <li class="archive-item">
            <time>{{ post.date | date: "%Y-%m-%d" }}</time>
            <a href="{{ post.url | prepend: site.baseurl | replace: '//', '/' }}">{{ post.title }}</a>
            {% if post.difficulty %}
              {% include render_difficulty.html difficulty=post.difficulty %}
            {% endif %}
          </li>
          {% endif %}
        {% endfor %}
      </ul>
    </section>
  {% endfor %}

</div>
