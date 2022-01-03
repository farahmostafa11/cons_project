import React, { useState, useEffect} from 'react'
import classes from './Signin.module.css'
import {Link} from 'react-router-dom'
import axios from 'axios'

/**
 * Signin existing user
 * @author Esraa Hamed
 * @async
 * @example <Signin />
 * @returns {element} The sign in form contents
 * 
 */
const Signin = () => {

const apiURL = 'http://localhost:3002/users' ;   //json server
const [userName, setUsername] = useState('');
const [password, setPassword] = useState('');
const [isUser, setIsUser] = useState();

const [unError, setunError] = useState();
const [passError, setpassError] = useState();

/**
 * Handles what happens when form is submitted
 * 
 * @param {object} e - the JavaScript event object
 */
const handleSubmit = (e) => {
    e.preventDefault();
    checkUserInput();
    validateInfo();
}   
// ------------------------------------- json server -------------------------------------------//

/**
 * Checks if the user actually exists, if yes it directs the user to the home page
 */
 const checkUserInput = () => {
    axios.get(  apiURL + '?username=' + userName + '&password=' + password )
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
  }

//---------------------------------------- HANDLING INPUTS ---------------------------------------//
// ** Handling input functions also contain validations to provide instant validation on typing ** //

//Username
const handleUserNameInput = (e) => {
    setUsername(e.target.value); 
    if(e.target.value) 
    {setunError('');}
}

//Password
const handlePasswordInput = (e) => {
setPassword(e.target.value);
 if (e.target.value) {
    setpassError('');
} 
}

// ---------------------------------------- VALIDATIONS ---------------------------------------------- //
/**
 * Insures that all input data is valid
 * This is what provides instant validation on submiiting the form
 */
 const validateInfo = () => {
    //Username
    if(!userName) {
        setunError('Username is required');
    } else{setunError('');}

    //Password
    if(!password){
        setpassError('Password is required');
    } else {setpassError('');}
} 

// ------------------------------------------ RETURN -------------------------------------------------- //

return (
<div className="page" >
        <div className={classes.div__login_page}>
       
           <form className={`${classes.login__page} ${classes.form__login}`} onSubmit={handleSubmit}>
                <h5 className={classes.h5__center}> Login to Cinemata </h5>
       
                <div className={classes.div__input}>
                 <input type="text" placeholder="Username" className={classes.div__inputfield}  id="login-username"
                        onChange={handleUserNameInput} value={userName} />
                        <p className={classes.p__error}>{unError}</p>
                </div>
       
                <div className={classes.div__input}>
                 <input type="password" placeholder="Password" className={classes.div__inputfield} id="login-password"
                        onChange={handlePasswordInput} value={password}/>
                        <p className={classes.p__error}>{passError}</p>
                  </div>
       
                <div className={classes.div__input}>
                <button className={classes.div_loginbutton} id="login"> Login </button>
                </div>       
                  
                 <br />
                 <hr />
                 <p> Do not have an account? Signup <Link to ="/Signup"> here </Link> </p>
                 <br />    
                
                 </form>
         </div>
        </div>
)
}

export default Signin;