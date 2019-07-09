import { CREATE_TRAINING, CREATE_PROJECT_ERROR } from './types';

export const createTraining = (training) => async (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const response = await firestore.collection('trainings').add({
        ...training,
        authorFirstName: 'Mike',
        authorLastName: 'Foster',
        createdAt: new Date()
    });
    if (!response) {
        return dispatch({ type: CREATE_PROJECT_ERROR, payload: 'Failed to add project'})
    }
    dispatch({ type: CREATE_TRAINING, payload: response });

    // firestore.collection('trainings').add({
    //     ...training,
    //     authorFirstName: 'Mike',
    //     authorLastName: 'Foster',
    //     createdAt: new Date()
    // })
    // .then(() => dispatch({ type: CREATE_TRAINING, payload: training }))
    // .catch(err => dispatch({ type: CREATE_PROJECT_ERROR, payload: err }))
    
}