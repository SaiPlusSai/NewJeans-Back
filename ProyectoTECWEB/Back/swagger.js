import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestión de Usuarios y Documentos',
      version: '1.0.0',
      description: 'API para la gestión de usuarios y documentos en el sistema MIGA',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      bearerAuth: [], // Aplica la autenticación con Bearer Token a todas las rutas por defecto
    }],
  },
  apis: ['./routes/*.js'], // Ruta donde se encuentran los archivos con los comentarios de JSDoc para Swagger
};

// Generación de documentación con Swagger
const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;  // Exportando la configuración correctamente
