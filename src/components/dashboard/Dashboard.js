import React from 'react';
import TrainingList from '../trainings/TrainingList';
import Notifications from './Notifications';

class Dashboard extends React.Component {
    render() {
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <TrainingList />
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <Notifications />
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;
