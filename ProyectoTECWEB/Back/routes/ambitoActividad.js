import { Router } from 'express';
import * as ambitoActividadController from '../controllers/ambitoActividadController.js';
import { verificarToken } from '../middleware/auth.js';
import { soloMIGA } from '../middleware/validarRol.js';

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Ámbitos de Actividad
 *   description: Gestión de ámbitos de actividad (requiere rol MIGA para modificar)
 */
/**
 * @swagger
 * /api/ambitos:
 *   get:
 *     summary: Listar todos los ámbitos de actividad
 *     description: Devuelve todos los ámbitos no eliminados.
 *     tags: [Ámbitos de Actividad]
 *     responses:
 *       200:
 *         description: Lista de ámbitos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ambito'
 *       500:
 *         description: Error al obtener los ámbitos
 */
router.get('/ambitos', ambitoActividadController.obtenerAmbitos);
/**
 * @swagger
 * /api/ambitos:
 *   post:
 *     summary: Crear un nuevo ámbito de actividad
 *     description: Requiere autenticación y rol MIGA.
 *     tags: [Ámbitos de Actividad]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre]
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Comercio
 *     responses:
 *       201:
 *         description: Ámbito creado exitosamente
 *       500:
 *         description: Error al crear el ámbito
 */
router.post('/ambitos', verificarToken, soloMIGA, ambitoActividadController.crearAmbito);
/**
 * @swagger
 * /api/ambitos/{id}:
 *   put:
 *     summary: Actualizar un ámbito por ID
 *     description: Requiere autenticación y rol MIGA.
 *     tags: [Ámbitos de Actividad]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del ámbito a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre]
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Servicios
 *     responses:
 *       200:
 *         description: Ámbito actualizado exitosamente
 *       500:
 *         description: Error al actualizar el ámbito
 */
router.put('/ambitos/:id', verificarToken, soloMIGA, ambitoActividadController.actualizarAmbito);
/**
 * @swagger
 * /api/ambitos/{id}:
 *   delete:
 *     summary: Eliminar (lógicamente) un ámbito por ID
 *     description: Marca el ámbito como eliminado. Requiere autenticación y rol MIGA.
 *     tags: [Ámbitos de Actividad]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del ámbito a eliminar
 *     responses:
 *       200:
 *         description: Ámbito eliminado exitosamente
 *       500:
 *         description: Error al eliminar el ámbito
 */
router.delete('/ambitos/:id', verificarToken, soloMIGA, ambitoActividadController.eliminarAmbito);
/**
 * @swagger
 * components:
 *   schemas:
 *     Ambito:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: Comercio
 *         eliminado:
 *           type: boolean
 *           example: false
 */

export default router;
