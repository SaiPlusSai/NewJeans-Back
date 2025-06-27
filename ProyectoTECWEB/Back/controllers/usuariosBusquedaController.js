import {
  buscarUsuariosPorNombreGoogleLike,
  buscarUsuarioPorIdentificador
} from '../models/usuariosBusquedaModel.js';

// GET /api/usuarios/buscar-google
export async function buscarUsuariosPorNombre(req, res) {
  try {
    const { frase } = req.query;
    if (!frase) {
      return res.status(400).json({ mensaje: 'Debe proporcionar una frase para buscar' });
    }

    const resultados = await buscarUsuariosPorNombreGoogleLike(frase);
    res.json(resultados);
  } catch (error) {
    console.error('Error al buscar usuarios por nombre:', error.message);
    res.status(500).json({ mensaje: 'Error interno al buscar usuarios por nombre' });
  }
}

// GET /api/usuarios/buscar-identificador
export async function buscarUsuarioPorIdentificadorController(req, res) {
  try {
    const { valor } = req.query;
    if (!valor) {
      return res.status(400).json({ mensaje: 'Debe proporcionar un CI, correo o usuario' });
    }

    const resultados = await buscarUsuarioPorIdentificador(valor);
    res.json(resultados);
  } catch (error) {
    console.error('Error al buscar usuario específico:', error.message);
    res.status(500).json({ mensaje: 'Error interno al buscar usuario' });
  }
}
