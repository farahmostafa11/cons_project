const mongoose = require('mongoose');


const roomSchema = new mongoose.Schema({
    moviesShown: {
        type: [{ type : mongoose.Schema.ObjectId, ref: 'Movie' }]
    },
    name: {
        type: String,
        required: [true, 'Must Enter The Room Name'], 
        unique: true
    },
    numberOfRowSeats: {
        type: Number,
        required: [true, 'Must Enter The Number of rows of seats in room']
    },
    numberOfColumnSeats: {
        type: Number,
        required: [true, 'Must Enter The Number of columns of seats in room']
    }
});

roomSchema.pre(/^find/, function(next) {
    this.populate('Movie').populate({
      path: 'screeningRoom',
      select: 'title'
    });
    next();
  });

const Room = mongoose.model('Movie', roomSchema);

module.exports = Room;
