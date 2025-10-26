const express = require('express')
const Mongoose = require('./db/conn')
const app = express()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

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
