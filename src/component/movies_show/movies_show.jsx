import React,{useState,useEffect} from 'react';
import './movies_show.scss';
import {Link} from "react-router-dom";
export default function MoviesShow(props){


    const [movies, setMovies] = useState([]); 
  //console.log(chairs)
  /*
  const [idToreserve,setChairID]=useState();
  const [selectedChairs,setSelectedChairs]=useState([]);
  const [isClicked,setClicked] = useState(false);

  function addToSelectedChairs(id){
    
  }

  function toggleChair(id,chair_state){
    
    
    if(isClicked==false){
      if(chair_state=="empty"){
        console.log("da5al")
        setClicked(!isClicked);
        var index = selectedChairs.indexOf(id); // Let's say it's Bob.
        console.log(index);
        if(index==-1){
          setChairID(id);
          console.log(idToreserve);
          setSelectedChairs(selectedChairs => [...selectedChairs, id]);
          console.log(selectedChairs);
        }
        else{
          selectedChairs.splice(index, 1);
          console.log(selectedChairs);
        }
      }
    }
    else{
      setClicked(!isClicked);
    }
  }

  */
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

        {movies && movies.map(movie=>(
            <div className='whole_movie_details'>
            <div className='poster'>
                <img src={movie.poster}/>
            </div>
            <div className='movie_details'>
                <h4>{movie.movieName}</h4>
                <p>rating {movie.rating}</p>
                <p>actor name:{movie.actor_name}</p>
            </div>
            <div>
              <Link style={navStyle} to="/RoomReservation"><button>buy a ticket</button></Link>
            </div>
        </div>
        ))
        }
        </>
    )

}
