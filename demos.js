/* ═══════════════════════════════════════════════════════════════
   DEMOS — three interactive models running 100% in-browser:
   A. Neural network playground (2→8→1 MLP trained with JS GD)
   B. Next-token bigram model (trained live on a bundled corpus)
   C. Algorithm explorer (GD / kNN / k-means / SVM animated)
   ═══════════════════════════════════════════════════════════════ */
(() => {
  const $ = s => document.querySelector(s);
  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ─────────── DEMO A: MLP PLAYGROUND ─────────── */
  (() => {
    const cv = $("#nn-demo"); if (!cv) return;
    const ctx = cv.getContext("2d");
    const W = cv.width, H = cv.height;
    const NH = 8;
    let W1, b1, W2, b2, epoch = 0, loss = 1, training = false, dataset = "spiral", points = [];

    const rand = () => (Math.random() * 2 - 1);
    const initWeights = () => {
      W1 = Array.from({length: NH}, () => [rand(), rand()]);
      b1 = new Array(NH).fill(0);
      W2 = Array.from({length: NH}, () => rand());
      b2 = 0;
      epoch = 0; loss = 1;
    };
    const forward = (x, y) => {
      const h = W1.map((w, i) => Math.tanh(w[0] * x + w[1] * y + b1[i]));
      let z = b2; for (let i = 0; i < NH; i++) z += W2[i] * h[i];
      return {h, y: 1 / (1 + Math.exp(-z))}; // sigmoid output
    };
    const buildDataset = () => {
      points = [];
      const n = 60;
      if (dataset === "spiral") {
        for (let i = 0; i < n; i++) {
          const t = i / n * 3.1, r = i / n;
          points.push({x: Math.cos(t) * r * .8, y: Math.sin(t) * r * .8, c: 1});
          points.push({x: -Math.cos(t) * r * .8, y: -Math.sin(t) * r * .8, c: 0});
        }
      } else if (dataset === "circle") {
        for (let i = 0; i < n; i++) {
          const a = Math.random() * Math.PI * 2, r = Math.random();
          points.push({x: Math.cos(a) * r * .85, y: Math.sin(a) * r * .85, c: r < .55 ? 1 : 0});
        }
      } else {
        for (let i = 0; i < n / 2; i++) {
          points.push({x: rand() * .7 - .55, y: rand() * .7 - .55, c: 0});
          points.push({x: rand() * .7 + .55, y: rand() * .7 + .55, c: 1});
          points.push({x: rand() * .7 - .55, y: rand() * .7 + .55, c: 0});
          points.push({x: rand() * .7 + .55, y: rand() * .7 - .55, c: 1});
        }
      }
    };
    const trainStep = () => {
      // full-batch gradient descent (BCE loss)
      const lr = 0.35;
      const gW1 = W1.map(() => [0, 0]), gb1 = new Array(NH).fill(0);
      const gW2 = new Array(NH).fill(0); let gb2 = 0, L = 0;
      for (const p of points) {
        const {h, y} = forward(p.x, p.y);
        const d = y - p.c;
        L += -(p.c * Math.log(y + 1e-8) + (1 - p.c) * Math.log(1 - y + 1e-8));
        for (let i = 0; i < NH; i++) {
          gW2[i] += d * h[i];
          const dh = d * W2[i] * (1 - h[i] * h[i]);
          gW1[i][0] += dh * p.x; gW1[i][1] += dh * p.y; gb1[i] += dh;
        }
        gb2 += d;
      }
      const m = points.length;
      for (let i = 0; i < NH; i++) {
        W2[i] -= lr * gW2[i] / m;
        W1[i][0] -= lr * gW1[i][0] / m; W1[i][1] -= lr * gW1[i][1] / m; b1[i] -= lr * gb1[i] / m;
      }
      b2 -= lr * gb2 / m;
      loss = L / m; epoch++;
    };
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      // decision boundary (coarse grid)
      const step = 10;
      for (let px = 0; px < W; px += step) {
        for (let py = 0; py < H; py += step) {
          const x = px / W * 2.4 - 1.2, y = 1.2 - py / H * 2.4;
          const v = forward(x, y).y;
          const c = v > 0.5 ? `rgba(185,138,47,${(v - .5) * .5})` : `rgba(36,54,91,${(.5 - v) * .5})`;
          ctx.fillStyle = c; ctx.fillRect(px, py, step, step);
        }
      }
      // points
      for (const p of points) {
        const px = (p.x + 1.2) / 2.4 * W, py = (1.2 - p.y) / 2.4 * H;
        ctx.beginPath(); ctx.arc(px, py, 5, 0, 7);
        ctx.fillStyle = p.c ? "#24365B" : "#B98A2F";
        ctx.strokeStyle = p.c ? "#24365B" : "#B98A2F";
        ctx.lineWidth = 2; ctx.stroke(); ctx.fill();
      }
    };
    const tick = () => {
      if (training) {
        for (let i = 0; i < 5; i++) trainStep();
        $("#nn-epoch").textContent = epoch;
        $("#nn-loss").textContent = loss.toFixed(4);
        $("#nn-status").textContent = epoch > 900 ? "converged" : "training";
      }
      draw();
      requestAnimationFrame(tick);
    };
    $("#nn-train").addEventListener("click", () => { training = !training; $("#nn-train").textContent = training ? "⏸ Pause" : "▶ Train"; });
    $("#nn-reset").addEventListener("click", () => { initWeights(); buildDataset(); training = false; $("#nn-train").textContent = "▶ Train"; $("#nn-status").textContent = "reset"; $("#nn-epoch").textContent = "0"; $("#nn-loss").textContent = "—"; });
    $("#nn-dataset").addEventListener("click", () => { dataset = dataset === "spiral" ? "circle" : dataset === "circle" ? "xor" : "spiral"; initWeights(); buildDataset(); });
    cv.addEventListener("click", e => {
      const r = cv.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width * 2.4 - 1.2, y = 1.2 - (e.clientY - r.top) / r.height * 2.4;
      points.push({x, y, c: (x > 0) !== (y > 0) ? 1 : 0});
    });
    initWeights(); buildDataset();
    if (REDUCED) draw(); else tick();
  })();

  /* ─────────── DEMO B: BIGRAM TOKEN MODEL ─────────── */
  (() => {
    const input = $("#tok-input"), out = $("#tok-out"), bars = $("#tok-bars");
    if (!input) return;
    const CORPUS = "I dare to remove im from impossible to be or not to be that is the question whether tis nobler in the mind to suffer the slings and arrows of outrageous fortune or to take arms against a sea of troubles and by opposing end them to die to sleep no more and by a sleep to say we end the heartache and the thousand natural shocks that flesh is heir to";
    const toks = CORPUS.split(/\s+/).map(w => w.toLowerCase().replace(/[^a-z']/g, "")).filter(Boolean);
    const model = {};
    for (let i = 0; i < toks.length - 1; i++) {
      const w = toks[i], n = toks[i + 1];
      (model[w] = model[w] || {});
      model[w][n] = (model[w][n] || 0) + 1;
    }
    const predict = ctxWord => {
      const w = ctxWord.toLowerCase().replace(/[^a-z']/g, "");
      const dist = model[w];
      if (!dist) return [];
      const total = Object.values(dist).reduce((a, b) => a + b, 0);
      return Object.entries(dist).map(([t, c]) => [t, c / total]).sort((a, b) => b[1] - a[1]).slice(0, 6);
    };
    const render = () => {
      const words = input.value.trim().split(/\s+/).filter(Boolean);
      const last = words[words.length - 1] || "";
      const preds = predict(last);
      out.textContent = words.join(" ");
      if (!preds.length) {
        bars.innerHTML = `<div class="sm-bar"><span class="tok">no context — try "to", "the", "is"</span><div class="trk"></div><span class="pct">—</span></div>`;
        return;
      }
      bars.innerHTML = preds.map(([t, p], i) => `
        <div class="sm-bar"><span class="tok">${t}</span><div class="trk"><div class="fill" style="width:${(p * 100).toFixed(1)}%;opacity:${1 - i * 0.13}"></div></div><span class="pct">${(p * 100).toFixed(1)}%</span></div>`).join("");
    };
    input.addEventListener("input", render);
    render();
  })();

  /* ─────────── DEMO C: ALGORITHM EXPLORER ─────────── */
  (() => {
    const cv = $("#explorer-canvas"); if (!cv) return;
    const ctx = cv.getContext("2d");
    const W = cv.width, H = cv.height;
    const tabsEl = $("#explorer-tabs"), titleEl = $("#explorer-title"), descEl = $("#explorer-desc"), codeEl = $("#explorer-code");
    const range = $("#explorer-range"), valEl = $("#explorer-val"), labelEl = $("#explorer-label");
    let t = 0, current = 0;

    const ALGOS = [
      {
        name: "Gradient Descent",
        label: "learning rate", def: 45, fmt: v => (v / 100).toFixed(2),
        desc: "A parameter rolls downhill along the loss surface. Too fast and it overshoots; too slow and it never arrives. Same rule I derived by hand in The First Principle.",
        code: "for step in range(steps):\n    grad = dL_dtheta(theta)\n    theta = theta - lr * grad  # ← the whole idea",
        draw(param) {
          // loss curve f(x)=x²·sin(2x)+x²
          const f = x => (x * x) * Math.sin(2 * x) * 0.6 + x * x;
          ctx.beginPath();
          for (let px = 0; px <= W; px++) {
            const x = px / W * 6 - 3;
            const y = H * 0.72 - f(x) * 26;
            px ? ctx.lineTo(px, y) : ctx.moveTo(px, y);
          }
          ctx.strokeStyle = "rgba(185,138,47,.55)"; ctx.lineWidth = 2; ctx.stroke();
          // ball
          const lr = param / 100;
          let x = -2.4 + Math.sin(t * 0.02) * 0.001;
          for (let i = 0; i < 30 + (t % 200); i++) {
            const h = 0.01, g = (f(x + h) - f(x - h)) / (2 * h);
            x -= lr * 0.55 * g;
            x = Math.max(-3, Math.min(3, x));
          }
          const y = H * 0.72 - f(x) * 26;
          ctx.beginPath(); ctx.arc(x / 3 * W / 2 + W / 2, y, 11, 0, 7);
          ctx.fillStyle = "#24365B"; ctx.fill();
          ctx.beginPath(); ctx.arc(x / 3 * W / 2 + W / 2, y, 18, 0, 7);
          ctx.fillStyle = "rgba(36,54,91,.18)"; ctx.fill();
        }
      },
      {
        name: "k-Nearest Neighbors",
        label: "k", def: 30, fmt: v => String(Math.max(1, Math.round(v / 10))),
        desc: "No training at all — the model *is* the data. Classify by majority vote of the k nearest points. Shown live on a moving query point.",
        code: "dists = np.sqrt(((X - x0) ** 2).sum(axis=1))\nneigh = np.argsort(dists)[:k]\nlabel = mode(y[neigh])",
        draw(param) {
          const k = Math.max(1, Math.round(param / 10));
          const pts = [];
          for (let i = 0; i < 70; i++) {
            const a = (i * 2.399) % (Math.PI * 2), r = 60 + (i * 37) % 160;
            pts.push({x: W / 2 + Math.cos(a) * r * 1.25, y: H / 2 + Math.sin(a) * r, c: r > 135 ? 1 : 0});
          }
          const qx = W / 2 + Math.cos(t * 0.012) * 175, qy = H / 2 + Math.sin(t * 0.018) * 130;
          const sorted = pts.map(p => ({...p, d: Math.hypot(p.x - qx, p.y - qy)})).sort((a, b) => a.d - b.d);
          const near = sorted.slice(0, k);
          const votes = near.reduce((s, p) => s + p.c, 0);
          const qClass = votes > near.length / 2 ? 1 : 0;
          for (const p of pts) {
            ctx.beginPath(); ctx.arc(p.x, p.y, 5.5, 0, 7);
            ctx.fillStyle = p.c ? "rgba(185,138,47,.9)" : "rgba(36,54,91,.9)"; ctx.fill();
          }
          const maxD = near.length ? near[near.length - 1].d : 150;
          ctx.beginPath(); ctx.arc(qx, qy, maxD, 0, 7);
          ctx.strokeStyle = "rgba(255,255,255,.35)"; ctx.setLineDash([5, 5]); ctx.lineWidth = 1.5; ctx.stroke(); ctx.setLineDash([]);
          ctx.beginPath(); ctx.arc(qx, qy, 10, 0, 7);
          ctx.fillStyle = qClass ? "#B98A2F" : "#24365B"; ctx.fill();
          ctx.fillStyle = "#fff"; ctx.font = "13px monospace";
          ctx.fillText(`k=${k}  → class ${qClass ? "A" : "B"}  (${votes}/${near.length})`, 18, H - 18);
        }
      },
      {
        name: "k-Means Clustering",
        label: "clusters", def: 30, fmt: v => String(Math.max(2, Math.round(v / 20))),
        desc: "Points get assigned to the nearest centroid; centroids move to the mean of their members. Repeat until nothing moves. Unsupervised, and beautifully simple.",
        code: "for _ in range(max_iter):\n    labels = argmin(dist(X, centroids), axis=1)\n    centroids = [X[labels == k].mean(0) for k in range(K)]",
        draw(param) {
          const K = Math.max(2, Math.round(param / 20));
          const cols = ["#24365B", "#B98A2F", "#6B1C2A", "#2E7D5B", "#8C857E", "#B08D57"];
          const pts = [];
          for (let i = 0; i < 90; i++) {
            const a = (i * 2.399) % (Math.PI * 2), r = 40 + (i * 53) % 150;
            pts.push({x: W / 2 + Math.cos(a) * r * 1.4, y: H / 2 + Math.sin(a) * r * 0.85});
          }
          const phase = (t / 90) % 1;
          const cents = Array.from({length: K}, (_, k) => {
            const ang = k / K * Math.PI * 2 + t * 0.004;
            return {x: W / 2 + Math.cos(ang) * 120 * (1 - phase * 0.4), y: H / 2 + Math.sin(ang) * 90 * (1 - phase * 0.4)};
          });
          // one iteration per frame-ish: move cents toward mean
          const assigned = pts.map(p => {
            let best = 0, bd = Infinity;
            cents.forEach((c, k) => { const d = Math.hypot(p.x - c.x, p.y - c.y); if (d < bd) { bd = d; best = k; } });
            return {p, k: best};
          });
          assigned.forEach(({p, k}) => {
            ctx.beginPath(); ctx.arc(p.x, p.y, 5, 0, 7);
            ctx.fillStyle = cols[k % cols.length] + "cc"; ctx.fill();
          });
          cents.forEach((c, k) => {
            ctx.beginPath(); ctx.arc(c.x, c.y, 12, 0, 7);
            ctx.fillStyle = cols[k % cols.length]; ctx.fill();
            ctx.strokeStyle = "#fff"; ctx.lineWidth = 2.5; ctx.stroke();
            // pull toward centroid of members (smoothed)
            const mem = assigned.filter(a => a.k === k).map(a => a.p);
            if (mem.length) {
              const mx = mem.reduce((s, p) => s + p.x, 0) / mem.length;
              const my = mem.reduce((s, p) => s + p.y, 0) / mem.length;
              c.x += (mx - c.x) * 0.05; c.y += (my - c.y) * 0.05;
            }
          });
          ctx.fillStyle = "#fff"; ctx.font = "13px monospace";
          ctx.fillText(`K=${K}`, 18, H - 18);
        }
      },
      {
        name: "Support Vector Machine",
        label: "soft margin C", def: 50, fmt: v => (v / 10).toFixed(1),
        desc: "Find the widest street between classes. C controls the trade-off: big C hates misclassification, small C tolerates it for a wider margin.",
        code: "w, b = fit(X, y, C)      # max margin\ndecision = X @ w + b    # sign = class",
        draw(param) {
          const C = param / 10;
          const A = [], B = [];
          for (let i = 0; i < 30; i++) {
            A.push({x: 90 + (i * 29) % 190, y: 70 + (i * 47) % 120});
            B.push({x: 380 + (i * 33) % 200, y: 240 + (i * 41) % 120});
          }
          const slack = Math.min(1, 3 / C);
          const wx = 1, wy = -0.72, nx = -wy, ny = wx;
          const cx = 300 + Math.sin(t * 0.01) * 18 * slack, cy = 240 + Math.cos(t * 0.012) * 12 * slack;
          const line = (off, style, dash) => {
            ctx.beginPath();
            ctx.moveTo(cx - nx * 500 + wx * off, cy - ny * 500 + wy * off);
            ctx.lineTo(cx + nx * 500 + wx * off, cy + ny * 500 + wy * off);
            ctx.strokeStyle = style; ctx.lineWidth = 2.2;
            ctx.setLineDash(dash || []); ctx.stroke(); ctx.setLineDash([]);
          };
          // margin band
          const band = ctx.createLinearGradient(0, 0, W, 0);
          band.addColorStop(0, "rgba(36,54,91,.10)"); band.addColorStop(1, "rgba(185,138,47,.10)");
          ctx.fillStyle = band;
          ctx.fillRect(0, 0, W, H);
          line(0, "rgba(255,255,255,.85)", []);
          line(60 - slack * 25, "rgba(36,54,91,.55)", [6, 6]);
          line(-60 + slack * 25, "rgba(185,138,47,.55)", [6, 6]);
          A.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, 6, 0, 7); ctx.fillStyle = "rgba(36,54,91,.95)"; ctx.fill(); });
          B.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, 6, 0, 7); ctx.fillStyle = "rgba(185,138,47,.95)"; ctx.fill(); });
          ctx.fillStyle = "#fff"; ctx.font = "13px monospace";
          ctx.fillText(`C = ${C.toFixed(1)}  ·  margin width ${Math.round(120 - slack * 50)}`, 18, H - 18);
        }
      }
    ];

    tabsEl.innerHTML = ALGOS.map((a, i) => `<button class="explorer-tab${i === 0 ? " active" : ""}" data-i="${i}">${a.name}</button>`).join("");
    $$(".explorer-tab").forEach(b => b.addEventListener("click", () => {
      $$(".explorer-tab").forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      current = +b.dataset.i;
      const a = ALGOS[current];
      titleEl.textContent = a.name; descEl.textContent = a.desc;
      codeEl.textContent = a.code; labelEl.textContent = a.label;
      range.value = a.def; valEl.textContent = a.fmt(a.def);
      t = 0;
    }));
    const first = ALGOS[0];
    descEl.textContent = first.desc; codeEl.textContent = first.code;
    labelEl.textContent = first.label; valEl.textContent = first.fmt(first.def);
    range.addEventListener("input", () => { valEl.textContent = ALGOS[current].fmt(+range.value); });

    function frame() {
      t++;
      ALGOS[current].draw(+range.value);
      requestAnimationFrame(frame);
    }
    ALGOS[current].draw(+range.value);
    if (!REDUCED) frame();
  })();
})();