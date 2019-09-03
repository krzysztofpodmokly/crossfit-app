import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import moment from 'moment';
import Loader from '../layout/Loader';
import { Redirect } from 'react-router-dom';

const TrainingDetails = ({ training, auth }) => {
  if (!auth.uid) return <Redirect to='/signin' />;
  if (training) {
    const warmupList = training.warmup.map((item, index) => {
      return (
        <li className='collection-item' key={index}>
          {item}
        </li>
      );
    });
    const forweightList = training.forweight.map((item, index) => {
      return (
        <li className='collection-item' key={index}>
          {item}
        </li>
      );
    });
    const metconList = training.metcon.map((item, index) => {
      return (
        <li className='collection-item' key={index}>
          {item}
        </li>
      );
    });
    const gymnasticsList = training.gymnastics.map((item, index) => {
      return (
        <li className='collection-item' key={index}>
          {item}
        </li>
      );
    });
    const extraList = training.extra.map((item, index) => {
      return (
        <li className='collection-item' key={index}>
          {item}
        </li>
      );
    });

    return (
      <div className='row'>
        <div className='col s12'>
          <div className='project-details container section custom-position'>
            <div className='card'>
              <div className='card-content'>
                <span className='card-title top-header'>{training.title}</span>
                <ul className='collection with-header'>
                  <li className='collection-header'>
                    <h5 className='training-header'>Warm Up</h5>
                  </li>
                  {warmupList}
                </ul>
                <ul className='collection with-header'>
                  <li className='collection-header'>
                    <h5 className='training-header'>For Weight</h5>
                  </li>
                  {forweightList}
                </ul>
                <ul className='collection with-header'>
                  <li className='collection-header'>
                    <h5 className='training-header'>Metcon</h5>
                  </li>
                  {metconList}
                </ul>
                <ul className='collection with-header'>
                  <li className='collection-header'>
                    <h5 className='training-header'>Gymnastics</h5>
                  </li>
                  {gymnasticsList}
                </ul>
                <ul className='collection with-header'>
                  <li className='collection-header'>
                    <h5 className='training-header'>Extra</h5>
                  </li>
                  {extraList}
                </ul>
              </div>
              <div className='card-action grey lighten-4 grey-text'>
                <div>
                  Posted by {training.authorFirstName} {training.authorLastName}
                </div>
                <div>{moment(training.createdAt.toDate()).calendar()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const trainings = state.firestore.ordered.trainings;

  const [training] = trainings
    ? trainings.filter(training => training.id === id)
    : [];
  return {
    training: training,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'trainings' }])
)(TrainingDetails);
