import React from "react";
import { connect } from "react-redux";
import * as action from "../redux/actions";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class UnitTypesFrom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
        this.inputHeight = this.inputHeight.bind(this);
        this.inputLength = this.inputLength.bind(this);
        this.inputWidth = this.inputWidth.bind(this);
        this.inputName = this.inputName.bind(this);
    }

    async  postData() {
        let formInput = {
            name: this.props.name,
            length: this.props.length,
            height: this.props.height,
            width: this.props.width
        }

        let errors = this.validFormFields(formInput);
        if (errors) {
            this.props.showErros(errors)
            console.log(errors);
        }

        if (this.isEmpty(errors)) {
            var postNewData = await axios.post('http://localhost:3002/unitTypesData', formInput);
            this.setState({
                redirect: true,
            })

        }

    };

    validFormFields(data) {
        let errors = {};
        if (data.name == "") {
            errors.name = "name is required";
        }
        if (data.length == "") {
            errors.length = "length  is required";
        }
        if (data.height == "") {
            errors.height = "height  is required";
        }
        if (data.width == "") {
            errors.width = "width  is required";
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

        this.props.updateUnitTypesName(e.target.value)
    }
    inputLength(e) {
        this.props.updateUnitTypesLength(e.target.value)
    }
    inputHeight(e) {
        this.props.updateUnitTypesHeight(e.target.value)
    }
    inputWidth(e) {
        this.props.updateUnitTypesWidth(e.target.value)
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/units' />
        }
    }
    render() {
        console.log("props", this.props)
        return (
            <div >
                <h1 className="blocks">Storage Service</h1>
                <h2 className="block">Fill in the details below</h2>
                <div>
                    <label>Name</label>
                    <input data-toggle="tooltip" data-placement="top" title="name" type="text" onChange={this.inputName} />
                    <h4 style={{ color: "red" }}> {this.props.erros.name}</h4>

                </div>
                <div>
                    <label>Length</label>
                    <input data-toggle="tooltip" data-placement="top" title="Length" type="text" onChange={this.inputLength} />
                    <h4 style={{ color: "red" }}> {this.props.erros.length}</h4>

                </div>
                <div>
                    <label>Height</label>
                    <input data-toggle="tooltip" data-placement="top" title="Height" type="text" onChange={this.inputHeight} />
                    <h4 style={{ color: "red" }}> {this.props.erros.height}</h4>
                </div>
                <div>
                    <label>Width</label>
                    <input data-toggle="tooltip" data-placement="top" title="Width" type="text" onChange={this.inputWidth} />
                    <h4 style={{ color: "red" }}> {this.props.erros.width}</h4>
                </div>

                {this.renderRedirect()}
                <button className="registerbutton" onClick={() => this.postData()}>Submit</button>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.businessUnitTypes.name,
        length: state.businessUnitTypes.length,
        height: state.businessUnitTypes.height,
        width: state.businessUnitTypes.width,
        erros: state.registerBusinesses.errors
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUnitTypesName: (name) => {
            dispatch(action.saveUnitTypesName(name))
        },
        updateUnitTypesLength: (length) => {
            dispatch(action.saveUnitTypesLength(length))
        },
        updateUnitTypesHeight: (height) => {
            dispatch(action.saveUnitTypesHeight(height))
        },
        updateUnitTypesWidth: (width) => {
            dispatch(action.saveUnitTypesWidth(width))
        },
        showErros: (err) => {
            dispatch(action.FieldsErros(err))
        },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UnitTypesFrom);