import db from '../db.js';
import bcrypt from 'bcrypt';
// Buscar solo usuarios NO eliminados (para login y seguridad)
export async function buscarPorCorreo(correo) {
  const [rows] = await db.query('SELECT * FROM usuarios WHERE correo = ? AND eliminado = FALSE', [correo]);
  return rows[0];
}

// Buscar incluso usuarios eliminados (por si un admin necesita ver algo)
export async function buscarPorCorreoIncluyendoEliminados(correo) {
  const [rows] = await db.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
  return rows[0];
}
export async function crearUsuario(data) {
  const { nombres, apellidop, apellidom, correo, contraseña, rol = 'COMUNIDAD' } = data;

  const sql = `
    INSERT INTO usuarios (nombres, apellidop, apellidom, correo, contraseña, rol, eliminado)
    VALUES (?, ?, ?, ?, ?, ?, FALSE)
  `;
  await db.query(sql, [nombres, apellidop, apellidom, correo, contraseña, rol]);
}
export async function editarUsuario(id, datos) {
  const { nombres, apellidop, apellidom, correo, contraseña } = datos;

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
  if (correo) {
    campos.push("correo = ?");
    valores.push(correo);
  }
  if (contraseña) {
    const hash = await bcrypt.hash(contraseña, 10);
    campos.push("contraseña = ?");
    valores.push(hash);
  }

  if (campos.length === 0) return; // No hay campos para actualizar

  valores.push(id);

  const sql = `UPDATE usuarios SET ${campos.join(', ')} WHERE id = ? AND eliminado = FALSE`;
  await db.query(sql, valores);
}