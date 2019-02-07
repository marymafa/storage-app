import React, { Component } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Redirect, Link } from 'react-router-dom';

export default class viewData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            business: [],
            redirect: false,
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3002/data").then(result => {
            this.setState({ business: result.data })
        })
    }
    removeIten() {
        sessionStorage.removeItem('jwt-secret');
    }
    render() {
        console.log("state", this.state);
        return (
            <div>
                <button type="button" value="Submit" onClick={() => this.removeIten()} ><Link to="/" >Logout</Link></button>|
                <h1>Business Details</h1>
                <div>
                    <thead>
                        <tr>
                            <th>Reference Number</th>
                            <th>business name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.business.map(element => {
                            return <tr name={`row-${element.id}`} key={this.state.business.indexOf(element)}>
                                <td>{element.id === "undefined" ? "" : element.id}</td>
                                <td>{element.business_name}</td>
                            </tr>
                        })}
                    </tbody>
                </div>
            </div>
        )
    }
}
