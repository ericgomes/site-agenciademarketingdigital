// ── Nav scroll ──────────────────────────────────────────────
const nav = document.getElementById('navbar');
const html = document.documentElement;

function applyTheme(t) {
  html.setAttribute('data-theme', t);
}

// ── Theme CSS lazy loader ────────────────────────────────────
const themeCssMap = {
  pixelart: 'pixelart.css',
  dos:      'dos.css',
  geocities:'geocities.css',
  copa:     'copa.css',
  brutalist:'brutalist.css',
  saas:     'saas.css',
  glass:    'glass.css',
  notion:   'notion.css',
};
const loadedThemes = new Set();

function loadThemeCss(v) {
  const file = themeCssMap[v];
  if (!file || loadedThemes.has(file)) return;
  loadedThemes.add(file);
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = file;
  document.head.appendChild(link);
}

// ── Visual switcher (dropdown) ───────────────────────────────
const visualSwitcher = document.getElementById('visual-switcher');
const visualTrigger  = document.getElementById('visual-trigger');
const visualLabel    = document.getElementById('visual-label');

function applyVisual(v) {
  loadThemeCss(v);
  if (v === 'linka-dark')  applyTheme('dark');
  if (v === 'linka-light') applyTheme('light');
  html.setAttribute('data-visual', (v === 'linka-dark' || v === 'linka-light') ? 'linka' : v);

  document.querySelectorAll('.visual-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.visual === v)
  );
  const activeBtn = document.querySelector(`.visual-btn[data-visual="${v}"]`);
  if (activeBtn) visualLabel.textContent = activeBtn.textContent.trim();

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
  const urlTema  = new URLSearchParams(location.search).get('tema');
  const saved    = localStorage.getItem('linka-visual');
  applyVisual(urlTema || (saved === 'default' ? 'linka-light' : (saved || 'linka-light')));
} catch(e) { applyVisual('linka-light'); }

