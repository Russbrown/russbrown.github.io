---
layout: default
title: Making
---

<h1>Making</h1>

<ul class="grid">
{% for post in site.categories.making %}
  <li>
    {% if post.link %}
      <a href="{{ post.link }}" class="project__card" target="_blank" rel="noopener">
    {% else %}
      <a href="{{ post.url }}" class="project__card">
    {% endif %}
      {% if post.img %}
        <img src="{{ post.img }}" class="project__img" alt="{{ post.title }}" />
      {% else %}
        <div class="project__placeholder">
          {% if post.type %}<span class="project__placeholder-type">{{ post.type }}</span>{% endif %}
        </div>
      {% endif %}
      <div class="project__info">
        {% if post.type %}<div class="project__type">{{ post.type }}</div>{% endif %}
        <div class="project__title">{{ post.title }}</div>
        <div class="project__blurb">{{ post.excerpt }}</div>
      </div>
    </a>
  </li>
{% endfor %}
</ul>
