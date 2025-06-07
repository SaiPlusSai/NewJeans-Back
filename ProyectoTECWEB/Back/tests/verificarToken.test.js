import { jest } from '@jest/globals';
import * as jwt from 'jsonwebtoken'; // ✅ Import ESModule compatible
import { verificarToken } from '../middleware/auth.js';

jest.mock('jsonwebtoken'); // ✅ mock clásico para ESM

describe('verificarToken middleware', () => {
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

  test('❌ Retorna 401 si no hay token', () => {
    const req = { headers: {} };
    verificarToken(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ mensaje: 'Token no proporcionado' });
  });

  test('❌ Retorna 403 si el token es inválido', () => {
    const req = { headers: { authorization: 'Bearer token_invalido' } };
    jwt.verify.mockImplementation(() => { throw new Error('Token inválido'); });

    verificarToken(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ mensaje: 'Token inválido o expirado' });
  });

  test('✅ Asigna usuario si el token es válido', () => {
    const usuarioMock = { id: 1, rol: 'MIGA' };
    const req = { headers: { authorization: 'Bearer token_valido' } };
    jwt.verify.mockReturnValue(usuarioMock);

    verificarToken(req, res, next);
    expect(req.usuario).toEqual(usuarioMock);
    expect(next).toHaveBeenCalled();
  });
});
