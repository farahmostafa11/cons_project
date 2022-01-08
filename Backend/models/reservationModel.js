const mongoose = require('mongoose');


const reservationSchema = new mongoose.Schema({
    customerID: {
        type : mongoose.Schema.ObjectId,
        ref: 'Customer',
        required: [true, 'Must Enter Customer USERNAME']
    },
    movieID: {
        type : mongoose.Schema.ObjectId,
        ref: 'Movie',
        required: [true, 'Must Enter Movie Title']
    },
    
    roomID: {
        type : mongoose.Schema.ObjectId,
        ref: 'Room',
        required: [true, 'Must Enter Room Name']
    },
    chairsID: {
        type: [{ type : mongoose.Schema.ObjectId, ref: 'Chair' }],
        required: [true, 'Must Enter The Chair Name']
    },
    reservedAt: {
        type : Date,
        default: Date.now()
    },
    reservationDate:{
        type: Date,
        required: [true,'Must Enter The Reservation Date ']
    },
    reservationTime:{
      type: String,
      required: [true,'Must Enter The Reservation time']
  }
});


const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
