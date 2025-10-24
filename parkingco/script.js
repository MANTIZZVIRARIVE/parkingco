/* script.js
   Interactividad para parkingco:
   - Controla loader (fade-out)
   - Menú hamburguesa responsive
   - Smooth scroll en enlaces
   - Validación básica de formulario y mensaje de éxito
*/

/* ------------------ CARPETA DE ELEMENTOS ------------------ */
document.addEventListener('DOMContentLoaded', function () {

  // ELEMENTOS
  const loader = document.getElementById('loader');
  const hamburger = document.getElementById('btn-hamburger');
  const body = document.body;
  const navLinks = document.querySelectorAll('[data-link]');
  const nav = document.getElementById('nav') || document.querySelector('.nav');
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  const yearSpan = document.getElementById('year');

  // colocar año en footer
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  /* ------------------ LOADER (fade out) ------------------ */
  // Garantiza que el loader desaparezca cuando todo el contenido esté listo.
  // Simulamos una pequeña espera mínima para que se note la animación (si la página carga instant)
  window.setTimeout(function () {
    if (loader) {
      loader.classList.add('hidden');
      // opcional: remover del DOM después de la transición para mejor accesibilidad
      window.setTimeout(() => loader.style.display = 'none', 700);
    }
  }, 700); // 700ms mínimo antes de ocultar

  /* ------------------ HAMBURGER / NAV ------------------ */
  hamburger.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', (!expanded).toString());
    body.classList.toggle('nav-open');
  });

  // Cerrar nav móvil al hacer clic en un enlace
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      // si el link tiene href ancla, hacemos smooth scroll manualmente
      const href = this.getAttribute('href') || this.dataset.href;
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          // scroll suave
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // cerrar nav si estaba abierto en móvil
          if (body.classList.contains('nav-open')) {
            body.classList.remove('nav-open');
            hamburger.setAttribute('aria-expanded', 'false');
          }
        }
      } else {
        // si no es ancla, dejar comportamiento por defecto
      }
    });
  });

  /* ------------------ MAP SEARCH (interacción mínima) ------------------ */
  // El botón de búsqueda simplemente hace foco en iframe o muestra un aviso (puedes conectar con API si deseas)
  const btnSearch = document.getElementById('btn-search');
  const mapSearch = document.getElementById('map-search');
  btnSearch && btnSearch.addEventListener('click', function () {
    const q = (mapSearch && mapSearch.value) ? mapSearch.value.trim() : '';
    if (!q) {
      alert('Escribe una ubicación en el campo de búsqueda para explorar parkings cercanos.');
      return;
    }
    // comportamiento demo: sustituimos el src del iframe con una búsqueda genérica en Google Maps
    const iframe = document.querySelector('.map-responsive iframe');
    if (iframe) {
      // prepare safe query for embed (note: not a real Places API call)
      const encoded = encodeURIComponent(q);
      iframe.src = `https://www.google.com/maps?q=${encoded}&output=embed`;
    }
  });

  /* ------------------ FORM VALIDATION Y ENVÍO SIMULADO ------------------ */
  form && form.addEventListener('submit', function (e) {
    e.preventDefault();

    // limpiar feedback
    feedback.style.display = 'none';
    feedback.textContent = '';

    // obtener valores
    const name = form.querySelector('#name').value.trim();
    const phone = form.querySelector('#phone').value.trim();
    const email = form.querySelector('#email').value.trim();
    const category = form.querySelector('#category').value;
    const message = form.querySelector('#message').value.trim();
    const policy = form.querySelector('#policy').checked;

    // validaciones básicas
    const errors = [];
    if (!name) errors.push('Nombre es obligatorio.');
    if (!phone) errors.push('Teléfono es obligatorio.');
    if (!email) errors.push('Correo electrónico es obligatorio.');
    else if (!validateEmail(email)) errors.push('Formato de correo inválido.');
    if (!category) errors.push('Selecciona una categoría.');
    if (!message) errors.push('Escribe un mensaje.');
    if (!policy) errors.push('Debes aceptar las políticas de tratamiento de datos.');

    if (errors.length) {
      // mostrar errores (conciso)
      feedback.style.display = 'block';
      feedback.style.color = '#c0392b';
      feedback.textContent = errors.join(' ');
      return;
    }

    // Simular envío exitoso (aquí integrarías fetch a backend si disponible)
    feedback.style.display = 'block';
    feedback.style.color = 'green';
    feedback.textContent = 'Mensaje enviado con éxito. ¡Gracias!';

    // limpiar campos
    form.reset();

    // opcional: cerrar el mensaje luego de unos segundos
    setTimeout(() => {
      if (feedback) {
        feedback.style.display = 'none';
        feedback.textContent = '';
      }
    }, 5000);
  });

  /* ------------------ UTILIDADES ------------------ */
  function validateEmail(email) {
    // validación sencilla de correo (no perfecta, pero adecuada)
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

});
  /* ------------------ BOTÓN VOLVER ARRIBA ------------------ */
  const backToTopBtn = document.getElementById('backToTop');

  // Muestra u oculta el botón al hacer scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) { // Muestra el botón después de hacer scroll 300px
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  // Función para subir suavemente al hacer clic
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Desplazamiento suave
    });
  });

