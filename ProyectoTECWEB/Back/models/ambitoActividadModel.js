import db from '../db.js';

// Modelo para la tabla ambito_actividad
export async function obtenerTodosAmbitos() {
  const [filas] = await db.query('SELECT * FROM ambito_actividad WHERE eliminado = FALSE');
  return filas;
}

export async function obtenerAmbitoPorId(id) {
  const [filas] = await db.query('SELECT * FROM ambito_actividad WHERE id = ? AND eliminado = FALSE', [id]);
  return filas[0];
}

export async function crearAmbito(nombre) {
  const resultado = await db.query('INSERT INTO ambito_actividad (nombre) VALUES (?)', [nombre]);
  return resultado;
}

export async function actualizarAmbito(id, nombre) {
  const resultado = await db.query('UPDATE ambito_actividad SET nombre = ? WHERE id = ?', [nombre, id]);
  return resultado;
}

export async function eliminarAmbito(id) {
  const resultado = await db.query('UPDATE ambito_actividad SET eliminado = TRUE WHERE id = ?', [id]);
  return resultado;
}
