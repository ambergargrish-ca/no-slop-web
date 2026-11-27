#!/usr/bin/env node
// slop-scan: find the mechanical tells of AI-generated websites.
// Zero dependencies. Node 18+.
//
// Usage:
//   node slop-scan.mjs <dir-or-file> [--json] [--min-score=90] [--ignore=dir1,dir2] [--max=5]
//
// Exit code 1 if any high finding exists or the score is below --min-score.
// Silence a line with a comment containing: slop-scan-ignore

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, extname, relative, resolve } from "node:path";

const args = process.argv.slice(2);
const target = args.find((a) => !a.startsWith("--"));
const flag = (name, def) => {
  const hit = args.find((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (!hit) return def;
  const v = hit.split("=")[1];
  return v === undefined ? true : v;
};

if (!target || flag("help", false)) {
  console.log("Usage: node slop-scan.mjs <dir-or-file> [--json] [--min-score=90] [--ignore=a,b] [--max=5]");
  process.exit(target ? 0 : 2);
}

const ROOT = resolve(target);
if (!existsSync(ROOT)) {
  console.error(`Not found: ${ROOT}`);
  process.exit(2);
}

const JSON_OUT = flag("json", false) === true;
const MIN_SCORE = Number(flag("min-score", 0));
const MAX_SHOW = Number(flag("max", 5));
const EXTRA_IGNORE = String(flag("ignore", "")).split(",").filter(Boolean);
const IGNORE_DIRS = new Set([
  "node_modules", ".git", "dist", "build", ".next", ".nuxt", ".svelte-kit", ".astro",
  "out", "coverage", "vendor", ".vercel", ".netlify", ".turbo", ".cache", "public/fonts",
  ...EXTRA_IGNORE,
]);

const MARKUP = new Set([".html", ".htm", ".jsx", ".tsx", ".vue", ".svelte", ".astro", ".php", ".liquid", ".hbs", ".njk", ".erb"]);
const STYLE = new Set([".css", ".scss", ".sass", ".less"]);
const SCRIPT = new Set([".js", ".ts", ".mjs", ".cjs"]);
const CONTENT = new Set([".md", ".mdx"]);
const ALL = new Set([...MARKUP, ...STYLE, ...SCRIPT, ...CONTENT]);
const COPY = new Set([...MARKUP, ...SCRIPT, ...CONTENT]); // where visible copy lives

// ---------- file walk ----------
function walk(p, out = []) {
  const st = statSync(p);
  if (st.isFile()) {
    if (ALL.has(extname(p).toLowerCase()) && !/\.min\.(js|css)$/.test(p)) out.push(p);
    return out;
  }
  for (const name of readdirSync(p)) {
    if (IGNORE_DIRS.has(name) || name.startsWith(".")) continue;
    const rel = relative(ROOT, join(p, name));
    if (EXTRA_IGNORE.some((ig) => rel.startsWith(ig))) continue;
    walk(join(p, name), out);
  }
  return out;
}

// ---------- rules ----------
// severity: high (fix before shipping), medium (fix unless justified), low (look at it)
const BANNED_WORDS = [
  "elevate[sd]?", "elevating", "unlock(s|ed|ing)?", "unleash(es|ed|ing)?", "supercharg(e|es|ed|ing)",
  "empower(s|ed|ing|ment)?", "revolutioni[sz](e|es|ed|ing)", "harness(es|ed|ing)?", "seamless(ly)?",
  "cutting-edge", "next-level", "world-class", "best-in-class", "state-of-the-art", "game-?chang(er|ing)",
  "effortless(ly)?", "skyrocket(s|ed|ing)?", "turbocharg(e|es|ed|ing)", "delve[sd]?", "reimagin(e|ed|ing)",
  "synerg(y|ies|istic)", "paradigm shift",
];
const BANNED_PHRASES = [
  "in today'?s fast-paced", "ever-evolving", "to the next level", "all-in-one (solution|platform)",
  "look no further", "we'?ve got you covered", "say goodbye to", "the future of [\\w\\s]{1,30} is here",
  "designed with you in mind", "join (thousands|millions)", "whether you'?re an? ", "a testament to",
  "rest assured", "not just an? [\\w\\s-]{1,40}[,.;] (it'?s|it is|we'?re)",
];

const RULES = [
  // ---- copy ----
  { id: "em-dash", sev: "high", cat: "copy", in: COPY,
    re: /—|&mdash;|&#8212;|&#x2014;/,
    msg: "Em dash in copy, the most recognised AI writing tell",
    fix: "Use a comma, colon, period or parentheses" },
  { id: "banned-word", sev: "medium", cat: "copy", in: COPY, copyOnly: true,
    re: new RegExp(`\\b(${BANNED_WORDS.join("|")})\\b`, "i"),
    msg: "Generated marketing vocabulary",
    fix: "Replace with a concrete verb or claim that says what actually happens" },
  { id: "banned-phrase", sev: "medium", cat: "copy", in: COPY, copyOnly: true,
    re: new RegExp(`(${BANNED_PHRASES.join("|")})`, "i"),
    msg: "Stock AI phrase",
    fix: "Say the specific thing instead" },
  // ---- interaction details (references/interaction-details.md) ----
  { id: "img-no-size", sev: "low", cat: "craft", in: MARKUP,
    test: (l) => /<img\b/i.test(l) && !/\bwidth=|\baspect-ratio|\bfill\b|\blayout=/i.test(l),
    msg: "Image without a reserved size (layout shift when it loads)",
    fix: "Add width and height attributes, or aspect-ratio in CSS" },
  { id: "validate-on-change", sev: "low", cat: "ux", in: new Set([...MARKUP, ...SCRIPT]),
    re: /onChange=\{\s*validate|addEventListener\(\s*["']input["'][^)]*valid/i,
    msg: "Validating on every keystroke",
    fix: "Validate on blur and on submit; re-check as they type only after an error has shown" },
  { id: "toast-no-pause", sev: "low", cat: "ux", in: new Set([...MARKUP, ...SCRIPT]),
    test: (l) => /setTimeout\(.*(toast|snack)/i.test(l) && !/pause|hover|mouseenter/i.test(l),
    msg: "Toast on a timer with no pause",
    fix: "Pause the timer on hover and focus; keep errors until dismissed" },
  // ---- mobile details (references/mobile-details.md) ----
  { id: "small-input-text", sev: "medium", cat: "mobile", in: STYLE,
    test: (l) => /(^|[\s,])(input|select|textarea|\.input|\.form-control|\.field\s+input)\b[^{]*\{[^}]*font-size:\s*(1[0-5](\.\d+)?px|0?\.[0-9]+rem|0?\.[0-9]+em)/i.test(l) && !/pointer:\s*fine/i.test(l),
    msg: "Input text under 16px (iOS Safari zooms in on focus)",
    fix: "Use 16px or more on touch screens, e.g. @media (pointer: coarse) { input { font-size: 16px } }" },
  { id: "email-no-type", sev: "low", cat: "mobile", in: MARKUP,
    test: (l) => /<input\b[^>]*(name|id)=["'][^"']*e-?mail[^"']*["']/i.test(l) && !/type=["']email["']|type=["'](checkbox|radio|hidden)["']/i.test(l),
    msg: "Email field without type=\"email\" (wrong keyboard, auto-capital)",
    fix: "type=\"email\" autocomplete=\"email\" autocapitalize=\"off\" spellcheck=\"false\"" },
  { id: "otp-no-autofill", sev: "low", cat: "mobile", in: MARKUP,
    test: (l) => /<input\b[^>]*(name|id)=["'][^"']*(otp|verif|2fa|one-?time)[^"']*["']/i.test(l) && !/one-time-code/i.test(l),
    msg: "Code field without one-time-code autofill",
    fix: "autocomplete=\"one-time-code\" inputmode=\"numeric\", one field for the whole code" },
  { id: "lorem-ipsum", sev: "high", cat: "copy", in: COPY,
    re: /lorem ipsum|dolor sit amet/i,
    msg: "Placeholder text left in",
    fix: "Write real copy, or a clearly marked [COPY NEEDED] placeholder" },
  { id: "fake-proof", sev: "medium", cat: "copy", in: COPY, copyOnly: true,
    re: /\b(trusted by|loved by|used by|join) (over )?\d[\d,.]*\s?(k|m)?\+|\b(John|Jane) Doe\b|\bSarah [A-Z]\.|\bAcme( Corp| Inc)?\b|\b99\.9+% (satisfaction|uptime)\b|\b10x (faster|better|more)\b/i,
    msg: "Proof that looks invented (round user counts, placeholder names, unsourced multipliers)",
    fix: "Use real, sourced proof, or a marked [REAL QUOTE NEEDED] placeholder" },
  { id: "question-headline", sev: "low", cat: "copy", in: MARKUP,
    re: /<h[12][^>]*>[^<]{3,}\?\s*<\/h[12]>/i,
    msg: "Headline phrased as a question",
    fix: "State what the visitor gets" },
  { id: "vague-cta", sev: "low", cat: "copy", in: MARKUP,
    re: />\s*(get started|learn more|click here|sign up now|discover more|explore now)\s*</i,
    msg: "Vague button or link text",
    fix: "Verb + object: \"Book a table\", \"See pricing\"" },
  { id: "double-hyphen", sev: "low", cat: "copy", in: MARKUP,
    re: />[^<{}]*\w\s?--\s?\w[^<{}]*</,
    msg: "Double hyphen used as a dash in copy",
    fix: "Use a comma or colon (or an en dash for ranges)" },

  // ---- color ----
  { id: "purple-gradient", sev: "high", cat: "color", in: ALL,
    re: /(linear|radial|conic)-gradient\([^)]*(#(7c3aed|8b5cf6|a855f7|6366f1|4f46e5|9333ea|c026d3|d946ef|a78bfa|818cf8)|\b(violet|purple|indigo|fuchsia)\b)|\bfrom-(purple|violet|indigo|fuchsia)-\d{2,3}\b[^"'`\n]*\bto-(blue|indigo|pink|purple|violet|cyan|fuchsia|sky)-\d{2,3}\b/i,
    msg: "Default purple/violet/indigo gradient, the signature AI palette",
    fix: "One flat accent from your direction; gradients only if the brand owns one" },
  { id: "gradient-text", sev: "high", cat: "color", in: ALL,
    re: /bg-clip-text|background-clip:\s*text|-webkit-background-clip:\s*text/i,
    msg: "Gradient-filled text",
    fix: "Solid ink color; let size and weight carry the headline" },
  { id: "default-violet", sev: "medium", cat: "color", in: ALL,
    re: /\b(bg|text|border|ring|fill|stroke|outline|decoration|shadow|via|from|to)-(indigo|violet|purple)-\d{2,3}\b|#(7c3aed|8b5cf6|a855f7|6366f1|4f46e5|9333ea)\b/i,
    msg: "Tailwind default violet/indigo/purple used raw",
    fix: "Define a custom accent token with a named hue" },
  { id: "glow-blob", sev: "medium", cat: "color", in: ALL,
    re: /\bblur-(3xl|\[\d{3}px\])|filter:\s*blur\(\s*([5-9]\d|\d{3,})px/i,
    msg: "Heavy blur, usually a glowing blob behind the hero",
    fix: "Real image, texture, or empty space" },
  { id: "pure-black", sev: "low", cat: "color", in: new Set([...STYLE, ...MARKUP]),
    re: /(color|background(-color)?):\s*(#000\b|#000000\b|black\b)|\b(text|bg)-black\b/i,
    msg: "Pure black (harsh, unconsidered)",
    fix: "Tinted off-black from your neutral ramp, e.g. #1b1a17" },

  // ---- type ----
  { id: "eyebrow", sev: "low", cat: "type", in: MARKUP, count: true,
    re: /\buppercase\b[^"'`\n]*\btracking-(wide|wider|widest)\b|\btracking-(wide|wider|widest)\b[^"'`\n]*\buppercase\b/,
    msg: "Letter-spaced uppercase eyebrow label" },

  // ---- icons ----
  { id: "sparkles", sev: "high", cat: "icons", in: COPY,
    re: /✨|Sparkles(Icon)?\b/,
    msg: "Sparkles used to signal AI",
    fix: "Describe the feature; use a literal icon or none" },
  { id: "emoji-icon", sev: "medium", cat: "icons", in: MARKUP,
    re: /(?![©®™✨↔-↙↩↪])\p{Extended_Pictographic}/u,
    msg: "Emoji in markup, usually standing in for an icon",
    fix: "One consistent icon set (Lucide, Phosphor), or no icon" },

  // ---- layout ----
  { id: "three-col", sev: "low", cat: "layout", in: new Set([...MARKUP, ...STYLE]), count: true,
    re: /\b(md|lg|xl):grid-cols-3\b|grid-template-columns:\s*repeat\(\s*3\s*,/,
    msg: "Three-column grid (check it is not the three-feature-card template)" },
  { id: "big-radius", sev: "low", cat: "layout", in: new Set([...MARKUP, ...STYLE]), count: true,
    re: /\brounded-(2xl|3xl)\b|border-radius:\s*(1[2-9]|2\d)px/,
    msg: "Large soft radius (the soft-SaaS default)" },
  { id: "shadow", sev: "low", cat: "layout", in: new Set([...MARKUP, ...STYLE]), count: true,
    re: /\bshadow-(md|lg|xl|2xl)\b|box-shadow:\s*(?!none)/,
    msg: "Drop shadow" },

  // ---- motion ----
  { id: "scroll-fade", sev: "medium", cat: "motion", in: new Set([...MARKUP, ...SCRIPT]), count: true,
    re: /data-aos=|whileInView|\bfade-?up\b|animate-on-scroll|ScrollReveal|useInView/,
    msg: "Scroll-triggered reveal" },
  { id: "infinite", sev: "medium", cat: "motion", in: new Set([...MARKUP, ...STYLE]),
    re: /animation[^;{}\n]*\binfinite\b|iteration-count:\s*infinite|\banimate-(pulse|bounce|ping)\b/,
    msg: "Infinite animation (fails WCAG 2.2.2 unless it is a loader or pausable)",
    fix: "Run once and stop, or add a pause control. Loaders are fine." },
  { id: "typewriter", sev: "low", cat: "motion", in: new Set([...MARKUP, ...SCRIPT]),
    re: /typewriter|typed\.js|TypeAnimation|react-type-animation/i,
    msg: "Typewriter headline effect",
    fix: "Static headline" },
  { id: "slow-motion", sev: "medium", cat: "motion", in: new Set([...MARKUP, ...STYLE]),
    test: (line) => {
      const tw = line.match(/\bduration-(\d{3,4})\b/);
      if (tw && Number(tw[1]) > 500) return true;
      const css = line.match(/(transition|animation)(-duration)?\s*:[^;{}]*?(\d+(\.\d+)?)(ms|s)\b/);
      if (!css) return false;
      const ms = css[5] === "s" ? Number(css[3]) * 1000 : Number(css[3]);
      return ms > 500;
    },
    msg: "UI motion longer than 500ms",
    fix: "150 to 300ms for UI; longer only for rare, large transitions" },

  // ---- accessibility / craft ----
  { id: "img-no-alt", sev: "high", cat: "a11y", in: MARKUP,
    re: /<img\b(?![^>]*\balt\s*=)[^>]*>/i,
    msg: "Image without alt attribute",
    fix: "Meaningful alt, or alt=\"\" if decorative" },
  { id: "outline-none", sev: "medium", cat: "a11y", in: new Set([...MARKUP, ...STYLE]),
    re: /outline:\s*(none|0)\s*[;}!]|\boutline-none\b/,
    msg: "Focus outline removed",
    fix: "Make sure a visible :focus-visible style replaces it" },
  { id: "no-zoom", sev: "high", cat: "a11y", in: MARKUP,
    re: /user-scalable\s*=\s*(no|0)|maximum-scale\s*=\s*1(\.0)?\b/i,
    msg: "Zoom disabled",
    fix: "Remove user-scalable=no and maximum-scale=1" },
  { id: "click-div", sev: "medium", cat: "a11y", in: MARKUP,
    re: /<(div|span)\b[^>]*\s(onClick|onclick|@click|v-on:click|on:click)\s*=/,
    msg: "Clickable div or span",
    fix: "Use <button> for actions, <a href> for navigation" },
  { id: "dead-link", sev: "medium", cat: "craft", in: MARKUP,
    re: /href\s*=\s*["']#["']/,
    msg: "Placeholder href=\"#\"",
    fix: "Real destination, or remove the link" },
  { id: "important", sev: "low", cat: "craft", in: STYLE, count: true,
    re: /!important/,
    msg: "!important (fine inside the reduced-motion block)" },
];

// Rules with count:true are summarised as one finding when the count passes a threshold.
const COUNT_THRESHOLDS = { eyebrow: 4, "three-col": 2, "big-radius": 12, shadow: 12, "scroll-fade": 6, important: 6 };
const COUNT_FIX = {
  eyebrow: "Use eyebrow labels rarely, only where they help navigation",
  "three-col": "Replace feature-card grids with fewer, deeper, asymmetric features (layout.md)",
  "big-radius": "Pick one radius from your direction and apply it everywhere",
  shadow: "One elevation for floating elements; flat for the rest",
  "scroll-fade": "Animate only what needs attention; do not fade every block in on scroll",
  important: "Fix specificity instead",
};

const WEIGHT = { high: 8, medium: 3, low: 1 };
const RULE_CAP = { high: 24, medium: 9, low: 3 }; // max deduction per rule

// ---------- scan ----------
const files = walk(ROOT);
const findings = [];
const counts = {};
const project = { hasMotion: false, hasReducedMotion: false, hasFocusVisible: false, hasOutlineNone: false, fonts: new Set(), hexInComponents: new Set(), sizes: new Set(), weights: new Set() };

for (const file of files) {
  const ext = extname(file).toLowerCase();
  const rel = relative(ROOT, file) || file;
  let text;
  try { text = readFileSync(file, "utf8"); } catch { continue; }
  const lines = text.split(/\r?\n/);

  if (/prefers-reduced-motion|useReducedMotion|motion-reduce:|motion-safe:/.test(text)) project.hasReducedMotion = true;
  if (/transition|animation|@keyframes|animate-|framer-motion|motion\.|gsap/.test(text) && !CONTENT.has(ext)) project.hasMotion = true;
  if (/focus-visible/.test(text)) project.hasFocusVisible = true;

  for (const m of text.matchAll(/font-family:\s*([^;}\n]+)/gi)) {
    const first = m[1].split(",")[0].replace(/["']/g, "").trim();
    if (first && !first.startsWith("var(") && !/^(inherit|initial|sans-serif|serif|monospace|system-ui|-apple-system)$/i.test(first)) project.fonts.add(first);
  }
  for (const m of text.matchAll(/from\s+["']next\/font\/google["']|fonts\.googleapis\.com\/css2?\?family=([A-Za-z+]+)/g)) {
    if (m[1]) project.fonts.add(m[1].replace(/\+/g, " "));
  }
  for (const m of text.matchAll(/import\s*\{([^}]+)\}\s*from\s*["']next\/font\/google["']/g)) {
    m[1].split(",").map((s) => s.trim().replace(/_/g, " ")).filter(Boolean).forEach((f) => project.fonts.add(f));
  }
  if (STYLE.has(ext)) {
    for (const m of text.matchAll(/font-size:\s*([0-9.]+)px/g)) project.sizes.add(Number(m[1]));
    for (const m of text.matchAll(/font-weight:\s*([1-9]00|[1-9][0-9]0)\s*[;}]/g)) project.weights.add(m[1]);
  }
  if ([".jsx", ".tsx", ".vue", ".svelte", ".astro"].includes(ext)) {
    for (const m of text.matchAll(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g)) project.hexInComponents.add(m[0].toLowerCase());
  }

  // html document checks
  if (/<html[\s>]/i.test(text)) {
    const doc = [
      [!/<html[^>]*\blang=/i.test(text), "html-lang", "high", "a11y", "<html> has no lang attribute", "Add lang=\"en\" (or the page language)"],
      [!/<title>[^<]+<\/title>/i.test(text), "no-title", "medium", "craft", "Missing <title>", "Write a specific page title"],
      [!/<meta[^>]+name=["']description["']/i.test(text), "no-meta-desc", "medium", "craft", "Missing meta description", "Write one or two specific sentences"],
      [!/<meta[^>]+property=["']og:image["']/i.test(text), "no-og-image", "low", "craft", "Missing Open Graph image", "Design a 1200x630 share image"],
    ];
    for (const [fail, id, sev, cat, msg, fix] of doc) if (fail) findings.push({ id, sev, cat, file: rel, line: 1, msg, fix, text: "" });
  }

  lines.forEach((line, i) => {
    if (line.includes("slop-scan-ignore")) return;
    for (const r of RULES) {
      if (!r.in.has(ext)) continue;
      if (r.copyOnly && SCRIPT.has(ext) && !/["'`>]/.test(line)) continue; // JS: only lines that look like strings or JSX text
      if (r.copyOnly && /^\s*(import|export \* from|\/\/|\*|<!--)/.test(line)) continue;
      const hit = r.test ? r.test(line) : r.re.test(line);
      if (!hit) continue;
      if (r.id === "outline-none") project.hasOutlineNone = true;
      if (r.id === "important" && /prefers-reduced-motion/.test(text) && /(duration|iteration-count|scroll-behavior)[^;]*!important/.test(line)) continue;
      if (r.count) {
        (counts[r.id] ||= []).push({ file: rel, line: i + 1 });
        continue;
      }
      findings.push({ id: r.id, sev: r.sev, cat: r.cat, file: rel, line: i + 1, msg: r.msg, fix: r.fix, text: line.trim().slice(0, 140) });
    }
  });
}

// summarised count rules
for (const r of RULES.filter((r) => r.count)) {
  const hits = counts[r.id] || [];
  if (hits.length >= (COUNT_THRESHOLDS[r.id] ?? 1)) {
    findings.push({ id: r.id, sev: r.sev, cat: r.cat, file: hits[0].file, line: hits[0].line,
      msg: `${r.msg}: ${hits.length} occurrences`, fix: COUNT_FIX[r.id],
      text: hits.slice(0, 4).map((h) => `${h.file}:${h.line}`).join(", ") });
  }
}

// project-wide checks
if (project.hasMotion && !project.hasReducedMotion) {
  findings.push({ id: "no-reduced-motion", sev: "high", cat: "motion", file: "(project)", line: 0,
    msg: "Animations or transitions exist but prefers-reduced-motion is never handled",
    fix: "Add a reduced-motion path (see references/motion.md)", text: "" });
}
if (project.hasOutlineNone && !project.hasFocusVisible) {
  findings.push({ id: "no-focus-style", sev: "high", cat: "a11y", file: "(project)", line: 0,
    msg: "Focus outlines are removed and no :focus-visible style exists anywhere",
    fix: "Add a visible :focus-visible style, 2px, 3:1 contrast", text: "" });
}
const fonts = [...project.fonts].filter((f) => !/^(Arial|Helvetica|Georgia|Times)/i.test(f));
if (fonts.length && fonts.every((f) => /^(Inter|Roboto|Open Sans|Poppins|Montserrat|Lato)$/i.test(f))) {
  findings.push({ id: "default-font", sev: "medium", cat: "type", file: "(project)", line: 0,
    msg: `Only default-feeling fonts in use: ${fonts.join(", ")}`,
    fix: "Choose a deliberate pair for your direction (references/typography.md), unless it is the brand font", text: "" });
}
if (project.sizes.size > 9) {
  findings.push({ id: "type-sizes", sev: "medium", cat: "type", file: "(project)", line: 0,
    msg: `${project.sizes.size} different font sizes (${[...project.sizes].sort((a, b) => a - b).join(", ")}px)`,
    fix: "Pick one ratio and 5 to 7 sizes, then snap everything to them (references/typography.md, Audit an app's type)", text: "" });
}
if (project.weights.size > 3) {
  findings.push({ id: "type-weights", sev: "low", cat: "type", file: "(project)", line: 0,
    msg: `${project.weights.size} different font weights (${[...project.weights].sort().join(", ")})`,
    fix: "Two weights do most of the work (400 to read, 600 to scan), a third for display at most", text: "" });
}
if (project.hexInComponents.size > 15) {
  findings.push({ id: "no-tokens", sev: "low", cat: "craft", file: "(project)", line: 0,
    msg: `${project.hexInComponents.size} different hex colors hardcoded in components`,
    fix: "Move colors into tokens (templates/tokens.css)", text: "" });
}

// ---------- score ----------
const byRule = {};
for (const f of findings) (byRule[f.id] ||= []).push(f);
let deduction = 0;
for (const list of Object.values(byRule)) {
  const sev = list[0].sev;
  deduction += Math.min(list.length * WEIGHT[sev], RULE_CAP[sev]);
}
const score = Math.max(0, 100 - deduction);
const tally = { high: 0, medium: 0, low: 0 };
findings.forEach((f) => tally[f.sev]++);

// ---------- output ----------
if (JSON_OUT) {
  console.log(JSON.stringify({ root: ROOT, files: files.length, score, tally, findings }, null, 2));
} else {
  const verdict = score >= 90 ? "classy" : score >= 75 ? "nearly there" : score >= 50 ? "visibly generated" : "full slop";
  console.log(`\nslop-scan  ${ROOT}`);
  console.log(`${files.length} files scanned\n`);
  for (const sev of ["high", "medium", "low"]) {
    const rules = Object.entries(byRule).filter(([, l]) => l[0].sev === sev);
    if (!rules.length) continue;
    console.log(`${sev.toUpperCase()}`);
    for (const [id, list] of rules) {
      console.log(`  [${id}] ${list[0].msg}${list.length > 1 ? `  (${list.length}x)` : ""}`);
      if (list[0].fix) console.log(`    fix: ${list[0].fix}`);
      for (const f of list.slice(0, MAX_SHOW)) {
        if (f.file === "(project)") continue;
        console.log(`    ${f.file}:${f.line}${f.text ? `  ${f.text}` : ""}`);
      }
      if (list.length > MAX_SHOW) console.log(`    ...and ${list.length - MAX_SHOW} more`);
    }
    console.log("");
  }
  console.log(`Score: ${score}/100 (${verdict})   high ${tally.high}, medium ${tally.medium}, low ${tally.low}`);
  console.log("The scanner only sees code. Finish with references/slop-catalog.md section 8 and the polish checklist.\n");
}

process.exit(tally.high > 0 || score < MIN_SCORE ? 1 : 0);
