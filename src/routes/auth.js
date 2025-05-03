const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Usuario = require('../models/usuario');

const router = express.Router();

// Registro de usuario
router.post('/register', [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('rol').optional().isIn(['admin', 'transportista']).withMessage('Rol inválido')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
    }

    try {
        const { email, password, rol } = req.body;

        if (await Usuario.findOne({ email })) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }

        const usuario = new Usuario({ email, password, rol: rol || 'transportista' });
        await usuario.save();

        const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '8h' });

        res.status(201).json({ token, rol: usuario.rol });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login
router.post('/login', [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
    }

    try {
        const { email, password } = req.body;

        const usuario = await Usuario.findOne({ email });
        if (!usuario || !(await usuario.comparePassword(password))) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '8h' });

        res.json({ token, rol: usuario.rol });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
