import { CREATE_TRAINING, CREATE_PROJECT_ERROR } from './types';

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
        return dispatch({ type: CREATE_PROJECT_ERROR, payload: 'Failed to add project'})
    }
    dispatch({ type: CREATE_TRAINING, payload: response });
}