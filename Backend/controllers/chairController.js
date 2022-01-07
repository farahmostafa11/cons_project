const Chair = require('../models/chairModel');
const mongoose= require('mongoose');
const jwtoken = require('jsonwebtoken');

const respons = (id) =>
jwtoken.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const createResponse = (chairres, statusCode, res) => {
    const response = respons(chairres._id);
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
        chairres
      }
    });
  };
  
exports.addChair = async (req, res) => {
    try {
      const chair = await Chair.create({
        roomID: req.body.roomid,
        name: req.body.name
      });
      createResponse(chair, 201, res);
      
    } catch (err) {
      res.status(400).json({
          status:'fail',
          message: 'INVALID ADDING CHAIR '+err
      });
    }
  };
  
  