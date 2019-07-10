import React from 'react';
import TrainingList from '../trainings/TrainingList';
import Notifications from './Notifications';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class Dashboard extends React.Component {
    render() {
        const { trainings, auth } = this.props;

        if (!auth.uid) return <Redirect to="/signin" />

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <TrainingList trainings={trainings}/>
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <Notifications />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log(state);
    return {
        trainings: state.firestore.ordered.trainings,
        auth: state.firebase.auth
    }
}

export default compose(
    firestoreConnect(['trainings']), // indicates to which collection to connect to
    connect(mapStateToProps)
)(Dashboard);
