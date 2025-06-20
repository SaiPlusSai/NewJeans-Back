import { crearUsuarioMIGA, listarUsuariosMIGA,listarUsuarios, cambiarRolUsuario
} from '../models/usuariosMIGA.js';
import bcrypt from 'bcrypt';
export async function registrarUsuarioMIGA(req, res) {
  try {
    const { nombres, apellidop, apellidom, correo, contraseña } = req.body;

    if (!nombres || !apellidop || !correo || !contraseña) {
      return res.status(400).json({ mensaje: "Faltan campos obligatorios" });
    }

    const hash = await bcrypt.hash(contraseña, 10); // 🔐 Hash aquí

    await crearUsuarioMIGA({ nombres, apellidop, apellidom, correo, contraseña: hash });

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

// PUT para cambiar rol
export async function actualizarRolUsuario(req, res) {
  try {
    const { id } = req.params;
    const { nuevoRol } = req.body;

    if (!['MIGA', 'COMUNIDAD'].includes(nuevoRol)) {
      return res.status(400).json({ mensaje: 'Rol inválido' });
    }

    await cambiarRolUsuario(id, nuevoRol);
    res.json({ mensaje: `Rol actualizado a ${nuevoRol}` });
  } catch (error) {
    console.error("Error al cambiar rol:", error.message);
    res.status(500).json({ mensaje: 'Error al cambiar rol' });
  }
}
