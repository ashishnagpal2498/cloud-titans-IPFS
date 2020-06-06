import React, {Component} from 'react';
import '../css/main.css'
import {Switch,Route,Link} from 'react-router-dom'
import Profile from "./Profile";
import Files from "./Files";
import Upload from "./Upload";
class Main extends Component {
    state = {
        toggleMenu : false
    };
    componentWillMount() {

    }
    componentDidMount() {
        console.log(this.props);
    }
    toggleMenu = () => {
            this.setState((prevState) => {
                return{
                    toggleMenu : !prevState.toggleMenu
                }
            })
    }
    render() {
        return (
            <div className="main-container">
                <div className={this.state.toggleMenu ? "side-nav toggle-menu": "side-nav"}>
                    <div className="user-avatar-wrapper">
                        <div className="user-avatar">
                        <img src={"/assets/dummy_image.png"} alt="profile" />
                        </div>
                    </div>
                    <ul className="navigation">
                        <li onClick={this.state.toggleMenu && this.toggleMenu}>
                            <Link to={`${this.props.match.url}/profile/`}> Profile</Link>
                        </li>
                        <li onClick={this.state.toggleMenu && this.toggleMenu}><Link to={`${this.props.match.url}/upload/`}>Upload</Link></li>
                        <li onClick={this.state.toggleMenu && this.toggleMenu} ><Link to={`/user/${this.props.match.params.id}`}>View Files</Link></li>
                    </ul>
                </div>
                <div className="nav-menu" onClick={this.toggleMenu}>
                    <i className="fa fa-bars" />
                </div>
                <div className="main-content">
                        <Switch>
                            <Route exact path={`${this.props.match.path}/profile`} component={Profile} />
                            <Route exact path={`${this.props.match.path}/upload`} component={Upload} />
                            <Route path={"/"} id={this.props.match.params.id} render={() => <Files {...this.props} />} />
                        </Switch>
                </div>
            </div>
        );
    }
}

export default Main;