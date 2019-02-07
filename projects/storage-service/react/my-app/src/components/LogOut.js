
import React from 'react';
import history from '../history';

export default class LogOut extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        sessionStorage.removeItem('jwt-secret');
        history.replace('/')
        console.log("removed",   sessionStorage.removeItem('jwt-secret'))
    }
    render() {
        return (
            <div>{'djidjaaiia9'}</div>
        )
    }

}