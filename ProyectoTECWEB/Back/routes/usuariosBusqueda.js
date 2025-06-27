import express from 'express';
import {
  buscarUsuariosPorNombre,
  buscarUsuarioPorIdentificadorController
} from '../controllers/usuariosBusquedaController.js';
import { verificarToken } from '../middleware/auth.js';
import { soloMIGA } from '../middleware/validarRol.js';

const router = express.Router();


router.get('/buscar-google', verificarToken, soloMIGA, buscarUsuariosPorNombre);


router.get('/buscar-identificador', verificarToken, soloMIGA, buscarUsuarioPorIdentificadorController);

export default router;
