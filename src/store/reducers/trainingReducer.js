import { CREATE_TRAINING, CREATE_PROJECT_ERROR } from '../actions/types';

const trainingReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_TRAINING:
      return state;
    case CREATE_PROJECT_ERROR:
      return state;
    default:
      return state;
  }
};

export default trainingReducer;
