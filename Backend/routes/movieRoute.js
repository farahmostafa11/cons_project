const express = require('express');

const movieController = require('../controllers/movieController');

const router = express.Router();

router.get('/', movieController.getAllMovies);
router.put('/', movieController.updateMovie);

module.exports = router;