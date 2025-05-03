const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const transportistaRoutes = require('./routes/transportistas');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración básica
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
connectDB();

// Configuración de Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Transportistas API',
            version: '1.0.1',
            description: 'API para gestión de transportistas con endpoints RESTful'
        },
        servers: [
            { 
                url: `http://localhost:${PORT}/api`,
                description: 'Servidor local' 
            },
            { 
                url: 'https://tu-app-en-render.onrender.com/api',
                description: 'Producción' 
            }
        ],
        tags: [
            {
                name: 'Transportistas',
                description: 'Operaciones con transportistas'
            }
        ]
    },
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, 
    swaggerUi.setup(swaggerDocs, {
        customSiteTitle: "API Transportistas Docs",
        explorer: true
    })
);

// Rutas principales
app.use('/api/transportistas', transportistaRoutes);

// Ruta de verificación de salud
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK',
        dbStatus: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
    });
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Internal Server Error',
        message: err.message 
    });
});

// Crear .gitignore si no existe
const gitignorePath = path.join(__dirname, '.gitignore');
if (!fs.existsSync(gitignorePath)) {
    fs.writeFileSync(gitignorePath, 'node_modules/\n.env\n.DS_Store\n');
}

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🟢 Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`📚 Documentación disponible en http://localhost:${PORT}/api-docs`);
});