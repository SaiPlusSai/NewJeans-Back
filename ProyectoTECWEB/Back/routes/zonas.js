import { Router } from 'express';
import * as zonasController from '../controllers/zonasController.js';

const router = Router();

router.get('/zonas', zonasController.obtenerZonas);
router.get('/zonas/:id', zonasController.obtenerZona);
router.get('/macrodistrito/:macrodistrito_id/zonas', zonasController.obtenerZonasPorMacrodistrito); // Nueva ruta
router.post('/zonas', zonasController.crearZona);
router.put('/zonas/:id', zonasController.actualizarZona);
router.delete('/zonas/:id', zonasController.eliminarZona);

export default router;
