# Portfolio — Adarsh Singh

A single-page portfolio for an AI engineer in the making. No framework, no build step: plain HTML, CSS and JavaScript.

**Live data:** the page reads your GitHub on every visit — Deep-ML problems solved, difficulty split, latest solve, repo list and recent commits. Nothing on the site needs updating by hand when you ship new work.

---

## Run it locally

```bash
python -m http.server 8000
# open http://localhost:8000
```

Or just open `index.html` directly — `file://` works too.

---

## Publish it (GitHub Pages)

1. Create a repo named `portfolio` (public).
2. Push these files to `main`:

```bash
git init
git add -A
git commit -m "Portfolio"
git branch -M main
git remote add origin https://github.com/iam-dev-Adarsh/portfolio.git
git push -u origin main
```

3. Repo → **Settings → Pages → Source: GitHub Actions**. The included workflow (`.github/workflows/pages.yml`) deploys on every push.
4. Your site appears at `https://iam-dev-Adarsh.github.io/portfolio/`.

Then update the `og:url` and `og:image` tags in `index.html` to the live absolute URLs so link previews work everywhere.

---

## Editing content

Everything lives in the `CONFIG` object at the top of **`script.js`**:

| Field | What it controls |
|---|---|
| `name`, `role`, `location`, `availability` | Hero + identity card |
| `projects[]` | Project cards — `visual` supports `figure`, `photo`, `svg` or `code` |
| `skills[]`, `chips[]` | Skill bars and the tech cloud |
| `journey[]` | Timeline |
| `principles[]` | The rotating quote panel |
| `socials[]` | Contact links |
| `learningTracks[]` | Training Paths section (Deep-ML + AI engineering curriculum) — module keyword rules for auto-completion |
| `deepMlTarget` | Deep-ML target the progress bar measures against (default 60) |
| `deepPath[]` | The Deep-Path depth map (5 zones · 14 chapters · 112 concepts) — chapter keyword rules for auto-lighting |

## The Stage Engine (`stage.js`) — the site reframes itself

The page does **not** stay locked to "in training". `stage.js` computes a maturity score from your real signals on every visit:

```
score = deepMlSolved + algorithms×2 + builds×6 + capstoneRepos×12 + curriculumPercent×0.7
```

| Score | Stage | Hero copy becomes |
|---|---|---|
| 0+ | 1 · Foundations | "AI/ML engineer in training" |
| 90+ | 2 · Practitioner | "AI/ML practitioner" |
| 220+ | 3 · Builder | "AI/ML engineer" — production framing |
| 420+ | 4 · Engineer | "AI/ML engineer · capstone-proven" |

Signals it watches (all automatic — nothing to edit by hand):
- **Deep-ML solves** — from `progress.json`, updates the moment you push a solve
- **Algorithms & builds** — counted from your repo folder listings
- **curriculum modules** — auto-marked ✓ when a matching project repo appears (e.g. "A small GPT on Shakespeare" completes the Transformers module). Keyword rules live in `CONFIG.learningTracks[].modules`.
- **Deep-Path chapters** — the depth map zones light up (○ → ● → ✓) when repo names, algorithm folders or solve titles show the work. Rules live in `CONFIG.deepPath`.

When all 11 curriculum modules show ✓, the model card flips to "All training tracks complete" and the site stops calling you "in training".

So: solve more → new cards and new numbers appear. Build a module project → the module ticks itself. Finish the track → the site reframes itself as an engineer. No manual rewrite needed.

The AI engineering curriculum (11 modules + project per module) is defined in `CONFIG.learningTracks[].modules` — edit there, never in the HTML.

Adding a project: copy a card object, point `visual.src` at an image in `assets/projects/`, and add a filter `cat` (`found`, `dl`, `cv`, `nlp`) — or add a new filter button in `index.html`.

**New repos appear automatically** in the LIVE DATA section — no edit needed.

## Files

```
index.html          structure, meta tags, JSON-LD
style.css           design system, responsive layout, reduced-motion rules
script.js           CONFIG + all rendering and interaction
live.js             GitHub data layer (cache + graceful fallback)
assets/             favicon, social preview, project images
.github/workflows/  GitHub Pages deployment
```

## Notes

- GitHub's anonymous API allows 60 requests/hour per IP. Results cache in `localStorage` for 3 minutes and a baked snapshot renders instantly, so visitors never see a broken state.
- If traffic ever gets heavy, move to a scheduled Action that writes `stats.json` and have `live.js` read that instead.
- Respects `prefers-reduced-motion`: animation, canvas motion, custom cursor and tilt are all disabled for users who ask for it.
