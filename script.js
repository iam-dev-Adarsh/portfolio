/* ═══════════════════════════════════════════════════════════════
   ADARSH SINGH — PORTFOLIO CONFIG
   Edit this block. Everything else renders from it.
   New GitHub repos also appear automatically in the Self-Indexing Lab.
   ═══════════════════════════════════════════════════════════════ */
const CONFIG = {
  name: "Adarsh Singh",
  role: "AI/ML engineer in training · learning in public",
  location: "Remote-first",
  availability: "Now",
  email: "iamvoid03@gmail.com",
  github: "https://github.com/iam-dev-Adarsh",
  deepMlTarget: 60, // how many Deep-ML problems counts as "target reached" for the Stage engine

  /* ── Deep-Path (deep-ml.com/deep-path): the full dive — 5 zones · 14 chapters · 112 concepts · 3,185 steps.
     Each chapter: [name, concepts, keywords] — chapters light up ✓ when my repos/solves show the work. */
  deepPath: [
    ["Sunlit zone", "0–200 m", [
      ["Classical Machine Learning", 23, ["regression", "classification", "decision tree", "random forest", "xgboost", "boosting", "svm", "support vector", "knn", "nearest", "k-means", "kmeans", "clustering", "pca", "naive bayes", "softmax", "gradient descent", "logistic", "linear", "anomaly", "time series", "ensemble", "bayesian", "survival", "hypothesis"]],
      ["Deep Learning", 19, ["neural", "backprop", "mlp", "cnn", "conv", "rnn", "lstm", "attention", "transformer", "dropout", "batchnorm", "optimizer", "adam", "activation", "relu", "autoencoder", "gan", "pytorch", "tensor", "distillation", "pruning"]]
    ]],
    ["Twilight zone", "200–1,000 m", [
      ["Large Language Models", 24, ["gpt", "token", "tokenizer", "embedding", "bigram", "perplexity", "sampling", "decoding", "context", "mamba", "moe", "fine-tun", "lora", "peft", "sft", "rlhf", "ppo", "grpo", "rag", "retrieval", "agent", "interpretability", "multimodal", "byte"]],
      ["Diffusion & World Models", 2, ["diffusion", "ddpm", "flow matching", "world model", "video"]]
    ]],
    ["Midnight zone", "1,000–4,000 m", [
      ["Reinforcement Learning", 10, ["reinforcement", "bandit", "mdp", "monte carlo", "temporal", "policy gradient", "actor", "critic", "dqn", "q-learning", "q learning", "dyna", "self-play", "sim-to-real"]],
      ["Graph Neural Networks", 3, ["graph", "message passing", "node embedding", "link prediction", "spectral"]]
    ]],
    ["The abyss", "4,000–6,000 m", [
      ["Inference Engineering", 10, ["latency", "throughput", "roofline", "kv cache", "paging", "batching", "scheduling", "speculative", "quantization", "kernel", "parallelism", "disaggregation", "mlops", "serving"]],
      ["GPU Programming · CUDA & Triton", 4, ["cuda", "triton", "warp", "gpu", "fusion"]],
      ["ML Compilers", 3, ["compiler", "graph ir", "codegen", "tiling", "symbolic"]],
      ["AI Safety & Governance", 1, ["safety", "fairness", "privacy", "governance"]]
    ]],
    ["The trench", "6,000 m+", [
      ["SQL & pandas", 4, ["sql", "pandas", "join", "window", "retention"]],
      ["Algorithms & Data Structures", 5, ["array", "two pointers", "hashing", "heap", "stack", "queue", "linked list", "trie", "dynamic programming"]],
      ["Robotics & Control", 1, ["kinematics", "rotation", "filtering", "control"]],
      ["Math Drills", 3, ["linear algebra", "calculus", "probability", "statistics", "eigen", "svd", "cholesky", "qr", "determinant", "matrix"]]
    ]]
  ],
  learningTracks: [
    {
      name: "Deep-ML · Deep Dive",
      source: "deep-ml.com",
      note: "Problem-solving path — every solution hand-written, progress auto-synced below.",
      link: "https://github.com/iam-dev-Adarsh/deep-ml",
      auto: "deep-ml"
    },
    {
      name: "AI Engineering curriculum",
      source: "11 modules · 11 projects",
      note: "The full AI engineering curriculum: how models work inside, then how to build with them. Each module ends in a project I build on my own machine.",
      link: "https://github.com/iam-dev-Adarsh/ai-engineering-capstones",
      /* Each module: [name, project to build, matchKeywords — if any of these appear in a
         repo name/description, the module auto-marks as done. NO manual editing needed.]
         The 2nd number (currently 0) is a manual override if you ever want one. */
      modules: [
        ["01 Classical Machine Learning", 0, "next", "A marketing model on real bank data", ["marketing", "bank", "classical"]],
        ["02 Neural Networks", 0, "next", "A digit reader from scratch (NumPy only)", ["digit", "mnist", "from scratch"]],
        ["03 Tokens and Embeddings", 0, "next", "A tokenizer and a bigram model on one book", ["tokenizer", "tokeniz", "bigram model", "embeddings"]],
        ["04 Transformers", 0, "next", "A small GPT on Shakespeare", ["gpt", "transformer", "attention"]],
        ["05 Training and Tuning", 0, "next", "A small model fine-tuned with LoRA", ["lora", "fine-tun", "finetun", "fine tun"]],
        ["06 Inference and Serving", 0, "next", "A serving benchmark on your laptop", ["serving", "inference", "benchmark", "vllm", "precision"]],
        ["07 Prompting", 0, "next", "A support desk pipeline on a local model", ["prompt", "support desk", "structured output"]],
        ["08 Evaluation", 0, "next", "An evaluation report on two local models", ["eval", "evaluation", "rubric"]],
        ["09 Search and Retrieval", 0, "next", "Search over your own notes", ["retrieval", "search engine", "rag ", "vector search", "semantic search", "your own notes", "notes search", "notes-search", "search over"]],
        ["10 Agents", 0, "next", "A database agent with traces and limits", ["agent", "tool use", "trace", "knowledge base", "wiki"]],
        ["11 Production AI", 0, "next", "A model service with a fallback", ["fallback", "production", "routing", "budget", "model service"]]
      ],
      toolkit: ["Engineering Toolkit", "A small data API, from repo to container", ["api", "container", "docker", "data api"]]
    }
  ],
  rotatingRoles: [
    "AI/ML engineer in training",
    "First-principles learner",
    "Deep-ML deep diver",
    "AI engineering learner",
    "Future AI engineer",
    "Python developer"
  ],
  marquee: ["FIRST PRINCIPLES","LINEAR ALGEBRA","NEURAL NETWORKS","DEEP LEARNING","COMPUTER VISION","NLP","REINFORCEMENT LEARNING","EVALUATION","PYTHON"],
  projects: [
    {
      icon:"🧮", cat:"found", label:"Foundations",
      title:"Deep-ML — Practice Kernel",
      desc:"30 solved — 20 ML problems + 10 math, from ReLU to Cholesky, LU/QR, Woodbury and conjugate gradient. Every solution hand-written, with coverage tracking that replays each solve in time.",
      tags:["Python","NumPy","Linear Algebra"], year:"2026",
      repo:"deep-ml",
      link:"https://github.com/iam-dev-Adarsh/deep-ml",
      visual:{kind:"svg", src:"assets/projects/coverage.svg", alt:"Deep-ML coverage chart"}
    },
    {
      icon:"⚙️", cat:"found", label:"From Scratch",
      title:"The First Principle — ML From Scratch",
      desc:"13 algorithms rebuilt without library shortcuts — gradient descent, linear/logistic/softmax regression, KNN, trees, forests, SVM, XGBoost, k-means, naive Bayes, Q-learning and PCA. Each with a derivation, a runnable script and a captured run.",
      tags:["NumPy","Classical ML","From Scratch"], year:"2026",
      repo:"The-first-prinicple",
      link:"https://github.com/iam-dev-Adarsh/The-first-prinicple",
      visual:{kind:"figure", src:"assets/projects/forest.png", alt:"Decision regions learned by a hand-written random forest"}
    },
    {
      icon:"🎭", cat:"dl", label:"Deep Learning",
      title:"Shakespeare Text Generator (LSTM)",
      desc:"Stacked LSTM trained on ~1.1M characters of Shakespeare (500k subset). One-hot sequences, 128-unit layers and temperature-scaled sampling — 0.2 for structure, 0.8 for invention.",
      tags:["Keras","LSTM","TensorFlow"], year:"2026",
      repo:"python-ai-projects",
      link:"https://github.com/iam-dev-Adarsh/python-ai-projects/tree/main/0.RRN_text_generator",
      visual:{kind:"code", tone:"crimson", alt:"Sampled LSTM output",
        lines:["king:","the bend and the warthing to his deash,","and thou was the great thou of your true,","and so the do you of the true for thou hast sound."],
        caption:"temperature 0.4 · real sampled output"}
    },
    {
      icon:"🏎️", cat:"dl", label:"Reinforcement Learning",
      title:"Self-Driving Car — NEAT NeuroEvolution",
      desc:"No labels, no backpropagation. Evolved topologies learn winding tracks from reward alone — best fitness climbed 2,604 → 6,245 in four generations, using 5-ray raycasting and bounding-box collision physics at 60 FPS.",
      tags:["NEAT","Pygame","Genetic Algorithms"], year:"2026",
      repo:"python-ai-projects",
      link:"https://github.com/iam-dev-Adarsh/python-ai-projects/tree/main/1.Self_driving_AI_game",
      visual:{kind:"photo", src:"assets/projects/track.png", alt:"Procedurally generated racing track used for training"}
    },
    {
      icon:"🖼️", cat:"cv", label:"Computer Vision",
      title:"CIFAR-10 Image Classifier (CNN)",
      desc:"63.32% test accuracy over 20 epochs — and honest about it. Normalisation, a CNN, checkpointing, then top-3 confidence predictions on new images (a car classified at 99.33%).",
      tags:["CNN","TensorFlow","OpenCV"], year:"2026",
      repo:"python-ai-projects",
      link:"https://github.com/iam-dev-Adarsh/python-ai-projects/tree/main/3.IMG_Classifier_TFandCNN",
      visual:{kind:"photo", src:"assets/projects/car.jpg", alt:"Sample image classified as a car with 99.33% confidence"}
    },
    {
      icon:"📰", cat:"nlp", label:"NLP",
      title:"Fake or Real — News Classifier",
      desc:"Text classification with TF-IDF features and a LinearSVC, honest accuracy reporting and an explicit note on what the model cannot do. Learning to respect a model's limits.",
      tags:["scikit-learn","TF-IDF","LinearSVC"], year:"2026",
      repo:"python-ai-projects",
      link:"https://github.com/iam-dev-Adarsh/python-ai-projects/tree/main/2.Fake_or_Truth",
      visual:{kind:"code", tone:"blue", alt:"Classifier pipeline",
        lines:["article  →  TfidfVectorizer","         →  LinearSVC()","         →  label: real | fake","","// learns writing style,","// not truth. documented."],
        caption:"TF-IDF → LinearSVC pipeline"}
    }
  ],
  skills: [
    ["Python",88],["NumPy & Linear Algebra",82],["Classical ML (from scratch)",78],
    ["TensorFlow / Keras",72],["Deep Learning Concepts",68],["Model Evaluation & Debugging",66],["PyTorch (learning)",38]
  ],
  chips: ["Python","NumPy","Pandas","Matplotlib","scikit-learn","TensorFlow","Keras","PyTorch (learning)","OpenCV","Jupyter","NEAT","Git & GitHub","Linear Algebra","Calculus","Statistics","SQL","Backpropagation","Gradient Descent"],
  journey: [
    ["2026 — NOW","Training in public · AI/ML Engineering","Two parallel tracks: the Deep-ML deep dive (solutions by hand) and a structured AI engineering curriculum (production systems + capstone projects). Everything documented."],
    ["2026","30 Deep-ML Problems Solved","20 ML problems and 10 math problems across linear algebra, matrix decompositions and deep-learning fundamentals — every solution written by hand."],
    ["2026","12 Algorithms Built From Scratch","Gradient descent through Q-learning: regression, KNN, trees, forests, SVM, XGBoost, k-means and naive Bayes implemented without library shortcuts."],
    ["2026","4 Deep-Learning Projects Shipped","LSTM text generation, NEAT neuroevolution driving, a CIFAR-10 CNN and an NLP classifier — trained, evaluated and documented."]
  ],
  principles: [
    ["“Derive before coding. Start with the problem, the assumptions and the objective — then write the model.”","Principle 01 — The Method"],
    ["“Make the mechanics visible. Implement the math and the learning procedure instead of hiding them behind a prebuilt API.”","Principle 02 — The Implementation"],
    ["“Don't just use the model. Understand how it came to be.”","Principle 03 — The Why"],
    ["“Test the fundamentals. Check numerical results, edge cases and behaviour against known examples.”","Principle 04 — The Proof"]
  ],
  socials: [
    ["GitHub ↗","https://github.com/iam-dev-Adarsh"],
    ["Deep-ML Portfolio ↗","https://iam-dev-Adarsh.github.io/deep-ml/"],
    ["Email ↗","mailto:iamvoid03@gmail.com"],
    ["WhatsApp ↗","https://wa.me/919439440544","whatsapp"]
  ]
};
/* ═══════════════════ END CONFIG ═══════════════════ */
window.CONFIG = CONFIG;

