import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import moment from 'moment';
import Loader from '../layout/Loader';
import { Redirect } from 'react-router-dom';

const TrainingDetails = ({ training, auth }) => {
    if (!auth.uid) return <Redirect to="/signin" />

    if (training) {
        return (
            <div className="project-details container section">
                <div className="card">
                    <div className="card-content">
                        <span className="card-title">{training.title}</span>
                        <p>{training.content}</p>
                    </div>
                    <div className="card-action grey lighten-4 grey-text">
                        <div>Posted by {training.authorFirstName} {training.authorLastName}</div>
                        <div>{moment(training.createdAt.toDate()).calendar()}</div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <Loader />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const trainings = state.firestore.ordered.trainings;

    // Make sure that all trening were loaded before looking for specific id
    const training = trainings ? trainings.find(training => training.id === id) : null;
   
    return {
        training: training,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'trainings' }
    ])
)(TrainingDetails);