import express from 'express';
import { buscarDocumentos } from '../controllers/documentosBuscarController.js';
const router = express.Router();

/**
 * @swagger
 * /documentos/buscar:
 *   get:
 *     summary: Buscar documentos por filtros
 *     description: Retorna documentos vigentes que coinciden con los filtros proporcionados (nombre, tipo, año, fuente o palabra clave).
 *     tags:
 *       - Documentos
 *     parameters:
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         description: Parte del nombre del documento
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: string
 *         description: Tipo exacto del documento (valor del ENUM)
 *       - in: query
 *         name: anio
 *         schema:
 *           type: integer
 *         description: Año de publicación del documento
 *       - in: query
 *         name: fuente
 *         schema:
 *           type: string
 *         description: Parte del nombre de la fuente
 *       - in: query
 *         name: palabra
 *         schema:
 *           type: string
 *         description: Palabra clave dentro de la descripción o relevancia
 *     responses:
 *       200:
 *         description: Lista de documentos que coinciden con los filtros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_documento:
 *                     type: integer
 *                   descripcion:
 *                     type: string
 *                   tipo:
 *                     type: string
 *                   anio:
 *                     type: integer
 *                   fuente:
 *                     type: string
 *                   relevancia:
 *                     type: string
 *                   vigente:
 *                     type: boolean
 *       500:
 *         description: Error interno del servidor
 */
router.get('/documentos/buscar', buscarDocumentos);



export default router;
