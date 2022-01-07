const mongoose = require('mongoose');


const roomSchema = new mongoose.Schema({
    moviesShown: {
        type: [{ type : mongoose.Schema.ObjectId, ref: 'Movie' }]
    },
    chairs:{
        type: [{ type : mongoose.Schema.ObjectId, ref: 'Chair' }]
    },
    name: {
        type: String,
        enum: ['Room1','Room2'],
        required: [true, 'Must Enter The Room Name'], 
        unique: true
    },
    numberOfRowSeats: {
        type: Number,
        enum: [2,3],
        required: [true, 'Must Enter The Number of rows of seats in room']
    },
    numberOfColumnSeats: {
        type: Number,
        default:10
    }
});

roomSchema.pre(/^find/, function(next) {
    this.populate('Movie').populate({
      path: 'moviesShown',
      select: 'title'
    });
    next();
  });

  roomSchema.pre(/^find/, function(next) {
    this.populate('Chair').populate({
      path: 'chairs',
      select: 'title'
    });
    next();
  });
const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
