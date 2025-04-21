import { obtenerPalabrasFrecuentes } from '../models/documentosFiltradoModel.js';

export async function filtrarPalabras(req, res) {
  try {
    const palabras = await obtenerPalabrasFrecuentes();
    res.json({ top_palabras: palabras });
  } catch (error) {
    console.error('Error en filtro inteligente:', error);
    res.status(500).json({ mensaje: 'Error al obtener palabras frecuentes' });
  }
}