const $ = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => [...c.querySelectorAll(s)];
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
const FINE = matchMedia("(hover:hover) and (pointer:fine)").matches;

$("#cfg-name").textContent = CONFIG.name;
$("#cfg-name2").textContent = CONFIG.name;
$("#cfg-name3").textContent = CONFIG.name;
$("#cfg-role").textContent = CONFIG.role;
$("#cfg-location").textContent = CONFIG.location;
$("#cfg-availability").textContent = CONFIG.availability;

/* ---------- preloader ---------- */
(() => {
  const pre = $("#preloader");
  if (REDUCED) { pre.classList.add("done"); return; }
  let p = 0; const t0 = performance.now();
  const iv = setInterval(() => {
    p = Math.min(100, p + 18);
    $(".pre-bar i").style.width = p + "%";
    $(".pre-count").textContent = Math.floor(p) + "%";
    if (p >= 100 || performance.now() - t0 > 750) {
      clearInterval(iv);
      $(".pre-count").textContent = "100%";
      setTimeout(() => pre.classList.add("done"), 120);
    }
  }, 55);
})();

/* ---------- toast ---------- */
function toast(msg) {
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove("show"), 2200);
}
/* ---------- neural canvas ---------- */
(() => {
  const cv = $("#nn-canvas");
  const ctx = cv.getContext("2d", { alpha: true });
  let W=0,H=0,dpr=1,nodes=[],pulses=[],raf=null,mx=-9999,my=-9999;
  const N = () => Math.min(innerWidth < 700 ? 34 : 78, Math.round(innerWidth / 18));
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    cv.width = Math.round(W*dpr); cv.height = Math.round(H*dpr);
    cv.style.width=W+"px"; cv.style.height=H+"px";
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  function init() {
    resize();
    nodes = Array.from({length:N()}, () => ({
      x:Math.random()*W, y:Math.random()*H,
      vx:(Math.random()-.5)*.35, vy:(Math.random()-.5)*.35,
      r:Math.random()*1.8+1, phase:Math.random()*Math.PI*2
    }));
  }
  function draw(move) {
    ctx.clearRect(0,0,W,H);
    const maxD = 150;
    for (const n of nodes) {
      if (move) {
        n.x+=n.vx; n.y+=n.vy; n.phase+=0.01;
        const dx=n.x-mx, dy=n.y-my, dist=Math.hypot(dx,dy);
        if (dist < 140 && dist > 0) { n.x += dx/dist*1.2; n.y += dy/dist*1.2; }
        if (n.x<-20) n.x=W+20; if (n.x>W+20) n.x=-20;
        if (n.y<-20) n.y=H+20; if (n.y>H+20) n.y=-20;
      }
    }
    // edges
    for (let i=0;i<nodes.length;i++) {
      for (let j=i+1;j<nodes.length;j++) {
        const a=nodes[i], b=nodes[j];
        const dx=a.x-b.x, dy=a.y-b.y, d=Math.hypot(dx,dy);
        if (d < maxD) {
          const alpha = (1-d/maxD)*0.18;
          ctx.strokeStyle = `rgba(36,54,91,${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
          if (move && Math.random() < 0.0007) pulses.push({a,b,t:0,speed:0.008+Math.random()*0.008});
        }
      }
    }
    // pulses
    for (let i=pulses.length-1;i>=0;i--) {
      const p=pulses[i]; p.t += p.speed;
      if (p.t >= 1) { pulses.splice(i,1); continue; }
      const x = p.a.x + (p.b.x-p.a.x)*p.t;
      const y = p.a.y + (p.b.y-p.a.y)*p.t;
      const g = ctx.createRadialGradient(x,y,0,x,y,8);
      g.addColorStop(0,"rgba(185,138,47,.95)");
      g.addColorStop(1,"rgba(185,138,47,0)");
      ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,8,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="rgba(255,255,255,.9)"; ctx.beginPath(); ctx.arc(x,y,1.8,0,Math.PI*2); ctx.fill();
    }
    // nodes
    for (const n of nodes) {
      const glow = 0.5 + Math.sin(n.phase)*0.2;
      ctx.fillStyle = `rgba(185,138,47,${0.22*glow})`;
      ctx.beginPath(); ctx.arc(n.x,n.y,n.r*3.2,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = `rgba(200,240,255,${0.75+glow*0.2})`;
      ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2); ctx.fill();
    }
  }
  function loop(){ draw(true); raf=requestAnimationFrame(loop); }
  function start(){ if(REDUCED){ draw(false); return; } if(!raf) loop(); }
  function stop(){ if(raf){ cancelAnimationFrame(raf); raf=null; } }
  init();
  if (REDUCED || matchMedia("(hover:none)").matches) draw(false); else start();
  addEventListener("resize", () => { init(); if (REDUCED) draw(false); }, {passive:true});
  document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
  if (!REDUCED) addEventListener("mousemove", e => { mx=e.clientX; my=e.clientY; }, {passive:true});
})();

/* ---------- cursor + magnetic ---------- */
(() => {
  if (!FINE || REDUCED) { document.body.classList.add("no-cursor"); return; }
  const dot=$(".cursor-dot"), ring=$(".cursor-ring"); let rx=0,ry=0,tx=0,ty=0;
  addEventListener("mousemove", e => { tx=e.clientX; ty=e.clientY; dot.style.left=tx+"px"; dot.style.top=ty+"px"; }, {passive:true});
  (function follow(){ rx+=(tx-rx)*.16; ry+=(ty-ry)*.16; ring.style.left=rx+"px"; ring.style.top=ry+"px"; requestAnimationFrame(follow); })();
  const bindHover = (root=document) => {
    $$("a,button,.project,.repo-card,input,textarea", root).forEach(el => {
      if (el._hoverBound) return; el._hoverBound = true;
      el.addEventListener("mouseenter", () => ring.classList.add("grow"));
      el.addEventListener("mouseleave", () => ring.classList.remove("grow"));
    });
    $$(".magnetic", root).forEach(el => {
      if (el._magBound) return; el._magBound = true;
      el.addEventListener("mousemove", e => {
        const r=el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX-r.left-r.width/2)*.22}px,${(e.clientY-r.top-r.height/2)*.22}px)`;
      });
      el.addEventListener("mouseleave", () => el.style.transform="");
    });
  };
  bindHover();
  window.__bindHover = bindHover;
})();

