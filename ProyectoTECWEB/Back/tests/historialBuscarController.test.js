import {
  buscarPalabrasClave,
  busquedaGoogleLike
} from '../controllers/historialBuscarController.js';

import * as documentosBuscarModel from '../models/documentosBuscarModel.js';
import * as historialBuscarModel from '../models/historialBuscarModel.js';

describe('historialBuscarController', () => {
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('buscarPalabrasClave', () => {
    it('responde con resultados y guarda búsqueda', async () => {
      const req = { query: { palabra: 'salud' } };
      const mockResultados = [{ codigo: '001', descripcion: 'Norma salud' }];

      jest.spyOn(documentosBuscarModel, 'buscarDocumentosDB').mockResolvedValue(mockResultados);
      jest.spyOn(historialBuscarModel, 'guardarBusqueda').mockResolvedValue();

      await buscarPalabrasClave(req, mockRes);

      expect(documentosBuscarModel.buscarDocumentosDB).toHaveBeenCalledWith({ palabra: 'salud' });
      expect(historialBuscarModel.guardarBusqueda).toHaveBeenCalledWith('salud', 'ambos');
      expect(mockRes.json).toHaveBeenCalledWith(mockResultados);
    });

    it('responde con 400 si falta palabra', async () => {
      const req = { query: {} };

      await buscarPalabrasClave(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ mensaje: 'Debe proporcionar una palabra clave' });
    });

    it('responde con 500 si hay error', async () => {
      const req = { query: { palabra: 'error' } };

      jest.spyOn(documentosBuscarModel, 'buscarDocumentosDB').mockRejectedValue(new Error('fail'));

      await buscarPalabrasClave(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ mensaje: 'Error al buscar documentos por palabra clave' });
    });
  });

  describe('busquedaGoogleLike', () => {
    it('responde con resultados y guarda cada palabra', async () => {
      const req = { query: { frase: 'salud escolar integral' } };
      const mockResultados = [{ codigo: '002', descripcion: 'Documento escolar' }];

      jest.spyOn(historialBuscarModel, 'buscarPorPalabrasIndividuales').mockResolvedValue(mockResultados);
      jest.spyOn(historialBuscarModel, 'guardarBusqueda').mockResolvedValue();

      await busquedaGoogleLike(req, mockRes);

      expect(historialBuscarModel.buscarPorPalabrasIndividuales).toHaveBeenCalledWith('salud escolar integral');
      expect(historialBuscarModel.guardarBusqueda).toHaveBeenCalledTimes(3);
      expect(mockRes.json).toHaveBeenCalledWith(mockResultados);
    });

    it('responde con 400 si falta frase', async () => {
      const req = { query: {} };

      await busquedaGoogleLike(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ mensaje: 'Debe proporcionar una frase para buscar' });
    });

    it('responde con 500 si hay error', async () => {
      const req = { query: { frase: 'algo raro' } };

      jest.spyOn(historialBuscarModel, 'buscarPorPalabrasIndividuales').mockRejectedValue(new Error('fail'));

      await busquedaGoogleLike(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ mensaje: 'Error al buscar por frase' });
    });
  });
});
