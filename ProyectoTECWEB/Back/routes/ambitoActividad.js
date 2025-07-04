import { Router } from 'express';
import * as ambitoActividadController from '../controllers/ambitoActividadController.js';
import { verificarToken } from '../middleware/auth.js';
import { soloMIGA } from '../middleware/validarRol.js';

const router = Router();
router.get('/ambitos', ambitoActividadController.obtenerAmbitos);
router.post('/ambitos', verificarToken, soloMIGA, ambitoActividadController.crearAmbito);
router.put('/ambitos/:id', verificarToken, soloMIGA, ambitoActividadController.actualizarAmbito);
router.delete('/ambitos/:id', verificarToken, soloMIGA, ambitoActividadController.eliminarAmbito);

export default router;
