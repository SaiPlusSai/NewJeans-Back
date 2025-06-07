import { jest } from '@jest/globals';
import { obtenerPalabrasFrecuentes } from '../utils/analisisTexto.js';

describe('🧪 obtenerPalabrasFrecuentes', () => {
  const db = {
    query: jest.fn()
  };

  test('retorna palabras más frecuentes', async () => {
    db.query.mockResolvedValueOnce([[
      { descripcion: 'La alimentación saludable es vital.', relevancia: 'Salud y nutrición escolar' },
      { descripcion: 'Educación en salud para todos.', relevancia: 'Bienestar nutricional' }
    ]]);

    const resultado = await obtenerPalabrasFrecuentes(db);

    expect(Array.isArray(resultado)).toBe(true);
    expect(resultado.length).toBeGreaterThan(0);
    expect(resultado[0]).toHaveProperty('palabra');
    expect(resultado[0]).toHaveProperty('cantidad');
  });
});
