import React from "react";
import { connect } from "react-redux";
import * as action from "../redux/actions";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class UnitsFrom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        }
        this.inputName = this.inputName.bind(this);
    }
    async  postData() {

        let formInput = {
            unit_name: this.props.unit_name,
            blocks_id: this.props.blocks_id,
            units_type_id: this.props.units_type_id,
        }

        let errors = this.validFormFields(formInput);
        if (errors) {
            this.props.showErros(errors)
            console.log(errors);
        }

        if (this.isEmpty(errors)) {
            var postNewData = await axios.post('http://localhost:3002/unitsData', formInput);
            this.setState({
                redirect: true,
            })

        }

    }
    validFormFields(data) {
        let errors = {};
        if (data.unit_name == "") {
            errors.unit_name = "unit_name is required";
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
    inputName(e) {
        this.props.updateBlockName(e.target.value)
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/view_business' />
        }
    }
    render() {
        console.log("units props", this.props.units_type_id);

        return (
            <div>
                <h1 className="blocks">Storage Service</h1>
                <h2 className="block">please fill this form</h2>
                <div>
                    <label>Units</label>
                    <input data-toggle="tooltip" data-placement="top" title="units" type="text" onChange={this.inputName} />
                    <h4 style={{ color: "red" }}> {this.props.erros.unit_name}</h4>
                </div>
                {this.renderRedirect()}
                <button className="registerbutton" onClick={() => this.postData()}>Submit</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        unit_name: state.businessUnits.unit_name,
        blocks_id: state.selectValues.selections,
        units_type_id: state.selectValues.selections,
        erros: state.registerBusinesses.errors
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateBlockName: (name) => {
            dispatch(action.saveUnits(name))
        },
        showErros: (err) => {
            dispatch(action.FieldsErros(err))
        },
    }

}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UnitsFrom);