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
  <p class="lead-text">We live in an era where many of us simply follow whatever our all-knowing AI lords tell us. That makes the ability to think more valuable than ever, and protecting it is the heart of my teaching.</p>
  <div class="split" role="img" aria-label="In class and in assessment: 80% pen and paper, 20% AI">
    <div class="split-pen" style="width: 80%"><b>80%</b> pen and paper, thinking together</div>
    <div class="split-ai" style="width: 20%"><b>20%</b> AI and creativity</div>
  </div>
  <div class="philosophy">
    <article class="tile">
      <h3><i class="fa-solid fa-chalkboard-user"></i> How I teach</h3>
      <p>A while ago, I noticed that relying too much on AI had made some of my own technical skills rusty. That changed how I teach. In class, I go fully traditional with a whiteboard and markers, and we figure things out together step by step. After class, I put AI to work, building LMS games, interactive materials, and slides that help my students learn more. I have tested many approaches, and this mix makes the best use of our time.</p>
    </article>
    <article class="tile">
      <h3><i class="fa-solid fa-pen"></i> How my students learn</h3>
      <p>My students come to class with pen and paper. Each class starts with nothing but the learning objectives and an outline. Over the next 90 minutes or so, we build the content together through questions, discussion, and the occasional quick search. There is no monologue, and that's where I see the light bulb moments a deck of finished slides rarely gives. Once the ideas are clear on paper, students open their AI tools, apply what they just learned, and let their creativity go wild.</p>
    </article>
    <article class="tile">
      <h3><i class="fa-solid fa-scale-balanced"></i> How I assess</h3>
      <p>I assess the same way I teach, because what I care about most is critical thinking. Most of the grade comes from pen and paper assignments and quizzes that test real understanding. The rest rewards the best ideas and most creative solutions built with AI. This way, my students stay fluent with AI, and they stand apart from those who follow it blindly.</p>
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

<section class="section" id="feedback">
  <h2>Student feedback</h2>
  <p class="lead-text">Were you in one of my classes? I'd love to hear from you. Your words help me teach better, and they help future students know what to expect.</p>
  <div class="philosophy">
    <article class="tile">
      <h3><i class="fa-solid fa-list-ol"></i> How to post</h3>
      <ol>
        <li>Sign in with GitHub below. It's free and takes a minute.</li>
        <li>Start with your course and semester, like "BAI3184, Sep 2026".</li>
        <li>Write a few honest sentences and press Comment.</li>
      </ol>
    </article>
    <article class="tile">
      <h3><i class="fa-solid fa-pen-to-square"></i> What to write</h3>
      <ul>
        <li>What was a typical class like?</li>
        <li>What did you learn, and what helped you most?</li>
        <li>What could be better?</li>
        <li>Would you recommend the course to a friend?</li>
      </ul>
    </article>
    <article class="tile">
      <h3><i class="fa-solid fa-circle-info"></i> Good to know</h3>
      <p>Please be fully honest. The good and the bad both help me grow. Your feedback is public and shows right away under your GitHub name, so just keep personal details like grades or student IDs out of it.</p>
    </article>
  </div>
  <div class="feedback-box">{% include giscus.liquid %}</div>
</section>
