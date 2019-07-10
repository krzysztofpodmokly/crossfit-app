import { LOGIN_SUCCESS, LOGIN_ERROR, SIGNOUT_SUCCESS, SIGNUP_SUCCESS, SIGNUP_ERROR } from './types';
// import firebase from '../../config/fbConfig';

export const signIn = ({credentials, firebase}) => (dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password
    ).then(() => {
        dispatch({ type: LOGIN_SUCCESS })
    }).catch(err => {
        dispatch({ type: LOGIN_ERROR, payload: err })
    });
}

export const signOut = (firebase) => (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
        dispatch({ type: SIGNOUT_SUCCESS })
    })
}

export const registerAccount = (newUser, firebase) => (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password
    ).then(response => {
        console.log('USER CREATE - RESPONSE => ', response)
        return firestore.collection('users').doc(response.user.uid)
            .set({
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                initials: `${newUser.firstname.charAt(0)}${newUser.lastname.charAt(0)}`
            })
    }).then(() => {
        dispatch({ type: SIGNUP_SUCCESS })
    }).catch(err => {
        dispatch({ type: SIGNUP_ERROR, payload: err })
    })
    
}