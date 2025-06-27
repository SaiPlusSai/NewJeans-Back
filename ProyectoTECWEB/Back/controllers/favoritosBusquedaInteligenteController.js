import {
  obtenerPalabrasFrecuentesFavoritos,
  buscarFavoritosPorPalabra,
  buscarFavoritosGoogleLike
} from '../models/favoritosBusquedaInteligenteModel.js';

import {
  guardarBusqueda,
  obtenerPalabrasMasBuscadas
} from '../models/historialBuscarModel.js';

// Palabras más frecuentes dentro de favoritos
export async function palabrasFrecuentesFavoritos(req, res) {
  try {
    const usuarioId = req.usuario.id;
    const top = await obtenerPalabrasFrecuentesFavoritos(usuarioId);
    res.json({ top });
  } catch (error) {
    console.error('Error al filtrar palabras favoritas:', error.message);
    res.status(500).json({ mensaje: 'Error al obtener palabras frecuentes en favoritos' });
  }
}

// Palabras más buscadas por todos los usuarios
export async function palabrasPopularesGlobales(req, res) {
  try {
    const populares = await obtenerPalabrasMasBuscadas();
    res.json({ populares });
  } catch (error) {
    console.error('Error al obtener palabras globales:', error.message);
    res.status(500).json({ mensaje: 'Error al obtener palabras más buscadas' });
  }
}

// Búsqueda por palabra clave (favoritos)
export async function buscarEnFavoritosPorPalabra(req, res) {
  try {
    const usuarioId = req.usuario.id;
    const { palabra } = req.query;

    if (!palabra) {
      return res.status(400).json({ mensaje: 'Debe proporcionar una palabra clave' });
    }

    const resultados = await buscarFavoritosPorPalabra(usuarioId, palabra);
    await guardarBusqueda(palabra, 'ambos');
    res.json(resultados);
  } catch (error) {
    console.error('Error en búsqueda por palabra (favoritos):', error.message);
    res.status(500).json({ mensaje: 'Error al buscar en favoritos por palabra' });
  }
}

// Búsqueda tipo Google (favoritos)
export async function buscarEnFavoritosGoogleLike(req, res) {
  try {
    const usuarioId = req.usuario.id;
    const { frase } = req.query;

    if (!frase) {
      return res.status(400).json({ mensaje: 'Debe proporcionar una frase para buscar' });
    }

    const resultados = await buscarFavoritosGoogleLike(usuarioId, frase);

    const palabras = frase
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, '')
      .split(/\s+/)
      .filter(p => p.length > 2);

    for (const palabra of palabras) {
      await guardarBusqueda(palabra, 'ambos');
    }

    res.json(resultados);
  } catch (error) {
    console.error('Error en búsqueda Google-like (favoritos):', error.message);
    res.status(500).json({ mensaje: 'Error al buscar frase en favoritos' });
  }
}
