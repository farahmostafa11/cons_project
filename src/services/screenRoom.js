import axios from "axios"
import configData from "../config/development.json"
const SERVER_URL = configData.SERVER_URL ;
const apiURL = 'http://localhost:3002/api/room' ;   //json server
const apiURL2 = 'http://localhost:3002/api/reservation' ;   //json server

export default async function GetRoomReservations(roomInfo){
    try{
        console.log("fe el service ROMM INFO",roomInfo);
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

