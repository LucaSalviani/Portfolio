// === Animated particle-grid background ===
// Each "node" drifts slowly; nearby nodes are connected by faint lines.
// This is a classic "network graph" effect — fitting for a systems engineer!

const canvas = document.getElementById('bg-canvas');
const ctx    = canvas.getContext('2d');

const ACCENT  = '0, 229, 255';   // matches --accent  in style.css
const ACCENT2 = '123, 97, 255';  // matches --accent2 in style.css
const NODE_COUNT = 55;
const MAX_DIST   = 160;
const SPEED      = 0.35;

let nodes = [];
let W, H;

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

function randomNode() {
  return {
    x:  Math.random() * W,
    y:  Math.random() * H,
    vx: (Math.random() - 0.5) * SPEED,
    vy: (Math.random() - 0.5) * SPEED,
    r:  Math.random() * 1.5 + 0.8,
    hue: Math.random() > 0.5 ? ACCENT : ACCENT2,
  };
}

function init() {
  resize();
  nodes = Array.from({ length: NODE_COUNT }, randomNode);
}

function draw() {
  ctx.clearRect(0, 0, W, H);

  // Update positions (wrap around edges)
  for (const n of nodes) {
    n.x += n.vx;
    n.y += n.vy;
    if (n.x < -10) n.x = W + 10;
    if (n.x > W + 10) n.x = -10;
    if (n.y < -10) n.y = H + 10;
    if (n.y > H + 10) n.y = -10;
  }

  // Draw connections
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MAX_DIST) {
        const alpha = (1 - dist / MAX_DIST) * 0.4;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(${a.hue}, ${alpha})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }

  // Draw nodes
  for (const n of nodes) {
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${n.hue}, 0.75)`;
    ctx.fill();
  }

  requestAnimationFrame(draw);
}

window.addEventListener('resize', resize);
init();
draw();


// ── LANGUAGE TOGGLE ──

const translations = {
  en: {
    // Nav
    'nav.about':    'About',
    'nav.projects': 'Projects',
    'nav.contact':  'Contact',
    // Hero
    'hero.label':   'Systems Engineering Student',
    'hero.role':    'I build things that <strong>run, connect, and scale</strong>.<br/>UTN Systems Engineering student — looking for my first professional opportunity in tech.',
    'hero.cta':     'View my work',
    'hero.photo':   'your photo here',
    'hero.scroll':  'scroll',
    // About
    'about.label':  'about',
    'about.title':  'Who I am',
    'about.p1':     "I'm a Systems Engineering student at UTN Buenos Aires, halfway through my degree and eager to join a team where I can contribute with commitment and a positive attitude.",
    'about.p2':     "I enjoy challenges, adapt quickly to new environments, and love picking up new technologies. Currently working as a private tutor in English, physics, math, and programming — an experience that sharpened my ability to communicate complex ideas clearly.",
    'skills.languages': 'Languages',
    'skills.tools':     'Frameworks & Tools',
    'skills.learning':  'Currently learning',
    'skills.design':    'Design',
    // Projects
    'projects.label': 'projects',
    'projects.title': "What I've built",
    'projects.soon':  'Projects coming soon…',
    // Contact
    'contact.label': 'contact',
    'contact.title': "Let's talk",
    'contact.sub':   "Open to junior and internship opportunities in tech. Let's build something.",
    'contact.cv':    'Download CV',
  },
  es: {
    // Nav
    'nav.about':    'Sobre mí',
    'nav.projects': 'Proyectos',
    'nav.contact':  'Contacto',
    // Hero
    'hero.label':   'Estudiante de Ingeniería en Sistemas',
    'hero.role':    'Construyo cosas que <strong>corren, conectan y escalan</strong>.<br/>Estudiante de Ingeniería en Sistemas en la UTN — buscando mi primera oportunidad profesional en tech.',
    'hero.cta':     'Ver mi trabajo',
    'hero.photo':   'tu foto aquí',
    'hero.scroll':  'bajar',
    // About
    'about.label':  'sobre mí',
    'about.title':  'Quién soy',
    'about.p1':     'Soy estudiante de Ingeniería en Sistemas en la UTN Buenos Aires, al 50% de la carrera, con ganas de incorporarme a un equipo donde pueda aportar con compromiso y actitud positiva.',
    'about.p2':     'Disfruto los desafíos, me adapto rápido a nuevos entornos y me apasiona aprender tecnologías nuevas. Actualmente trabajo como profesor particular de inglés, física, matemática y programación — una experiencia que potenció mi capacidad de comunicar ideas complejas con claridad.',
    'skills.languages': 'Lenguajes',
    'skills.tools':     'Frameworks y Herramientas',
    'skills.learning':  'Actualmente aprendiendo',
    'skills.design':    'Diseño',
    // Projects
    'projects.label': 'proyectos',
    'projects.title': 'Lo que construí',
    'projects.soon':  'Proyectos próximamente…',
    // Contact
    'contact.label': 'contacto',
    'contact.title': 'Hablemos',
    'contact.sub':   'Disponible para oportunidades junior y pasantías en tech.',
    'contact.cv':    'Descargar CV',
  },
};

let currentLang = 'en';

function applyLang(lang) {
  const t = translations[lang];

  // Update all tagged elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  // Update <html lang> attribute for accessibility
  document.documentElement.setAttribute('lang', lang);

  // Flip the button labels
  const btn = document.getElementById('lang-toggle');
  const [active, , inactive] = btn.children;
  active.textContent   = lang.toUpperCase();
  inactive.textContent = lang === 'en' ? 'ES' : 'EN';

  currentLang = lang;
}

document.getElementById('lang-toggle').addEventListener('click', () => {
  applyLang(currentLang === 'en' ? 'es' : 'en');
});
