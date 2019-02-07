import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import { connect } from "react-redux";
import * as action from "../redux/actions";

class AllLocations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allLocations: [],
            selectedLocations: [],
            selectedUnit: this.props.selections,
        }
    }
    componentDidMount() {
        axios.get("http://localhost:3002/locationData").then(result => {
            this.setState({ allLocations: result.data })
            console.log("selected", result.data);
        })

    }

    // async storeSelectedValue() {
    //     axios.get("http://localhost:3002/locationData", +"selectedValue").then(result => {
    //         this.setState({ selectedLocations: result.data })
    //         console.log("selectdVale", result.data)
    //     })
    // }

    SelectValue = (e) => {
        const data = e.target.value
        this.props.saveSelectedVAlues(data)
        console.log("this is my data", data);
    }
    render() {
        return (
            < div >
                <div>
                    <Link to="/" >Logout</Link> |
                    <Link to="/login" >login</Link>
                </div>
                <h1>All Locations</h1>
                <div className="locations">
                    <label>
                        All Locations:
                            <select name="location" onChange={(e) => this.SelectValue(e)} >
                            <option value={0}>select the location </option>
                            {this.state.allLocations.map(location => <option key={location.id} value={location.id}>{location.address}</option>
                            )
                            }

                        </select>
                    </label>
                </div>
                <div>
                    <Link to="/view_units" ><button type="button">Next</button></Link>
                </div>
            </div >
        )
    }
}
const mapStateToProps = (state) => {
    return {
        store: state.selectValues,
        selections: state.selectValues.selections,
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
)(AllLocations);