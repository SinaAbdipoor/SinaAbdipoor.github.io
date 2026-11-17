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
{% assign students_page = site.pages | where: 'permalink', '/students/' | first %}
{% assign fame = students_page.students %}

<p class="lead-text">I have taught since {% include teaching_since.liquid %}, from algorithm design and English to optimization and machine learning. Course materials for my current students are on eLearn and xLearn.</p>

<section class="section">
  <h2>Teaching philosophy</h2>
  <p class="lead-text">In an era where we all simply follow the output of our all-knowing AI lords, the ability to think is becoming priceless. My teaching is built to protect it.</p>
  <div class="split" role="img" aria-label="In class and in assessment: 80% pen and paper, 20% AI">
    <div class="split-pen" style="width: 80%"><b>80%</b> pen and paper, thinking together</div>
    <div class="split-ai" style="width: 20%"><b>20%</b> AI, creativity</div>
  </div>
  <div class="philosophy">
    <article class="tile">
      <h3><i class="fa-solid fa-chalkboard-user"></i> How I teach</h3>
      <p>I noticed that leaning too much on AI tools made some of my own technical skills rusty. So in class, I go fully traditional, with a whiteboard and markers, and my students and I figure things out together as we go. It's a beautiful journey. After class, I use AI tools to help students learn better, with games on the LMS, interactive elements, and slides. I have tested many methods to make sure we never waste our time, and this is the best one I have found so far.</p>
    </article>
    <article class="tile">
      <h3><i class="fa-solid fa-pen"></i> How my students learn</h3>
      <p>Bring pen and paper. Each class starts with only its learning objectives and an outline, and over the next 90 to 100 minutes we build the content together. There is no monologue. I ask a lot of questions, and my students help me a lot, even when they need to look things up along the way. That's where I see the light bulb moments, and it works far better than listening to a full set of finished slides. In the last part of class, students use their AI tools on everything they just learned and let their creativity go wild.</p>
    </article>
    <article class="tile">
      <h3><i class="fa-solid fa-scale-balanced"></i> How I assess</h3>
      <p>Assessment follows the same split, because my focus is critical thinking. Most of it tests understanding and thinking through traditional assignments and quizzes on pen and paper. The rest asks for the best ideas and most creative solutions using AI. This way, my students keep up with AI tools, and stand apart from those who follow them blindly.</p>
    </article>
  </div>
</section>

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
        {% assign star = fame | where: 'name', s.name | first %}
        <h3>{% if star %}<a href="{{ '/students/' | relative_url }}#hall-of-fame">{{ s.name }}</a>{% else %}{{ s.name }}{% endif %}</h3>
        {% if parts.size > 1 %}<p class="muted">{{ parts | pop | join: ', ' }}</p>{% endif %}
      </article>
    {% endfor %}
  </div>
  <p class="muted">Want to work with me? See <a href="{{ '/students/' | relative_url }}#postgraduate">Ph.D. and M.Sc. positions</a> or, for Sunway undergraduates, <a href="{{ '/students/' | relative_url }}#fyp">final year projects</a>.</p>
</section>
