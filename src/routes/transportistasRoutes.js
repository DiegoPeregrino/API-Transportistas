const express = require('express');
const { listar, obtener, crear, actualizar, eliminar } = require('../controllers/transportistaController');

const router = express.Router();

// Rutas
router.get('/lista', listar); // GET /transportista/lista
router.get('/:id', obtener); // GET /transportista/:id
router.post('/registrar', crear); // POST /transportista/registrar
router.put('/:id', actualizar); // PUT /transportista/:id
router.delete('/:id', eliminar); // DELETE /transportista/:id

module.exports = router;
