import express from 'express';
import {
  buscarEnFavoritosPorPalabra,
  buscarEnFavoritosGoogleLike
} from '../controllers/favoritosBusquedaInteligenteController.js';

import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * /api/favoritos-inteligente/buscar-palabra:
 *   get:
 *     summary: Buscar en favoritos por palabra clave
 *     description: >
 *       Busca documentos favoritos del usuario autenticado que contengan la palabra clave especificada
 *       en los campos `descripcion` o `relevancia`.
 *     tags: [Favoritos Buscar]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: palabra
 *         required: true
 *         schema:
 *           type: string
 *         description: Palabra clave a buscar en favoritos
 *         example: salud
 *     responses:
 *       200:
 *         description: Documentos favoritos encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DocumentoFavorito'
 *       400:
 *         description: Parámetro 'palabra' no proporcionado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/buscar-palabra', verificarToken, buscarEnFavoritosPorPalabra);

/**
 * @swagger
 * /api/favoritos-inteligente/buscar-google:
 *   get:
 *     summary: Búsqueda estilo Google en favoritos
 *     description: >
 *       Permite buscar documentos favoritos del usuario a partir de una frase, la cual se divide en palabras individuales
 *       que deben aparecer en los campos `descripcion` o `relevancia`.
 *     tags: [Favoritos Buscar]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: frase
 *         required: true
 *         schema:
 *           type: string
 *         description: Frase completa a buscar en favoritos
 *         example: inclusion educativa alimentaria
 *     responses:
 *       200:
 *         description: Documentos favoritos encontrados por coincidencia de frase
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DocumentoFavorito'
 *       400:
 *         description: Parámetro 'frase' no proporcionado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/buscar-google', verificarToken, buscarEnFavoritosGoogleLike);

export default router;
