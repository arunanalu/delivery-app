const express = require('express');
const errorMiddleware = require('../middlewares/errorMiddleware');

const app = express();

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(errorMiddleware);

module.exports = app;
