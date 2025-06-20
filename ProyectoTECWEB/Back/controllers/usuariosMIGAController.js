import { crearUsuarioMIGA, listarUsuariosMIGA } from '../models/usuariosMIGA.js';

export async function registrarUsuarioMIGA(req, res) {
  try {
    const { nombres, apellidop, apellidom, correo, contraseña } = req.body;

    if (!nombres || !apellidop || !correo || !contraseña) {
      return res.status(400).json({ mensaje: "Faltan campos obligatorios" });
    }

    await crearUsuarioMIGA({ nombres, apellidop, apellidom, correo, contraseña });

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

