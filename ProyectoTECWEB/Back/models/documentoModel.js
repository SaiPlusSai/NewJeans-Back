import db from '../db.js';
import { sufijosPorTipo } from '../utils/sufijos.js';
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
    aplicacion_id,
    conceptos_cpe,
    jerarquia,
    creado_por
  } = data;

  const sql = `
    INSERT INTO documentos (
      codigo, tipo, fuente, descripcion, relevancia,
      anio, enlace, aplicacion_id, conceptos_cpe,
      jerarquia, vigente, creado_por
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, TRUE, ?)
  `;

  await db.query(sql, [
    codigo, tipo, fuente, descripcion, relevancia,
    anio, enlace, aplicacion_id, conceptos_cpe,
    jerarquia, creado_por
  ]);
}

// Listar todos los documentos vigentes
export async function listarDocumentos() {
  const [rows] = await db.query(`
    SELECT d.*, a.tipo AS aplicacion, u.nombres AS creado_por_nombre
    FROM documentos d
    JOIN aplicacion a ON d.aplicacion_id = a.id
    JOIN usuarios u ON d.creado_por = u.id
    WHERE d.vigente = TRUE
    ORDER BY d.anio DESC
  `);
  return rows;
}

// Buscar por código
export async function buscarDocumentoPorCodigo(codigo) {
  const [rows] = await db.query('SELECT * FROM documentos WHERE codigo = ?', [codigo]);
  return rows[0];
}

// Editar documento
export async function editarDocumento(codigo, data) {
  const {
    descripcion,
    relevancia,
    anio,
    enlace,
    aplicacion_id,
    conceptos_cpe,
    jerarquia
  } = data;

  const sql = `
    UPDATE documentos
    SET descripcion = ?, relevancia = ?, anio = ?, enlace = ?,
        aplicacion_id = ?, conceptos_cpe = ?, jerarquia = ?
    WHERE codigo = ?
  `;

  await db.query(sql, [
    descripcion, relevancia, anio, enlace,
    aplicacion_id, conceptos_cpe, jerarquia, codigo
  ]);
}

// Marcar como no vigente
export async function marcarNoVigente(codigo) {
  await db.query('UPDATE documentos SET vigente = FALSE WHERE codigo = ?', [codigo]);
}

// Restaurar
export async function restaurarDocumento(codigo) {
  await db.query('UPDATE documentos SET vigente = TRUE WHERE codigo = ?', [codigo]);
}
// Generador blindado de código
export async function generarCodigoPorTipo(tipo) {
  const sufijo = sufijosPorTipo[tipo?.toLowerCase()];
  if (!sufijo) throw new Error("Tipo inválido");

  const [rows] = await db.query(`
    SELECT codigo FROM documentos 
    WHERE tipo = ? AND codigo LIKE ? 
    ORDER BY codigo DESC LIMIT 10
  `, [tipo, `${sufijo}-%`]);

  let mayorNumero = 0;

  for (const row of rows) {
    const match = row.codigo?.match(new RegExp(`^${sufijo}-(\\d{3})$`));
    if (match) {
      const numero = parseInt(match[1]);
      if (numero > mayorNumero) mayorNumero = numero;
    }
  }

  const siguiente = mayorNumero + 1;
  return `${sufijo}-${String(siguiente).padStart(3, '0')}`;
}