/* ---------- typewriter ---------- */
(() => {
  const el = $("#rotator");
  let ri=0, ci=CONFIG.rotatingRoles[0].length, del=true;
  function tick() {
    const word = CONFIG.rotatingRoles[ri];
    el.textContent = word.slice(0, Math.max(ci, 0)) || "\u200b";
    let delay = del ? 42 : 72;
    if (del) {
      ci--; if (ci <= 0) { del=false; ri=(ri+1)%CONFIG.rotatingRoles.length; ci=0; delay=320; }
    } else {
      ci++; if (ci >= CONFIG.rotatingRoles[ri].length) { del=true; delay=1500; }
    }
    setTimeout(tick, REDUCED ? 700 : delay);
  }
  tick();
})();

/* ---------- render ---------- */
const esc = s => String(s==null?"":s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function visualHTML(v, label) {
  if (!v) return `<div class="p-visual code tone-violet"><span class="p-tag">${esc(label)}</span><pre class="code-in">loading…</pre></div>`;
  const tag = `<span class="p-tag">${esc(label)}</span>`;
  if (v.kind === "photo") return `<div class="p-visual photo">${tag}<img src="${esc(v.src)}" alt="${esc(v.alt||"")}" loading="lazy" decoding="async"><i class="p-veil"></i></div>`;
  if (v.kind === "figure") return `<div class="p-visual figure">${tag}<img src="${esc(v.src)}" alt="${esc(v.alt||"")}" loading="lazy" decoding="async"></div>`;
  if (v.kind === "svg") return `<div class="p-visual vec">${tag}<img src="${esc(v.src)}" alt="${esc(v.alt||"")}" loading="lazy" decoding="async"></div>`;
  if (v.kind === "code") {
    const lines = (v.lines||[]).map(l => l ? esc(l) : "&nbsp;").join("\n");
    return `<div class="p-visual code tone-${esc(v.tone||"violet")}">${tag}<pre class="code-in">${lines}</pre>${v.caption?`<span class="code-cap">${esc(v.caption)}</span>`:""}</div>`;
  }
  return "";
}

function renderProjects() {
  $("#projects").innerHTML = CONFIG.projects.map(p => `
    <a class="project" href="${esc(p.link)}" target="_blank" rel="noopener" data-cat="${esc(p.cat)}" data-repo="${esc(p.repo||"")}">
      ${visualHTML(p.visual, p.label||p.cat)}
      <div class="p-body">
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.desc)}</p>
        <div class="p-meta">
          <div class="card-tags">${p.tags.map(t=>`<span>${esc(t)}</span>`).join("")}</div>
          <span class="p-year">${esc(p.year)} ↗</span>
        </div>
      </div>
    </a>`).join("");
}

$("#marquee").innerHTML = [...CONFIG.marquee, ...CONFIG.marquee].map(t => `<span>${esc(t)} <em>✦</em></span>`).join("");
renderProjects();
$("#skills").innerHTML = CONFIG.skills.map(([n,v]) => `
  <div class="skill"><div><span>${esc(n)}</span><span>${v}%</span></div><div class="bar"><i data-w="${v}"></i></div></div>`).join("");
$("#chips").innerHTML = CONFIG.chips.map(c => `<span>${esc(c)}</span>`).join("");
const timelineEl = $("#timeline");
if (timelineEl) timelineEl.innerHTML = CONFIG.journey.map(([t,h,d]) => `
  <div class="t-item reveal"><time>${esc(t)}</time><h3>${esc(h)}</h3><p>${esc(d)}</p></div>`).join("");
$("#socials").innerHTML = CONFIG.socials.map(([t,u,icon]) => {
  const ICONS = {
    whatsapp: '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" style="vertical-align:-2px"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>'
  };
  return `<a href="${esc(u)}" target="_blank" rel="noopener" class="magnetic social-link">${ICONS[icon] || ""}${esc(t)}</a>`;
}).join("");

/* filters */
$$(".filters button").forEach(b => b.addEventListener("click", () => {
  $$(".filters button").forEach(x => x.classList.remove("active"));
  b.classList.add("active");
  $$(".project").forEach(p => p.classList.toggle("hide", b.dataset.f !== "all" && p.dataset.cat !== b.dataset.f));
}));

/* principles */
(() => {
  let i=0, timer=null;
  function show(n) {
    i=n; const [q, who] = CONFIG.principles[i];
    $("#testi-quote").textContent = q;
    $("#testi-person").textContent = who;
    $("#testi-dots").innerHTML = CONFIG.principles.map((_,j)=>`<button class="${j===i?'active':''}" data-i="${j}" aria-label="Principle ${j+1}"></button>`).join("");
    $$("#testi-dots button").forEach(d => d.addEventListener("click", () => { show(+d.dataset.i); restart(); }));
  }
  function restart(){ clearInterval(timer); timer=setInterval(()=>show((i+1)%CONFIG.principles.length), 5200); }
  show(0); if (!REDUCED) restart();
})();

/* ---------- reveal / counters / bars / scroll ---------- */
(() => {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      e.target.querySelectorAll(".count").forEach(c => {
        const to = +c.dataset.to || 0; let n=0;
        const step = Math.max(1, Math.ceil(to/40));
        const iv = setInterval(()=>{ n += step; if(n>=to){n=to; clearInterval(iv);} c.textContent=n; }, 28);
      });
      e.target.querySelectorAll(".bar i").forEach(b => b.style.width = b.dataset.w + "%");
      io.unobserve(e.target);
    });
  }, {threshold:.18});
  $$(".reveal").forEach(el => io.observe(el));
  window.__revealObserve = el => io.observe(el);
  /* catch everything JavaScript renders later (tracks, notes, cards, log…) */
  const mo = new MutationObserver(muts => {
    muts.forEach(m => m.addedNodes.forEach(node => {
      if (node.nodeType !== 1) return;
      if (node.classList && node.classList.contains("reveal")) io.observe(node);
      node.querySelectorAll && node.querySelectorAll(".reveal").forEach(el => io.observe(el));
    }));
  });
  mo.observe(document.body, {childList:true, subtree:true});
  /* failsafe: reveal anything in view, repeatedly — never depend on IO alone
     (works in background tabs and for late-rendered content) */
  const revealInView = () => {
    $$(".reveal:not(.in)").forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight * 1.1 && r.bottom > -20) el.classList.add("in");
    });
  };
  let failsafeRuns = 0;
  const failsafe = setInterval(() => {
    revealInView();
    if (++failsafeRuns > 30) clearInterval(failsafe);
  }, 500);
  addEventListener("scroll", revealInView, {passive:true});
})();

