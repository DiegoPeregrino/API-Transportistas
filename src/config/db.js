const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('La variable de entorno MONGODB_URI no está configurada');
        }

        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 60000,
            maxPoolSize: 10,
            connectTimeoutMS: 10000,
            retryWrites: true,
            writeConcern: { w: 'majority' }
        });

        console.log('✅ MongoDB connected successfully');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1);
    }
};

mongoose.connection.on('connected', () => {
    console.log('✅ MongoDB reconectado');
});

mongoose.connection.on('disconnected', () => {
    console.warn('⚠️ MongoDB desconectado');
});

mongoose.connection.on('error', (err) => {
    console.error('❌ Error en la conexión a MongoDB:', err.message);
});

module.exports = connectDB;