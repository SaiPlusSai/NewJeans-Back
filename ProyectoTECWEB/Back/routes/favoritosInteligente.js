import express from 'express';
import {
  buscarEnFavoritosPorPalabra,
  buscarEnFavoritosGoogleLike
} from '../controllers/favoritosBusquedaInteligenteController.js';

import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/buscar-palabra', verificarToken, buscarEnFavoritosPorPalabra);


router.get('/buscar-google', verificarToken, buscarEnFavoritosGoogleLike);

export default router;
