import db from '../db.js';

export async function obtenerTodosMacrodistritos() {
  const [filas] = await db.query('SELECT * FROM macrodistritos WHERE eliminado = 0');
  return filas;
}

export async function obtenerMacrodistritoPorId(id) {
  const [filas] = await db.query('SELECT * FROM macrodistritos WHERE id = ? AND eliminado = 0', [id]);
  return filas[0];
}

export async function crearMacrodistrito(nombre, descripcion) {
  const resultado = await db.query('INSERT INTO macrodistritos (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion]);
  return resultado;
}

export async function actualizarMacrodistrito(id, nombre, descripcion) {
  const resultado = await db.query('UPDATE macrodistritos SET nombre = ?, descripcion = ? WHERE id = ?', [nombre, descripcion, id]);
  return resultado;
}

export async function eliminarMacrodistrito(id) {
  const resultado = await db.query('UPDATE macrodistritos SET eliminado = 1 WHERE id = ?', [id]);
  return resultado;
}
