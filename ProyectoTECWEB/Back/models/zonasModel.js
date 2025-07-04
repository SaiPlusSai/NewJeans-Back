import db from '../db.js';

// Modelo para la tabla zonas
export async function obtenerTodasZonas() {
  const [filas] = await db.query('SELECT * FROM zonas WHERE eliminado = FALSE');
  return filas;
}

export async function obtenerZonaPorId(id) {
  const [filas] = await db.query('SELECT * FROM zonas WHERE id = ? AND eliminado = FALSE', [id]);
  return filas[0];
}

// Obtener todas las zonas de un macrodistrito específico
export async function obtenerZonasPorMacrodistrito(macrodistrito_id) {
  const [filas] = await db.query('SELECT * FROM zonas WHERE macrodistrito_id = ? AND eliminado = FALSE', [macrodistrito_id]);
  return filas;
}

export async function crearZona(macrodistrito_id, nombre) {
  const resultado = await db.query('INSERT INTO zonas (macrodistrito_id, nombre) VALUES (?, ?)', [macrodistrito_id, nombre]);
  return resultado;
}

export async function actualizarZona(id, nombre) {
  const resultado = await db.query('UPDATE zonas SET nombre = ? WHERE id = ?', [nombre, id]);
  return resultado;
}

export async function eliminarZona(id) {
  const resultado = await db.query('UPDATE zonas SET eliminado = TRUE WHERE id = ?', [id]);
  return resultado;
}
