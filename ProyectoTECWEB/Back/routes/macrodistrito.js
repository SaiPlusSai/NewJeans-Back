import { Router } from 'express';
import * as macrodistritoController from '../controllers/macrodistritoController.js';

const router = Router();

router.get('/macrodistritos', macrodistritoController.obtenerMacrodistritos);
router.get('/macrodistritos/:id', macrodistritoController.obtenerMacrodistrito);
router.post('/macrodistritos', macrodistritoController.crearMacrodistrito);
router.put('/macrodistritos/:id', macrodistritoController.actualizarMacrodistrito);
router.delete('/macrodistritos/:id', macrodistritoController.eliminarMacrodistrito);

export default router;
