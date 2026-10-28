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
  // TODO
};

// R2 · Estado de carga y estado de error (modelos 3 y 4 de index.html).
const mostrarCargando = () => {
  lista.innerHTML = `
    <p class="col-span-full rounded-2xl bg-white p-8 text-center text-slate-500">Cargando episodios…</p>
  `;
};

const mostrarError = (mensaje) => {
  lista.innerHTML = `
    <div class="col-span-full rounded-2xl bg-rose-50 p-8 text-center text-rose-700">
      <p>No se pudieron cargar los episodios (${mensaje}).</p>

      <button type="button" id="btn-reintentar" class="mt-4 rounded-lg bg-rose-600 px-4 py-2 font-semibold text-white hover:bg-rose-700">Reintentar</button>
    </div>
  `;
};

// R3 + R4 + R5 · ESTADO → pantalla: filtra, pinta las tarjetas (o el estado vacío, modelo 5)
// y actualiza el contador con el formato «7 de 20 episodios · 187 personajes».
const render = () => {
  // TODO
};

// R2 · Pide los episodios: muestra cargando; si todo sale bien guarda y pinta;
// si falla, muestra el error con su botón Reintentar.
const cargar = async () => {
  // R2 - PASO 4: Mostrar primero el estado de carga.
  mostrarCargando();

  try {
    // R2 - PASO 5: Solicitar los episodios y guardar el resultado.
    episodios = await obtenerEpisodios();

    // R2 - PASO 6: Si la petición funciona, mostrar los episodios.
    render();
  } catch (error) {
    // R2 - PASO 7: Si falla, mostrar el mensaje de error.
    mostrarError(error.message);
  }
};

// R4 · Eventos del buscador (input), del select (change) y del formulario (Enter NO recarga).
// TODO

// R6 · UN solo listener en #lista (delegación) que atienda el botón de cada tarjeta
// y también el botón Reintentar.
// TODO

cargar();
