// Small interactions for the site: background patterns, drawn thumbnails, and copy buttons.
(() => {
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ACCENT = "#5aa2ff";
  const GOLD = "#f5b94a";

  // Sizes a canvas for sharp drawing and returns [context, width, height].
  function setup(canvas) {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return [ctx, w, h];
  }

  /* ---------- Background patterns (data-pattern), each tied to its page's theme ---------- */
  const rng = (s) => () => (s = (s * 9301 + 49297) % 233280) / 233280;
  const line = (k, pts) => {
    k.beginPath();
    pts.forEach(([x, y], i) => (i ? k.lineTo(x, y) : k.moveTo(x, y)));
    k.stroke();
  };

  const patterns = {
    // Contour lines of an objective function, with its minimum marked: optimization.
    contours(k, w, h, t = 0) {
      const cx = 0.68 + 0.06 * Math.sin(t / 9000);
      const cy = 0.5 + 0.12 * Math.cos(t / 11000);
      const f = (x, y) => {
        const a = (x / w - cx) * (w / h);
        const b = y / h - cy;
        const c = (x / w - 0.3) * (w / h);
        const d = y / h - 0.8;
        return Math.exp(-(a * a + b * b) * 3) + 0.6 * Math.exp(-(c * c + d * d) * 6) + 0.05 * Math.sin(x / 60) * Math.cos(y / 50);
      };
      const step = 10;
      const cols = Math.ceil(w / step) + 1;
      const rows = Math.ceil(h / step) + 1;
      const v = new Float32Array(cols * rows);
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) v[j * cols + i] = f(i * step, j * step);
      k.lineWidth = 1;
      for (let L = 0.1; L < 1.05; L += 0.09) {
        k.strokeStyle = `rgba(90,162,255,${0.12 + L * 0.3})`;
        k.beginPath();
        for (let j = 0; j < rows - 1; j++) {
          for (let i = 0; i < cols - 1; i++) {
            const a = v[j * cols + i], b = v[j * cols + i + 1], c = v[(j + 1) * cols + i + 1], d = v[(j + 1) * cols + i];
            const x = i * step, y = j * step;
            const pts = [];
            const edge = (p, q, x1, y1, x2, y2) => {
              if ((p < L) !== (q < L)) {
                const r = (L - p) / (q - p);
                pts.push([x1 + (x2 - x1) * r, y1 + (y2 - y1) * r]);
              }
            };
            edge(a, b, x, y, x + step, y);
            edge(b, c, x + step, y, x + step, y + step);
            edge(d, c, x, y + step, x + step, y + step);
            edge(a, d, x, y, x, y + step);
            if (pts.length >= 2) {
              k.moveTo(pts[0][0], pts[0][1]);
              k.lineTo(pts[1][0], pts[1][1]);
              if (pts.length === 4) {
                k.moveTo(pts[2][0], pts[2][1]);
                k.lineTo(pts[3][0], pts[3][1]);
              }
            }
          }
        }
        k.stroke();
      }
      const mx = cx * w, my = cy * h;
      k.strokeStyle = GOLD;
      k.lineWidth = 1.2;
      k.beginPath();
      k.arc(mx, my, 5, 0, 7);
      k.moveTo(mx - 12, my); k.lineTo(mx - 7, my);
      k.moveTo(mx + 7, my); k.lineTo(mx + 12, my);
      k.moveTo(mx, my - 12); k.lineTo(mx, my - 7);
      k.moveTo(mx, my + 7); k.lineTo(mx, my + 12);
      k.stroke();
    },
    // A weekly timetable: days by time slots, some slots booked: teaching.
    timetable(k, w, h) {
      const r = rng(5);
      const cell = 26, gap = 4;
      for (let y = 10; y < h; y += cell + gap) {
        for (let x = w * 0.35; x < w; x += cell * 2 + gap) {
          const on = r();
          k.fillStyle = on > 0.72 ? "rgba(90,162,255,.35)" : on > 0.66 ? "rgba(245,185,74,.35)" : "rgba(90,162,255,.06)";
          k.beginPath();
          k.roundRect(x, y, cell * 2, cell, 4);
          k.fill();
        }
      }
    },
    // A week calendar with a few meetings: contact and appointments.
    week(k, w, h) {
      const r = rng(9);
      const x0 = w * 0.4, colW = (w - x0) / 7;
      k.strokeStyle = "rgba(90,162,255,.12)";
      k.lineWidth = 1;
      for (let i = 0; i <= 7; i++) line(k, [[x0 + i * colW, 0], [x0 + i * colW, h]]);
      for (let y = 0; y < h; y += 22) line(k, [[x0, y], [w, y]]);
      for (let i = 0; i < 7; i++) {
        if (r() < 0.35) continue;
        const y = Math.floor(r() * (h / 22 - 3)) * 22;
        k.fillStyle = r() > 0.8 ? "rgba(245,185,74,.35)" : "rgba(90,162,255,.3)";
        k.beginPath();
        k.roundRect(x0 + i * colW + 4, y + 2, colW - 8, 22 * (1 + Math.floor(r() * 3)) - 4, 4);
        k.fill();
      }
    },
    // A network of people, one node in the middle: students and mentoring.
    graph(k, w, h) {
      const r = rng(13);
      const nodes = Array.from({ length: 34 }, () => [w * (0.35 + r() * 0.65), h * r()]);
      k.strokeStyle = "rgba(90,162,255,.14)";
      k.lineWidth = 1;
      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach((b) => {
          if (Math.hypot(a[0] - b[0], a[1] - b[1]) < 130) line(k, [a, b]);
        });
      });
      nodes.forEach(([x, y], i) => {
        k.fillStyle = i === 0 ? GOLD : "rgba(90,162,255,.5)";
        k.beginPath();
        k.arc(x, y, i === 0 ? 4 : 2.5, 0, 7);
        k.fill();
      });
    },
    // A time axis with ticks and moments on it: news and awards.
    timeline(k, w, h) {
      const r = rng(21);
      const y = h * 0.62;
      k.strokeStyle = "rgba(90,162,255,.25)";
      k.lineWidth = 1;
      line(k, [[w * 0.3, y], [w, y]]);
      for (let x = w * 0.3; x < w; x += 14) line(k, [[x, y], [x, y + ((x / 14) % 5 < 1 ? 10 : 4)]]);
      for (let i = 0; i < 9; i++) {
        const x = w * (0.35 + r() * 0.62);
        const top = y - 20 - r() * h * 0.45;
        k.strokeStyle = "rgba(90,162,255,.2)";
        line(k, [[x, y], [x, top]]);
        k.fillStyle = i % 4 === 0 ? GOLD : "rgba(90,162,255,.55)";
        k.beginPath();
        k.arc(x, top, 3, 0, 7);
        k.fill();
      }
    },
    // Candidate solutions and their Pareto front: projects and trade-offs.
    pareto(k, w, h) {
      const r = rng(17);
      for (let i = 0; i < 90; i++) {
        const x = w * (0.4 + r() * 0.58);
        const y = h * (0.1 + r() * 0.85);
        k.fillStyle = "rgba(90,162,255,.28)";
        k.beginPath();
        k.arc(x, y, 2, 0, 7);
        k.fill();
      }
      k.strokeStyle = "rgba(245,185,74,.55)";
      k.lineWidth = 1.5;
      const pts = [];
      for (let i = 0; i <= 10; i++) {
        const t = i / 10;
        pts.push([w * (0.42 + t * 0.56), h * (0.12 + 0.8 * Math.pow(1 - t, 3))]);
      }
      line(k, pts);
      k.fillStyle = GOLD;
      pts.forEach(([x, y]) => {
        k.beginPath();
        k.arc(x, y, 2.5, 0, 7);
        k.fill();
      });
    },
    dots(k, w, h) {
      for (let y = 13; y < h; y += 26) {
        for (let x = w * 0.4; x < w; x += 26) {
          k.fillStyle = "rgba(90,162,255,.12)";
          k.beginPath();
          k.arc(x, y, 1.2, 0, 7);
          k.fill();
        }
      }
    },
  };

  const drawPattern = (c, t) => {
    const fn = patterns[c.dataset.pattern];
    if (!fn) return;
    const [k, w, h] = setup(c);
    fn(k, w, h, t);
  };
  const drawPatterns = () => document.querySelectorAll("canvas[data-pattern]").forEach((c) => drawPattern(c, 0));
  drawPatterns();
  addEventListener("resize", drawPatterns);

  // The home page contours drift very slowly, so the minimum moves like a search in progress.
  const live = document.querySelector("canvas[data-animate]");
  if (live && !reduceMotion) {
    let visible = true;
    new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(live);
    let last = 0;
    const loop = (t) => {
      if (visible && !document.hidden && t - last > 80) {
        drawPattern(live, t);
        last = t;
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    // Gentle tilt on the portrait.
    const hero = live.parentElement;
    const img = hero.querySelector(".portrait img");
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      const a = (e.clientX - r.left) / r.width - 0.5;
      const b = (e.clientY - r.top) / r.height - 0.5;
      img.style.transform = `perspective(900px) rotateY(${a * 6}deg) rotateX(${-b * 6}deg)`;
    });
    hero.addEventListener("pointerleave", () => (img.style.transform = ""));
  }

  /* ---------- Spotlight that follows the cursor on tiles ---------- */
  document.querySelectorAll(".tile").forEach((t) =>
    t.addEventListener("pointermove", (e) => {
      const r = t.getBoundingClientRect();
      t.style.setProperty("--mx", `${e.clientX - r.left}px`);
      t.style.setProperty("--my", `${e.clientY - r.top}px`);
    }),
  );

  /* ---------- Drawn thumbnails: research tiles (data-viz) and projects (data-cover) ---------- */
  let seed = 7;
  const rand = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;

  const drawings = {
    gantt(k, w, h) {
      seed = 7;
      const rows = 5;
      const rh = h / rows;
      const colors = [ACCENT, "#3c7fd6", GOLD, "#8fb9ee", "#2a5f9e"];
      k.font = "10px ui-monospace, Menlo, Consolas, monospace";
      ["MON", "TUE", "WED", "THU", "FRI"].forEach((day, i) => {
        k.fillStyle = "rgba(143,162,187,.6)";
        k.fillText(day, 0, i * rh + rh / 2 + 3);
        let x = 40;
        while (x < w - 10) {
          const len = 30 + rand() * 80;
          if (rand() > 0.3) {
            k.fillStyle = colors[Math.floor(rand() * 5)];
            k.globalAlpha = 0.85;
            k.beginPath();
            k.roundRect(x, i * rh + 4, Math.min(len, w - x - 4), rh - 8, 4);
            k.fill();
            k.globalAlpha = 1;
          }
          x += len + 6;
        }
      });
    },
    convergence(k, w, h) {
      k.strokeStyle = "#1c2b42";
      k.beginPath();
      k.moveTo(0, h - 1);
      k.lineTo(w, h - 1);
      k.stroke();
      [[ACCENT, 0.9], [GOLD, 0.6]].forEach(([c, s]) => {
        k.strokeStyle = c;
        k.lineWidth = 2;
        k.beginPath();
        for (let x = 0; x <= w; x += 2) {
          const t = x / w;
          const y = h * (0.08 + 0.85 * Math.exp(-t * 4 * s) + 0.03 * Math.sin(t * 40) * (1 - t));
          x ? k.lineTo(x, y) : k.moveTo(x, y);
        }
        k.stroke();
      });
    },
    scatter(k, w, h) {
      seed = 5;
      for (let i = 0; i < 60; i++) {
        const x = 10 + rand() * (w - 20);
        const spread = rand();
        const y = h / 2 + (spread - 0.5) * h * 0.8 * (1 - x / w);
        k.fillStyle = spread > 0.45 && spread < 0.55 ? GOLD : "rgba(90,162,255,.6)";
        k.beginPath();
        k.arc(x, y, 2.5, 0, 7);
        k.fill();
      }
    },
    health(k, w, h) {
      const s = 14;
      for (let x = 18; x < w - 14; x += s) {
        for (let y = 18; y < h - 14; y += s) {
          k.fillStyle = (x * 11 + y * 7) % 6 < 2 ? "rgba(90,162,255,.6)" : "rgba(90,162,255,.1)";
          k.fillRect(x, y, s - 3, s - 3);
        }
      }
      const cx = w / 2, cy = h / 2;
      k.fillStyle = "#0b1422";
      k.fillRect(cx - 26, cy - 26, 52, 52);
      k.fillStyle = GOLD;
      k.fillRect(cx - 6, cy - 20, 12, 40);
      k.fillRect(cx - 20, cy - 6, 40, 12);
    },
    orbit(k, w, h) {
      for (let i = 1; i <= 4; i++) {
        k.beginPath();
        k.ellipse(w / 2, h / 2, i * 16, i * 9, -0.4, 0, 7);
        k.stroke();
      }
      k.fillStyle = GOLD;
      k.beginPath();
      k.arc(w / 2, h / 2, 5, 0, 7);
      k.fill();
      k.beginPath();
      k.arc(w / 2 + 52, h / 2 - 12, 3, 0, 7);
      k.fill();
    },
    grid(k, w, h) {
      const s = 14;
      for (let x = 18; x < w - 14; x += s) {
        for (let y = 18; y < h - 14; y += s) {
          k.fillStyle = (x * 7 + y * 13) % 5 < 2 ? "rgba(90,162,255,.8)" : "rgba(90,162,255,.12)";
          k.fillRect(x, y, s - 3, s - 3);
        }
      }
      k.fillStyle = GOLD;
      k.fillRect(18 + s * 3, 18 + s * 2, s - 3, s - 3);
    },
    dna(k, w, h) {
      for (let x = 10; x < w - 10; x += 6) {
        const a = Math.sin(x / 14) * h * 0.28;
        k.fillStyle = ACCENT;
        k.beginPath();
        k.arc(x, h / 2 + a, 2, 0, 7);
        k.fill();
        k.fillStyle = GOLD;
        k.beginPath();
        k.arc(x, h / 2 - a, 2, 0, 7);
        k.fill();
      }
    },
    doc(k, w, h) {
      k.strokeRect(w / 2 - 28, h / 2 - 38, 56, 76);
      for (let i = 0; i < 6; i++) {
        k.beginPath();
        k.moveTo(w / 2 - 18, h / 2 - 24 + i * 10);
        k.lineTo(w / 2 + (i % 3 ? 18 : 4), h / 2 - 24 + i * 10);
        k.stroke();
      }
      k.fillStyle = GOLD;
      k.font = "600 13px system-ui, sans-serif";
      k.fillText("TeX", w / 2 - 11, h / 2 + 30);
    },
    bars(k, w, h) {
      seed = 3;
      const n = 7;
      const bw = (w - 40) / n;
      for (let i = 0; i < n; i++) {
        const bh = 20 + rand() * (h - 60);
        k.fillStyle = i === 4 ? GOLD : "rgba(90,162,255,.75)";
        k.fillRect(20 + i * bw + 3, h - 20 - bh, bw - 6, bh);
      }
    },
    xo(k, w, h) {
      const s = Math.min(w, h) - 50;
      const x0 = (w - s) / 2;
      const y0 = (h - s) / 2;
      const c = s / 3;
      k.beginPath();
      for (let i = 1; i < 3; i++) {
        k.moveTo(x0 + i * c, y0);
        k.lineTo(x0 + i * c, y0 + s);
        k.moveTo(x0, y0 + i * c);
        k.lineTo(x0 + s, y0 + i * c);
      }
      k.stroke();
      const marks = ["x", "o", "", "", "x", "o", "", "", "x"];
      marks.forEach((m, i) => {
        const cx = x0 + (i % 3) * c + c / 2;
        const cy = y0 + Math.floor(i / 3) * c + c / 2;
        const r = c * 0.25;
        k.beginPath();
        if (m === "o") k.arc(cx, cy, r, 0, 7);
        if (m === "x") {
          k.strokeStyle = GOLD;
          k.moveTo(cx - r, cy - r);
          k.lineTo(cx + r, cy + r);
          k.moveTo(cx + r, cy - r);
          k.lineTo(cx - r, cy + r);
        }
        k.stroke();
        k.strokeStyle = "rgba(90,162,255,.7)";
      });
    },
    noise(k, w, h) {
      seed = 11;
      for (let i = 0; i < 260; i++) {
        const x = rand() * w;
        const y = rand() * h;
        const clean = x > w / 2;
        k.fillStyle = clean ? "rgba(90,162,255,.8)" : `rgba(143,162,187,${rand() * 0.6})`;
        k.fillRect(clean ? Math.round(x / 10) * 10 : x, clean ? Math.round(y / 10) * 10 : y, 3, 3);
      }
      k.strokeStyle = GOLD;
      k.beginPath();
      k.moveTo(w / 2, 10);
      k.lineTo(w / 2, h - 10);
      k.stroke();
    },
    wave(k, w, h) {
      [["rgba(90,162,255,.8)", 0], [GOLD, 0.6]].forEach(([c, shift]) => {
        k.strokeStyle = c;
        k.lineWidth = 2;
        k.beginPath();
        for (let x = 10; x <= w - 10; x += 2) {
          const y = h / 2 + Math.sin(x / 12 + shift) * 18 + Math.sin(x / 31) * 10;
          x > 10 ? k.lineTo(x, y) : k.moveTo(x, y);
        }
        k.stroke();
      });
    },
    nodes(k, w, h) {
      const pts = [[0.2, 0.3], [0.5, 0.2], [0.8, 0.35], [0.3, 0.7], [0.65, 0.75], [0.5, 0.48]];
      k.beginPath();
      for (const [a, b] of pts) {
        k.moveTo(0.5 * w, 0.48 * h);
        k.lineTo(a * w, b * h);
      }
      k.stroke();
      pts.forEach(([a, b], i) => {
        k.fillStyle = i === 5 ? GOLD : ACCENT;
        k.beginPath();
        k.arc(a * w, b * h, i === 5 ? 6 : 4, 0, 7);
        k.fill();
      });
    },
  };

  const drawAll = () => {
    document.querySelectorAll("canvas[data-viz], canvas[data-cover]").forEach((c) => {
      const fn = drawings[c.dataset.viz || c.dataset.cover];
      if (!fn) return;
      const [k, w, h] = setup(c);
      k.strokeStyle = "rgba(90,162,255,.7)";
      k.lineWidth = 1.2;
      fn(k, w, h);
    });
  };
  drawAll();
  addEventListener("resize", drawAll);

  /* ---------- Copy buttons ---------- */
  document.querySelectorAll("[data-copy], [data-copy-from]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const text = btn.dataset.copy || document.getElementById(btn.dataset.copyFrom).innerText.trim();
      navigator.clipboard?.writeText(text).then(() => {
        const label = btn.textContent;
        btn.textContent = "Copied";
        setTimeout(() => (btn.textContent = label), 1500);
      });
    }),
  );
})();
