// WCAG contrast checker for all themes
// AA: 4.5:1 normal text, 3:1 large text/UI

function hexToRgb(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c+c).join('');
  const n = parseInt(hex, 16);
  return [n >> 16, (n >> 8) & 255, n & 255];
}

function luminance([r, g, b]) {
  return [r, g, b].map(c => {
    c /= 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  }).reduce((acc, c, i) => acc + c * [0.2126, 0.7152, 0.0722][i], 0);
}

function contrast(hex1, hex2) {
  const l1 = luminance(hexToRgb(hex1));
  const l2 = luminance(hexToRgb(hex2));
  const [light, dark] = l1 > l2 ? [l1, l2] : [l2, l1];
  return +((light + 0.05) / (dark + 0.05)).toFixed(2);
}

function check(theme, pairs) {
  const results = [];
  for (const { label, fg, bg, large } of pairs) {
    const ratio = contrast(fg, bg);
    const min = large ? 3.0 : 4.5;
    const pass = ratio >= min;
    results.push({ label, fg, bg, ratio, min, pass });
  }
  return { theme, results };
}

// Blends rgba(r,g,b,a) over a hex bg
function blendRgba(r, g, b, a, bgHex) {
  const [br, bg2, bb] = hexToRgb(bgHex);
  return [Math.round(r*a + br*(1-a)), Math.round(g*a + bg2*(1-a)), Math.round(b*a + bb*(1-a))];
}
function rgbToHex([r,g,b]) { return '#' + [r,g,b].map(v => v.toString(16).padStart(2,'0')).join(''); }

const glassDark = '#0F172A';
const glassBtnPurple = rgbToHex(blendRgba(109,40,217,0.9, glassDark));
const glassBtnBlue   = rgbToHex(blendRgba(37,99,235,0.85, glassDark));

const themes = [
  check('linka-dark', [
    { label: 'text on bg',         fg: '#F5F0FF', bg: '#08000E' },
    { label: 'muted on bg',        fg: '#BBA8D8', bg: '#08000E' },
    { label: 'white on btn(#9333EA)', fg: '#FFFFFF', bg: '#9333EA' },
    { label: 'skip-link',          fg: '#F5F5F5', bg: '#1A1A1A' },
    { label: 'white on wa(#15803d)', fg: '#FFFFFF', bg: '#15803d' },
  ]),
  check('linka-light', [
    { label: 'text on bg',         fg: '#1A0033', bg: '#FAF5FF' },
    { label: 'muted on bg',        fg: '#5B3F80', bg: '#FAF5FF' },
    { label: 'white on btn(#7C3AED)', fg: '#FFFFFF', bg: '#7C3AED' },
    { label: 'skip-link',          fg: '#F5F5F5', bg: '#1A1A1A' },
    { label: 'white on wa(#15803d)', fg: '#FFFFFF', bg: '#15803d' },
  ]),
  check('pixelart', [
    { label: 'text on bg',         fg: '#F0F0F0', bg: '#0A0A0A' },
    { label: 'muted on bg',        fg: '#AAAAAA', bg: '#0A0A0A' },
    { label: 'black on btn(#FFD700)', fg: '#000000', bg: '#FFD700' },
    { label: 'white on wa(#15803d)', fg: '#FFFFFF', bg: '#15803d' },
  ]),
  check('dos', [
    { label: 'text on bg',         fg: '#AAAAAA', bg: '#000000' },
    { label: 'white on accent(#00AA00)', fg: '#FFFFFF', bg: '#00AA00', large: true },
    { label: 'white on wa(#15803d)', fg: '#FFFFFF', bg: '#15803d' },
  ]),
  check('geocities', [
    { label: 'magenta on bg',      fg: '#FF00FF', bg: '#000080' },
    { label: 'yellow on bg',       fg: '#FFFF00', bg: '#000080' },
    { label: 'white on bg',        fg: '#FFFFFF', bg: '#000080' },
    { label: 'white on wa(#15803d)', fg: '#FFFFFF', bg: '#15803d' },
  ]),
  check('copa/brasil', [
    { label: 'text on bg',         fg: '#1A1A1A', bg: '#F5F5DC' },
    { label: 'white on green btn', fg: '#FFFFFF', bg: '#00661A' },
    { label: 'white on wa(#15803d)', fg: '#FFFFFF', bg: '#15803d' },
  ]),
  check('brutalist', [
    { label: 'text on bg',         fg: '#0A0A0A', bg: '#F5F0E8' },
    { label: 'muted on bg',        fg: '#333333', bg: '#F5F0E8' },
    { label: 'white on btn(#000)', fg: '#FFFFFF', bg: '#000000' },
    { label: 'white on wa(#000)',  fg: '#FFFFFF', bg: '#000000' },
  ]),
  check('saas', [
    { label: 'text on bg',         fg: '#0F172A', bg: '#F8FAFC' },
    { label: 'muted on bg',        fg: '#334155', bg: '#F8FAFC' },
    { label: 'subtle on bg',       fg: '#64748B', bg: '#F8FAFC' },
    { label: 'white on btn(#0B7A71)', fg: '#FFFFFF', bg: '#0B7A71' },
    { label: 'white on btn(#096B63)', fg: '#FFFFFF', bg: '#096B63' },
    { label: 'white on wa(#15803d)', fg: '#FFFFFF', bg: '#15803d' },
  ]),
  check('glass/indigo', [
    { label: 'text on bg',         fg: '#F1F5F9', bg: glassDark },
    { label: 'muted on bg',        fg: '#94A3B8', bg: glassDark },
    { label: `white on btn purple(${glassBtnPurple})`, fg: '#FFFFFF', bg: glassBtnPurple },
    { label: `white on btn blue(${glassBtnBlue})`,     fg: '#FFFFFF', bg: glassBtnBlue },
    { label: 'white on wa(#15803d)', fg: '#FFFFFF', bg: '#15803d' },
  ]),
  check('notion/clean', [
    { label: 'text on bg',         fg: '#37352F', bg: '#FFFFFF' },
    { label: 'muted on bg',        fg: '#6B6B6B', bg: '#FFFFFF' },
    { label: 'white on btn(#111)', fg: '#FFFFFF', bg: '#111111' },
    { label: 'accent link on bg',  fg: '#2383E2', bg: '#FFFFFF', large: true },
    { label: 'white on wa(#15803d)', fg: '#FFFFFF', bg: '#15803d' },
  ]),
  check('militar', [
    { label: 'text on bg',         fg: '#C8D8A8', bg: '#0A1208' },
    { label: 'muted on bg',        fg: '#8A9E6A', bg: '#0A1208' },
    { label: 'dark on accent btn', fg: '#060D04', bg: '#39FF14' },
    { label: 'white on wa(#15803d)', fg: '#FFFFFF', bg: '#15803d' },
  ]),
];

let hasFailure = false;
for (const { theme, results } of themes) {
  const fails = results.filter(r => !r.pass);
  console.log(`\n── ${theme.toUpperCase()} ─────────────────`);
  for (const r of results) {
    const icon = r.pass ? '✅' : '❌';
    const note = r.pass ? '' : `  ← needs ${r.min}:1`;
    console.log(`  ${icon} ${r.label.padEnd(20)} ${r.fg} on ${r.bg}  →  ${r.ratio}:1${note}`);
  }
  if (fails.length) hasFailure = true;
}

console.log('\n' + (hasFailure ? '⚠️  Some pairs FAIL WCAG AA.' : '✅ All pairs pass WCAG AA.'));
