import express from 'express';
import reportesPDFController from '../controllers/reportesPDFController.js';
import { verificarToken } from '../middleware/auth.js';
import validarRol from '../middleware/validarRol.js';
import { param } from 'express-validator';

const router = express.Router();

const tiposValidos = [
  'ley', 'decreto', 'resolucion', 'plan', 'norma',
  'resolucion_municipal', 'programa', 'otro'
];

/**
 * @swagger
 * tags:
 *   name: Reportes PDF
 *   description: Descarga de reportes en formato PDF (solo MIGA)
 */

/**
 * @swagger
 * /api/reportes-pdf/documentos:
 *   get:
 *     summary: Descargar reporte PDF con todos los documentos vigentes
 *     tags: [Reportes PDF]
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/pdf
 *     responses:
 *       200:
 *         description: PDF generado con éxito
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Solo usuarios MIGA pueden acceder
 */
router.get('/documentos', verificarToken, validarRol('MIGA'), reportesPDFController.getPDFDocumentos);

/**
 * @swagger
 * /api/reportes-pdf/documentos/tipo/{tipo}:
 *   get:
 *     summary: Descargar reporte PDF de documentos filtrados por tipo
 *     tags: [Reportes PDF]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tipo
 *         required: true
 *         description: Tipo de documento (ley, decreto, etc.)
 *         schema:
 *           type: string
 *           enum: [ley, decreto, resolucion, plan, norma, resolucion_municipal, programa, otro]
 *     produces:
 *       - application/pdf
 *     responses:
 *       200:
 *         description: PDF generado con éxito
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Tipo no válido
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Solo usuarios MIGA pueden acceder
 */
router.get('/documentos/tipo/:tipo',
  verificarToken,
  validarRol('MIGA'),
  param('tipo').isIn(tiposValidos),
  reportesPDFController.getPDFDocumentosPorTipo
);

/**
 * @swagger
 * /api/reportes-pdf/documentos/anio/{anio}:
 *   get:
 *     summary: Descargar reporte PDF de documentos filtrados por año
 *     tags: [Reportes PDF]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: anio
 *         required: true
 *         description: Año de publicación
 *         schema:
 *           type: integer
 *           minimum: 1900
 *           maximum: 2100
 *     produces:
 *       - application/pdf
 *     responses:
 *       200:
 *         description: PDF generado con éxito
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Año no válido
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Solo usuarios MIGA pueden acceder
 */
router.get('/documentos/anio/:anio',
  verificarToken,
  validarRol('MIGA'),
  param('anio').isInt({ min: 1900, max: 2100 }),
  reportesPDFController.getPDFDocumentosPorAnio
);

/**
 * @swagger
 * /api/reportes-pdf/consultas:
 *   get:
 *     summary: Descargar reporte PDF de consultas realizadas por usuarios
 *     tags: [Reportes PDF]
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/pdf
 *     responses:
 *       200:
 *         description: PDF generado con éxito
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Solo usuarios MIGA pueden acceder
 */
router.get('/consultas', verificarToken, validarRol('MIGA'), reportesPDFController.getPDFConsultas);

export default router;
