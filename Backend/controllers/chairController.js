const Chair = require('../models/chairModel');
const Room = require('../models/roomModel');
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
  
exports.addChair = async (req) => {
    try {
      const chair2 = await Chair.create({
        roomID: req.roomID,
        name: req.name
      });
      //createResponse(chair2, 201, res);
      const updateChairsInRoom= await Room.findByIdAndUpdate(
        req.roomID, {$addToSet: {chairs: chair2._id}},
        function (err, docs) {
    if (err){
        console.log('INVALID ADDING CHAIRS Array IN Room : ',err)
    }
    else{
        console.log("Updated Chairs in Room : ", docs);
    }
    });

    } catch (err) {
        console.log('INVALID ADDING CHAIR '+err);
      
    }
  };
  
  