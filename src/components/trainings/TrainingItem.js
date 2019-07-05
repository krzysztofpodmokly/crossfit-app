import React from 'react';

const TrainingItem = () => {
    return (
        <div className="card">
            <div className="card-image">
                <img src="https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1789&q=80" alt="title" />
                <span className="card-title">Card Title</span>
                <button className="btn-floating btn-large halfway-fab waves-effect waves-light blue lighten-1"><i className="material-icons">add</i></button>
            </div>
            <div className="card-content">
                <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
            </div>
        </div>
    )
}

export default TrainingItem;