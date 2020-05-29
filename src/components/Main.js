import React, {Component} from 'react';
import '../css/user.css'
import {BrowserRouter as Router, Switch,Route,Link} from 'react-router-dom'
import Profile from "./Profile";
class Main extends Component {
    state = {

    };
    render() {
        return (
            <div className="container">
                <div className="side-nav">
                    <div className="user-avatar-wrapper">
                        <div className="user-avatar">
                        <imh src={""} alt="profile" />
                        </div>
                    </div>
                    <ul className="navigation">
                        <li>
                            <Link to={"/profile"}> Profile</Link>
                        </li>
                        <li><Link to={"/upload"}>Upload</Link></li>
                        <li><Link to={"/files"}>View Files</Link></li>
                    </ul>
                </div>
                <div className="main-content">
                    <Router>
                        <Switch>
                            <Route exact path="/profile" component={Profile}/>
                            <Route exact path="/upload" component={""} />
                            <Route path={"/"} component={""} />
                        </Switch>
                    </Router>
                </div>
            </div>
        );
    }
}

export default Main;