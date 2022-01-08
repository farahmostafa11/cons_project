const express = require('express');
const roomController = require('../controllers/roomController.js');

const roomRouter = express.Router();

roomRouter.post('/createRoom', roomController.createRoom);
roomRouter.post('/showRoomChairs', roomController.showRoomChairs);
module.exports = roomRouter;
