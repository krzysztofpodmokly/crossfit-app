import { combineReducers } from 'redux';
import authReducer from './authReducer';
import trainingReducer from './trainingReducer';
import { firestoreReducer } from 'redux-firestore'; // syncing firestore (database) data with our state in the background
import { firebaseReducer } from 'react-redux-firebase'; // syncing auth status

export default combineReducers({
    auth: authReducer,
    trainings: trainingReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})