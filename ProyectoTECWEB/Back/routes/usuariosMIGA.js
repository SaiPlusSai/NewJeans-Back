import express from 'express';
import { registrarUsuarioMIGA, obtenerUsuariosMIGA } from '../controllers/usuariosMIGAController.js';
import { verificarToken } from '../middleware/auth.js';
import { soloMIGA } from '../middleware/validarRol.js';

const router = express.Router();

// Crear usuario MIGA (solo MIGA puede)
router.post('/', verificarToken, soloMIGA, registrarUsuarioMIGA);

// Ver lista de usuarios MIGA (solo MIGA también, por seguridad)
router.get('/', verificarToken, soloMIGA, obtenerUsuariosMIGA);

export default router;

