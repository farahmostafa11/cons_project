const express = require('express');
const customersController = require('./../controllers/customersController');

const router = express.Router();

router.param('id', customersController.checkID);
/*
router
  .route('/')
  .get(customersController.getAllTours)
  .post(customersController.checkBody, customersController.createTour);

router
  .route('/:id')
  .get(customersController.getTour)
  .patch(customersController.updateTour)
  .delete(customersController.deleteTour);

module.exports = router;
*/