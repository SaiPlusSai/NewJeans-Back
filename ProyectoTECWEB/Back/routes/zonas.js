import { Router } from 'express';
import * as zonasController from '../controllers/zonasController.js';
import { verificarToken } from '../middleware/auth.js';
import { soloMIGA } from '../middleware/validarRol.js';

const router = Router();
/**
 * @swagger
 * /api/zonas:
 *   get:
 *     summary: Obtener todas las zonas
 *     tags: [Zonas]
 *     responses:
 *       200:
 *         description: Lista de zonas
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
 *                   macrodistrito_id:
 *                     type: integer
 *                     example: 2
 *                   nombre_zona:
 *                     type: string
 *                     example: "Zona Centro"
 *                   eliminado:
 *                     type: integer
 *                     example: 0
 *       500:
 *         description: Error del servidor
 */
router.get('/zonas', zonasController.obtenerZonas);
/**
 * @swagger
 * /api/macrodistrito/{macrodistrito_id}/zonas:
 *   get:
 *     summary: Obtener todas las zonas de un macrodistrito específico
 *     tags: [Zonas]
 *     parameters:
 *       - in: path
 *         name: macrodistrito_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del macrodistrito
 *     responses:
 *       200:
 *         description: Lista de zonas del macrodistrito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 3
 *                   macrodistrito_id:
 *                     type: integer
 *                     example: 1
 *                   nombre_zona:
 *                     type: string
 *                     example: "Zona Norte"
 *                   eliminado:
 *                     type: integer
 *                     example: 0
 *       404:
 *         description: No se encontraron zonas para este macrodistrito
 *       500:
 *         description: Error del servidor
 */
router.get('/macrodistrito/:macrodistrito_id/zonas', zonasController.obtenerZonasPorMacrodistrito);
/**
 * @swagger
 * /api/zonas:
 *   post:
 *     summary: Crear una nueva zona
 *     tags: [Zonas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - macrodistrito_id
 *               - nombre
 *             properties:
 *               macrodistrito_id:
 *                 type: integer
 *                 example: 1
 *               nombre:
 *                 type: string
 *                 example: "Zona Sur"
 *     responses:
 *       201:
 *         description: Zona creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Zona creada exitosamente
 *       400:
 *         description: Ya existe una zona con ese nombre en el macrodistrito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Ya existe una zona con ese nombre en el macrodistrito
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error al crear la zona
 *                 error:
 *                   type: string
 *                   example: Error detallado
 */
router.post('/zonas', verificarToken, soloMIGA, zonasController.crearZona);
/**
 * @swagger
 * /api/zonas/{id}:
 *   put:
 *     summary: Actualizar una zona
 *     tags: [Zonas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la zona
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Zona Actualizada"
 *     responses:
 *       200:
 *         description: Zona actualizada exitosamente
 *       500:
 *         description: Error del servidor
 */
router.put('/zonas/:id', verificarToken, soloMIGA, zonasController.actualizarZona);
/**
 * @swagger
 * /api/zonas/{id}:
 *   delete:
 *     summary: Eliminar una zona (eliminación lógica)
 *     tags: [Zonas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la zona
 *     responses:
 *       200:
 *         description: Zona eliminada exitosamente
 *       500:
 *         description: Error del servidor
 */
router.delete('/zonas/:id', verificarToken, soloMIGA, zonasController.eliminarZona);

export default router;

