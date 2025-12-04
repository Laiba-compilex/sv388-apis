const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SV388 API',
      version: '1.0.0',
      description: 'API documentation for SV388 system'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        Player: {
          type: 'object',
          properties: {
            agentId: { type: 'string' },
            phone: { type: 'string' },
            userId: { type: 'string' },
            userName: { type: 'string' },
            realName: { type: 'string' },
            password: { type: 'string' },
            points: { type: 'number' },
            sumOfAllBalances: { type: 'number' },
            telesaleName: { type: 'string' },
            tags: { type: 'array', items: { type: 'string' } },
            allowDeposit: { type: 'boolean' },
            allowWithdraw: { type: 'boolean' },
            allowLogin: { type: 'boolean' },
            signUpDate: { type: 'string', format: 'date-time' },
            ip: { type: 'string' }
          }
        },
        Staff: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            role: { type: 'string' },
            refreshSessionToken: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };