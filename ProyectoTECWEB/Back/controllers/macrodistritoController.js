import * as macrodistritoModel from '../models/macrodistritoModel.js';

// Obtener todos los macrodistritos
export async function obtenerMacrodistritos(req, res) {
  try {
    const macrodistritos = await macrodistritoModel.obtenerTodosMacrodistritos();
    res.json(macrodistritos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los macrodistritos', error: error.message });
  }
}

// Obtener un macrodistrito por ID
export async function obtenerMacrodistrito(req, res) {
  const { id } = req.params;
  try {
    const macrodistrito = await macrodistritoModel.obtenerMacrodistritoPorId(id);
    if (!macrodistrito) {
      return res.status(404).json({ mensaje: 'Macrodistrito no encontrado' });
    }
    res.json(macrodistrito);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el macrodistrito', error: error.message });
  }
}

// Crear un nuevo macrodistrito
export async function crearMacrodistrito(req, res) {
  const { nombre } = req.body;
  try {
    await macrodistritoModel.crearMacrodistrito(nombre);
    res.status(201).json({ mensaje: 'Macrodistrito creado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el macrodistrito', error: error.message });
  }
}

// Actualizar un macrodistrito
export async function actualizarMacrodistrito(req, res) {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    await macrodistritoModel.actualizarMacrodistrito(id, nombre);
    res.json({ mensaje: 'Macrodistrito actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el macrodistrito', error: error.message });
  }
}

// Eliminar un macrodistrito
export async function eliminarMacrodistrito(req, res) {
  const { id } = req.params;
  try {
    await macrodistritoModel.eliminarMacrodistrito(id);
    res.json({ mensaje: 'Macrodistrito eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el macrodistrito', error: error.message });
  }
}
