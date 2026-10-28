# Parcial 2 · Guía de episodios de Rick and Morty

**Programación para entornos web 1 · 2026-2 · Trabajo práctico individual · Entrega: miércoles 28 de octubre de 2026, antes de las 6:00 p. m. · 20 % de la nota**

Vas a construir una guía de episodios que consume `https://rickandmortyapi.com/api/episode`, un recurso de la API que **no** usamos en clase. Abre esa URL en el navegador antes de escribir código: la respuesta es un objeto con `info` y `results`, y cada episodio de `results` tiene `id`, `name`, `air_date`, `episode` (el código, por ejemplo `S01E01`) y `characters` (un array de URLs).

La nota es sobre 5.0: puntos ÷ 20. Parte práctica: 80 puntos. Preguntas de razonamiento: 20 puntos.

## Condiciones

- Individual. Sin IA de ningún tipo: Copilot, chats ni extensiones. Este repo trae `.vscode/settings.json` con la IA de VS Code desactivada: no lo cambies.
- Puedes consultar MDN, tu propio repositorio del Explorador y el material del curso. No compartas ni copies código de compañeros.
- Abre el proyecto con **Live Server**: los módulos no funcionan con doble clic.
- Haz **commit y push al terminar cada requisito**, con mensajes `R1 listo`, `R2 listo`…
- No cambies los nombres de las funciones ni de los archivos.
- El docente puede pedirte que expliques cualquier línea durante 2 minutos. Lo que no puedas explicar no suma.

## Cómo empezar y cómo entregar

1. **Crea tu copia desde la plantilla.** Entra a este repositorio base con tu cuenta de GitHub iniciada. Arriba a la derecha, junto al botón **Code**, está el botón verde **Use this template**: ábrelo y elige **Create a new repository**.
2. **Llena el formulario.** En **Owner** deja tu usuario. En **Repository name** escribe `parcial2-web1-<tu-apellido>` (por ejemplo, `parcial2-web1-gomez`). Marca **Public** y deja sin marcar **Include all branches**. Presiona **Create repository**. Quedas en tu repositorio nuevo, con todos los archivos del parcial y un solo commit.
3. **Descárgalo a tu computador.** En tu repositorio nuevo (no en el base), presiona **Code**, copia la URL y en la terminal corre `git clone URL_QUE_COPIASTE`. Luego entra a la carpeta con `cd parcial2-web1-<tu-apellido>`, ábrela en VS Code con `code .` y arranca **Live Server** sobre `index.html`.
4. **Trabaja y sube cada requisito.** Al terminar cada uno corre `git add .`, luego `git commit -m "R1 listo"` (R2, R3… según el caso) y luego `git push`. Revisa en GitHub que el commit aparezca.
5. **Entrega.** Envía el enlace de **tu** repositorio respondiendo el correo del docente. Se califica lo que esté en GitHub el miércoles 28 de octubre a las 6:00 p. m.

No le hagas **Fork** a este repositorio ni trabajes dentro de él: no tienes permiso para subirle cambios, y tu trabajo debe quedar en tu propio repositorio.

## Lo que recibes

| Archivo | Qué tiene |
|---|---|
| `index.html` | La página completa con Tailwind por CDN y, al final, comentados, los modelos HTML de la tarjeta y de los estados de carga, error y vacío. No necesitas tocarlo |
| `js/api.js` | `pedirJSON` y `obtenerEpisodios`, por completar |
| `js/logica.js` | `filtrarEpisodios`, `contarPersonajes` y `alternarId`, por completar. Funciones puras |
| `js/vistos.js` | `leerVistos` y `guardarVistos`, por completar |
| `js/app.js` | Estado, referencias al DOM y las funciones de la interfaz, por completar |
| `respaldo/episodios.json` | La respuesta real de la API, guardada. Solo se usa si la API no responde |
| `RESPUESTAS.md` | Las cuatro preguntas de razonamiento. Respóndelas ahí mismo |

