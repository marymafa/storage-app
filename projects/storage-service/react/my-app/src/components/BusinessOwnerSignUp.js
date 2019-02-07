import React from "react";
import { connect } from "react-redux";
import * as action from "../redux/actions";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom";
import passport from "passport";

class BusinessOwnerSignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
        super(props);
        this.inputusername = this.inputusername.bind(this);
        this.inputEmail = this.inputEmail.bind(this);
        this.inputPassword = this.inputPassword.bind(this);
    }
    async  postData() {
        let formInput = {
            username: this.props.username,
            email: this.props.email,
            password: this.props.password,
        }

        let errors = this.validFormFields(formInput);
        if (errors) {
            this.props.showErros(errors)
            console.log(errors);
        }
        if (this.isEmpty(errors)) {
            var postNewData = await axios.post('http://localhost:3002/signUpData', formInput);
            this.setState({
                redirect: true,
            })

            var obj = JSON.stringify(postNewData.data);
            console.log("this is my res", this.postData)
            sessionStorage.setItem("jwt-secret", obj);
            sessionStorage.getItem('myData', obj);
            console.log("obj", obj);
            this.setState({
                redirect: true
            })
        }
    };

    validFormFields(data) {
        let errors = {};
        if (data.username == "") {
            errors.username = "username is required";
        }

        if (data.email == "") {
            errors.email = "email is required";
        }

        if (data.password == "") {
            errors.password = "password is required"
        }

        this.props.showErros(errors)
        return errors;
    };
    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    };
    inputusername(e) {
        this.props.updateusername(e.target.value);
    };
    inputEmail(e) {
        this.props.updateEmail(e.target.value);
    };
    inputPassword(e) {
        this.props.updatePassword(e.target.value);
    };
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/businessOwnerLogin' />
        }
    }
    removeIten() {
        sessionStorage.removeItem('jwt-secret');
    }
    render() {
        return (
            <div>
                <div className="link">
                    <button type="button" value="Submit" onClick={() => this.removeIten()}><Link to="/" >Logout</Link></button>|
                    <Link to="/businessOwnerLogin">login</Link>
                </div>
                <h3>please fill this form</h3>
                <div>
                    <label>username</label>
                    <input type="text" name="username" onChange={this.inputusername} />
                    <h4 style={{ color: "red" }}> {this.props.erros.username}</h4>

                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" onChange={this.inputEmail} />
                    <h4 style={{ color: "red" }}> {this.props.erros.email}</h4>

                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" onChange={this.inputPassword} />
                    <h4 style={{ color: "red" }}> {this.props.erros.password}</h4>

                </div>
                <div className="register">
                    {this.renderRedirect()}
                    <button  className="registerbutton" type="button" value="Submit" onClick={() => this.postData()} >Register</button>
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        username: state.signUpPage.username,
        email: state.signUpPage.email,
        password: state.signUpPage.password,
        erros: state.registerBusinesses.errors

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateusername: (username) => {
            dispatch(action.saveusername(username))
        },
        updateEmail: (email) => {
            dispatch(action.saveEmail(email))
        },
        updatePassword: (password) => {
            dispatch(action.savePassWord(password))
        },
        showErros: (err) => {
            dispatch(action.FieldsErros(err))
        },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BusinessOwnerSignUp);