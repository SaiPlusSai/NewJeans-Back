import db from '../db.js';

export async function buscarFavoritosDB(usuarioId, filtros) {
  const { nombre, tipo, anio, fuente, palabra } = filtros;

  let sql = `
    SELECT d.codigo, d.tipo, d.fuente, d.descripcion, d.relevancia, d.anio,
           d.enlace, a.tipo AS aplicacion, d.conceptos_cpe, d.creado_por,
           d.jerarquia, d.vigente
    FROM favoritos f
    JOIN documentos d ON f.documento_codigo = d.codigo
    JOIN aplicacion a ON d.aplicacion_id = a.id
    WHERE f.usuario_id = ? AND d.vigente = TRUE
  `;
  const valores = [usuarioId];

  if (nombre) {
    sql += ` AND LOWER(d.descripcion) COLLATE utf8mb4_general_ci LIKE ?`;
    valores.push(`%${nombre.toLowerCase()}%`);
  }

  if (tipo) {
    sql += ` AND d.tipo = ?`;
    valores.push(tipo);
  }

  if (anio) {
    sql += ` AND d.anio = ?`;
    valores.push(anio);
  }

  if (fuente) {
    sql += ` AND LOWER(d.fuente) COLLATE utf8mb4_general_ci LIKE ?`;
    valores.push(`%${fuente.toLowerCase()}%`);
  }

  if (palabra) {
    sql += ` AND (
      LOWER(d.descripcion) COLLATE utf8mb4_general_ci LIKE ? OR
      LOWER(d.relevancia) COLLATE utf8mb4_general_ci LIKE ?
    )`;
    const palabraLower = `%${palabra.toLowerCase()}%`;
    valores.push(palabraLower, palabraLower);
  }

  sql += ` ORDER BY d.anio DESC, d.codigo ASC`;

  const [rows] = await db.query(sql, valores);
  return rows;
}
