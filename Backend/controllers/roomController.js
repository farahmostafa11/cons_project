const Room = require('../models/roomModel');
const AppError = require('./../utils/appError');
const jwtoken = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsync');

const respons = (id) =>
jwtoken.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const createResponse = (roomres, statusCode, res) => {
    const response = respons(roomres._id);
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  
    res.cookie('jwt', response, cookieOptions);
    res.status(statusCode).json({
      status: 'success',
      response,
      data: {
        roomres
      }
    });
  };
  
  
exports.createRoom = async (req, res) => {
    try {
      const room = await Room.create({
        name: req.body.name,
        numberOfRowSeats: req.body.rowseats
      });
      createResponse(room, 201, res);
      
    } catch (err) {
      res.status(400).json({
          status:'fail',
          message: 'INVALID CREATING ROOM'+err
      });
    }
  };
  
  