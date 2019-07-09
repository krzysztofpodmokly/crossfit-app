import { CREATE_TRAINING, CREATE_PROJECT_ERROR } from '../actions/types';

// const initState = {
//     allTrainings: [
//         {id: 1, title: 'Grace', content: 'cool training', img: 'https://images.unsplash.com/photo-1533681904393-9ab6eee7e408?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'},
//         {id: 2, title: 'Fran', content: 'tough shit', img: 'https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80'},
//         {id: 3, title: 'Murph', content: 'extremly hard', img: 'https://images.unsplash.com/photo-1517964603305-11c0f6f66012?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80'}
//     ]
// }

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