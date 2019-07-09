import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOut = () => {
    return (
        <ul className="right hide-on-med-and-down">
            <li><NavLink to="/" className="">Home</NavLink></li>
            <li><NavLink to="/" className="waves-effect waves-light btn">Sign In</NavLink></li>
            <li><NavLink to="/" className="waves-effect waves-light btn">Login</NavLink></li>
        </ul>
    )
}

export default SignedOut;