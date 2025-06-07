import { register, login, perfil } from '../controllers/usuariosController.js';
import * as usuariosModel from '../models/usuariosModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

jest.mock('../models/usuariosModel.js');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('🧪 usuariosController', () => {
  beforeEach(() => jest.clearAllMocks());

  test('✅ register crea un usuario correctamente', async () => {
    const req = {
      body: {
        nombres: 'Jean',
        apellidop: 'Fernandez',
        apellidom: 'Silva',
        correo: 'jean@mail.com',
        contraseña: '123456'
      }
    };
    const res = mockResponse();

    usuariosModel.buscarPorCorreo.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashedpass');
    usuariosModel.crearUsuario.mockResolvedValue();

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ mensaje: 'Usuario undefined creado correctamente' });
  });

  test('❌ register falla por campos faltantes', async () => {
    const req = { body: { correo: '', contraseña: '' } };
    const res = mockResponse();

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ mensaje: 'Faltan campos obligatorios' });
  });

  test('❌ register rechaza si correo ya registrado', async () => {
    const req = {
      body: {
        nombres: 'Jean',
        correo: 'jean@mail.com',
        contraseña: '123'
      }
    };
    const res = mockResponse();
    usuariosModel.buscarPorCorreo.mockResolvedValue({ id: 1 });

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ mensaje: 'Correo ya registrado' });
  });

  test('✅ login exitoso', async () => {
    const req = {
      body: {
        correo: 'jean@mail.com',
        contraseña: '123456'
      }
    };
    const res = mockResponse();
    const fakeUser = {
      id: 1,
      nombres: 'Jean',
      apellidop: 'F.',
      apellidom: 'S.',
      correo: 'jean@mail.com',
      contraseña: 'hashed',
      rol: 'MIGA'
    };

    usuariosModel.buscarPorCorreo.mockResolvedValue(fakeUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('fake-jwt-token');

    await login(req, res);

    expect(res.json).toHaveBeenCalledWith({
      mensaje: 'Login exitoso',
      token: 'fake-jwt-token',
      usuario: {
        id: 1,
        nombres: 'Jean',
        apellidop: 'F.',
        apellidom: 'S.',
        rol: 'MIGA'
      }
    });
  });

  test('❌ login con usuario no encontrado', async () => {
    const req = { body: { correo: 'no@mail.com', contraseña: '123' } };
    const res = mockResponse();
    usuariosModel.buscarPorCorreo.mockResolvedValue(null);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ mensaje: 'Usuario no encontrado' });
  });

  test('❌ login con contraseña incorrecta', async () => {
    const req = { body: { correo: 'jean@mail.com', contraseña: 'wrong' } };
    const res = mockResponse();
    usuariosModel.buscarPorCorreo.mockResolvedValue({ contraseña: 'hashed' });
    bcrypt.compare.mockResolvedValue(false);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ mensaje: 'Contraseña incorrecta' });
  });

  test('✅ perfil devuelve usuario del token', () => {
    const req = { usuario: { id: 1, nombres: 'Jean' } };
    const res = mockResponse();

    perfil(req, res);

    expect(res.json).toHaveBeenCalledWith({
      mensaje: 'Token válido',
      usuario: { id: 1, nombres: 'Jean' }
    });
  });
});
