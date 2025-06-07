import { listarPropuestasPublicas } from '../controllers/propuestasPublicasController.js';
import * as propuestaModel from '../models/propuestaModel.js';

describe('propuestasPublicasController', () => {
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('listarPropuestasPublicas', () => {
    it('devuelve propuestas públicas exitosamente', async () => {
      const mockPropuestas = [
        { id: 1, titulo: 'Propuesta 1', estado: 'aceptada' },
        { id: 2, titulo: 'Propuesta 2', estado: 'aceptada' }
      ];

      jest.spyOn(propuestaModel, 'obtenerPropuestasPublicasGenerales').mockResolvedValue(mockPropuestas);

      await listarPropuestasPublicas({}, mockRes);

      expect(propuestaModel.obtenerPropuestasPublicasGenerales).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockPropuestas);
    });

    it('responde con 500 si ocurre un error', async () => {
      jest.spyOn(propuestaModel, 'obtenerPropuestasPublicasGenerales').mockRejectedValue(new Error('fail'));

      await listarPropuestasPublicas({}, mockRes);

      expect(console.error).toHaveBeenCalledWith('Error al listar propuestas públicas:', expect.any(Error));
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Error interno del servidor' });
    });
  });
});
