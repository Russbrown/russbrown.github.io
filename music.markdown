---
layout: default
title: Music
---

<h1>Music</h1>

<ul class="grid">
{% for post in site.categories.music %}
  <li>
    <a href="{{ post.url }}" class="album__card">
      <img src="{{ post.img }}" class="album__art" alt="{{ post.title }} by {{ post.artist }}" />
      <div class="album__info">
        <div class="album__artist">{{ post.artist }}</div>
        <div class="album__title">{{ post.title }}</div>
        <div class="album__blurb">{{ post.excerpt }}</div>
      </div>
    </a>
  </li>
{% endfor %}
</ul>
