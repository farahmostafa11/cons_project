const Movie = require('../models/movieModel');

/**
 * get a list of all movies
 * 
 * @param  req 
 * @param  res 
 */
exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.send(movies);
    } catch(err) {
        console.log(err);
        res.status(500).send({message: 'server error'});
    }
};


/**
 * updatea a movie
 * 
 * @param  req 
 * @param  res 
 */
exports.updateMovie = async (req, res) => {
    const {title, date, startTime, endTime, screeningRoom, poster} = req.body;

    try {
        await Movie.findOneAndUpdate({title}, {title, date, startTime, endTime, screeningRoom, poster});
        res.send('successfully updated');
    } catch(err) {
        console.log(err);
        res.status(500).send({message: 'uknown error'});
    }
};