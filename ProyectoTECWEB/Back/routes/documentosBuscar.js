import express from 'express';
import { buscarDocumentos } from '../controllers/documentosBuscarController.js';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Documentos Buscar
 *   description: Operaciones relacionadas con búsquedas en el historial
 * /api/buscar:
 *   get:
 *     summary: Buscar documentos con múltiples filtros
 *     description: |
 *       Permite buscar documentos usando diversos criterios como código, tipo, fuente,
 *       descripción, año, etc. Todos los parámetros son combinables.
 *     tags: [Documentos Buscar]
 *     parameters:
 *       - in: query
 *         name: codigo
 *         schema:
 *           type: string
 *         description: Código exacto del documento
 * 
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: enum
 *           enum: [ley, decreto, resolucion, circular, reglamento, otro]
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
 *           minimum: 2000
 *           maximum: 2024
 *         description: Año de publicación del documento
 * 
 *       - in: query
 *         name: aplicacion
 *         schema:
 *           type: integer
 *         description: Ámbito de aplicación del documento
 * 
 *       - in: query
 *         name: jerarquia
 *         schema:
 *           type: enum
 *           enum: [Suprema, Alta, Media alta, Media, Media Baja, Baja]
 *         example: "Media"
 *         description: Nivel de jerarquía/importancia del documento
 * 
 *       - in: query
 *         name: vigente
 *         schema:
 *           type: tinyint
 *         description: Filtrar solo documentos vigentes
 * 
 *     responses:
 *       200:
 *         description: Resultados de la búsqueda
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 datos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Documento'
 *                 meta:
 *                   $ref: '#/components/schemas/Paginacion'
 * 
 *       400:
 *         description: Error en los parámetros de búsqueda
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
 * components:
 *   schemas:
 *     Documento:
 *       type: object
 *       properties:
 *         codigo:
 *           type: string
 *           example: "DOC006"
 *         tipo:
 *           type: string
 *           example: ""
 *         fuente:
 *           type: string
 *           example: "Programa Nacional de Alimentación Escolar"
 *         descripcion:
 *           type: string
 *           example: "Aplica estrategias nutricionales en entornos educativos."
 *         relevancia:
 *           type: string
 *           example: "Artículo 6 fomenta la distribución de alimentos saludables."
 *         anio:
 *           type: integer
 *           example: 2024
 *         enlace:
 *           type: string
 *           format: uri
 *           example: "https://drive.google.com/doc006"
 *         aplicacion_id:
 *           type: integer
 *           example: 3
 *         conceptos_cpe:
 *           type: string
 *           example: "El derecho a la salud y a la alimentación está garantizado por la CPE."
 *         jerarquia:
 *           type: string
 *           example: "Media"
 *         vigente:
 *           type: boolean
 *           example: true
 *         aplicacion:
 *           type: string
 *           example: "Municipal"
 *         creado_por_nombre:
 *           type: string
 *           example: "Admin"
 * 
 *     Paginacion:
 *       type: object
 *       properties:
 *         total:
 *           type: integer
 *           example: 1
 *         pagina:
 *           type: integer
 *           example: 1
 *         totalPaginas:
 *           type: integer
 *           example: 1
 *         limite:
 *           type: integer
 *           example: 10
 * 
 *     Error:
 *       type: object
 *       properties:
 *         codigo:
 *           type: string
 *           example: "ERR_VALIDACION"
 *         mensaje:
 *           type: string
 *           example: "Error de validación en los parámetros"
 *         detalles:
 *           type: array
 *           items:
 *             type: string
 *           example: ["El parámetro 'anio' debe estar entre 2000 y 2024"]
 */
router.get('/', buscarDocumentos);

export default router;