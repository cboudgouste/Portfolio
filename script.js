// ============================================
// a) TEMA DEL SISTEMA Y PREFERENCIA MANUAL
// ============================================
const toggleBtn = document.getElementById('toggle-tema');
const body = document.body;
const preferenciaSistema = window.matchMedia('(prefers-color-scheme: dark)');
let temaGuardado = localStorage.getItem('tema');

function aplicarTema(esOscuro) {
  body.classList.toggle('dark-mode', esOscuro);
  toggleBtn.textContent = esOscuro ? '☀️' : '🌙';
  toggleBtn.setAttribute('aria-label', esOscuro ? 'Activar modo claro' : 'Activar modo oscuro');
  toggleBtn.setAttribute('aria-pressed', String(esOscuro));
}

aplicarTema(temaGuardado ? temaGuardado === 'oscuro' : preferenciaSistema.matches);

toggleBtn.addEventListener('click', () => {
  const esOscuro = !body.classList.contains('dark-mode');
  aplicarTema(esOscuro);
  localStorage.setItem('tema', esOscuro ? 'oscuro' : 'claro');
  temaGuardado = esOscuro ? 'oscuro' : 'claro';
});

preferenciaSistema.addEventListener('change', (evento) => {
  if (temaGuardado === null) {
    aplicarTema(evento.matches);
  }
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

function mostrarMensajeExito(nombre) {
  return new Promise((resolve) => {
    const nombreFormateado = nombre.trim();
    exitoMensaje.textContent = `Gracias ${nombreFormateado}, por comunicarte conmigo. A la brevedad te contestaré tu mensaje.`;
    exitoMensaje.classList.add('visible');

    setTimeout(() => {
      resolve();
    }, 150);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombreOk = validarNombre();
  const emailOk = validarEmail();
  const mensajeOk = validarMensaje();

  if (nombreOk && emailOk && mensajeOk) {
    const nombreContacto = campoNombre.value.trim();
    await mostrarMensajeExito(nombreContacto);
  } else {
    exitoMensaje.classList.remove('visible');
  }
});

// ============================================
// c) CLIMA DE TANDIL (API pública sin key)
// ============================================
const ciudadClima = 'Tandil';
const coordenadasClima = {
  latitud: -37.321,
  longitud: -59.133
};

const climaElemento = document.getElementById('clima');

function obtenerTextoClima(codigo) {
  const climaPorCodigo = {
    0: 'Despejado',
    1: 'Mayormente despejado',
    2: 'Parcialmente nublado',
    3: 'Nublado',
    45: 'Niebla',
    48: 'Niebla con escarcha',
    51: 'Llovizna ligera',
    53: 'Llovizna moderada',
    55: 'Llovizna intensa',
    56: 'Llovizna helada ligera',
    57: 'Llovizna helada intensa',
    61: 'Lluvia ligera',
    63: 'Lluvia moderada',
    65: 'Lluvia fuerte',
    66: 'Lluvia helada ligera',
    67: 'Lluvia helada intensa',
    71: 'Nevada ligera',
    73: 'Nevada moderada',
    75: 'Nevada fuerte',
    77: 'Granizo',
    80: 'Lluvias aisladas',
    81: 'Lluvia fuerte',
    82: 'Lluvia muy fuerte',
    85: 'Nevadas leves',
    86: 'Nevadas fuertes',
    95: 'Tormenta',
    96: 'Tormenta con granizo',
    99: 'Tormenta con granizo intenso'
  };

  return climaPorCodigo[codigo] || 'Condiciones variables';
}

function obtenerIconoClima(codigo) {
  const iconos = {
    0: '☀️',
    1: '🌤️',
    2: '⛅',
    3: '☁️',
    45: '🌫️',
    48: '🌫️',
    51: '🌦️',
    53: '🌦️',
    55: '🌧️',
    56: '🌧️',
    57: '🌧️',
    61: '🌦️',
    63: '🌧️',
    65: '🌧️',
    66: '🌧️',
    67: '🌧️',
    71: '🌨️',
    73: '🌨️',
    75: '❄️',
    77: '❄️',
    80: '🌦️',
    81: '🌧️',
    82: '🌧️',
    85: '❄️',
    86: '❄️',
    95: '⛈️',
    96: '⛈️',
    99: '⛈️'
  };

  return iconos[codigo] || '🌤️';
}

async function obtenerClimaTandil() {
  if (!climaElemento) return;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${coordenadasClima.latitud}&longitude=${coordenadasClima.longitud}&current=temperature_2m,weather_code&timezone=auto&language=es`;

  climaElemento.setAttribute('aria-busy', 'true');
  climaElemento.textContent = 'Actualizando clima...';

  try {
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const data = await respuesta.json();
    const temperatura = data.current?.temperature_2m ?? 'N/A';
    const codigo = data.current?.weather_code ?? 0;
    const descripcion = obtenerTextoClima(codigo);
    const icono = obtenerIconoClima(codigo);
    const hora = data.current?.time?.split('T')[1]?.slice(0, 5) ?? '--:--';

    climaElemento.innerHTML = `
      <div class="clima-linea-principal">
        <span class="clima-emoji">${icono}</span>
        <span class="clima-temp">${temperatura}°C</span>
      </div>
      <span class="clima-texto">${descripcion}</span>
      <span class="clima-ciudad">${ciudadClima}</span>
      <span class="clima-hora">Hora local: ${hora}</span>
    `;
    climaElemento.setAttribute('aria-busy', 'false');
  } catch (error) {
    console.error('No se pudo cargar el clima:', error);
    climaElemento.innerHTML = `
      <div class="clima-linea-principal">
        <span class="clima-emoji">🌦️</span>
        <span class="clima-temp">--°C</span>
      </div>
      <span class="clima-texto">No se pudo cargar el clima</span>
      <span class="clima-ciudad">${ciudadClima}</span>
    `;
    climaElemento.setAttribute('aria-busy', 'false');
  }
}

obtenerClimaTandil();

// ============================================
// c) SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const destinoId = link.getAttribute('href');

    if (!destinoId || destinoId === '#') {
      return;
    }

    e.preventDefault();
    const destino = document.querySelector(destinoId);
    if (destino) {
      destino.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

