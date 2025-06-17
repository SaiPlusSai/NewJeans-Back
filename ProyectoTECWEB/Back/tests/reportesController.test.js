// tests/reportesController.test.js

import reportesController from '../controllers/reportesController.js';
import reporteModel from '../models/reporteModel.js';
import { validationResult } from 'express-validator';

jest.mock('../models/reporteModel.js', () => ({
  getHistorialConsultas: jest.fn(),
  getDocumentos: jest.fn(),
  getDocumentosPorTipo: jest.fn(),
  getDocumentosPorAnio: jest.fn()
}));

jest.mock('express-validator', () => ({
  validationResult: jest.fn()
}));

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('reportesController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getConsultas debe retornar datos correctamente', async () => {
    const req = {};
    const res = mockResponse();
    const data = [{ palabra: 'salud' }];
    reporteModel.getHistorialConsultas.mockResolvedValue(data);

    await reportesController.getConsultas(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(data);
  });

  test('getDocumentos debe retornar documentos correctamente', async () => {
    const req = {};
    const res = mockResponse();
    const data = [{ codigo: 'DOC001' }];
    reporteModel.getDocumentos.mockResolvedValue(data);

    await reportesController.getDocumentos(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(data);
  });

  test('getDocumentosPorTipo con validación OK', async () => {
    const req = { params: { tipo: 'ley' } };
    const res = mockResponse();
    const data = [{ tipo: 'ley' }];
    validationResult.mockReturnValue({ isEmpty: () => true });
    reporteModel.getDocumentosPorTipo.mockResolvedValue(data);

    await reportesController.getDocumentosPorTipo(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(data);
  });

  test('getDocumentosPorTipo con validación inválida', async () => {
    const req = { params: { tipo: 'otro' } };
    const res = mockResponse();
    validationResult.mockReturnValue({ isEmpty: () => false, array: () => ['error'] });

    await reportesController.getDocumentosPorTipo(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ errores: ['error'] });
  });

  test('getDocumentosPorAnio con validación OK', async () => {
    const req = { params: { anio: '2024' } };
    const res = mockResponse();
    const data = [{ anio: '2024' }];
    validationResult.mockReturnValue({ isEmpty: () => true });
    reporteModel.getDocumentosPorAnio.mockResolvedValue(data);

    await reportesController.getDocumentosPorAnio(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(data);
  });

  test('getDocumentosPorAnio con validación inválida', async () => {
    const req = { params: { anio: '2024' } };
    const res = mockResponse();
    validationResult.mockReturnValue({ isEmpty: () => false, array: () => ['error'] });

    await reportesController.getDocumentosPorAnio(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ errores: ['error'] });
  });
});
