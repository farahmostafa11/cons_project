const Reservation = require('../models/reservationModel');
const AppError = require('./../utils/appError');
const jwtoken = require('jsonwebtoken');
const Customer = require('../models/customerModel');

const respons = (id) =>
jwtoken.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createResponse = (movieres, statusCode, res) => {
    const response = respons(movieres._id);
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
        movieres
      }
    });
  };
  
  function checkDate(datearr)
  {
      let tnow=new Date();
      let ptime= new Date(datearr);
      console.log(ptime, tnow,datearr[0]);
         return ptime > tnow;
 };

exports.addReservation = async (req, res) => {
    try {
        const titleNew=req.body.movieid;
        const screeningRoomNew=req.body.roomid;
        const dateNew=req.body.date;
        const customerNew=req.body.customerid;
        const starttimeNew=req.body.startTime;
        const chairsNew=req.body.chairsid;
        const dateNew2=new Date(req.body.date);
        if (!checkDate(dateNew2))
        {
            throw new AppError('Must Enter An Date After Now', 400);
        }

        const newReserv = await Reservation.create({
            roomID:screeningRoomNew,
            movieID:titleNew,
            reservationDate:dateNew,
            customerID:customerNew,
            chairsID:chairsNew,
            reservationTime:starttimeNew
        });

        const updateResevationInCustomer= await Customer.findByIdAndUpdate(
            customerNew, {$addToSet: {reservtions: newReserv._id}},
            function (err, docs) {
        if (err){
            console.log('INVALID ADDING Rservation Array IN Customer : ',err)
        }
        else{
            console.log("Updated Reservation in Customer : ", docs);
        }
        });
        createResponse(newReserv, 201, res);
      
    } catch (err) {
      res.status(400).json({
          status:'fail',
          message: 'INVALID ADDING new Reservation : ' +err
      });
    }
  };
  