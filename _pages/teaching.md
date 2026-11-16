---
layout: page
title: Teaching
permalink: /teaching/
description: Courses I teach and have taught, and the students I supervise.
nav: true
nav_order: 3

# Course code links that are not in the CV. Course materials for current students are on eLearn and xLearn.
code_links:
  SEG2202: https://github.com/SinaAbdipoor/2603-seg2202
  SSK5603: https://github.com/SinaAbdipoor/MachineLearning_CS229
  SSK3101: https://github.com/SinaAbdipoor/SSK3101_Sem1_2020-2021
---

{% assign cv = site.data.cv.cv.sections %}

<p class="lead-text">I have taught since {% include teaching_since.liquid %}, from algorithm design and English to optimization and machine learning. Course materials for my current students are on eLearn and xLearn.</p>

<section class="section">
  <h2>Courses</h2>
  <div class="course-grid">
    {% for c in cv.Teaching %}
      {% assign code = c.name | split: '(' | last | remove: ')' %}
      {% assign title = c.name | split: ' (' | first %}
      {% assign parts = c.summary | split: ', ' %}
      <article class="course">
        <div class="course-top">
          <span class="code">{% if c.name contains '(' %}{{ code }}{% endif %}</span>
          <time>{% include cv_date.liquid date=c.date %}</time>
        </div>
        <h3>{{ title }}</h3>
        <p class="role">{{ parts[0] }}</p>
        <p class="muted">{{ parts | shift | join: ', ' }}</p>
        {% assign first_code = code | split: ',' | first %}
        {% if page.code_links[first_code] %}<a class="more" href="{{ page.code_links[first_code] }}"><i class="fa-brands fa-github"></i> Course code</a>{% endif %}
      </article>
    {% endfor %}
  </div>
</section>

<section class="section">
  <div class="section-head">
    <h2>Supervision</h2>
    <a class="more" href="{{ '/students/' | relative_url }}#hall-of-fame">Hall of Fame <span aria-hidden="true">→</span></a>
  </div>
  <div class="course-grid">
    {% for s in cv.Supervision %}
      {% assign parts = s.summary | split: ', ' %}
      <article class="course">
        <div class="course-top">
          <span class="code">{{ parts | last }}</span>
          <time>{{ s.start_date }} to {{ s.end_date }}</time>
        </div>
        <h3>{{ s.name }}</h3>
        {% if parts.size > 1 %}<p class="muted">{{ parts | pop | join: ', ' }}</p>{% endif %}
      </article>
    {% endfor %}
  </div>
  <p class="muted">Want to work with me? See <a href="{{ '/students/' | relative_url }}#postgraduate">Ph.D. and M.Sc. positions</a> or, for Sunway undergraduates, <a href="{{ '/students/' | relative_url }}#fyp">final year projects</a>.</p>
</section>
