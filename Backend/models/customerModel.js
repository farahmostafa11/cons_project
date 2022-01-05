const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const customerSchema = new mongoose.Schema({
  
  firstName: {
    type: String,
    required: [true, 'Must Enter Your First Name']
  },
  lastName: {
    type: String,
    required: [true, 'Must Enter Your Last Name']
  },
  username: {
    type: String,
    required: [true, 'Must Enter Your Email'],
    unique: true,
    lowercase: true
  }
  ,
  email: {
    type: String,
    required: [true, 'Must Enter Your Email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'INVALID MAIL!!!!']
  },
  role: {
    type: String,
    enum: ['customer', 'manager'],
    default: 'customer'
  },
  password: {
    type: String,
    required: [true, 'Must Enter A VALID Password'],
    minlength: 8,
    
    select: false
  },
  
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
