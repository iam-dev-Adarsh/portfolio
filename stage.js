/* ═══════════════════════════════════════════════════════════════
   STAGE ENGINE — the site reframes itself from your real signals.
   score = solved + algos×2 + builds×6 + capstones×12 + curriculum%×0.7
   The stage decides the hero copy, the role rotator, the model card
   and the tone of the whole page. Nothing is hard-coded to "student".
   ═══════════════════════════════════════════════════════════════ */
(() => {
  const $ = s => document.querySelector(s);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  const STAGES = [
    {
      min: 0,
      chip: "STAGE 1 · FOUNDATIONS",
      name: "Foundations",
      phrase: "AI/ML engineer in training",
      status: "In training · learning daily",
      role: "AI/ML engineer in training · learning in public",
      line: "I rebuild machine learning from the ground up — the linear algebra, the gradients, the algorithms — while training on two paths: the Deep-ML deep dive and a structured AI engineering curriculum.",
      roles: ["AI/ML engineer in training","First-principles learner","Deep-ML deep diver","AI engineering learner","Python developer"]
    },
    {
      min: 90,
      chip: "STAGE 2 · PRACTITIONER",
      name: "Practitioner",
      phrase: "AI/ML practitioner",
      status: "Practising · shipping weekly",
      role: "AI/ML practitioner · building in public",
      line: "I implement machine learning from first principles and ship documented projects — trained, measured, and honestly evaluated.",
      roles: ["AI/ML practitioner","First-principles implementer","Deep-learning builder","Model debugger","Python developer"]
    },
    {
      min: 220,
      chip: "STAGE 3 · BUILDER",
      name: "Builder",
      phrase: "AI/ML engineer",
      status: "Building systems · open to work",
      role: "AI/ML engineer · models + production practice",
      line: "I build and evaluate AI systems end to end — from the math underneath to the production practices on top: routing, evaluation, guardrails, serving.",
      roles: ["AI/ML engineer","Systems builder","Evaluation-minded engineer","Agent builder","Production AI"]
    },
    {
      min: 420,
      chip: "STAGE 4 · ENGINEER",
      name: "AI/ML Engineer",
      phrase: "AI/ML engineer",
      status: "Capstones shipped · open to opportunities",
      role: "AI/ML engineer · capstone-proven",
      line: "I build AI systems that hold up: models derived from scratch, agents with tools and limits, evaluations that measure what matters, and capstone projects shipped end to end.",
      roles: ["AI/ML engineer","Capstone-proven builder","Agent & eval specialist","Production AI engineer","First-principles thinker"]
    }
  ];

  window.__renderStage = function (d) {
    const cfg = window.CONFIG || {};
    const solved   = d.solved   || 0;
    const algos    = d.algos    || 0;
    const builds   = d.projects || 0;
    const repos    = d.repoList || [];
    const capstones = repos.filter(r => /capstone/i.test((r.name || "") + " " + (r.description || ""))).length;

    const curriculum = (cfg.learningTracks || []).find(t => /ai.?engineering|curriculum/i.test(t.source || t.name || "") && t.modules);
    const mods = curriculum && curriculum.modules ? curriculum.modules : [];
    /* auto: a module counts as done when a matching project appears in the repos */
    const blob = ((d.repoList || []).map(r => `${r.name} ${r.description || ""}`).join(" ") + " " +
                  (d.algoList || []).map(a => a.name).join(" ")).toLowerCase();
    const kwHit = (kws) => (kws || []).some(k => new RegExp(`(^|[^a-z])${k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").trim()}([^a-z]|$)`).test(blob));
    const modPcts = mods.map(m => {
      const [name, override, state, project, keywords] = m;
      const done = kwHit(keywords);
      return done ? 100 : (override || 0);
    });
    const avg = modPcts.length ? modPcts.reduce((a, b) => a + b, 0) / modPcts.length : 0;
    const insideoutDone = modPcts.length > 0 && modPcts.every(p => p >= 100);
    const trackComplete = insideoutDone;

    const score = Math.round(solved + algos * 2 + builds * 6 + capstones * 12 + avg * 0.7);
    let stage = STAGES[0];
    for (const s of STAGES) if (score >= s.min) stage = s;
    const idx = STAGES.indexOf(stage);
    const next = STAGES[idx + 1];
    const pctToNext = next ? Math.min(100, Math.round((score - stage.min) / (next.min - stage.min) * 100)) : 100;

    /* ── chip + progress ── */
    const wrap = $("#stage-wrap");
    if (wrap) {
      wrap.innerHTML = `
        <div class="stage-chip"><span class="mc-dot${idx > 1 ? " alt" : ""}"></span> ${esc(stage.chip)}</div>
        <div class="stage-track">
          <div class="stage-bar"><i style="width:${pctToNext}%"></i></div>
          <span class="stage-next">${next
            ? `${pctToNext}% to ${esc(next.name)} · score ${score}`
            : `${trackComplete ? "All tracks complete" : "Top stage · finishing the tracks"} · score ${score}`}</span>
        </div>`;
    }

    /* ── copy reframe ── */
    const phrase = $("#stage-phrase");
    if (phrase) phrase.textContent = stage.phrase;
    const status = $("#cfg-stage");
    if (status) status.textContent = trackComplete ? "All training tracks complete" : stage.status;
    const line = $("#stage-line");
    if (line) line.textContent = stage.line;

    /* ── role rotator follows the stage ── */
    if (cfg) cfg.rotatingRoles = stage.roles;

    /* ── model card meta ── */
    const scoreEl = $("#cfg-score");
    if (scoreEl) scoreEl.textContent = String(score);

    /* ── track completion badges ── */
    const deepTarget = cfg.deepMlTarget || 60;
    const t1 = $("#track-1-state"), t2 = $("#track-2-state");
    if (t1) t1.textContent = solved >= deepTarget ? "✓ target reached" : `${solved}/${deepTarget} to target`;
    const doneCount = modPcts.filter(p => p >= 100).length;
    if (t2) t2.textContent = trackComplete
      ? "✓ complete"
      : `${doneCount}/${modPcts.length || 11} modules auto-complete`;

    /* ── SEO reframe ── */
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content",
      `Adarsh Singh — ${stage.phrase}. Machine learning from first principles: ${solved} Deep-ML problems, ${algos} algorithms from scratch, ${builds} documented builds.`);
  };

  /* ── bootstrap: render as soon as data exists (handles script load order) ── */
  const boot = () => {
    if (window.__lastData) {
      window.__renderStage(window.__lastData);
    } else {
      /* fall back to the baked CONFIG numbers so the page is never unstyled */
      const c = window.CONFIG || {};
      const projects = c.projects || [];
      window.__renderStage({
        solved: 30,
        algos: 12,
        projects: projects.filter(p => /python-ai-projects/.test(p.link || "")).length || 4,
        repoList: []
      });
    }
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
  /* live.js may finish after us — poll briefly */
  let tries = 0;
  const poll = setInterval(() => {
    tries++;
    if (window.__lastData) { window.__renderStage(window.__lastData); clearInterval(poll); }
    if (tries > 40) clearInterval(poll);
  }, 250);
})();