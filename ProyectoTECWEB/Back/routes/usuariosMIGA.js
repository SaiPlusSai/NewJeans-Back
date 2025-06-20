import express from 'express';
import { registrarUsuarioMIGA, obtenerUsuariosMIGA,obtenerUsuarios, actualizarRolUsuario
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
 * /api/usuarios-miga:
 *   post:
 *     summary: Registrar un nuevo usuario con rol MIGA
 *     tags: [Usuarios MIGA]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombres
 *               - apellidop
 *               - correo
 *               - contraseña
 *             properties:
 *               nombres:
 *                 type: string
 *               apellidop:
 *                 type: string
 *               apellidom:
 *                 type: string
 *               correo:
 *                 type: string
 *                 format: email
 *               contraseña:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario MIGA creado correctamente
 *       400:
 *         description: Faltan campos obligatorios
 *       500:
 *         description: Error del servidor
 */
router.post('/', verificarToken, soloMIGA, registrarUsuarioMIGA);
/**
 * @swagger
 * /api/usuarios-miga/solo-miga:
 *   get:
 *     summary: Obtener todos los usuarios con rol MIGA
 *     tags: [Usuarios MIGA]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios MIGA
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombres:
 *                     type: string
 *                   apellidop:
 *                     type: string
 *                   apellidom:
 *                     type: string
 *                   correo:
 *                     type: string
 *                   creado_en:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error del servidor
 */
router.get('/solo-miga', verificarToken, soloMIGA, obtenerUsuariosMIGA);
/**
 * @swagger
 * /api/usuarios-miga/todos:
 *   get:
 *     summary: Obtener todos los usuarios registrados
 *     tags: [Usuarios MIGA]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista completa de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombres:
 *                     type: string
 *                   apellidop:
 *                     type: string
 *                   apellidom:
 *                     type: string
 *                   correo:
 *                     type: string
 *                   rol:
 *                     type: string
 *                   creado_en:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error del servidor
 */
router.get('/', verificarToken, soloMIGA, obtenerUsuarios);
/**
 * @swagger
 * /api/usuarios-miga/{id}/rol:
 *   put:
 *     summary: Actualizar el rol de un usuario (MIGA o COMUNIDAD)
 *     tags: [Usuarios MIGA]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nuevoRol
 *             properties:
 *               nuevoRol:
 *                 type: string
 *                 enum: [MIGA, COMUNIDAD]
 *     responses:
 *       200:
 *         description: Rol actualizado correctamente
 *       400:
 *         description: Rol inválido
 *       500:
 *         description: Error del servidor
 */

router.get('/todos', verificarToken, soloMIGA, obtenerUsuarios);

router.put('/:id/rol', verificarToken, soloMIGA, actualizarRolUsuario);

export default router;

