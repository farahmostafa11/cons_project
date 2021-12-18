import CinemaRoom from "./component/cinemaRoom/CinemaRoom"
import React from 'react';
import {BrowserRouter as Router, Routes , Route} from "react-router-dom";
//import "../node_modules/bootstrap/scss/bootstrap.scss";

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
        <Route exact path='/' element={< CinemaRoom />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
