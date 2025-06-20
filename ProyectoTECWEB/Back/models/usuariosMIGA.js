import db from '../db.js';

// Crear usuario MIGA (queda igual, se inserta con eliminado = FALSE por defecto si lo definiste así en la tabla)
export async function crearUsuarioMIGA({ nombres, apellidop, apellidom, correo, contraseña }) {
  const sql = `
    INSERT INTO usuarios (
      nombres, apellidop, apellidom, correo, contraseña, rol
    ) VALUES (?, ?, ?, ?, ?, 'MIGA')
  `;
  await db.query(sql, [nombres, apellidop, apellidom, correo, contraseña]);
}

// Listar solo usuarios MIGA que no estén eliminados
export async function listarUsuariosMIGA() {
  const [rows] = await db.query(`
    SELECT id, nombres, apellidop, apellidom, correo, creado_en
    FROM usuarios
    WHERE rol = 'MIGA' AND eliminado = FALSE
    ORDER BY creado_en DESC
  `);
  return rows;
}

// Listar todos los usuarios no eliminados
export async function listarUsuarios() {
  const [rows] = await db.query(`
    SELECT id, nombres, apellidop, apellidom, correo, rol, creado_en
    FROM usuarios
    WHERE eliminado = FALSE
    ORDER BY creado_en DESC
  `);
  return rows;
}

// Cambiar rol (queda igual, no depende de eliminado)
export async function cambiarRolUsuario(id, nuevoRol) {
  await db.query(`
    UPDATE usuarios SET rol = ? WHERE id = ?
  `, [nuevoRol, id]);
}
