import { Router } from 'express';
import * as macrodistritoController from '../controllers/macrodistritoController.js';
import { verificarToken } from '../middleware/auth.js';
import { soloMIGA } from '../middleware/validarRol.js';

const router = Router();

router.get('/macrodistritos', macrodistritoController.obtenerMacrodistritos);

router.post('/macrodistritos', verificarToken, soloMIGA, macrodistritoController.crearMacrodistrito);

router.put('/macrodistritos/:id', verificarToken, soloMIGA, macrodistritoController.actualizarMacrodistrito);

router.delete('/macrodistritos/:id', verificarToken, soloMIGA, macrodistritoController.eliminarMacrodistrito);

export default router;
