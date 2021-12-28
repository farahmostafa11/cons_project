import React,{useState,useEffect} from 'react';
import './CinemaRoom.scss';
import {Link} from "react-router-dom";
export default function CinemaRoom(props){

  //console.log(chairs)
  const [rows, setRows] = useState([]); 
  const [idToreserve,setChairID]=useState();
  const [selectedChairs,setSelectedChairs]=useState([]);
  const [isClicked,setClicked] = useState(false);


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
  },[])

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
                <li className="seat"  onClick={() =>{ toggleChair(chair.ID,chair.is_reserved);}}>
                  <input type="checkbox" id={chair.ID} disabled={chair.Reserver_ID!==-1?true:false} />
                  <label className={chair.is_reserved} htmlFor={chair.ID}>{chair.ID}</label>
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
        <div className='confirm_rservation'>
          
        </div>
        </>
    )

}
