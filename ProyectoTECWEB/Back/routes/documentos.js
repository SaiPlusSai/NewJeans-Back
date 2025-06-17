import express from 'express';
import {
  registrarDocumento,
  obtenerDocumentos,
  obtenerDocumentoPorCodigo,
  actualizarDocumento,
  eliminarDoc,
  restaurarDoc,
  generarCodigo,
  registrarDocumentoAuto
} from '../controllers/documentosController.js';

import { verificarToken } from '../middleware/auth.js';
import { soloMIGA } from '../middleware/validarRol.js';

const router = express.Router();
/**
 * @swagger
 * /api/documentos:
 *   post:
 *     summary: Registrar un nuevo documento
 *     tags: [Documentos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigo:
 *                 type: string
 *               tipo:
 *                 type: string
 *               fuente:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               relevancia:
 *                 type: string
 *               anio:
 *                 type: string
 *               enlace:
 *                 type: string
 *               aplicacion_id:
 *                 type: integer
 *               conceptos_cpe:
 *                 type: string
 *               creado_por:
 *                 type: integer
 *               jerarquia:
 *                 type: integer
 *               vigente:
 *                 type: boolean
 *               aplicacion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Documento registrado exitosamente
 *       400:
 *         description: Datos de entrada inválidos
 *       500:
 *         description: Error en el servidor
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido
 */
// Registrar nuevo documento (POST)
router.post('/', verificarToken, soloMIGA, registrarDocumento);

/**
 * @swagger
 * /api/documentos:
 *   get:
 *     summary: Obtener todos los documentos
 *     tags: [Documentos]
 *     responses:
 *       200:
 *         description: Lista de documentos
 */
//Listar todos (disponible para todos por ahora)
router.get('/', obtenerDocumentos);

/**
 * @swagger
 * /api/documentos/generar-codigo:
 *   get:
 *     summary: Generar código automático para un documento según su tipo
 *     tags: [Documentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: tipo
 *         required: true
 *         schema:
 *           type: string
 *           enum: [ley, decreto, resolucion, plan, norma, resolucion_municipal, programa, otro]
 *         description: Tipo del documento para generar el código correspondiente
 *     responses:
 *       200:
 *         description: Código generado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigo:
 *                   type: string
 *                   example: LEY-004
 *       400:
 *         description: Falta el tipo de documento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Falta el tipo de documento
 *       500:
 *         description: Error en el servidor al generar el código
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error al generar código
 *                 error:
 *                   type: string
 *                   example: Tipo inválido
 *       401:
 *         description: No autorizado - token inválido o no enviado
 *       403:
 *         description: Prohibido - requiere rol MIGA
 */
router.get('/generar-codigo', verificarToken, soloMIGA, generarCodigo);
/**
 * @swagger
 * /api/documentos/{codigo}:
 *   get:
 *     summary: Obtener documento por código
 *     tags: [Documentos]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código del documento
 *     responses:
 *       200:
 *         description: Documento encontrado
 *       404:
 *         description: Documento no encontrado
 */
// Ver uno por código
router.get('/:codigo', obtenerDocumentoPorCodigo);

/**
 * @swagger
 * tags:
 *   name: Documentos Auto
 *   description: Registro automático de documentos con generación de código según el tipo
 *
 * /api/documentos/auto:
 *   post:
 *     summary: Registrar un documento con código generado automáticamente
 *     description: |
 *       Permite registrar un documento generando automáticamente su código basado en el tipo.
 *       Se deben incluir todos los campos obligatorios del documento.
 *     tags: [Documentos Auto]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DocumentoEntradaAuto'
 *     responses:
 *       201:
 *         description: Documento registrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Documento registrado automáticamente
 *                 codigo:
 *                   type: string
 *                   example: LEY-007
 *       400:
 *         description: Faltan datos obligatorios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno al registrar el documento
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * components:
 *   schemas:
 *     DocumentoEntradaAuto:
 *       type: object
 *       required:
 *         - tipo
 *         - fuente
 *         - descripcion
 *         - relevancia
 *         - anio
 *         - enlace
 *         - aplicacion_id
 *         - conceptos_cpe
 *         - jerarquia
 *       properties:
 *         tipo:
 *           type: string
 *           enum: [ley, decreto, resolucion, plan, norma, resolucion_municipal, programa, otro]
 *           example: ley
 *         fuente:
 *           type: string
 *           example: "Ministerio de Justicia"
 *         descripcion:
 *           type: string
 *           example: "Ley de protección de datos personales"
 *         relevancia:
 *           type: string
 *           example: "Alta"
 *         anio:
 *           type: integer
 *           example: 2024
 *         enlace:
 *           type: string
 *           format: uri
 *           example: "https://drive.google.com/doc123"
 *         aplicacion_id:
 *           type: integer
 *           example: 2
 *         conceptos_cpe:
 *           type: string
 *           example: "Derecho a la privacidad"
 *         jerarquia:
 *           type: string
 *           enum: [Suprema, Alta, Media, Media alta, Media baja, Baja]
 *           example: "Alta"
 *
 *     Error:
 *       type: object
 *       properties:
 *         mensaje:
 *           type: string
 *           example: "Falta el campo: tipo"
 *         error:
 *           type: string
 *           example: "Tipo inválido"
 */
router.post('/auto', verificarToken, soloMIGA, registrarDocumentoAuto);


/**
 * @swagger
 * /api/documentos/{codigo}:
 *   put:
 *     summary: Actualizar un documento (excepto código y fuente)
 *     tags: [Documentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Datos actualizables del documento
 *     responses:
 *       200:
 *         description: Documento actualizado
 *       404:
 *         description: Documento no encontrado
 */
//Actualizar (excepto código y fuente)
router.put('/:codigo', verificarToken, soloMIGA, actualizarDocumento);
/**
 * @swagger
 * /api/documentos/{codigo}:
 *   delete:
 *     summary: Eliminación lógica de un documento
 *     tags: [Documentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Documento eliminado
 *       404:
 *         description: Documento no encontrado
 */
//Eliminar lógico
router.delete('/:codigo', verificarToken, soloMIGA, eliminarDoc);
/**
 * @swagger
 * /api/documentos/{codigo}/restaurar:
 *   patch:
 *     summary: Restaurar un documento eliminado lógicamente
 *     tags: [Documentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Documento restaurado
 *       404:
 *         description: Documento no encontrado
 */
// Restaurar
router.patch('/:codigo/restaurar', verificarToken, soloMIGA, restaurarDoc);


export default router;