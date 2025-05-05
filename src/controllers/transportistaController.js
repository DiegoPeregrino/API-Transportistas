const Transportista = require('../models/transportista');

// Obtener todos los transportistas
exports.listar = async (req, res) => {
    const transportistas = await Transportista.find();
    res.json(transportistas);
};

// Obtener un transportista por ID
exports.obtener = async (req, res) => {
    const transportista = await Transportista.findById(req.params.id);
    res.json(transportista);
};

// Crear un transportista
exports.crear = async (req, res) => {
    const nuevo = new Transportista(req.body);
    await nuevo.save();
    res.json(nuevo);
};

// Actualizar un transportista
exports.actualizar = async (req, res) => {
    const actualizado = await Transportista.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
};

// Eliminar un transportista
exports.eliminar = async (req, res) => {
    await Transportista.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Transportista eliminado' });
};