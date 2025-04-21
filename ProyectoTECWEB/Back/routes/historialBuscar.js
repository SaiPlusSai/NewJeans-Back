import express from 'express';
import { buscarPalabrasClave } from '../controllers/historialBuscarController.js';

const router = express.Router();

router.get('/', buscarPalabrasClave); // GET /api/historial-busqueda?palabra=alimentacion

export default router;
