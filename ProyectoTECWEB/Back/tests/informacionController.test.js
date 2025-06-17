import {
  crearInformacionController,
  listarInformacionPublica,
  editarInformacionController
} from '../controllers/informacionController.js';

import * as informacionModel from '../models/informacionModel.js';

describe('informacionController', () => {
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('crearInformacionController', () => {
    it('crea información correctamente', async () => {
      const req = {
        body: { titulo: 'Título', contenido: 'Contenido' },
        usuario: { id: 1 }
      };

      jest.spyOn(informacionModel, 'crearInformacion').mockResolvedValue();

      await crearInformacionController(req, mockRes);

      expect(informacionModel.crearInformacion).toHaveBeenCalledWith({
        titulo: 'Título',
        contenido: 'Contenido',
        creado_por: 1
      });
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({ mensaje: 'Información registrada correctamente' });
    });

    it('responde 400 si faltan campos', async () => {
      const req = {
        body: { titulo: '' },
        usuario: { id: 1 }
      };

      await crearInformacionController(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Faltan campos requeridos' });
    });

    it('responde 500 si hay error interno', async () => {
      const req = {
        body: { titulo: 'Algo', contenido: 'Texto' },
        usuario: { id: 1 }
      };

      jest.spyOn(informacionModel, 'crearInformacion').mockRejectedValue(new Error('fail'));

      await crearInformacionController(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Error interno del servidor' });
    });
  });

  describe('listarInformacionPublica', () => {
    it('devuelve la información correctamente', async () => {
      const mockData = [{ id: 1, titulo: 'A', contenido: 'B' }];

      jest.spyOn(informacionModel, 'obtenerInformacionPublica').mockResolvedValue(mockData);

      await listarInformacionPublica({}, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockData);
    });

    it('responde 500 si hay error', async () => {
      jest.spyOn(informacionModel, 'obtenerInformacionPublica').mockRejectedValue(new Error('fail'));

      await listarInformacionPublica({}, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Error interno del servidor' });
    });
  });

  describe('editarInformacionController', () => {
    it('actualiza la información correctamente', async () => {
      const req = {
        params: { id: '5' },
        body: { titulo: 'Nuevo', contenido: 'Texto actualizado' }
      };

      jest.spyOn(informacionModel, 'actualizarInformacion').mockResolvedValue();

      await editarInformacionController(req, mockRes);

      expect(informacionModel.actualizarInformacion).toHaveBeenCalledWith('5', 'Nuevo', 'Texto actualizado');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ mensaje: 'Información actualizada' });
    });

    it('responde 500 si hay error', async () => {
      const req = {
        params: { id: '2' },
        body: { titulo: 'err', contenido: 'err' }
      };

      jest.spyOn(informacionModel, 'actualizarInformacion').mockRejectedValue(new Error('fail'));

      await editarInformacionController(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Error interno del servidor' });
    });
  });
});
