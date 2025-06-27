import express from 'express';
import {
  buscarUsuariosPorNombre,
  buscarUsuarioPorIdentificadorController
} from '../controllers/usuariosBusquedaController.js';
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/buscar-google', verificarToken, buscarUsuariosPorNombre);

router.get('/buscar-identificador', verificarToken, buscarUsuarioPorIdentificadorController);

export default router;

