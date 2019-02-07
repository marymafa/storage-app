import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import * as action from "../redux/actions";

class AllBusinesses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            business: [],
            selectedBusiness: this.props.selections,
            redirect: false,
        }
        this.redirectData = this.redirectData.bind(this)
    }
    componentDidMount() {
        axios.get("http://localhost:3002/data").then(result => {
            this.setState({ business: result.data })
        })

    }
    SelectValue = (e) => {
        let data = {}
        data = e.target.value
        this.props.saveSelectedVAlues(data)
        console.log("data", data);

    }
    redirectData() {
        this.setState({
            redirect: true,
        })
    }
    render() {
        console.log("state", this.state.business)
        if (this.state.redirect) {
            return <Redirect to='/locations' />
        }
        return (
            <div>
                <h1>All businesses</h1>
                <div className="busid">
                    <label>
                        Business:
                            <select name="selectid" onChange={(e) => this.SelectValue(e)} >
                            <option value={0}>All businesses</option>
                            {this.state.business.map(business => <option key={business.id} value={business.id}>{business.business_name}</option>)}
                        </select>
                    </label>
                </div>
                <div>
                    <button onClick={this.redirectData} >Next</button>
                </div>
            </div>
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
)(AllBusinesses);