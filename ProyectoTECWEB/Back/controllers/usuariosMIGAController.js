import db from '../db.js';
import { 
  crearUsuarioMIGA, 
  listarUsuariosMIGA, 
  listarUsuarios, 
  cambiarRolUsuario, 
  eliminarLogicoUsuario, 
  restaurarUsuario, 
  listarUsuariosEliminados, 
  buscarUsuarioPorId, 
  buscarPorCorreo 
} from '../models/usuariosMIGA.js';
import { generarUsuarioDefecto } from '../utils/usuario_defecto.js';
import bcrypt from 'bcryptjs';

export async function registrarUsuarioMIGA(req, res) {
  try {
    const { nombres, apellidop, apellidom, correo, contraseña, macrodistrito_id, ambitoactividad_id, zona_id } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!nombres || !apellidop || !correo || !contraseña || !macrodistrito_id || !ambitoactividad_id || !zona_id) {
      return res.status(400).json({ mensaje: "Faltan campos obligatorios" });
    }

    // Encriptar la contraseña
    const hash = await bcrypt.hash(contraseña, 10); 

    // Verificar si la zona está asociada al macrodistrito
    const [zonaValida] = await db.query(`
      SELECT id 
      FROM zonas_macrodistrito 
      WHERE macrodistrito_id = ? AND id = ?
    `, [macrodistrito_id, zona_id]);

    if (!zonaValida || zonaValida.length === 0) {
      return res.status(400).json({ mensaje: "La zona no está asociada al macrodistrito especificado." });
    }

    // Crear el usuario MIGA con los datos proporcionados
    await crearUsuarioMIGA({ nombres, apellidop, apellidom, correo, contraseña: hash, macrodistrito_id, ambitoactividad_id, zona_id });

    res.status(201).json({ mensaje: "Usuario MIGA creado correctamente" });
  } catch (error) {
    console.error("Error al registrar usuario MIGA:", error.message);
    res.status(500).json({ mensaje: "Error al crear usuario MIGA", error: error.message });
  }
}

export async function obtenerUsuariosMIGA(req, res) {
  try {
    const usuarios = await listarUsuariosMIGA();
    res.json(usuarios);
  } catch (error) {
    console.error("Error al listar usuarios MIGA:", error.message);
    res.status(500).json({ mensaje: "Error al obtener usuarios MIGA" });
  }
}

export async function obtenerUsuarios(req, res) {
  try {
    const usuarios = await listarUsuarios();
    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error.message);
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
}

export async function actualizarRolUsuario(req, res) {
  try {
    const { id } = req.params;
    const { nuevoRol } = req.body;

    if (!['MIGA', 'COMUNIDAD'].includes(nuevoRol)) {
      return res.status(400).json({ mensaje: 'Rol inválido' });
    }

    const usuario = await buscarUsuarioPorId(id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    if (req.usuario.id === parseInt(id)) {
      return res.status(403).json({ mensaje: 'No puedes cambiar tu propio rol' });
    }

    await cambiarRolUsuario(id, nuevoRol);
    res.json({ mensaje: `Rol actualizado a ${nuevoRol}` });

  } catch (error) {
    console.error("Error al cambiar rol:", error.message);
    res.status(500).json({ mensaje: 'Error al cambiar rol' });
  }
}

export async function eliminarUsuario(req, res) {
  try {
    const { id } = req.params;

    const usuario = await buscarUsuarioPorId(id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    await eliminarLogicoUsuario(id);
    res.json({ mensaje: 'Usuario eliminado lógicamente' });

  } catch (error) {
    console.error("Error al eliminar usuario:", error.message);
    res.status(500).json({ mensaje: 'Error al eliminar usuario' });
  }
}

export async function restaurarUsuarioEliminado(req, res) {
  try {
    const { id } = req.params;

    const usuario = await buscarUsuarioPorId(id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    await restaurarUsuario(id);
    res.json({ mensaje: 'Usuario restaurado correctamente' });

  } catch (error) {
    console.error("Error al restaurar usuario:", error.message);
    res.status(500).json({ mensaje: 'Error al restaurar usuario' });
  }
}

export async function obtenerUsuariosEliminados(req, res) {
  try {
    const usuarios = await listarUsuariosEliminados();
    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios eliminados:", error.message);
    res.status(500).json({ mensaje: 'Error al listar usuarios eliminados' });
  }
}

export async function registroMIGA(req, res) {
  try {
    const { nombres, apellidop, apellidom, carnet_ci, correo, contraseña, macrodistrito_id, ambitoactividad_id, zona_id } = req.body;
    
    if (!nombres || !apellidop || !carnet_ci || !correo || !contraseña || !macrodistrito_id || !ambitoactividad_id || !zona_id) {
      return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
    }

    const usuarioExistente = await buscarPorCorreo(correo);
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    // Generar usuario por defecto
    const Usuario_defecto = await generarUsuarioDefecto(nombres, apellidop, apellidom);
    
    // Encriptar la contraseña
    const hash = await bcrypt.hash(contraseña, 10);

    await crearUsuarioMIGA({
      nombres,
      apellidop,
      apellidom,
      carnet_ci,
      correo,
      contraseña: hash,
      Usuario_defecto,
      macrodistrito_id,
      ambitoactividad_id,
      zona_id
    });

    res.status(201).json({
      mensaje: 'Usuario MIGA creado correctamente',
      Usuario_defecto
    });

  } catch (error) {
    console.error('Error en registerMIGA:', error.message);
    res.status(500).json({ mensaje: 'Error al registrar usuario MIGA', error: error.message });
  }
}
