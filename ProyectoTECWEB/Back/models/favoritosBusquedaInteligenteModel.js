import db from '../db.js';

// Top palabras frecuentes dentro de los favoritos
export async function obtenerPalabrasFrecuentesFavoritos(usuarioId) {
  const [rows] = await db.query(`
    SELECT d.descripcion, d.relevancia
    FROM favoritos f
    JOIN documentos d ON f.documento_codigo = d.codigo
    WHERE f.usuario_id = ? AND d.vigente = TRUE
  `, [usuarioId]);

  const textoTotal = rows.map(row => `${row.descripcion} ${row.relevancia}`).join(' ').toLowerCase();
  const sinTildes = textoTotal.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const stopwords = [
    'para', 'con', 'esta', 'este', 'desde', 'donde', 'sobre', 'entre',
    'como', 'pero', 'ademas', 'tambien', 'todos', 'todas', 'segun', 'cada',
    'puede', 'debe', 'haber', 'aqui', 'alli', 'porque', 'cuando', 'ellos',
    'ellas', 'los', 'las', 'por', 'del', 'que', 'una', 'unos', 'unas'
  ];

  const palabras = sinTildes.split(/\W+/).filter(p => p.length > 3 && !stopwords.includes(p));
  const conteo = {};

  palabras.forEach(p => {
    conteo[p] = (conteo[p] || 0) + 1;
  });

  return Object.entries(conteo)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([palabra, cantidad]) => ({ palabra, cantidad }));
}

// Búsqueda simple por palabra clave en favoritos
export async function buscarFavoritosPorPalabra(usuarioId, palabra) {
  const palabraLower = `%${palabra.toLowerCase()}%`;

  const [rows] = await db.query(`
    SELECT d.codigo, d.tipo, d.fuente, d.descripcion, d.relevancia, d.anio,
           d.enlace, a.tipo AS aplicacion, d.conceptos_cpe, d.creado_por,
           d.jerarquia, d.vigente
    FROM favoritos f
    JOIN documentos d ON f.documento_codigo = d.codigo
    JOIN aplicacion a ON d.aplicacion_id = a.id
    WHERE f.usuario_id = ? AND d.vigente = TRUE
      AND (
        LOWER(d.descripcion) COLLATE utf8mb4_general_ci LIKE ? OR
        LOWER(d.relevancia) COLLATE utf8mb4_general_ci LIKE ?
      )
  `, [usuarioId, palabraLower, palabraLower]);

  return rows;
}

// Búsqueda Google-like por frase dividida
export async function buscarFavoritosGoogleLike(usuarioId, frase) {
  const palabras = frase
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, '')
    .split(/\s+/)
    .filter(p => p.length > 2);

  if (palabras.length === 0) return [];

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

  palabras.forEach(p => {
    sql += ` AND (LOWER(d.descripcion) COLLATE utf8mb4_general_ci LIKE ? OR LOWER(d.relevancia) COLLATE utf8mb4_general_ci LIKE ?)`;
    const term = `%${p}%`;
    valores.push(term, term);
  });

  const [rows] = await db.query(sql, valores);
  return rows;
}
