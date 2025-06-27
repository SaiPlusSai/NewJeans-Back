import express from 'express';
import { buscarFavoritos } from '../controllers/favoritosBuscarController.js';
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Favoritos Buscar
 *   description: Operaciones relacionadas con los documentos favoritos del usuario
 * 
 * /api/favoritos/buscar:
 *   get:
 *     summary: Buscar documentos favoritos del usuario
 *     description: |
 *       Recupera los documentos marcados como favoritos por el usuario autenticado, 
 *       permitiendo aplicar diversos filtros opcionales como nombre, tipo, año, fuente o palabra clave.
 *     tags: [Favoritos Buscar]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: descripcion
 *         schema:
 *           type: string
 *         description: Búsqueda parcial en la descripción del documento
 * 
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: string
 *           enum: [ley, decreto, resolucion, norma, resolucion_municipal, plan, programa, otro]
 *         description: Tipo de documento (valores predefinidos)
 * 
 *       - in: query
 *         name: fuente
 *         schema:
 *           type: string
 *         description: Búsqueda parcial en el nombre de la fuente
 * 
 *       - in: query
 *         name: anio
 *         schema:
 *           type: integer
 *           format: int32
 *           minimum: 1900
 *           maximum: 2100
 *         description: Año de publicación del documento
 * 
 *       - in: query
 *         name: palabra
 *         schema:
 *           type: string
 *         description: Palabra clave a buscar en descripción o relevancia
 * 
 *     responses:
 *       200:
 *         description: Lista de documentos favoritos filtrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DocumentoFavorito'
 *       401:
 *         description: No autorizado - token inválido o ausente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
 * components:
 *   schemas:
 *     DocumentoFavorito:
 *       type: object
 *       properties:
 *         codigo:
 *           type: string
 *           example: "DOC006"
 *         tipo:
 *           type: string
 *           example: "ley"
 *         fuente:
 *           type: string
 *           example: "Ministerio de Educación"
 *         descripcion:
 *           type: string
 *           example: "Ley de Educación Nacional"
 *         relevancia:
 *           type: string
 *           example: "Alta relevancia para el currículo"
 *         anio:
 *           type: integer
 *           example: 2023
 *         enlace:
 *           type: string
 *           format: uri
 *           example: "https://drive.google.com/doc006"
 *         aplicacion:
 *           type: string
 *           example: "Nacional"
 *         conceptos_cpe:
 *           type: string
 *           example: "Derecho a la educación"
 *         creado_por:
 *           type: string
 *           example: "admin"
 *         jerarquia:
 *           type: string
 *           example: "Alta"
 *         vigente:
 *           type: boolean
 *           example: true
 * 
 *     Error:
 *       type: object
 *       properties:
 *         codigo:
 *           type: string
 *           example: "ERR_INTERNO"
 *         mensaje:
 *           type: string
 *           example: "Error al buscar favoritos"
 */
router.get('/buscar', verificarToken, buscarFavoritos);

export default router;
