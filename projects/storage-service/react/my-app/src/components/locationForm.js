import React from "react";
import { connect } from "react-redux";
import * as action from "../redux/actions";
import { Redirect } from 'react-router-dom';
import axios from "axios";
import { log } from "util";

class LocationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        }
    }
    async  postData() {

        let formInput = {
            address: this.props.address,
            country: this.props.country,
            businesses_id: this.props.businesses_id,
        }

        let errors = this.validFormFields(formInput);
        if (errors) {
            this.props.showErros(errors)
            console.log(errors);
        }

        if (this.isEmpty(errors)) {
            var postNewData = await axios.post('http://localhost:3002/locationData', formInput);
            this.setState({
                redirect: true,
            })

        }
    }
    validFormFields(data) {
        let errors = {};
        if (data.address == "") {
            errors.address = "address is required";
        }
        if (data.country == "") {
            errors.country = "country  is required";
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

    inputAddress(e) {
        this.props.updateAddress(e.target.value);
    }
    inputBusinessCountry(e) {
        this.props.updateCountry(e.target.value);
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/blocks' />
        }
    }
    render() {
        return (
            <div>
                <h1 className="blocks">Storage Service</h1>
                <h2 className="block"> Please fill in this form </h2>
                <div>
                    <label>Address</label>
                    <input data-toggle="tooltip" data-placement="top" title=" address" placeholder="bendor street polokwane 0112" type="text" onChange={this.inputAddress.bind(this)} />
                    <h4 style={{ color: "red" }}> {this.props.erros.address}</h4>

                </div>
                <div>
                    <label>County</label>
                    <input data-toggle="tooltip" data-placement="top" title=" country" placeholder="South Africa" type="text" onChange={this.inputBusinessCountry.bind(this)} />
                    <h4 style={{ color: "red" }}> {this.props.erros.country}</h4>
                </div>
                {this.renderRedirect()}
                <button className="registerbutton" onClick={() => this.postData()}>Submit</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        address: state.businessLocations.address,
        country: state.businessLocations.country,
        businesses_id: state.selectValues.selections,
        erros: state.registerBusinesses.errors
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateAddress: (address) => {
            dispatch(action.businessLocation(address))
        },
        updateCountry: (country) => {
            dispatch(action.countryOfTheBusiness(country))
        },
        updateBusinessID: (businesid) => {
            dispatch(action.businessId(businesid))
        },
        showErros: (err) => {
            dispatch(action.FieldsErros(err))
        },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocationForm);