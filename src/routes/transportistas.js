const express = require('express');
const authMiddleware = require('../middleware/auth');
const {
    listar,
    obtener,
    crear,
    actualizar,
    inhabilitar
} = require('../controllers/transportistaController');

const router = express.Router();

// Ruta base: /api/transportistas
router.get('/listar', listar);             // GET /api/transportistas/listar
router.get('/:id', obtener);               // GET /api/transportistas/123
router.post('/', authMiddleware, (req, res, next) => {
    // Validación de rol para crear transportistas
    if (req.usuario.rol !== 'admin') {
        return res.status(403).json({ error: 'Solo admins pueden crear transportistas' });
    }
    return crear(req, res, next);
});
router.put('/:id', actualizar);           // PUT /api/transportistas/123
router.delete('/:id', inhabilitar);       // DELETE /api/transportistas/123

module.exports = router;
