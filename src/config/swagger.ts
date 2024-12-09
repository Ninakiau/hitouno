import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API REST for Cat Lovers",
        version: "1.0.0",
        description: "Documentation for Cat Lovers API",
      },
      servers: [
        {
          url: "http://localhost:3000/api/v1", // URL base de la API
        },
      ],
    },
    apis: ["swagger.yml"],
  };
//Inicializaamos el método que recibe las opciones de la documentación 
const openapiSpecificaion = swaggerJsdoc(options);

export default openapiSpecificaion;