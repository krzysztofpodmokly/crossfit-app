import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.css';
import App from './components/App';
import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './store/reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { createFirestoreInstance, reduxFirestore, getFirestore } from 'redux-firestore'
import { ReactReduxFirebaseProvider, getFirebase} from 'react-redux-firebase'

import firebase from './config/fbConfig';
  
const store = createStore(reducers, 
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
        reduxFirestore(firebase)
    )
);

const rrfConfig = {
    useFirestoreForProfile: true, // firebase reducer syncs state with firebase profile
    userProfile: 'users', // indicate the collection name from which profile is fetched
    attachAuthIsReady: true // property used for syncing user status => logged in or logged out
}

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
}

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <App />
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root')
);

// console.log('STORE => ', store);
// console.log('STATE => ', store.getState());