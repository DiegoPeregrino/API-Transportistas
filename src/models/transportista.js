const mongoose = require('mongoose');

const transportistaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    ruc: { type: String, required: true, unique: true },
    direccion: { type: String },
    telefono: { type: String },
    email: { type: String },
    activo: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Transportista', transportistaSchema);
