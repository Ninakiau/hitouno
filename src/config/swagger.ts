import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Rest CatLover',
            version: '1.0.0',
            description: 'API para gestionar cat lovers',
        },
    },
    apis: ['swagger.yml'],
};
//Inicializaamos el método que recibe las opciones de la documentación 
const openapiSpecificaion = swaggerJsdoc(options);

export default openapiSpecificaion;