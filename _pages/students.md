---
layout: page
permalink: /students/
title: Students
description: Sunway final year projects, Ph.D. and M.Sc. positions, and the students I'm proud of.
nav: true
nav_order: 4

# Each student: name, Chinese name (optional), photo (in assets/img/students/, optional), program, years, work, why I recommend them, and links.
# Text in [square brackets] is a placeholder and shows as such on the page.
students:
  - name: Mingxuan Li
    chinese_name: 李明轩
    photo: /assets/img/students/mingxuan-li.jpg
    program: B.Sc., Queen Mary University of London
    years: 2025 to present
    work: Co-authored five papers with me on university timetabling and space logistics, as first author at PATAT 2026 and GECCO 2026, and was part of our team that ranked 3rd globally in a challenge of ESA's SpOC 4.
    why: Mingxuan is very talented and very bright. With continued effort, he can go really far. He's a genuinely nice young man, honest and transparent, even when his progress isn't going well, and he's great to work with. He has my full recommendation and support, especially now that he's aiming for a Ph.D. position.
    links:
      - name: Website
        url: https://mingxuan-li-official.github.io/
---

<nav class="jump-cards" aria-label="On this page">
  <a class="jump-card" href="#fyp"><i class="fa-solid fa-lightbulb"></i><b>Sunway final year projects</b><span>For Sunway undergraduates</span></a>
  <a class="jump-card" href="#postgraduate"><i class="fa-solid fa-graduation-cap"></i><b>Ph.D. and M.Sc.</b><span>Open positions and how to apply</span></a>
  <a class="jump-card" href="#hall-of-fame"><i class="fa-solid fa-award"></i><b>Hall of Fame</b><span>Students I recommend</span></a>
</nav>

## Sunway final year projects {#fyp}

I supervise final year projects in optimization and Operations Research only. I don't take students at random. I'm looking for students who come with their own starting idea.

You don't need a full proposal or method. That's where I come in, and I'll help you shape it. I just want the first idea to come from you. Here are three ways to find one:

<div class="idea-grid">
  <div class="tile">
    <span class="lbl">Improve Sunway</span>
    <h3>A real-world problem</h3>
    <p>Something in Sunway City or Sunway University that could run better, like timetables, queues, transport, energy, or resource planning.</p>
  </div>
  <div class="tile">
    <span class="lbl">Follow your passion</span>
    <h3>Something you love</h3>
    <p>Tell me what you're passionate about, from sports to gaming to music, and I'll help you find the optimization problem inside it.</p>
  </div>
  <div class="tile">
    <span class="lbl">Go academic</span>
    <h3>A research paper</h3>
    <p>Find a recent paper in a top Operations Research or optimization journal and tell me you want to build on it.</p>
  </div>
</div>

### How it works

<ol class="steps">
  <li><i class="fa-solid fa-lightbulb" aria-hidden="true"></i><h4>Find your idea</h4><p>Even a rough one is fine.</p></li>
  <li><i class="fa-solid fa-envelope" aria-hidden="true"></i><h4>Tell me about it</h4><p><a href="mailto:sinaa@sunway.edu.my">Email me</a> a few lines, or <a href="/contact/#book">book a time</a>.</p></li>
  <li><i class="fa-solid fa-handshake" aria-hidden="true"></i><h4>Meet and decide</h4><p>We meet first, and then we both decide if we're a good fit.</p></li>
</ol>

## Ph.D. and M.Sc. {#postgraduate}

I'm looking for Ph.D. and M.Sc. students in the fields below. Full scholarships and funding are available for top students with strong qualifications.

<div class="idea-grid">
  <div class="tile"><span class="lbl">Field</span><h3>Operations Research and Optimization</h3></div>
  <div class="tile"><span class="lbl">Field</span><h3>Scheduling, Timetabling, and Metaheuristics</h3></div>
  <div class="tile"><span class="lbl">Field</span><h3>Game Theory and Multi-Agent Systems</h3></div>
</div>

### What I look for

<ul class="checks">
  <li>A strong educational background from a top university in your country</li>
  <li>Experience in Operations Research, shown by a thesis or publications</li>
  <li>Good programming skills, preferably in Java and Python</li>
  <li>A solid foundation in the mathematics of optimization</li>
  <li>Upper intermediate or advanced English, with at least IELTS 6.0 or equivalent</li>
</ul>

### How to apply

[Email me](mailto:sinaa@sunway.edu.my) about your educational background, your supervisors, your experience, and your plans for postgraduate study.

Use this subject line: "Prospective [Ph.D. or M.Sc.] Student - Your Name". It shows me you've read these instructions, so I don't review emails with a different subject.

Please attach:

<div class="attach">
  <div class="tile need">
    <span class="lbl">Required now</span>
    <ul>
      <li>Your CV</li>
      <li>Your official transcript (the latest one if you're in your final year)</li>
      <li>Your degree certificates (skip if you're in your final year)</li>
      <li>Proof of English proficiency (skip if you're a native speaker or studied in English)</li>
    </ul>
  </div>
  <div class="tile later">
    <span class="lbl">Later</span>
    <ul>
      <li>A research proposal</li>
      <li>2 recommendation letters</li>
    </ul>
    <p>Not needed at first, but required for the final application.</p>
  </div>
  <div class="tile optional">
    <span class="lbl">Optional</span>
    <ul>
      <li>Abstracts of your thesis or publications</li>
    </ul>
    <p>Not required, but helpful.</p>
  </div>
</div>

I read every application, but because there are so many, I may only reply to shortlisted candidates to set up a meeting. If you're accepted, you'll then apply officially through the university portal before the deadline.

## Hall of Fame {#hall-of-fame}

These students did outstanding work with me, and being listed here is my personal recommendation. If you're an employer or a university and one of them sent you here, think of this as my reference letter, and feel free to [email me](mailto:sinaa@sunway.edu.my) for more.

{% if page.students.size > 0 %}
<div class="fame-grid">
  {% for s in page.students %}
  <article class="fame">
    {% if s.photo %}<img src="{{ s.photo | relative_url }}" alt="{{ s.name }}" loading="lazy">{% else %}<div class="avatar" aria-hidden="true">{{ s.name | slice: 0 }}<span class="placeholder">[Photo]</span></div>{% endif %}
    <div class="body">
      <h3>{{ s.name }}{% if s.chinese_name %} <span class="zh">{{ s.chinese_name }}</span>{% endif %}</h3>
      <p class="role">{{ s.program }} · {{ s.years }}</p>
      <p>{{ s.work }}</p>
      <p class="why{% if s.why contains '[Placeholder' %} placeholder{% endif %}">{{ s.why }}</p>
      {% if s.links %}<div class="chips">{% for l in s.links %}<a class="chip" href="{{ l.url }}">{{ l.name }}</a>{% endfor %}</div>{% endif %}
    </div>
  </article>
  {% endfor %}
</div>
{% else %}
<div class="empty tile"><p>The first students are coming soon.</p></div>
{% endif %}
