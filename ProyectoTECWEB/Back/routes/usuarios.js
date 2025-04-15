import express from 'express';
import { login } from '../controllers/usuariosController.js';
import { verificarToken } from '../middleware/auth.js';
import { soloMIGA } from '../middleware/validarRol.js';

const router = express.Router();

router.post('/login', login);

// Ruta de prueba protegida
router.get('/protegido', verificarToken, soloMIGA, (req, res) => {
  res.json({ mensaje: 'Acceso correcto como MIGA', usuario: req.usuario });
});

export default router;
