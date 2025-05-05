const Transportista = require('../models/transportista');

// Obtener todos los transportistas
exports.listar = async (req, res) => {
    try {
        const transportistas = await Transportista.find();
        res.status(200).json(transportistas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un transportista por ID
exports.obtener = async (req, res) => {
    try {
        const transportista = await Transportista.findById(req.params.id);
        if (!transportista) return res.status(404).json({ mensaje: 'Transportista no encontrado' });
        res.status(200).json(transportista);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un transportista
exports.crear = async (req, res) => {
    try {
        const { codigo, nombre, sueldo } = req.body;
        const nuevo = new Transportista({ codigo, nombre, sueldo });
        await nuevo.save();
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar un transportista
exports.actualizar = async (req, res) => {
    try {
        const { codigo, nombre, sueldo } = req.body;
        const actualizado = await Transportista.findByIdAndUpdate(
            req.params.id,
            { codigo, nombre, sueldo },
            { new: true }
        );
        if (!actualizado) return res.status(404).json({ mensaje: 'Transportista no encontrado' });
        res.status(200).json(actualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un transportista
exports.eliminar = async (req, res) => {
    try {
        const eliminado = await Transportista.findByIdAndDelete(req.params.id);
        if (!eliminado) return res.status(404).json({ mensaje: 'Transportista no encontrado' });
        res.status(200).json({ mensaje: 'Transportista eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};