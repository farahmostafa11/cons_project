const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const SALT = 12;
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

customerSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with salt cost of 12
  this.password = await bcrypt.hash(this.password, SALT);
  next();
});

customerSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

customerSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

customerSchema.methods.correctPassword = async function (pass,tokenpass)
 {
  return await bcrypt.compareSync(pass, tokenpass);
};

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
