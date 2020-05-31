import React from 'react';
import {BrowserRouter as Router,
Switch,
Route} from 'react-router-dom'
import './css/common.css'
import Login from "./components/Login";
import Main from "./components/Main";

function App() {
  return (
    <Router>
        <Switch>
            <Route path="/login" component={Login}/>
            <Route path={"/user"} component={Main} />
        </Switch>
    </Router>
  );
}

export default App;
