import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';


const Navbar = ({ auth, profile }) => {
    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;

    // makes sure that proper auth status is fetched before showing links
    const isLoadedContent = isLoaded(auth) ? links : '';

    return (
        <nav>
            <div className="nav-wrapper grey darken-2">
                <div className="container">
                    <Link to="/" className="brand-logo">Logo</Link>
                    { isLoadedContent }                    
                </div>
            </div>
        </nav>
    )
}

const mapStateToProps = (state, ownProps) => {
    
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile // available due to rrfConfig object in index.js
    }
}


export default compose(
    firebaseConnect(),
    connect(mapStateToProps)
)(Navbar);