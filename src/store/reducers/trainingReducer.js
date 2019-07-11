import { CREATE_TRAINING, CREATE_PROJECT_ERROR } from '../actions/types';

const trainingReducer = (state = [], action) => {
    switch (action.type) {
        case CREATE_TRAINING:
            console.log('Project created => ', action.payload)
            return state;
        case CREATE_PROJECT_ERROR:
            console.log('Failed to create => ', action.payload);
            return state;
        default:
            return state;
    }
}

export default trainingReducer;