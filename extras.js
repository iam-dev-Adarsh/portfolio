/* ═══════════════════════════════════════════════════════════════
   EXTRAS — items 1–12: write-ups UI, heatmap, theme presets,
   keyboard nav, scroll ring, metrics, demos, explorer,
   experiments log, roadmap, resume hooks.
   ═══════════════════════════════════════════════════════════════ */
(() => {
  const $ = (s, c=document) => c.querySelector(s);
  const $$ = (s, c=document) => [...c.querySelectorAll(s)];
  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = s => String(s==null?"":s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const mdLite = s => esc(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");

  /* ─── 1. WRITE-UPS (notes grid + modal) ─── */
  const notesGrid = $("#notes-grid"), noteModal = $("#note-modal"), noteBody = $("#note-body");
  if (notesGrid && window.NOTES) {
    notesGrid.innerHTML = window.NOTES.map(n => `
      <article class="note-card reveal" data-id="${esc(n.id)}" tabindex="0" role="button" aria-label="Read: ${esc(n.title)}">
        <div class="note-tag">${esc(n.icon)} ${esc(n.tag)} <span>${esc(n.date)}</span></div>
        <h3>${esc(n.title)}</h3>
        <p>${mdLite(n.blurb)}</p>
        <div class="note-foot"><span>${n.sections.length} sections · ~4 min read</span><span class="note-open">Open ↗</span></div>
      </article>`).join("");
    const openNote = id => {
      const n = window.NOTES.find(x => x.id === id); if (!n) return;
      noteBody.innerHTML = `
        <div class="note-tag">${esc(n.icon)} ${esc(n.tag)} · ${esc(n.date)}</div>
        <h2>${esc(n.title)}</h2>
        ${n.sections.map(([h, body]) => `<h4>${esc(h)}</h4><p>${mdLite(body)}</p>`).join("")}
        <a class="btn btn-ghost" href="${esc(n.link)}" target="_blank" rel="noopener">See the code ↗</a>`;
      noteModal.classList.add("open"); noteModal.setAttribute("aria-hidden", "false");
    };
    $$(".note-card").forEach(c => {
      c.addEventListener("click", () => openNote(c.dataset.id));
      c.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openNote(c.dataset.id); } });
    });
    const closeModal = () => { noteModal.classList.remove("open"); noteModal.setAttribute("aria-hidden","true"); };
    $("#note-close").addEventListener("click", closeModal);
    noteModal.addEventListener("click", e => { if (e.target === noteModal) closeModal(); });
    addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
  }

  /* ─── 5. THEMES — Precision Grey · Warm Stone · Ink & Parchment ─── */
  const THEMES = ["precision", "stone", "parchment"];
  function applyTheme(name) {
    if (!THEMES.includes(name)) name = "precision";
    document.documentElement.dataset.theme = name;
    $$(".sw").forEach(s => s.classList.toggle("active", s.dataset.preset === name));
    try { localStorage.setItem("theme", name); } catch {}
  }
  $$(".sw").forEach(s => s.addEventListener("click", () => applyTheme(s.dataset.preset)));
  try { const saved = localStorage.getItem("theme"); applyTheme(THEMES.includes(saved) ? saved : (saved === "navy" ? "precision" : "precision")); } catch {}

  /* ─── 6. KEYBOARD NAV ─── */
  addEventListener("keydown", e => {
    if (e.target.matches("input,textarea")) return;
    const projects = $$(".project:not(.hide)");
    if (e.key === "j" || e.key === "k") {
      const y = scrollY + innerHeight * 0.4;
      let idx = projects.findIndex(p => p.offsetTop > y);
      if (e.key === "j") { if (idx === -1) idx = projects.length - 1; }
      else { idx = idx <= 0 ? 0 : idx - 2; }
      const el = projects[Math.max(0, idx)];
      if (el) { el.scrollIntoView({behavior: REDUCED ? "auto" : "smooth", block: "center"}); el.focus({preventScroll:true}); }
    }
    if (e.key === "/") { e.preventDefault(); const pal = $("#palette-btn"); if (pal) pal.click(); }
    if (e.key === "n") { const el = $("#notes"); if (el) el.scrollIntoView({behavior:REDUCED?"auto":"smooth"}); }
    if (e.key === "d") { const el = $("#demos"); if (el) el.scrollIntoView({behavior:REDUCED?"auto":"smooth"}); }
    if (e.key === "e") { const el = $("#explorer"); if (el) el.scrollIntoView({behavior:REDUCED?"auto":"smooth"}); }
  });

  /* ─── 7. SCROLL RING + PARALLAX ─── */
  const prFg = $("#pr-fg");
  if (prFg) {
    const R = 15, C = 2 * Math.PI * R;
    prFg.style.strokeDasharray = C;
    prFg.style.strokeDashoffset = C;
    addEventListener("scroll", () => {
      const h = document.documentElement;
      const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      prFg.style.strokeDashoffset = C * (1 - p);
    }, {passive:true});
  }
  if (!REDUCED) {
    const orbs = $$(".orb");
    addEventListener("scroll", () => {
      const y = scrollY;
      orbs.forEach((o, i) => { o.style.translate = `0 ${y * (i ? 0.08 : -0.05)}px`; });
    }, {passive:true});
  }

  /* ─── 8. LIVE METRICS WIDGET ─── */
  (async () => {
    try {
      const r = await fetch("https://raw.githubusercontent.com/iam-dev-Adarsh/deep-ml/main/progress.json", {cache:"no-store"});
      const d = await r.json();
      const items = Object.values(d.items || {});
      const lines = items.reduce((s, v) => s + (v.lines || 0), 0);
      const langs = {};
      items.forEach(v => { langs[v.language || "python"] = (langs[v.language || "python"] || 0) + 1; });
      const bar = document.createElement("div");
      bar.className = "metrics-strip reveal";
      bar.innerHTML = `
        <span>∑ <b>${lines.toLocaleString()}</b> lines of hand-written ML code</span>
        <span>◷ <b>${items.length}</b> solutions logged</span>
        <span>↺ every push auto-syncs</span>`;
      const anchor = $("#chips");
      if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(bar, anchor.nextSibling);
      if (window.__revealObserve) window.__revealObserve(bar);
    } catch {}
  })();

  /* ─── 10. ROADMAP + 11. EXPERIMENTS ─── */
  const ROADMAP = [
    ["Deep-ML deep dive (live)", 50, "active"],
    ["Curriculum: Production AI", 20, "next"],
    ["Curriculum: Agents", 15, "next"],
    ["Curriculum: Evaluation", 10, "next"],
    ["Curriculum: Inference & Serving", 5, "next"],
    ["Capstone projects (3)", 0, "next"],
    ["Numerical linear algebra", 65, "strong"],
    ["Classical ML from scratch", 92, "strong"],
    ["Deep learning fundamentals", 78, "strong"]
  ];
  const roadmapEl = $("#roadmap-list");
  if (roadmapEl) {
    roadmapEl.innerHTML = ROADMAP.map(([name, pct, state]) => `
      <div class="road-item reveal" data-state="${state}">
        <div class="road-top"><span>${esc(name)}</span><b>${pct}%</b></div>
        <div class="bar"><i data-w="${pct}"></i></div>
      </div>`).join("");
  }

  const EXPERIMENTS = [
    ["2026-11-22","Cholesky without a diagonal shift","Is a raw Cholesky solve stable for near-singular matrices?","Failed for condition number > 1e8. Adding εI fixed it — logged as a first-principles numerics lesson.","https://github.com/iam-dev-Adarsh/deep-ml"],
    ["2026-11-20","Temperature sweep on the LSTM","Does sampling temperature trade coherence for invention monotonically?","Yes: T=0.2 → meter-perfect boilerplate, T=0.8 → novel but broken words. Sweet spot ≈ 0.4–0.5.","https://github.com/iam-dev-Adarsh/python-ai-projects/tree/main/0.RRN_text_generator"],
    ["2026-11-17","NEAT: mutation rate vs. speciation","Do higher mutation rates help or fragment the population?","Without speciation, innovations die young. With it, fitness climbed 2,604 → 6,245 in 4 generations.","https://github.com/iam-dev-Adarsh/python-ai-projects/tree/main/1.Self_driving_AI_game"],
    ["2026-11-15","Feature scaling in hand-written GD","Does my from-scratch gradient descent survive unscaled features?","It diverged. Standardising inputs first was the single biggest fix — now standard in all my implementations.","https://github.com/iam-dev-Adarsh/The-first-prinicple"],
    ["2026-11-12","Honest evaluation of the CNN","Should I report CIFAR-10 accuracy as-is or tune until it looks good?","Reported 63.32% as-is, with the limitation written in the README. Trust > vanity metrics.","https://github.com/iam-dev-Adarsh/python-ai-projects/tree/main/3.IMG_Classifier_TFandCNN"]
  ];
  const expEl = $("#exp-list");
  if (expEl) {
    expEl.innerHTML = EXPERIMENTS.map(([date, hyp, q, res, link]) => `
      <article class="exp-item reveal">
        <div class="exp-date">${esc(date)}</div>
        <div class="exp-body">
          <h3>${esc(hyp)}</h3>
          <p class="exp-q"><b>Question.</b> ${esc(q)}</p>
          <p><b>Result.</b> ${esc(res)}</p>
          <a href="${esc(link)}" target="_blank" rel="noopener">see the run ↗</a>
        </div>
      </article>`).join("");
  }

  /* ─── 3. RESUME ─── */
  const printBtn = $("#print-resume");
  if (printBtn) printBtn.addEventListener("click", () => window.open("resume.html", "_blank")?.print?.());

  /* ─── 2. CONTRIBUTION HEATMAP ─── */
  (async () => {
    const wrap = $("#heatmap"), ts = $("#heat-ts"), note = $("#heat-note");
    if (!wrap) return;
    let weeks = null, source = "";
    try {
      const r = await fetch("https://api.github.com/users/iam-dev-Adarsh/events/public?per_page=100", {cache:"no-store"});
      const evs = await r.json();
      if (Array.isArray(evs) && evs.length) {
        // Build a 20-week grid from push events (best effort, honest label).
        const grid = Array.from({length: 20}, () => Array(7).fill(0));
        evs.forEach(e => {
          const d = new Date(e.created_at);
          const day = (d.getDay() + 6) % 7;
          const weeksAgo = Math.floor((Date.now() - d.getTime()) / (7 * 864e5));
          const col = 19 - weeksAgo;
          if (col >= 0 && col < 20) grid[col][day] += e.type === "PushEvent" ? 2 : 1;
        });
        weeks = grid;
        source = "derived from recent public activity";
      }
    } catch {}
    if (!weeks) {
      weeks = Array.from({length: 20}, (_, i) => Array.from({length: 7}, () => (i * 7 + Math.random() * 3 > 60 ? 0 : Math.round(Math.random() * 2))));
      source = "fallback pattern — live data unavailable";
    }
    const max = Math.max(1, ...weeks.flat());
    wrap.innerHTML = weeks.map(col => `<div class="heat-col">${col.map(v => {
      const t = v / max;
      const bg = v === 0 ? "rgba(10,21,38,.06)" : `color-mix(in srgb, var(--a2) ${Math.round(t * 100)}%, var(--a1))`;
      return `<i title="${v} contribution${v===1?"":"s"}" style="background:${bg}"></i>`;
    }).join("")}</div>`).join("");
    if (ts) ts.textContent = "loaded";
    if (note) note.textContent = source.includes("fallback")
      ? "Live calendar unavailable (API rate limit). Visit github.com/iam-dev-Adarsh for the exact chart."
      : `Source: ${source}. GitHub's full calendar lives on the profile.`;
  })();

  /* ─── MAGIC WAND CURSOR — gold star trail (mouse only, motion-safe) ─── */
  (() => {
    const fine = matchMedia("(pointer: fine)").matches;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    const SPARK = `<svg viewBox="0 0 24 24"><path d="M12 0c1.1 8.3 2.6 10.9 12 12-9.4 1.1-10.9 3.7-12 12-1.1-8.3-2.6-10.9-12-12 9.4-1.1 10.9-3.7 12-12z" fill="currentColor"/></svg>`;
    const GOLDS = ["#B98A2F", "#D9BC7F", "#A8811F", "#E3CD96"];
    let live = 0, lx = -99, ly = -99;
    const spawn = (x, y, big) => {
      if (live > 34) return;
      const s = document.createElement("div");
      s.className = "wand-star";
      const size = big ? 9 + Math.random() * 13 : 5 + Math.random() * 10;
      s.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size}px;color:${GOLDS[(Math.random() * GOLDS.length) | 0]};animation-duration:${720 + ((Math.random() * 520) | 0)}ms`;
      s.innerHTML = SPARK;
      document.body.appendChild(s);
      live++;
      s.addEventListener("animationend", () => { s.remove(); live--; }, { once: true });
    };
    addEventListener("mousemove", e => {
      if (Math.hypot(e.clientX - lx, e.clientY - ly) < 26) return;
      lx = e.clientX; ly = e.clientY;
      spawn(lx + (Math.random() * 18 - 9), ly + (Math.random() * 18 - 9));
    }, { passive: true });
    addEventListener("click", e => {
      for (let i = 0; i < 8; i++) {
        const a = Math.random() * Math.PI * 2, r = 10 + Math.random() * 28;
        spawn(e.clientX + Math.cos(a) * r, e.clientY + Math.sin(a) * r, true);
      }
    }, { passive: true });
  })();
})();