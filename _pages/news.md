---
layout: page
permalink: /news/
title: News & Awards
nav_title: News & Awards
description: Talks, awards, and moments worth sharing.
nav: true
nav_order: 5

# Award photos, keyed by "date name" as in the CV. A link opens a news page instead of zooming.
award_photos:
  "2026-08 Best Paper Award": { photo: /assets/img/news/icacte-talk.jpg, link: /news/icacte-best-paper/ }
  "2024-03 Best Paper Award": { photo: /assets/img/awards/cspa-best-paper.jpg }
  "2023-10 Special Jury Award, Postgraduate Colloquium": { photo: /assets/img/awards/special-jury.jpg }
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
    {% assign key = a.date | append: ' ' | append: a.name %}
    {% assign shot = page.award_photos[key] %}
    <div class="list-card{% if shot %} has-photo{% endif %}">
      <time>{% include cv_date.liquid date=a.date %}</time>
      <div><h3><i class="fa-solid fa-trophy"></i> {{ a.name }}</h3><p class="muted">{{ a.summary }}</p></div>
      {% if shot.link %}<a class="award-photo" href="{{ shot.link | relative_url }}"><img src="{{ shot.photo | relative_url }}" alt="{{ a.name }}" loading="lazy"></a>
      {% elsif shot %}<img class="award-photo" src="{{ shot.photo | relative_url }}" alt="{{ a.name }}" loading="lazy" data-zoomable>{% endif %}
    </div>
    {% endfor %}
  </div>
</section>
