import express from 'express';
import {
  registrarDocumento,
  obtenerDocumentos,
  obtenerDocumentoPorCodigo,
  actualizarDocumento,
  eliminarDoc,
  restaurarDoc
} from '../controllers/documentosController.js';

import { verificarToken } from '../middleware/auth.js';
import { soloMIGA } from '../middleware/validarRol.js';

const router = express.Router();

//registrar documento (solo MIGA)
router.post('/', verificarToken, soloMIGA, registrarDocumento);

//Listar todos (disponible para todos por ahora)
router.get('/', obtenerDocumentos);

// Ver uno por código
router.get('/:codigo', obtenerDocumentoPorCodigo);

//Actualizar (excepto código y fuente)
router.put('/:codigo', verificarToken, soloMIGA, actualizarDocumento);

//Eliminar lógico
router.delete('/:codigo', verificarToken, soloMIGA, eliminarDoc);

// Restaurar
router.patch('/:codigo/restaurar', verificarToken, soloMIGA, restaurarDoc);

export default router;