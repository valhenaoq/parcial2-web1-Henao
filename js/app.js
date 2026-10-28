// js/app.js · La interfaz: estado, DOM y eventos.
import { obtenerEpisodios } from './api.js';
import { filtrarEpisodios, contarPersonajes, alternarId } from './logica.js';
import { leerVistos, guardarVistos } from './vistos.js';

// ============ ESTADO ============
let episodios = [];                          // lo que llegó de la API
let vistos = leerVistos();                   // ids de los episodios marcados como vistos
const filtros = { texto: '', temporada: '' };

// ============ DOM ============
const lista = document.querySelector('#lista');
const contador = document.querySelector('#contador');
const formFiltros = document.querySelector('#form-filtros');
const inputBusqueda = document.querySelector('#busqueda');
const selectTemporada = document.querySelector('#filtro-temporada');

// R3 · Recibe UN episodio y devuelve el HTML de su tarjeta (modelos 1 y 2 de index.html).
const tarjetaHTML = (episodio) => {
  const visto = vistos.includes(episodio.id);
  const claseArticulo = visto ? ' ring-2 ring-emerald-500' : '';
  const claseBoton = visto
    ? 'bg-emerald-600 hover:bg-emerald-700'
    : 'bg-indigo-600 hover:bg-indigo-700';
  const textoBoton = visto ? '✓ Visto' : 'Marcar como visto';

  return `
    <article class="flex flex-col gap-2 rounded-2xl bg-white p-5 shadow${claseArticulo}">
      <span class="w-fit rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">${episodio.episode}</span>
      <h3 class="text-lg font-bold">${episodio.name}</h3>
      <p class="text-sm text-slate-500">Emitido: ${episodio.air_date}</p>
      <p class="text-sm text-slate-500">${episodio.characters.length} personajes</p>
      <button type="button" data-id="${episodio.id}"
              class="mt-auto rounded-lg ${claseBoton} py-2 font-semibold text-white">
        ${textoBoton}
      </button>
    </article>
  `;
};

// R2 · Estado de carga y estado de error (modelos 3 y 4 de index.html).
const mostrarCargando = () => {
  lista.innerHTML = `
    <p class="col-span-full rounded-2xl bg-white p-8 text-center text-slate-500">
      Cargando episodios…
    </p>
  `;
};

const mostrarError = (mensaje) => {
  lista.innerHTML = `
    <div class="col-span-full rounded-2xl bg-rose-50 p-8 text-center text-rose-700">
      <p>No se pudieron cargar los episodios (${mensaje}).</p>

      <button
        type="button"
        id="btn-reintentar"
        class="mt-4 rounded-lg bg-rose-600 px-4 py-2 font-semibold text-white hover:bg-rose-700"
      >
        Reintentar
      </button>
    </div>
  `;
};

// R3 + R4 + R5 · ESTADO → pantalla: filtra, pinta las tarjetas (o el estado vacío, modelo 5)
// y actualiza el contador con el formato «7 de 20 episodios · 187 personajes».
const render = () => {
  const filtrados = filtrarEpisodios(episodios, filtros);

  const totalPersonajes = contarPersonajes(filtrados);

  contador.textContent =
    `${filtrados.length} de ${episodios.length} episodios · ${totalPersonajes} personajes`;

  if (filtrados.length === 0) {
    lista.innerHTML = `
      <p class="col-span-full rounded-2xl bg-white p-8 text-center text-slate-500">
        Ningún episodio coincide con la búsqueda.
      </p>
    `;

    return;
  }

  lista.innerHTML = filtrados
    .map((episodio) => tarjetaHTML(episodio))
    .join('');
};

  

// R2 · Pide los episodios: muestra cargando; si todo sale bien guarda y pinta;
// si falla, muestra el error con su botón Reintentar.
const cargar = async () => {
  mostrarCargando();

  try {
    episodios = await obtenerEpisodios();
    render();
  } catch (error) {
    mostrarError(error.message);
  }
};

// R4 · Eventos del buscador (input), del select (change) y del formulario (Enter NO recarga).
// Cuando el usuario escribe en el buscador.
inputBusqueda.addEventListener('input', () => {
  filtros.texto = inputBusqueda.value;
  render();
});

// Cuando el usuario cambia la temporada.
selectTemporada.addEventListener('change', () => {
  filtros.temporada = selectTemporada.value;
  render();
});

// Evita que presionar Enter recargue la página.
formFiltros.addEventListener('submit', (evento) => {
  evento.preventDefault();
});

// R6 · UN solo listener en #lista (delegación) que atienda el botón de cada tarjeta
// y también el botón Reintentar.
// R6 · Un solo listener para los botones de la lista.
lista.addEventListener('click', (evento) => {
  // Primero comprobamos si se pulsó el botón Reintentar.
  const botonReintentar = evento.target.closest('#btn-reintentar');

  if (botonReintentar) {
    cargar();
    return;
  }

  // Si no fue Reintentar, buscamos el botón de un episodio.
  const boton = evento.target.closest('[data-id]');

  if (!boton) {
    return;
  }

  // Convertimos el ID del HTML de texto a número.
  const id = Number(boton.dataset.id);

  // Alternamos el estado del episodio.
  vistos = alternarId(vistos, id);

  // Guardamos los cambios en localStorage.
  guardarVistos(vistos);

  // Volvemos a dibujar la lista para actualizar el botón y la tarjeta.
  render();
});

cargar();
