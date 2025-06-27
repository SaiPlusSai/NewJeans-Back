import express from 'express';
import {
  palabrasFrecuentesFavoritos,
  palabrasPopularesGlobales,
  buscarEnFavoritosPorPalabra,
  buscarEnFavoritosGoogleLike
} from '../controllers/favoritosBusquedaInteligenteController.js';

import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

// Palabras frecuentes dentro de favoritos
router.get('/palabras-favoritas', verificarToken, palabrasFrecuentesFavoritos);

// Palabras más buscadas por todos los usuarios
router.get('/palabras-populares', verificarToken, palabrasPopularesGlobales);

// Búsqueda por palabra clave dentro de favoritos
router.get('/buscar-palabra', verificarToken, buscarEnFavoritosPorPalabra);

// Búsqueda Google-like (frase dividida) dentro de favoritos
router.get('/buscar-google', verificarToken, buscarEnFavoritosGoogleLike);

export default router;
