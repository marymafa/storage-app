import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

export default class AvailableUnits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            availableUnits: [],
            redirect: false,
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3003/unitsData").then(result => {
            this.setState({ availableUnits: result.data })
        })
    }

    removeIten() {
        sessionStorage.removeItem('jwt-secret');
    }
    render() {
        return (
            <div>
                <div>
                    <button type="button" value="Submit" onClick={() => this.removeIten()}><Link to="/" >Logout</Link></button>|
                    <Link to="/login" >login</Link>
                </div>
                <h3>Available units</h3>
                <div>
                    <thead>
                        <tr>
                            <th>Reference Number</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.availableUnits.map(element => {
                            console.log("element")
                            return <tr name={`row-${element.id}`} key={this.state.availableUnits.indexOf(element)}>
                                <td>{element.id === "undefined" ? "" : element.id}</td>
                                <td>{element.unit_name}</td>
                            </tr>
                        })}
                    </tbody>
                </div>
            </div>
        )
    }
}
