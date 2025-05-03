const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '') || 
                  req.body.token || 
                  req.query.token;
    
    if (!token) {
        return res.status(401).json({ error: 'Acceso no autorizado, token faltante' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido o expirado' });
    }
};
