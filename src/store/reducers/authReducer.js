import { LOGIN_ERROR, LOGIN_SUCCESS, SIGNOUT_SUCCESS, SIGNUP_SUCCESS, SIGNUP_ERROR } from '../actions/types';

const initState = {
    authError: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case LOGIN_ERROR:
            console.log('Login Failed');
            return {
                ...state,
                authError: action.payload.message,
            };
        case LOGIN_SUCCESS:
            console.log('Login Successful');
            return {
                ...state,
                authError: null,
            };
        case SIGNOUT_SUCCESS:
            console.log('Signout was Successful!');
            return state;
        case SIGNUP_SUCCESS:
            console.log('Account was Created!')
            return {
                ...state,
                authError: null
            };
        case SIGNUP_ERROR:
            console.log('Problems with Creating Account');
            return {
                ...state,
                authError: action.payload.message
            };
        default:
            return state;
    }
}

export default authReducer;