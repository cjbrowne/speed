import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Dashboard extends Component {
    render() {
        return (
         <div className="Dashboard">
            <Link to="/car/new">Create Car</Link>
         </div>   
        );
    }
}