import db from '../db.js'; // 👈 asegúrate que también uses ESM en `db.js`

const reporteModel = {
  getHistorialConsultas: async () => {
    const [rows] = await db.query(`
      SELECT id, palabra, buscado_donde, buscado_en 
      FROM historial_busquedas
      ORDER BY buscado_en DESC
    `);
    return rows;
  },

  getDocumentos: async () => {
    const [rows] = await db.query(`
      SELECT d.codigo, d.tipo, d.fuente, d.descripcion, d.relevancia, d.anio,
       d.enlace, a.tipo AS aplicacion, d.conceptos_cpe, d.creado_por,
       d.jerarquia, d.vigente
FROM documentos d
JOIN aplicacion a ON d.aplicacion_id = a.id
WHERE d.vigente = TRUE
ORDER BY d.anio DESC, d.codigo ASC;

    `);
    return rows;
  },

  getDocumentosPorTipo: async (tipo) => {
    const [rows] = await db.query(`
      SELECT d.codigo, d.tipo, d.fuente, d.descripcion, d.relevancia, d.anio,
       d.enlace, a.tipo AS aplicacion, d.conceptos_cpe, d.creado_por,
       d.jerarquia, d.vigente
FROM documentos d
JOIN aplicacion a ON d.aplicacion_id = a.id
WHERE d.vigente = TRUE AND d.tipo = ?
ORDER BY d.anio DESC, d.codigo ASC;

    `, [tipo]);
    return rows;
  },

  getDocumentosPorAnio: async (anio) => {
    const [rows] = await db.query(`
      SELECT d.codigo, d.tipo, d.fuente, d.descripcion, d.relevancia, d.anio,
       d.enlace, a.tipo AS aplicacion, d.conceptos_cpe, d.creado_por,
       d.jerarquia, d.vigente
FROM documentos d
JOIN aplicacion a ON d.aplicacion_id = a.id
WHERE d.vigente = TRUE AND d.anio = ?
ORDER BY d.codigo ASC;

    `, [anio]);
    return rows;
  }
};

export default reporteModel;
