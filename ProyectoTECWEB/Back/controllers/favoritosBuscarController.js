import { buscarFavoritosDB } from '../models/favoritosBuscarModel.js';

export async function buscarFavoritos(req, res) {
  try {
    const usuarioId = req.usuario.id;
    const filtros = req.query;

    const resultados = await buscarFavoritosDB(usuarioId, filtros);
    res.json(resultados);
  } catch (error) {
    console.error('Error al buscar favoritos:', error.message);
    res.status(500).json({ mensaje: 'Error al buscar favoritos' });
  }
}
