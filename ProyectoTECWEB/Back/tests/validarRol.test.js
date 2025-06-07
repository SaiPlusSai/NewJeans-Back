import { jest } from '@jest/globals';
import validarRol from '../middleware/validarRol.js';

describe('validarRol middleware', () => {
  let next;
  let res;

  beforeEach(() => {
    next = jest.fn();
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('✅ Permite paso si el rol es correcto', () => {
    const req = { usuario: { rol: 'MIGA' } };
    const middleware = validarRol('MIGA');
    middleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('❌ Bloquea si el rol es incorrecto', () => {
    const req = { usuario: { rol: 'COMUNIDAD' } };
    const middleware = validarRol('MIGA');
    middleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ mensaje: 'Acceso solo para usuarios MIGA' });
  });
});
