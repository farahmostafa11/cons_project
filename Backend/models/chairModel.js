const mongoose = require('mongoose');


const chairSchema = new mongoose.Schema({
    roomID: {
        type: mongoose.Schema.ObjectId,
        ref: 'Room',
        required: [true, 'Must Enter The screening Room']
    },
    customerID: {
        type: mongoose.Schema.ObjectId,
        ref: 'Customer'
    },
    isReserved: {
        type: Boolean,
        default: false
    },
    
    name: {
        type: String,
        enum: ['1A', '1B','1C','1D','1E','1F','1G','1H','1I','1J',
                '2A', '2B','2C','2D','2E','2F','2G','2H','2I','2J',
                '3A', '3B','3C','3D','3E','3F','3G','3H','3I','3J'],
        required: [true, 'Must Enter The Chair Name']
    },
    
});

chairSchema.index({ roomID: 1, name: 1 }, { unique: true });

/*
chairSchema.pre(/^find/, function(next) {
    this.populate('Room').populate({
      path: 'roomID',
      select: 'name'
    });
    next();
  });

  
chairSchema.pre(/^find/, function(next) {
    this.populate('Customer').populate({
      path: 'customerID',
      select: 'username'
    });
    next();
  });*/

const Chair = mongoose.model('Chair', chairSchema);

module.exports = Chair;
