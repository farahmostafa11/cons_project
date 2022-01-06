import CinemaRoom from "./component/cinemaRoom/CinemaRoom"
import MoviesShow from "./component/movies_show/movies_show"
import Signup from "./component/Signup/Signup"
import Signin from "./component/Signin/Signin"
import SignupSuccess from "./component/SignupSuccess/SignupSuccess"
import React from 'react';
import {BrowserRouter as Router, Routes , Route} from "react-router-dom";
//import "../node_modules/bootstrap/scss/bootstrap.scss";

function App() {

  return (
    <Router>
      <div className='App'>
        <Routes>
        <Route path='homePage/:isLoggedIn' element={<MoviesShow/>}/>
        <Route path='/RoomReservation/:id/:isLoggedIn' element={<CinemaRoom/>}/>
        <Route exact path='/' element={< Signin />}></Route>
        <Route path='/Signup' element={< Signup />}></Route>
        <Route path='/SignupSuccess' element={< SignupSuccess />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
