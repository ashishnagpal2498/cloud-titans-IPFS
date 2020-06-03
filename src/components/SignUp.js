import React, {Component} from 'react';

class SignUp extends Component {
    state = {
        payload: {
            email: "",
            password: "",
            securityQuestion: "",
            securityAnswer: "",
            phoneNumber: "",
            imageUrl: ""
        },
        reTypePassword: "",
        securityQuestions : [
            "What is your pet name ?",
            "What was the house number and street name you lived in as a child ?",
            "What is your hobby ?",
            "In what town or city did your parents meet ?"
        ]
    };
    viewList = (event) => {
        let outerDiv = event.target.parentNode;
        let clickedDiv = event.target;
        let inputId;
        if(outerDiv.classList.value.includes("filter")) {
            let listItem = outerDiv.childNodes[1];
            listItem.classList.toggle('displayList')
        }
        else if(clickedDiv.hasAttribute('data-value')){
            let filters = JSON.parse(JSON.stringify(this.state.filters))
            let attributeValue = clickedDiv.getAttribute('data-value');
            outerDiv.parentNode.childNodes[0].childNodes[0].textContent = attributeValue;
            outerDiv.parentNode.childNodes[1].classList.remove('displayList');
            inputId = outerDiv.parentElement.parentElement.getAttribute('id');
            filters[inputId] = attributeValue;
            this.setState({filters}, ()=> {
                // Dispatch Event or call the onChangeHandler function
                // 3. Changing the value of input box by setState does not trigger onChange function of input -
                this.onChangeHandler({target: {name:inputId,id:inputId,value:attributeValue}})
            })
        }
    }
    render() {
        return (
            <div>
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
                    <div className="inputBox">
                        <input type="password" name="reTypePassword" id="reTypePassword" placeholder=" " onChange={this.onChangeHandler}/>
                        <label className="placeholder-label" htmlFor="email">Email</label>
                    </div>
                    <div className="filter-wrapper" id="rating">
                        {/*Custom select option no need of input box*/}
                        <label htmlFor={"rating"}>Rating</label>
                        <div className="filter" onClick={this.viewList}>
                            <div className="filter-value-wrapper" >
                                <span className="filter-value">All</span>
                                <span className="filter-icon"><i className="fa fa-chevron-down"/> </span>
                            </div>
                            <ul className="optionList">
                                <li data-value="all">All</li>
                                {this.state.securityQuestions.map((item,index)=> {
                                    return <li data-value={item} key={index}>{item}</li>
                                })}
                            </ul>
                        </div>
                    </div>

                    <button className="login-btn" onSubmit={this.submitForm}>Login</button>
                </form>
            </div>
        );
    }
}

export default SignUp;