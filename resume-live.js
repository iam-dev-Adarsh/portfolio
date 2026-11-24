/* ══ resume-live.js — self-updating resume data layer ══
   Pulls from GitHub on open and patches the resume in place:
   · solved count + difficulty mix  ← The-first-prinicple/progress.json (fallback: README, repo titles)
   · algorithm chips + count        ← The-first-prinicple folder listing (auto)
   · capstone series                ← ai-engineering-capstones folders (auto), curated text when known
   Offline / rate-limited? The baked snapshot in the HTML stays as-is. Never blocks printing. */
(() => {
  "use strict";
  const USER = "iam-dev-Adarsh";
  const RAW = (repo, path) => `https://raw.githubusercontent.com/${USER}/${repo}/main/${path}`;
  const TREE = (repo) => `https://api.github.com/repos/${USER}/${repo}/git/trees/main?recursive=1`;
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  const setLive = (key, val) => $$(`[data-live="${key}"]`).forEach(el => el.textContent = val);

  const titleCase = s => s.replace(/[-_]+/g, " ").replace(/\b\w/g, c => c.toUpperCase());

  /* curated capstone descriptions — matched by folder-name keyword */
  const CAP_DESC = [
    [/bank/i, "End-to-end classical ML: EDA → baselines → logistic regression & decision trees → accuracy, precision, recall, F1, confusion matrix → business-framed conclusion."],
    [/loan/i, "Imbalanced classification: train/val/test design, class-imbalance handling, threshold tuning, and a fairness check across groups."],
    [/gradient/i, "Vectorized gradient descent on linear & logistic regression; feature scaling, convergence analysis, step-size behaviour."],
    [/feedforward|network.*scratch/i, "Backpropagation in NumPy — a digit classifier built without any framework, with hand-derived gradients."],
    [/gpt|shakespeare/i, "Tokenization, embeddings, masked self-attention, training loop, and sampling — a working language model."],
    [/fastapi|service/i, "A trained model exposed as a REST service: inference endpoint, validation, health checks, deployment workflow."],
    [/prompt/i, "Systematic prompt comparison: variants, labelled dataset, scoring pipeline, and objective winner selection."],
    [/offline|evaluation/i, "Model comparison with metric pipelines and reporting; regression error analysis and confusion-matrix interpretation."],
    [/semantic|search|rag/i, "Embeddings, cosine retrieval, chunking strategies, and a retrieval-augmented generation prototype with an evaluation set."],
    [/agent/i, "Function calling, tool loop, planning behaviour, and an agentic evaluation covering common failure cases."],
    [/fallback|production/i, "Model service with fallbacks: retries, secondary model, latency & uptime budgets, and operational monitoring."],
    [/regression/i, "A regression model that explains its predictions — error analysis and interpretable outputs."]
  ];
  const capDesc = name => {
    for (const [re, d] of CAP_DESC) if (re.test(name)) return d;
    return "Part of the AI engineering capstone series — end-to-end project with code, evaluation, and write-up.";
  };

  /* ── 1. progress.json → solved count + difficulty mix ── */
  function applyProgress(p) {
    let entries = Array.isArray(p.entries) ? p.entries : Array.isArray(p) ? p : [];
    const solved = entries.filter(e => e && (e.solved === true || e.status === "solved")).length;
    if (solved > 0) setLive("solved", String(solved));
    const d = p.diff || p.difficulty || null;
    if (d && typeof d === "object") {
      const parts = ["easy", "medium", "hard"].filter(k => typeof d[k] === "number")
        .map(k => `${d[k]} ${k}`);
      if (parts.length) $$('[data-live="diff"]').forEach(el => {
        el.innerHTML = "<b>Difficulty mix:</b> " + parts.join(" · ");
      });
    }
    return solved;
  }

  /* ── 2. repo tree helpers ── */
  const topDirs = (tree) => tree
    .filter(e => e.type === "tree" && !/\//.test(e.path) && !e.path.startsWith("."))
    .map(e => e.path);

  /* ── 3. algorithm chips ← The-first-prinicple folders ── */
  function applyAlgos(dirs) {
    const skip = /readme|docs?|notebooks?|scripts?|assets|img|image|images|src|data/i;
    const names = dirs.filter(d => !skip.test(d)).map(d => d.replace(/^\d+[.\-)\s]+/, "").replace(/\s*(U?SL)$/i, "").trim());
    if (names.length < 4) return;
    setLive("algos", String(names.length));
    const box = $("#algo-chips");
    if (box) box.innerHTML = names
      .sort((a, b) => a.localeCompare(b))
      .map(n => `<span class="chip">${titleCase(n)}</span>`).join("");
  }

  /* ── 4. capstone grid ← ai-engineering-capstones folders (with links) ── */
  const REPO_URL = `https://github.com/${USER}/ai-engineering-capstones/tree/main/`;
  const PAGES_URL = `https://${USER}.github.io/ai-engineering-capstones/`;
  function applyCaps(tree) {
    const dirs = topDirs(tree);
    const folders = dirs.filter(d => /^\d/.test(d)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    if (!folders.length) return;
    const grid = $("#caps-grid");
    if (!grid) return;
    const paths = tree.map(e => e.path);
    grid.innerHTML = folders.map((f, i) => {
      const name = titleCase(f.replace(/^\d+[-.\s]*/, ""));
      /* live demo? a demo/app/index/serve .html sitting in the folder root → GitHub Pages */
      const demo = paths.find(p => new RegExp(`^${f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/(demo|app|index|serve)\\.html$`, "i").test(p));
      const demoLink = demo
        ? ` <a class="demo-link" href="${PAGES_URL}${demo}" target="_blank" rel="noopener">live demo ↗</a>`
        : "";
      return `<div class="cap"><div class="n">${String(i + 1).padStart(2, "0")}</div>` +
             `<div class="t"><b><a href="${REPO_URL}${f}" target="_blank" rel="noopener">${name} ↗</a></b>` +
             `<span>${capDesc(f)}${demoLink}</span></div></div>`;
    }).join("");
  }

  /* ── run: best-effort, never blocks ── */
  const json = u => fetch(u).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); });
  let live = false;

  json(RAW("The-first-prinicple", "progress.json"))
    .then(applyProgress)
    .catch(() => json(RAW("The-first-prinicple", "progress.json").replace("/main/", "/master/"))
      .then(applyProgress).catch(() => {}));

  Promise.allSettled([
    json(TREE("The-first-prinicple")).then(j => applyAlgos(topDirs(j.tree || []))),
    json(TREE("ai-engineering-capstones")).then(j => applyCaps(j.tree || [])),
    json(TREE("python-ai-projects"))
  ]).then(() => {
    live = true;
    const stamp = $("#live-stamp");
    if (stamp) {
      const d = new Date().toISOString().slice(0, 10);
      stamp.textContent = "AUTO-UPDATED FROM GITHUB · " + d;
    }
  });
  /* debug/test hook (harmless in production) */
  window.__resumeApplyCaps = applyCaps;
})();
