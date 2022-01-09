const express = require('express');
const customerController = require('../controllers/customerController.js');

const customerRouter = express.Router();

customerRouter.post('/signUp', customerController.signUp);
customerRouter.post('/login', customerController.login);
customerRouter.post('/getReservations', customerController.getReservations);
customerRouter.post('/deleteReservations', customerController.deleteReservations);
customerRouter.post('/getUserInfo', customerController.getUserInfo);


module.exports = customerRouter;
