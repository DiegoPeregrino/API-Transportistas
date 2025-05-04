const Transportista = require('../models/transportista');

// Obtener todos (con filtro activo)
exports.listar = async (req, res) => {
    try {
        let { page = 1, limit = 10 } = req.query;

        // Validar que page y limit sean números
        page = parseInt(page, 10);
        limit = parseInt(limit, 10);
        if (isNaN(page) || page < 1) page = 1;
        if (isNaN(limit) || limit < 1) limit = 10;

        const resultados = await Transportista.find({ activo: true })
            .skip((page - 1) * limit)
            .limit(limit);

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

// Crear un transportista
exports.crear = async (req, res) => {
    try {
        const nuevo = new Transportista(req.body);
        await nuevo.save();
        res.status(201).json({
            mensaje: 'Transportista creado exitosamente',
            transportista: nuevo
        });
    } catch (error) {
        // Manejar errores específicos de validación
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                mensaje: 'Error de validación',
                errores: Object.values(error.errors).map(err => err.message)
            });
        }
        res.status(400).json({
            mensaje: 'Error al crear el transportista',
            error: error.message
        });
    }
};

// Actualizar un transportista
exports.actualizar = async (req, res) => {
    try {
        const { rutas } = req.body;

        // Validar que el número de rutas esté entre 1 y 19
        if (rutas && (rutas < 1 || rutas > 19)) {
            return res.status(400).json({ mensaje: 'El número de rutas debe estar entre 1 y 19' });
        }

        const actualizado = await Transportista.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // Devuelve el documento actualizado y aplica validaciones
        );
        if (!actualizado) return res.status(404).json({ mensaje: 'Transportista no encontrado' });
        res.status(200).json(actualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// "Eliminar" (inhabilitar)
exports.inhabilitar = async (req, res) => {
    try {
        const transportista = await Transportista.findById(req.params.id);
        if (!transportista) return res.status(404).json({ mensaje: 'Transportista no encontrado' });

        // Validar si ya está inhabilitado
        if (!transportista.activo) {
            return res.status(400).json({ mensaje: 'El transportista ya está inhabilitado' });
        }

        transportista.activo = false;
        await transportista.save();

        res.status(200).json({ mensaje: 'Transportista inhabilitado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};