// controllers/reportesController.js
const { validationResult } = require('express-validator');
const reporteModel = require('../models/reporteModel');

const reportesController = {
  getConsultas: async (req, res) => {
    try {
      const data = await reporteModel.getHistorialConsultas();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error al obtener historial:', error);
      res.status(500).json({ error: 'Error al obtener historial de búsquedas' });
    }
  },

  getDocumentos: async (req, res) => {
    try {
      const data = await reporteModel.getDocumentos();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error al obtener documentos:', error);
      res.status(500).json({ error: 'Error al obtener documentos' });
    }
  },

  getDocumentosPorTipo: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });

    const { tipo } = req.params;
    try {
      const data = await reporteModel.getDocumentosPorTipo(tipo);
      res.status(200).json(data);
    } catch (error) {
      console.error('Error al obtener documentos por tipo:', error);
      res.status(500).json({ error: 'Error al obtener documentos por tipo' });
    }
  },

  getDocumentosPorAnio: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });

    const { anio } = req.params;
    try {
      const data = await reporteModel.getDocumentosPorAnio(anio);
      res.status(200).json(data);
    } catch (error) {
      console.error('Error al obtener documentos por año:', error);
      res.status(500).json({ error: 'Error al obtener documentos por año' });
    }
  }
};

module.exports = reportesController;
