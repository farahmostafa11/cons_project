import React, { useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import addUser from "../../services/userServices"
import classes from './Signup.module.css'
import {Link} from 'react-router-dom'
import axios from 'axios'

/**
 * Signup new user
 * @author Esraa Hamed
 * @async
 * @example <Signup />
 * @returns {element} The sign up form contents
 * 
 */
const Signup = (props) => {

const apiURL = 'http://localhost:3002/users' ;   //json server
const navigate = useNavigate();
var hasNumber = /\d/;  //used in password validation

const [firstName, setFirstname] = useState('');
const [lastName, setLastname] = useState('');
const [userName, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [rePassword, setrePassword] = useState('');
const [role, setRole] = useState('customer'); //role is set to Customer by default

const [fnError, setfnError] = useState();
const [lnError, setlnError] = useState();
const [unError, setunError] = useState();
const [emailError, setemailError] = useState();
const [passError, setpassError] = useState();
const [rePassError, setrePassError] = useState();
const [errorcount, setErrorCount] = useState('');

/**
 * Handles what happens when form is submitted
 * 
 * @param {object} e - the JavaScript event object
 */
const handleSubmit = (e) => {
    e.preventDefault();
    checkUserInput();
    validateInfo();
    postDataHandler();
    submitForm();
}   

/**
 *  Checks if all inputs are valid, then user will be registered and will be redirected to another form
 *  that shows the user a message to check his/her email for confirmation 
 */
const submitForm = () => {
  if(emailError==='' && passError==='' && rePassError==='' && fnError==='' && lnError==='' && unError==='') {
    let path = '/SignupSuccess';
    navigate(path);
  }
}

// ------------------------------------- json server -------------------------------------------//

/**
 * Checks the availability of the email, if it's already in the mockAPI, function will return 'Email unavailable'
 * It's considered to be part of the email validation, but it's written in a separate function since it has different logic than other validations 
 * & depends on the server 
 */
 const checkUserInput = () => {
    axios.get(  apiURL + '?email=' + email)
    .then(response => {
      console.log(response.data);
      if(response.data.length > 0) {
        setemailError('Email unavailable');
      }
  })
}

/**
 * Responsible for posting/recording the data inputted by the user in the fakeAPI, but it checks first if all inputs are valid 
 * 
 */
const postDataHandler = () => {
if(emailError==='' && passError==='' && rePassError==='' && fnError==='' && lnError==='' && unError===''){
    const userInfo = {
        firstname : firstName,
        lastname: lastName,
        username: userName,
        email: email,
        password: password,
        role: role
       }
      addUser(userInfo) //json server
      .then(response => {
       console.log(response)
     })
}
}

//---------------------------------------- HANDLING INPUTS ---------------------------------------//
// ** Handling input functions also contain validations to provide instant validation on typing ** //

//First Name
const handleFirstNameInput = (e) => {
setFirstname(e.target.value);
if(e.target.value) 
{setfnError(''); setErrorCount(0)}
}

//Last Name
const handleLastNameInput = (e) => {
setLastname(e.target.value); 
if(e.target.value) 
{setlnError(''); setErrorCount(0)}
}

//Username
const handleUserNameInput = (e) => {
    setUsername(e.target.value); 
    if(e.target.value) 
    {setunError(''); setErrorCount(0)}
}

//Email
const handleEmailInput = (e) => {
    setEmail(e.target.value);  
   if (!/\S+@\S+\.\S+/.test(e.target.value) && e.target.value) {
      setemailError('Email address is invalid');
      setErrorCount(1);
  }    
  else if(e.target.value) 
  {setemailError(''); setErrorCount(0)}
}

//Password
const handlePasswordInput = (e) => {
setPassword(e.target.value);
 if (e.target.value && e.target.value.length < 8) {
  setpassError('Password should be 8 characters or more');
} else if (e.target.value && !hasNumber.test(e.target.value)){
  setpassError('Password should contain at least 1 number');
}
else if(e.target.value){
  setpassError('');
}
}

//Confirm Password
const handleConfirmPasswordInput = (e) => {
setrePassword(e.target.value);   
// if(rePassword !== password){
//   setrePassError('Passwords do not match'); 
// } else{
//       setrePassError('');
// }
if(e.target.value && e.target.value !== password){
  console.log("enteredd");
   setrePassError('Passwords do not match'); 
} else if(e.target.value){
       setrePassError('');
}
}

//Setting roles
const handleCustomerButton = (e) => {
setRole("customer");
console.log(role);
}

const handleManagerButton = (e) => {
setRole("manager");
console.log(role);
}
// ---------------------------------------- VALIDATIONS ---------------------------------------------- //
/**
 * Insures that all input data is valid
 * This is what provides instant validation on submiiting the form
 */
 const validateInfo = () => {

    //First name
    if(!firstName) {
        setfnError('First name is required');
        setErrorCount(1);
    } else{setfnError(''); setErrorCount(0)}

    //Last name
    if(!lastName) {
        setlnError('Last name is required');
        setErrorCount(1);
    } else{setlnError(''); setErrorCount(0)}

    //Username
    if(!userName) {
        setunError('Username is required');
        setErrorCount(1);
    } else{setunError(''); setErrorCount(0)}

    //Email
    if(!email){
        setemailError('Email is required');
        setErrorCount(1);
    }
    else if (!/\S+@\S+\.\S+/.test(email)) {
        setemailError('Email address is invalid');
        setErrorCount(1);
    }
    else {setemailError(''); setErrorCount(0)}

    //Password    //TODO: add the (contains at least one letter and one number) validation
    if(!password){
        setpassError('Password is required');
        setErrorCount(1);
    } else if (password.length < 8) {
        setpassError('Password should be 8 characters or more');
        setErrorCount(1);
    }
    else if (!hasNumber.test(password)){
      console.log("entered");
      setpassError('Password should contain at least 1 number');
      setErrorCount(1);
    }
      //TODO:: add the "should contain at least 1 letter" validation
     else {setpassError(''); setErrorCount(0)}

     //Confirm password
     if(!rePassword){
         setrePassError('Confirm Password is required');
     }
     else if(rePassword !== password){
       console.log("enteredd");
        setrePassError('Passwords do not match'); 
    } else{
            setrePassError('');
    }
} 

// ------------------------------------------ RETURN -------------------------------------------------- //
return (

  <div className="page">
 <div  className={classes.div__signup_page}>

    <form className={classes.form__signup_page} onSubmit={handleSubmit} >
         <h5 className={classes.center}> Create your account</h5>

         <div className={classes.div__input2}>
           <input type="radio" name="role" value="Customer" id="signup-roleCustomer" className={classes.customerButton} onClick={handleCustomerButton} defaultChecked/> Customer
           <input type="radio" name="role" value="Manager" id="signup-roleManager" className={classes.managerButton} onClick={handleManagerButton}/> Manager
           </div>

         <div className={classes.div__input}>
         <input type="text" placeholder="First name" className={classes.div__inputfield} id="signup-firstname" 
                onChange={handleFirstNameInput} value={firstName} />
               <p className={classes.p__error}>{fnError}</p>
         </div>

         <div className={classes.div__input}>
         <input type="text" placeholder="Last name" className={classes.div__inputfield} id="signup-last name" 
                onChange={handleLastNameInput} value={lastName} />
                <p className={classes.p__error}>{lnError}</p>
         </div>

         <div className={classes.div__input}>
         <input type="text" placeholder="Username" className={classes.div__inputfield} id="signup-username" 
                onChange={handleUserNameInput} value={userName} />
                <p className={classes.p__error}>{unError}</p>
         </div>

         <div className={classes.div__input}>
          <input type="email" placeholder="Email address" className={classes.div__inputfield} id="signup-email" 
                 onChange={handleEmailInput} value={email} />
                 <p className={classes.p__error}>{emailError}</p>
         </div>

         <div className={classes.div__input}>
          <input type="password" placeholder="Password" className={classes.div__inputfield} id="signup-password" 
                 onChange={handlePasswordInput} value={password} />
                 <p className={classes.p__error}>{passError}</p>
           </div>

           <div className={classes.div__input}>
          <input type="password" placeholder="Confirm password" className={classes.div__inputfield} id="signup-rePassword" 
                 onChange={handleConfirmPasswordInput} value={rePassword} />
                 <p className={classes.p__error}>{rePassError}</p>
           </div>

         <div className={classes.div__input}>
         <button className={classes.div_signupbutton} id="signup">Sign up</button>
         </div>

          <br />
          <hr />
          <p> Already have an account? Log in <Link to ="/">here </Link> </p>
          <br />
          </form>
  </div>
 </div> 
)
}

export default Signup;