import React,{useState,useEffect} from 'react';
import './movies_show.scss';
import classes from '../Signup/Signup.module.css'
//import'./bootstrap.css'
import Carousel from 'react-bootstrap/Carousel'
import addMovie,{getMovies} from "../../services/homepageServices"
//getUserReservations
import {getuserInfo} from "../../services/userServices"
import {getUserReservations} from "../../services/userServices"
import {deletereservation} from "../../services/userServices"
import {Link} from "react-router-dom";
import { Modal } from 'react-bootstrap'
import axios from 'axios'


export default function MoviesShow(props){
  
  const path = window.location.pathname;
  const index = path.split('/');
  var user_id=index[3];
  const [movies, setMovies] = useState([]); 
  const [show, setShow] = useState(false);
  const [user_info, setUserInfo] = useState();
  const [reservations_array, setreservations_array] = useState();
  const [user_role, setUserRole] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setPosterImageUrl('');
    setMoviename('');
    setDate('');
    setSlideshowUrl('');
    setStartTime1('');
    setStartTime2('');
    setStartTime3('');
    setEndTime1('');
    setEndTime2('');
    setEndTime3('');
    setfnError('');
    setlnError('');
    setunError('');
    setemailError('');
    setStart1Error('');
    setStart2Error('');
    setStart3Error('');
    setEnd1Error('');
    setEnd2Error('');
    setEnd3Error('');
    setShow(false);

  }
  const handleShowUpdate=(id)=>
  {
        axios.get(  'http://localhost:3002/movies' + '?id=' + id)
    .then(response => {
      ////console.log(response.data[0].poster);
      setPosterImageUrl(response.data[0].poster);
      setMoviename(response.data[0].movieName);
      setDate(response.data[0].Date);
      setSlideshowUrl(response.data[0].slideShow)
      setStartTime1(response.data[0].startTime[0])
      setStartTime2(response.data[0].startTime[1])
      setStartTime3(response.data[0].startTime[2])
      setEndTime1(response.data[0].endTime[0])
      setEndTime2(response.data[0].endTime[1])
      setEndTime3(response.data[0].endTime[2])
      // if(response.data.length > 0) {
      //   setemailError('Email unavailable');
      // }
  })
    setShowUpdate(true);
  } 
  const handleCloseUpdate = () => {
    setPosterImageUrl('');
    setMoviename('');
    setDate('');
    setSlideshowUrl('');
    setStartTime1('');
    setStartTime2('');
    setStartTime3('');
    setEndTime1('');
    setEndTime2('');
    setEndTime3('');
    setfnError('');
    setlnError('');
    setunError('');
    setemailError('');
    setStart1Error('');
    setStart2Error('');
    setStart3Error('');
    setEnd1Error('');
    setEnd2Error('');
    setEnd3Error('');
    setShowUpdate(false);
  }

  function setrole(role){
    if (role==="manager"){
      setUserRole(true);
      console.log("is a manager");
    }
    else{
      setUserRole(false);
      console.log(user_role);
      console.log("is a customer");
    }
  }
 function room1fn(){
  roomNo=room1;
  //console.log("here");
  //console.log(room1);
 }
 function room2fn(){
  roomNo=room2;
}

  const navStyle={
    color:'white'
  };
  const [isLogedIn, setLogedIn] = useState(false); 
    useEffect(async()=>{
    ////console.log("path",path);
    
    var log_in_check = index[2];
    
    ////console.log("is_logged",log_in_check);
    if(log_in_check==undefined){ 
      setLogedIn(false);
      ////console.log("und");
    }
    else if(log_in_check==="1"){
      //to be used in get user by id
      
      //console.log("USER ID FE EL MOVIEEE",user_id);
      ////console.log("yes");
      setLogedIn(true);
      console.log("userrrr",user_id);
      const this_user={"id":user_id};
      console.log("userrrr22222",this_user);
      getuserInfo(this_user)
      .then(
          data=>{
            setUserInfo(data.data.data.cutomer);
            console.log("dataaaaaaa of userrr",data.data.data.cutomer);
            if (user_info!=undefined){
              setrole(user_info.role);
              if(user_info.role==="customer"){
                console.log("ROLEE",user_info.role)
              }
             
            }
            ////console.log("Done")
      }
      )
      getUserReservations(this_user)
      .then(
        data=>{
          setreservations_array(data);
        }
      )
    }
    else{
      setLogedIn(false);
      ////console.log("else");
    }
    ////console.log("is looooged",isLogedIn);

    //fetch('http://localhost:3002/movies')
    /*.then(
        res=>{return res.json()}
    )*/ 
    getMovies()
    .then(
        data=>{//console.log(data.data);
        setMovies(data.data);
    }
    )
    
    
    },[user_info])
    //if user want to cancle reservation
    function handleCancelation(){
      const user_object={id:user_id}
      deletereservation(user_object);
    }
    const room1= '61d8552a04ce814d3cad487a';//30
    const room2= '61d85604e50dc24ad4ff3a5f';//20
    var [posterImageUrl, setPosterImageUrl] = useState('');
    var [movieName, setMoviename] = useState('');
    var [date, setDate] = useState('');
    var [slideshowUrl, setSlideshowUrl] = useState('');
    var [fnError, setfnError] = useState();
    var [lnError, setlnError] = useState();
    var [unError, setunError] = useState();
    var [emailError, setemailError] = useState();
    var [errorcount, setErrorCount] = useState('');
    var [startTime1,setStartTime1]=useState('');
    var [startTime2,setStartTime2]=useState('');
    var [startTime3,setStartTime3]=useState('');
    var [start1Error,setStart1Error]=useState('');
    var [start2Error,setStart2Error]=useState('');
    var [start3Error,setStart3Error]=useState('');
    var [endTime1,setEndTime1]=useState('');
    var [endTime2,setEndTime2]=useState('');
    var [endTime3,setEndTime3]=useState('');
    var [end1Error,setEnd1Error]=useState('');
    var [end2Error,setEnd2Error]=useState('');
    var [end3Error,setEnd3Error]=useState('');
    var roomNo;
    //Poster Url
