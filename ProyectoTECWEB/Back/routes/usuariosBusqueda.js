import express from 'express';
import {
  buscarUsuariosPorNombre,
  buscarUsuarioPorIdentificadorController
} from '../controllers/usuariosBusquedaController.js';
import { verificarToken } from '../middleware/auth.js';
import { soloMIGA } from '../middleware/validarRol.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios Buscar
 *   description: Busqueda al usuario
 * 
 * /api/usuarios/buscar-google:
 *   get:
 *     summary: Buscar usuarios por nombre estilo Google
 *     description: >
 *       Busca usuarios por nombre o apellido con coincidencia parcial. Requiere autenticación y permisos de rol "MIGA".
 *     tags: [Usuarios Buscar]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: frase
 *         required: true
 *         schema:
 *           type: string
 *         description: Frase que contiene el nombre y/o apellidos del usuario
 *         example: fernando lopez
 *     responses:
 *       200:
 *         description: Lista de usuarios encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Frase no proporcionada
 *       403:
 *         description: Acceso denegado por rol
 *       401:
 *         description: Token inválido o ausente
 *       500:
 *         description: Error interno del servidor
 */
router.get('/buscar-google', verificarToken, soloMIGA, buscarUsuariosPorNombre);

/**
 * @swagger
 * /api/usuarios/buscar-identificador:
 *   get:
 *     summary: Buscar usuario por CI, correo o nombre de usuario
 *     description: >
 *       Busca un usuario exacto usando su CI, correo o nombre de usuario (`Usuario_defecto`). Requiere autenticación y rol "MIGA".
 *     tags: [Usuarios Buscar]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: valor
 *         required: true
 *         schema:
 *           type: string
 *         description: CI, correo o nombre de usuario
 *         example: juan.garcia@correo.com
 *     responses:
 *       200:
 *         description: Usuario encontrado (o lista vacía si no existe)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Valor no proporcionado
 *       403:
 *         description: Acceso denegado por rol
 *       401:
 *         description: Token inválido o ausente
 *       500:
 *         description: Error interno del servidor
 */
router.get('/buscar-identificador', verificarToken, soloMIGA, buscarUsuarioPorIdentificadorController);
/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 12
 *         nombres:
 *           type: string
 *           example: Luis Alberto
 *         apellidop:
 *           type: string
 *           example: Ramírez
 *         apellidom:
 *           type: string
 *           example: Salazar
 *         carnet_ci:
 *           type: string
 *           example: 7896541
 *         correo:
 *           type: string
 *           example: luis.ramirez@correo.com
 *         Usuario_defecto:
 *           type: string
 *           example: lramirez
 *         rol:
 *           type: string
 *           example: miga
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

export default router;
