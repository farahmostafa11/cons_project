const express = require('express');
const morgan = require('morgan');
var cors = require('cors')



const customersRouter = require('./routes/customerRoute.js');
const app = express();
app.use(cors()) // Use this after the variable declaration
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
app.use('/api/customer', customersRouter);

//IM
//Fe controller bynady model



module.exports = app;
