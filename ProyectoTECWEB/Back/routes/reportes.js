import express from 'express';
import reportesController from '../controllers/reportesController.js';
import { verificarToken } from '../middleware/auth.js';
import validarRol from '../middleware/validarRol.js';
import { param } from 'express-validator';

const router = express.Router();

const tiposValidos = [
  'ley',
  'decreto',
  'resolucion',
  'plan',
  'norma',
  'resolucion_municipal',
  'programa',
  'otro'
];

/**
 * @swagger
 * tags:
 *   name: Reportes
 *   description: Generación de reportes administrativos (solo MIGA)
 */

/**
 * @swagger
 * /api/reportes/consultas:
 *   get:
 *     summary: Obtener reporte de consultas realizadas por los usuarios
 *     tags: [Reportes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reporte de historial de consultas
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Solo usuarios MIGA pueden acceder
 */
router.get('/consultas', verificarToken, validarRol('MIGA'), reportesController.getConsultas);

/**
 * @swagger
 * /api/reportes/documentos:
 *   get:
 *     summary: Obtener listado general de documentos vigentes
 *     tags: [Reportes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de documentos
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Solo usuarios MIGA pueden acceder
 */
router.get('/documentos', verificarToken, validarRol('MIGA'), reportesController.getDocumentos);

/**
 * @swagger
 * /api/reportes/documentos/tipo/{tipo}:
 *   get:
 *     summary: Obtener documentos filtrados por tipo
 *     tags: [Reportes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tipo
 *         required: true
 *         description: Tipo de documento (ley, decreto, plan, etc.)
 *         schema:
 *           type: string
 *           enum: [ley, decreto, resolucion, plan, norma, resolucion_municipal, programa, otro]
 *     responses:
 *       200:
 *         description: Lista de documentos por tipo
 *       400:
 *         description: Tipo de documento no válido
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Solo usuarios MIGA pueden acceder
 */
router.get(
  '/documentos/tipo/:tipo',
  verificarToken,
  validarRol('MIGA'),
  param('tipo').isIn(tiposValidos).withMessage('Tipo de documento no válido'),
  reportesController.getDocumentosPorTipo
);

/**
 * @swagger
 * /api/reportes/documentos/anio/{anio}:
 *   get:
 *     summary: Obtener documentos filtrados por año
 *     tags: [Reportes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: anio
 *         required: true
 *         description: Año de publicación del documento (ej. 2023)
 *         schema:
 *           type: integer
 *           minimum: 1900
 *           maximum: 2100
 *     responses:
 *       200:
 *         description: Lista de documentos por año
 *       400:
 *         description: Año no válido
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Solo usuarios MIGA pueden acceder
 */
router.get(
  '/documentos/anio/:anio',
  verificarToken,
  validarRol('MIGA'),
  param('anio').isInt({ min: 1900, max: 2100 }).withMessage('Año no válido'),
  reportesController.getDocumentosPorAnio
);

export default router;
