const Room = require('../models/roomModel');
const Reservation = require('../models/reservationModel');
const Chair = require('../models/chairModel');
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
  
exports.showRoomChairs = async(req, res) => {
  try {
    const room = await Room.findById(req.body.roomid);
    const showingTime=req.body.starttime;
  
    //console.log(req);
    var chairsList=[];
    for(let i=0;i<room.chairs.length;i++)
    {
      
      let isrerved=await Reservation.find({roomID: req.body.roomid,chairsID:room.chairs[i],
        reservationDate:req.body.date,reservationTime:showingTime});
      console.log(isrerved);
      if (!isrerved.length){
          let singleChair= await Chair.findByIdAndUpdate(room.chairs[i],{$set: {isReserved:'empty'}});
          chairsList.push(singleChair);
        }
      else{
        let singleChair= await Chair.findByIdAndUpdate(room.chairs[i],{$set: {isReserved:'reserved'}});
        chairsList.push(singleChair);
      }

    }
    var chairsList2D = new Array(room.numberOfRowSeats);
for (var i = 0; i < chairsList2D.length; i++) {
  chairsList2D[i] = new Array(room.numberOfColumnSeats);

  for(var j=0;j<room.numberOfColumnSeats;j++){
      chairsList2D[i][j]=chairsList[i*10+j];
  }
}
    createResponse(chairsList2D, 201, res);
    //console.log(chairsList2D)
  } catch (err) {
    res.status(400).json({
        status:'fail',
        message: 'ERROR DURING SHOWING ROOM CHAIRS'+err
        
    });
    console.log("ERROR DURING SHOWING ROOM CHAIRS",err);
  }
};