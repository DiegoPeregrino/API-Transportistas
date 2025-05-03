const express = require('express');
const router = express.Router();
const {
    listar,
    obtener,
    crear,
    actualizar,
    inhabilitar
} = require('../controllers/transportistaController');

// Ruta base: /api/transportistas
router.get('/listar', listar);       // GET /api/transportistas/listar
router.get('/:id', obtener);         // GET /api/transportistas/123
router.post('/', crear);              // POST /api/transportistas
router.put('/:id', actualizar);       // PUT /api/transportistas/123
router.delete('/:id', inhabilitar);   // DELETE /api/transportistas/123

module.exports = router;