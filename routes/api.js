const express = require('express');
const apiRouter = express.Router();

module.exports = apiRouter;

//Routes import
const registerRouter = require('./registerRouter');
const loginRouter = require('./loginRouter');
const customerRouter = require('./customerRouter');
const productRouter = require('./productRouter');
const cartRouter = require('./cartRouter');
const ordersRouter = require('./ordersRouter');

//Routes
apiRouter.use('/register', registerRouter);
apiRouter.use('/login', loginRouter);
apiRouter.use('/customer', customerRouter);
apiRouter.use('/product', productRouter);
apiRouter.use('/cart', cartRouter);
apiRouter.use('/orders', ordersRouter);
