import express from 'express';
import { filtrarPalabras, obtenerPalabrasPopulares } from '../controllers/documentosFiltradoController.js';

const router = express.Router();
/**
 * @swagger
 * /api/filtrado:
 *   get:
 *     summary: Obtener palabras frecuentes de documentos
 *     description: Retorna las palabras más frecuentes encontradas en la descripción y relevancia de los documentos vigentes en la base de datos.
 *     tags:
 *       - Palabras Frecuentes
 *     responses:
 *       200:
 *         description: Lista de palabras frecuentes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 top_palabras:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       palabra:
 *                         type: string
 *                       cantidad:
 *                         type: integer
 *       500:
 *         description: Error en el filtrado inteligente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 */
router.get('/', filtrarPalabras); // Palabras frecuentes en la BD

/**
 * @swagger
 * /api/filtrado/populares:
 *   get:
 *     summary: Obtener palabras populares buscadas por usuarios
 *     description: Retorna las palabras más buscadas por los usuarios en el historial de búsquedas.
 *     tags:
 *       - Palabras Populares
 *     responses:
 *       200:
 *         description: Lista de palabras populares
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 populares:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       palabra:
 *                         type: string
 *                       cantidad:
 *                         type: integer
 *       500:
 *         description: Error al recuperar palabras buscadas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 */
router.get('/populares', obtenerPalabrasPopulares); // Palabras más buscadas por usuarios

export default router;