---
layout: page
permalink: /students/hall-of-fame/
title: Hall of Fame
description: Students I'm proud of and recommend without hesitation.
pattern: graph

# Each student: name, photo (in assets/img/students/, optional), program, years, work, why I recommend them, and links.
# Text in [square brackets] is a placeholder and shows as such on the page.
students:
  - name: Mingxuan Li
    program: B.Sc., Queen Mary University of London
    years: 2025 to present
    work: Co-authored five papers with me on university timetabling and space logistics, as first author at PATAT 2026 and GECCO 2026, and was part of our team that ranked 3rd globally in a challenge of ESA's SpOC 4.
    why: "[Placeholder: why I recommend Mingxuan, in 2 or 3 sentences]"
    links:
      - name: "[Placeholder: LinkedIn or website]"
        url: "#"

---

These are students who did outstanding work with me. Being listed here is my personal recommendation. If you're an employer or a university and one of them sent you here, consider this my reference letter, and feel free to [email me](mailto:sinaa@sunway.edu.my) for more.

{% if page.students.size > 0 %}
<div class="fame-grid">
  {% for s in page.students %}
  <article class="fame">
    {% if s.photo %}<img src="{{ s.photo | relative_url }}" alt="{{ s.name }}">{% else %}<div class="avatar" aria-hidden="true">{{ s.name | slice: 0 }}<span class="placeholder">[Photo]</span></div>{% endif %}
    <div class="body">
      <h3>{{ s.name }}</h3>
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
