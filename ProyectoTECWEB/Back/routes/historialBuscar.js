import express from 'express';
import { buscarPalabrasClave,busquedaGoogleLike, } from '../controllers/historialBuscarController.js';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Búsquedas
 *   description: Operaciones relacionadas con búsquedas en el historial
 */

/**
 * @swagger
 * /api/historial-busqueda/google-like:
 *   get:
 *     summary: Realiza una búsqueda al estilo Google
 *     description: Retorna resultados similares a los de Google basados en los parámetros de búsqueda
 *     tags: [Búsquedas]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Frase o término de búsqueda
 *         example: "alimentación saludable"
 *     responses:
 *       200:
 *         description: Resultados de búsqueda obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ResultadoBusqueda'
 *       400:
 *         description: Parámetro de búsqueda no proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Debe proporcionar una frase para buscar"
 *       500:
 *         description: Error interno del servidor
 */

router.get('/google-like', busquedaGoogleLike);
/**
 * @swagger
 * /api/historial-busqueda:
 *   get:
 *     summary: Busca por palabras clave
 *     description: Retorna resultados basados en palabras clave específicas
 *     tags: [Búsquedas]
 *     parameters:
 *       - in: query
 *         name: palabra
 *         schema:
 *           type: string
 *         required: true
 *         description: Palabra clave para la búsqueda
 *         example: alimentacion
 *     responses:
 *       200:
 *         description: Resultados de búsqueda obtenidos exitosamente
 *       400:
 *         description: Parámetro 'palabra' no proporcionado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', buscarPalabrasClave); // GET /api/historial-busqueda?palabra=alimentacion

export default router;
