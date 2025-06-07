import { buscarDocumentos } from '../controllers/documentosBuscarController.js';
import { buscarDocumentosDB } from '../models/documentosBuscarModel.js';

jest.mock('../models/documentosBuscarModel.js');

describe('🧪 buscarDocumentos', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { query: { tipo: 'ley' } };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
    jest.clearAllMocks();
  });

  test('✅ Responde con resultados si todo va bien', async () => {
    const mockResultados = [{ codigo: '123', tipo: 'ley' }];
    buscarDocumentosDB.mockResolvedValue(mockResultados);

    await buscarDocumentos(req, res);

    expect(buscarDocumentosDB).toHaveBeenCalledWith(req.query);
    expect(res.json).toHaveBeenCalledWith(mockResultados);
  });

  test('❌ Retorna 500 si hay error', async () => {
    buscarDocumentosDB.mockRejectedValue(new Error('Error inesperado'));

    await buscarDocumentos(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ mensaje: 'Error al buscar documentos' });
  });
});
