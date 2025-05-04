const mongoose = require('mongoose');

const TransportistaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    ruc: { type: String, required: true, unique: true },
    direccion: String,
    telefono: String,
    email: String,
    activo: { type: Boolean, default: true },
    imagen: { type: String } // URL de la imagen
}, { 
    timestamps: true,
    versionKey: false // Elimina el campo __v
});

module.exports = mongoose.model('Transportista', TransportistaSchema);