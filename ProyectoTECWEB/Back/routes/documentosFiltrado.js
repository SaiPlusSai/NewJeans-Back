import express from 'express';
import { filtrarPalabras, obtenerPalabrasPopulares } from '../controllers/documentosFiltradoController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Palabras Frecuentes
 *     description: Análisis de los documentos para encontrar las palabras más repetidas.
 *   - name: Palabras Populares
 *     description: Palabras clave más buscadas por los usuarios en el sistema.
 */

/**
 * @swagger
 * /api/filtrado:
 *   get:
 *     summary: Obtener palabras frecuentes de documentos
 *     description: >
 *       Analiza los campos de `descripcion` y `relevancia` de todos los documentos marcados como vigentes (`vigente = TRUE`),
 *       eliminando stopwords y aplicando stemming para identificar las **20 palabras más frecuentes**.
 *       
 *       Esto se basa únicamente en el contenido de los documentos, no en lo que los usuarios buscan.
 *     tags:
 *       - Palabras Frecuentes
 *     responses:
 *       200:
 *         description: Lista de palabras más comunes en los documentos
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
 *                         example: "aliment"
 *                       cantidad:
 *                         type: integer
 *                         example: 8
 *       500:
 *         description: Error en el filtrado inteligente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error en el filtrado inteligente"
 */
router.get('/', filtrarPalabras);

/**
 * @swagger
 * /api/filtrado/populares:
 *   get:
 *     summary: Obtener palabras populares buscadas por usuarios
 *     description: >
 *       Devuelve las palabras o frases más buscadas por los usuarios en el sistema, según el campo `historial_busquedas`.
 *       Esta información permite entender **lo que los usuarios realmente están buscando** en el contenido.
 *       
 *       Útil para mostrar nubes de palabras, sugerencias de búsqueda o análisis de comportamiento.
 *     tags:
 *       - Palabras Populares
 *     responses:
 *       200:
 *         description: Lista de palabras más buscadas por los usuarios
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
 *                         example: "alimentacion"
 *                       cantidad:
 *                         type: integer
 *                         example: 5
 *       500:
 *         description: Error al recuperar palabras buscadas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al recuperar palabras buscadas"
 */
router.get('/populares', obtenerPalabrasPopulares);

export default router;
