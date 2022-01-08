const Movie = require('../models/movieModel');
const AppError = require('./../utils/appError');
const jwtoken = require('jsonwebtoken');
const Room = require('../models/roomModel');

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
  

/**
 * get a list of all movies
 * 
 * @param  req 
 * @param  res 
 */
exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.send(movies);
    } catch(err) {
        console.log(err);
        res.status(500).send({message: 'server error'});
    }
};


/**
 * updatea a movie
 * 
 * @param  req 
 * @param  res 
 */
exports.updateMovie = async (req, res) => {
    const {title, date, startTime, endTime, screeningRoom, poster} = req.body;

    try {
        await Movie.findOneAndUpdate({title}, {title, date, startTime, endTime, screeningRoom, poster});
        res.send('successfully updated');
    } catch(err) {
        console.log(err);
        res.status(500).send({message: 'uknown error'});
    }
};

function checkDate(datearr)
 {
     let tnow=new Date();
     let ptime= new Date(new Date(datearr[2], datearr[1], datearr[0]).toDateString());
     console.log(ptime< tnow);
        return ptime < tnow;
};

function minuteConvert(a) {
    var x = a.split(':');
    return x[0]*60 + +x[1];
  }
  
  
  function timeConvert(mins) {
    function z(n){return (n<10? '0':'') + n;}
    var h = (mins/60 |0) % 24;
    var m = mins % 60;
    return z(h) + ':' + z(m);
  }
  
  function durationCalc(time1, time2) {
    return timeConvert(minuteConvert(time1) - minuteConvert(time2));
  }

exports.addMovie = async (req, res) => {
    try {
      
        const posterNew= req.body.poster;
        const titleNew=req.body.movieName;
        const screeningRoomNew=req.body.screeningroomid;
        const dateNew=req.body.Date;
        const slideshowNew=req.body.slideShow;
        const starttimeNew=req.body.startTime;
        const endtimeNew=req.body.endTime;
        const dateCheckNew=dateNew.split('-');
        if (dateCheckNew.length!=3){
            throw new AppError('Must Enter An Appropriate sequence of Date Format Like DD-MM-YYYY', 400);
        }

        if (!checkDate(dateCheckNew))
        {
            throw new AppError('Must Enter An Date Before Today', 400);
        }
        if(starttimeNew.length!=endtimeNew.length){
            throw new AppError('StartTime array and EndTime array must have same length ', 400);
        }

        let flag=true;
        let duration=durationCalc(endtimeNew[0],starttimeNew[0]);
        for(let i=0;i<starttimeNew.length;i++){
            console.log(duration);
            if(endtimeNew[i]<starttimeNew[i] || duration!=durationCalc(endtimeNew[i],starttimeNew[i]) )
                {
                    flag=false;
                    break;
                }
            //duration=endtimeNew[i]-starttimeNew[i];
        }
        if(!flag){
            throw new AppError('StartTime array and EndTime array Have Not Logical Times ', 400);
        }
        let overlappedFlag=false;
        const moviesShownarr=await Room.findById(
            req.body.screeningroomid)
            .select('moviesShown');
        for(let i=0;i<moviesShownarr.length;i++){
            const timesarr=await Movie.findById(
                moviesShownarr[i])
                .select('startTime endTime');
                console.log(timesarr.startTime.length);
            for(let j=0;j<timesarr.startTime.length;j++){
                for(let k=0;k<starttimeNew.length;k++){
                    if(starttimeNew[k]>=timesarr.startTime[j] && starttimeNew[k]<timesarr.endTime[j]){
                        console.log(timesarr.startTime[j]);
                        overlappedFlag=true;
                        break;
                    }
                }
            }
        }
        if(overlappedFlag){
            throw new AppError('OVERLAPPING TIMES BETWEEN OTHER MOVIES SHOWN IN ROOM ', 400);
        }
        const newMovie = await Movie.create({
            screeningRoom:screeningRoomNew,
            title:titleNew,
            date:dateNew,
            poster:posterNew,
            slideshow:slideshowNew,
            startTime:starttimeNew,
            endTime:endtimeNew
        });
        const updateMovieInRoom= await Room.findByIdAndUpdate(
            req.body.screeningroomid, {$addToSet: {moviesShown: newMovie._id}},
            function (err, docs) {
        if (err){
            console.log('INVALID ADDING Movies Array IN Room : ',err)
        }
        else{
            console.log("Updated Movie in Room : ", docs);
        }
        });
        createResponse(newMovie, 201, res);
      
    } catch (err) {
      res.status(400).json({
          status:'fail',
          message: 'INVALID ADDING MOVIE : ' +err
      });
    }
  };
  
