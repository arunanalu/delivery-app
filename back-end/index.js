const express = require('express');
const cors = require('cors');
// const path = require('path');
const errorMiddleware = require('./src/middlewares/errorMiddleware');
const loginRoute = require('./src/routes/loginRoute');
const userRouter = require('./src/routes/userRoute');
const productRouter = require('./src/routes/productRouter');
const salesRoute = require('./src/routes/salesRoute');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());
// app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
app.use('/login', loginRoute);
app.use(userRouter);
app.use('/product', productRouter);
app.use('/sale', salesRoute);

app.use(errorMiddleware);

const port = process.env.PORT || 3001;

app.listen(port);
console.log(`Api rodando na porta ${port}`);

module.exports = app;
