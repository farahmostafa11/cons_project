const express = require('express');
const morgan = require('morgan');


const customersRouter = require('./routes/customersRoutes');
const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
//app.use('/api/v1/tours', customersRouter);
//Fe controller bynady model

// 3) ROUTES
app.use('/api/v1/user', userRouter);
app.use('/api/v1/movie', movieRouter);


module.exports = app;
