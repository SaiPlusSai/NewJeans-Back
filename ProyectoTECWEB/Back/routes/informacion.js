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
 *   name: Información Complementaria
 *   description: Información educativa pública complementaria a las normativas
 */

/**
 * @swagger
 * /api/informacion:
 *   get:
 *     summary: Listar toda la información pública complementaria
 *     tags: [Información Complementaria]
 *     responses:
 *       200:
 *         description: Lista de contenido educativo complementario
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
 *       500:
 *         description: Error del servidor
 */
router.get('/', listarInformacionPublica);

/**
 * @swagger
 * /api/informacion:
 *   post:
 *     summary: Crear nueva información complementaria (solo MIGA)
 *     tags: [Información Complementaria]
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
 *         description: Información creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Solo usuarios MIGA pueden acceder
 */
router.post(
  '/',
  verificarToken,
  soloMIGA,
  body('titulo').notEmpty(),
  body('contenido').notEmpty(),
  crearInformacionController
);

/**
 * @swagger
 * /api/informacion/{id}:
 *   put:
 *     summary: Editar información complementaria existente (solo MIGA)
 *     tags: [Información Complementaria]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérico de la información a editar
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
 *         description: Información actualizada correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Solo usuarios MIGA pueden acceder
 *       404:
 *         description: Información no encontrada
 */
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
