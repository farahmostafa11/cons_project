import axios from "axios"
import configData from "../config/development.json"
const SERVER_URL = configData.SERVER_URL ;
const apiURL = 'http://localhost:3002/api/room' ;   //json server
const apiURL2 = 'http://localhost:3002/api/reservation' ;   //json server

export default async function GetRoomReservations(roomInfo){
    try{
        console.log("fe el service");
        console.log("roomInfo",roomInfo);
        const response = await axios.post( apiURL+'/showRoomChairs',roomInfo);
        // const response = await axios.get( SERVER_URL+'peoplePhotos');
        //Success
        console.log(response);
        console.log("success");
        return(response)
    } catch (error){
        if (error.response){
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request){
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log(error);
    }
};

export async function AddReservations(reservedChairsId){
    try{
        const response = await axios.post(apiURL2+'/addReservation' , reservedChairsId);
        //Success
        
        return(response)
    } catch (error){
        if (error.response){
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        } else if (error.request){
        console.log(error.request);
        } else {
        console.log('Error', error.message);
        }
        console.log(error);
    }
};

export async function DeleteRservation (chairsIds){
    try{
        const response = await axios.delete( SERVER_URL+'photo/',chairsIds,{headers:{token:localStorage.token}});
        // const response = await axios.delete(SERVER_URL+'photos/'+ids[0])
        //Success
        return(response)
    } catch (error){
        if (error.response){
        /*
        * The request was made and the server responded with a
        * status code that falls out of the range of 2xx
        */
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request){
          /*
          * The request was made but no response was received, `error.request`
          * is an instance of XMLHttpRequest in the browser and an instance
          * of http.ClientRequest in Node.js
          */
          console.log(error.request);
        } else {
          // Something happened in setting up the request and triggered an Error
          console.log('Error', error.message);
        }
        console.log(error);
    }
};