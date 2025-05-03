const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: [true, 'El email es obligatorio'], 
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Formato de email inválido']
    },
    password: { 
        type: String, 
        required: [true, 'La contraseña es obligatoria'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
    },
    rol: { 
        type: String, 
        enum: ['admin', 'transportista'], 
        default: 'transportista' 
    }
}, { timestamps: true });

// Hash de contraseña antes de guardar
usuarioSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Método para comparar contraseñas
usuarioSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Usuario', usuarioSchema);
