// ============================================
// a) MODO OSCURO CON localStorage
// ============================================
const toggleBtn = document.getElementById('toggle-tema');
const body = document.body;

// Cargar preferencia guardada
if (localStorage.getItem('tema') === 'oscuro') {
  body.classList.add('dark-mode');
  toggleBtn.textContent = '☀️';
}

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const esOscuro = body.classList.contains('dark-mode');
  toggleBtn.textContent = esOscuro ? '☀️' : '🌙';
  localStorage.setItem('tema', esOscuro ? 'oscuro' : 'claro');
});

// ============================================
// b) VALIDACIÓN DE FORMULARIO
// ============================================
const form = document.getElementById('form-contacto');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();
  let errores = [];

  if (!nombre) errores.push('El nombre es obligatorio');
  if (!email || !email.includes('@')) errores.push('Ingresá un email válido');
  if (!mensaje) errores.push('El mensaje es obligatorio');

  if (errores.length > 0) {
    alert('Errores:\n' + errores.join('\n'));
  } else {
    alert('¡Mensaje enviado!');
    form.reset();
  }
});

// ============================================
// c) SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const destino = document.querySelector(link.getAttribute('href'));
    if (destino) {
      destino.scrollIntoView({ behavior: 'smooth' });
    }
  });
});