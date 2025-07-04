import { Router } from 'express';
import * as zonasController from '../controllers/zonasController.js';
import { verificarToken } from '../middleware/auth.js';
import { soloMIGA } from '../middleware/validarRol.js';

const router = Router();

router.get('/zonas', zonasController.obtenerZonas);
router.get('/macrodistrito/:macrodistrito_id/zonas', zonasController.obtenerZonasPorMacrodistrito);
router.post('/zonas', verificarToken, soloMIGA, zonasController.crearZona);
router.put('/zonas/:id', verificarToken, soloMIGA, zonasController.actualizarZona);
router.delete('/zonas/:id', verificarToken, soloMIGA, zonasController.eliminarZona);

export default router;

