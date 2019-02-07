import React, { Component } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Redirect, Link } from 'react-router-dom';

export default class BusinessOwnerDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            busOwnerDetails: [],
            redirect: false,
        }
    }

    componentDidMount() {
        var getToken = sessionStorage.getItem('jwt-secret');
        let token = JSON.parse(getToken).token
        var decodetoken = jwt.decode(token)
        console.log("decodetoken", decodetoken);
        var results = axios.get("http://localhost:3002/RentAUnit/" + decodetoken.email)
            .then(reponse => this.setState({ busOwnerDetails: reponse.data }))
            .catch(e => console.log(e));

    }
    removeIten() {
        sessionStorage.removeItem('jwt-secret');
    }
    render() {
        console.log("busOwnerDetails", this.state.busOwnerDetails)
        return (
            <div>
                <button type="button" value="Submit" onClick={() => this.removeIten()} ><Link to="/" >Logout</Link></button>|
                <Link to="/business">Register another business</Link>
                <h1>information</h1>
                <div>
                    <thead>
                        <tr>
                            <th>Reference Number</th>
                            <th>Business name</th>
                            <th>Location</th>
                            <th>block</th>
                            <th>unit type</th>
                            <th>unit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.busOwnerDetails.map(element => {
                            console.log("elementttt", this.state.busOwnerDetails)
                            return <tr name={`row-${element.id}`} key={this.state.busOwnerDetails.indexOf(element)}>
                                <td>{element.id === "undefined" ? "" : element.id}</td>
                                <td>{element.name}</td>
                                <td>{element.address}</td>
                                <td>{element.block}</td>
                                <td>{element.name}</td>
                                <td>{element.unit_name}</td>
                            </tr>
                        })}
                    </tbody>
                </div>
            </div>
        )
    }
}