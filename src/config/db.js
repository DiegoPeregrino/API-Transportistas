const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,          // Para parsear correctamente la URI
            useUnifiedTopology: true,       // Usa el nuevo motor de descubrimiento de topología
            serverSelectionTimeoutMS: 10000, // 10 segundos para seleccionar servidor
            socketTimeoutMS: 60000,         // 60 segundos de timeout para operaciones
            maxPoolSize: 10,                // Número máximo de conexiones en el pool
            connectTimeoutMS: 10000,        // 10 segundos para establecer conexión inicial
            retryWrites: true,             // Reintentar escrituras fallidas
            writeConcern: {                // Nivel de consistencia para escrituras
                w: 'majority'
            }
        });
        
        console.log('✅ MongoDB connected successfully');
        
        // Manejo de eventos de conexión
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to DB');
        });
        
        mongoose.connection.on('error', (err) => {
            console.error('Mongoose connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.warn('Mongoose disconnected from DB');
        });
        
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Termina el proceso con error
    }
};

// Manejo de cierre de aplicación
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Mongoose connection closed due to app termination');
    process.exit(0);
});

module.exports = connectDB;