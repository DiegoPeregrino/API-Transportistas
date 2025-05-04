const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const transportistaRoutes = require('./routes/transportistasRoutes');

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
app.use(cors({ origin: '*' })); // Permitir todas las solicitudes (para pruebas)
app.use(express.json());

// Conexión a MongoDB
connectDB();

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

// Ruta raíz
app.get('/', (req, res) => {
    res.status(200).json({
        mensaje: 'Bienvenido a la API de Transportistas',
        documentacion: 'Visita /api/health para verificar el estado del servidor',
        rutas: [
            { metodo: 'GET', ruta: '/api/health', descripcion: 'Verificar el estado del servidor' },
            { metodo: 'GET', ruta: '/api/transportistas', descripcion: 'Listar transportistas' },
            { metodo: 'POST', ruta: '/api/transportistas', descripcion: 'Crear un nuevo transportista' }
        ]
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
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🟢 Servidor ejecutándose en http://0.0.0.0:${PORT}`);
});