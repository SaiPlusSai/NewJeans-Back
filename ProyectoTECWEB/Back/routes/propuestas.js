import express from 'express';
import {
  crearPropuestaController,
  obtenerMisPropuestas,
  obtenerTodasLasPropuestas,
  cambiarEstadoPropuesta
} from '../controllers/propuestasController.js';

import { verificarToken } from '../middleware/auth.js';
import { soloMIGA, soloComunidad } from '../middleware/validarRol.js';
import { body, param } from 'express-validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Propuestas
 *   description: Gestión de propuestas de normativas por parte de la comunidad
 */

/**
 * @swagger
 * /api/propuestas:
 *   post:
 *     summary: Crear una nueva propuesta de normativa (solo Comunidad)
 *     tags: [Propuestas]
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
 *               - descripcion
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Propuesta creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Solo usuarios de tipo Comunidad pueden acceder
 */
router.post(
  '/',
  verificarToken,
  soloComunidad,
  body('titulo').notEmpty().withMessage('El título es obligatorio'),
  body('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
  crearPropuestaController
);

/**
 * @swagger
 * /api/propuestas/mis:
 *   get:
 *     summary: Obtener las propuestas propias del usuario autenticado (solo Comunidad)
 *     tags: [Propuestas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de propuestas del usuario
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Solo usuarios Comunidad pueden acceder
 */
router.get('/mis', verificarToken, soloComunidad, obtenerMisPropuestas);

/**
 * @swagger
 * /api/propuestas:
 *   get:
 *     summary: Obtener todas las propuestas registradas (solo MIGA)
 *     tags: [Propuestas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista completa de propuestas
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Solo usuarios MIGA pueden acceder
 */
router.get('/', verificarToken, soloMIGA, obtenerTodasLasPropuestas);

/**
 * @swagger
 * /api/propuestas/{id}/estado:
 *   patch:
 *     summary: Cambiar el estado de una propuesta (solo MIGA)
 *     tags: [Propuestas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérico de la propuesta
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - estado
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [pendiente, aceptada, rechazada]
 *     responses:
 *       200:
 *         description: Estado actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Solo usuarios MIGA pueden acceder
 *       404:
 *         description: Propuesta no encontrada
 */
router.patch(
  '/:id/estado',
  verificarToken,
  soloMIGA,
  param('id').isInt().withMessage('ID inválido'),
  body('estado').isIn(['pendiente', 'aceptada', 'rechazada']).withMessage('Estado no válido'),
  cambiarEstadoPropuesta
);

export default router;
