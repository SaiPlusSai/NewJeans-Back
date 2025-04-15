import {
    crearDocumento,
    listarDocumentos,
    buscarDocumentoPorCodigo,
    editarDocumento,
    eliminarDocumento,
    restaurarDocumento
  } from '../models/documentoModel.js';
  
  // Crear documento
  export async function registrarDocumento(req, res) {
    try {
      const data = req.body;
      data.creado_por = req.usuario.id; // desde el token JWT
  
      // Validar campos requeridos
      const camposObligatorios = [
        'codigo', 'tipo', 'fuente', 'descripcion', 'relevancia',
        'anio', 'enlace', 'alcance_id', 'conceptos_cpe', 'categoria_id'
      ];
  
      for (const campo of camposObligatorios) {
        if (!data[campo]) {
          return res.status(400).json({ mensaje: `Falta el campo: ${campo}` });
        }
      }
  
      await crearDocumento(data);
      res.status(201).json({ mensaje: 'Documento registrado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al registrar documento' });
    }
  }
  
  // Listar todos
  export async function obtenerDocumentos(req, res) {
    try {
      const documentos = await listarDocumentos();
      res.json(documentos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener documentos' });
    }
  }
  
  // Obtener uno por código
  export async function obtenerDocumentoPorCodigo(req, res) {
    try {
      const { codigo } = req.params;
      const doc = await buscarDocumentoPorCodigo(codigo);
      if (!doc) return res.status(404).json({ mensaje: 'Documento no encontrado' });
      res.json(doc);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener documento' });
    }
  }
  
  // Editar
  export async function actualizarDocumento(req, res) {
    try {
      const { codigo } = req.params;
      const data = req.body;
  
      await editarDocumento(codigo, data);
      res.json({ mensaje: 'Documento actualizado' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al actualizar documento' });
    }
  }
  
  // Eliminar lógicamente
  export async function eliminarDoc(req, res) {
    try {
      const { codigo } = req.params;
      await eliminarDocumento(codigo);
      res.json({ mensaje: 'Documento eliminado' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al eliminar documento' });
    }
  }
  
  // Restaurar
  export async function restaurarDoc(req, res) {
    try {
      const { codigo } = req.params;
      await restaurarDocumento(codigo);
      res.json({ mensaje: 'Documento restaurado' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al restaurar documento' });
    }
  }
  