import express from 'express';
import reportesController from '../controllers/reportesController.js';
import { verificarToken } from '../middleware/auth.js'; // seguimos usando export default
import validarRol from '../middleware/validarRol.js';
import { param } from 'express-validator';

// 💡 le cambiamos el nombre aquí

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

router.get('/consultas', verificarToken, validarRol('MIGA'), reportesController.getConsultas);
router.get('/documentos', verificarToken, validarRol('MIGA'), reportesController.getDocumentos);

router.get(
  '/documentos/tipo/:tipo',
  verificarToken,
  validarRol('MIGA'),
  param('tipo').isIn(tiposValidos).withMessage('Tipo de documento no válido'),
  reportesController.getDocumentosPorTipo
);

router.get(
  '/documentos/anio/:anio',
  verificarToken,
  validarRol('MIGA'),
  param('anio').isInt({ min: 1900, max: 2100 }).withMessage('Año no válido'),
  reportesController.getDocumentosPorAnio
);

export default router;
