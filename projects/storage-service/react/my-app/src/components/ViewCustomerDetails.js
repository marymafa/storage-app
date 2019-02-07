import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

export default class ViewCustomerDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            redirect: false,
        }
    }
    componentDidMount() {

        axios.get("http://localhost:3002/loginData").then(result => {
            this.setState({ users: result.data })
        })
    }
    
    removeIten() {
        sessionStorage.removeItem('jwt-secret');
    }
    render() {
        return (
            <div>
                <button type="button" value="Submit" onClick={() => this.removeIten()}><Link to="/" >Logout</Link></button>|
                <Link to="/business">register another business</Link>|
                <Link to="/availableunits">remaining units</Link>
                <h3>customer Details</h3>
                <div>
                    <thead>
                        <tr>
                            <th>Reference Number</th>
                            <th>name</th>
                            <th>location</th>
                            <th>unit</th>
                            <th>unit type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map(element => {
                            console.log("element", element)
                            return <tr name={`row-${element.id}${element.blocks_id}${element.units_type_id} ${element.customer_id} $`} key={this.state.users.indexOf(element)}>
                                <td>{element.id === "undefined" ? "" : element.id}</td>
                                <td>{element.username}</td>
                                <td>{element.address}</td>
                                <td>{element.unit_name}</td>
                                <td>{element.name}</td>
                            </tr>
                        })}
                    </tbody>
                </div>
            </div>
        )
    }
}
