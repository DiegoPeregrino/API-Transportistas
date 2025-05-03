const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Extraer el token del encabezado Authorization
    const authHeader = req.header('Authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : null;

    if (!token) {
        return res.status(401).json({ error: 'Acceso no autorizado, token faltante' });
    }

    try {
        // Verificar el token con el secreto
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded; // Agregar el usuario decodificado al objeto de la solicitud
        next(); // Continuar con el siguiente middleware
    } catch (error) {
        // Manejar errores específicos de JWT
        const errorMessage = error.name === 'TokenExpiredError' 
            ? 'Token expirado' 
            : 'Token inválido';
        res.status(401).json({ error: errorMessage });
    }
};
