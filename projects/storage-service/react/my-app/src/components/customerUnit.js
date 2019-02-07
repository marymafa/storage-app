import React, { Component } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Redirect, Link } from 'react-router-dom';

export default class CustomerDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerDetails: [],
            redirect: false,
        }
    }

    componentDidMount() {
        var getToken = sessionStorage.getItem('jwt-secret');
        let token = JSON.parse(getToken).token
        var decodetoken = jwt.decode(token)
        console.log("decodetoken", decodetoken);
        var results = axios.get("http://localhost:3002/RentAUnit/" + decodetoken.email)
            .then(reponse => this.setState({ customerDetails: reponse.data }))
            .catch(e => console.log(e));

    }
    removeIten() {
        sessionStorage.removeItem('jwt-secret');
    }
    render() {
        console.log("customerDetails", this.state.customerDetails)
        return (
            <div>
                <button type="button" value="Submit" onClick={() => this.removeIten()} ><Link to="/" >Logout</Link></button>|
                <Link to="/view_units">Rent another unit</Link>
                <h1>you have rented</h1>
                <div>
                    <thead>
                        <tr>
                            <th>Reference Number</th>
                            <th>User name</th>
                            <th>Address</th>
                            <th>unit</th>
                            <th>unit type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.customerDetails.map(element => {
                            console.log("elementttt", this.state.customerDetails)
                            return <tr name={`row-${element.id}`} key={this.state.customerDetails.indexOf(element)}>
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