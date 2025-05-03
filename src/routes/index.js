// This file sets up the routes for the application and exports the router.
const express = require('express');
const router = express.Router();

// Import controller methods
const { createTransportista, getTransportistas, getTransportistaById, updateTransportista, deleteTransportista } = require('../controllers/index');

// Define routes
router.post('/transportistas', createTransportista);
router.get('/transportistas', getTransportistas);
router.get('/transportistas/:id', getTransportistaById);
router.put('/transportistas/:id', updateTransportista);
router.delete('/transportistas/:id', deleteTransportista);

module.exports = router;