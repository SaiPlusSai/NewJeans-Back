import { Router } from 'express';
import * as ambitoActividadController from '../controllers/ambitoActividadController.js';

const router = Router();

router.get('/ambitos', ambitoActividadController.obtenerAmbitos);
router.get('/ambitos/:id', ambitoActividadController.obtenerAmbito);
router.post('/ambitos', ambitoActividadController.crearAmbito);
router.put('/ambitos/:id', ambitoActividadController.actualizarAmbito);
router.delete('/ambitos/:id', ambitoActividadController.eliminarAmbito);

export default router;
