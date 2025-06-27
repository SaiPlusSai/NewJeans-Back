import express from 'express';
import {
  buscarPorTituloYDescripcionController,
  buscarPorEstadoController,
  buscarPorUsuarioController
} from '../controllers/propuestasBusquedaController.js';


const router = express.Router();


router.get('/buscar-titulo-descripcion', buscarPorTituloYDescripcionController);


router.get('/buscar-estado', buscarPorEstadoController);


router.get('/buscar-usuario', buscarPorUsuarioController);

export default router;
