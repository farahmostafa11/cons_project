import axios from "axios"
import configData from "../config/development.json"
const apiURL = 'http://localhost:3002/api' ;   //json server

export default async function addUser(userInfo){
    try{
        console.log("dataa",userInfo);
        const response = await axios.post(apiURL+'/customer/signUp' , userInfo);
        console.log("response",response);
        //Success
        
        return(response)
    } catch (error){
        if (error.response){
        console.log("no");
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


export  async function userLogin(data){
    try{
        
        console.log("dataa",data);
        const response = await axios.post(apiURL+'/customer/login' , data);
        console.log("response",response);
        //Success
        
        return(response)
    } catch (error){
        if (error.response){
        console.log("no");
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

export  async function getuserInfo(data){
    try{
        
        //console.log("dataa",data);
        const response = await axios.post(apiURL+'/customer/getUserInfo' , data);
        //console.log("response",response);
        //Success
        
        return(response)
    } catch (error){
        if (error.response){
        console.log("no");
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

//deleteReservations

export  async function deletereservation(data){
    try{
        alert("your reservation is cancled successfully")
        //console.log("dataa",data);
        const response = await axios.post(apiURL+'/customer/deleteReservations' , data);
        //console.log("response",response);
        //Success
        
        return(response)
    } catch (error){
        if (error.response){
        console.log("no");
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

export async function getUserReservations(data){
    try{
        console.log("userIdddd tp get reservations",data);
        const response = await axios.post(apiURL+'/customer/getReservations' , data);
        console.log("response",response);
        //Success
        
        return(response)
    } catch (error){
        if (error.response){
        console.log("no");
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