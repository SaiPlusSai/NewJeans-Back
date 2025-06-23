import db from '../db.js';
export async function generarUsuarioDefecto(nombres, apellidop, apellidom) {
  const base = `${nombres.split(" ")[0].toLowerCase()}.${apellidop.toLowerCase()}`;
  const letraMat = apellidom ? apellidom.charAt(0).toLowerCase() : '';
  
  let candidato = base;
  let contador = 0;

  while (true) {
    const [rows] = await db.query(`
      SELECT id FROM usuarios WHERE Usuario_defecto = ?
    `, [candidato]);

    if (rows.length === 0) break;

    if (contador === 0 && letraMat) {
      candidato = `${base}.${letraMat}`;
    } else {
      candidato = `${base}.${letraMat}${contador}`;
    }

    contador++;
  }

  return candidato;
}
