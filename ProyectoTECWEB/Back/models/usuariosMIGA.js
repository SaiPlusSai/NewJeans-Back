import db from '../db.js';

// Crear un nuevo usuario, incluyendo las relaciones con macrodistrito_id, ambitoactividad_id y zona_id
export async function crearUsuarioMIGA(data) {
  const {
    nombres,
    apellidop,
    apellidom,
    carnet_ci,
    correo,
    contraseña,
    Usuario_defecto,
    macrodistrito_id,
    ambitoactividad_id,
    zona_id
  } = data;

  // Verificar si la zona está asociada al macrodistrito
  const [zonaValida] = await db.query(`
    SELECT id 
    FROM zonas_macrodistrito 
    WHERE macrodistrito_id = ? AND id = ?
  `, [macrodistrito_id, zona_id]);

  if (!zonaValida || zonaValida.length === 0) {
    throw new Error("La zona no está asociada al macrodistrito especificado.");
  }

  const sql = `
    INSERT INTO usuarios (
      nombres, apellidop, apellidom, carnet_ci, correo, contraseña, rol, Usuario_defecto, 
      macrodistrito_id, ambitoactividad_id, zona_id, eliminado
    ) 
    VALUES (?, ?, ?, ?, ?, ?, 'MIGA', ?, ?, ?, ?, 0)
  `;

  await db.query(sql, [
    nombres, apellidop, apellidom, carnet_ci, correo, contraseña, Usuario_defecto,
    macrodistrito_id, ambitoactividad_id, zona_id
  ]);
}

// Obtener todos los usuarios MIGA sin eliminar, con JOIN para obtener los nombres relacionados
export async function listarUsuariosMIGA() {
  const [rows] = await db.query(`
    SELECT 
      u.id, u.nombres, u.apellidop, u.apellidom, u.carnet_ci, u.correo, u.Usuario_defecto, 
      m.nombre AS macrodistrito_nombre, a.nombre AS ambito_nombre, 
      z.nombre_zona, u.creado_en
    FROM usuarios u
    LEFT JOIN macrodistritos m ON u.macrodistrito_id = m.id
    LEFT JOIN ambitoactividad a ON u.ambitoactividad_id = a.id  -- Se dejó solo el nombre de ambitoactividad
    LEFT JOIN zonas_macrodistrito z ON u.zona_id = z.id
    WHERE u.rol = 'MIGA' AND u.eliminado = 0
    ORDER BY u.creado_en DESC
  `);
  return rows;
}

// Listar todos los usuarios no eliminados (MIGA + COMUNIDAD), con JOIN
export async function listarUsuarios() {
  const [rows] = await db.query(`
    SELECT 
      u.id, u.nombres, u.apellidop, u.apellidom, u.carnet_ci, u.correo, u.rol, u.Usuario_defecto,
      m.nombre AS macrodistrito_nombre, a.nombre AS ambito_nombre, 
      z.nombre_zona, u.creado_en
    FROM usuarios u
    LEFT JOIN macrodistritos m ON u.macrodistrito_id = m.id
    LEFT JOIN ambitoactividad a ON u.ambitoactividad_id = a.id  -- Se dejó solo el nombre de ambitoactividad
    LEFT JOIN zonas_macrodistrito z ON u.zona_id = z.id
    WHERE u.eliminado = 0
    ORDER BY u.creado_en DESC
  `);
  return rows;
}

// Cambiar el rol de un usuario
export async function cambiarRolUsuario(id, nuevoRol) {
  await db.query(`
    UPDATE usuarios SET rol = ? WHERE id = ?
  `, [nuevoRol, id]);
}

// Eliminación lógica (marcar como eliminado)
export async function eliminarLogicoUsuario(id) {
  await db.query(`
    UPDATE usuarios SET eliminado = 1 WHERE id = ? 
  `, [id]);
}

// Restaurar usuario eliminado
export async function restaurarUsuario(id) {
  await db.query(`
    UPDATE usuarios SET eliminado = 0 WHERE id = ? 
  `, [id]);
}

// Listar usuarios eliminados
export async function listarUsuariosEliminados() {
  const [rows] = await db.query(`
    SELECT 
      u.id, u.nombres, u.apellidop, u.apellidom, u.carnet_ci, u.correo, u.rol, u.Usuario_defecto, 
      m.nombre AS macrodistrito_nombre, a.nombre AS ambito_nombre, 
      z.nombre_zona, u.creado_en
    FROM usuarios u
    LEFT JOIN macrodistritos m ON u.macrodistrito_id = m.id
    LEFT JOIN ambitoactividad a ON u.ambitoactividad_id = a.id  -- Se dejó solo el nombre de ambitoactividad
    LEFT JOIN zonas_macrodistrito z ON u.zona_id = z.id
    WHERE u.eliminado = 1
    ORDER BY u.creado_en DESC
  `);
  return rows;
}

// Buscar un usuario por ID
export async function buscarUsuarioPorId(id) {
  const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
  return rows[0];
}

// Buscar un usuario por correo
export async function buscarPorCorreo(correo) {
  const [rows] = await db.query('SELECT * FROM usuarios WHERE correo = ? AND eliminado = 0', [correo]);
  return rows[0];
}