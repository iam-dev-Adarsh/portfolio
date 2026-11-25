/* ═══════════════════════════════════════════════════════════════
   LIVE GITHUB LAYER
   - Updates hero stats, Deep-ML panel, activity feed, repo chips
   - Auto-indexes EVERY public repo into #repo-grid
   - Future repos appear automatically with generated design/placeholders
   No API key. Cached fallback. Graceful on rate limits.
   ═══════════════════════════════════════════════════════════════ */
(() => {
  const USER = "iam-dev-Adarsh";
  const API = "https://api.github.com";
  const RAW = "https://raw.githubusercontent.com";
  const PROGRESS = `${RAW}/${USER}/deep-ml/main/progress.json`;
  const CACHE = "av_live_v3";
  const TTL = 3 * 60 * 1000;
  const $ = s => document.querySelector(s);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  const CURATED_REPOS = new Set((window.CONFIG?.projects || []).map(p => p.repo).filter(Boolean));

  const FALLBACK = {
    solved: 30, diff: {easy:13, medium:14, hard:3}, algos: 13, projects: 4, repos: 5,
    latest: {title:"Least-Norm Solution of an Underdetermined System", at:"2026-11-22T16:45:07Z", difficulty:"medium"},
    events: [],
    repoList: [
      {name:"deep-ml", html_url:"https://github.com/iam-dev-Adarsh/deep-ml", description:"Hand-written Deep-ML solutions with coverage tracking — 30 problems across linear algebra, decompositions and deep learning.", language:"Python", pushed_at:"2026-11-22T16:45:10Z", stargazers_count:1, forks_count:0, topics:["machine-learning","linear-algebra","from-scratch"]},
      {name:"python-ai-projects", html_url:"https://github.com/iam-dev-Adarsh/python-ai-projects", description:"Applied deep learning: LSTM text generation, NEAT self-driving, CIFAR-10 CNN and NLP classification — measured, not claimed.", language:"Jupyter Notebook", pushed_at:"2026-11-21T00:24:56Z", stargazers_count:1, forks_count:0, topics:["deep-learning","tensorflow","cnn","lstm"]},
      {name:"The-first-prinicple", html_url:"https://github.com/iam-dev-Adarsh/The-first-prinicple", description:"12 machine-learning algorithms implemented from first principles — derivations, runs and decision-region plots.", language:"Python", pushed_at:"2026-11-20T22:39:43Z", stargazers_count:1, forks_count:0, topics:["machine-learning","from-scratch","numpy"]}
    ]
  };

  function rel(iso) {
    if (!iso) return "";
    const s = (Date.now() - new Date(iso)) / 1000;
    if (s < 60) return "just now";
    if (s < 3600) return Math.floor(s/60) + "m ago";
    if (s < 86400) return Math.floor(s/3600) + "h ago";
    if (s < 2592000) return Math.floor(s/86400) + "d ago";
    if (s < 31536000) return Math.floor(s/2592000) + "mo ago";
    return Math.floor(s/31536000) + "y ago";
  }

  function hash(str) {
    let h = 2166136261;
    for (let i=0;i<str.length;i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }

  const PALETTES = [
    ["#2b1a5e","#24365B","#B98A2F"],
    ["#0b3b4a","#00b8a9","#a8ff78"],
    ["#4a1042","#6B1C2A","#D9BC7F"],
    ["#101d4a","#41516B","#B98A2F"],
    ["#082818","#00b864","#c8ff5c"],
    ["#3d1a06","#ff8a3d","#ffe066"],
    ["#1a1038","#5a38c8","#00b8d4"],
    ["#2a0f1f","#8A2432","#8C857E"],
  ];

  function artFor(name) {
    const h = hash(name);
    const [c1,c2,c3] = PALETTES[h % PALETTES.length];
    const a1 = 20 + (h % 60), a2 = 60 + (h >>> 8) % 40;
    const x1 = 20 + (h % 50), y1 = 20 + (h >>> 4) % 40;
    const x2 = 60 + (h >>> 12) % 30, y2 = 60 + (h >>> 16) % 30;
    const glyph = name.replace(/[^a-zA-Z0-9]/g," ").trim().split(/\s+/).slice(0,2).map(w=>w[0]?.toUpperCase()||"").join("") || "AI";
    return { c1,c2,c3,a1,a2,x1,y1,x2,y2,glyph };
  }

  function inferCategory(repo) {
    const text = `${repo.name} ${repo.description||""} ${(repo.topics||[]).join(" ")} ${repo.language||""}`.toLowerCase();
    const has = (...ks) => ks.some(k => text.includes(k));
    if (has("cnn","vision","image","opencv","yolo","segmentation","detect")) return {label:"Computer Vision", tone:"amber"};
    if (has("nlp","text","llm","gpt","transformer","rag","chatbot","langchain","bert","token")) return {label:"NLP / LLM", tone:"blue"};
    if (has("reinforcement","q-learning","rl","agent","neat","gym")) return {label:"Reinforcement Learning", tone:"green"};
    if (has("diffusion","gan","generative","autoencoder")) return {label:"Generative AI", tone:"crimson"};
    if (has("deep","neural","lstm","rnn","pytorch","tensorflow","keras")) return {label:"Deep Learning", tone:"violet"};
    if (has("regression","classifier","svm","xgboost","random forest","kmeans","cluster","scratch","math","linear algebra")) return {label:"Foundations", tone:"violet"};
    if (has("api","web","app","frontend","react","next")) return {label:"Engineering", tone:"blue"};
    if (repo.language === "Jupyter Notebook") return {label:"Research", tone:"violet"};
    return {label: repo.language || "Repository", tone:"violet"};
  }

  async function getJSON(url) {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 9000);
    try {
      const r = await fetch(url, { signal: ctl.signal, headers: {Accept:"application/vnd.github+json"}, cache:"no-store" });
      if (!r.ok) throw new Error(r.status);
      return await r.json();
    } finally { clearTimeout(t); }
  }

  function countTo(el, to) {
    if (!el) return; to = Math.max(0, to|0);
    const from = parseInt(el.textContent,10) || 0;
    if (from === to) { el.textContent = to; return; }
    const steps=26; let i=0; clearInterval(el._iv);
    el._iv = setInterval(() => { i++; el.textContent = Math.round(from + (to-from)*i/steps); if(i>=steps){clearInterval(el._iv); el.textContent=to;} }, 24);
  }

  function renderStats(data, stamp, offline) {
    const map = {problems:data.solved, algos:data.algos, projects:data.projects, repos:data.repos};
    document.querySelectorAll(".count[data-live]").forEach(el => {
      const v = map[el.dataset.live];
      if (typeof v === "number" && v > 0) { el.dataset.to = v; countTo(el, v); }
    });

    const solvedEl = $("#live-solved"); if (solvedEl) countTo(solvedEl, data.solved);
    const diffEl = $("#live-diff");
    if (diffEl) {
      const total = Math.max(data.solved, 1);
      diffEl.innerHTML = ["easy","medium","hard"].map(k => {
        const n = (data.diff && data.diff[k]) || 0, col = k==="easy"?"#2E7D5B":k==="medium"?"#8C857E":"#6B1C2A";
        return `<div class="live-bar"><div><span>${k}</span><b>${n}</b></div><div class="live-track"><i style="background:${col}" data-w="${Math.round(n/total*100)}"></i></div></div>`;
      }).join("");
      requestAnimationFrame(()=>diffEl.querySelectorAll(".live-track i").forEach(i=>i.style.width=i.dataset.w+"%"));
    }
    const latestEl = $("#live-latest");
    if (latestEl && data.latest?.title) {
      latestEl.innerHTML = `Latest solve — <b>${esc(data.latest.title)}</b> <span style="opacity:.7">(${esc(data.latest.difficulty)}, ${rel(data.latest.at)})</span>`;
    }

    const feed = $("#live-feed");
    if (feed) {
      if (!data.events.length) {
        feed.innerHTML = `<li><span class="ev">○</span><div><div class="msg">Activity feed unavailable right now.</div><div class="meta">Cached fallback · GitHub API rate limit</div></div></li>`;
      } else {
        feed.innerHTML = data.events.slice(0,7).map(e => {
          const repo = (e.repo?.name||"").replace(USER+"/","");
          const url = "https://github.com/" + (e.repo?.name||"");
          let icon="•", text="";
          if (e.type==="PushEvent") {
            const n = e.payload?.commits?.length || 1;
            const msg = e.payload?.commits?.[0]?.message || "pushed commits";
            icon="↑";
            text = `<b>${esc(repo)}</b> — ${esc(msg.split("\n")[0].slice(0,90))}<div class="meta">${n} commit${n>1?"s":""} · ${rel(e.created_at)}</div>`;
          } else if (e.type==="CreateEvent") {
            icon="＋"; text=`created <b>${esc(e.payload?.ref||e.payload?.ref_type||"repo")}</b> in <b>${esc(repo)}</b><div class="meta">${rel(e.created_at)}</div>`;
          } else if (e.type==="WatchEvent") {
            icon="★"; text=`starred <b>${esc(repo)}</b><div class="meta">${rel(e.created_at)}</div>`;
          } else {
            text=`<b>${esc(repo)}</b><div class="meta">${esc(e.type.replace("Event",""))} · ${rel(e.created_at)}</div>`;
          }
          return `<li><span class="ev">${icon}</span><div><a class="msg" href="${esc(url)}" target="_blank" rel="noopener">${text}</a></div></li>`;
        }).join("");
      }
    }

    const wrap = $("#live-repos");
    if (wrap && data.repoList.length) {
      wrap.innerHTML = `<span class="rl" style="align-self:center">Repositories</span>` + data.repoList.map(r =>
        `<a href="${esc(r.html_url)}" target="_blank" rel="noopener">${esc(r.name)}${r.language?`<i>${esc(r.language)}</i>`:""}<span class="rl">${rel(r.pushed_at)}</span></a>`
      ).join("");
    }

    const label = offline ? "cached" : "live · " + rel(stamp);
    ["#live-ts-1","#live-ts-2"].forEach(id => { const el=$(id); if(el) el.textContent=label; });
  }

  function renderRepoGrid(repoList, offline) {
    const grid = $("#repo-grid");
    const status = $("#auto-status");
    if (!grid) return;
    if (!repoList.length) {
      grid.innerHTML = `<div class="repo-card"><div class="repo-art" style="background:#1a1038"><div class="repo-top"><span class="repo-k">OFFLINE</span></div><div class="repo-glyph">?</div></div><div class="repo-body"><h3>Repositories unavailable</h3><p>GitHub API rate limit or network issue. Reload in a minute — this section updates itself automatically.</p></div></div>`;
      if (status) status.textContent = "GitHub data unavailable — showing fallback";
      return;
    }
    const sorted = repoList.slice().sort((a,b)=> new Date(b.pushed_at)-new Date(a.pushed_at));
    grid.innerHTML = sorted.map(r => {
      const art = artFor(r.name);
      const cat = inferCategory(r);
      const featured = CURATED_REPOS.has(r.name);
      const desc = r.description || `Auto-indexed ${cat.label.toLowerCase()} repository. Documentation and results will appear here as the project evolves.`;
      const lang = r.language ? `<span>● ${esc(r.language)}</span>` : "";
      const stars = r.stargazers_count ? `<span>★ ${r.stargazers_count}</span>` : "";
      const pushed = `<span>↻ ${rel(r.pushed_at)}</span>`;
      const topics = (r.topics||[]).slice(0,3).map(t=>`<span class="repo-lang">${esc(t)}</span>`).join("");
      return `
        <a class="repo-card ${featured?"":"repo-new"}" href="${esc(r.html_url)}" target="_blank" rel="noopener">
          <div class="repo-art" style="background:linear-gradient(135deg,${art.c1},${art.c2} 55%,${art.c3})">
            <div class="mesh" style="background:radial-gradient(circle at ${art.x1}% ${art.y1}%, rgba(255,255,255,${art.a1/200}), transparent 45%), radial-gradient(circle at ${art.x2}% ${art.y2}%, rgba(0,0,0,${art.a2/300}), transparent 50%)"></div>
            <div class="repo-top">
              <span class="repo-k">${esc(cat.label)}</span>
              ${featured ? `<span class="repo-featured">FEATURED</span>` : `<span class="repo-k">AUTO-INDEXED</span>`}
            </div>
            <div class="repo-glyph">${esc(art.glyph)}</div>
          </div>
          <div class="repo-body">
            <h3>${esc(r.name)}</h3>
            <p>${esc(desc)}</p>
            ${topics ? `<div class="card-tags">${topics}</div>` : ""}
            <div class="repo-foot">
              <div class="repo-stats">${lang}${stars}${pushed}</div>
              <span>↗</span>
            </div>
          </div>
        </a>`;
    }).join("");
    if (status) status.textContent = `${sorted.length} repositories indexed live from GitHub${offline?" (cached snapshot)":" — new repos appear here automatically"}`;
    if (window.__bindHover) window.__bindHover(grid);
  }

  /* ---------- data loading ---------- */
  let cached = null;
  try { cached = JSON.parse(localStorage.getItem(CACHE) || "null"); } catch {}

  function normalize(repos, prog, fp, pp, ev) {
    const d = JSON.parse(JSON.stringify(FALLBACK));
    d.algoList = [];
    if (prog?.items) {
      const items = Object.values(prog.items);
      if (items.length) {
        d.solved = items.length;
        d.diff = {easy:0,medium:0,hard:0};
        items.forEach(v => { const k=(v.difficulty||"").toLowerCase(); if(k in d.diff) d.diff[k]++; });
        const last = items.reduce((a,b)=> new Date(a.last_pushed_at)>new Date(b.last_pushed_at)?a:b);
        d.latest = {title:last.title, at:last.last_pushed_at, difficulty:last.difficulty};
        /* recent solves → auto-logged into the experiments section */
        d.solves = items
          .slice().sort((a,b)=> new Date(b.last_pushed_at||b.first_solved_at) - new Date(a.last_pushed_at||a.first_solved_at))
          .slice(0, 6)
          .map(v => ({
            title: v.title,
            difficulty: v.difficulty,
            category: v.category,
            at: v.last_pushed_at || v.first_solved_at,
            url: v.url,
            lines: v.lines
          }));
      }
    }
    if (Array.isArray(repos)) {
      d.repos = repos.length;
      d.repoList = repos.filter(r=>!r.fork).map(r => ({
        name:r.name, html_url:r.html_url, description:r.description, language:r.language,
        pushed_at:r.pushed_at, stargazers_count:r.stargazers_count, forks_count:r.forks_count,
        topics:r.topics||[], size:r.size, fork:r.fork
      }));
      // If topics missing (older API shape), keep empty.
    }
    if (Array.isArray(fp)) {
      const dirs = fp.filter(x=>x.type==="dir");
      const n = dirs.length; if (n) d.algos = n;
      dirs.forEach(x => d.algoList.push({
        name: x.name.replace(/^\d+\.?\s*/, "").replace(/SL$/, "").replace(/_/g, " ").trim() || x.name,
        raw: x.name,
        repo: "The-first-prinicple",
        html_url: `https://github.com/${USER}/The-first-prinicple/tree/main/${x.name}`,
        kind: "algorithm"
      }));
    }
    if (Array.isArray(pp)) {
      const dirs = pp.filter(x=>x.type==="dir" && /^\d/.test(x.name));
      const n = dirs.length; if (n) d.projects = n;
      dirs.forEach(x => d.algoList.push({
        name: x.name.replace(/^\d+\.?\s*/, "").replace(/_/g, " ").trim() || x.name,
        raw: x.name,
        repo: "python-ai-projects",
        html_url: `https://github.com/${USER}/python-ai-projects/tree/main/${x.name}`,
        kind: "build"
      }));
    }
    if (Array.isArray(ev)) d.events = ev;
    return d;
  }

  function renderAlgoGrid(algoList) {
    const grid = $("#algo-grid");
    if (!grid) return;
    const items = algoList || [];
    if (!items.length) {
      grid.innerHTML = `<div class="algo-card auto"><div class="algo-body"><h4>No folders indexed yet</h4><p>Add a numbered folder to <b>The-first-prinicple</b> or <b>python-ai-projects</b> and it appears here automatically.</p></div></div>`;
      return;
    }
    grid.innerHTML = items.map(a => {
      const art = artFor(a.raw || a.name);
      const cat = a.kind === "algorithm" ? "Algorithm" : "Build";
      return `
        <a class="algo-card auto" href="${esc(a.html_url)}" target="_blank" rel="noopener">
          <div class="algo-art" style="background:linear-gradient(135deg,${art.c1},${art.c2} 55%,${art.c3})">
            <span class="repo-k">AUTO-INDEXED · ${cat}</span>
            <b>${esc(art.glyph)}</b>
          </div>
          <div class="algo-body">
            <h4>${esc(a.name)}</h4>
            <p>${a.kind === "algorithm"
              ? "Derived, implemented from scratch and documented with a captured run."
              : "Trained, measured and documented — results and limits in the repo."}</p>
            <span class="algo-src">${esc(a.repo)} ↗</span>
          </div>
        </a>`;
    }).join("");
    /* collapse long grids: 8 visible, rest behind a toggle */
    const cards = [...grid.querySelectorAll(".algo-card")];
    const oldBtn = grid.parentNode.querySelector(".algo-toggle");
    if (oldBtn) oldBtn.remove();
    if (cards.length > 8) {
      grid.classList.add("collapsed");
      const btn = document.createElement("button");
      btn.className = "btn btn-ghost algo-toggle";
      btn.textContent = `Show all ${cards.length} →`;
      btn.addEventListener("click", () => {
        const open = grid.classList.toggle("collapsed");
        btn.textContent = open ? `Show all ${cards.length} →` : "Show less ↑";
      });
      grid.insertAdjacentElement("afterend", btn);
    }
    if (window.__bindHover) window.__bindHover(grid);
  }

  /* ── training paths (auto: Deep-ML progress + insideout.sh modules) ── */
  window.__renderTracks = function (d) {
    const wrap = document.querySelector("#tracks"), caps = document.querySelector("#capstones");
    const tracks = (window.CONFIG && CONFIG.learningTracks) || [];
    if (!wrap) return;

    /* auto-detect module completion from repo names/descriptions (word-safe) */
    const repoBlob = (d.repoList || []).map(r => `${r.name} ${r.description || ""}`).join(" ").toLowerCase();
    const algoBlob = (d.algoList || []).map(a => a.name).join(" ").toLowerCase();
    const solveBlob = (d.solves || []).map(s => s.title || "").join(" ").toLowerCase();
    const blob = repoBlob + " " + algoBlob + " " + solveBlob;
    const kwHit = (blob, kws) => (kws || []).some(k => new RegExp(`(^|[^a-z])${k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").trim()}([^a-z]|$)`).test(blob));

    wrap.innerHTML = tracks.map(t => {
      let body = "";
      if (t.auto === "deep-ml") {
        const diff = d.diff || {easy: 0, medium: 0, hard: 0};
        const target = (CONFIG && CONFIG.deepMlTarget) || 60;
        const pct = Math.min(100, Math.round(d.solved / target * 100));
        const path = (CONFIG.deepPath || []).map(([zone, depth, chapters]) => {
          const chips = chapters.map(([name, concepts, kws]) => {
            const hits = kws.filter(k => kwHit(blob, [k])).length;
            const st = hits >= Math.max(3, Math.ceil(kws.length * .2)) ? "done" : hits > 0 ? "active" : "next";
            return `<span class="dp-chip ${st}" title="${hits} signals matched"><i></i>${esc(name)}<b>${concepts}</b></span>`;
          }).join("");
          return `<div class="dp-zone"><div class="dp-zname">${esc(zone)}<em>${esc(depth)}</em></div><div class="dp-chips">${chips}</div></div>`;
        }).join("");
        body = `
          <div class="track-stat"><strong>${d.solved}</strong><span>problems solved · ${diff.easy} easy · ${diff.medium} medium · ${diff.hard} hard</span></div>
          <div class="bar"><i data-w="${pct}" style="width:${pct}%"></i></div>
          <div class="dp-map">${path}</div>
          <p class="track-note">The <b>Deep-Path</b> — 5 depth zones · 14 chapters · 112 concepts · 3,185 steps. Chapters light up when my repos and solves show the work; the counter syncs from <b>progress.json</b>.</p>`;
      } else {
        const mods = (t.modules || []).map(m => {
          const [name, override, state, project, keywords] = m;
          const done = kwHit(blob, keywords);
          const pct = done ? 100 : (override || 0);
          return `
            <div class="mod-row ${done ? "done" : ""}">
              <div class="mod-top"><span>${done ? "✓" : "○"} ${esc(name)}</span><b>${done ? "auto ✓" : (pct ? pct + "%" : "—")}</b></div>
              <div class="bar"><i data-w="${pct}" style="width:${pct}%"></i></div>
              <em>${esc(project || "")}</em>
            </div>`;
        }).join("");
        body = `<div class="mod-grid">` + mods + `</div><p class="track-note">Modules mark themselves <b>✓ auto</b> when I push a matching project to GitHub. Nothing to edit by hand.</p>`;
      }
      return `<div class="track-card reveal">
        <div class="track-head"><span class="mc-dot${t.auto === "deep-ml" ? "" : " alt"}"></span> ${esc(t.name)} <span class="track-state" id="${t.auto === "deep-ml" ? "track-1-state" : "track-2-state"}"></span> <a href="${esc(t.link)}" target="_blank" rel="noopener">${esc(t.source)} ↗</a></div>
        ${body}
      </div>`;
    }).join("");
    if (caps) {
      caps.innerHTML = `
        <div class="cap-head">PROJECT PER MODULE <span>from the AI engineering curriculum — each becomes a card here automatically once its repo exists</span></div>
        <ol class="cap-list">
          ${((tracks.find(x => x.modules) || {}).modules || []).map(m => `<li><b>${esc(m[0])}:</b> ${esc(m[3] || "")}</li>`).join("")}
        </ol>
        <p class="cap-note">When all 11 modules show ✓ and the projects are pushed, the site stops calling me "in training" automatically.</p>`;
    }
    if (window.__bindHover) window.__bindHover(wrap);
  };

  /* ── auto-log: recent Deep-ML solves injected into the experiments section ── */
  function renderAutoLog(d) {
    const host = document.querySelector("#exp-list");
    if (!host || !d.solves || !d.solves.length) return;
    const old = host.querySelectorAll(".exp-item.auto");
    old.forEach(n => n.remove());
    const fmt = iso => { const x = new Date(iso); return isNaN(x) ? "" : x.toISOString().slice(0, 10); };
    const rows = d.solves.map(s => `
      <article class="exp-item auto reveal">
        <div class="exp-date">${fmt(s.at)}<span class="auto-badge">AUTO</span></div>
        <div class="exp-body">
          <h3>${esc(s.title)}</h3>
          <p class="exp-q"><b>Logged from progress.json.</b> ${esc(s.category || "")} · ${esc(s.difficulty || "")}${s.lines ? ` · ${s.lines} lines` : ""} · solved and pushed — no manual entry needed.</p>
          <a href="${esc(s.url || "https://www.deep-ml.com")}" target="_blank" rel="noopener">see the problem ↗</a>
        </div>
      </article>`).join("");
    host.insertAdjacentHTML("afterbegin", rows);
    if (window.__bindHover) window.__bindHover(host);
  }

  function renderAll(d, at, offline) {
    window.__lastData = d;
    renderStats(d, at, offline);
    renderRepoGrid(d.repoList, offline);
    renderAlgoGrid(d.algoList);
    renderAutoLog(d);
    if (window.__renderTracks) window.__renderTracks(d);
    if (window.__renderStage) window.__renderStage(d);
    if (window.__renderExhibit) window.__renderExhibit(d);
  }

  if (cached?.data) renderAll(cached.data, cached.at, true);

  async function load() {
    const [progR, reposR, fpR, ppR, evR] = await Promise.allSettled([
      getJSON(PROGRESS),
      getJSON(`${API}/users/${USER}/repos?per_page=100&sort=pushed`),
      getJSON(`${API}/repos/${USER}/The-first-prinicple/contents`),
      getJSON(`${API}/repos/${USER}/python-ai-projects/contents`),
      getJSON(`${API}/users/${USER}/events/public?per_page=15`)
    ]);
    const val = r => r.status==="fulfilled" ? r.value : null;
    const d = normalize(val(reposR), val(progR), val(fpR), val(ppR), val(evR));

    /* ── capstone/work-sprint repos: index their folders too, so a single
       repo like `ai-engineering-capstones` with project subfolders is
       auto-indexed and auto-completes modules by folder name ── */
    const workRepos = (d.repoList || []).filter(r => /capstone|insideout|sprint|projects?-20/i.test(r.name));
    if (workRepos.length) {
      const results = await Promise.allSettled(workRepos.map(r => getJSON(`${API}/repos/${USER}/${r.name}/contents`)));
      results.forEach((res, i) => {
        if (res.status !== "fulfilled" || !Array.isArray(res.value)) return;
        res.value.filter(x => x.type === "dir").forEach(x => {
          d.algoList.push({
            name: x.name.replace(/^\d+[.\-_ ]?\s*/, "").replace(/[_-]+/g, " ").trim() || x.name,
            raw: x.name,
            repo: workRepos[i].name,
            html_url: `https://github.com/${USER}/${workRepos[i].name}/tree/main/${x.name}`,
            kind: /capstone/i.test(workRepos[i].name) ? "capstone" : "build"
          });
        });
      });
    }
    const live = [progR,reposR,fpR,ppR].some(r=>r.status==="fulfilled");
    /* if every fetch failed but we have a cached paint, keep it —
       a rate-limited moment must never empty the evidence wall */
    if (!live && cached?.data) return;
    const at = Date.now();
    if (live) try { localStorage.setItem(CACHE, JSON.stringify({at,data:d})); } catch {}
    renderAll(d, at, !live);
  }

  const fresh = cached && (Date.now() - cached.at < TTL);
  if (!fresh) load();
})();
