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
    'skills.certs':     'Certifications',
    'skills.exploring': 'Exploring',
    'skills.design':    'Design',
    // Projects
    'projects.label':    'projects',
    'projects.title':    "What I've built",
    'projects.soon':     'Projects coming soon…',
    'projects.personal': 'Personal projects',
    'projects.clients':  'Freelance work',
    'project.snake.desc':   'Snake game for the Windows console where the terminal sheds all its properties to become a custom software renderer via the Win32 API. Dynamic Game Talker NPC, top‑3 leaderboard with persistent record storage, and modular four-library architecture.',
    'project.engine.desc':  '3D raycasting engine rendered entirely in ASCII, applying the terminal-as-renderer technique developed in Console Snake. Implements the DDA algorithm for ray-stepping, distance fog, head-bobbing, a minimap with direction indicator, and 24-bit ANSI colour gradients.',
    'project.finance.desc': 'Full-stack stock portfolio web app. Secure register & login with password hashing, real-time stock quote lookup, buy/sell shares, and a full transaction history backed by SQLite.',
    'project.male.desc':    'Professional website for a practicing dermatologist in Buenos Aires. Full technical SEO (Schema.org structured data, Open Graph, sitemap), WhatsApp appointment booking integration, and responsive mobile-first design. Live on Netlify.',
    'project.korund.desc':  'Corporate website for Korund S.A., an Argentine manufacturer of industrial abrasive wheels. Product catalogue with downloadable technical PDFs, Google Maps integration, multi-device responsive design, and SEO optimisation. Live on Netlify.',
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
    'skills.certs':     'Certificándome',
    'skills.exploring': 'Explorando',
    'skills.design':    'Diseño',
    // Projects
    'projects.label':    'proyectos',
    'projects.title':    'Lo que construí',
    'projects.soon':     'Proyectos próximamente…',
    'projects.personal': 'Proyectos personales',
    'projects.clients':  'Trabajo freelance',
    'project.snake.desc':   'Juego Snake para la consola de Windows donde la terminal pierde todas sus propiedades para convertirse en un renderer de software custom vía Win32 API. Game Talker dinámico, scoreboard con top‑3, registro de récords persistente y arquitectura modular en cuatro librerías.',
    'project.engine.desc':  'Motor de raycasting 3D renderizado completamente en ASCII, aplicando lo aprendido en Console Snake para usar la terminal como renderer. Implementa el algoritmo DDA para proyección de rayos, niebla de distancia, head‑bobbing, minimapa con indicador de dirección y gradientes de color ANSI de 24 bits.',
    'project.finance.desc': 'Aplicación web full‑stack de gestión de cartera de acciones. Incluye registro e inicio de sesión con hash de contraseñas, consulta de cotizaciones en tiempo real, compra y venta de acciones, e historial de transacciones persistido en SQLite.',
    'project.male.desc':    'Sitio web profesional para una dermatóloga con consultorio en Pilar y Núñez, Buenos Aires. SEO técnico completo con datos estructurados Schema.org, Open Graph y sitemap. Integración de turnos vía WhatsApp y diseño responsive mobile‑first. Activo en producción.',
    'project.korund.desc':  'Sitio corporativo para Korund S.A., fabricante argentino de ruedas abrasivas industriales. Catálogo de productos con fichas técnicas descargables en PDF, integración con Google Maps, diseño responsive multi‑dispositivo y optimización SEO. Activo en Netlify.',
    // Contact
    'contact.label': 'contacto',
    'contact.title': 'Hablemos',
    'contact.sub':   'Disponible para oportunidades junior y pasantías en tech.',
    'contact.cv':    'Descargar CV',
  },
};

let currentLang = 'es';

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

// Apply default language on load
applyLang('es');
