const express = require('express');
const customerController = require('../controllers/customerController.js');

const customerRouter = express.Router();

customerRouter.post('/signUp', customerController.signUp);
customerRouter.post('/login', customerController.login);


module.exports = customerRouter;
