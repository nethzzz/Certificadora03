const express = require('express')
const Mongoose = require('./db/conn')
const app = express()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const cors = require('cors');

const corsOptions = {
    // ⚠️ Substitua 'http://localhost:5173' pela URL e porta do SEU FRONT-END!
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Se você precisar enviar cookies/sessão
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.listen(3000)

const userRoutes = require('./routes/UserRoutes');
const participantRoutes = require('./routes/participantRoutes');

app.use('/users', userRoutes);
app.use('/participants', participantRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
