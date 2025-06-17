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
 * /api/propuestas/publicas:
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
 *                     example: 1
 *                   titulo:
 *                     type: string
 *                     example: "Comida más saludable"
 *                   descripcion:
 *                     type: string
 *                     example: "Se propone mejorar los almuerzos escolares con frutas y verduras frescas."
 *                   estado:
 *                     type: string
 *                     enum: [pendiente, aceptada, rechazada]
 *                     example: "aceptada"
 *       500:
 *         description: Error del servidor
 */
router.get('/', listarPropuestasPublicas); // Queda así, sin cambios


export default router;
