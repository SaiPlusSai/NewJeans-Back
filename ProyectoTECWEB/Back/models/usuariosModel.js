import db from '../db.js';
import bcrypt from 'bcrypt';

// Buscar solo usuarios NO eliminados (para login y seguridad)
export async function buscarPorCorreo(correo) {
  const [rows] = await db.query('SELECT * FROM usuarios WHERE correo = ? AND eliminado = FALSE', [correo]);
  return rows[0];
}

// Buscar incluso eliminados
export async function buscarPorCorreoIncluyendoEliminados(correo) {
  const [rows] = await db.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
  return rows[0];
}

// Crear nuevo usuario
export async function crearUsuario(data) {
  const {
    nombres,
    apellidop,
    apellidom,
    carnet_ci,
    correo,
    contraseña,
    rol = 'COMUNIDAD',
    Usuario_defecto = null
  } = data;

  const hash = await bcrypt.hash(contraseña, 10);

  const sql = `
    INSERT INTO usuarios (nombres, apellidop, apellidom, carnet_ci, correo, contraseña, rol, Usuario_defecto, eliminado)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, FALSE)
  `;

  await db.query(sql, [
    nombres,
    apellidop,
    apellidom,
    carnet_ci,
    correo,
    hash,
    rol,
    Usuario_defecto
  ]);
}

// Editar usuario (solo si no está eliminado)
export async function editarUsuario(id, datos) {
  const {
    nombres,
    apellidop,
    apellidom,
    carnet_ci,
    correo,
    contraseña,
    Usuario_defecto
  } = datos;

  let campos = [];
  let valores = [];

  if (nombres) {
    campos.push("nombres = ?");
    valores.push(nombres);
  }
  if (apellidop) {
    campos.push("apellidop = ?");
    valores.push(apellidop);
  }
  if (apellidom) {
    campos.push("apellidom = ?");
    valores.push(apellidom);
  }
  if (carnet_ci) {
    campos.push("carnet_ci = ?");
    valores.push(carnet_ci);
  }
  if (correo) {
    campos.push("correo = ?");
    valores.push(correo);
  }
  if (Usuario_defecto) {
    campos.push("Usuario_defecto = ?");
    valores.push(Usuario_defecto);
  }
  if (contraseña) {
    const hash = await bcrypt.hash(contraseña, 10);
    campos.push("contraseña = ?");
    valores.push(hash);
  }

  if (campos.length === 0) return; // Nada que editar

  valores.push(id);
  const sql = `UPDATE usuarios SET ${campos.join(', ')} WHERE id = ? AND eliminado = FALSE`;
  await db.query(sql, valores);
}