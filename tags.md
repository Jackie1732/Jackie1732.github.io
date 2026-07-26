---
layout: page
title: 主题
permalink: /tags
hide_title: true
wide: true
---

<div class="tags-page" markdown="0">
  {% assign content_items = site.posts | concat: site.notes %}

  <section class="listing-intro motion-enter" aria-labelledby="tags-title">
    <div class="intro-lead">
      <p class="research-kicker">主题导航</p>
      <h1 id="tags-title">按主题翻一翻。</h1>
    </div>
    <div class="intro-aside">
      <p>这里放几类我常写的内容。更具体的技术标签留在每篇文章里。</p>
    </div>
  </section>

  <div class="listing-body">
    <nav class="primary-topic-nav" aria-label="主要主题">
      {% for group_name in site.primary_topic_groups %}
        {% assign visible_group_topics = 0 %}
        {% for topic in site.primary_topics %}
          {% if topic.group == group_name %}
            {% assign topic_item_count = 0 %}
            {% for item in content_items %}
              {% assign topic_match = false %}
              {% if topic.source == "track" %}
                {% if item.track == topic.key %}{% assign topic_match = true %}{% endif %}
              {% else %}
                {% include resolve_tags.html post=item %}
                {% for item_tag in resolved_tags %}
                  {% assign item_tag_key = item_tag | strip %}
                  {% for topic_key in topic.keys %}
                    {% if item_tag_key == topic_key %}{% assign topic_match = true %}{% endif %}
                  {% endfor %}
                {% endfor %}
              {% endif %}
              {% if topic_match %}{% assign topic_item_count = topic_item_count | plus: 1 %}{% endif %}
            {% endfor %}
            {% if topic_item_count > 0 %}{% assign visible_group_topics = visible_group_topics | plus: 1 %}{% endif %}
          {% endif %}
        {% endfor %}

        {% if visible_group_topics > 0 %}
        <section class="primary-topic-group" aria-labelledby="topic-group-{{ forloop.index }}">
          <h2 id="topic-group-{{ forloop.index }}">{{ group_name }}</h2>
          <div class="primary-topic-grid">
            {% for topic in site.primary_topics %}
              {% if topic.group == group_name %}
                {% assign topic_item_count = 0 %}
                {% for item in content_items %}
                  {% assign topic_match = false %}
                  {% if topic.source == "track" %}
                    {% if item.track == topic.key %}{% assign topic_match = true %}{% endif %}
                  {% else %}
                    {% include resolve_tags.html post=item %}
                    {% for item_tag in resolved_tags %}
                      {% assign item_tag_key = item_tag | strip %}
                      {% for topic_key in topic.keys %}
                        {% if item_tag_key == topic_key %}{% assign topic_match = true %}{% endif %}
                      {% endfor %}
                    {% endfor %}
                  {% endif %}
                  {% if topic_match %}{% assign topic_item_count = topic_item_count | plus: 1 %}{% endif %}
                {% endfor %}
                {% if topic_item_count > 0 %}
                  <a href="#{{ topic.id }}" class="primary-topic-link">
                    <strong>{{ topic.label }}</strong>
                    <span>{{ topic_item_count }} 篇</span>
                  </a>
                {% endif %}
              {% endif %}
            {% endfor %}
          </div>
        </section>
        {% endif %}
      {% endfor %}
    </nav>

    {% for topic in site.primary_topics %}
      {% assign topic_item_count = 0 %}
      {% for item in content_items %}
        {% assign topic_match = false %}
        {% if topic.source == "track" %}
          {% if item.track == topic.key %}{% assign topic_match = true %}{% endif %}
        {% else %}
          {% include resolve_tags.html post=item %}
          {% for item_tag in resolved_tags %}
            {% assign item_tag_key = item_tag | strip %}
            {% for topic_key in topic.keys %}
              {% if item_tag_key == topic_key %}{% assign topic_match = true %}{% endif %}
            {% endfor %}
          {% endfor %}
        {% endif %}
        {% if topic_match %}{% assign topic_item_count = topic_item_count | plus: 1 %}{% endif %}
      {% endfor %}

      {% if topic_item_count > 0 %}
      <section class="topic-section" id="{{ topic.id }}">
        <header class="topic-section-header">
          <div>
            <p class="topic-section-group">{{ topic.group }}</p>
            <h2 class="topic-section-title">{{ topic.label }}</h2>
          </div>
          <span class="topic-section-count">{{ topic_item_count }} 篇</span>
        </header>
        <ul class="archive-list">
          {% for item in content_items %}
            {% assign topic_match = false %}
            {% if topic.source == "track" %}
              {% if item.track == topic.key %}{% assign topic_match = true %}{% endif %}
            {% else %}
              {% include resolve_tags.html post=item %}
              {% for item_tag in resolved_tags %}
                {% assign item_tag_key = item_tag | strip %}
                {% for topic_key in topic.keys %}
                  {% if item_tag_key == topic_key %}{% assign topic_match = true %}{% endif %}
                {% endfor %}
              {% endfor %}
            {% endif %}
            {% if topic_match %}
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
      {% endif %}
    {% endfor %}
  </div>

</div>
