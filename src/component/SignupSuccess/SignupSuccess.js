import React, { useState, useEffect} from 'react'
import classes from './SignupSuccess.module.css'
import formImg from './bg3.jpeg'
import {Link} from 'react-router-dom'

/**
 * A form responsible for showing the user a message to upon succeeding in sign up 
 * 
 * @author Esraa Hamed
 * @example <SignupSuccess />
 * @returns {element} The SignupSuccess form contents
 */

const SignupSuccess = () => {
    return (
     <div className={classes.form_page}>
        <form className={classes.formsuccess}>
    
         <img src={formImg} className={classes.img__formsuccess} />
         <h4 className={classes.center}> Thank you for signing up for Cinemata </h4>
         <h6 className={classes.center} > You can now reserve tickets for the movies you want  </h6>

         <br />
        <p> Go to <Link to ="/"> homepage </Link> </p>
        <br />
    
        </form>
      </div> 
        )
}

export default SignupSuccess;