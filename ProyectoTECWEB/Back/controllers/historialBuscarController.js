import { buscarDocumentosDB } from '../models/documentosBuscarModel.js';
import { guardarBusqueda } from '../models/historialBuscarModel.js';

export async function buscarPalabrasClave(req, res) {
  try {
    const { palabra } = req.query;

    if (!palabra) {
      return res.status(400).json({ mensaje: 'Debe proporcionar una palabra clave' });
    }

    const resultados = await buscarDocumentosDB({ palabra });

    // Determinar si la palabra fue buscada en descripción, relevancia o ambos
    const buscado_donde = 'ambos'; // ya que siempre se busca en ambas en este caso

    await guardarBusqueda(palabra, buscado_donde);

    res.json(resultados);
  } catch (error) {
    console.error('Error en búsqueda avanzada:', error);
    res.status(500).json({ mensaje: 'Error al buscar documentos por palabra clave' });
  }
}
