import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Login from "./components/Login";
import Friends from "./components/Friends";
import PrivateRoute from "./components/PrivateRoute";

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
      <h1>Friends!</h1>
      {/* <Link to="/login">Login</Link> */}
      <Switch>
      <PrivateRoute exact path="/friends" component={Friends}/>
      <Route path = "/login" component={Login} />
      <Route component={Login}/>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
