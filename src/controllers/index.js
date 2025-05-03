const Transportista = require('../models/transportista');

exports.createTransportista = async (req, res) => {
    try {
        const newTransportista = new Transportista(req.body);
        await newTransportista.save();
        res.status(201).json(newTransportista);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getTransportistas = async (req, res) => {
    try {
        const transportistas = await Transportista.find({ activo: true });
        res.status(200).json(transportistas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTransportistaById = async (req, res) => {
    try {
        const transportista = await Transportista.findById(req.params.id);
        if (!transportista) return res.status(404).json({ error: 'No encontrado' });
        res.status(200).json(transportista);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTransportista = async (req, res) => {
    try {
        const updated = await Transportista.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: 'No encontrado' });
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteTransportista = async (req, res) => {
    try {
        const deleted = await Transportista.findByIdAndUpdate(req.params.id, { activo: false }, { new: true });
        if (!deleted) return res.status(404).json({ error: 'No encontrado' });
        res.status(200).json({ message: 'Transportista inhabilitado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
