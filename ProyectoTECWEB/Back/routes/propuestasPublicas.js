import express from 'express';
import { listarPropuestasPublicas } from '../controllers/propuestasPublicasController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Propuestas Públicas
 *   description: Visualización pública de propuestas enviadas por usuarios comunidad
 */

/**
 * @swagger
 * /api/propuestas-publicas:
 *   get:
 *     summary: Listar todas las propuestas públicas visibles
 *     tags: [Propuestas Públicas]
 *     responses:
 *       200:
 *         description: Lista de propuestas públicas
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
 *                   descripcion:
 *                     type: string
 *                   estado:
 *                     type: string
 *                     enum: [pendiente, aceptada, rechazada]
 *       500:
 *         description: Error del servidor
 */
router.get('/', listarPropuestasPublicas);

export default router;