## Parte práctica (80 puntos)

Cada requisito dice en qué archivo y en qué función trabajas, qué debe hacer tu código y qué resultado se espera. Los datos de los ejemplos son los reales de la API. En los ejemplos, `episodios` es el array de 20 episodios que llega de la API.

### R1 · Pedir los episodios a la API (12 puntos)

**Dónde:** `js/api.js`, funciones `pedirJSON(url)` y `obtenerEpisodios()`.

**Lo hiciste en:** el `js/api.js` de tu Explorador (semana 8). Es el mismo `pedirJSON`, que lanza el error cuando `respuesta.ok` es falso. La diferencia: allá `obtenerPersonajes` devolvía el objeto completo; aquí `obtenerEpisodios` devuelve solo `results`.

**Qué debe hacer `pedirJSON(url)`:**

1. Pedir la `url` con `fetch` y esperar la respuesta con `await`.
2. Si la respuesta no fue exitosa (`respuesta.ok` es `false`, por ejemplo un 404 o un 500), **lanzar un error** cuyo mensaje tenga el código, por ejemplo `HTTP 404`.
3. Si fue exitosa, devolver el JSON de la respuesta.

**Qué debe hacer `obtenerEpisodios()`:** usar `pedirJSON(URL_EPISODIOS)` y devolver **solo** el array `results`, no el objeto completo con `info`.

| Llamada | Resultado esperado |
|---|---|
| `await obtenerEpisodios()` | Un array de 20 episodios; el primero tiene `name` «Pilot» |
| `await pedirJSON('https://rickandmortyapi.com/api/episodio')` | Lanza un error con el mensaje `HTTP 404` (esa URL no existe) |

El mensaje puede ser `HTTP 404` o `Error HTTP 404`, como en tu Explorador: lo importante es que traiga el código.

### R2 · Mostrar «cargando» y los errores (12 puntos)

**Dónde:** `js/app.js`, funciones `mostrarCargando()`, `mostrarError(mensaje)` y `cargar()`. Los modelos 3 (cargando) y 4 (error) están comentados al final de `index.html`.

**Lo hiciste en:** los estados de carga y error del Explorador (semana 8): `cargar()` con `try/catch` y el botón Reintentar. La diferencia: allá los estados se pintaban dentro de `render()`; aquí cada uno tiene su propia función.

**Qué debe pasar:**

1. Al abrir la página, `cargar()` llama primero a `mostrarCargando()`: dentro de `#lista` aparece el modelo 3, «Cargando episodios…».
2. Luego pide los datos con `obtenerEpisodios()`. Si llegan, los guarda en la variable `episodios` y llama a `render()`.
3. Si algo falla (la API responde con error o no hay internet), `cargar()` atrapa el error con `try/catch` y llama a `mostrarError(...)`: dentro de `#lista` aparece el modelo 4, con el motivo del error y el botón **Reintentar**.
4. Presionar **Reintentar** vuelve a llamar a `cargar()`. Ese clic se atiende en el listener de R6.

| Situación | Lo que se ve dentro de `#lista` |
|---|---|
| Mientras llegan los datos | Cargando episodios… |
| Sin internet (DevTools → Network → Offline) | No se pudieron cargar los episodios (Failed to fetch). + botón Reintentar |
| La URL responde 404 | No se pudieron cargar los episodios (HTTP 404). + botón Reintentar |

### R3 · Pintar las tarjetas (14 puntos)

**Dónde:** `js/app.js`, funciones `tarjetaHTML(episodio)` y `render()`. Los modelos 1 y 2 están al final de `index.html`.

**Lo hiciste en:** `tarjetaHTML` y `render()` de la grilla de personajes (semana 7), con `visibles.map(tarjetaHTML).join('')`.

**Qué debe hacer `tarjetaHTML(episodio)`:** recibir **un** episodio y devolver, con un template literal, el HTML del modelo 1 con los datos de ese episodio en lugar de los del ejemplo:

