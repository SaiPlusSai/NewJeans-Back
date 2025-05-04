import { validationResult } from 'express-validator';
import reporteModel from '../models/reporteModel.js';
import generarPDF from '../services/puppeteerService.js';

const reportesPDFController = {
  getPDFDocumentos: async (req, res) => {
    try {
      const documentos = await reporteModel.getDocumentos();
      const buffer = await generarPDF('reporteDocumentos', { documentos });
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline; filename="documentos.pdf"');
      res.send(buffer);
    } catch (error) {
      res.status(500).json({ error: 'Error al generar PDF de documentos' });
    }
  },

  getPDFDocumentosPorTipo: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });

    try {
      const { tipo } = req.params;
      const documentos = await reporteModel.getDocumentosPorTipo(tipo);
      const buffer = await generarPDF('reportePorTipo', { tipo, documentos });
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename="documentos_${tipo}.pdf"`);
      res.send(buffer);
    } catch (error) {
      res.status(500).json({ error: 'Error al generar PDF por tipo' });
    }
  },

  getPDFDocumentosPorAnio: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });

    try {
      const { anio } = req.params;
      const documentos = await reporteModel.getDocumentosPorAnio(anio);
      const buffer = await generarPDF('reportePorAnio', { anio, documentos });
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename="documentos_${anio}.pdf"`);
      res.send(buffer);
    } catch (error) {
      res.status(500).json({ error: 'Error al generar PDF por año' });
    }
  },

  getPDFConsultas: async (req, res) => {
    try {
      const consultas = await reporteModel.getHistorialConsultas();
      const buffer = await generarPDF('reporteConsultas', { consultas });
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline; filename="consultas.pdf"');
      res.send(buffer);
    } catch (error) {
      res.status(500).json({ error: 'Error al generar PDF de consultas' });
    }
  }
};

export default reportesPDFController;
