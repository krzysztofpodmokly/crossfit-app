import React from 'react';
import TrainingList from '../trainings/TrainingList';
import Notifications from './Notifications';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class Dashboard extends React.Component {
    render() {
        const { trainings, auth, notifications } = this.props;

        if (!auth.uid) return <Redirect to="/signin" />

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <TrainingList trainings={trainings}/>
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <Notifications notifications={notifications}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(state)
    return {
        trainings: state.firestore.ordered.trainings,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications
    }
}

export default compose(
    firestoreConnect([
        { collection: 'trainings', orderBy: ['createdAt', 'desc'] },  // indicates to which collection to connect to
        { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }
    ]),
    connect(mapStateToProps)
)(Dashboard);
