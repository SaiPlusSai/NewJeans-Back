import db from '../db.js';

export async function obtenerTodasZonas() {
  const [filas] = await db.query('SELECT * FROM zonas_macrodistrito WHERE eliminado = 0');
  return filas;
}

export async function obtenerZonaPorId(id) {
  const [filas] = await db.query('SELECT * FROM zonas_macrodistrito WHERE id = ? AND eliminado = 0', [id]);
  return filas[0];
}

export async function obtenerZonasPorMacrodistrito(macrodistrito_id) {
  const [filas] = await db.query('SELECT * FROM zonas_macrodistrito WHERE macrodistrito_id = ? AND eliminado = 0', [macrodistrito_id]);
  return filas;
}

export async function crearZona(macrodistrito_id, nombre) {
  const resultado = await db.query('INSERT INTO zonas_macrodistrito (macrodistrito_id, nombre_zona, eliminado) VALUES (?, ?, 0)', [macrodistrito_id, nombre]);
  return resultado;
}


export async function actualizarZona(id, nombre) {
  const resultado = await db.query('UPDATE zonas_macrodistrito SET nombre_zona = ? WHERE id = ?', [nombre, id]);
  return resultado;
}

export async function eliminarZona(id) {
  const resultado = await db.query('UPDATE zonas_macrodistrito SET eliminado = 1 WHERE id = ?', [id]);
  return resultado;
}
export async function zonaExiste(macrodistrito_id, nombre) {
  const [filas] = await db.query(
    'SELECT * FROM zonas_macrodistrito WHERE macrodistrito_id = ? AND nombre_zona = ? AND eliminado = 0',
    [macrodistrito_id, nombre]
  );
  return filas.length > 0;
}
