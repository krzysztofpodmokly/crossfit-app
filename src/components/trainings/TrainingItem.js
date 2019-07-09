import React from 'react';

const TrainingItem = ({ training }) => {
    return (
        <div className="card">
            <div className="card-image">
                <img src={training.img} alt={training.title} />
                <span className="card-title">{training.title}</span>
                <button className="btn-floating btn-large halfway-fab waves-effect waves-light red lighten-1">
                    <i className="material-icons">add</i>
                </button>
            </div>
            <div className="card-content">
                <p>{training.content}</p>
            </div>
        </div>
    )
}

export default TrainingItem;