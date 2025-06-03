import express from 'express';
import {
  crearInformacionController,
  listarInformacionPublica,
  editarInformacionController
} from '../controllers/informacionController.js';

import { verificarToken } from '../middleware/auth.js';
import { soloMIGA } from '../middleware/validarRol.js';
import { param, body } from 'express-validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Información
 *   description: Gestión de información complementaria

 * /api/informacion:
 *   get:
 *     summary: Obtener información pública
 *     tags: [Información]
 *     responses:
 *       200:
 *         description: Lista de información pública
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   titulo:
 *                     type: string
 *                   contenido:
 *                     type: string
 *                   creado_en:
 *                     type: string
 *                     format: date-time
 *                   nombres:
 *                     type: string
 *       500:
 *         description: Error interno del servidor

 *   post:
 *     summary: Crear nueva información (solo MIGA)
 *     tags: [Información]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - contenido
 *             properties:
 *               titulo:
 *                 type: string
 *               contenido:
 *                 type: string
 *     responses:
 *       201:
 *         description: Información registrada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *       400:
 *         description: Faltan campos requeridos
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido (requiere rol MIGA)
 *       500:
 *         description: Error interno del servidor

 * /api/informacion/{id}:
 *   put:
 *     summary: Editar información existente (solo MIGA)
 *     tags: [Información]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - contenido
 *             properties:
 *               titulo:
 *                 type: string
 *               contenido:
 *                 type: string
 *     responses:
 *       200:
 *         description: Información actualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido (requiere rol MIGA)
 *       500:
 *         description: Error interno del servidor
 */

// Rutas

// Pública
router.get('/', listarInformacionPublica);

// Crear info (solo MIGA)
router.post(
  '/',
  verificarToken,
  soloMIGA,
  body('titulo').notEmpty(),
  body('contenido').notEmpty(),
  crearInformacionController
);

// Editar info (solo MIGA)
router.put(
  '/:id',
  verificarToken,
  soloMIGA,
  param('id').isInt(),
  body('titulo').notEmpty(),
  body('contenido').notEmpty(),
  editarInformacionController
);

export default router;
