// js/api.js · Comunicación con la API. En este archivo NO aparece la palabra document.
// Plan B (solo si la API no responde): cambia la URL por './respaldo/episodios.json'
export const URL_EPISODIOS = 'https://rickandmortyapi.com/api/episode';

// R1 · Hace fetch a url. Si la respuesta NO es ok, LANZA un Error cuyo mensaje incluya
// el código HTTP (por ejemplo "HTTP 500"). Si es ok, devuelve el JSON ya convertido.
export const pedirJSON = async (url) => {
  // TODO
};

// R1 · Usa pedirJSON y devuelve SOLO el array de episodios (no el objeto completo con info).
export const obtenerEpisodios = async () => {
  // TODO
};
