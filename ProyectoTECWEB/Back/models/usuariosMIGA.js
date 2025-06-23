import db from '../db.js';
import bcrypt from 'bcrypt';

// Crear usuario MIGA con contraseña encriptada
export async function crearUsuarioMIGA({ nombres, apellidop, apellidom, carnet_ci, correo, contraseña, Usuario_defecto = null }) {
  const hash = await bcrypt.hash(contraseña, 10);

  const sql = `
    INSERT INTO usuarios (
      nombres, apellidop, apellidom, carnet_ci, correo, contraseña, rol, Usuario_defecto, eliminado
    ) VALUES (?, ?, ?, ?, ?, ?, 'MIGA', ?, FALSE)
  `;

  await db.query(sql, [nombres, apellidop, apellidom, carnet_ci, correo, hash, Usuario_defecto]);
}

// Listar solo usuarios MIGA no eliminados
export async function listarUsuariosMIGA() {
  const [rows] = await db.query(`
    SELECT id, nombres, apellidop, apellidom, carnet_ci, correo, Usuario_defecto, creado_en
    FROM usuarios
    WHERE rol = 'MIGA' AND eliminado = FALSE
    ORDER BY creado_en DESC
  `);
  return rows;
}

// Listar todos los usuarios no eliminados (MIGA + COMUNIDAD)
export async function listarUsuarios() {
  const [rows] = await db.query(`
    SELECT id, nombres, apellidop, apellidom, carnet_ci, correo, rol, Usuario_defecto, creado_en
    FROM usuarios
    WHERE eliminado = FALSE
    ORDER BY creado_en DESC
  `);
  return rows;
}

// Cambiar rol de un usuario
export async function cambiarRolUsuario(id, nuevoRol) {
  await db.query(`
    UPDATE usuarios SET rol = ? WHERE id = ?
  `, [nuevoRol, id]);
}

// Eliminación lógica (marcar como eliminado)
export async function eliminarLogicoUsuario(id) {
  await db.query(`
    UPDATE usuarios SET eliminado = TRUE WHERE id = ?
  `, [id]);
}

// Restaurar usuario eliminado
export async function restaurarUsuario(id) {
  await db.query(`
    UPDATE usuarios SET eliminado = FALSE WHERE id = ?
  `, [id]);
}

// Listar usuarios eliminados
export async function listarUsuariosEliminados() {
  const [rows] = await db.query(`
    SELECT id, nombres, apellidop, apellidom, carnet_ci, correo, rol, Usuario_defecto, creado_en
    FROM usuarios
    WHERE eliminado = TRUE
    ORDER BY creado_en DESC
  `);
  return rows;
}
