import * as ambitoActividadModel from '../models/ambitoActividadModel.js';

// Obtener todos los ámbitos
export async function obtenerAmbitos(req, res) {
  try {
    const ambitos = await ambitoActividadModel.obtenerTodosAmbitos();
    res.json(ambitos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los ámbitos', error: error.message });
  }
}

// Obtener un ámbito por ID
export async function obtenerAmbito(req, res) {
  const { id } = req.params;
  try {
    const ambito = await ambitoActividadModel.obtenerAmbitoPorId(id);
    if (!ambito) {
      return res.status(404).json({ mensaje: 'Ámbito no encontrado' });
    }
    res.json(ambito);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el ámbito', error: error.message });
  }
}

// Crear un nuevo ámbito
export async function crearAmbito(req, res) {
  const { nombre } = req.body;
  try {
    await ambitoActividadModel.crearAmbito(nombre);
    res.status(201).json({ mensaje: 'Ámbito creado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el ámbito', error: error.message });
  }
}

// Actualizar un ámbito
export async function actualizarAmbito(req, res) {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    await ambitoActividadModel.actualizarAmbito(id, nombre);
    res.json({ mensaje: 'Ámbito actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el ámbito', error: error.message });
  }
}

// Eliminar un ámbito
export async function eliminarAmbito(req, res) {
  const { id } = req.params;
  try {
    await ambitoActividadModel.eliminarAmbito(id);
    res.json({ mensaje: 'Ámbito eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el ámbito', error: error.message });
  }
}
