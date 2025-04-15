export function soloMIGA(req, res, next) {
  if (req.usuario.rol !== 'MIGA') {
    return res.status(403).json({ mensaje: 'Acceso solo para usuarios MIGA' });
  }
  next();
}

export function soloComunidad(req, res, next) {
  if (req.usuario.rol !== 'COMUNIDAD') {
    return res.status(403).json({ mensaje: 'Acceso solo para usuarios COMUNIDAD' });
  }
  next();
}

  