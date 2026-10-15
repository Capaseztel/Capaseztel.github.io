// Solo JS vanilla — sin frameworks
const $ = (s) => document.querySelector(s);

// Año
$("#year").textContent = new Date().getFullYear();

// Nav móvil + scroll
const links = $("#navLinks");
$("#burger").addEventListener("click", () => links.classList.toggle("open"));
links.addEventListener("click", (e) => { if (e.target.tagName === "A") links.classList.remove("open"); });

const prog = $("#progress");
addEventListener("scroll", () => {
  const h = document.documentElement;
  prog.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + "%";
}, { passive: true });

// Glow cursor
const glow = $("#cursorGlow");
addEventListener("pointermove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
}, { passive: true });

// Máquina de escribir
const words = ["Desarrollador Web", "FullStack Java", "Spring Boot + Angular", "Flutter Developer"];
let wi = 0, ci = 0, del = false;
const el = $("#typed");
(function type() {
  const w = words[wi];
  el.textContent = w.slice(0, ci);
  if (!del && ci < w.length) { ci++; setTimeout(type, 70); }
  else if (!del) { del = true; setTimeout(type, 1200); }
  else if (ci > 0) { ci--; setTimeout(type, 35); }
  else { del = false; wi = (wi + 1) % words.length; setTimeout(type, 300); }
})();

// Reveal on scroll
const io = new IntersectionObserver((es) =>
  es.forEach(e => e.isIntersecting && e.target.classList.add("visible")),
  { threshold: .12 });
document.querySelectorAll(".reveal").forEach(n => io.observe(n));

// Iconos monocolor sólidos (stroke, 24px, estilo serio)
const I = (inner) => `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
const ICONS = {
  java: I('<path d="M17 8h1a3 3 0 1 1 0 6h-1"/><path d="M4 8h13v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4Z"/><path d="M7 2v2M11 2v2M15 2v2"/>'),
  spring: I('<path d="M5 19C5 9 13 5 20 5c0 8-4 14-13 14Z"/><path d="M5 19c3-5 7-9 11-11"/>'),
  shield: I('<path d="M12 3l7 3v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6Z"/><path d="m9.5 12 2 2 3.5-4"/>'),
  db: I('<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>'),
  nodes: I('<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M8 7.5l3 8M16 7.5l-3 8M8.5 6h7"/>'),
  code: I('<path d="m8 8-4 4 4 4M16 8l4 4-4 4"/>'),
  ts: I('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M10 9h4M12 9v6"/>'),
  angular: I('<path d="M12 3 3 8l9 13 9-13Z"/><path d="M8.5 12h7"/>'),
  css: I('<path d="M4 4h16l-1.5 13-6.5 2-6.5-2Z"/><path d="M9 8h6M9 12h6M11 16h2"/>'),
  phone: I('<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>'),
  snake: I('<path d="M9 3h6a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4h-2v3h-2v-3H9a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Z"/><circle cx="10" cy="8" r=".6" fill="currentColor"/>'),
  cube: I('<path d="M12 2 3 7v10l9 5 9-5V7Z"/><path d="M3 7l9 5 9-5M12 12v10"/>'),
};
// Stack con niveles
const STACK = [
  { n: "Java", c: "backend", l: 90, i: ICONS.java },
  { n: "Spring Boot", c: "backend", l: 85, i: ICONS.spring },
  { n: "Spring Security", c: "backend", l: 78, i: ICONS.shield },
  { n: "MySQL", c: "backend", l: 82, i: ICONS.db },
  { n: "SOA / OSB", c: "backend", l: 70, i: ICONS.nodes },
  { n: "JavaScript", c: "frontend", l: 85, i: ICONS.code },
  { n: "TypeScript", c: "frontend", l: 80, i: ICONS.ts },
  { n: "Angular", c: "frontend", l: 82, i: ICONS.angular },
  { n: "HTML + CSS", c: "frontend", l: 90, i: ICONS.css },
  { n: "Flutter", c: "mobile", l: 65, i: ICONS.phone },
  { n: "Python", c: "mobile", l: 72, i: ICONS.snake },
  { n: "Unity", c: "mobile", l: 60, i: ICONS.cube },
];
const grid = $("#stackGrid");
function renderStack(f = "all") {
  grid.innerHTML = STACK.filter(s => f === "all" || s.c === f).map(s => `
    <div class="stack"><div class="ico">${s.i}</div><b>${s.n}</b>
    <small>${s.c}</small><div class="bar"><i style="width:${s.l}%"></i></div></div>
  `).join("");
}
renderStack();
$("#stackFilters").addEventListener("click", (e) => {
  const b = e.target.closest("button"); if (!b) return;
  document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
  b.classList.add("active"); renderStack(b.dataset.f);
});

// Form -> mailto
$("#contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const s = encodeURIComponent("Contacto Portfolio de " + f.get("nombre"));
  const b = encodeURIComponent(f.get("msg") + "\n\n— " + f.get("nombre") + " (" + f.get("email") + ")");
  location.href = `mailto:manueljesus10.mjcp@gmail.com?subject=${s}&body=${b}`;
  $("#formMsg").textContent = "Abriendo tu cliente de email... ¡gracias!";
});
