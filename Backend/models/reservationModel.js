const mongoose = require('mongoose');


const reservationSchema = new mongoose.Schema({
    customerName: {
        type : mongoose.Schema.ObjectId,
        ref: 'Customer',
        required: [true, 'Must Enter Customer USERNAME']
    },
    movieName: {
        type : mongoose.Schema.ObjectId,
        ref: 'Movie',
        required: [true, 'Must Enter Movie Title']
    },
    
    roomName: {
        type : mongoose.Schema.ObjectId,
        ref: 'Room',
        required: [true, 'Must Enter Room Name']
    },
    chairName: {
        type : mongoose.Schema.ObjectId,
        ref: 'Chair',
        required: [true, 'Must Enter The Chair Name']
    },
    reservedAt: {
        type : Date,
        default: Date.now()
    },
    reservationTime:{
        type: Date,
        required: [true,'Must Enter The Reservation Date and time']
    }
});

reservationSchema.pre(/^find/, function(next) {
    this.populate('Customer').populate({
      path: 'customerName',
      select: 'username'
    });
    next();
  });

  reservationSchema.pre(/^find/, function(next) {
    this.populate('Room').populate({
      path: 'roomName',
      select: 'name'
    });
    next();
  });

  reservationSchema.pre(/^find/, function(next) {
    this.populate('Room').populate({
      path: 'roomName',
      select: 'name'
    });
    next();
  });

  reservationSchema.pre(/^find/, function(next) {
    this.populate('Chair').populate({
      path: 'chairName',
      select: 'name'
    });
    next();
  });
  
const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
