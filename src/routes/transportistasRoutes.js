const express = require('express');
const { body, param } = require('express-validator');
const {
    listar,
    obtener,
    crear,
    actualizar,
    inhabilitar
} = require('../controllers/transportistaController');

const router = express.Router();

// Ruta base: /api/transportistas
router.get('/listar', listar); // GET /api/transportistas/listar

router.get('/:id', [
    param('id').isMongoId().withMessage('ID inválido')
], obtener); // GET /api/transportistas/:id

router.post('/', [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('ruc').notEmpty().withMessage('El RUC es obligatorio'),
    body('ruc').isLength({ min: 11, max: 11 }).withMessage('El RUC debe tener 11 caracteres')
], crear);

router.put('/:id', [
    param('id').isMongoId().withMessage('ID inválido'),
    body('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
    body('ruc').optional().isLength({ min: 11, max: 11 }).withMessage('El RUC debe tener 11 caracteres')
], actualizar); // PUT /api/transportistas/:id

router.delete('/:id', [
    param('id').isMongoId().withMessage('ID inválido')
], inhabilitar); // DELETE /api/transportistas/:id

module.exports = router;
