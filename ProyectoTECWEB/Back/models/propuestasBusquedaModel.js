import db from '../db.js';


export async function buscarPorTituloDescripcion({ tokens }) {
  let sql = `
    SELECT p.id, p.titulo, p.descripcion, p.estado, p.enviada_en,
           u.Usuario_defecto, u.correo,
           CONCAT(u.nombres, ' ', u.apellidop, ' ', u.apellidom) AS autor,
           p.observacion_miga
    FROM propuestas p
    JOIN usuarios u ON p.usuario_id = u.id
    WHERE 1 = 1
  `;

  const valores = [];

  tokens.forEach(p => {
    sql += ` AND (
      LOWER(p.titulo) COLLATE utf8mb4_general_ci LIKE ? OR
      LOWER(p.descripcion) COLLATE utf8mb4_general_ci LIKE ?
    )`;
    const like = `%${p}%`;
    valores.push(like, like);
  });

  sql += ` ORDER BY p.enviada_en DESC`;

  const [rows] = await db.query(sql, valores);
  return rows;
}
export async function buscarPorEstado(estado) {
  const [rows] = await db.query(`
    SELECT p.id, p.titulo, p.descripcion, p.estado, p.enviada_en,
           u.Usuario_defecto, u.correo,
           CONCAT(u.nombres, ' ', u.apellidop, ' ', u.apellidom) AS autor,
           p.observacion_miga
    FROM propuestas p
    JOIN usuarios u ON p.usuario_id = u.id
    WHERE p.estado = ?
    ORDER BY p.enviada_en DESC
  `, [estado]);

  return rows;
}

export async function buscarPorUsuario(usuario) {
  const [rows] = await db.query(`
    SELECT p.id, p.titulo, p.descripcion, p.estado, p.enviada_en,
           u.Usuario_defecto, u.correo,
           CONCAT(u.nombres, ' ', u.apellidop, ' ', u.apellidom) AS autor,
           p.observacion_miga
    FROM propuestas p
    JOIN usuarios u ON p.usuario_id = u.id
    WHERE u.Usuario_defecto = ? OR u.correo = ?
    ORDER BY p.enviada_en DESC
  `, [usuario, usuario]);

  return rows;
}
