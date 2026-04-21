// ── Nav scroll ──────────────────────────────────────────────
const nav = document.getElementById('navbar');

// ── Theme toggle ─────────────────────────────────────────────
const btn  = document.getElementById('themeBtn');
const html = document.documentElement;

function applyTheme(t) {
  html.setAttribute('data-theme', t);
  try { localStorage.setItem('linka-theme', t); } catch(e) {}
}
try {
  const saved = localStorage.getItem('linka-theme');
  if (saved) applyTheme(saved);
  else if (window.matchMedia('(prefers-color-scheme: light)').matches) applyTheme('light');
} catch(e) {}
btn.addEventListener('click', () => {
  applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

// ── Visual switcher (dropdown) ───────────────────────────────
const visualSwitcher = document.getElementById('visual-switcher');
const visualTrigger  = document.getElementById('visual-trigger');
const visualLabel    = document.getElementById('visual-label');

function applyVisual(v) {
  html.setAttribute('data-visual', v);
  document.querySelectorAll('.visual-btn').forEach(b => {
    const active = b.dataset.visual === v;
    b.classList.toggle('active', active);
    if (active) visualLabel.textContent = b.textContent;
  });
  visualTrigger.setAttribute('aria-expanded', 'false');
  visualSwitcher.classList.remove('open');
  try { localStorage.setItem('linka-visual', v); } catch(e) {}
}

visualTrigger.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = visualSwitcher.classList.toggle('open');
  visualTrigger.setAttribute('aria-expanded', String(isOpen));
});

document.addEventListener('click', () => {
  visualSwitcher.classList.remove('open');
  visualTrigger.setAttribute('aria-expanded', 'false');
});

document.getElementById('visual-menu').addEventListener('click', e => e.stopPropagation());

document.querySelectorAll('.visual-btn').forEach(b => {
  b.addEventListener('click', () => applyVisual(b.dataset.visual));
});

try {
  const savedVisual = localStorage.getItem('linka-visual');
  if (savedVisual) applyVisual(savedVisual);
} catch(e) {}

// ── Scroll reveal ────────────────────────────────────────────
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('shown'); io.unobserve(e.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ── Custom cursor ────────────────────────────────────────────
const cursorDot  = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');

let dotX = 0, dotY = 0;
let ringX = 0, ringY = 0;
let mouseX = 0, mouseY = 0;
let cursorVisible = false;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  if (!cursorVisible) {
    cursorVisible = true;
    cursorDot.style.opacity  = '1';
    cursorRing.style.opacity = '1';
  }
});

document.addEventListener('mouseleave', () => {
  cursorVisible = false;
  cursorDot.style.opacity  = '0';
  cursorRing.style.opacity = '0';
});

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

function animateCursor() {
  dotX = mouseX; dotY = mouseY;
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;

  cursorDot.style.left  = dotX  + 'px';
  cursorDot.style.top   = dotY  + 'px';
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// ── Mouse spotlight ───────────────────────────────────────────
const spotlight = document.getElementById('mouse-spotlight');
let spX = window.innerWidth / 2, spY = window.innerHeight / 2;
let spCX = spX, spCY = spY;

document.addEventListener('mousemove', (e) => {
  spX = e.clientX; spY = e.clientY;
  document.body.classList.add('has-mouse');
});

function animateSpotlight() {
  spCX += (spX - spCX) * 0.06;
  spCY += (spY - spCY) * 0.06;
  const theme = document.documentElement.getAttribute('data-theme');
  const clr   = theme === 'dark'
    ? 'rgba(147,51,234,0.09)'
    : 'rgba(124,58,237,0.06)';
  spotlight.style.background =
    `radial-gradient(650px circle at ${spCX}px ${spCY}px, ${clr} 0%, transparent 70%)`;
  requestAnimationFrame(animateSpotlight);
}
animateSpotlight();

// ── Parallax + Mouse micro-parallax (unified loop) ───────────
//
// Scroll parallax: each layer moves at a fraction of scrollY
// Mouse parallax:  glow orbs shift subtly with cursor
// Both offsets combined in one transform — no fighting between loops.

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const scrollLayers = [
  { el: document.getElementById('px-grid'),      s:  0.35 },
  { el: document.getElementById('px-particles'), s:  0.60 },
  { el: document.querySelector('.hero-left'),    s:  0.18 },
  { el: document.querySelector('.hero-right'),   s:  0.08 },
];

const glowLayers = [
  { el: document.getElementById('px-glow1'), s:  0.50, mx: -0.025, my: -0.018 },
  { el: document.getElementById('px-glow2'), s: -0.20, mx:  0.030, my:  0.022 },
  { el: document.getElementById('px-glow3'), s:  0.30, mx: -0.015, my:  0.012 },
];

let scrollY = window.scrollY;
let rawMX = 0, rawMY = 0;
let curMX = 0, curMY = 0;

const heroEl = document.querySelector('.hero');
let ticking = false;

window.addEventListener('scroll', () => {
  scrollY = window.scrollY;
  nav.classList.toggle('scrolled', scrollY > 40);
  if (!ticking && !prefersReduced) {
    requestAnimationFrame(masterFrame);
    ticking = true;
  }
  if (prefersReduced) nav.classList.toggle('scrolled', scrollY > 40);
}, { passive: true });

document.addEventListener('mousemove', (e) => {
  rawMX = (e.clientX / window.innerWidth  - 0.5) * 2;
  rawMY = (e.clientY / window.innerHeight - 0.5) * 2;
});

function masterFrame() {
  ticking = false;
  if (prefersReduced) return;
  if (scrollY > heroEl.offsetHeight * 1.3) return;

  scrollLayers.forEach(({ el, s }) => {
    if (el) el.style.transform = `translate3d(0, ${scrollY * s}px, 0)`;
  });

  glowLayers.forEach(({ el, s, mx, my }) => {
    if (!el) return;
    const sy = scrollY * s;
    const ex = curMX * mx * 100;
    const ey = curMY * my * 80;
    el.style.transform = `translate3d(${ex}px, ${sy + ey}px, 0)`;
  });
}

function mouseLoop() {
  curMX += (rawMX - curMX) * 0.05;
  curMY += (rawMY - curMY) * 0.05;

  if (!prefersReduced && scrollY <= heroEl.offsetHeight * 1.3) {
    glowLayers.forEach(({ el, s, mx, my }) => {
      if (!el) return;
      el.style.transform = `translate3d(${curMX * mx * 100}px, ${scrollY * s + curMY * my * 80}px, 0)`;
    });
  }
  requestAnimationFrame(mouseLoop);
}
mouseLoop();

masterFrame();
