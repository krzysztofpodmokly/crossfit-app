import React from 'react';

const TrainingDetails = (props) => {
    console.log(props);
    const id = props.match.params.id;
    return (
        <div className="project-details container section">
            <div className="card">
                <div className="card-content">
                    <span className="card-title">Card Title - {id}</span>
                    <p>Training Content</p>
                </div>
                <div className="card-action grey lighten-4 grey-text">
                    <div>Posted by Me</div>
                    <div>Date</div>
                </div>
            </div>
        </div>
    )
}

export default TrainingDetails;