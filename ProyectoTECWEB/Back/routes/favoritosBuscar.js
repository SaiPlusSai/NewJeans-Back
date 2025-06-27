import express from 'express';
import { buscarFavoritos } from '../controllers/favoritosBuscarController.js';
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/buscar', verificarToken, buscarFavoritos);

export default router;
