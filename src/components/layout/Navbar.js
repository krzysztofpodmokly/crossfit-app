import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';

const Navbar = () => {
    return (
        <nav>
            <div className="nav-wrapper grey darken-2">
                <div className="container">
                    <Link to="/" className="brand-logo">Logo</Link>
                    <SignedInLinks />
                    <SignedOutLinks />
                </div>
            </div>
        </nav>
    )
}

const mapStateToProps = (state, ownProps) => {
    console.log('NAVBAR => ', state.firebase);
    return {
        auth: state.firebase
    }
}

export default connect(mapStateToProps)(Navbar);