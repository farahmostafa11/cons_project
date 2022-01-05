const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const customerSchema = new mongoose.Schema({
  _id: {type:mongoose.Schema.Types.ObjectId,required:true},
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
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Must Enter A VALID Password'],
    minlength: 8,
    
    select: false
  },
  
  passwordConfirm: {
    type: String,
    required: [true, 'Must Enter Same Password Above'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function(passw) {
        return passw === this.password;
      },
      message: 'Passwords are not the same Must Enter Same Passwords!'
    }
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

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

customerSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

customerSchema.pre(/^find/, function(next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

customerSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

customerSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

customerSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
