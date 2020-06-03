import React, {Component} from 'react';
import '../css/main.css'
import {Switch,Route,Link} from 'react-router-dom'
import Profile from "./Profile";
import Files from "./Files";
import Upload from "./Upload";
class Main extends Component {
    state = {

    };
    componentWillMount() {

    }
    componentDidMount() {
        console.log(this.props);
    }

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
                            <Link to={`${this.props.match.url}/profile/`}> Profile</Link>
                        </li>
                        <li><Link to={`${this.props.match.url}/upload/`}>Upload</Link></li>
                        <li><Link to={`/user/${this.props.match.params.id}`}>View Files</Link></li>
                    </ul>
                </div>
                <div className="main-content">
                        <Switch>
                            <Route exact path={`${this.props.match.path}/profile`} component={Profile} />
                            <Route exact path={`${this.props.match.path}/upload`} component={Upload} />
                            <Route path={"/"} component={Files} />
                        </Switch>

                </div>
            </div>
        );
    }
}

export default Main;