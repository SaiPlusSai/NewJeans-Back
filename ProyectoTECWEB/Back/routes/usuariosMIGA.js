import express from 'express';
import { registrarUsuarioMIGA, obtenerUsuariosMIGA,obtenerUsuarios, actualizarRolUsuario
 } from '../controllers/usuariosMIGAController.js';
import { verificarToken } from '../middleware/auth.js';
import { soloMIGA } from '../middleware/validarRol.js';

const router = express.Router();


router.post('/', verificarToken, soloMIGA, registrarUsuarioMIGA);

router.get('/solo-miga', verificarToken, soloMIGA, obtenerUsuariosMIGA);

router.get('/todos', verificarToken, soloMIGA, obtenerUsuarios);

router.put('/:id/rol', verificarToken, soloMIGA, actualizarRolUsuario);

export default router;

