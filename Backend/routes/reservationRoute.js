const express = require('express');
const reservtationController = require('../controllers/reservationController.js');

const resevationRouter = express.Router();

resevationRouter.post('/addReservation', reservtationController.addReservation);

module.exports = resevationRouter;
