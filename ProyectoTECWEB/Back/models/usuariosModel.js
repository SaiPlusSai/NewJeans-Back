import db from '../db.js';

export async function buscarUsuarioPorCorreo(correo) {
  const [rows] = await db.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
  return rows[0];
}