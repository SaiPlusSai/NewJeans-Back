import {
  filtrarPalabras,
  obtenerPalabrasPopulares
} from '../controllers/documentosFiltradoController.js';

import * as analisisTexto from '../utils/analisisTexto.js';
import * as historialBuscarModel from '../models/historialBuscarModel.js';

describe('documentosFiltradoController', () => {
  describe('filtrarPalabras', () => {
    it('debería devolver palabras frecuentes correctamente', async () => {
      const mockData = [{ palabra: 'educacion', cantidad: 12 }];
      jest.spyOn(analisisTexto, 'obtenerPalabrasFrecuentes').mockResolvedValue(mockData);

      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await filtrarPalabras(req, res);

      expect(res.json).toHaveBeenCalledWith({ top_palabras: mockData });
    });

    it('debería manejar errores en filtrarPalabras', async () => {
      jest.spyOn(analisisTexto, 'obtenerPalabrasFrecuentes').mockRejectedValue(new Error('Error inesperado'));

      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await filtrarPalabras(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Error en el filtrado inteligente' });
    });
  });

  describe('obtenerPalabrasPopulares', () => {
    it('debería devolver palabras populares correctamente', async () => {
      const mockPopulares = [{ palabra: 'salud', veces: 20 }];
      jest.spyOn(historialBuscarModel, 'obtenerPalabrasMasBuscadas').mockResolvedValue(mockPopulares);

      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await obtenerPalabrasPopulares(req, res);

      expect(res.json).toHaveBeenCalledWith({ populares: mockPopulares });
    });

    it('debería manejar errores en obtenerPalabrasPopulares', async () => {
      jest.spyOn(historialBuscarModel, 'obtenerPalabrasMasBuscadas').mockRejectedValue(new Error('Error inesperado'));

      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await obtenerPalabrasPopulares(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Error al recuperar palabras buscadas por usuarios' });
    });
  });
});
