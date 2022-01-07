const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema({
    screeningRoom: {
        type: mongoose.Schema.ObjectId,
        ref: 'Room',
        required: [true, 'Must Enter The screening Room']
    },
    title: {
        type: String,
        required: true, 
        unique: true
    },
    date: {
        type: Date,
        required: true
    },
    poster: {
        type: String,
        default: 'https://drive.google.com/file/d/1Ehyi9nKaMJ9lsowbjxkW-B3km1rnxJB9/view?usp=sharing',
        required: true
    },
    
    startTime: {
        type: String,
        require: true,
    },
    endTime: {
        type: String,
        require: true,
    }
});

movieSchema.pre(/^find/, function(next) {
    this.populate('Room').populate({
      path: 'screeningRoom',
      select: '_id'
    });
    next();
  });

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
