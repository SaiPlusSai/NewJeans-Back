import db from '../db.js';


export async function obtenerTodosAmbitos() {
  const [filas] = await db.query('SELECT * FROM ambitoactividad WHERE eliminado = 0');
  return filas;
}


export async function obtenerAmbitoPorId(id) {
  const [filas] = await db.query('SELECT * FROM ambitoactividad WHERE id = ? AND eliminado = 0', [id]);
  return filas[0];
}


export async function crearAmbito(nombre) {
  const resultado = await db.query('INSERT INTO ambitoactividad (nombre, eliminado) VALUES (?, 0)', [nombre]);
  return resultado;
}


export async function actualizarAmbito(id, nombre) {
  const resultado = await db.query('UPDATE ambitoactividad SET nombre = ? WHERE id = ?', [nombre, id]);
  return resultado;
}


export async function eliminarAmbito(id) {
  const resultado = await db.query('UPDATE ambitoactividad SET eliminado = 1 WHERE id = ?', [id]);
  return resultado;
}
