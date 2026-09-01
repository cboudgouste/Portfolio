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
// b) VALIDACIÓN DE FORMULARIO (en tiempo real)
// ============================================
const form = document.getElementById('form-contacto');
const campoNombre = document.getElementById('nombre');
const campoEmail = document.getElementById('email');
const campoMensaje = document.getElementById('mensaje');
const errorNombre = document.getElementById('error-nombre');
const errorEmail = document.getElementById('error-email');
const errorMensaje = document.getElementById('error-mensaje-campo');
const exitoMensaje = document.getElementById('exito-mensaje');

function validarNombre() {
  const valor = campoNombre.value.trim();
  if (!valor) {
    mostrarError(campoNombre, errorNombre, 'El nombre es obligatorio');
    return false;
  }
  limpiarError(campoNombre, errorNombre);
  return true;
}

function validarEmail() {
  const valor = campoEmail.value.trim();
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!valor) {
    mostrarError(campoEmail, errorEmail, 'El email es obligatorio');
    return false;
  }
  if (!regexEmail.test(valor)) {
    mostrarError(campoEmail, errorEmail, 'Ingresá un email válido');
    return false;
  }
  limpiarError(campoEmail, errorEmail);
  return true;
}

function validarMensaje() {
  const valor = campoMensaje.value.trim();
  if (!valor) {
    mostrarError(campoMensaje, errorMensaje, 'El mensaje es obligatorio');
    return false;
  }
  limpiarError(campoMensaje, errorMensaje);
  return true;
}

function mostrarError(campo, spanError, texto) {
  campo.classList.add('campo-invalido');
  spanError.textContent = texto;
}

function limpiarError(campo, spanError) {
  campo.classList.remove('campo-invalido');
  spanError.textContent = '';
}

// Validar cada campo apenas el usuario deja de tocarlo o escribe
campoNombre.addEventListener('blur', validarNombre);
campoEmail.addEventListener('blur', validarEmail);
campoMensaje.addEventListener('blur', validarMensaje);

campoNombre.addEventListener('input', () => {
  if (campoNombre.classList.contains('campo-invalido')) validarNombre();
});
campoEmail.addEventListener('input', () => {
  if (campoEmail.classList.contains('campo-invalido')) validarEmail();
});
campoMensaje.addEventListener('input', () => {
  if (campoMensaje.classList.contains('campo-invalido')) validarMensaje();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombreOk = validarNombre();
  const emailOk = validarEmail();
  const mensajeOk = validarMensaje();

  if (nombreOk && emailOk && mensajeOk) {
    exitoMensaje.textContent = 'Gracias por comunicarte conmigo, a la brevedad contestaré tu mensaje.';
    exitoMensaje.classList.add('visible');
    form.reset();
  } else {
    exitoMensaje.classList.remove('visible');
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