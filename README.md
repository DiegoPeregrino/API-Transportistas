# transportistas-api

## Descripción
La `transportistas-api` es una API RESTful construida con Node.js y Express para gestionar transportistas. Proporciona endpoints para crear, leer, actualizar e inhabilitar transportistas, y se conecta a una base de datos MongoDB usando Mongoose.

## Tecnologías utilizadas
- Node.js
- Express
- Mongoose
- CORS
- dotenv

## Instrucciones de configuración

### Requisitos previos
- Node.js instalado en tu máquina
- Base de datos MongoDB (local o en la nube)

### Instalación
1. Clona el repositorio:
   ```
   git clone <repository-url>
   ```
2. Navega al directorio del proyecto:
   ```
   cd transportistas-api
   ```
3. Instala las dependencias:
   ```
   yarn install
   ```

### Configuración
1. Crea un archivo `.env` en el directorio raíz y agrega tu cadena de conexión de MongoDB:
   ```
   MONGODB_URI=<tu_cadena_de_conexión_mongodb>
   ```

### Ejecución de la aplicación
1. Inicia el servidor:
   ```
   yarn start
   ```
2. La API estará ejecutándose en `http://localhost:3000`.

## Endpoints de la API
- `GET /transportistas` - Recuperar todos los transportistas
- `POST /transportistas` - Crear un nuevo transportista
- `GET /transportistas/:id` - Recuperar un transportista por ID
- `PUT /transportistas/:id` - Actualizar un transportista por ID
- `DELETE /transportistas/:id` - Inhabilitar un transportista por ID

## Licencia
Este proyecto está licenciado bajo la Licencia MIT.