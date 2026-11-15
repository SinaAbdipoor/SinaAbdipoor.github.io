---
layout: page
permalink: /news/
title: News & Awards
nav_title: News
description: Talks, awards, and moments worth sharing.
nav: true
nav_order: 5
pattern: timeline
---

{% assign cv = site.data.cv.cv.sections %}

<section class="section">
  <h2>News</h2>
  {% include news.liquid %}
</section>

<section class="section">
  <h2>Talks</h2>
  <div class="list-cards">
    {% for t in cv.Talks %}
    <div class="list-card">
      <time>{% include cv_date.liquid date=t.date %}</time>
      <div><h3>{% include cv_text.liquid text=t.name %}</h3><p class="muted">{{ t.summary }}{% if t.location %} · {{ t.location }}{% endif %}</p></div>
    </div>
    {% endfor %}
  </div>
</section>

<section class="section">
  <h2>Awards</h2>
  <div class="list-cards">
    {% for a in cv.Awards %}
    <div class="list-card">
      <time>{% include cv_date.liquid date=a.date %}</time>
      <div><h3><i class="fa-solid fa-trophy"></i> {{ a.name }}</h3><p class="muted">{{ a.summary }}</p></div>
    </div>
    {% endfor %}
  </div>
</section>
