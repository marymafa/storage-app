import React from "react";
import { Redirect, Link } from 'react-router-dom';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1 className="home">Storage Service</h1>
                <Link className="homebutton" to="/businessOwnerLogin" ><button type="button">Register business</button></Link>
                <Link className="rentbutton" to="/logIn" ><button type="button">Rent units</button></Link>
            </div>
        )
    }
}


