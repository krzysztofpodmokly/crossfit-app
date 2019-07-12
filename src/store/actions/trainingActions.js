import { CREATE_TRAINING, CREATE_TRAINING_ERROR, DELETE_TRAINING } from './types';

export const createTraining = (training) => async (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const profile = getState().firebase.profile; // grabbing state.firebase.profile
    const authorId = getState().firebase.auth.uid; // state.firebase.auth.uid
    const response = await firestore.collection('trainings').add({
        ...training,
        authorFirstName: profile.firstname,
        authorLastName: profile.lastname,
        authorId: authorId,
        createdAt: new Date()
    });
    if (!response) {
        return dispatch({ type: CREATE_TRAINING_ERROR, payload: 'Failed to add project'})
    }
    dispatch({ type: CREATE_TRAINING, payload: response });
}

export const removeTraining = (id) => async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const response = await firestore.collection('trainings').doc(id).delete();
    dispatch({ type: DELETE_TRAINING, payload: response })
}