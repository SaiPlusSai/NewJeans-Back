import express from 'express';
import {
  agregarFavoritoController,
  eliminarFavoritoController,
  listarFavoritosController
} from '../controllers/favoritosController.js';
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Favoritos
 *   description: Gestión de documentos favoritos por usuario
 */

/**
 * @swagger
 * /api/favoritos/{codigo}:
 *   post:
 *     summary: Agrega un documento a favoritos
 *     tags: [Favoritos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         description: Código del documento a agregar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Documento agregado a favoritos exitosamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Documento no encontrado
 */
router.post('/:codigo', verificarToken, agregarFavoritoController);

/**
 * @swagger
 * /api/favoritos/{codigo}:
 *   delete:
 *     summary: Elimina un documento de favoritos
 *     tags: [Favoritos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         description: Código del documento a eliminar de favoritos
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Documento eliminado de favoritos exitosamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Documento no encontrado o no estaba en favoritos
 */
router.delete('/:codigo', verificarToken, eliminarFavoritoController);

/**
 * @swagger
 * /api/favoritos:
 *   get:
 *     summary: Lista todos los documentos favoritos del usuario autenticado
 *     tags: [Favoritos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de documentos favoritos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codigo:
 *                     type: string
 *                   tipo:
 *                     type: string
 *                   fuente:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   anio:
 *                     type: integer
 *       401:
 *         description: No autorizado
 */
router.get('/', verificarToken, listarFavoritosController);

export default router;