const handlePosterImageUrl = (e) => {
  setPosterImageUrl(e.target.value);
  if(e.target.value) 
  {setfnError(''); setErrorCount(0)}
  }

  //Movie Name
  const handleMovieNameInput = (e) => {
  setMoviename(e.target.value); 
  if(e.target.value) 
  {setlnError(''); setErrorCount(0)}
  }
  
  //Date
  const handleDateInput = (e) => {
      setDate(e.target.value); 
      if(e.target.value) 
      {setunError(''); setErrorCount(0)}
  }
  
  //slideshow
  const handleSlideshowUrl = (e) => {
    setSlideshowUrl(e.target.value);  
    if(e.target.value) 
    {setemailError(''); setErrorCount(0)}
  }
  // startTime
  const handleStartTimeInput1 = (e) => {
    setStartTime1(e.target.value);  
    if(e.target.value) 
    {setStart1Error(''); setErrorCount(0)}
  }
  const handleStartTimeInput2 = (e) => {
    setStartTime2(e.target.value);  
    if(e.target.value) 
    {setStart2Error(''); setErrorCount(0)}
  }
  const handleStartTimeInput3 = (e) => {
    setStartTime3(e.target.value);  
    if(e.target.value) 
    {setStart3Error(''); setErrorCount(0)}
  }
  const handleEndTimeInput1 = (e) => {
    setEndTime1(e.target.value);  
    if(e.target.value) 
    {setEnd1Error(''); setErrorCount(0)}
  }
  const handleEndTimeInput2 = (e) => {
    setEndTime2(e.target.value);  
    if(e.target.value) 
    {setEnd2Error(''); setErrorCount(0)}
  }
  const handleEndTimeInput3 = (e) => {
    setEndTime3(e.target.value);  
    if(e.target.value) 
    {setEnd3Error(''); setErrorCount(0)}
  }
  const validateInfo = () => {

    //poster
    if(!posterImageUrl) {
        //console.log("fady");
        setfnError('Poster Image Url is required');
        fnError='Poster Image Url is required';
        setErrorCount(1);
    } else{setfnError(''); setErrorCount(0);}

    //movie Name
    if(!movieName) {
        setlnError('Movie name is required');
        lnError='Movie name is required';
        setErrorCount(1);
    } else{setlnError(''); setErrorCount(0);}

    //Date
    if(!date) {
        setunError('Date is required');
        unError='Date is required';
        setErrorCount(1);
    } else{setunError(''); setErrorCount(0);}

    //Slide show
    if(!slideshowUrl){
        setemailError('Slideshow Url is required');
        emailError="Slideshow Url is required"
        setErrorCount(1);
    }
    
    else {setemailError(''); setErrorCount(0);}

    // StartTimes
    if(!startTime1){
      setStart1Error('start time is required');
      start1Error='start time is required';
      setErrorCount(1);
  }
  else {setStart1Error(''); setErrorCount(0);}
  

      // StartTimes
      if(!startTime2){
        setStart2Error('start time is required');
        start2Error='start time is required';
        setErrorCount(1);
    }
    else {setStart2Error(''); setErrorCount(0);}
    

    // StartTimes
        if(!startTime3){
          setStart3Error('start time is required');
          start3Error='start time is required';
          setErrorCount(1);
         }
         else {setStart3Error(''); setErrorCount(0);}
   //End Times
         if(!endTime1){
          setEnd1Error('End time is required');
          end1Error='end time is required';
          setErrorCount(1);
      }
      else {setEnd1Error(''); setErrorCount(0);}

         if(!endTime2){
          setEnd2Error('End time is required');
          end2Error='end time is required';
          setErrorCount(1);
      }
      else {setEnd2Error(''); setErrorCount(0);}
      
          if(!endTime3){
            setEnd3Error('End time is required');
            end3Error='end time is required';
            setErrorCount(1);
           }
           else {setEnd3Error(''); setErrorCount(0);}
           
         } 
  

  
    const submitForm = (e) => {
      // e.preventDefault();
      validateInfo();
      if(emailError===''  && fnError==='' && lnError==='' && unError==='' && start1Error==='' && start2Error==='' && start3Error==='' && end1Error==='' && end2Error==='' && end3Error==='') {
        let path = '/SignupSuccess';
        //const apiURL = 'http://localhost:3002/movie/addMovie';
        //console.log("adding Movie")
        const requestJson={
          poster:posterImageUrl,
            movieName:movieName,
            Date: date,
            id:roomNo,
            slideShow:slideshowUrl,
            startTime: [
              startTime1,
              startTime2,
              startTime3
            ] ,
            endTime:[ 
                endTime1,
                endTime2,
                endTime3
            ]
        };
        addMovie(requestJson)
    .then(response => {
      //console.log(response);   
  });
        handleClose();
        e.target.reset();


        // navigate(path);
      }
    }

  
    const submitFormUpdate = (e) => {
        // e.preventDefault();
        validateInfo();
        if(emailError===''  && fnError==='' && lnError==='' && unError==='' && start1Error==='' && start2Error==='' && start3Error==='' && end1Error==='' && end2Error==='' && end3Error==='') {
        let path = '/SignupSuccess';
        handleCloseUpdate();
        // e.target.reset();
   


        // navigate(path);
      }
    }
    return(
        <>
        <div className="overlay" >
                <div className="container" id="home">
                <div className=" row justify-content-between">
                    <div className=" logo justify-content-between bold row align-self-center ">
                    {/* <img className="logoPic" src="cinema.jpeg" ></img> */}
                    <h3 className=" bold text-white  align-items-center">
                        cinemata
                        </h3>
                    </div>
          <div className= "align-items-end " >
                          <nav className="nav-bar text-left hi ">
                          <ul className="text-white">
                              {user_info&&
                              <li className='userName bold'><p> Welcome, {user_info.firstName}  </p></li>}
                              <li><a href="#home" className=" bold"> Home </a></li>
                              <li><a href="#movies" className=" bold"> Movies </a></li>
                              {isLogedIn && user_role && 
                              <li><a href="#addMovie" onClick={handleShow} className="  bold" > addMovie </a></li>
                              }
                              {!isLogedIn &&
                              <>
                              <Link style={navStyle} to="/Signup"><li className=" bold">Sign Up</li></Link>
                              <Link style={navStyle} to="/"><li className="  bold"> Log In </li></Link>
                              </>
                              }
                              {reservations_array &&
                              <li><button className='cancel_reservation' onClick={handleCancelation}>cancel reservation</button></li>
                              //length reservation
                              }
                          </ul>
                          
                          </nav>
          </div>
                  </div>
                  <div className="line"></div>
                  </div>

                
            <div className='container ' >
              <Carousel indicators={false} slide={true} interval={1000} nextLabel={null} prevLabel={null}>
              {movies && movies.map(movie=>(
                
                <Carousel.Item   key={movie.id} >
                  <img
                    className="d-block pad center"
                    src={movie.slideshow}
                    alt="First slide"
                  />
                </Carousel.Item>

))
        }

</Carousel>
</div>

<div id="movies">
<div  className="container">
<div className=' row justify-content-between'>
        {movies && movies.map(movie=>(

          
            <div className="b column  ">
            <div className='poster center pp'>
                <img src={movie.poster}/>
                <div className="overlay3 column " style={{color:"white"}}>
                  <div className="name">
                  {movie.startTime && movie.startTime.map(start=>(
                    <>
                    <Link style={navStyle} to={`/RoomReservation/${movie.screeningRoom}/${isLogedIn}/${start}/${movie._id}/${user_id}`}><p className="bold pink" >Start Time:<span> {start}</span></p></Link>
                    </>
                  ))}
                 
                </div>
                <div className="update">
                 <a href="#editMovie" >
                   {/* <button className="pink">Edit</button> */}
                  <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill pink2" viewBox="0 0 16 16"onClick={()=>handleShowUpdate(movie.id)}>
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
</svg>

						</a></div>
                </div>
                
            </div>
            <div className='movie_details text-white center'>
                <h6 className="bold">{movie.title}</h6>
                <p bold>Date:<span> {movie.date}</span></p>
                
              
            </div>
          
            </div>
            
     
        ))
        }
           </div>
           </div>
           </div>
           </div>
           
           <Modal   dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Add the movie details</Modal.Title>
        </Modal.Header>
        <Modal.Body>  <form className="form_" onSubmit={submitForm} >
         <div className={classes.div__input}>
         <input type="url" placeholder="Poster Image Url" className={classes.div__inputfield} id="Poster" 
                onChange={handlePosterImageUrl} value={posterImageUrl} />
               <p className={classes.p__error}>{fnError}</p>
         </div>

         <div className={classes.div__input}>
         <input type="text" placeholder="Movie name" className={classes.div__inputfield} id="movieName" 
                onChange={handleMovieNameInput} value={movieName} />
                <p className={classes.p__error}>{lnError}</p>
         </div>

         <div className={classes.div__input}>
         <input type="date" placeholder="Release Date" className={classes.div__inputfield} id="date" 
                onChange={handleDateInput} value={date} />
                <p className={classes.p__error}>{unError}</p>
         </div>

         <div className={classes.div__input}>
          <input type="url" placeholder="Slideshow Url" className={classes.div__inputfield} id="slideshow" 
                 onChange={handleSlideshowUrl} value={slideshowUrl} />
                 <p className={classes.p__error}>{emailError}</p>
         </div>

         <div className={classes.div__input}>
          <input type="time" placeholder="Start time" className={classes.div__inputfield} id="startTime" 
                 onChange={handleStartTimeInput1} value={startTime1} />
                 <p className={classes.p__error}>{start1Error}</p>
         </div>
         <div className={classes.div__input}>
          <input type="time" placeholder="End time" className={classes.div__inputfield} id="endTime1" 
                 onChange={handleEndTimeInput1} value={endTime1} />
                 <p className={classes.p__error}>{end1Error}</p>
         </div>
         <div className={classes.div__input}>
          <input type="time" placeholder="Start time" className={classes.div__inputfield} id="startTime2" 
                 onChange={handleStartTimeInput2} value={startTime2} />
                 <p className={classes.p__error}>{start2Error}</p>
         </div>
         <div className={classes.div__input}>
          <input type="time" placeholder="End time" className={classes.div__inputfield} id="endTime2" 
                 onChange={handleEndTimeInput2} value={endTime2} />
                 <p className={classes.p__error}>{end2Error}</p>
         </div>
         <div className={classes.div__input}>
          <input type="time" placeholder="Start time" className={classes.div__inputfield} id="startTime3" 
                 onChange={handleStartTimeInput3} value={startTime3} />
                 <p className={classes.p__error}>{start3Error}</p>
         </div>
         <div className={classes.div__input}>
          <input type="time" placeholder="End time" className={classes.div__inputfield} id="endTime3" 
                 onChange={handleEndTimeInput3} value={endTime3} />
                 <p className={classes.p__error}>{end3Error}</p>
         </div>
         <div class="form-group center ">
         <label for="roomNo.">Room Number</label>
         <select id="roomNo." class="form-control">
          <option onClick={room1fn()}value={"1"} >Room1</option>
          <option onClick={room2fn()} value={"2"}>Room2</option>
         </select>
           </div>

         <div className={classes.div__input}>
         <button type="submit" className={classes.div_signupbutton} id="addMovieBtn" >Add Movie </button>
         </div>
          <br />
          </form></Modal.Body>
      </Modal>
    
      <Modal   dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title" show={showUpdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title> Edit the movie details</Modal.Title>
        </Modal.Header>
        <Modal.Body>  <form className="form_" onSubmit={submitFormUpdate} >
         <div className={classes.div__input}>
         <input type="url" placeholder="Poster Image Url" className={classes.div__inputfield} id="Poster" 
                onChange={handlePosterImageUrl} value={posterImageUrl} />
               <p className={classes.p__error}>{fnError}</p>
         </div>

         <div className={classes.div__input}>
         <input type="text" placeholder="Movie name" className={classes.div__inputfield} id="movieName" 
                onChange={handleMovieNameInput} value={movieName} />
                <p className={classes.p__error}>{lnError}</p>
         </div>

         <div className={classes.div__input}>
         <input type="text" placeholder="Release Date" className={classes.div__inputfield} id="date" 
                onChange={handleDateInput} value={date} />
                <p className={classes.p__error}>{unError}</p>
         </div>

         <div className={classes.div__input}>
          <input type="url" placeholder="Slideshow Url" className={classes.div__inputfield} id="slideshow" 
                 onChange={handleSlideshowUrl} value={slideshowUrl} />
                 <p className={classes.p__error}>{emailError}</p>
         </div>

         <div className={classes.div__input}>
          <input type="text" placeholder="Start time" className={classes.div__inputfield} id="startTime1" 
                 onChange={handleStartTimeInput1} value={startTime1} />
                 <p className={classes.p__error}>{start1Error}</p>
         </div>
         <div className={classes.div__input}>
          <input type="text" placeholder="End time" className={classes.div__inputfield} id="endTime1" 
                 onChange={handleEndTimeInput1} value={endTime1} />
                 <p className={classes.p__error}>{end1Error}</p>
         </div>
         <div className={classes.div__input}>
          <input type="text" placeholder="Start time" className={classes.div__inputfield} id="startTime2" 
                 onChange={handleStartTimeInput2} value={startTime2} />
                 <p className={classes.p__error}>{start2Error}</p>
         </div>
         <div className={classes.div__input}>
          <input type="text" placeholder="End time" className={classes.div__inputfield} id="endTime2" 
                 onChange={handleEndTimeInput2} value={endTime2} />
                 <p className={classes.p__error}>{end2Error}</p>
         </div>
         <div className={classes.div__input}>
          <input type="text" placeholder="Start time" className={classes.div__inputfield} id="startTime3" 
                 onChange={handleStartTimeInput3} value={startTime3} />
                 <p className={classes.p__error}>{start3Error}</p>
         </div>
         <div className={classes.div__input}>
          <input type="text" placeholder="End time" className={classes.div__inputfield} id="endTime3" 
                 onChange={handleEndTimeInput3} value={endTime3} />
                 <p className={classes.p__error}>{end3Error}</p>
         </div>
        

         <div className={classes.div__input}>
         <button type="submit" className={classes.div_signupbutton} id="UpdateBtn" >Edit Movie </button>
         </div>
          <br />
          </form></Modal.Body>
      </Modal>
        
        </>
    )

}
