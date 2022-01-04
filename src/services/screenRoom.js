import axios from "axios"
import configData from "../config/development.json"
const SERVER_URL = configData.SERVER_URL ;
const apiURL = 'http://localhost:3002/rows' ;   //json server

export default async function GetRoomReservations(id){
    try{
        console.log("fe el service");
        const response = axios.get( apiURL);
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

export async function AddReservations(id,reservedChairsId){
    try{
        const response = await axios.post(SERVER_URL+'roomReservation/'+id , reservedChairsId,{headers:{token:localStorage.token}});
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