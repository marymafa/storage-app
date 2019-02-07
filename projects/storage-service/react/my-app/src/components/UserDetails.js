import React from 'react';
import axios from 'axios';

export default class UserDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: [],
            redirect: false,
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3002/signUpData").then(result => {
            this.setState({ customer: result.data })
        })
    }
    render() {
        return (
            <div>
                <h1>customer Details</h1>
                <div>
                    <thead>
                        <tr>
                            <th>Reference Number</th>
                            <th>customer username</th>
                            <th>customer email</th>
                            <th>customer password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.customer.map(element => {
                            return <tr name={`row-${element.id}`} key={this.state.customer.indexOf(element)}>
                                <td>{element.id === "undefined" ? "" : element.id}</td>
                                <td>{element.username}</td>
                                <td>{element.email}</td>
                                <td>{element.password}</td>
                            </tr>
                        })}
                    </tbody>
                </div>
            </div>
        )
    }
}
