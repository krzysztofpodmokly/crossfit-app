import React from 'react';
import { connect } from 'react-redux';
import { createTraining } from '../../store/actions/trainingActions';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

import WarmUp from './types/WarmUp';
import ForWeight from './types/ForWeight';
import Metcon from './types/Metcon';
import Gymnastics from './types/Gymnastics';
import Extra from './types/Extra';

class TrainingCreate extends React.Component {
  state = {
    title: '',
    description: '',
    img: '',
    warmup: [],
    forweight: [],
    metcon: [],
    gymnastics: [],
    extra: [],
    formErrors: {
      title: '',
      description: '',
      img: '',
      warmup: [],
      forweight: [],
      metcon: [],
      gymnastics: [],
      extra: []
    }
  };

  validateURL = url => {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator
    return !!pattern.test(url);
  };

  handleInputChange = e => {
    e.preventDefault();
    const { id, value } = e.target; // let id = event.target.id
    // this.setState({
    //     [e.target.id]: e.target.value
    // });
    let formErrors = this.state.formErrors;

    switch (id) {
      case 'title':
        formErrors.title =
          value.length < 3 && value.length > 0
            ? 'Title must be at least 3 characters long!'
            : '';
        break;
      case 'img':
        formErrors.img = !this.validateURL(value)
          ? 'Enter proper image URL'
          : '';
        break;
      case 'description':
        formErrors.description =
          value.length < 10 && value.length > 0
            ? 'Description must be at least 10 characters long!'
            : '';
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors,
        [id]: value
      },
      () => {
        console.log(formErrors);
      }
    );
  };

  // DRY! INPUT CHANGE =>
  handleInputChangeWarmUp = (e, index) => {
    this.state.warmup[index] = e.target.value; // To be improved!

    // set changed state
    this.setState({
      ...this.state.warmup,
      warmup: this.state.warmup
    });
  };

  handleInputChangeForWeight = (e, index) => {
    this.state.forweight[index] = e.target.value;
    this.setState({
      forweight: this.state.forweight
    });
  };
  handleInputChangeMetcon = (e, index) => {
    this.state.metcon[index] = e.target.value;
    this.setState({
      metcon: this.state.metcon
    });
  };
  handleInputChangeGymnastics = (e, index) => {
    this.state.gymnastics[index] = e.target.value;
    this.setState({
      gymnastics: this.state.gymnastics
    });
  };
  handleInputChangeExtra = (e, index) => {
    this.state.extra[index] = e.target.value;
    this.setState({
      extra: this.state.extra
    });
  };
  // <= DRY! INPUT CHANGE

  // DRY! ADD INPUT =>
  handleAddInputWarmUp = e => {
    e.preventDefault();
    this.setState({
      warmup: [...this.state.warmup, '']
    });
  };
  handleAddInputForWeight = e => {
    e.preventDefault();
    this.setState({
      forweight: [...this.state.forweight, '']
    });
  };
  handleAddInputMetcon = e => {
    e.preventDefault();
    this.setState({
      metcon: [...this.state.metcon, '']
    });
  };
  handleAddInputGymnastics = e => {
    e.preventDefault();
    this.setState({
      gymnastics: [...this.state.gymnastics, '']
    });
  };
  handleAddInputExtra = e => {
    e.preventDefault();
    this.setState({
      extra: [...this.state.extra, '']
    });
  };
  // <= DRY! ADD INPUT

  // DRY! BUTTON REMOVE =>
  handleInputRemoveWarmUp = index => {
    this.state.warmup.splice(index, 1); // remove input from the array
    this.setState({
      warmup: this.state.warmup
    });
  };
  handleInputRemoveForWeight = index => {
    this.state.forweight.splice(index, 1); // remove input from the array
    this.setState({
      forweight: this.state.forweight
    });
  };
  handleInputRemoveMetcon = index => {
    this.state.metcon.splice(index, 1); // remove input from the array
    this.setState({
      metcon: this.state.metcon
    });
  };
  handleInputRemoveGymnastics = index => {
    this.state.gymnastics.splice(index, 1); // remove input from the array
    this.setState({
      gymnastics: this.state.gymnastics
    });
  };
  handleInputRemoveExtra = index => {
    this.state.extra.splice(index, 1); // remove input from the array
    this.setState({
      extra: this.state.extra
    });
  };

  // <= DRY! BUTTON REMOVE

  validateForm = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(value => {
      return value.length > 0 && (valid = false);
    });

    return valid;
  };

  onFormSubmit = e => {
    e.preventDefault();
    if (
      this.validateForm(this.state.formErrors) &&
      this.state.title !== '' &&
      this.state.img !== '' &&
      this.state.description !== ''
    ) {
      this.props.createTraining(this.state);
      this.props.history.push('/'); // redirect to dashboard after new training is submitted
    } else {
      console.log('Invalid Form');
    }
  };

  handleStateArrays = obj => {
    const separateArray = [];
    Object.values(obj).forEach(key => {
      return Array.isArray(key) ? separateArray.push(key) : null;
    });
    return separateArray;
  };

  render() {
    const { formErrors } = this.state;
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />;

    // DRY ! RENDERING LISTS =>
    // Rendering WarmUp list
    const warmUpList = this.state.warmup.map((warmup, index) => {
      return (
        <WarmUp
          key={index}
          warmup={warmup}
          index={index}
          handleInputContentChange={this.handleInputChangeWarmUp}
          handleInputRemove={this.handleInputRemoveWarmUp}
        />
      );
    });

    const forWeightList = this.state.forweight.map((forweight, index) => {
      return (
        <ForWeight
          key={index}
          forweight={forweight}
          index={index}
          handleInputContentChange={this.handleInputChangeForWeight}
          handleInputRemove={this.handleInputRemoveForWeight}
        />
      );
    });

    const metconList = this.state.metcon.map((metcon, index) => {
      return (
        <Metcon
          key={index}
          metcon={metcon}
          index={index}
          handleInputContentChange={this.handleInputChangeMetcon}
          handleInputRemove={this.handleInputRemoveMetcon}
        />
      );
    });

    const gymnasticsList = this.state.gymnastics.map((gymnastics, index) => {
      return (
        <Gymnastics
          key={index}
          gymnastics={gymnastics}
          index={index}
          handleInputContentChange={this.handleInputChangeGymnastics}
          handleInputRemove={this.handleInputRemoveGymnastics}
        />
      );
    });

    const extraList = this.state.extra.map((extra, index) => {
      return (
        <Extra
          key={index}
          extra={extra}
          index={index}
          handleInputContentChange={this.handleInputChangeExtra}
          handleInputRemove={this.handleInputRemoveExtra}
        />
      );
    });

    // <= DRY ! RENDERING LISTS

    return (
      <div className='container custom-position'>
        <form onSubmit={this.onFormSubmit} className='white' noValidate>
          <h5 className='grey-text text-darken-2'>Create Training</h5>
          <div className='input-field'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              id='title'
              onChange={this.handleInputChange}
              autoComplete='off'
              noValidate
            />
            {formErrors.title.length > 0 && (
              <span className='red-text'>{formErrors.title}</span>
            )}
          </div>
          <div className='input-field'>
            <label htmlFor='img'>Image</label>
            <input
              type='text'
              id='img'
              onChange={this.handleInputChange}
              autoComplete='off'
              noValidate
            />
            {formErrors.img.length > 0 && (
              <span className='red-text'>{formErrors.img}</span>
            )}
          </div>
          <div className='input-field'>
            <label htmlFor='description'>Description</label>
            <textarea
              className='materialize-textarea'
              id='description'
              onChange={this.handleInputChange}
              noValidate
            />
            {formErrors.description.length > 0 && (
              <span className='red-text'>{formErrors.description}</span>
            )}
          </div>

          <div className='row flex-flow'>
            <div className='col s12 m6'>
              <h5>Warm Up</h5>
              {warmUpList}
              <div className='input-field'>
                <button
                  onClick={this.handleAddInputWarmUp}
                  className='btn-add btn lighten-1 waves-effect waves-light'
                >
                  Add Warmup
                </button>
              </div>
            </div>
            <div className='col s12 m6'>
              <h5>For Weight</h5>
              {forWeightList}
              <div className='input-field'>
                <button
                  onClick={this.handleAddInputForWeight}
                  className='btn-add btn lighten-1 waves-effect waves-light'
                >
                  Add For Weight
                </button>
              </div>
            </div>
          </div>

          <div className='row flex-flow'>
            <div className='col s12 m6'>
              <h5>Metcon</h5>
              {metconList}
              <div className='input-field'>
                <button
                  onClick={this.handleAddInputMetcon}
                  className='btn-add btn lighten-1 waves-effect waves-light'
                >
                  Add Metcon
                </button>
              </div>
            </div>
            <div className='col s12 m6'>
              <h5>Gymnastics</h5>
              {gymnasticsList}
              <div className='input-field'>
                <button
                  onClick={this.handleAddInputGymnastics}
                  className='btn-add btn lighten-1 waves-effect waves-light'
                >
                  Add Gymnastics
                </button>
              </div>
            </div>
          </div>

          <div className='row flex-flow'>
            <div className='col s12 m6'>
              <h5>Extra</h5>
              {extraList}
              <div className='input-field'>
                <button
                  onClick={this.handleAddInputExtra}
                  className='btn-add btn lighten-1 waves-effect waves-light'
                >
                  Add Extra
                </button>
              </div>
            </div>
          </div>

          <div className='input-field center-align'>
            <button className='btn-large red lighten-1 waves-effect waves-light'>
              Create Training
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createTraining: training => dispatch(createTraining(training))
  };
};

export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(TrainingCreate);
