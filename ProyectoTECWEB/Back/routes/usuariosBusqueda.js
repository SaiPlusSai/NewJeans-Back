import express from 'express';
import {
  buscarUsuariosPorNombre,
  buscarUsuarioPorIdentificadorController
} from '../controllers/usuariosBusquedaController.js';
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Usuarios Buscar
 *   description: Operaciones relacionadas con los documentos favoritos del usuario
 * 
 * /api/usuarios/buscar-google:
 *   get:
 *     summary: Buscar usuarios por nombre estilo Google
 *     description: >
 *       Busca usuarios coincidentes por nombres y apellidos. Se eliminan tildes,
 *       se convierte a minúsculas y se ignoran palabras cortas (menos de 3 letras).
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
 *         example: maria fernanda lopez
 *     responses:
 *       200:
 *         description: Lista de usuarios encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario buscar'
 *       400:
 *         description: Frase no proporcionada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/buscar-google', verificarToken, buscarUsuariosPorNombre);
/**
 * @swagger
 * /api/usuarios/buscar-identificador:
 *   get:
 *     summary: Buscar usuario por CI, correo o nombre de usuario
 *     description: >
 *       Busca un usuario exacto usando su carnet de identidad, correo electrónico o nombre de usuario (`Usuario_defecto`).
 *     tags: [Usuarios Buscar]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: valor
 *         required: true
 *         schema:
 *           type: string
 *         description: CI, correo electrónico o nombre de usuario
 *         example: juan.perez@correo.com
 *     responses:
 *       200:
 *         description: Usuario encontrado (o lista vacía si no existe)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario Buscar'
 *       400:
 *         description: Valor no proporcionado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/buscar-identificador', verificarToken, buscarUsuarioPorIdentificadorController);
/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario Buscar:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 3
 *         nombres:
 *           type: string
 *           example: María Fernanda
 *         apellidop:
 *           type: string
 *           example: López
 *         apellidom:
 *           type: string
 *           example: Rodríguez
 *         carnet_ci:
 *           type: string
 *           example: 5678901
 *         correo:
 *           type: string
 *           example: maria.lopez@correo.com
 *         Usuario_defecto:
 *           type: string
 *           example: mflopez
 *         rol:
 *           type: string
 *           example: docente
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

export default router;

