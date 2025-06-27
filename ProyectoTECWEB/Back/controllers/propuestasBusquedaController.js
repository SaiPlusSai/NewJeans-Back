import {
  buscarPorTituloDescripcion,
  buscarPorEstado,
  buscarPorUsuario
} from '../models/propuestasBusquedaModel.js';


export async function buscarPorTituloYDescripcionController(req, res) {
  try {
    const { palabra = '', frase = '' } = req.query;

    const tokens = [
      ...palabra.split(/\s+/),
      ...frase
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .split(/\s+/)
    ].filter(p => p.length > 2);

    if (tokens.length === 0) {
      return res.status(400).json({ mensaje: 'Debe proporcionar al menos una palabra o frase válida' });
    }

    // Eliminamos duplicados
    const unicos = [...new Set(tokens)];

    const resultados = await buscarPorTituloDescripcion({ tokens: unicos });

    res.json(resultados);
  } catch (error) {
    console.error('Error en búsqueda por título/descripción:', error.message);
    res.status(500).json({ mensaje: 'Error interno al buscar por título/descripción' });
  }
}
export async function buscarPorEstadoController(req, res) {
  try {
    const { estado } = req.query;

    const estadosValidos = ['pendiente', 'aceptada', 'rechazada'];
    if (!estado || !estadosValidos.includes(estado)) {
      return res.status(400).json({ mensaje: 'Estado inválido o no proporcionado' });
    }

    const resultados = await buscarPorEstado(estado);
    res.json(resultados);
  } catch (error) {
    console.error('Error en búsqueda por estado:', error.message);
    res.status(500).json({ mensaje: 'Error interno al buscar por estado' });
  }
}


export async function buscarPorUsuarioController(req, res) {
  try {
    const { usuario } = req.query;

    if (!usuario) {
      return res.status(400).json({ mensaje: 'Debe proporcionar un correo o usuario_defecto' });
    }

    const resultados = await buscarPorUsuario(usuario);
    res.json(resultados);
  } catch (error) {
    console.error('Error en búsqueda por usuario:', error.message);
    res.status(500).json({ mensaje: 'Error interno al buscar por usuario' });
  }
}
