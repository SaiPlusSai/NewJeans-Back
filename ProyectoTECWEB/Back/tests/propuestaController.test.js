import {
  crearPropuestaController,
  obtenerMisPropuestas,
  obtenerTodasLasPropuestas,
  cambiarEstadoPropuesta
} from '../controllers/propuestasController.js';

import * as propuestaModel from '../models/propuestaModel.js';

describe('propuestaController', () => {
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('crearPropuestaController', () => {
    it('crea una propuesta correctamente', async () => {
      const req = {
        body: { titulo: 'Propuesta A', descripcion: 'Detalle' },
        usuario: { id: 10 }
      };

      jest.spyOn(propuestaModel, 'crearPropuesta').mockResolvedValue();

      await crearPropuestaController(req, mockRes);

      expect(propuestaModel.crearPropuesta).toHaveBeenCalledWith({
        titulo: 'Propuesta A',
        descripcion: 'Detalle',
        usuario_id: 10
      });
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({ mensaje: 'Propuesta enviada correctamente' });
    });

    it('responde 400 si faltan campos', async () => {
      const req = {
        body: { titulo: '' },
        usuario: { id: 2 }
      };

      await crearPropuestaController(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Faltan campos requeridos' });
    });

    it('responde 500 si falla', async () => {
      const req = {
        body: { titulo: 'A', descripcion: 'B' },
        usuario: { id: 5 }
      };

      jest.spyOn(propuestaModel, 'crearPropuesta').mockRejectedValue(new Error('fail'));

      await crearPropuestaController(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Error interno del servidor' });
    });
  });

  describe('obtenerMisPropuestas', () => {
    it('devuelve propuestas del usuario', async () => {
      const req = { usuario: { id: 5 } };
      const mockData = [{ id: 1, titulo: 'X' }];

      jest.spyOn(propuestaModel, 'obtenerPropuestasPorUsuario').mockResolvedValue(mockData);

      await obtenerMisPropuestas(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockData);
    });

    it('error 500 si falla', async () => {
      const req = { usuario: { id: 99 } };

      jest.spyOn(propuestaModel, 'obtenerPropuestasPorUsuario').mockRejectedValue(new Error('fail'));

      await obtenerMisPropuestas(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Error interno del servidor' });
    });
  });

  describe('obtenerTodasLasPropuestas', () => {
    it('devuelve todas las propuestas', async () => {
      const mockData = [{ id: 1, titulo: 'X' }];

      jest.spyOn(propuestaModel, 'obtenerTodasPropuestas').mockResolvedValue(mockData);

      await obtenerTodasLasPropuestas({}, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockData);
    });

    it('error 500 si falla', async () => {
      jest.spyOn(propuestaModel, 'obtenerTodasPropuestas').mockRejectedValue(new Error('fail'));

      await obtenerTodasLasPropuestas({}, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Error interno del servidor' });
    });
  });

  describe('cambiarEstadoPropuesta', () => {
    it('actualiza el estado correctamente', async () => {
      const req = {
        params: { id: '4' },
        body: { estado: 'aceptada', observacion: 'OK' }
      };

      jest.spyOn(propuestaModel, 'actualizarEstadoPropuesta').mockResolvedValue();

      await cambiarEstadoPropuesta(req, mockRes);

      expect(propuestaModel.actualizarEstadoPropuesta).toHaveBeenCalledWith('4', 'aceptada', 'OK');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ mensaje: 'Estado actualizado correctamente' });
    });

    it('responde 400 si estado inválido', async () => {
      const req = {
        params: { id: '4' },
        body: { estado: 'cancelada' }
      };

      await cambiarEstadoPropuesta(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Estado inválido' });
    });

    it('responde 500 si hay error', async () => {
      const req = {
        params: { id: '4' },
        body: { estado: 'rechazada' }
      };

      jest.spyOn(propuestaModel, 'actualizarEstadoPropuesta').mockRejectedValue(new Error('fail'));

      await cambiarEstadoPropuesta(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Error interno del servidor' });
    });
  });
});
