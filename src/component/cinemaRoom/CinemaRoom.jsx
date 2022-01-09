import React,{useState,useEffect} from 'react';
import './CinemaRoom.scss';
import {Link} from "react-router-dom";
import GetRoomReservations,{AddReservations} from "../../services/screenRoom.js"
export default function CinemaRoom(props){

  const path = window.location.pathname;
  console.log("path",path);
    const index = path.split('/');
    var room_id = index[2];
    var loggedIn=index[3];
    var start_date=index[4];
    var movie_id=index[5];
    var user_id=index[6];
    if(room_id==undefined){ 
      room_id='null';
    }
    console.log("room_id",room_id);

  const [isLogedIn, setLogedIn] = useState(0); 
  const [rows, setRows] = useState([]); 
  const [row1,setRow1]=useState([]);
  const [row2,setRow2]=useState([]);
  const [row3,setRow3]=useState([]);
  const [idToreserve,setChairID]=useState();
  const [selectedChairs,setSelectedChairs]=useState([]);
  const [isClicked,setClicked] = useState(false);
  const [isNotEmpty,setEmptyCheck] = useState(true);
  const navStyle={
    color:'white'
  };
  function reservationButtonReveal(){
    if(selectedChairs.length !==0){
      setEmptyCheck(false);
    }
    else{
      setEmptyCheck(true);
    }
  }

 /* const GetRoomReservations = () => {
    axios.get(  apiURL + room_id)
    .then(response => {
      console.log(response.data);
      if(response.data.length > 0) {
        setIsUser(true);
        setpassError('');
        //TODO: Redirect to home page (on successful login)
  
      } else if ( response.data.length === 0 && userName && password) {
        setIsUser(false);
        setpassError('Incorrect username or password')
      }
    })
  }*/


  function toggleChair(id,chair_state){
    console.log("current_iddd",id)
    if(chair_state==="empty"){
        console.log("da5al")
        var index = selectedChairs.indexOf(id); 
        console.log(isClicked);
        if(index===-1){
          setEmptyCheck(false);
          setSelectedChairs(selectedChairs => selectedChairs.concat(id));
          //console.log("7agaz");
          setChairID(id);
        }
        else{
          selectedChairs.splice(index, 1);
          setClicked(!isClicked);
          console.log(selectedChairs);
          reservationButtonReveal();
        }
    }
    console.log(selectedChairs);
    //
  }
  function sendTickets(){
    console.log(selectedChairs);
    const ticketInfo={
      movieid:movie_id,
      roomid:room_id,
      startTime:start_date,
      chairsid:selectedChairs,
      customerid:user_id,
      date:"10-01-2022"
    }
    AddReservations(ticketInfo);
  }

  /*useEffect(async()=>{
    fetch('http://localhost:3002/rows')
    .then(
      res=>{return res.json()}
    )
    .then(
      data=>{console.log(data);
      setRows(data);

    }
    )
  },[isNotEmpty])*/
  useEffect(async()=>{
    
    if(loggedIn==="true"){
      setLogedIn(1);
    }
    else{
      setLogedIn(0);
    }
    var today = new Date(); 
    var dd = today.getDate(); 
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    var str=""+dd+"-"+mm+"-"+yyyy;
    const room_info={
      roomid:room_id,
      starttime:start_date,
      date:"10-01-2022"
    }
    GetRoomReservations(room_info).then(response=>{
        setRows(response.data.data.roomres);
        console.log(response.data.data.roomres);
        console.log(rows);
        setRow1(rows[0]);
        setRow1(rows[1]);
        setRow1(rows[2]);
  })
  },[rows])


    return(
        <>
        <div className="plane">
          <div className="exit exit--front fuselage">

          </div>
          <ol className="cabin fuselage">
            {rows && rows.map((row,index)=>(
            <li className="row row--2" key={index}>
              <ol className="seats" type="A">
                {row && row.map((chair,sindex)=>(
                <li  key={sindex} className="seat">
                  <input onClick={() =>{ toggleChair(chair._id,chair.isReserved)}} type="checkbox" id={chair.name} disabled={chair.isReserved!=="empty"?true:false} />
                  <label className={chair.isReserved} htmlFor={chair.name} >{chair.name}</label>
                </li>
                )
                )}

              </ol>
            </li>
            ))}
          </ol>
          <div className="exit exit--back fuselage">
          </div>
        </div>
        <div className='confirm_reservation'>
          {isLogedIn&& !isNotEmpty && <Link style={navStyle} to={`/homePage/${isLogedIn}/${user_id}`}><button className='confirmation_button' onClick={sendTickets}>confirm reservation</button></Link>}
        </div>
        </>
    )

}
