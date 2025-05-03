const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { 
        type: String, 
        enum: ['superadmin', 'admin', 'transportista'], 
        default: 'transportista' 
    },
    transportistaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transportista' }
});

// Hash de contraseña antes de guardar
usuarioSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('Usuario', usuarioSchema);