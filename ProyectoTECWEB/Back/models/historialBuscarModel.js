import db from '../db.js';

export async function guardarBusqueda(palabra, buscado_donde) {
  await db.query(
    'INSERT INTO historial_busquedas (palabra, buscado_donde) VALUES (?, ?)',
    [palabra.toLowerCase(), buscado_donde]
  );
}
export async function obtenerPalabrasMasBuscadas() {
  const [rows] = await db.query(`
    SELECT palabra, COUNT(*) as cantidad
    FROM historial_busquedas
    GROUP BY palabra
    ORDER BY cantidad DESC
    LIMIT 20
  `);
  return rows;
}