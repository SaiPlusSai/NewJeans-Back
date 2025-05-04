export const soloMIGA = (req, res, next) => {
  if (req.usuario.rol !== 'MIGA') {
    return res.status(403).json({ mensaje: 'Acceso solo para usuarios MIGA' });
  }
  next();
};

export const soloComunidad = (req, res, next) => {
  if (req.usuario.rol !== 'COMUNIDAD') {
    return res.status(403).json({ mensaje: 'Acceso solo para usuarios COMUNIDAD' });
  }
  next();
};

const validarRol = (rolRequerido) => {
  return (req, res, next) => {
    if (req.usuario.rol !== rolRequerido) {
      return res.status(403).json({ mensaje: `Acceso solo para usuarios ${rolRequerido}` });
    }
    next();
  };
};

export default validarRol;
