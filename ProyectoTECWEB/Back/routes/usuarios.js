import express from 'express';
import { login, register, perfil } from '../controllers/usuariosController.js';
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/perfil', verificarToken, perfil);

export default router;