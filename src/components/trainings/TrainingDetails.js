import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import moment from 'moment';
import Loader from '../layout/Loader';
import { Redirect } from 'react-router-dom';
import { removeTraining } from '../../store/actions/trainingActions';

class TrainingDetails extends React.Component {

    render() {
        const { auth, training, trainings } = this.props;
        if (!auth.uid) return <Redirect to="/signin" />
    
        console.log('Training Details => ', trainings);

        if (!trainings.length) return <Redirect to="/" /> // Redirect user after training remove

        if (training) {
            const trainingItems = training.warmup.map((item, index) => {
                return (
                    <li className="collection-item" key={index}>{item}</li>
                )
            })
            return (
                <div className="row">
                    <div className="col s12">
                        <div className="project-details container section">
                            <div className="card">
                                <div className="card-content">
                                    <span className="card-title">{training.title}</span>
                                    <ul className="collection">
                                        {trainingItems}
                                    </ul>
                                    <button className="btn red" onClick={() => this.props.removeTraining(training.id)}>Remove</button>
                                </div>
                                <div className="card-action grey lighten-4 grey-text">
                                    <div>Posted by {training.authorFirstName} {training.authorLastName}</div>
                                    <div>{moment(training.createdAt.toDate()).calendar()}</div>
                                </div>
                            </div>
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
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const trainings = state.firestore.ordered.trainings;

    // Make sure that all trening were loaded before looking for specific id
    const training = trainings ? trainings.find(training => training.id === id) : null;
    return {
        trainings,
        training,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeTraining: (id) => dispatch(removeTraining(id))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'trainings' }
    ])
)(TrainingDetails);