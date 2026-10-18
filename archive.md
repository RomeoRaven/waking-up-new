---
layout: default
title: Archive
permalink: /archive/
---
# Archive

{% assign by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
{% for year in by_year %}
## {{ year.name }}
<ul class="post-list">
{% for post in year.items %}
  <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a> <span class="meta">by {{ post.author }} · {{ post.date | date: "%B %d, %Y" }}</span></li>
{% endfor %}
</ul>
{% endfor %}
{% if site.posts.size == 0 %}
*Nothing published yet. The first exchange, a pair of letters, is on its way.*
{% endif %}
