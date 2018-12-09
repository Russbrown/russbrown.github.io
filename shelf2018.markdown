---
layout: default
title: My Reading Shelf 2018
date:   2018-12-01
---

<h1>2018</h1>

<ul class="grid">
{% for post in site.categories.books %}
		<li class="grid__cell 1/3--handheld-and-up 1/4--lap-and-up ">
			<div class='post__summary'>
				<a href="{{ post.url }}" class="post__title">{{ post.title }}</a>
				<img src=" {{ post.img }} " class="post__img"/>
				<div class="post__date">{{ post.date | date_to_long_string }}</div>
			</div>
		</li>
{% endfor %}
</ul>


