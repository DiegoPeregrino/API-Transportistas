const express = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const Transportista = require('../models/Transportista');

const router = express.Router();

// Login para ambos roles
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { 
                id: usuario._id, 
                rol: usuario.rol,
                transportistaId: usuario.transportistaId 
            },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.json({ 
            token,
            rol: usuario.rol,
            transportistaId: usuario.transportistaId
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Middleware de autorización
const authorize = (roles = []) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.rol)) {
            return res.status(403).json({ error: 'Acceso no autorizado' });
        }
        next();
    };
};

// Ejemplo de ruta protegida solo para admin
router.get('/transportistas', authorize(['admin']), async (req, res) => {
    const transportistas = await Transportista.find();
    res.json(transportistas);
});