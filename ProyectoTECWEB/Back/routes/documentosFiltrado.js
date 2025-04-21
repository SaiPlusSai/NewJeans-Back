import express from 'express';
import { filtrarPalabras } from '../controllers/documentosFiltradoController.js';

const router = express.Router();

router.get('/', filtrarPalabras);

export default router;
