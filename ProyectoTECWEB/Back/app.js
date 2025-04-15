import express from 'express';
import cors from 'cors';
import usuariosRoutes from './routes/usuarios.js';
import documentosRoutes from './routes/documentos.js';

const app = express();

app.use(cors());
app.use(express.json()); // <--- ESTA LÍNEA ES VITAL

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/documentos', documentosRoutes);
export default app;
