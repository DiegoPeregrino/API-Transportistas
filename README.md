# transportistas-api

# API-Transportistas

Este repositorio contiene una API para gestionar transportistas.

IMPORTANTE: antes de volver a subir este repositorio al remoto, asegúrate de que no contiene archivos sensibles (por ejemplo `.env` con credenciales, o `node_modules`).

Pasos recomendados para limpiar y preparar el repositorio localmente (Windows, cmd.exe):

1) Verifica el estado actual y haz una copia de seguridad de tus archivos locales importantes (especialmente `.env` si contiene secretos):

```cmd
cd /d C:\Users\trigo\Documents\GitHub\API-Transportistas
mkdir ..\API-Transportistas-backup
xcopy /E /I . ..\API-Transportistas-backup
```

2) Asegúrate de que `.gitignore` contiene las reglas correctas (ya actualizado en este repo) y luego quita del índice los archivos que fueron añadidos por error (esto NO borra tus copias locales):

```cmd
git rm -r --cached node_modules .env
git add .gitignore
git commit -m "Remove node_modules and .env from repository and add to .gitignore"
```

3) Si quieres conservar el historial pero eliminar los archivos solo desde el último commit (si el commit que los agregó fue el último), puedes usar `--amend`:

```cmd
git rm -r --cached node_modules .env
git add .gitignore
git commit --amend --no-edit
```

4) Si necesitas eliminar `.env` y `node_modules` de TODO el historial (por ejemplo porque subiste secretos), considera usar `git-filter-repo` o BFG. Esto reescribe el historial y requiere un `git push --force` al remoto. Hazlo solo si entiendes las consecuencias y coordina con colaboradores.

5) Rotar credenciales: si tu `.env` tuvo credenciales (uri de MongoDB, JWT secret), cámbialas inmediatamente en el proveedor (por ejemplo MongoDB Atlas). Estas credenciales se consideran comprometidas si se subieron al remoto.

6) Ejemplo de re-inicialización limpia (opcional, destruye historial local y remoto si lo usas con `push --force`):

```cmd
REM NO lo ejecutes sin entender las consecuencias
cd /d C:\Users\trigo\Documents\GitHub\API-Transportistas
rmdir /s /q .git
git init
git add .
git commit -m "Initial clean commit"
git branch -M main
git remote add origin https://github.com/DiegoPeregrino/API-Transportistas.git
git push -u origin main --force
```

Advertencias:
- Si tu repo ya fue clonado por otros, reescribir el historial les romperá el historial y deberán reclonarlo.
- Haz backup antes de cualquier operación destructiva.

Si quieres, puedo ejecutar pasos seguros (por ejemplo quitar del índice y crear un commit) en tu repo local ahora. ¿Qué deseas que haga?:
- Ejecutar la limpieza segura (quitar del índice y commit) — Opción recomendada.
- Reescribir historial para eliminar archivos de todos los commits (requiere confirmación explícita).
- Re-inicializar el repo (borrar todo el historial) y subir un commit limpio (requiere confirmación explícita).

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