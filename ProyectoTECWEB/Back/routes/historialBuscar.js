import express from 'express';
import { buscarPalabrasClave, busquedaGoogleLike } from '../controllers/historialBuscarController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Búsquedas
 *     description: Operaciones relacionadas con búsquedas en los campos de descripción y relevancia de los documentos.
 */

/**
 * @swagger
 * /api/historial-busqueda:
 *   get:
 *     summary: Buscar documentos por palabra clave
 *     description: >
 *       Busca una palabra específica en los campos `descripcion` y `relevancia` de los documentos.
 *       Además, almacena esta búsqueda en el historial de palabras clave buscadas.
 *     tags: [Búsquedas]
 *     parameters:
 *       - in: query
 *         name: palabra
 *         required: true
 *         schema:
 *           type: string
 *         description: Palabra clave que se buscará en los documentos
 *         example: alimentacion
 *     responses:
 *       200:
 *         description: Lista de documentos que contienen la palabra clave
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Documento'
 *       400:
 *         description: Parámetro 'palabra' no proporcionado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', buscarPalabrasClave);

/**
 * @swagger
 * /api/historial-busqueda/google-like:
 *   get:
 *     summary: Búsqueda estilo Google (por frase)
 *     description: >
 *       Divide una frase en palabras individuales y busca coincidencias en los campos `descripcion` y `relevancia` de los documentos vigentes.
 *       Este método no guarda en el historial de búsqueda.
 *     tags: [Búsquedas]
 *     parameters:
 *       - in: query
 *         name: frase
 *         required: true
 *         schema:
 *           type: string
 *         description: Frase completa que será dividida en palabras clave
 *         example: alimentacion saludable escolar
 *     responses:
 *       200:
 *         description: Lista de documentos relacionados con la frase
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Documento'
 *       400:
 *         description: Parámetro 'frase' no proporcionado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/google-like', busquedaGoogleLike);

export default router;
