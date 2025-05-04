// routes/reportes.js
const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reportesController');
const auth = require('../middleware/auth');
const validarRol = require('../middleware/validarRol');
const { param } = require('express-validator');

// Tipos válidos
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

// Protegido por token + rol
router.get('/consultas', auth, validarRol('MIGA'), reportesController.getConsultas);

router.get('/documentos', auth, validarRol('MIGA'), reportesController.getDocumentos);

router.get(
  '/documentos/tipo/:tipo',
  auth,
  validarRol('MIGA'),
  param('tipo').isIn(tiposValidos).withMessage('Tipo de documento no válido'),
  reportesController.getDocumentosPorTipo
);

router.get(
  '/documentos/anio/:anio',
  auth,
  validarRol('MIGA'),
  param('anio').isInt({ min: 1900, max: 2100 }).withMessage('Año no válido'),
  reportesController.getDocumentosPorAnio
);

module.exports = router;
