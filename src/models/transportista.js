const mongoose = require('mongoose');

// Definición del esquema de Transportista
const TransportistaSchema = new mongoose.Schema({
    codigo: { type: Number, required: true }, // Código del transportista
    nombre: { type: String, required: true }, // Nombre del transportista
    sueldo: { type: Number, required: true } // Sueldo del transportista
}, {
    timestamps: true // Agrega campos createdAt y updatedAt automáticamente
});

module.exports = mongoose.model('Transportista', TransportistaSchema);