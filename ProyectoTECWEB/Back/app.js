import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; 
dotenv.config(); 

import usuariosRoutes from './routes/usuarios.js';
import documentosRoutes from './routes/documentos.js';
import swaggerSpec from './swagger.js';
import swaggerUi from 'swagger-ui-express';
import documentosBuscarRoutes from './routes/documentosBuscar.js';
import documentosFiltradoRoutes from './routes/documentosFiltrado.js';
import historialBuscarRoutes from './routes/historialBuscar.js';
import reportesRoutes from './routes/reportes.js';
import reportesPDFRoutes from './routes/reportesPDF.js';
import favoritosRoutes from './routes/favoritos.js';
import propuestasRoutes from './routes/propuestas.js';
import propuestasPublicasRoutes from './routes/propuestasPublicas.js';
import informacionRoutes from './routes/informacion.js';
import usuariosMIGARoutes from './routes/usuariosMIGA.js';
import favoritosBuscarRoutes from './routes/favoritosBuscar.js';
import favoritosInteligenteRoutes from './routes/favoritosInteligente.js';
import propuestasBusquedaRoutes from './routes/propuestasBusqueda.js';
import usuariosBusquedaRoutes from './routes/usuariosBusqueda.js';

const app = express();

app.get('/', (req, res) => {
  res.send('Backend de MIIGA corriendo con éxito en Railway');
});

console.log('🌐 FRONTEND PERMITIDO:', process.env.URL_FRONTEND); // ✅ LOG ÚTIL

app.use(cors({
  origin: process.env.URL_FRONTEND,
  credentials: true
}));

app.use(express.json()); // <--- ESTA LÍNEA ES VITAL
app.use('/api/historial-busqueda', historialBuscarRoutes);
app.use('/api/filtrado', documentosFiltradoRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/documentos', documentosRoutes);
app.use('/api/buscar', documentosBuscarRoutes);
app.use('/api/reportes', reportesRoutes);
app.use('/api/reportes/pdf', reportesPDFRoutes);
app.use('/api/favoritos', favoritosRoutes);
app.use('/api/propuestas', propuestasRoutes);
app.use('/api/propuestas/publicas', propuestasPublicasRoutes);
app.use('/api/informacion', informacionRoutes);
app.use('/api/usuarios-miga', usuariosMIGARoutes);
app.use('/api/favoritos', favoritosBuscarRoutes);
app.use('/api/favoritos-inteligente', favoritosInteligenteRoutes);
app.use('/api/propuestas-inteligente', propuestasBusquedaRoutes);
app.use('/api/usuarios', usuariosBusquedaRoutes);
export default app;

// Servir la documentación de Swagger en una ruta
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
    console.log('Swagger en: http://localhost:3000/api-docs');
  });