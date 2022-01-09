const express = require('express');
const morgan = require('morgan');
var cors = require('cors')



const customersRouter = require('./routes/customerRoute.js');
const movieRouter = require('./routes/movieRoute');
const roomRouter=require('./routes/roomRoute.js');
const chairRouter=require('./routes/chairRoute.js');
const reservationRouter=require('./routes/reservationRoute.js');
const app = express();
app.use(cors()) // Use this after the variable declaration
app.use(
  express.urlencoded({ extended: true })
);
  
app.use(express.json());
// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Holaa, middleware is here');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/customer', customersRouter);
app.use('/api/room', roomRouter);
app.use('/api/movie', movieRouter);
app.use('/api/chair',chairRouter);
app.use('/api/reservation',reservationRouter);
//IM
//Fe controller bynady model



module.exports = app;
