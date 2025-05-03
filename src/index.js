const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const transportistaRoutes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectDB();

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Transportistas API',
            version: '1.0.0',
            description: 'API para gestionar transportistas'
        },
        servers: [{ url: 'http://localhost:3000/api' }]
    },
    apis: ['./src/routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api', transportistaRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Add .env and node_modules to .gitignore
const fs = require('fs');
const path = require('path');

const gitignorePath = path.join(__dirname, '.gitignore');
const gitignoreContent = 'node_modules/\n.env\n';

fs.writeFileSync(gitignorePath, gitignoreContent);