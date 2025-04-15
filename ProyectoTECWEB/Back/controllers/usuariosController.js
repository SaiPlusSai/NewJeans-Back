import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { buscarUsuarioPorCorreo } from '../models/usuariosModel.js';

export async function login(req, res) {
  const { correo, contraseña } = req.body;

  if (!correo || !contraseña) {
    return res.status(400).json({ mensaje: 'Faltan datos' });
  }

  const usuario = await buscarUsuarioPorCorreo(correo);
  if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

  const match = await bcrypt.compare(contraseña, usuario.contraseña);
  if (!match) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

  const token = jwt.sign(
    { id: usuario.id, rol: usuario.rol },
    process.env.JWT_SECRET,
    { expiresIn: '4h' }
  );

  res.json({
    mensaje: 'Login exitoso',
    token,
    usuario: {
      id: usuario.id,
      nombres: usuario.nombres,
      apellidop: usuario.apellidop,
      apellidom: usuario.apellidom,
      rol: usuario.rol
    }
  });
}