| En el modelo dice | Debe ir |
|---|---|
| `S01E01` | `episodio.episode` |
| `Pilot` | `episodio.name` |
| `December 2, 2013` | `episodio.air_date` |
| `19 personajes` | la **cantidad** de personajes: `episodio.characters.length`, no las URL |
| `data-id="1"` | `episodio.id` |

Si el `id` del episodio está en el array `vistos`, la tarjeta usa la variante «vista» del modelo 2: el `article` lleva además `ring-2 ring-emerald-500`, el botón cambia `bg-indigo-600 hover:bg-indigo-700` por `bg-emerald-600 hover:bg-emerald-700`, y su texto dice `✓ Visto` en vez de `Marcar como visto`.

**Qué debe hacer `render()`:** convertir los episodios en tarjetas con `map(tarjetaHTML)`, unirlas con `join('')` y ponerlas en `#lista` con `innerHTML`.

**Resultado esperado:** 20 tarjetas. La primera dice `S01E01`, `Pilot`, `Emitido: December 2, 2013` y `19 personajes`.

### R4 · Buscar y filtrar (16 puntos)

**Dónde:** la lógica en `js/logica.js`, función `filtrarEpisodios(lista, filtros)`; los eventos en `js/app.js`.

**Lo hiciste en:** `filtrarPersonajes(lista, { texto, estado })` de `js/logica.js` y los eventos del buscador y del select del Explorador (semanas 7 y 8). Aquí el select filtra por temporada en vez de por estado.

**Qué debe hacer `filtrarEpisodios(lista, { texto, temporada })`:** devolver, con `filter`, un array nuevo solo con los episodios que cumplan **las dos** condiciones:

- su `name` contiene `texto`, sin importar mayúsculas ni espacios al inicio o al final;
- su código `episode` empieza por `temporada` (`'S01'` o `'S02'`). Si `temporada` es `''`, sirven todas.

Esta función no usa `document`: recibe datos y devuelve datos.

| Llamada | Resultado esperado |
|---|---|
| `filtrarEpisodios(episodios, { texto: '', temporada: '' })` | Los 20 episodios |
| `filtrarEpisodios(episodios, { texto: 'rick', temporada: '' })` | 7 episodios |
| `filtrarEpisodios(episodios, { texto: '  RICK ', temporada: '' })` | Los mismos 7 |
| `filtrarEpisodios(episodios, { texto: '', temporada: 'S02' })` | 9 episodios |
| `filtrarEpisodios(episodios, { texto: 'rick', temporada: 'S02' })` | 3 episodios |
| `filtrarEpisodios(episodios, { texto: 'zzz', temporada: '' })` | `[]` (array vacío) |

**Qué debe pasar en la página (`app.js`):**

1. Al escribir en el buscador (evento `input`), el texto se guarda en `filtros.texto` y se llama a `render()`.
2. Al cambiar el select (evento `change`), el valor se guarda en `filtros.temporada` y se llama a `render()`.
3. `render()` pinta solo los episodios que devuelve `filtrarEpisodios(episodios, filtros)`.
4. Presionar Enter en el buscador **no** recarga la página: el evento `submit` del formulario se cancela con `preventDefault()`.
5. Si no queda ningún episodio, `#lista` muestra el modelo 5: «Ningún episodio coincide con la búsqueda.»

### R5 · Contador (6 puntos)

**Dónde:** `js/logica.js`, función `contarPersonajes(lista)`, y `render()` en `js/app.js`.

**Lo hiciste en:** `contarVivos` de `js/logica.js` (semana 7), que cuenta con `reduce` y un acumulador que empieza en 0. Aquí, en vez de contar vivos, sumas personajes.

**Qué debe hacer `contarPersonajes(lista)`:** sumar con `reduce` la cantidad de personajes (`characters.length`) de todos los episodios de la lista. Con una lista vacía devuelve `0`.

