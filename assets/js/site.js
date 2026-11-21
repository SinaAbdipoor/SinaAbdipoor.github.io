// Small interactions for the site: tile spotlight, drawn thumbnails, folding home cards, and copy buttons.
(() => {
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

  /* ---------- Home: on phones, fold the path cards into a 2x2 grid that opens on tap ---------- */
  const grid = document.querySelector(".path-grid");
  if (grid) {
    const cards = [...grid.querySelectorAll(".path")];
    const phone = matchMedia("(max-width: 560px)");
    const fold = () => {
      grid.classList.toggle("folded", phone.matches);
      cards.forEach((card) => {
        const h = card.querySelector("h3");
        const title = h.textContent;
        card.classList.remove("open");
        if (phone.matches) {
          const b = document.createElement("button");
          b.type = "button";
          b.className = "path-toggle";
          b.textContent = title;
          b.setAttribute("aria-expanded", "false");
          b.setAttribute("aria-controls", card.querySelector(".path-body").id);
          b.addEventListener("click", () => {
            const open = !card.classList.contains("open");
            cards.forEach((c) => {
              c.classList.toggle("open", c === card && open);
              c.querySelector(".path-toggle")?.setAttribute("aria-expanded", c === card && open);
            });
          });
          h.replaceChildren(b);
        } else {
          h.replaceChildren(title);
        }
      });
    };
    fold();
    phone.addEventListener("change", fold);
  }

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
