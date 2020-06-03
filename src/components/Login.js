import React, {Component} from 'react';
import '../css/login.css'
import axios from 'axios'
class Login extends Component {
    state = {
        payload: {
            email: "",
            password: "",
        },
        emailError: "",
        passwordError: "",
        viewPassword: false
    };
    componentWillMount() {
        axios.get('http://localhost:2222/login').then((result)=>{
            console.log(result);
        }).catch((err)=>{
            console.log('Error', err.response);
        })
    }

    onChangeHandler = (event)=> {
        let payload = JSON.parse(JSON.stringify(this.state.payload))
        let emailError = "";
        let passwordError = "";
        payload[event.target.name] = event.target.value
        if(event.target.name === "email" && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value))){
            emailError = "Invalid Email Address"
        }
        else if(event.target.name === "password" && !(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/).test(event.target.value))
        {
            passwordError = "Password should match the criteria"
        }
        this.setState({
            payload,emailError,passwordError
        })
    };
    submitForm = (e) => {
      e.preventDefault();
      if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.payload.email))){
            this.setState({
                emailError: "Invalid Email Address"
            })
          return;
      }
      // else if(!(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/).test(this.state.payload.password)) {
      //     this.setState({
      //         passwordError : "Password should match the criteria"
      //     });
      //     return;
      // }
      axios.post('http://localhost:2222/login',this.state.payload).then((user) => {
          console.log('result',user);
          let userId = user.data.result._id;
          console.log(userId)
          this.props.history.push(`/user/${userId}`,{userId});
      }).catch((err) => console.error('err',err));
    };
    render() {
        return (
            <div className="login-outer">
                <div className="page-division">
                <div className="background-container"/>
                <div className="details-container">
                    <h2>Welcome To IPFS-React</h2>
                    <form className="form-container" method={"POST"}>
                        <div className="error-message">Invalid Email or Password</div>
                    <div className="inputBox">
                        <input type="email" name="email" id="email" placeholder=" " onChange={this.onChangeHandler}/>
                        <label className="placeholder-label" htmlFor="email">Email</label>
                        {this.state.emailError &&  <span className="input-error-message"><i className="fa fa-exclamation-triangle"/> {this.state.emailError}</span> }
                    </div>
                    <div className="inputBox">
                        <input name="password" type={this.state.viewPassword ? "text" :"password"} id="password" placeholder=" " onChange={this.onChangeHandler} />
                        <label className="placeholder-label" htmlFor="password">Password</label>
                        <div className="inputBoxIcon">
                            <i className={this.state.viewPassword ? "fa fa-eye": "fa fa-facebook-f"} onClick={() => this.setState((prevState) => {
                                return {
                                    viewPassword: !prevState.viewPassword
                                }
                            })}/>
                        </div>
                        {this.state.passwordError &&  <span className="input-error-message"><i className="fa fa-exclamation"/> {this.state.passwordError}</span> }
                    </div>
                    <button type="button" className="btn login-btn" onClick={this.submitForm}>Login</button>
                </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;