const express = require('express');
const router = express.Router();
const {
    createTransportista,
    getTransportistas,
    getTransportistaById,
    updateTransportista,
    deleteTransportista
} = require('../controllers/index');

router.post('/transportistas', createTransportista);
router.get('/transportistas', getTransportistas);
router.get('/transportistas/:id', getTransportistaById);
router.put('/transportistas/:id', updateTransportista);
router.delete('/transportistas/:id', deleteTransportista);

module.exports = router;