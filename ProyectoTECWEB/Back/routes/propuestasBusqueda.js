import express from 'express';
import {
  buscarPorTituloYDescripcionController,
  buscarPorEstadoController,
  buscarPorUsuarioController
} from '../controllers/propuestasBusquedaController.js';


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Propuestas Buscar
 *   description: Operaciones relacionadas con los documentos favoritos del usuario
 * 
 * /api/propuestas-inteligente/buscar-titulo-descripcion:
 *   get:
 *     summary: Buscar propuestas por título y/o descripción
 *     description: >
 *       Busca propuestas cuya descripción o título contengan palabras clave o frases.
 *       Se ignoran tildes y se eliminan palabras con menos de 3 letras.
 *     tags: [Propuestas Buscar]
 *     parameters:
 *       - in: query
 *         name: palabra
 *         required: false
 *         schema:
 *           type: string
 *         description: Palabra o palabras separadas por espacios
 *         example: tecnologia educacion
 *       - in: query
 *         name: frase
 *         required: false
 *         schema:
 *           type: string
 *         description: Frase larga para dividir y buscar por tokens
 *         example: Mejora de la educación tecnológica en zonas rurales
 *     responses:
 *       200:
 *         description: Lista de propuestas encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Propuesta Buscar'
 *       400:
 *         description: Ninguna palabra/frase válida proporcionada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/buscar-titulo-descripcion', buscarPorTituloYDescripcionController);

/**
 * @swagger
 * /api/propuestas-inteligente/buscar-estado:
 *   get:
 *     summary: Buscar propuestas por estado
 *     description: Devuelve propuestas filtradas por estado (`pendiente`, `aceptada`, `rechazada`)
 *     tags: [Propuestas Buscar]
 *     parameters:
 *       - in: query
 *         name: estado
 *         required: true
 *         schema:
 *           type: string
 *           enum: [pendiente, aceptada, rechazada]
 *         description: Estado de la propuesta
 *         example: aceptada
 *     responses:
 *       200:
 *         description: Propuestas con el estado indicado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Propuesta Buscar'
 *       400:
 *         description: Estado inválido o no proporcionado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/buscar-estado', buscarPorEstadoController);

/**
 * @swagger
 * /api/propuestas-inteligente/buscar-usuario:
 *   get:
 *     summary: Buscar propuestas por usuario
 *     description: Busca propuestas enviadas por un usuario usando su correo o `Usuario_defecto`.
 *     tags: [Propuestas Buscar]
 *     parameters:
 *       - in: query
 *         name: usuario
 *         required: true
 *         schema:
 *           type: string
 *         description: Correo electrónico o usuario_defecto
 *         example: juan.perez@ejemplo.com
 *     responses:
 *       200:
 *         description: Propuestas encontradas del usuario indicado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Propuesta Buscar'
 *       400:
 *         description: Usuario no proporcionado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/buscar-usuario', buscarPorUsuarioController);

/**
 * @swagger
 * components:
 *   schemas:
 *     Propuesta Buscar:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         titulo:
 *           type: string
 *           example: Implementación de tecnologías en aulas rurales
 *         descripcion:
 *           type: string
 *           example: Propuesta para dotar de equipos tecnológicos a instituciones en zonas alejadas.
 *         estado:
 *           type: string
 *           enum: [pendiente, aceptada, rechazada]
 *           example: aceptada
 *         enviada_en:
 *           type: string
 *           format: date-time
 *           example: 2024-03-15T10:45:00Z
 *         Usuario_defecto:
 *           type: string
 *           example: jperez
 *         correo:
 *           type: string
 *           example: juan.perez@ejemplo.com
 *         autor:
 *           type: string
 *           example: Juan Pérez Gómez
 *         observacion_miga:
 *           type: string
 *           example: Cumple con lineamientos establecidos.
 */

export default router;
