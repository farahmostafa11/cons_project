const Movie = require('../models/movieModel');
const AppError = require('./../utils/appError');

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

exports.addMovie = async (req, res) => {
    try {
      
        const poster= req.body.poster;
        const title=req.body.movieName;
        const screeningRoom=req.body.screeningroomid;
        const date=req.body.Date;
        const slideshow=req.body.slideShow;
        const starttime=req.body.startTime;
        const endtime=req.body.endTime;
        const dateCheck=date.split('-');
        if (dateCheck.length!=3){
            throw new AppError('Must Enter An Appropriate sequence of Date Format Like DD-MM-YYYY', 400);
        }

        if (!Movie.checkDate(dateCheck))
        {
            throw new AppError('Must Enter An Date Before Today', 400);
        }
        if(starttime.length!=endtime.length){
            throw new AppError('StartTime array and EndTime array must have same length ', 400);
        }

        let flag=true;
        let duration=endtime[0]-starttime[0];
        for(let i=0;i<starttime.length;i++){
            if(endtime[i]<starttime[i] || duration!=endtime[i]-starttime[i] )
                {
                    flag=false;
                    break;
                }
            duration=endtime[i]-starttime[i];
        }
        if(!flag){
            throw new AppError('StartTime array and EndTime array Have Not Logical Times ', 400);
        }
        const newMovie = await Movie.create({});
        createResponse(customer1, 201, res);
      
    } catch (err) {
      res.status(400).json({
          status:'fail',
          message: 'INVALID ADDING MOVIE'
      });
    }
  };
  
