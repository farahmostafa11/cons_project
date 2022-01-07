const express = require('express');
const chairController = require('../controllers/chairController.js');

const chairRouter = express.Router();

chairRouter.post('/addChair', chairController.addChair);

module.exports = chairRouter;
