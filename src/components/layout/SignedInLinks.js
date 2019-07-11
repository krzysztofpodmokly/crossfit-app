import React from 'react';
import { NavLink } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { signOut } from '../../store/actions/authActions';

const SignedInLinks = ({ signOut, firebase, profile }) => {
    return (
        <ul className="right">
            <li><NavLink to="/create" className="">New Training</NavLink></li>
            <li><NavLink to="/" className="waves-effect waves-light btn" onClick={() => signOut(firebase)}>Log Out</NavLink></li>
            <li><NavLink to="/" className="btn btn-floating red lighten-1">{profile.initials}</NavLink></li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: (firebase) => dispatch(signOut(firebase))
    }
}

export default compose(
    firebaseConnect(),
    connect(null, mapDispatchToProps)
)(SignedInLinks);