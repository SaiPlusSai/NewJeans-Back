export function soloMIGA(req, res, next) {
    if (req.usuario?.rol !== 'MIGA') {
      return res.status(403).json({ mensaje: 'Acceso denegado: solo MIGA' });
    }
    next();
  }
  