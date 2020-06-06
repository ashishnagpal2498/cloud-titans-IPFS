import React, {Component} from 'react';
import axios from "axios";

class SignUp extends Component {
    state = {
        payload: {
            email: "",
            password: "",
            securityQuestion: "",
            securityAnswer: "",
            phoneNumber: "",
            imageUrl: "",
            name: "",
            place: "",
        },
        viewPassword: false,
        reTypePassword: "",
        securityQuestions : [
            "What is your pet name ?",
            "What was the house number and street name you lived in as a child ?",
            "What is your hobby ?",
            "In what town or city did your parents meet ?"
        ],
        emailError: "",
        passwordError: "",
        passwordReTypeError: "",
        securityQuestionError: "",
        securityAnswerError: "",
        fileError : ""
    };
    onChangeHandler = (event) => {
        let payload = JSON.parse(JSON.stringify(this.state.payload));
        let emailError = "";
        let passwordError = "";
        let passwordReTypeError = "";
        payload[event.target.name] = event.target.value
        if(event.target.name === "email" && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value))){
            emailError = "Invalid Email Address"
        }
        else if(event.target.name === "password" && !(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/).test(event.target.value))
        {
            passwordError = "Password should match the criteria"
        }
        else if(event.target.name === "reTypePassword" && event.target.value !== payload.password){
                passwordReTypeError = "Password does not match"
        }

        this.setState({
            payload,emailError,passwordError,passwordReTypeError
        })
    };
    submitForm = (e) => {
        e.preventDefault();
        console.log('Submit form')
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.payload.email))){
            this.setState({
                emailError: "Invalid Email Address"
            })
            return;
        }
        else if(!(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/).test(this.state.payload.password)) {
            this.setState({
                passwordError : "Password should match the criteria"
            });
            return;
        }
        else if(this.state.payload.reTypePassword !== this.state.payload.password){
            this.setState({
                passwordReTypeError: "Password does not match"
            })
            return;
        }
        else if(this.state.payload.securityQuestion === "" || this.state.payload.securityQuestion === "none")
        {
            this.setState({
                securityQuestionError: "Select atleast 1"
            })
            return;
        }
        else if(this.state.payload.securityAnswer === ""){
            this.setState({
                securityAnswerError: "This field cannot be empty"
            })
            return;
        }
        else if(this.state.payload.imageUrl === "")
        {
            this.setState({
                imageUrl: "Upload a File"
            })
            return;
        }
        axios.post('http://localhost:2222/signup',this.state.payload).then((user) => {
            console.log('result',user);
            this.props.history.push('/login');
        }).catch((err) => console.error('err',err));
    };
    uploadFile = (e) => {
        let payload = JSON.parse(JSON.stringify(this.state.payload))
        if(e.target.files[0])
        {   payload["imageUrl"] = URL.createObjectURL(e.target.files[0])
            this.setState({
                payload
            })
        }
        else{
            this.setState({
                fileError: "Upload a file"
            })
        }
    }
    viewList = (event) => {
        let outerDiv = event.target.parentNode;
        let clickedDiv = event.target;
        let inputId;
        if(outerDiv.classList.value.includes("filter")) {
            let listItem = outerDiv.childNodes[1];
            listItem.classList.toggle('displayList')
        }
        else if(clickedDiv.hasAttribute('data-value')){
            let attributeValue = clickedDiv.getAttribute('data-value');
            outerDiv.parentNode.childNodes[0].childNodes[0].textContent = attributeValue;
            outerDiv.parentNode.childNodes[1].classList.remove('displayList');
            inputId = outerDiv.parentElement.parentElement.getAttribute('id');
                // Dispatch Event or call the onChangeHandler function
                // 3. Changing the value of input box by setState does not trigger onChange function of input -
                this.onChangeHandler({target: {name:inputId,id:inputId,value:attributeValue}})
        }
    }
    render() {
        return (
            <div className="signup-container">
                <form className="form-container" method="post">
                    <h2 className={"heading"}>Sign Up Form</h2>
                    <div className="inputBox">
                        <input type="email" name="email" id="email" placeholder=" " onChange={this.onChangeHandler}/>
                        <label className="placeholder-label" htmlFor="email">Email</label>
                        {this.state.emailError &&  <span className="input-error-message"><i className="fa fa-exclamation-triangle"/> {this.state.emailError}</span> }

                    </div>
                    <div className="inputBox">
                        {this.state.passwordError &&  <span className="input-error-message"><i className="fa fa-exclamation-triangle"/> {this.state.passwordError}</span> }

                        <input name="password" type={this.state.viewPassword ? "text" :"password"} id="password" placeholder=" " onChange={this.onChangeHandler}/>
                        <label className="placeholder-label" htmlFor="password">Password</label>
                        <div className="inputBoxIcon">
                            <i className={this.state.viewPassword ? "fa fa-eye-slash": "fa fa-eye"} onClick={() => this.setState((prevState) => {
                                return {
                                    viewPassword: !prevState.viewPassword
                                }
                            })}/>
                        </div>
                    </div>
                    <div className="inputBox">
                        {this.state.passwordReTypeError &&  <span className="input-error-message"><i className="fa fa-exclamation-triangle"/> {this.state.passwordReTypeError}</span> }
                        <input type="password" name="reTypePassword" id="reTypePassword" placeholder=" " onChange={this.onChangeHandler}/>
                        <label className="placeholder-label" htmlFor="reTypePassword">Re-Type Password</label>
                    </div>
                    <div className="form-input">
                        <div className="inputBox">
                            <input type="text" name="name" id="name" placeholder=" " onChange={this.onChangeHandler}/>
                            <label className="placeholder-label" htmlFor="name">Name</label>
                        </div>
                        <div className="inputBox">
                            <input type="text" name="place" id="place" placeholder=" " onChange={this.onChangeHandler}/>
                            <label className="placeholder-label" htmlFor="fileUrl">Place</label>
                        </div>
                    </div>
                    <div className="form-input">
                        <div className="inputBox">
                            <input type="number" name="phoneNumber" id="phoneNumber" placeholder=" " onChange={this.onChangeHandler}/>
                            <label className="placeholder-label" htmlFor="phoneNumber">Phone Number</label>
                        </div>
                        <div className="inputBox">
                            {this.state.fileError &&  <span className="input-error-message"><i className="fa fa-exclamation-triangle"/> {this.state.fileError}</span> }
                            <input type="file" name="fileUrl" id="fileUrl" placeholder=" " onChange={this.uploadFile}/>
                            <label className="placeholder-label" htmlFor="fileUrl">File</label>
                        </div>
                    </div>
                    <div className="filter-wrapper" id="securityQuestion">
                        {/*Custom select option no need of input box*/}
                        <label htmlFor={"securityQuestion"}>Security Question</label>
                        <div className="filter" onClick={this.viewList}>
                            <div className="filter-value-wrapper" >
                                <span className="filter-value">None</span>
                                <span className="filter-icon"><i className="fa fa-chevron-down"/> </span>
                            </div>
                            <ul className="optionList">
                                <li data-value="none">None</li>
                                {this.state.securityQuestions.map((item,index)=> {
                                    return <li data-value={item} key={index}>{item}</li>
                                })}
                            </ul>
                        </div>
                        {this.state.securityQuestionError &&  <span className="input-error-message"><i className="fa fa-exclamation-triangle"/> {this.state.securityQuestionError}</span> }
                    </div>
                    <div className="inputBox">
                        <input type="text" name="securityAnswer" id="securityAnswer" placeholder=" " onChange={this.onChangeHandler}/>
                        <label className="placeholder-label" htmlFor="securityAnswer">Security Answer</label>
                        {this.state.securityAnswerError &&  <span className="input-error-message"><i className="fa fa-exclamation-triangle"/> {this.state.securityAnswerError}</span> }
                    </div>
                    <button type="button" className="btn login-btn" onClick={this.submitForm}>Sign Up</button>
                </form>
            </div>
        );
    }
}

export default SignUp;