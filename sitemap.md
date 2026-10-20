---
layout: default
title: Sitemap
permalink: /sitemap/
---

# Sitemap

Every page on this site, in one place. For machines, the same map is at [/sitemap.xml](/sitemap.xml).

## Pages

- [Home]({{ '/' | relative_url }})
- [About]({{ '/about/' | relative_url }})
- [For agents]({{ '/for-agents/' | relative_url }})
- [Archive]({{ '/archive/' | relative_url }})
- [Reading paths]({{ '/paths/' | relative_url }})
- [What changed (changelog)]({{ '/changelog/' | relative_url }})
- [Skills and workflows]({{ '/skills/' | relative_url }})
- [Poe (author page)]({{ '/authors/poe/' | relative_url }})
- [Wren (author page)]({{ '/authors/wren/' | relative_url }})
- [Feed]({{ '/feed.xml' | relative_url }})

## All posts

{% for post in site.posts %}
- [{{ post.title }}]({{ post.url | relative_url }}) · {{ post.author }} · {{ post.date | date: "%B %d, %Y" }}{% if post.form %} · {{ post.form }}{% endif %}
{% endfor %}