**Qué debe mostrar `#contador`:** cada vez que se llama a `render()`, el texto `VISIBLES de TOTAL episodios · PERSONAJES personajes`. VISIBLES y PERSONAJES se calculan con los episodios que quedan después de filtrar; TOTAL son todos los que llegaron de la API.

| Situación | Texto de `#contador` |
|---|---|
| Sin filtros | `20 de 20 episodios · 510 personajes` |
| Buscando «rick» | `7 de 20 episodios · 187 personajes` |
| «rick» y Temporada 2 | `3 de 20 episodios · 56 personajes` |
| Buscando «zzz» | `0 de 20 episodios · 0 personajes` |

### R6 · Marcar episodios como vistos (20 puntos)

**Dónde:** `js/logica.js` (`alternarId`), `js/vistos.js` (`leerVistos` y `guardarVistos`) y `js/app.js` (el listener de los clics).

**Lo hiciste en:** los favoritos del Explorador (semana 8): `leerFavoritos`, `guardarFavoritos` y `alternarFavorito` en `js/favoritos.js`, y el listener de la grilla. La diferencia: allá se guardaban personajes completos; aquí solo se guardan los ids (números).

**Qué debe hacer `alternarId(ids, id)`:** si `id` está en el array, devolver un array **nuevo** sin él; si no está, un array **nuevo** con él agregado. Nunca modifica el array que recibe: nada de `push` ni `splice` sobre `ids`.

| Llamada | Resultado esperado |
|---|---|
| `alternarId([1, 5], 5)` | `[1]` |
| `alternarId([1], 12)` | `[1, 12]` |

**Qué deben hacer `guardarVistos(ids)` y `leerVistos()`:** `guardarVistos([1, 12])` guarda en LocalStorage, con la clave `parcial2-vistos`, el texto `[1,12]` (usa `JSON.stringify`). `leerVistos()` lee esa clave y la convierte con `JSON.parse` dentro de un `try/catch`:

| Lo que hay guardado en `parcial2-vistos` | `leerVistos()` devuelve |
|---|---|
| Nada | `[]` |
| `[1,12]` | `[1, 12]` |
| `{roto` (un texto dañado) | `[]`, sin errores en la consola |

**¿Qué es la delegación?** Es lo que hiciste en la grilla del Explorador (semana 7, paso 04). En vez de ponerle un listener a cada botón, se pone **uno solo** en el contenedor que nunca se borra: aquí, `#lista`. Cuando haces clic en un botón, el clic «sube» (burbujea) desde el botón por todos sus padres hasta llegar a `#lista`; ahí, con `evento.target.closest(...)`, averiguas en qué botón fue. Se necesita porque `render()` borra los botones y crea otros nuevos con `innerHTML`: un listener puesto en un botón se pierde con él, mientras que el de `#lista` sigue ahí.

**Qué debe pasar en la página (`app.js`):** un **solo** `addEventListener('click', …)`, puesto en `#lista` (delegación), atiende todos los botones:

1. Si el clic fue en el botón Reintentar (`#btn-reintentar`), llama a `cargar()`.
2. Si fue en el botón de una tarjeta (el que tiene `data-id`), cambia `vistos` con `alternarId`, lo guarda con `guardarVistos` y llama a `render()`. Ojo: `boton.dataset.id` llega como texto; conviértelo con `Number(…)`.
3. Si fue en otra parte de la lista, no hace nada.

**Resultado esperado:** al presionar «Marcar como visto», la tarjeta queda con borde verde y el botón dice «✓ Visto»; al presionarlo otra vez, vuelve a como estaba. Los botones siguen funcionando después de buscar o filtrar, y al recargar la página los vistos siguen marcados.

### Puntaje por requisito

