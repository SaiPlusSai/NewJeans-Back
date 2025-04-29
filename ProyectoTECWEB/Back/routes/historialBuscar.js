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
 *     summary: Busca estilo Google
 *     description: Retorna resultados similares a los de Google basados en una frase
 *     tags: [Búsquedas]
 *     parameters:
 *       - in: query
 *         name: frase
 *         schema:
 *           type: string
 *         required: true
 *         description: Frase de búsqueda al estilo Google
 *         example: alimentacion saludable
 *     responses:
 *       200:
 *         description: Resultados de búsqueda obtenidos exitosamente
 *       400:
 *         description: Parámetro 'frase' no proporcionado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/google-like', busquedaGoogleLike); // GET /api/historial-busqueda/google-like?frase=alimentacion+saludable

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
