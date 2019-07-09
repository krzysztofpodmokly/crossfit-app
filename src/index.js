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
import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';
  
const config = {
    apiKey: "AIzaSyBAgx5wL3E8JvK-w3tVeVsebPVNNmPNzk4",
    authDomain: "crossfit-app-21267.firebaseapp.com",
    databaseURL: "https://crossfit-app-21267.firebaseio.com",
    projectId: "crossfit-app-21267",    
    storageBucket: "",
    messagingSenderId: "224515205858",
    appId: "1:224515205858:web:a81ab1f00b2312f1"
  };

firebase.initializeApp(config);
  
const store = createStore(reducers, 
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
        reduxFirestore(firebase)
    )
);

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance // needed if using firestore
}

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <App />
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root')
);

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './components/App';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import reducers from './store/reducers';
// import { createFirestoreInstance, reduxFirestore, getFirestore } from 'redux-firestore';
// import { ReactReduxFirebaseProvider, reactReduxFirebase, getFirebase } from 'react-redux-firebase';
// import fbConfig from './config/fbConfig';
// import firebase from 'firebase/app';

// firebase.initializeApp(fbConfig);

// const store = createStore(reducers, 
//     compose(
//         applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
//         reduxFirestore(firebase),
//         reactReduxFirebase(firebase, fbConfig)
//     )
// );

// const rrfProps = {
//     config: fbConfig,
//     dispatch: store.dispatch,
//     createFirestoreInstance
// }

// ReactDOM.render(
//     <Provider store={store}>
//         <ReactReduxFirebaseProvider {...rrfProps} >
//             <App />
//         </ReactReduxFirebaseProvider>
//     </Provider>,
//     document.getElementById('root')
// );