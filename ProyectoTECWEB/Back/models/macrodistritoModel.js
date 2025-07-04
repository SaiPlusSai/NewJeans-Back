import db from '../db.js';

// Modelo para la tabla macrodistritos
export async function obtenerTodosMacrodistritos() {
  const [filas] = await db.query('SELECT * FROM macrodistritos WHERE eliminado = FALSE');
  return filas;
}

export async function obtenerMacrodistritoPorId(id) {
  const [filas] = await db.query('SELECT * FROM macrodistritos WHERE id = ? AND eliminado = FALSE', [id]);
  return filas[0];
}

export async function crearMacrodistrito(nombre) {
  const resultado = await db.query('INSERT INTO macrodistritos (nombre) VALUES (?)', [nombre]);
  return resultado;
}

export async function actualizarMacrodistrito(id, nombre) {
  const resultado = await db.query('UPDATE macrodistritos SET nombre = ? WHERE id = ?', [nombre, id]);
  return resultado;
}

export async function eliminarMacrodistrito(id) {
  const resultado = await db.query('UPDATE macrodistritos SET eliminado = TRUE WHERE id = ?', [id]);
  return resultado;
}
