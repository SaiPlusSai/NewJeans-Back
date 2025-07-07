import * as zonasModel from '../models/zonasModel.js';

// Obtener todas las zonas
export async function obtenerZonas(req, res) {
  try {
    const zonas = await zonasModel.obtenerTodasZonas();
    res.json(zonas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las zonas', error: error.message });
  }
}

// Obtener una zona por ID
export async function obtenerZona(req, res) {
  const { id } = req.params;
  try {
    const zona = await zonasModel.obtenerZonaPorId(id);
    if (!zona) {
      return res.status(404).json({ mensaje: 'Zona no encontrada' });
    }
    res.json(zona);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la zona', error: error.message });
  }
}

// Obtener todas las zonas de un macrodistrito específico
export async function obtenerZonasPorMacrodistrito(req, res) {
  const { macrodistrito_id } = req.params;
  try {
    const zonas = await zonasModel.obtenerZonasPorMacrodistrito(macrodistrito_id);
    if (zonas.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron zonas para este macrodistrito' });
    }
    res.json(zonas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las zonas del macrodistrito', error: error.message });
  }
}

// Crear una nueva zona
export async function crearZona(req, res) {
  const { macrodistrito_id, nombre } = req.body;

  try {
    // Validar si ya existe una zona con ese nombre en el mismo macrodistrito
    const existe = await zonasModel.zonaExiste(macrodistrito_id, nombre);
    if (existe) {
      return res.status(400).json({ mensaje: 'Ya existe una zona con ese nombre en el macrodistrito' });
    }

    await zonasModel.crearZona(macrodistrito_id, nombre);
    res.status(201).json({ mensaje: 'Zona creada exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la zona', error: error.message });
  }
}


// Actualizar una zona
export async function actualizarZona(req, res) {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    await zonasModel.actualizarZona(id, nombre);
    res.json({ mensaje: 'Zona actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la zona', error: error.message });
  }
}

// Eliminar una zona
export async function eliminarZona(req, res) {
  const { id } = req.params;
  try {
    await zonasModel.eliminarZona(id);
    res.json({ mensaje: 'Zona eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la zona', error: error.message });
  }
}
