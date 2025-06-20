import db from '../db.js';

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
