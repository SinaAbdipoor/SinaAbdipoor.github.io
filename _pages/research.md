---
layout: page
title: Research
permalink: /research/
description: Optimization for real-world problems, with methods that work well beyond a single benchmark.
nav: true
nav_order: 1

# The research map: real problems, the methods I use on them, and the goals they serve.
problems:
  - { icon: fa-solid fa-calendar-week, name: University timetabling }
  - { icon: fa-solid fa-hospital, name: Healthcare scheduling }
  - { icon: fa-solid fa-satellite, name: Space mission planning }
  - { icon: fa-solid fa-server, name: Cloud job scheduling }
  - { icon: fa-solid fa-chart-line, name: Forecasting }
methods:
  - { icon: fa-solid fa-route, name: Metaheuristics and local search }
  - { icon: fa-solid fa-code-merge, name: Hybrid algorithms }
  - { icon: fa-solid fa-dove, name: Evolutionary and swarm methods }
  - { icon: fa-solid fa-brain, name: Machine learning }

# Map pins for "Conferences and talks, by country": [longitude, latitude]. A new country in the CV needs a line here.
countries:
  Malaysia: [101.6, 3.1]
  China: [114, 31]
  Canada: [-88, 49]
  United Kingdom: [-1.5, 52.5]
  Costa Rica: [-84, 10]
  Japan: [139.7, 35.7]

areas:
  - title: Scheduling and timetabling
    text: Real competition problems, from university timetables (ITC 2019) to hospitals (IHTC 2024).
    viz: gantt
  - title: Metaheuristics and hybrids
    text: Search methods combined so each one covers the others' weak spots.
    viz: convergence
  - title: Optimality versus generality
    text: Methods that hold up across many problems, not just one benchmark.
    viz: scatter
  - title: Machine learning
    text: Forecasting, recommendation, and learning that makes optimization smarter.
    viz: wave
  - title: Game theory and multi-agent systems
    text: Problems where many players have their own goals, like students and lecturers sharing one timetable.
    viz: nodes
---

{% assign cv = site.data.cv.cv.sections %}
{% assign s = site.data.socials %}

<section class="section">
  <h2>What I work on</h2>
  <p class="lead-text">I take hard, real-world problems, design search methods to solve them, and ask one question throughout: does the method still work well on the next problem?</p>
  <div class="rmap">
    <div class="rmap-col">
      <span class="lbl">Problems</span>
      {% for n in page.problems %}<div class="rmap-node"><i class="{{ n.icon }}"></i>{{ n.name }}</div>{% endfor %}
    </div>
    <div class="rmap-arrow" aria-hidden="true"><i class="fa-solid fa-arrow-right"></i></div>
    <div class="rmap-col">
      <span class="lbl">Methods</span>
      {% for n in page.methods %}<div class="rmap-node"><i class="{{ n.icon }}"></i>{{ n.name }}</div>{% endfor %}
      <div class="rmap-core"><i class="fa-solid fa-scale-balanced"></i>Optimality versus generality</div>
    </div>
    <div class="rmap-arrow" aria-hidden="true"><i class="fa-solid fa-arrow-right"></i></div>
    <div class="rmap-col">
      <span class="lbl">Impact</span>
      {% assign sdgs = cv['Research Profile'] | where: 'label', 'SDGs' | first %}
      {% assign sdg_list = sdgs.details | split: '), ' %}
      {% for g in sdg_list %}
        {% assign num = g | split: ' (' | first | remove: 'SDG ' %}
        <div class="rmap-node sdg sdg-{{ num }}"><b>{{ num }}</b>{{ g | split: ' (' | last | remove: ')' }}</div>
      {% endfor %}
    </div>
  </div>
  <div class="area-grid">
    {% for a in page.areas %}
      <article class="tile">
        <canvas data-viz="{{ a.viz }}" aria-hidden="true"></canvas>
        <h3>{{ a.title }}</h3>
        <p>{{ a.text }}</p>
      </article>
    {% endfor %}
  </div>
</section>

{% assign cors = cv['Professional Memberships'] | where_exp: 'm', "m.name contains 'Canadian Operational Research'" | first %}
{% assign cors_talks = cv['Conference Presentations'] | where_exp: 'c', "c.name contains 'Canadian Operational Research'" %}
{% assign cors_events = cv['Workshops and Seminars'] | where_exp: 'w', "w.name contains 'CORS'" %}
<section class="section">
  <a class="feature" href="https://www.cors.ca/">
    <div class="feature-badge" aria-hidden="true"><i class="fa-solid fa-earth-americas"></i></div>
    <div class="feature-body">
      <span class="lbl">Proud member since {% include cv_date.liquid date=cors.start_date %}</span>
      <h2>Canadian Operational Research Society</h2>
      <p>Canada's national society for Operations Research. I have presented my work at its annual conference every year since {{ cors_talks | map: 'date' | sort | first }}, and I take part in its seminars and special interest groups.</p>
      <div class="feature-stats">
        <div><b>{{ cors_talks.size }}</b><span>CORS annual conference talks</span></div>
        <div><b>{{ cors_events.size }}</b><span>CORS seminars and events</span></div>
      </div>
    </div>
  </a>
</section>

<section class="section">
  <div class="section-head">
    <h2>Selected papers</h2>
    <a class="more" href="https://scholar.google.com/citations?user={{ s.scholar_userid }}">All papers on Google Scholar <span aria-hidden="true">→</span></a>
  </div>
  {% include selected_papers.liquid %}
  {% assign impact = cv['Research Profile'] | where: 'label', 'Impact' | first %}
  <div class="link-cards">
    <a class="link-card" href="https://scholar.google.com/citations?user={{ s.scholar_userid }}"><i class="ai ai-google-scholar"></i><span><b>Google Scholar</b>{{ impact.details | split: ' (' | first }}</span></a>
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
    {%- comment -%} Countries come from the end of each conference name and from each talk's location {%- endcomment -%}
    {% assign places = '' | split: '' %}
    {% for c in cv['Conference Presentations'] %}{% assign place = c.name | split: ', ' | last %}{% assign places = places | push: place %}{% endfor %}
    {% assign talks = cv.Talks | where_exp: 't', "t.location and t.location != 'Online'" %}
    {% for t in talks %}{% assign places = places | push: t.location %}{% endfor %}
    {% assign countries = places | group_by_exp: 'p', 'p' | sort: 'size' | reverse %}
    <div class="tile places">
      <span class="lbl">Conferences and talks, by country</span>
      <div class="worldmap">
        <img src="{{ '/assets/img/world-dots.svg' | relative_url }}" alt="" aria-hidden="true">
        {% for g in countries %}
          {% assign ll = page.countries[g.name] %}
          {% if ll %}
            {% assign x = ll[0] | plus: 180 | divided_by: 3.6 %}
            {% assign y = 84 | minus: ll[1] | divided_by: 1.4 %}
            <span class="pin" style="left: {{ x | round: 2 }}%; top: {{ y | round: 2 }}%; --n: {{ g.size }}" title="{{ g.name }}: {{ g.size }}"></span>
          {% endif %}
        {% endfor %}
      </div>
      <ul class="chips">
        {% for g in countries %}<li class="chip">{{ g.name }} <b>{{ g.size }}</b></li>{% endfor %}
      </ul>
      <p class="muted">{{ cv['Conference Presentations'].size }} conference presentations and {{ cv.Talks.size }} talks, at venues such as GECCO, PATAT, and CORS.</p>
    </div>
  </div>
</section>
