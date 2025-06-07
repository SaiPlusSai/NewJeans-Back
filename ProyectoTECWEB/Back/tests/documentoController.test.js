import {
  registrarDocumento,
  obtenerDocumentos,
  obtenerDocumentoPorCodigo,
  actualizarDocumento,
  eliminarDoc,
  restaurarDoc
} from '../controllers/documentosController.js';

import * as documentoModel from '../models/documentoModel.js';

jest.mock('../models/documentoModel.js');

const mockRes = () => {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  return res;
};

describe('documentoController', () => {
  beforeEach(() => jest.clearAllMocks());

  test('registrarDocumento - éxito', async () => {
    const req = {
      body: {
        codigo: 'ABC123',
        tipo: 'ley',
        fuente: 'Gaceta',
        descripcion: 'Una ley importante',
        relevancia: 'Alta',
        anio: 2022,
        enlace: 'http://ley.com',
        aplicacion_id: 1,
        conceptos_cpe: 'Educación',
        jerarquia: 'Alta'
      },
      usuario: { id: 1 }
    };
    const res = mockRes();

    await registrarDocumento(req, res);

    expect(documentoModel.crearDocumento).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
  });

  test('registrarDocumento - falta campo', async () => {
    const req = {
      body: {
        tipo: 'ley' // falta campos
      },
      usuario: { id: 1 }
    };
    const res = mockRes();

    await registrarDocumento(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ mensaje: expect.any(String) }));
  });

  test('obtenerDocumentos - éxito', async () => {
    const req = {};
    const res = mockRes();

    documentoModel.listarDocumentos.mockResolvedValue([{ codigo: '123' }]);
    await obtenerDocumentos(req, res);

    expect(res.json).toHaveBeenCalledWith([{ codigo: '123' }]);
  });

  test('obtenerDocumentoPorCodigo - documento no encontrado', async () => {
    const req = { params: { codigo: 'NO_EXISTE' } };
    const res = mockRes();

    documentoModel.buscarDocumentoPorCodigo.mockResolvedValue(null);
    await obtenerDocumentoPorCodigo(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('actualizarDocumento - éxito', async () => {
    const req = { params: { codigo: 'X001' }, body: { descripcion: 'Nueva' } };
    const res = mockRes();

    await actualizarDocumento(req, res);

    expect(documentoModel.editarDocumento).toHaveBeenCalledWith('X001', { descripcion: 'Nueva' });
    expect(res.json).toHaveBeenCalledWith({ mensaje: 'Documento actualizado' });
  });

  test('eliminarDoc - éxito', async () => {
    const req = { params: { codigo: 'DEL001' } };
    const res = mockRes();

    await eliminarDoc(req, res);

    expect(documentoModel.marcarNoVigente).toHaveBeenCalledWith('DEL001');
    expect(res.json).toHaveBeenCalledWith({ mensaje: 'Documento marcado como NO vigente' });
  });

  test('restaurarDoc - éxito', async () => {
    const req = { params: { codigo: 'RES001' } };
    const res = mockRes();

    await restaurarDoc(req, res);

    expect(documentoModel.restaurarDocumento).toHaveBeenCalledWith('RES001');
    expect(res.json).toHaveBeenCalledWith({ mensaje: 'Documento restaurado' });
  });
});
