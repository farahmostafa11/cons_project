import React,{useState,useEffect} from 'react';
import './movies_show.scss';
//import'./bootstrap.css'
import Carousel from 'react-bootstrap/Carousel'
import {Link} from "react-router-dom";

export default function MoviesShow(props){


  const [movies, setMovies] = useState([]); 

  const navStyle={
    color:'white'
  };
    useEffect(async()=>{
    fetch('http://localhost:3002/movies')
    .then(
        res=>{return res.json()}
    )
    .then(
        data=>{console.log(data);
        setMovies(data);
    }
    )
    },[])

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
                              <li><a href="#home" className=" bold"> Home </a></li>
                              <li><a href="#movies" className=" bold"> Movies </a></li>
                              <Link style={navStyle} to="/Signup"><li><a href="#signup" className=" bold"> Sign Up </a></li></Link>
                              <Link style={navStyle} to="/Signin"><li><a href="#login" className="  bold"> Log In </a></li></Link>

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
                    src={movie.slideShow}
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
                <div className="overlay3 " style={{color:"white"}}>
                  <div className="name">
                  {movie.startTime && movie.startTime.map(start=>(
                    <>
                    <Link style={navStyle} to={`/RoomReservation/${movie.id}`}><p className="bold pink" >Start Time:<span> {start}</span></p></Link>
                    </>
                  ))}
                </div>
                </div>
            </div>
            <div className='movie_details text-white center'>
                <h6 className="bold">{movie.movieName}</h6>
                <p bold>Date:<span> {movie.Date}</span></p>
                
              
            </div>
          
            </div>
            
     
        ))
        }
           </div>
           </div>
           </div>
           </div>
        </>
    )

}
