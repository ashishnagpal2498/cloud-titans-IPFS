import React from 'react';
import {BrowserRouter as Router,
Switch,
Route} from 'react-router-dom'
import Login from "./components/Login";

function App() {
  return (
    <Router>
        <Switch>
            <Route path="/login" component={Login}/>
        </Switch>
    </Router>
  );
}

export default App;
