const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const transportistaRoutes = require('./routes/transportistasRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Validar variables de entorno
const requiredEnvVars = ['MONGODB_URI', 'PORT'];
requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
        console.error(`❌ Faltan variables de entorno necesarias: ${varName}`);
        process.exit(1);
    }
});

// Configuración básica
app.use(cors());
app.use(express.json());
app.use(helmet());

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
            { url: `http://localhost:${PORT}/api`, description: 'Servidor local' }
        ],
        tags: [
            { name: 'Transportistas', description: 'Operaciones con transportistas' }
        ]
    },
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
    customSiteTitle: "API Transportistas Docs",
    explorer: true
}));

// Rutas principales
app.use('/api/transportistas', transportistaRoutes);

// Ruta de verificación de salud
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        dbStatus: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// Manejo de errores
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    console.error(err.stack);
    res.status(statusCode).json({
        error: statusCode >= 500 ? 'Error interno del servidor' : 'Error en la solicitud',
        message: err.message
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🟢 Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`📚 Documentación disponible en http://localhost:${PORT}/api-docs`);
});