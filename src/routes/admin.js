// routes/admin.js
const express = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Solo super-admins pueden crear otros admins
router.post('/crear-admin', authMiddleware, async (req, res) => {
    try {
        // Verificar si el usuario actual es super-admin
        if (req.user.rol !== 'superadmin') {
            return res.status(403).json({ error: 'No autorizado' });
        }

        const { email, password } = req.body;

        // Validar email único
        const existeUsuario = await Usuario.findOne({ email });
        if (existeUsuario) {
            return res.status(400).json({ error: 'Email ya registrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const nuevoAdmin = new Usuario({
            email,
            password: hashedPassword,
            rol: 'admin'
        });

        await nuevoAdmin.save();
        res.status(201).json({ mensaje: 'Admin creado exitosamente' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;