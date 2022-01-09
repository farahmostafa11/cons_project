const express = require('express');

const movieController = require('../controllers/movieController');

const router = express.Router();

router.get('/getAllMovies', movieController.getAllMovies);
router.post('/updateMovie', movieController.updateMovie);
router.post('/addMovie',movieController.addMovie);

module.exports = router;