import db from '../db.js';

// Crear un documento nuevo
export async function crearDocumento(data) {
  const {
    codigo,
    tipo,
    fuente,
    descripcion,
    relevancia,
    anio,
    enlace,
    alcance_id,
    conceptos_cpe,
    categoria_id,
    creado_por
  } = data;

  const sql = `
    INSERT INTO documentos (
      codigo, tipo, fuente, descripcion, relevancia,
      anio, enlace, alcance_id, conceptos_cpe, categoria_id, creado_por
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  await db.query(sql, [
    codigo, tipo, fuente, descripcion, relevancia,
    anio, enlace, alcance_id, conceptos_cpe, categoria_id, creado_por
  ]);
}

// Listar todos los documentos no eliminados
export async function listarDocumentos() {
  const [rows] = await db.query(`
    SELECT d.*, a.tipo AS alcance, c.nombre AS categoria, u.nombres AS creado_por_nombre
    FROM documentos d
    JOIN alcance a ON d.alcance_id = a.id
    JOIN categorias c ON d.categoria_id = c.id
    JOIN usuarios u ON d.creado_por = u.id
    WHERE d.eliminado = FALSE
    ORDER BY d.anio DESC
  `);
  return rows;
}

// Buscar por código
export async function buscarDocumentoPorCodigo(codigo) {
  const [rows] = await db.query('SELECT * FROM documentos WHERE codigo = ?', [codigo]);
  return rows[0];
}

// Editar documento (excepto código y fuente)
export async function editarDocumento(codigo, data) {
  const {
    descripcion,
    relevancia,
    anio,
    enlace,
    alcance_id,
    conceptos_cpe,
    categoria_id
  } = data;

  const sql = `
    UPDATE documentos
    SET descripcion = ?, relevancia = ?, anio = ?, enlace = ?,
        alcance_id = ?, conceptos_cpe = ?, categoria_id = ?
    WHERE codigo = ?
  `;

  await db.query(sql, [
    descripcion, relevancia, anio, enlace,
    alcance_id, conceptos_cpe, categoria_id, codigo
  ]);
}

// Eliminación lógica
export async function eliminarDocumento(codigo) {
  const sql = `
    UPDATE documentos
    SET eliminado = TRUE
    WHERE codigo = ?
  `;
  await db.query(sql, [codigo]);
}

// Restaurar documento eliminado
export async function restaurarDocumento(codigo) {
  const sql = `
    UPDATE documentos
    SET eliminado = FALSE
    WHERE codigo = ?
  `;
  await db.query(sql, [codigo]);
}
