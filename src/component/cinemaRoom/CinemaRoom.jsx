import React,{useState,useEffect} from 'react';
import './CinemaRoom.scss';
import {Link} from "react-router-dom";
export default function CinemaRoom(props){

  const path = window.location.pathname;
  console.log("path",path);
    const index = path.split('/');
    var room_id = index[2];
    if(room_id==undefined){ 
      room_id='null';
    }
    console.log("room_id",room_id);

  const [rows, setRows] = useState([]); 
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
  }

  useEffect(async()=>{
    fetch('http://localhost:3002/rows')
    .then(
      res=>{return res.json()}
    )
    .then(
      data=>{console.log(data);
      setRows(data);

    }
    )
  },[isNotEmpty])

    return(
        <>
        <div className="plane">
          <div className="exit exit--front fuselage">

          </div>
          <ol className="cabin fuselage">
            {rows && rows.map(row=>(
            <li className="row" className={row.row_num}>
              <ol className="seats" type="A">
                {row.chairs && row.chairs.map(chair=>(
                <li className="seat" >
                  <input onClick={() =>{ toggleChair(chair.ID,chair.is_reserved)}} type="checkbox" id={chair.ID} disabled={chair.Reserver_ID!==-1?true:false} />
                  <label className={chair.is_reserved} htmlFor={chair.ID} >{chair.ID}</label>
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
          {!isNotEmpty && <button className='confirmation_button' onClick={sendTickets}>confirm reservation</button>}
        </div>
        </>
    )

}
