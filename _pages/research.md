---
layout: page
title: Research
permalink: /research/
description: Optimization for real-world problems, with methods that work well beyond a single benchmark.
nav: true
nav_order: 1
pattern: contours

areas:
  - title: Scheduling and timetabling
    text: University course timetabling with student sectioning, built on real competition instances like ITC 2019, and now healthcare timetabling from IHTC 2024.
    viz: gantt
  - title: Metaheuristics and hybrid algorithms
    text: Search methods such as simulated annealing, local search, and genetic algorithms, combined so each covers the others' weak spots.
    viz: convergence
  - title: Optimality versus generality
    text: Most methods are tuned to win on one benchmark. I study how well they hold up across many problems, and how to measure that fairly.
    viz: scatter
  - title: Machine learning
    text: Forecasting, recommendation, and learning that helps optimization, usually with students and colleagues.
    viz: wave
---

{% assign cv = site.data.cv.cv.sections %}
{% assign s = site.data.socials %}

<section class="section">
  <h2>What I work on</h2>
  <div class="area-grid">
    {% for a in page.areas %}
      <article class="tile">
        <h3>{{ a.title }}</h3>
        <p>{{ a.text }}</p>
        <canvas data-viz="{{ a.viz }}" aria-hidden="true"></canvas>
      </article>
    {% endfor %}
  </div>
  <div class="chips">
    {% assign interests = cv['Research Interests'][0].details | split: ', ' %}
    {% for i in interests %}<span class="chip">{{ i }}</span>{% endfor %}
  </div>
</section>

<section class="section">
  <div class="section-head">
    <h2>Selected papers</h2>
    <a class="more" href="https://scholar.google.com/citations?user={{ s.scholar_userid }}">All papers on Google Scholar <span aria-hidden="true">→</span></a>
  </div>
  {% include selected_papers.liquid %}
  <div class="link-cards">
    <a class="link-card" href="https://scholar.google.com/citations?user={{ s.scholar_userid }}"><i class="ai ai-google-scholar"></i><span><b>Google Scholar</b>{{ cv['Research Impact'][0] | split: ' (' | first }}</span></a>
    <a class="link-card" href="https://www.researchgate.net/profile/{{ s.research_gate_profile }}"><i class="ai ai-researchgate"></i><span><b>ResearchGate</b>Full texts and projects</span></a>
    <a class="link-card" href="https://orcid.org/{{ s.orcid_id }}"><i class="ai ai-orcid"></i><span><b>ORCID</b>Verified works and reviews</span></a>
  </div>
</section>

<section class="section">
  <div class="section-head">
    <h2>Service to the field</h2>
    <a class="more" href="https://orcid.org/{{ s.orcid_id }}">Verified reviews on ORCID <span aria-hidden="true">→</span></a>
  </div>
  <div class="service">
    <div class="tile">
      <span class="lbl">Reviewer for</span>
      <ul class="plain">
        {% for r in cv['Peer Review'] %}<li>{% include cv_text.liquid text=r.name %}</li>{% endfor %}
      </ul>
    </div>
    <div class="tile">
      <span class="lbl">Member of</span>
      <ul class="plain">
        {% for m in cv['Professional Memberships'] %}<li><a href="https://www.cors.ca/">{{ m.name }}</a></li>{% endfor %}
      </ul>
      <span class="lbl">Conferences</span>
      <p class="muted">{{ cv['Conference Presentations'].size }} presentations, at venues such as GECCO, PATAT, and CORS.</p>
    </div>
  </div>
</section>
