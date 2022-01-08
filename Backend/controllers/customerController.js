const _ = require('underscore');
const Customer = require('./../models/customerModel.js');
const AppError = require('./../utils/appError');
const jwtoken = require('jsonwebtoken');
const Reservation = require('./../models/reservationModel.js');


const respons = (id) =>
jwtoken.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createResponse = (cutomer, statusCode, res) => {
    const response = respons(cutomer._id);
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  
    res.cookie('jwt', response, cookieOptions);

    cutomer.password = undefined;
  
    res.status(statusCode).json({
      status: 'success',
      response,
      data: {
        cutomer
      }
    });
  };
  
exports.signUp = async (req, res) => {
  try {
    const customer1 = await Customer.create({
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });
    createResponse(customer1, 201, res);
    
  } catch (err) {
    res.status(400).json({
        status:'fail',
        message: 'INVALID SIGNUP'
    });
  }
};


exports.login = async (req, res) => {
  try {
    const username1=req.body.username;
    const password1=req.body.password;
    
    //if Entered username and password are nulls
    if (!username1) {
      throw new AppError('Must Enter A Valid Username ', 400);
    }
    
    if (!password1 ) {
        throw new AppError('Must Enter A Valid Password ', 400);
      }
      
    const customer2 = await Customer.findOne({ username:username1}).select('password');
    console.log(customer2);
    if (!customer2) {
      throw new AppError('Invalid UserName', 401);
    }
    
    const passw = await customer2.correctPassword(password1, customer2.password);
    if (!passw) {
      throw new AppError('Invalid Password', 401);
    }

    createResponse(customer2, 202, res);
  } catch (err) {
      
    res.status(400).json({
        status:'fail',
        message: 'INVALID LOGIN. '+err
    });
  }
};

exports.getReservations=async (req,res) => {
  try {
      const reservationsArr = await Customer.findById(req.body.id)
        .select('reservtions');
      if(reservationsArr.reservtions.length!==0)
        res.send(true);//if there are reservations send true, false otherwise
      else
      res.send(false);
  } catch(err) {
      console.log(err);
      res.status(500).send({message: 'CANNOT GET RESERVATIONS FOR THIS USER'});
  }
};

exports.deleteReservations=async (req,res) => {
  try {
      const customer1 = await Customer.findById(req.body.id);
      if(customer1.reservtions.length!==0)
        throw new AppError('No RESERVATIONS TO DELETE', 401);
      for(let i=0;i< customer1.reservtions.length;i++)
      {
        Reservation.findByIdAndDelete(customer1.reservtions[i],
          function (err, reservaton) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Deleted Reservation : ", reservaton);
            }
        });
        
      }
      customer1.reservtions=[];
      customer1.save();
      createResponse(customer1, 202, res);
  } catch(err) {
      console.log(err);
      res.status(500).send({message: 'Error During Deleting all reservation for this USER'});
  }
};

exports.getUserInfo= async(req,res)=> {
  try {
      const customer3 = await Customer.findById(req.body.id);
      if(!customer3)
        throw new AppError('Invalid ID ', 401);
        createResponse(customer3, 202, res);
  } catch(err) {
      console.log(err);
      res.status(500).send({message: 'CANNOT GET INFORMATION FOR THIS USER'});
  }
};