addEventListener("scroll", () => {
  const h=document.documentElement;
  const p = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
  $(".scroll-progress").style.width = p + "%";
  // active nav
  let current=""; $$("#top section[id], section[id]").forEach(s => { if (scrollY >= s.offsetTop - 140) current=s.id; });
  $$(".links a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#"+current));
}, {passive:true});

/* ---------- tilt + spotlight ---------- */
function spotlight(el) {
  el.addEventListener("mousemove", e => {
    const r=el.getBoundingClientRect();
    el.style.setProperty("--mx", ((e.clientX-r.left)/r.width*100)+"%");
    el.style.setProperty("--my", ((e.clientY-r.top)/r.height*100)+"%");
  });
}
$$(".bento-card, .hero-card, .sampler").forEach(spotlight);
(() => {
  const card=$("#tilt-card");
  if (!card || !FINE || REDUCED) return;
  card.addEventListener("mousemove", e => {
    const r=card.getBoundingClientRect();
    const rx=(5-(e.clientY-r.top)/r.height*10).toFixed(2);
    const ry=((e.clientX-r.left)/r.width*10-5).toFixed(2);
    card.style.transform=`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener("mouseleave", ()=>card.style.transform="");
})();

/* ---------- theme / menu / top ---------- */
function toggleTheme() {
  const ORDER = ["precision", "stone", "parchment", "espresso"];
  const cur = document.documentElement.dataset.theme || "precision";
  const next = ORDER[(ORDER.indexOf(cur) + 1) % ORDER.length] || "precision";
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch(_){}
}
(() => { try { const t=localStorage.getItem("theme"); if(t) document.documentElement.dataset.theme = ["precision","stone","parchment","espresso","payne","verdigris","prado","navy"].includes(t) ? (t==="navy" ? "precision" : t) : "precision"; } catch(_){} })();
$("#theme-btn").addEventListener("click", toggleTheme);
$("#burger").addEventListener("click", () => {
  const open = $("#mobile-menu").classList.toggle("open");
  $("#burger").setAttribute("aria-expanded", open ? "true":"false");
});
$$("#mobile-menu a").forEach(a => a.addEventListener("click", () => { $("#mobile-menu").classList.remove("open"); $("#burger").setAttribute("aria-expanded","false"); }));
$("#to-top").addEventListener("click", () => scrollTo({top:0, behavior:REDUCED?"auto":"smooth"}));

/* ---------- contact ---------- */
$("#copy-email").addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(CONFIG.email); toast("Email copied — " + CONFIG.email); }
  catch { toast(CONFIG.email); }
});
$("#contact-form").addEventListener("submit", e => {
  e.preventDefault();
  const d = new FormData(e.target), msg=$(".form-msg");
  if (!d.get("name") || !String(d.get("email")).includes("@") || !d.get("msg")) {
    msg.style.color="#6B1C2A"; msg.textContent="Please fill in name, a valid email, and your message."; return;
  }
  const body = `Name: ${d.get("name")}\nEmail: ${d.get("email")}\n\n${d.get("msg")}`;
  location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(d.get("subject")||"Hello from your portfolio")}&body=${encodeURIComponent(body)}`;
  msg.style.color="var(--ok)"; msg.textContent="Opening your mail app — or write to " + CONFIG.email;
  e.target.reset();
});

/* ---------- command palette ---------- */
(() => {
  const palette = $("#palette");
  const input = $("#palette-input");
  const list = $("#palette-list");
  const actions = [
    {label:"Go to Abstract", meta:"section", run:()=>go("#abstract")},
    {label:"Go to Work", meta:"section", run:()=>go("#work")},
    {label:"Go to Self-Indexing Lab", meta:"section", run:()=>go("#lab")},
    {label:"Go to Latent Space", meta:"section", run:()=>go("#embedding")},
    {label:"Go to Methods", meta:"section", run:()=>go("#methods")},
    {label:"Go to Live Data", meta:"section", run:()=>go("#live")},
    {label:"Go to Contact", meta:"section", run:()=>go("#contact")},
    {label:"Open GitHub profile", meta:"link", run:()=>window.open(CONFIG.github,"_blank")},
    {label:"Open Deep-ML tracker", meta:"link", run:()=>window.open("https://iam-dev-Adarsh.github.io/deep-ml/","_blank")},
    {label:"Copy email address", meta:"action", run:()=>{$("#copy-email").click();}},
    {label:"Chat on WhatsApp", meta:"link", run:()=>window.open("https://wa.me/919439440544","_blank")},
    {label:"Toggle theme", meta:"action", run:()=>toggleTheme()},
    {label:"Back to top", meta:"section", run:()=>scrollTo({top:0,behavior:REDUCED?"auto":"smooth"})},
  ];
  let filtered = actions.slice(), active = 0;
  function go(hash){ close(); const el=$(hash); if(el) el.scrollIntoView({behavior:REDUCED?"auto":"smooth"}); }
  function render(){
    list.innerHTML = filtered.map((a,i)=>`<li class="${i===active?'active':''}" data-i="${i}">${esc(a.label)} <span>${esc(a.meta)}</span></li>`).join("");
    $$("#palette-list li").forEach(li => li.addEventListener("click", ()=>{ filtered[+li.dataset.i].run(); }));
  }
  function open(){
    palette.classList.add("open"); palette.setAttribute("aria-hidden","false");
    input.value=""; filtered=actions.slice(); active=0; render();
    setTimeout(()=>input.focus(), 30);
  }
  function close(){ palette.classList.remove("open"); palette.setAttribute("aria-hidden","true"); }
  input.addEventListener("input", () => {
    const q=input.value.toLowerCase().trim();
    filtered = actions.filter(a => a.label.toLowerCase().includes(q));
    active=0; render();
  });
  input.addEventListener("keydown", e => {
    if(e.key==="ArrowDown"){ e.preventDefault(); active=Math.min(active+1, filtered.length-1); render(); }
    if(e.key==="ArrowUp"){ e.preventDefault(); active=Math.max(active-1,0); render(); }
    if(e.key==="Enter"){ e.preventDefault(); if(filtered[active]) filtered[active].run(); }
    if(e.key==="Escape"){ close(); }
  });
  palette.addEventListener("click", e => { if(e.target===palette) close(); });
  $("#palette-btn").addEventListener("click", open);
  addEventListener("keydown", e => {
    if ((e.metaKey||e.ctrlKey) && e.key.toLowerCase()==="k") { e.preventDefault(); palette.classList.contains("open")?close():open(); }
    if (e.key==="Escape" && palette.classList.contains("open")) close();
    if (e.target.matches("input,textarea")) return;
    if (e.key.toLowerCase()==="t") toggleTheme();
    if (e.key.toLowerCase()==="g") window.open(CONFIG.github,"_blank");
  });
})();

/* ---------- embedding map ---------- */
(() => {
  const svg = $("#embed-svg"); if(!svg) return;
  const W=900,H=460, pad=40;
  const clusters = {
    foundations:{color:"#24365B", label:"Foundations"},
    dl:{color:"#B98A2F", label:"Deep Learning"},
    applied:{color:"#6B1C2A", label:"Applied AI"},
    engineering:{color:"#2E7D5B", label:"Engineering"},
    next:{color:"#8C857E", label:"Learning next"}
  };
  const pts = [
    ["Linear Algebra",170,170,"foundations",1],["Calculus",215,225,"foundations",.95],["Statistics",260,160,"foundations",.9],
    ["NumPy",320,210,"foundations",1],["Gradient Descent",360,260,"foundations",.95],
    ["Neural Nets",470,210,"dl",.95],["Backprop",430,160,"dl",.9],["TensorFlow",520,165,"dl",.85],
    ["Keras",555,210,"dl",.85],["LSTM / RNN",500,270,"dl",.8],["CNN",590,250,"dl",.82],
    ["Transformers",640,170,"next",.45],["RAG / Agents",700,230,"next",.35],["PyTorch",610,130,"next",.5],
    ["Computer Vision",640,310,"applied",.75],["NLP",560,330,"applied",.72],["Reinforcement",430,330,"applied",.7],
    ["scikit-learn",330,300,"applied",.8],
    ["Python",250,340,"engineering",1],["Git/GitHub",170,300,"engineering",.9],["SQL",220,380,"engineering",.55],
    ["Evaluation",500,360,"engineering",.7],["Jupyter",360,360,"engineering",.85]
  ];
  // background grid
  let out = `<defs>
    <radialGradient id="eg1" cx="25%" cy="35%"><stop offset="0%" stop-color="rgba(36,54,91,.18)"/><stop offset="100%" stop-color="rgba(36,54,91,0)"/></radialGradient>
    <radialGradient id="eg2" cx="58%" cy="45%"><stop offset="0%" stop-color="rgba(185,138,47,.14)"/><stop offset="100%" stop-color="rgba(185,138,47,0)"/></radialGradient>
    <radialGradient id="eg3" cx="75%" cy="42%"><stop offset="0%" stop-color="rgba(140,133,126,.12)"/><stop offset="100%" stop-color="rgba(140,133,126,0)"/></radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="transparent"/>
  <circle cx="250" cy="210" r="170" fill="url(#eg1)"/>
  <circle cx="530" cy="230" r="170" fill="url(#eg2)"/>
  <circle cx="680" cy="210" r="130" fill="url(#eg3)"/>`;
  // subtle grid
  for(let x=pad;x<W;x+=60) out+=`<line x1="${x}" y1="20" x2="${x}" y2="${H-20}" stroke="rgba(10,21,38,.05)"/>`;
  for(let y=20;y<H;y+=60) out+=`<line x1="${pad}" y1="${y}" x2="${W-pad}" y2="${y}" stroke="rgba(10,21,38,.05)"/>`;
  // edges to nearest in same cluster
  for(let i=0;i<pts.length;i++){
    for(let j=i+1;j<pts.length;j++){
      const a=pts[i],b=pts[j]; const d=Math.hypot(a[1]-b[1],a[2]-b[2]);
      if((a[3]===b[3] && d<140) || d<80){
        out+=`<line x1="${a[1]}" y1="${a[2]}" x2="${b[1]}" y2="${b[2]}" stroke="${clusters[a[3]].color}" stroke-opacity="${a[3]===b[3]?0.18:0.08}" stroke-width="1"/>`;
      }
    }
  }
  // points
  for(const [label,x,y,c,conf] of pts){
    const col=clusters[c].color; const r=4+conf*4;
    out+=`<g class="emb-pt">
      <circle cx="${x}" cy="${y}" r="${r+8}" fill="${col}" fill-opacity="0.08"/>
      <circle cx="${x}" cy="${y}" r="${r}" fill="${col}" fill-opacity="${0.35+conf*0.55}" stroke="${col}" stroke-opacity=".7"/>
      <text x="${x+10}" y="${y+4}" fill="rgba(20,30,50,.82)" font-size="11" font-family="JetBrains Mono, monospace">${esc(label)}</text>
    </g>`;
  }
  out+=`<text x="${W-24}" y="${H-18}" text-anchor="end" fill="rgba(110,103,94,.55)" font-size="10" font-family="JetBrains Mono, monospace">latent dim 1 →</text>
  <text x="18" y="34" fill="rgba(110,103,94,.55)" font-size="10" font-family="JetBrains Mono, monospace" transform="rotate(-90 18 34)">latent dim 2 →</text>`;
  svg.innerHTML = out;
  $("#embed-legend").innerHTML = Object.values(clusters).map(c=>`<span><i style="background:${c.color}"></i>${c.label}</span>`).join("");
})();

/* ---------- loss curve ---------- */
(() => {
  const svg = $("#loss-svg"); if(!svg) return;
  const W=900,H=260, L=55,R=20,T=20,B=40;
  const pts = []; let v=2.4;
  for(let i=0;i<=120;i++){
    v = v*0.965 + (Math.random()-0.5)*0.035 + 0.004;
    const floor = 0.18 + Math.pow(i/120,0.7)*0.02;
    v = Math.max(floor, v);
    pts.push([i,v]);
  }
  // normalize y
  const ys=pts.map(p=>p[1]), minY=Math.min(...ys)*0.95, maxY=Math.max(...ys)*1.05;
  const X=i=>L + i/120*(W-L-R);
  const Y=v=>T + (1-(v-minY)/(maxY-minY))*(H-T-B);
  const path = pts.map((p,i)=>`${i?"L":"M"}${X(p[0]).toFixed(1)} ${Y(p[1]).toFixed(1)}`).join(" ");
  const area = path + ` L${X(120).toFixed(1)} ${Y(minY).toFixed(1)} L${X(0).toFixed(1)} ${Y(minY).toFixed(1)} Z`;
  let g=`<defs>
    <linearGradient id="lg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#24365B"/><stop offset="100%" stop-color="#B98A2F"/></linearGradient>
    <linearGradient id="la" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="rgba(36,54,91,.28)"/><stop offset="100%" stop-color="rgba(36,54,91,0)"/></linearGradient>
  </defs>`;
  // grid
  for(let i=0;i<=4;i++){ const y=T + i/4*(H-T-B); g+=`<line x1="${L}" y1="${y}" x2="${W-R}" y2="${y}" stroke="rgba(10,21,38,.06)"/>`; }
  g+=`<path d="${area}" fill="url(#la)"/>`;
  g+=`<path d="${path}" fill="none" stroke="url(#lg)" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>`;
  // axes labels
  g+=`<text x="${L}" y="${H-10}" fill="rgba(110,103,94,.6)" font-size="10" font-family="JetBrains Mono, monospace">epoch 0</text>`;
  g+=`<text x="${W-R}" y="${H-10}" text-anchor="end" fill="rgba(110,103,94,.6)" font-size="10" font-family="JetBrains Mono, monospace">epoch 120</text>`;
  g+=`<text x="14" y="${T+10}" fill="rgba(110,103,94,.6)" font-size="10" font-family="JetBrains Mono, monospace">loss</text>`;
  // annotations
  const a1=pts[20], a2=pts[85];
  g+=`<circle cx="${X(a1[0])}" cy="${Y(a1[1])}" r="4" fill="#24365B"/><text x="${X(a1[0])+8}" y="${Y(a1[1])-8}" fill="rgba(20,30,50,.7)" font-size="10" font-family="JetBrains Mono, monospace">steep descent</text>`;
  g+=`<circle cx="${X(a2[0])}" cy="${Y(a2[1])}" r="4" fill="#B98A2F"/><text x="${X(a2[0])-8}" y="${Y(a2[1])-12}" text-anchor="end" fill="rgba(20,30,50,.7)" font-size="10" font-family="JetBrains Mono, monospace">still learning</text>`;
  svg.innerHTML = g;
})();

/* ---------- token sampler ---------- */
(() => {
  const out=$("#sm-out"), bars=$("#sm-bars");
  if(!out||!bars) return;
  const samples = [
    {token:"AI/ML engineer", probs:[["AI/ML engineer",42],["first-principles learner",27],["Python developer",14],["researcher",9],["student",8]]},
    {token:"problem solver", probs:[["problem solver",36],["model builder",24],["math nerd",18],["debugger",12],["engineer",10]]},
    {token:"builder from scratch", probs:[["builder from scratch",39],["deep learner",23],["systems thinker",17],["researcher",12],["optimizer",9]]},
  ];
  let si=0;
  function render(){
    const s=samples[si];
    out.textContent=s.token;
    bars.innerHTML=s.probs.map(([tok,p],i)=>`
      <div class="sm-bar"><span class="tok">${esc(tok)}</span><div class="trk"><div class="fill" style="width:${i===0?p:0}%;opacity:${1-i*0.15}"></div></div><span class="pct">${p}%</span></div>
    `).join("");
    requestAnimationFrame(()=> $$(".sm-bar .fill").forEach((f,i)=>{ f.style.width = s.probs[i][1]+"%"; }));
    si=(si+1)%samples.length;
  }
  render();
  if(!REDUCED) setInterval(render, 2800);
})();

/* ---------- final init ---------- */
if (window.__bindHover) window.__bindHover();
document.addEventListener("DOMContentLoaded", () => { if (window.__bindHover) window.__bindHover(); });
