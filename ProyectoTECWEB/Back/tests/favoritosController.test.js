import {
  agregarFavoritoController,
  eliminarFavoritoController,
  listarFavoritosController
} from '../controllers/favoritosController.js';

import * as favoritosModel from '../models/favoritosModel.js';

describe('favoritosController', () => {
  const reqBase = {
    usuario: { id: 1 },
    params: { codigo: 'ABC123' }
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('agregarFavoritoController', () => {
    it('debería agregar un favorito correctamente', async () => {
      jest.spyOn(favoritosModel, 'agregarFavorito').mockResolvedValue();

      await agregarFavoritoController(reqBase, res);

      expect(favoritosModel.agregarFavorito).toHaveBeenCalledWith(1, 'ABC123');
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Documento agregado a favoritos' });
    });

    it('debería manejar duplicados correctamente', async () => {
      jest.spyOn(favoritosModel, 'agregarFavorito').mockRejectedValue({ code: 'ER_DUP_ENTRY' });

      await agregarFavoritoController(reqBase, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'El documento ya está en favoritos' });
    });

    it('debería manejar otros errores', async () => {
      jest.spyOn(favoritosModel, 'agregarFavorito').mockRejectedValue(new Error('Fallo'));

      await agregarFavoritoController(reqBase, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error interno del servidor' });
    });
  });

  describe('eliminarFavoritoController', () => {
    it('debería eliminar un favorito correctamente', async () => {
      jest.spyOn(favoritosModel, 'eliminarFavorito').mockResolvedValue();

      await eliminarFavoritoController(reqBase, res);

      expect(favoritosModel.eliminarFavorito).toHaveBeenCalledWith(1, 'ABC123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Documento eliminado de favoritos' });
    });

    it('debería manejar errores en eliminar', async () => {
      jest.spyOn(favoritosModel, 'eliminarFavorito').mockRejectedValue(new Error('Fallo'));

      await eliminarFavoritoController(reqBase, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error interno del servidor' });
    });
  });

  describe('listarFavoritosController', () => {
    it('debería devolver los favoritos correctamente', async () => {
      const mockFavs = [{ codigo: 'ABC123' }];
      jest.spyOn(favoritosModel, 'listarFavoritosPorUsuario').mockResolvedValue(mockFavs);

      await listarFavoritosController(reqBase, res);

      expect(favoritosModel.listarFavoritosPorUsuario).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockFavs);
    });

    it('debería manejar errores en listar', async () => {
      jest.spyOn(favoritosModel, 'listarFavoritosPorUsuario').mockRejectedValue(new Error('Fallo'));

      await listarFavoritosController(reqBase, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error interno del servidor' });
    });
  });
});
