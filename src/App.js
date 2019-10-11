import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Login from "./components/login/login";
import Weather from "./components/weather/weather";

function App() {
  return (
    <Router>
      <div>
        <Route path="/login" component={Login}/>
        <Route path="/weather" component={Weather}/>
      </div>
    </Router>
   
  );
}

export default App;
