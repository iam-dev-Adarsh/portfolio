/* ═══════════════════════════════════════════════════════════════
   THE EXHIBITION — scroll mechanics + living content
   - wheel / drag / arrow keys drive the horizontal walk
   - work cards render from CONFIG.projects + live GitHub repos
   - socials render from CONFIG.socials
   - window.__renderExhibit(d) is called by live.js on every refresh,
     so new repos appear in the walk automatically
   ═══════════════════════════════════════════════════════════════ */
(() => {
  const ex = document.getElementById("exhibit");
  const dotsBox = document.getElementById("dots");
  const workRow = document.getElementById("work-row");
  const autoNote = document.getElementById("auto-note");
  const socialsBox = document.getElementById("socials");
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const isStack = () => window.matchMedia("(max-width:760px)").matches;

  /* ── panels + dots ── */
  const panels = [...ex.querySelectorAll(".panel")];
  panels.forEach((_, i) => {
    const d = document.createElement("i");
    d.addEventListener("click", () => go(panels[i].id));
    dotsBox.appendChild(d);
  });
  const dots = [...dotsBox.children];

  function go(id) {
    const p = document.getElementById(id);
    if (!p) return;
    if (isStack()) { p.scrollIntoView({ behavior: "smooth" }); return; }
    ex.scrollTo({ left: p.offsetLeft, behavior: "smooth" });
  }
  document.querySelectorAll("[data-go]").forEach(a => {
    a.addEventListener("click", e => { e.preventDefault(); go(a.dataset.go); });
  });

  /* ── wheel → horizontal (desktop only) ── */
  ex.addEventListener("wheel", e => {
    if (isStack()) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      ex.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  }, { passive: false });

  /* ── drag to walk (desktop only) ── */
  let down = false, sx = 0, sl = 0, moved = 0;
  ex.addEventListener("pointerdown", e => {
    if (isStack() || e.pointerType === "touch") return;
    down = true; moved = 0; sx = e.clientX; sl = ex.scrollLeft;
    ex.classList.add("dragging");
  });
  window.addEventListener("pointerup", () => {
    if (down) ex.classList.remove("dragging");
    down = false;
  });
  window.addEventListener("pointermove", e => {
    if (!down) return;
    const dx = e.clientX - sx;
    moved = Math.max(moved, Math.abs(dx));
    ex.scrollLeft = sl - dx;
  });
  /* suppress link clicks after a real drag */
  ex.addEventListener("click", e => {
    if (moved > 6) { e.preventDefault(); e.stopPropagation(); moved = 0; }
  }, true);

  /* ── keyboard ── */
  window.addEventListener("keydown", e => {
    if (e.target.closest("input,textarea")) return;
    if (e.key === "ArrowRight") ex.scrollBy({ left: innerWidth * 0.85, behavior: "smooth" });
    if (e.key === "ArrowLeft")  ex.scrollBy({ left: -innerWidth * 0.85, behavior: "smooth" });
  });

  /* ── active dot ── */
  function syncDots() {
    const c = ex.scrollLeft + ex.clientWidth / 2;
    let best = 0;
    panels.forEach((p, i) => {
      const b = panels[best];
      if (Math.abs(p.offsetLeft + p.offsetWidth / 2 - c) < Math.abs(b.offsetLeft + b.offsetWidth / 2 - c)) best = i;
    });
    dots.forEach((d, i) => d.classList.toggle("on", i === best));
  }
  ex.addEventListener("scroll", syncDots, { passive: true });
  syncDots();

  /* ═══ living content ═══ */

  /* honest headline metrics per curated project */
  const METRICS = {
    "Deep-ML — Practice Kernel": "30 solved",
    "The First Principle — ML From Scratch": "12 algos",
    "Shakespeare Text Generator (LSTM)": "1.1M chars",
    "Self-Driving Car — NEAT NeuroEvolution": "2,604→6,245",
    "CIFAR-10 Image Classifier (CNN)": "63.32%",
    "Fake or Real — News Classifier": "TF-IDF"
  };
  const POPS = [
    ["#FFD233", "#17141B"], ["#2D7FF9", "#F7F4EE"], ["#17B26A", "#F7F4EE"],
    ["#E5297F", "#F7F4EE"], ["#F26B3A", "#17141B"], ["#8B5CF6", "#F7F4EE"]
  ];
  const SHAPES = [
    '<span class="sh circle" style="width:110px;height:110px;background:rgba(23,20,27,.14);right:-28px;bottom:-28px"></span>',
    '<span class="sh pill" style="width:140px;height:28px;background:rgba(255,255,255,.28);left:-20px;top:26px;transform:rotate(-14deg)"></span>',
    '<span class="sh circle" style="width:86px;height:86px;background:rgba(255,255,255,.3);left:22px;bottom:18px"></span>',
    '<span class="sh tri" style="border-bottom-color:rgba(255,210,51,.85);right:26px;top:22px"></span>',
    '<span class="sh circle" style="width:120px;height:120px;background:rgba(23,20,27,.12);right:-30px;top:-30px"></span>',
    '<span class="sh pill" style="width:120px;height:26px;background:rgba(255,255,255,.3);right:18px;bottom:22px;transform:rotate(12deg)"></span>'
  ];

  function cardHTML(o, i) {
    const [bg, fg] = POPS[i % POPS.length];
    return `
      <a class="work-card${o.mini ? " mini" : ""}${o.hidden ? " hidden-card" : ""}" href="${esc(o.link)}" target="_blank" rel="noopener">
        <div class="work-cover" style="background:${bg};color:${fg}">
          ${SHAPES[i % SHAPES.length]}
          <span class="badge">${esc(o.badge)}</span>
          <div class="big">${esc(o.metric)}</div>
        </div>
        <div class="work-meta">
          <h3>${esc(o.title)}</h3>
          <p>${esc(o.desc)}</p>
          <div class="row">${(o.tags || []).slice(0, 3).map(t => `<span>${esc(t)}</span>`).join("")}</div>
        </div>
      </a>`;
  }

  function curatedCards() {
    return ((window.CONFIG && CONFIG.projects) || []).map(p => ({
      title: p.title,
      desc: p.desc,
      link: p.link || "#",
      tags: p.tags || [],
      badge: p.label || "PROJECT",
      metric: METRICS[p.title] || p.label || "PROJECT"
    }));
  }

  function autoCards(d) {
    const curated = new Set((window.CONFIG && CONFIG.projects || []).map(p => p.repo).filter(Boolean));
    const repos = (d.repoList || [])
      .filter(r => !curated.has(r.name))
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
      .map(r => ({
        title: r.name,
        desc: r.description || "Auto-indexed repository — documentation and results appear here as it grows.",
        link: r.html_url,
        tags: (r.topics || []).slice(0, 2).concat(r.language ? [r.language] : []),
        badge: "AUTO-INDEXED",
        metric: r.language || "NEW",
        mini: true
      }));
    /* every folder of the indexed repos gets its own evidence card —
       a new algorithm, build or capstone shows up the moment it is pushed */
    const folders = (d.algoList || []).map(a => ({
      title: a.name,
      desc: a.kind === "algorithm" ? "Derived, implemented from scratch and documented with a captured run."
        : a.kind === "capstone" ? "Curriculum capstone — planned, built and documented. This card appeared by itself the moment its folder did."
        : "Trained, measured and documented — results and limits in the repo.",
      link: a.html_url,
      tags: [a.repo],
      badge: "AUTO-INDEXED · " + (a.kind === "algorithm" ? "ALGORITHM" : a.kind === "capstone" ? "CAPSTONE" : "BUILD"),
      metric: (a.kind || "folder").toUpperCase(),
      kind: a.kind,
      mini: true
    }));
    /* capstones lead the evidence, then repos (newest first), then folders */
    const capstones = folders.filter(f => f.kind === "capstone");
    const rest = folders.filter(f => f.kind !== "capstone");
    return capstones.concat(repos, rest);
  }

  function renderWork(d) {
    if (!workRow) return;
    const cards = curatedCards().concat(d ? autoCards(d) : []);
    /* the wall shows the posters + a peek of the evidence; the rest folds away */
    let seen = 0;
    cards.forEach(c => { if (c.mini && ++seen > 3) c.hidden = true; });
    const hiddenCount = seen > 3 ? seen - 3 : 0;
    workRow.innerHTML = cards.map(cardHTML).join("") + (hiddenCount ? `
      <button class="more-card" type="button" data-more>
        <b>+${hiddenCount}</b>
        more evidence, auto-indexed<br>from GitHub
        <span class="mc-cta">Show all ${hiddenCount} →</span>
      </button>` : "");
    workRow.classList.toggle("collapsed", hiddenCount > 0 && workRow.dataset.open !== "1");
    const more = workRow.querySelector("[data-more]");
    if (more) more.addEventListener("click", () => {
      const collapsing = !workRow.classList.contains("collapsed");
      workRow.classList.toggle("collapsed", collapsing);
      workRow.dataset.open = collapsing ? "0" : "1";
      more.querySelector(".mc-cta").textContent = collapsing ? `Show all ${hiddenCount} →` : "Show less ↑";
    });
    if (autoNote && d) {
      const folders = (d.algoList || []).length;
      autoNote.textContent = `${d.repoList.length} repositories${folders ? ` + ${folders} folders` : ""} indexed live from GitHub — new work appears in this walk automatically.`;
    }
  }
  renderWork(null);

  function renderSocials() {
    if (!socialsBox) return;
    const list = ((window.CONFIG && CONFIG.socials) || []).map(([label, url]) => ({ label, url }));
    list.push({ label: "Resume ↓", url: "resume.html" });
    socialsBox.innerHTML = list.map((s, i) =>
      `<a class="${i === 0 ? "" : "alt"}" href="${esc(s.url)}"${/^https?:/.test(s.url) ? ' target="_blank" rel="noopener"' : ""}>${esc(s.label)}</a>`
    ).join("");
  }
  renderSocials();

  /* ── 2.5 · THE PATH — deep-path chips + curriculum auto-ticks ── */
  function renderPath(d) {
    d = d || {};
    const cfg = window.CONFIG || {};
    const blob = ((d.repoList || []).map(r => `${r.name} ${r.description || ""}`).join(" ") + " " +
                  (d.algoList || []).map(a => a.name).join(" ") + " " +
                  (d.solves || []).map(s => s.title || "").join(" ")).toLowerCase();
    const kwHit = kws => (kws || []).some(k => new RegExp(`(^|[^a-z])${k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").trim()}([^a-z]|$)`).test(blob));

    const dp = document.getElementById("dp-map");
    if (dp) {
      dp.innerHTML = (cfg.deepPath || []).map(([zone, depth, chapters]) => `
        <div class="dp-zone"><div class="dp-zname">${esc(zone)}<em>${esc(depth)}</em></div><div class="dp-chips">${
          chapters.map(([name, concepts, kws]) => {
            const hits = kws.filter(k => kwHit([k])).length;
            const st = hits >= Math.max(3, Math.ceil(kws.length * .2)) ? "done" : hits > 0 ? "active" : "next";
            return `<span class="dp-chip ${st}" title="${hits} signals matched"><i></i>${esc(name)}</span>`;
          }).join("")
        }</div></div>`).join("");
    }

    const track = (cfg.learningTracks || []).find(t => /ai.?engineering|curriculum/i.test(t.source || t.name || "") && t.modules)
      || (cfg.learningTracks || []).find(t => t.modules);
    const mods = track && track.modules ? track.modules : [];
    const pcts = mods.map(m => kwHit(m[4]) ? 100 : (m[1] || 0));
    const list = document.getElementById("mod-list");
    if (list) {
      list.innerHTML = mods.map((m, i) => {
        const done = pcts[i] >= 100;
        return `<div class="mod-row ${done ? "done" : ""}">
          <span class="mk">${done ? "✓ auto" : "○"}</span>
          <span><b class="mn">${esc(m[0])}</b><em class="mp">${esc(m[3] || "")}</em></span>
          <span class="mv">${done ? "" : (pcts[i] ? pcts[i] + "%" : "—")}</span>
        </div>`;
      }).join("");
    }
    const cp = document.getElementById("cur-pct");
    if (cp && pcts.length) cp.textContent = Math.round(pcts.reduce((a, b) => a + b, 0) / pcts.length) + "%";
  }

  /* ── 3.5 · THE LAB NOTES — the honest experiment log ── */
  const LAB = [
    ["2026-11-22","Cholesky without a diagonal shift","Is a raw Cholesky solve stable for near-singular matrices?","Failed for condition number > 1e8. Adding εI fixed it — logged as a first-principles numerics lesson.","https://github.com/iam-dev-Adarsh/deep-ml"],
    ["2026-11-20","Temperature sweep on the LSTM","Does sampling temperature trade coherence for invention monotonically?","Yes: T=0.2 → meter-perfect boilerplate, T=0.8 → novel but broken words. Sweet spot ≈ 0.4–0.5.","https://github.com/iam-dev-Adarsh/python-ai-projects/tree/main/0.RRN_text_generator"],
    ["2026-11-17","NEAT: mutation rate vs. speciation","Do higher mutation rates help or fragment the population?","Without speciation, innovations die young. With it, fitness climbed 2,604 → 6,245 in 4 generations.","https://github.com/iam-dev-Adarsh/python-ai-projects/tree/main/1.Self_driving_AI_game"],
    ["2026-11-15","Feature scaling in hand-written GD","Does my from-scratch gradient descent survive unscaled features?","It diverged. Standardising inputs first was the single biggest fix — now standard in all my implementations.","https://github.com/iam-dev-Adarsh/The-first-prinicple"],
    ["2026-11-12","Honest evaluation of the CNN","Should I report CIFAR-10 accuracy as-is or tune until it looks good?","Reported 63.32% as-is, with the limitation written in the README. Trust > vanity metrics.","https://github.com/iam-dev-Adarsh/python-ai-projects/tree/main/3.IMG_Classifier_TFandCNN"]
  ];
  function renderLab() {
    const host = document.getElementById("exp-list");
    if (!host || host.dataset.filled) return;
    host.dataset.filled = "1";
    host.innerHTML = LAB.map(([date, hyp, q, res, link]) => `
      <article class="exp-item">
        <div class="exp-date">${esc(date)}</div>
        <div class="exp-body">
          <h3>${esc(hyp)}</h3>
          <p><b>Question.</b> ${esc(q)}</p>
          <p><b>Result.</b> ${esc(res)}</p>
          <a href="${esc(link)}" target="_blank" rel="noopener">see the run ↗</a>
        </div>
      </article>`).join("");
  }
  renderLab();
  renderPath(window.__lastData || {});

  /* live.js calls this on every refresh — the walk keeps itself current */
  window.__renderExhibit = d => { renderWork(d); renderPath(d); };
  /* reconcile: live data may land before or after this script — catch both */
  const reconcile = () => {
    if (!window.__lastData) return false;
    renderWork(window.__lastData);
    renderPath(window.__lastData);
    return true;
  };
  if (!reconcile()) {
    let tries = 0;
    const iv = setInterval(() => {
      if (reconcile() || ++tries > 80) clearInterval(iv);
    }, 250);
  }
})();
