/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de autenticación de usuarios
 */

import express from 'express';
import { login } from '../controllers/usuariosController.js';
import { verificarToken } from '../middleware/auth.js';
import { soloMIGA } from '../middleware/validarRol.js';

const router = express.Router();

/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Inicia sesión con las credenciales del usuario.
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *               contraseña:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso, devuelve un token de acceso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciales inválidas o usuario no encontrado.
 *       500:
 *         description: Error en el servidor.
 */
router.post('/login', login);

/**
 * @swagger
 * /api/usuarios/protegido:
 *   get:
 *     summary: Ruta protegida solo para usuarios MIGA
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []  # Indica que esta ruta requiere el token
 *     responses:
 *       200:
 *         description: Acceso correcto
 *       403:
 *         description: Acceso denegado
 *       401:
 *         description: Token no proporcionado o inválido
 */
router.get('/protegido', verificarToken, soloMIGA, (req, res) => {
  res.json({ mensaje: 'Acceso correcto como MIGA', usuario: req.usuario });
});

export default router;