// ── Translations ─────────────────────────────────────────────
const translations = {
  pt: {
    // Nav
    navSobre:   'Sobre',
    navComo:    'Como trabalhamos',
    navEsp:     'Especialidades',
    navContato: 'Contato',

    // Hero
    heroBadge:    'Sócios desde 2013 · SEO & Tráfego Pago',
    heroH1:       'Maximizando <em>ROI</em><br>com Marketing Digital',
    heroSub:      'Eric Gomes e Marcelo Caricati atendem — e executam — diretamente. PMEs, médias e grandes empresas, e-commerce e geração de leads. Sem equipes, sem intermediários.',
    heroBtnEric:  'Falar com Eric →',
    heroBtnMarcelo: 'Falar com Marcelo',

    // Expert Eric
    ericRole:   'Co-fundador · SEO, Tecnologia & Dados',
    ericBio:    'Ciência da Computação pela PUC-SP. Atua em SEO técnico, Google Tag Manager, atribuição, automações via Google Apps Script e APIs, RD Station e Looker Studio.',
    ericBtnCal: 'Agendar 30 min',

    // Expert Marcelo
    marceloRole: 'Co-fundador · Tráfego Pago & Performance',
    marceloBio:  'MBA em Marketing, certificado Google Ads. Especialista em gestão e otimização de campanhas de tráfego pago e dashboards de performance em Looker Studio.',

    // Sobre
    sobreEye:   'Quem somos',
    sobreTitle: 'Especialistas, não<br>uma fábrica de clientes',
    sobreSub:   'Mais de 300 clientes atendidos desde 2007. PMEs, médias e grandes empresas — em e-commerce e geração de leads.',
    sobreP1:    '<strong>Clientes conosco há mais de 15 anos</strong> são a prova mais concreta do nosso modelo: parceria real, não relação de fornecedor. Quem entra na nossa carteira recebe dedicação completa — e quem fica, cresce.',
    sobreP2:    'Não atendemos a todos. Escolhemos onde colocar energia, e entregamos com responsabilidade. Cada cliente é acompanhado diretamente por Eric e Marcelo — sem repassar para equipes.',
    sobreQuote: '"Não somos uma agência de volume. Somos parceiros que escolhem onde colocar energia e entregam com responsabilidade."',

    // Timeline
    tl1Title: 'Marcelo abre sua agência',
    tl1Desc:  'Início da trajetória em marketing digital com foco em tráfego pago e performance.',
    tl2Title: 'Eric abre sua agência',
    tl2Desc:  'Formado em Ciência da Computação, Eric estrutura sua operação com foco em SEO e tecnologia.',
    tl3Title: 'União e fundação da Linka',
    tl3Desc:  'As duas trajetórias se unem: SEO e tecnologia de um lado, tráfego pago do outro.',
    tl4Year:  'Hoje',
    tl4Title: 'Carteira exclusiva, resultados de longo prazo',
    tl4Desc:  'Mais de 300 clientes atendidos. Parceiros de longa data, foco total em resultado mensurável.',

    // Como trabalhamos
    comoEye:   'Como trabalhamos',
    comoTitle: 'Você fala com quem faz.<br>Sem intermediários.',
    comoSub:   'Eric e Marcelo atendem, planejam e executam diretamente. Sem equipes entre você e quem entende do assunto.',
    m1Title: 'Execução direta, sem filtros',
    m1Desc:  'O planejamento, a execução e o atendimento são feitos por Eric e Marcelo — sem terceirização, sem intermediários, sem perda de contexto entre quem decide e quem faz.',
    m2Title: 'Maturidade de quem tem história',
    m2Desc:  'Dois profissionais com mais de 15 anos de especialização cada. Bagagem acumulada em mais de 300 clientes, dos mais variados segmentos e portes.',
    m3Title: 'Seleção criteriosa',
    m3Desc:  'Trabalhamos com clientes cujos objetivos se alinham ao nosso perfil — e para os quais temos certeza de entregar resultado real.',
    m4Title: 'Resultado mensurável',
    m4Desc:  'Métricas que importam para o negócio. Dashboards em Looker Studio para todos os clientes, sem exceção.',

    // Especialidades
    espEye:  'Especialidades',
    espTitle: 'O que fazemos',
    espSub:  'Duas frentes complementares que cobrem toda a jornada do seu cliente digital.',
    seoEye:  'SEO · Tecnologia · Dados — Eric Gomes',
    seoTitle: 'Crescimento orgânico e inteligência de dados',
    seoDesc: 'SEO técnico combinado com automação, rastreamento e atribuição para decisões baseadas em dados reais.',
    seoLi1: 'SEO técnico e auditoria de site',
    seoLi2: 'Google Tag Manager e atribuição',
    seoLi3: 'Web Analytics e Google Search Console',
    seoLi4: 'RD Station CRM e automação de marketing',
    seoLi5: 'Typebot e integrações via API',
    seoLi6: 'Automações em Google Sheets via Apps Script',
    seoLi7: 'Dashboards em Looker Studio',
    paidEye:  'Tráfego Pago · Performance — Marcelo Caricati',
    paidTitle: 'Campanhas gerenciadas com precisão',
    paidDesc: 'Gestão e otimização de campanhas focadas em resultado real — cada real investido com estratégia e controle.',
    paidLi1: 'Google Ads Search e Performance Max',
    paidLi2: 'Meta Ads (Facebook e Instagram)',
    paidLi3: 'Otimização contínua de campanhas',
    paidLi4: 'Estratégia de funil e segmentação',
    paidLi5: 'Dashboards de performance em Looker Studio',
    gppTitle: 'Somos Google Premier Partners',
    gppDesc:  'O título Premier é concedido ao seleto grupo de agências no topo do desempenho em Google Ads — menos de 3% das agências parceiras no Brasil.',

    // Contato
    contatoEye:   'Contato',
    contatoTitle: 'Vamos conversar?',
    contatoDesc:  'Se você busca um parceiro sério — não apenas mais um fornecedor — fale diretamente com quem vai trabalhar no seu projeto.',
    ericRoleShort:    'SEO · Tecnologia · Dados',
    marceloRoleShort: 'Tráfego Pago · Performance',
  },

  en: {
    // Nav
    navSobre:   'About',
    navComo:    'How we work',
    navEsp:     'Services',
    navContato: 'Contact',

    // Hero
    heroBadge:    'Partners since 2013 · SEO & Paid Traffic',
    heroH1:       'Maximizing <em>ROI</em><br>with Digital Marketing',
    heroSub:      'Eric Gomes and Marcelo Caricati handle — and execute — everything directly. SMBs, mid-size and large companies, e-commerce and lead generation. No teams, no middlemen.',
    heroBtnEric:  'Talk to Eric →',
    heroBtnMarcelo: 'Talk to Marcelo',

    // Expert Eric
    ericRole:   'Co-founder · SEO, Technology & Data',
    ericBio:    'Computer Science degree from PUC-SP. Specializes in technical SEO, Google Tag Manager, attribution, automations via Google Apps Script and APIs, RD Station, and Looker Studio.',
    ericBtnCal: 'Schedule 30 min',

    // Expert Marcelo
    marceloRole: 'Co-founder · Paid Traffic & Performance',
    marceloBio:  'MBA in Marketing, Google Ads certified. Specialist in paid traffic campaign management and optimization, and performance dashboards in Looker Studio.',

    // Sobre
    sobreEye:   'About us',
    sobreTitle: 'Specialists, not<br>a client factory',
    sobreSub:   'Over 300 clients served since 2007. SMBs, mid-size and large companies — in e-commerce and lead generation.',
    sobreP1:    '<strong>Clients who have been with us for over 15 years</strong> are the most concrete proof of our model: a real partnership, not a vendor relationship. Those who join our portfolio get full dedication — and those who stay, grow.',
    sobreP2:    'We do not serve everyone. We choose where to put our energy, and we deliver with responsibility. Each client is managed directly by Eric and Marcelo — never handed off to teams.',
    sobreQuote: '"We are not a volume agency. We are partners who choose where to put their energy and deliver with responsibility."',

    // Timeline
    tl1Title: 'Marcelo opens his agency',
    tl1Desc:  'Start of his digital marketing journey focused on paid traffic and performance.',
    tl2Title: 'Eric opens his agency',
    tl2Desc:  'With a Computer Science degree, Eric builds his operation focused on SEO and technology.',
    tl3Title: 'Merger and founding of a new agency',
    tl3Desc:  'The two paths merge: SEO and technology on one side, paid traffic on the other.',
    tl4Year:  'Today',
    tl4Title: 'Exclusive portfolio, long-term results',
    tl4Desc:  'Over 300 clients served. Long-standing partners, full focus on measurable results.',

    // Como trabalhamos
    comoEye:   'How we work',
    comoTitle: 'You talk to the people who do the work.<br>No middlemen.',
    comoSub:   'Eric and Marcelo handle, plan, and execute directly. No teams between you and the people who know what they are doing.',
    m1Title: 'Direct execution, no filters',
    m1Desc:  'Planning, execution, and client management are all done by Eric and Marcelo — no outsourcing, no middlemen, no loss of context between who decides and who does.',
    m2Title: 'Maturity that comes from experience',
    m2Desc:  'Two professionals with over 15 years of specialization each. Experience accumulated across more than 300 clients from the most varied industries and sizes.',
    m3Title: 'Careful client selection',
    m3Desc:  'We work with clients whose goals align with our profile — and for whom we are confident we can deliver real results.',
    m4Title: 'Measurable results',
    m4Desc:  'Metrics that matter to the business. Looker Studio dashboards for every client, no exceptions.',

    // Especialidades
    espEye:  'Services',
    espTitle: 'What we do',
    espSub:  'Two complementary fronts that cover your digital customer\'s entire journey.',
    seoEye:  'SEO · Technology · Data — Eric Gomes',
    seoTitle: 'Organic growth and data intelligence',
    seoDesc: 'Technical SEO combined with automation, tracking, and attribution for decisions based on real data.',
    seoLi1: 'Technical SEO and site audits',
    seoLi2: 'Google Tag Manager and attribution',
    seoLi3: 'Web Analytics and Google Search Console',
    seoLi4: 'RD Station CRM and marketing automation',
    seoLi5: 'Typebot and API integrations',
    seoLi6: 'Google Sheets automations via Apps Script',
    seoLi7: 'Looker Studio dashboards',
    paidEye:  'Paid Traffic · Performance — Marcelo Caricati',
    paidTitle: 'Precisely managed campaigns',
    paidDesc: 'Campaign management and optimization focused on real results — every dollar invested with strategy and control.',
    paidLi1: 'Google Ads Search and Performance Max',
    paidLi2: 'Meta Ads (Facebook and Instagram)',
    paidLi3: 'Continuous campaign optimization',
    paidLi4: 'Funnel strategy and segmentation',
    paidLi5: 'Performance dashboards in Looker Studio',
    gppTitle: 'We are Google Premier Partners',
    gppDesc:  'The Premier title is awarded to the select group of agencies at the top of Google Ads performance — fewer than 3% of partner agencies in Brazil.',

    // Contato
    contatoEye:   'Contact',
    contatoTitle: 'Let\'s talk?',
    contatoDesc:  'If you are looking for a serious partner — not just another vendor — talk directly with the people who will work on your project.',
    ericRoleShort:    'SEO · Technology · Data',
    marceloRoleShort: 'Paid Traffic · Performance',
  },

  es: {
    // Nav
    navSobre:   'Nosotros',
    navComo:    'Cómo trabajamos',
    navEsp:     'Especialidades',
    navContato: 'Contacto',

    // Hero
    heroBadge:    'Socios desde 2013 · SEO y Tráfico Pago',
    heroH1:       'Maximizando el <em>ROI</em><br>con Marketing Digital',
    heroSub:      'Eric Gomes y Marcelo Caricati atienden — y ejecutan — directamente. PyMEs, medianas y grandes empresas, e-commerce y generación de leads. Sin equipos, sin intermediarios.',
    heroBtnEric:  'Hablar con Eric →',
    heroBtnMarcelo: 'Hablar con Marcelo',

    // Expert Eric
    ericRole:   'Cofundador · SEO, Tecnología y Datos',
    ericBio:    'Licenciado en Ciencias de la Computación por la PUC-SP. Especialista en SEO técnico, Google Tag Manager, atribución, automatizaciones con Google Apps Script y APIs, RD Station y Looker Studio.',
    ericBtnCal: 'Agendar 30 min',

    // Expert Marcelo
    marceloRole: 'Cofundador · Tráfico Pago y Performance',
    marceloBio:  'MBA en Marketing, certificado en Google Ads. Especialista en gestión y optimización de campañas de tráfico pago y dashboards de rendimiento en Looker Studio.',

    // Sobre
    sobreEye:   'Quiénes somos',
    sobreTitle: 'Especialistas, no<br>una fábrica de clientes',
    sobreSub:   'Más de 300 clientes atendidos desde 2007. PyMEs, medianas y grandes empresas — en e-commerce y generación de leads.',
    sobreP1:    '<strong>Clientes con nosotros durante más de 15 años</strong> son la prueba más concreta de nuestro modelo: una asociación real, no una relación de proveedor. Quienes se unen a nuestra cartera reciben dedicación total — y quienes se quedan, crecen.',
    sobreP2:    'No atendemos a todos. Elegimos dónde poner energía y entregamos con responsabilidad. Cada cliente es acompañado directamente por Eric y Marcelo — sin traspasar a equipos.',
    sobreQuote: '"No somos una agencia de volumen. Somos socios que eligen dónde poner su energía y entregan con responsabilidad."',

    // Timeline
    tl1Title: 'Marcelo abre su agencia',
    tl1Desc:  'Inicio del camino en marketing digital con foco en tráfico pago y performance.',
    tl2Title: 'Eric abre su agencia',
    tl2Desc:  'Con título en Ciencias de la Computación, Eric estructura su operación con foco en SEO y tecnología.',
    tl3Title: 'Unión y fundación de Linka',
    tl3Desc:  'Los dos caminos se unen: SEO y tecnología por un lado, tráfico pago por el otro.',
    tl4Year:  'Hoy',
    tl4Title: 'Cartera exclusiva, resultados a largo plazo',
    tl4Desc:  'Más de 300 clientes atendidos. Socios de larga data, enfoque total en resultados medibles.',

    // Como trabalhamos
    comoEye:   'Cómo trabajamos',
    comoTitle: 'Hablas con quien lo hace.<br>Sin intermediarios.',
    comoSub:   'Eric y Marcelo atienden, planifican y ejecutan directamente. Sin equipos entre tú y quienes saben de qué hablan.',
    m1Title: 'Ejecución directa, sin filtros',
    m1Desc:  'La planificación, la ejecución y la atención son realizadas por Eric y Marcelo — sin tercerización, sin intermediarios, sin pérdida de contexto entre quien decide y quien hace.',
    m2Title: 'Madurez de quien tiene historia',
    m2Desc:  'Dos profesionales con más de 15 años de especialización cada uno. Experiencia acumulada en más de 300 clientes de los más variados segmentos y tamaños.',
    m3Title: 'Selección rigurosa',
    m3Desc:  'Trabajamos con clientes cuyos objetivos se alinean con nuestro perfil — y para los cuales tenemos la certeza de entregar resultados reales.',
    m4Title: 'Resultados medibles',
    m4Desc:  'Métricas que importan para el negocio. Dashboards en Looker Studio para todos los clientes, sin excepción.',

    // Especialidades
    espEye:  'Especialidades',
    espTitle: 'Lo que hacemos',
    espSub:  'Dos frentes complementarios que cubren todo el recorrido de tu cliente digital.',
    seoEye:  'SEO · Tecnología · Datos — Eric Gomes',
    seoTitle: 'Crecimiento orgánico e inteligencia de datos',
    seoDesc: 'SEO técnico combinado con automatización, seguimiento y atribución para decisiones basadas en datos reales.',
    seoLi1: 'SEO técnico y auditoría de sitio',
    seoLi2: 'Google Tag Manager y atribución',
    seoLi3: 'Web Analytics y Google Search Console',
    seoLi4: 'RD Station CRM y automatización de marketing',
    seoLi5: 'Typebot e integraciones vía API',
    seoLi6: 'Automatizaciones en Google Sheets con Apps Script',
    seoLi7: 'Dashboards en Looker Studio',
    paidEye:  'Tráfico Pago · Performance — Marcelo Caricati',
    paidTitle: 'Campañas gestionadas con precisión',
    paidDesc: 'Gestión y optimización de campañas enfocadas en resultados reales — cada peso invertido con estrategia y control.',
    paidLi1: 'Google Ads Search y Performance Max',
    paidLi2: 'Meta Ads (Facebook e Instagram)',
    paidLi3: 'Optimización continua de campañas',
    paidLi4: 'Estrategia de embudo y segmentación',
    paidLi5: 'Dashboards de performance en Looker Studio',
    gppTitle: 'Somos Google Premier Partners',
    gppDesc:  'El título Premier es otorgado al selecto grupo de agencias en la cima del rendimiento en Google Ads — menos del 3% de las agencias asociadas en Brasil.',

    // Contato
    contatoEye:   'Contacto',
    contatoTitle: '¿Hablamos?',
    contatoDesc:  'Si buscas un socio serio — no solo otro proveedor — habla directamente con quienes trabajarán en tu proyecto.',
    ericRoleShort:    'SEO · Tecnología · Datos',
    marceloRoleShort: 'Tráfico Pago · Performance',
  },
};

// ── Lang switcher ────────────────────────────────────────────
function applyLang(l) {
  html.setAttribute('data-lang', l);
  const tx = translations[l] || translations.pt;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (tx[key] !== undefined) el.textContent = tx[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (tx[key] !== undefined) el.innerHTML = tx[key];
  });

  document.querySelectorAll('.lang-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.lang === l)
  );
  try { localStorage.setItem('linka-lang', l); } catch(e) {}
}

try {
  const urlLang  = new URLSearchParams(location.search).get('lang');
  const savedLang = localStorage.getItem('linka-lang');
  applyLang(urlLang || savedLang || 'pt');
} catch(e) { applyLang('pt'); }

document.querySelectorAll('.lang-btn').forEach(b => {
  b.addEventListener('click', () => applyLang(b.dataset.lang));
});

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
