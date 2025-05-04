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

router.get('/pdf/documentos', verificarToken, validarRol('MIGA'), reportesPDFController.getPDFDocumentos);

router.get('/pdf/documentos/tipo/:tipo',
  verificarToken,
  validarRol('MIGA'),
  param('tipo').isIn(tiposValidos),
  reportesPDFController.getPDFDocumentosPorTipo
);

router.get('/pdf/documentos/anio/:anio',
  verificarToken,
  validarRol('MIGA'),
  param('anio').isInt({ min: 1900, max: 2100 }),
  reportesPDFController.getPDFDocumentosPorAnio
);

router.get('/pdf/consultas', verificarToken, validarRol('MIGA'), reportesPDFController.getPDFConsultas);

export default router;
