import db from '../db.js'; // 👈 asegúrate que también uses ESM en `db.js`

const reporteModel = {
  getHistorialConsultas: async () => {
    const [rows] = await db.query(`
      SELECT id, palabra, buscado_donde, buscado_en 
      FROM historial_busqueda
      ORDER BY buscado_en DESC
    `);
    return rows;
  },

  getDocumentos: async () => {
    const [rows] = await db.query(`
      SELECT codigo, tipo, fuente, descripcion, relevancia, anio, enlace, conceptos_cpe, jerarquia 
      FROM documentos 
      WHERE eliminado = FALSE 
      ORDER BY anio DESC, codigo ASC
    `);
    return rows;
  },

  getDocumentosPorTipo: async (tipo) => {
    const [rows] = await db.query(`
      SELECT codigo, tipo, fuente, descripcion, relevancia, anio, enlace, conceptos_cpe, jerarquia 
      FROM documentos 
      WHERE eliminado = FALSE AND tipo = ?
      ORDER BY anio DESC, codigo ASC
    `, [tipo]);
    return rows;
  },

  getDocumentosPorAnio: async (anio) => {
    const [rows] = await db.query(`
      SELECT codigo, tipo, fuente, descripcion, relevancia, anio, enlace, conceptos_cpe, jerarquia 
      FROM documentos 
      WHERE eliminado = FALSE AND anio = ?
      ORDER BY codigo ASC
    `, [anio]);
    return rows;
  }
};

export default reporteModel;
