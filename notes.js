/* ═══════════════════════════════════════════════════════════════
   LAB NOTES — long-form write-ups.
   Add an entry below and it appears on the site automatically.
   Each note: title, repo link, sections (problem / method / result /
   limits / next). Markdown-lite: **bold**, `code`, *italic*.
   ═══════════════════════════════════════════════════════════════ */
const NOTES = [
  {
    id: "first-principles",
    icon: "⚙️",
    title: "Why I rebuilt 12 ML algorithms from scratch",
    tag: "Foundations",
    date: "2026-11",
    link: "https://github.com/iam-dev-Adarsh/The-first-prinicple",
    blurb: "Calling library.fit() and trusting the output is how bugs survive. Here is what changed when I wrote every gradient myself.",
    sections: [
      ["The problem", "Modern ML feels like a stack of black boxes. `sklearn` gives you an answer, but not the *why*. When a model behaves badly you can't fix what you can't see."],
      ["The method", "Every model gets the same three artefacts: `CONCEPT.md` with the derivation, `main.py` with NumPy-only code, `OUTPUT.md` with a captured run. No `model.fit()`, no hidden optimisers. Gradient descent is a loop I wrote; the SVM margin is a constraint I solved; the tree split is a criterion I coded."],
      ["The result", "12 models — regression, KNN, decision trees, forests, SVM, XGBoost, k-means, naive Bayes, softmax, logistic, Q-learning — each with decision-region plots so you can *see* what it learned."],
      ["Where it breaks", "My first gradient descent diverged because I forgot to scale features. My random forest overfit a 2D toy set completely. Those failures are kept in the repo — they are the most valuable files in it."],
      ["What's next", "Perceptron → MLP → backprop by hand, then a tiny transformer. Same rules: derive, implement, run, document the failure mode."]
    ]
  },
  {
    id: "neat",
    icon: "🏎️",
    title: "Teaching cars to drive with no labels and no backprop",
    tag: "Reinforcement Learning",
    date: "2026-11",
    link: "https://github.com/iam-dev-Adarsh/python-ai-projects/tree/main/1.Self_driving_AI_game",
    blurb: "NEAT evolves network topologies from reward alone. Best fitness went 2,604 → 6,245 in four generations. Getting there broke twice.",
    sections: [
      ["The problem", "Learn to drive a winding track with no demonstrations and no gradient — only a score for how far you travel without crashing."],
      ["The method", "Five raycasting sensors sample track distance at −90/−45/0/+45/+90°, normalised into [0,10]. Genomes (weights *and* topology) mutate and cross over; speciation protects small innovations from being crushed by mature networks. Fitness = distance travelled."],
      ["The result", "Best fitness 2,604 → 6,245 within four generations; populations of 30 genomes converge at 60 FPS with an uncapped turbo mode for fast iteration."],
      ["Where it breaks", "Two production bugs that tutorials ignore: Pygame's `set_mode()` was being called inside the generation loop (black-screen flicker), and modern `neat-python` enforces `no_fitness_termination` + node `response_*` params that older configs violate on Python 3.12. Both fixed in-repo and documented."],
      ["What's next", "Track diversity, sensor noise, and comparing NEAT against a plain DQN on the same environment."]
    ]
  },
  {
    id: "lstm",
    icon: "🎭",
    title: "What temperature really does in a language model",
    tag: "Deep Learning",
    date: "2026-11",
    link: "https://github.com/iam-dev-Adarsh/python-ai-projects/tree/main/0.RRN_text_generator",
    blurb: "A stacked LSTM on 1.1M characters of Shakespeare. The interesting part isn't the model — it's the sampling.",
    sections: [
      ["The problem", "Generate coherent theatrical dialogue character-by-character, and understand *why* some output reads like Shakespeare and some reads like noise."],
      ["The method", "Sliding windows (length 40, step 3) → one-hot encoding → two 128-unit LSTM layers → softmax over the vocabulary. Sampling uses temperature-scaled softmax: divide logits by T before sampling."],
      ["The result", "At T=0.2 the model produces correct meter but safe phrasing; at T=0.8 it invents words but takes risks. Coherence is a *dial*, not a property of the model."],
      ["Where it breaks", "At 500k characters the model still hallucinates speaker tags mid-line and repeats phrases. Character-level models are memorisation-prone; real LMs solve this with better tokenisation and much more data."],
      ["What's next", "Replace the char-level model with a tiny transformer and compare perplexity at matched parameter counts."]
    ]
  },
  {
    id: "cnn",
    icon: "🖼️",
    title: "63% accuracy, and why I wrote that down",
    tag: "Computer Vision",
    date: "2026-11",
    link: "https://github.com/iam-dev-Adarsh/python-ai-projects/tree/main/3.IMG_Classifier_TFandCNN",
    blurb: "The CIFAR-10 CNN is the least impressive number on this site — and the most honest one. Here's what it taught me about evaluation.",
    sections: [
      ["The problem", "Classify 32×32 images into 10 CIFAR-10 classes, and report the number you actually got — not the number you wanted."],
      ["The method", "Normalise pixels, train a convolutional network for 20 epochs, checkpoint the model, then load it and run top-3 confidence predictions on brand-new images via OpenCV (real photo → 99.33% car)."],
      ["The result", "63.32% test accuracy. That is not production-grade, and the README says so explicitly."],
      ["Where it breaks", "Plain CNNs on CIFAR-10 saturate quickly without augmentation or regularisation. The gap between 63% and 90%+ is not a bigger network — it's data discipline."],
      ["What's next", "Augmentation, batch norm, weight decay — then measure again and publish the comparison."]
    ]
  },
  {
    id: "deep-ml",
    icon: "🧮",
    title: "30 problems, hand-written: my Deep-ML kernel",
    tag: "Foundations",
    date: "2026-11",
    link: "https://github.com/iam-dev-Adarsh/deep-ml",
    blurb: "From ReLU to Cholesky decomposition. Every solution written by hand — plus what the coverage tracker taught me about consistency.",
    sections: [
      ["The problem", "Practice linear algebra and ML fundamentals the way athletes practice drills: repeatedly, with measurable coverage."],
      ["The method", "20 ML problems + 10 math problems solved on deep-ml.com. Each solution is short, dependency-light, and my own. `progress.json` and a coverage chart regenerate on every push."],
      ["The result", "30 solved — including Cholesky, LU/QR, Woodbury/Sherman-Morrison, conjugate gradient, Schur complements. The coverage tracker replays the solves over time."],
      ["Where it breaks", "My first Cholesky attempt assumed positive-definiteness without checking it. The Woodbury derivation was right but numerically unstable until I added the diagonal shift."],
      ["What's next", "Numerical-stability deep-dives: condition numbers, floating-point error in decompositions."]
    ]
  },
  {
    id: "nlp",
    icon: "📰",
    title: "A fake-news classifier — and the limits I documented",
    tag: "NLP",
    date: "2026-11",
    link: "https://github.com/iam-dev-Adarsh/python-ai-projects/tree/main/2.Fake_or_Truth",
    blurb: "TF-IDF + LinearSVC is a strong baseline. It is also emphatically not a fact-checker. Knowing the difference is the whole lesson.",
    sections: [
      ["The problem", "Label news articles as fake or real with a simple, interpretable pipeline."],
      ["The method", "Stratified train/test split → TF-IDF features → LinearSVC → honest accuracy report → save and re-read a sample article for a live prediction."],
      ["The result", "A working baseline you can explain line by line — no black box anywhere in the stack."],
      ["Where it breaks", "It learns the *writing style* of the corpus, not whether a claim is true. The README states this in bold. A model that says 'fake' is pattern-matching, not judging truth."],
      ["What's next", "Compare against fine-tuned transformers on the same data; measure calibration, not just accuracy."]
    ]
  }
];
window.NOTES = NOTES;