import { Router } from 'express';
import * as macrodistritoController from '../controllers/macrodistritoController.js';
import { verificarToken } from '../middleware/auth.js';
import { soloMIGA } from '../middleware/validarRol.js';

const router = Router();
/**
 * @swagger
 * /api/macrodistritos:
 *   get:
 *     summary: Obtener todos los macrodistritos
 *     tags: [Macrodistritos]
 *     responses:
 *       200:
 *         description: Lista de macrodistritos
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
 *                   nombre:
 *                     type: string
 *                     example: "Centro"
 *                   descripcion:
 *                     type: string
 *                     example: "Macrodistrito central de la ciudad"
 *                   eliminado:
 *                     type: integer
 *                     example: 0
 *       500:
 *         description: Error del servidor
 */
router.get('/macrodistritos', macrodistritoController.obtenerMacrodistritos);
/**
 * @swagger
 * /api/macrodistritos:
 *   post:
 *     summary: Crear un nuevo macrodistrito
 *     tags: [Macrodistritos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - descripcion
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Sur"
 *               descripcion:
 *                 type: string
 *                 example: "Zona sur de la ciudad"
 *     responses:
 *       201:
 *         description: Macrodistrito creado exitosamente
 *       400:
 *         description: Faltan campos obligatorios
 *       500:
 *         description: Error del servidor
 */
router.post('/macrodistritos', verificarToken, soloMIGA, macrodistritoController.crearMacrodistrito);
/**
 * @swagger
 * /api/macrodistritos/{id}:
 *   put:
 *     summary: Actualizar un macrodistrito
 *     tags: [Macrodistritos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del macrodistrito
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - descripcion
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Centro Actualizado"
 *               descripcion:
 *                 type: string
 *                 example: "Descripción actualizada del macrodistrito"
 *     responses:
 *       200:
 *         description: Macrodistrito actualizado exitosamente
 *       400:
 *         description: Faltan campos obligatorios
 *       500:
 *         description: Error del servidor
 */
router.put('/macrodistritos/:id', verificarToken, soloMIGA, macrodistritoController.actualizarMacrodistrito);
/**
 * @swagger
 * /api/macrodistritos/{id}:
 *   delete:
 *     summary: Eliminar un macrodistrito (eliminación lógica)
 *     tags: [Macrodistritos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del macrodistrito
 *     responses:
 *       200:
 *         description: Macrodistrito eliminado exitosamente
 *       500:
 *         description: Error del servidor
 */
router.delete('/macrodistritos/:id', verificarToken, soloMIGA, macrodistritoController.eliminarMacrodistrito);

export default router;
