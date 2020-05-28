import React, {Component} from 'react';
import '../css/login.css'

class Login extends Component {
    state = {
        email: "",
        password: "",
        viewPassword: false
    };
    onChangeHandler = (event)=> {
        this.setState({
            [event.target.name] : event.target.value
        })
    };
    submitForm = (e) => {
      e.preventDefault();

    };
    render() {
        return (
            <div className="login-outer">
                <div className="page-division">
                <div className="background-container"/>
                <div className="details-container">
                    <h2>Welcome To IPFS-React</h2>
                    <form className="form-container">
                        <div className="error-message">Invalid Email or Password</div>
                    <div className="inputBox">
                        <input type="email" name="email" id="email" placeholder=" " onChange={this.onChangeHandler}/>
                        <label className="placeholder-label" htmlFor="email">Email</label>
                    </div>
                    <div className="inputBox">
                        <input name="password" type="password" id="password" placeholder=" " />
                        <label className="placeholder-label" htmlFor="password">Password</label>
                        <div className="inputBoxIcon">
                            <i className={this.state.viewPassword ? "fa fa-eye": "fa fa-facebook-f"} onClick={() => this.setState((prevState) => {
                                return {
                                    viewPassword: !prevState.viewPassword
                                }
                            })}/>
                        </div>
                    </div>
                    <button className="login-btn" onSubmit={this.submitForm}>Login</button>
                </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;