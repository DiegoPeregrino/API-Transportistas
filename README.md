# transportistas-api

## Descripción
La `transportistas-api` es una API construida con Node.js, Express y Mongoose para gestionar transportistas.
Proporciona endpoints para crear, leer, actualizar y eliminar transportistas y se conecta a MongoDB.
Fue realizada con fines académicos y se utiliza desde aplicaciones móviles.

## Tecnologías utilizadas
- Node.js
- Express
- Mongoose
- CORS
- dotenv

## Requisitos previos
- Node.js instalado en tu máquina
- MongoDB (local o en la nube)

## Instalación
1. Clona el repositorio:
   ```bash
   git clone <repository-url>
   ```
2. Entra al directorio del proyecto:
   ```bash
   cd transportistas-api
   ```
3. Instala las dependencias (puedes usar Yarn o npm):
   ```bash
   # con yarn
   yarn install

   # o con npm
   npm install
   ```

## Configuración
1. Crea un archivo `.env` en la raíz del proyecto con al menos estas variables:
   ```env
   MONGODB_URI=<tu_cadena_de_conexión_mongodb>
   PORT=3000
   ```
   Nota: el código actual valida que `MONGODB_URI` y `PORT` estén definidas; si faltan, el proceso terminará.

## Ejecución
```bash
# con yarn
yarn start

# con npm
npm start
```
Por defecto el servidor escucha en `0.0.0.0:<PORT>` (por ejemplo `http://localhost:3000`).

## Endpoints disponibles
Prefijo de rutas en el servidor: `/transportista` (singular). Rutas implementadas:

- GET /transportista/lista
  - Descripción: Listar todos los transportistas
  - Ejemplo:
    ```bash
    curl http://localhost:3000/transportista/lista
    ```

- POST /transportista/registrar
  - Descripción: Crear un nuevo transportista
  - Body JSON esperado: { "codigo": 1, "nombre": "Juan", "sueldo": 1000 }
  - Ejemplo:
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"codigo":1,"nombre":"Juan","sueldo":1000}' http://localhost:3000/transportista/registrar
    ```

- GET /transportista/:id
  - Descripción: Obtener transportista por ID

- PUT /transportista/:id
  - Descripción: Actualizar transportista por ID (devuelve el documento actualizado)

- DELETE /transportista/:id
  - Descripción: Elimina el transportista
  - Nota: actualmente la implementación realiza un borrado físico (hard delete) con `findByIdAndDelete`. Si prefieres "inhabilitar" (soft-delete) se debe agregar un campo `activo` y cambiar la lógica.

Rutas adicionales:
- GET /api/health
  - Descripción: Verifica estado del servidor y conexión a la BD
- GET /
  - Descripción: Ruta raíz con información básica y rutas de ejemplo

## Observaciones importantes
- Las rutas están montadas en `/transportista` (singular) según `src/index.js` y `src/routes/transportistasRoutes.js`. Si quieres que sean `/transportistas` (plural) y sigan convenciones REST más habituales, puedo ajustar el código.
- `PORT` y `MONGODB_URI` son validadas al arrancar; asegúrate de definir ambas en `.env` o en el entorno.

## Scripts
- `yarn start` / `npm start` — Inicia el servidor (usa `node src/index.js`).
- `yarn dev` / `npm run dev` — Inicia el servidor en modo desarrollo si tienes `nodemon` instalado como dependencia de desarrollo.

## Licencia
Este proyecto está licenciado bajo la licencia ISC (ver `package.json`).