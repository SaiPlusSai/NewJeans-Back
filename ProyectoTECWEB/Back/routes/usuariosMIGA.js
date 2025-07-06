import express from 'express';
import {
  registrarUsuarioMIGA,
  obtenerUsuariosMIGA,
  obtenerUsuarios,
  actualizarRolUsuario,
  eliminarUsuario,
  restaurarUsuarioEliminado,
  obtenerUsuariosEliminados,
  registroMIGA
} from '../controllers/usuariosMIGAController.js';
import { verificarToken } from '../middleware/auth.js';
import { soloMIGA } from '../middleware/validarRol.js';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Usuarios MIGA
 *   description: Gestión de usuarios con rol MIGA
 */

/**
 * @swagger
 * /api/usuarios-miga/:
 *   post:
 *     summary: Crear un usuario MIGA
 *     description: Crea un nuevo usuario con rol "MIGA". Solo accesible por usuarios autenticados con rol MIGA.
 *     tags: [Usuarios MIGA]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombres, apellidop, correo, contraseña, macrodistrito_id, ambitoactividad_id, zona_id]
 *             properties:
 *               nombres:
 *                 type: string
 *                 example: Juan
 *               apellidop:
 *                 type: string
 *                 example: Pérez
 *               apellidom:
 *                 type: string
 *                 example: López
 *               carnet_ci:
 *                 type: string
 *                 example: 12345678
 *               correo:
 *                 type: string
 *                 example: juanperez@example.com
 *               contraseña:
 *                 type: string
 *                 example: Secreto123
 *               macrodistrito_id:
 *                 type: integer
 *                 example: 1
 *               ambitoactividad_id:
 *                 type: integer
 *                 example: 2
 *               zona_id:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: Usuario MIGA creado correctamente
 *       400:
 *         description: Faltan campos obligatorios
 *       401:
 *         description: Token inválido o ausente
 *       403:
 *         description: Acceso denegado por rol
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', verificarToken, soloMIGA, registrarUsuarioMIGA);
/**
 * @swagger
 * /api/usuarios-miga/solo-miga:
 *   get:
 *     summary: Listar usuarios con rol MIGA
 *     description: Obtiene todos los usuarios con rol MIGA, con sus relaciones (macrodistrito, ámbito, zona).
 *     tags: [Usuarios MIGA]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios MIGA
 *       401:
 *         description: Token inválido o ausente
 *       403:
 *         description: Acceso denegado por rol
 *       500:
 *         description: Error al obtener usuarios MIGA
 */
router.get('/solo-miga', verificarToken, soloMIGA, obtenerUsuariosMIGA);
/**
 * @swagger
 * /api/usuarios-miga/todos:
 *   get:
 *     summary: Listar todos los usuarios
 *     description: Obtiene todos los usuarios (MIGA y COMUNIDAD), con sus relaciones.
 *     tags: [Usuarios MIGA]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       401:
 *         description: Token inválido o ausente
 *       403:
 *         description: Acceso denegado por rol
 *       500:
 *         description: Error al obtener usuarios
 */
router.get('/todos', verificarToken, soloMIGA, obtenerUsuarios);
/**
 * @swagger
 * /api/usuarios-miga/{id}/rol:
 *   put:
 *     summary: Cambiar el rol de un usuario
 *     description: Cambia el rol de un usuario a "MIGA" o "COMUNIDAD". No puede cambiar el propio rol.
 *     tags: [Usuarios MIGA]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nuevoRol:
 *                 type: string
 *                 enum: [MIGA, COMUNIDAD]
 *                 example: COMUNIDAD
 *     responses:
 *       200:
 *         description: Rol actualizado correctamente
 *       400:
 *         description: Rol inválido
 *       403:
 *         description: No puedes cambiar tu propio rol o acceso denegado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al cambiar rol
 */
router.put('/:id/rol', verificarToken, soloMIGA, actualizarRolUsuario);
/**
 * @swagger
 * /api/usuarios-miga/{id}/eliminar:
 *   put:
 *     summary: Eliminar lógicamente un usuario
 *     description: Marca un usuario como eliminado (no lo borra físicamente).
 *     tags: [Usuarios MIGA]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado lógicamente
 *       404:
 *         description: Usuario no encontrado
 *       403:
 *         description: Acceso denegado por rol
 *       500:
 *         description: Error al eliminar usuario
 */
router.put('/:id/eliminar', verificarToken, soloMIGA, eliminarUsuario);
/**
 * @swagger
 * /api/usuarios-miga/{id}/restaurar:
 *   put:
 *     summary: Restaurar un usuario eliminado lógicamente
 *     tags: [Usuarios MIGA]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a restaurar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario restaurado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Usuario restaurado correctamente
 *       500:
 *         description: Error al restaurar usuario
 */
router.put('/:id/restaurar', verificarToken, soloMIGA, restaurarUsuarioEliminado);
/**
 * @swagger
 * /api/usuarios-miga/eliminados:
 *   get:
 *     summary: Listar usuarios eliminados
 *     description: Muestra todos los usuarios que han sido eliminados lógicamente.
 *     tags: [Usuarios MIGA]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios eliminados
 *       403:
 *         description: Acceso denegado por rol
 *       500:
 *         description: Error al listar usuarios eliminados
 */
router.get('/eliminados', verificarToken, soloMIGA, obtenerUsuariosEliminados);
/**
 * @swagger
 * /api/usuarios-miga/registro-miga:
 *   post:
 *     summary: Registrar usuario MIGA con Usuario_defecto
 *     description: Registra un usuario MIGA generando un `Usuario_defecto` automáticamente.
 *     tags: [Usuarios MIGA]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombres, apellidop, carnet_ci, correo, contraseña, macrodistrito_id, ambitoactividad_id, zona_id]
 *             properties:
 *               nombres:
 *                 type: string
 *                 example: María
 *               apellidop:
 *                 type: string
 *                 example: Gómez
 *               apellidom:
 *                 type: string
 *                 example: Díaz
 *               carnet_ci:
 *                 type: string
 *                 example: 87654321
 *               correo:
 *                 type: string
 *                 example: maria@example.com
 *               contraseña:
 *                 type: string
 *                 example: Clave123
 *               macrodistrito_id:
 *                 type: integer
 *                 example: 3
 *               ambitoactividad_id:
 *                 type: integer
 *                 example: 4
 *               zona_id:
 *                 type: integer
 *                 example: 7
 *     responses:
 *       201:
 *         description: Usuario MIGA creado correctamente con Usuario_defecto
 *       400:
 *         description: Faltan campos o correo ya registrado
 *       403:
 *         description: Acceso denegado por rol
 *       500:
 *         description: Error al registrar usuario
 */
router.post('/registro-miga', verificarToken, soloMIGA, registroMIGA);
export default router;

