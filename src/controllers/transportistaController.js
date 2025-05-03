const Transportista = require('../models/Transportista');

// Obtener todos (con filtro activo)
exports.listar = async (req, res) => {
    try {
        const resultados = await Transportista.find({ activo: true });
        res.status(200).json(resultados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener uno
exports.obtener = async (req, res) => {
    try {
        const recurso = await Transportista.findById(req.params.id);
        if (!recurso) return res.status(404).json({ mensaje: 'Transportista no encontrado' });
        res.status(200).json(recurso);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear
exports.crear = async (req, res) => {
    try {
        const nuevo = new Transportista(req.body);
        await nuevo.save();
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar
exports.actualizar = async (req, res) => {
    try {
        const actualizado = await Transportista.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!actualizado) return res.status(404).json({ mensaje: 'No encontrado' });
        res.status(200).json(actualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// "Eliminar" (inhabilitar)
exports.inhabilitar = async (req, res) => {
    try {
        const inhabilitado = await Transportista.findByIdAndUpdate(
            req.params.id,
            { activo: false },
            { new: true }
        );
        if (!inhabilitado) return res.status(404).json({ mensaje: 'No encontrado' });
        res.status(200).json({ mensaje: 'Transportista inhabilitado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};