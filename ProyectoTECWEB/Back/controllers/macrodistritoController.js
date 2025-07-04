import * as macrodistritoModel from '../models/macrodistritoModel.js';

export async function obtenerMacrodistritos(req, res) {
  try {
    const macrodistritos = await macrodistritoModel.obtenerTodosMacrodistritos();
    res.json(macrodistritos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los macrodistritos', error: error.message });
  }
}

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

export async function crearMacrodistrito(req, res) {
  const { nombre, descripcion } = req.body; // Ahora incluye descripcion
  try {
    // Verificación de campos obligatorios
    if (!nombre || !descripcion) {
      return res.status(400).json({ mensaje: 'Faltan campos obligatorios: nombre y descripcion' });
    }

    await macrodistritoModel.crearMacrodistrito(nombre, descripcion);
    res.status(201).json({ mensaje: 'Macrodistrito creado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el macrodistrito', error: error.message });
  }
}

export async function actualizarMacrodistrito(req, res) {
  const { id } = req.params;
  const { nombre, descripcion } = req.body; // Ahora incluye descripcion
  try {
    if (!nombre || !descripcion) {
      return res.status(400).json({ mensaje: 'Faltan campos obligatorios: nombre y descripcion' });
    }

    await macrodistritoModel.actualizarMacrodistrito(id, nombre, descripcion);
    res.json({ mensaje: 'Macrodistrito actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el macrodistrito', error: error.message });
  }
}

export async function eliminarMacrodistrito(req, res) {
  const { id } = req.params;
  try {
    await macrodistritoModel.eliminarMacrodistrito(id);
    res.json({ mensaje: 'Macrodistrito eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el macrodistrito', error: error.message });
  }
}
