import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import moment from 'moment';

const TrainingDetails = ({ training }) => {
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
            <div className="container center spinner">
                <div className="preloader-wrapper big active">
                    <div className="spinner-layer spinner-white-only">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div>
                        <div className="gap-patch">
                            <div className="circle"></div>
                        </div>
                        <div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const trainings = state.firestore.ordered.trainings;

    // Make sure that all trening were loaded before looking for specific id
    const training = trainings ? trainings.find(training => training.id === id) : null;
    
    // const trainings = state.firestore.data.trainings;
    // console.log(allTrainings.map(training => console.log(training)))
    // const training = trainings ? trainings[id] : null
    return {
        training: training
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'trainings' }
    ])
)(TrainingDetails);