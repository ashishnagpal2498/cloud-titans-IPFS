import React from 'react';
import {BrowserRouter as Router,
Switch,
Route,
Redirect} from 'react-router-dom'
import './css/common.css'
import Login from "./components/Login";
import Main from "./components/Main";
import SignUp from "./components/SignUp";

function App() {
  return (
    <Router>
        <Switch>
            <Route path={"/user/:id"} component={Main} />
            <Route path="/login" component={Login}/>
            <Route path={"/signup"} component={SignUp} />
            <Redirect to={"/login"} />
        </Switch>
    </Router>
  );
}

export default App;
