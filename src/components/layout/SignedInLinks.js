import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedIn = () => {
    return (
        <ul className="right hide-on-med-and-down">
            <li><NavLink to="/" className="">New Training</NavLink></li>
            <li><NavLink to="/" className="waves-effect waves-light btn">Log Out</NavLink></li>
            <li><NavLink to="/" className="btn btn-floating red lighten-1">NN</NavLink></li>
        </ul>
    )
}

export default SignedIn;