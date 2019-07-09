import React from 'react';
import TrainingItem from './TrainingItem';
import { Link } from 'react-router-dom';

const TrainingList = ({ trainings }) => {
    // if there are any trainings map all of them otherwise don't bother
    const trainingList = trainings && trainings.map(training => {
       return (
            <Link to={`/training/${training.id}`} key={training.id}>
                <TrainingItem training={training}/>
            </Link>
        )
    });
    return (
        <div className="training-list section">
            {trainingList}
        </div>
    )
}

export default TrainingList
 
