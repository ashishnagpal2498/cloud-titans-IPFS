import React, {Component} from 'react';
import '../css/main.css'
import {Switch,Route,Link} from 'react-router-dom'
import Profile from "./Profile";
import Files from "./Files";
import Upload from "./Upload";
class Main extends Component {
    state = {

    };
    render() {
        return (
            <div className="main-container">
                <div className="side-nav">
                    <div className="user-avatar-wrapper">
                        <div className="user-avatar">
                        <img src={"/assets/dummy_image.png"} alt="profile" />
                        </div>
                    </div>
                    <ul className="navigation">
                        <li>
                            <Link to={"/user/profile"}> Profile</Link>
                        </li>
                        <li><Link to={"/user/upload"}>Upload</Link></li>
                        <li><Link to={"/user"}>View Files</Link></li>
                    </ul>
                </div>
                <div className="main-content">
                        <Switch>
                            <Route path={`${this.props.match.path}/profile`} component={Profile} />
                            <Route path={`${this.props.match.path}/upload`} component={Upload} />
                            <Route path={"/"} component={Files} />
                        </Switch>

                </div>
            </div>
        );
    }
}

export default Main;