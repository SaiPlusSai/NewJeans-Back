import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import db from '../db.js';


import { crearUsuario, buscarPorCorreo,editarUsuario } from '../models/usuariosModel.js';

export async function register(req, res) {
  try {
    const { nombres, apellidop, apellidom, correo, contraseña, rol } = req.body;

    if (!nombres || !correo || !contraseña) {
      return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
    }

    const usuarioExistente = await buscarPorCorreo(correo);
    if (usuarioExistente) return res.status(400).json({ mensaje: 'Correo ya registrado' });

    const hash = await bcrypt.hash(contraseña, 10);

    const rolAsignado = rol || 'COMUNIDAD';
    await crearUsuario({ nombres, apellidop, apellidom, correo, contraseña: hash, rol: rolAsignado });

    res.status(201).json({ mensaje: `Usuario ${rol} creado correctamente` });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
}



export async function login(req, res) {
  try {
    const { correo, contraseña } = req.body;
    const usuario = await buscarPorCorreo(correo);

    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado o fue eliminado' });

    const match = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!match) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.JWT_SECRET, {
      expiresIn: '4h'
    });

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
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }
}

export function perfil(req, res) {
  res.json({
    mensaje: 'Token válido',
    usuario: req.usuario
  });
}
const client = new OAuth2Client("TU_CLIENT_ID_GOOGLE");

export async function registroGoogle(req, res) {
  try {
    const { tokenId } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: "TU_CLIENT_ID_GOOGLE",
    });

    const payload = ticket.getPayload();
    const correo = payload.email;
    const nombres = payload.given_name;
    const apellidop = payload.family_name || '';

    // Verifica si ya existe
    const [result] = await db.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);

    if (result.length === 0) {
      // No existe → lo crea como COMUNIDAD
      await db.query(`
        INSERT INTO usuarios (nombres, apellidop, correo, rol)
        VALUES (?, ?, ?, 'COMUNIDAD')
      `, [nombres, apellidop, correo]);
    }

    // Obtener el usuario actualizado
    const [rows] = await db.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    const usuario = rows[0];

    // Generar token
    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.json({ mensaje: 'Usuario autenticado con Google', token });
  } catch (error) {
    console.error("Error en registroGoogle:", error);
    res.status(500).json({ mensaje: 'Error al registrar con Google', error: error.message });
  }
}

export async function actualizarUsuarioGeneral(req, res) {
  try {
    const { id } = req.params;
    const datos = req.body;

    // Evitar cambios de rol o eliminado desde aquí
    if ('rol' in datos || 'eliminado' in datos) {
      return res.status(403).json({ mensaje: 'No se permite modificar el rol ni el estado eliminado' });
    }

    await editarUsuario(id, datos);
    res.json({ mensaje: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar usuario:', error.message);
    res.status(500).json({ mensaje: 'Error al actualizar usuario' });
  }
}