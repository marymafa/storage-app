import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import { connect } from "react-redux";
import * as action from "../redux/actions";
import jwt_decode from 'jwt-decode'
import { decode } from 'punycode';
class AllUnits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unit: [],
            selectedUnits: [],
            selectedUnit: this.props.selections,
        }
        this.RentAUnit = this.RentAUnit.bind(this);
    }
    componentDidMount() {
        axios.get("http://localhost:3002/unitsData").then(result => {
            this.setState({ unit: result.data })
        })
    }
    SelectValue = (e) => {
        const data = e.target.value
        this.props.saveSelectedVAlues(data)
    }
    async  RentAUnit() {
        var token = sessionStorage.getItem('jwt-secret');
        var decoded = jwt_decode(JSON.parse(token).token);
        console.log("token :", decoded);
        var postNewData = await axios.post('http://localhost:3002/RentAUnit', {
            customerEmail: decoded.email,
            unit_id: this.props.unit_id
        });
        this.setState({ unit: postNewData })
    }

    render() {
        console.log("props", this.props)
        return (
            <div>
                 <Link to="/" >Logout</Link>
                <h1>All units</h1>
                <div></div>
                <div className="unit">
                    <label>
                        units:
                            <select name="units" onChange={(e) => this.SelectValue(e)} >
                            <option value={0}>All units</option>
                            {this.state.unit.map(unit => <option key={unit.id} value={unit.id}>{unit.unit_name}</option>)}
                        </select>
                    </label>
                </div>
                <div>
                    <Link to="/userdetails" ><button type="button" onClick={this.RentAUnit}>Rent</button></Link>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        name: state.selectValues.name,
        selections: state.selectValues.selections,
        customer_id: state.selectValues.selections,
        unit_id: state.selectValues.selections,
        state: state
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        saveSelectedVAlues: (data) => {
            dispatch(action.saveSelect(data))
        },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllUnits);