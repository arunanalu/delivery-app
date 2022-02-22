const express = require('express');
const cors = require('cors');
const errorMiddleware = require('../middlewares/errorMiddleware');
const loginRoute = require('../routes/loginRoute');
const registerRouter = require('../routes/registerRoute');
const productRouter = require('../routes/productRouter');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/login', loginRoute);
app.use('/register', registerRouter);
app.use('/product', productRouter);

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(errorMiddleware);

module.exports = app;
