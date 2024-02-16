import path from "path";

export const swaggerOptions = {
    swaggerDefinition:{
        openapi: '3.0.0',
        info:{
            title: 'API Country',
            version: '1.0.0',
            description: 'Les données d\'un pays ou un continent'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'server local'
            }

        ]
    },
    apis: [path.resolve(__dirname, './controllers/*.ts')]
}