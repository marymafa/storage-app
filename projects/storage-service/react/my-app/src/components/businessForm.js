import React from "react";
import { connect } from "react-redux";
import * as action from "../redux/actions";
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { stringify } from "querystring";

class BusinessFrom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        }
        this.inputBusinessName = this.inputBusinessName.bind(this);
        this.inputContactName = this.inputContactName.bind(this);
        this.inputContactEmail = this.inputContactEmail.bind(this);
        this.inputContactNumber = this.inputContactNumber.bind(this);
    }


    validFormFields(data) {
        let errors = {};
        if (data.contact_email == "") {
            errors.contact_email = "email is required";
        }
        if (data.contact_name == "") {
            errors.contact_name = "contact name is required";
        }

        if (data.business_name == "") {
            errors.business_name = "name is required";
        }

        if (data.contact_number == "") {
            errors.contact_number = "contact nember is required";
        }

        this.props.showErros(errors)
        return errors;
    }

    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    async  postData() {

        let formInput = {
            business_name: this.props.business_name,
            contact_name: this.props.contact_name,
            contact_email: this.props.contact_email,
            contact_number: this.props.contact_number
        }

        let errors = this.validFormFields(formInput);
        if (errors) {
            this.props.showErros(errors)
            console.log(errors);
            // return
        }

        if (this.isEmpty(errors)) {
            var postNewData = await axios.post('http://localhost:3002/data', formInput);
            this.setState({
                redirect: true,
            })

        }
    }
    inputBusinessName(e) {
        this.props.updateName(e.target.value)
    }
    inputContactName(e) {
        this.props.updateContactName(e.target.value)
    }
    inputContactEmail(e) {
        this.props.updateContactEmail(e.target.value)
    }
    inputContactNumber(e) {
        this.props.updateContactNumber(e.target.value)
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/view_all_businesses' />
        }
    }
    render() {
        console.log("this.props.erros", this.props.erros)
        return (
            <div style={{
                position: 'absolute', left: '50%', top: '20%',
                transform: 'translate(-22%, -22%)'
            }}>
                <div className="link">
                    <Link to="/businessOwnerLogin" >login</Link>|
                <Link to="/" >Logout</Link>|
                <Link to="/viewCustomerDetails" >view customer details</Link>
                </div>
                <h2 className="heading"> Register your business to get started </h2>
                <div>
                    <label className="label">Name</label>
                    <input value={this.props.business_name} type="text" data-toggle="tooltip" data-placement="top" title="name" placeholder="enter business name ('e.g thecodingground')" onChange={(e) => { this.inputBusinessName(e) }}
                    />
                    <h4 style={{ color: "red" }}> {this.props.erros.business_name}</h4>
                </div>
                <div>
                    <label>Contact Name</label>
                    <input
                        ref="contact_name"
                        type="text"
                        value={this.props.contact_name}
                        data-toggle="tooltip"
                        data-placement="top"
                        title=" contact name"
                        placeholder="enter  contact name('e.g mary')"

                        onChange={(e) => { this.inputContactName(e) }}
                    />
                    <h4 style={{ color: "red" }}> {this.props.erros.contact_name}</h4>
                </div>
                <div>
                    <label>Contact Email</label>
                    <input
                        ref="email"
                        type="text"
                        value={this.props.email}
                        data-toggle="tooltip"
                        data-placement="top"
                        title=" contact email"
                        placeholder="enter  contact email ('e.g example@gmail.com')"

                        onChange={(e) => { this.inputContactEmail(e) }}
                    />
                    <h4 style={{ color: "red" }}> {this.props.erros.contact_email}</h4>

                </div>
                <div>
                    <label>Contact Number</label>
                    <input
                        ref="contact_number"
                        type="tel"
                        data-toggle="tooltip"
                        value={this.props.contact_number}
                        data-placement="top"
                        title=" contact number"
                        placeholder="enter   contact number ('e.g 098 765 1234')"

                        onChange={(e) => { this.inputContactNumber(e) }}

                    />
                    <h4 style={{ color: "red" }}> {this.props.erros.contact_number}</h4>

                </div>
                <div>
                    {this.renderRedirect()}
                    <button className="registerbutton" onClick={(e) => this.postData()}>Register</button>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        business_name: state.registerBusinesses.business_name,
        contact_name: state.registerBusinesses.contact_name,
        contact_email: state.registerBusinesses.contact_email,
        contact_number: state.registerBusinesses.contact_number,
        erros: state.registerBusinesses.errors
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateName: (name) => {
            dispatch(action.saveName(name))
        },
        updateContactName: (contact_name) => {
            dispatch(action.saveContactName(contact_name))
        },
        updateContactEmail: (email) => {
            dispatch(action.saveContactEmail(email))
        },
        updateContactNumber: (number) => {
            dispatch(action.saveContactNumber(number))
        },
        showErros: (err) => {
            dispatch(action.FieldsErros(err))
        },
        submitNewData: (newData) => {
            dispatch(action.onSubmit(newData))
        },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BusinessFrom);