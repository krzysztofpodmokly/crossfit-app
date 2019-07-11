import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => {
    return (
        <ul className="right">
            <li><NavLink to="/" className="">Home</NavLink></li>
            <li><NavLink to="/signup" className="waves-effect waves-light btn">Sign In</NavLink></li>
            <li><NavLink to="/signin" className="waves-effect waves-light btn">Login</NavLink></li>
        </ul>
    )
}

export default SignedOutLinks;