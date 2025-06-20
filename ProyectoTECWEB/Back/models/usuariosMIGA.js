import db from '../db.js';

export async function crearUsuarioMIGA({ nombres, apellidop, apellidom, correo, contraseña }) {
  const sql = `
    INSERT INTO usuarios (
      nombres, apellidop, apellidom, correo, contraseña, rol
    ) VALUES (?, ?, ?, ?, ?, 'MIGA')
  `;
  await db.query(sql, [nombres, apellidop, apellidom, correo, contraseña]);
}

export async function listarUsuariosMIGA() {
  const [rows] = await db.query(`
    SELECT id, nombres, apellidop, apellidom, correo, creado_en
    FROM usuarios
    WHERE rol = 'MIGA'
    ORDER BY creado_en DESC
  `);
  return rows;
}
