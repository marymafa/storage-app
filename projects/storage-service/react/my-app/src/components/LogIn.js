import React from "react";
import { connect } from "react-redux";
import * as action from "../redux/actions";
import axios from 'axios';
import history from '../history'
import { Redirect, Link } from 'react-router-dom';

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        }
        super(props);
        this.inputEmail = this.inputEmail.bind(this);
        this.inputPassword = this.inputPassword.bind(this);

    }
    componentDidMount() {
        sessionStorage.removeItem("jwt-secret");
        history.replace('/')
        console.log("removed", sessionStorage.removeItem('jwt-secret'))
    }
    async  postData() {


        let formInput = {
            email: this.props.email,
            password: this.props.password
        }

        let errors = this.validFormFields(formInput);
        if (errors) {
            this.props.showErros(errors)
            console.log(errors);
        }
        // var res = await axios.post('http://localhost:3002/loginData', formInput);
        if (this.isEmpty(errors)) {
            var res = await axios.post('http://localhost:3003/loginData', formInput);
            this.setState({
                redirect: true,
            })
            if (res.status === 200) {
                var obj = JSON.stringify(res.data);
                sessionStorage.setItem("jwt-secret", obj);
                sessionStorage.getItem('myData', obj);
                this.setState({
                    redirect: true,
                })
            } else {
                this.setState({ redirect: false })
            }

        }

    };

    validFormFields(data) {
        let errors = {};
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

    inputEmail(e) {
        this.props.updateEmail(e.target.value);
    };
    inputPassword(e) {
        this.props.updatePassword(e.target.value);
    };
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/viewAllBusinessLocations' />
        }
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            return this.postData();
        }
    }
    render() {
        return (
            <div >
                    <Link to="/signUp" >signup</Link>|
                    <Link to="/" >Logout</Link>|
                <h3>please fill this form</h3>
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
                <div>
                    {this.renderRedirect()}
                    <button className="registerbutton" type="button" value="Submit" onClick={() => this.postData()} >Login</button>
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        email: state.loginPage.email,
        password: state.loginPage.password,
        erros: state.registerBusinesses.errors
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateEmail: (email) => {
            dispatch(action.comfirmEmail(email))
        },
        updatePassword: (password) => {
            dispatch(action.comfirmPassword(password))
        },
        showErros: (err) => {
            dispatch(action.FieldsErros(err))
        },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogIn);