import db from '../db.js';
import bcrypt from 'bcryptjs';

// Buscar un usuario por correo
export async function buscarPorCorreo(correo) {
  const [rows] = await db.query('SELECT * FROM usuarios WHERE correo = ? AND eliminado = FALSE', [correo]);
  return rows[0];
}

// Buscar un usuario por correo, incluyendo eliminados
export async function buscarPorCorreoIncluyendoEliminados(correo) {
  const [rows] = await db.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
  return rows[0];
}

// Crear un nuevo usuario, asignando el rol 'COMUNIDAD'
export async function crearUsuario(data) {
  const {
    nombres,
    apellidop,
    apellidom,
    carnet_ci,
    correo,
    contraseña, 
    rol = 'COMUNIDAD',  // Asegurando que el rol sea 'COMUNIDAD' por defecto
    Usuario_defecto = null,
    macrodistrito_id,
    ambitoactividad_id,
    zona_id
  } = data;

  const sql = `
    INSERT INTO usuarios (nombres, apellidop, apellidom, carnet_ci, correo, contraseña, rol, Usuario_defecto, macrodistrito_id, ambitoactividad_id, zona_id, eliminado)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, FALSE)
  `;

  await db.query(sql, [
    nombres,
    apellidop,
    apellidom,
    carnet_ci,
    correo,
    contraseña, 
    rol,
    Usuario_defecto,
    macrodistrito_id,
    ambitoactividad_id,
    zona_id
  ]);
}

// Editar datos de un usuario
export async function editarUsuario(id, datos) {
  const {
    nombres,
    apellidop,
    apellidom,
    carnet_ci,
    correo,
    contraseña,
    Usuario_defecto,
    macrodistrito_id,
    ambitoactividad_id,
    zona_id
  } = datos;

  let campos = [];
  let valores = [];

  // Agregar los campos modificados a la consulta SQL
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
  if (macrodistrito_id) {
    campos.push("macrodistrito_id = ?");
    valores.push(macrodistrito_id);
  }
  if (ambitoactividad_id) {
    campos.push("ambitoactividad_id = ?");
    valores.push(ambitoactividad_id);
  }
  if (zona_id) {
    campos.push("zona_id = ?");
    valores.push(zona_id);
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
