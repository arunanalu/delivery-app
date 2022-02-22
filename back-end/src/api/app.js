const express = require('express');
const errorMiddleware = require('../middlewares/errorMiddleware');
const loginRoute = require('../routes/loginRoute');
const registerRouter = require('../routes/registerRoute');

const app = express();

app.use(express.json());

app.use('/login', loginRoute);
app.use('/register', registerRouter);

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(errorMiddleware);

module.exports = app;