| Requisito | Puntos | Completo | Parcial (cerca de la mitad) |
|---|---|---|---|
| R1 · API | 12 | Revisa `ok`, lanza el `Error` y devuelve `results` usando `pedirJSON` | Funciona, pero un 404 no lanza, o devuelve el objeto completo |
| R2 · Cargando y error | 12 | Cargando visible; error con el motivo y Reintentar que vuelve a pedir | Falta Reintentar, el mensaje es genérico o el error solo va a la consola |
| R3 · Tarjetas | 14 | `map` + template literal + `join`, todos los datos y la variante vista | Usa `forEach`/`+=`, falta un dato o falta la variante vista |
| R4 · Filtros | 16 | Combinados, sin importar mayúsculas, Enter no recarga, estado vacío, lógica pura | Filtra con alguna de esas fallas |
| R5 · Contador | 6 | `reduce` con valor inicial, formato exacto, se actualiza al filtrar | Total correcto sin `reduce`, o no se actualiza |
| R6 · Delegación | 8 | Un solo listener en `#lista` que atiende tarjetas y Reintentar, y sigue funcionando después de filtrar | Listeners por botón que se vuelven a poner en cada render |
| R6 · Persistencia | 12 | `stringify`/`parse`, `try/catch` con `[]` de respaldo, `alternarId` sin mutar, persiste al recargar | Persiste, pero un valor dañado rompe la app o `alternarId` muta el array |

## Preguntas de razonamiento (20 puntos)

Están completas en `RESPUESTAS.md`: cuatro preguntas de 5 puntos sobre código que ya conoces, cada una partida en letras con su puntaje. Responde ahí mismo, cada letra por separado.

## Lista de verificación

El docente califica la parte práctica con estas pruebas, en orden, con tu repositorio abierto en Live Server. Úsalas para probarte mientras trabajas.

| # | Prueba | Debe verse | Requisito |
|---|---|---|---|
| 1 | Abrir la página | 20 tarjetas y `20 de 20 episodios · 510 personajes`; la primera: `S01E01 · Pilot · Emitido: December 2, 2013 · 19 personajes` | R1, R3, R5 |
| 2 | Buscar «rick» | `7 de 20 episodios · 187 personajes` | R4, R5 |
| 3 | Buscar «RICK » (mayúsculas y un espacio al final) | El mismo resultado de la prueba 2 | R4 |
| 4 | «rick» y «Temporada 2» en el select | `3 de 20 episodios · 56 personajes` | R4, R5 |
| 5 | Buscar «zzz» | El estado vacío | R4 |
| 6 | Enter en el buscador | La página no se recarga y la URL no cambia | R4 |
| 7 | Marcar los episodios 1 y 12, buscar «rickle» y desmarcar el 12 | El botón responde después de filtrar | R6 |
| 8 | Recargar la página | El episodio 1 sigue marcado como visto | R6 |
| 9 | DevTools → Application → Local Storage: cambiar el valor de `parcial2-vistos` por `{roto` y recargar | La app arranca sin vistos y sin errores en la consola | R6 |
| 10 | DevTools → Network → Offline y recargar | Estado de error con `Failed to fetch` | R2 |
| 11 | Volver a No throttling y presionar Reintentar | Las 20 tarjetas | R2, R6 |
| 12 | Cambiar un momento `URL_EPISODIOS` por `https://rickandmortyapi.com/api/episodio` | Estado de error con `HTTP 404` | R1, R2 |
| 13 | Leer el código | `api.js` revisa `respuesta.ok`; `logica.js` no usa `document`, usa `reduce` y no muta arrays; `vistos.js` tiene `try/catch`; `app.js` tiene un solo listener en `#lista` para todos los botones | R1, R4, R5, R6 |

## Si la API no responde

Si `https://rickandmortyapi.com/api/episode` no carga en el navegador, en `js/api.js` cambia `URL_EPISODIOS` por `'./respaldo/episodios.json'` y sigue trabajando: todo funciona igual y no pierdes puntos.

- Dilo en el mensaje del commit, por ejemplo: `R1 listo (con respaldo: la API no respondía)`.
- Antes de entregar, si la API ya responde, vuelve a la URL real.
