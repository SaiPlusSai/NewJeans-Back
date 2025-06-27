import db from '../db.js';

export async function buscarUsuariosPorNombreGoogleLike(frase) {
  const tokens = frase
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, '')
    .split(/\s+/)
    .filter(p => p.length > 2);

  if (tokens.length === 0) return [];

  let sql = `
    SELECT id, nombres, apellidop, apellidom, carnet_ci, correo, Usuario_defecto, rol
    FROM usuarios
    WHERE eliminado = FALSE
  `;
  const valores = [];

  tokens.forEach(token => {
    sql += ` AND (
      LOWER(nombres) COLLATE utf8mb4_general_ci LIKE ? OR
      LOWER(apellidop) COLLATE utf8mb4_general_ci LIKE ? OR
      LOWER(apellidom) COLLATE utf8mb4_general_ci LIKE ?
    )`;
    const like = `%${token}%`;
    valores.push(like, like, like);
  });

  const [rows] = await db.query(sql, valores);
  return rows;
}

export async function buscarUsuarioPorIdentificador(valor) {
  const [rows] = await db.query(`
    SELECT id, nombres, apellidop, apellidom, carnet_ci, correo, Usuario_defecto, rol
    FROM usuarios
    WHERE eliminado = FALSE AND (
      carnet_ci = ? OR correo = ? OR Usuario_defecto = ?
    )
  `, [valor, valor, valor]);

  return rows;
}
