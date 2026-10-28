// js/vistos.js · Persistencia en LocalStorage.
// Aquí NO aparece document.

const CLAVE = 'parcial2-vistos';

// R6 · Lee los IDs guardados.
// Si no hay datos o el JSON está dañado, devuelve [].
export const leerVistos = () => {
  try {
    const datos = localStorage.getItem(CLAVE);

    if (datos === null) {
      return [];
    }

    return JSON.parse(datos);
  } catch (error) {
    return [];
  }
};

// R6 · Guarda el array de IDs como JSON.
export const guardarVistos = (ids) => {
  localStorage.setItem(CLAVE, JSON.stringify(ids));
};