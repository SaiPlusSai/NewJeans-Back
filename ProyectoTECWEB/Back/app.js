import express from 'express';
import cors from 'cors';
import usuariosRoutes from './routes/usuarios.js';
import documentosRoutes from './routes/documentos.js';
import documentosBuscarRoutes from './routes/documentosBuscar.js';
import documentosFiltradoRoutes from './routes/documentosFiltrado.js';



const app = express();

app.use(cors());
app.use(express.json()); // <--- ESTA LÍNEA ES VITAL
app.use('/api/filtrado', documentosFiltradoRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/documentos', documentosRoutes);
app.use('/api/buscar', documentosBuscarRoutes);
export default app;
