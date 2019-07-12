import { CREATE_TRAINING, CREATE_TRAINING_ERROR, DELETE_TRAINING } from '../actions/types';

const trainingReducer = (state = [], action) => {
    switch (action.type) {
        case CREATE_TRAINING:
            console.log('Training created => ', action.payload)
            return state;
        case CREATE_TRAINING_ERROR:
            console.log('Failed to create => ', action.payload);
            // const trainings = state
            return state;
        case DELETE_TRAINING:
            console.log('Training deleted');
            return state
        default:
            return state;
    }
}

export default trainingReducer;