---
layout: page
title: Projects
permalink: /projects/
description: Research and engineering projects.
nav: true
nav_order: 2
display_categories: [research, earlier]
---

You'll find the code for many of these on my [GitHub](https://github.com/SinaAbdipoor).

{% for category in page.display_categories %}
<h2 class="proj-group" id="{{ category }}">{{ category }}</h2>
<div class="proj-grid">
  {% assign sorted_projects = site.projects | where: "category", category | sort: "importance" %}
  {% for project in sorted_projects %}
    {% include projects.liquid %}
  {% endfor %}
</div>
{% endfor %}
