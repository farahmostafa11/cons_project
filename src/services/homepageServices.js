import axios from "axios"
import configData from "../config/development.json"
const apiURL = 'http://localhost:3002/api/movie';   //json server
// getAllMovies
export default async function addMovie(movieInfo){
    try{
        console.log("moviee infoo",movieInfo);
        const response = await axios.post(apiURL+'/addMovie' , movieInfo);
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

export async function getMovies(){
    try{
        //console.log("moviee infoo",movieInfo);
        const response = await axios.get(apiURL+'/getAllMovies');
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


