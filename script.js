/* ==========================================================================
   TEBA TRAVEL · interacción
   ========================================================================== */

// -------- Configuración editable --------
// Cambia estos datos por los reales de Teba Travel.
const TEBA = {
  whatsapp: '573015750028',            // número con código de país, sin + ni espacios
  email:    'reservastebatravel@gmail.com',
  waMsgDefault: 'Hola Teba 👋, quiero información sobre un viaje.'
};

// -------- Utilidades --------
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

// -------- Año en el footer --------
$('#year').textContent = new Date().getFullYear();

// -------- Enlaces de WhatsApp --------
function waLink(msg) {
  return `https://wa.me/${TEBA.whatsapp}?text=${encodeURIComponent(msg || TEBA.waMsgDefault)}`;
}
['#waFloat', '#waButton'].forEach(id => { const el = $(id); if (el) el.href = waLink(); });

// -------- Header al hacer scroll --------
const header = $('.header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// -------- Menú móvil --------
const nav = $('.nav');
const toggle = $('#navToggle');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
});
// Cerrar al hacer clic en un enlace
$$('#navLinks a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
}));

// -------- Reveal al hacer scroll --------
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
$$('.reveal').forEach((el, i) => { el.style.transitionDelay = `${(i % 3) * 60}ms`; io.observe(el); });

// -------- Formulario de cotización --------
const form = $('#quoteForm');
const msg  = $('#formMsg');

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());

  // Validación mínima
  if (!data.nombre?.trim() || !data.correo?.trim()) {
    showMsg('Por favor completa tu nombre y correo para poder responderte.');
    return;
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.correo)) {
    showMsg('El correo no parece válido. Revísalo, por favor.');
    return;
  }

  const subject = `Cotización · ${data.servicio} · ${data.tipo}`;
  const body = [
    `Nombre: ${data.nombre}`,
    `Tipo de cliente: ${data.tipo}`,
    `Correo: ${data.correo}`,
    `Teléfono: ${data.telefono || '—'}`,
    `Servicio: ${data.servicio}`,
    '',
    'Detalles del viaje:',
    data.mensaje || '—'
  ].join('\n');

  // Abre el cliente de correo con todo listo
  window.location.href =
    `mailto:${TEBA.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  showMsg('Abrimos tu correo con la solicitud lista. Si prefieres, también puedes enviárnosla por WhatsApp.');

  // Actualiza el botón de WhatsApp con el detalle del viaje
  const waBtn = $('#waButton');
  if (waBtn) waBtn.href = waLink(
    `Hola Teba 👋, soy ${data.nombre}. Quiero cotizar: ${data.servicio}. ${data.mensaje || ''}`.trim()
  );
});

function showMsg(text) {
  msg.textContent = text;
  msg.classList.add('is-visible');
}
