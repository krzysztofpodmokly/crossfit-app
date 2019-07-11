import React from 'react';
import moment from 'moment';

const TrainingItem = ({ training }) => {
    return (
        <div className="card">
            <div className="card-image">
                <img src={training.img} alt={training.title} />
                <span className="card-title">
                    <h3>{training.title}</h3>
                </span>
                <button className="btn-floating btn-large halfway-fab waves-effect waves-light red lighten-1">
                    <i className="material-icons">add</i>
                </button>
            </div>
            <div className="card-content grey-text text-darken-3">
                <h6>{training.description}</h6>
                <p>{moment(training.createdAt.toDate()).calendar()}</p>
            </div>
        </div>
    )
}

export default TrainingItem;