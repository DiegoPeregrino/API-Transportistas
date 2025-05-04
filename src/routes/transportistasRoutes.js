const express = require('express');
const { body, param, validationResult } = require('express-validator');
const {
    listar,
    obtener,
    crear,
    actualizar,
    inhabilitar
} = require('../controllers/transportistaController');

const router = express.Router();

// Validaciones reutilizables
const validarId = param('id').isMongoId().withMessage('ID inválido');
const validarTransportista = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('ruc').notEmpty().withMessage('El RUC es obligatorio'),
    body('ruc').isLength({ min: 11, max: 11 }).withMessage('El RUC debe tener 11 caracteres')
];

// Middleware para manejar errores de validación
const manejarErroresDeValidacion = (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }
    next();
};

// Rutas
router.get('/', listar); // GET /api/transportistas
router.get('/:id', validarId, manejarErroresDeValidacion, obtener); // GET /api/transportistas/:id
router.post('/', validarTransportista, manejarErroresDeValidacion, crear); // POST /api/transportistas
router.put('/:id', [validarId, ...validarTransportista], manejarErroresDeValidacion, actualizar); // PUT /api/transportistas/:id
router.delete('/:id', validarId, manejarErroresDeValidacion, inhabilitar); // DELETE /api/transportistas/:id

module.exports = router;
