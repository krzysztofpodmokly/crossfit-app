import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { registerAccount } from '../../store/actions/authActions';

class SignUp extends React.Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    firstname: '',
    lastname: ''
  };

  handleInputChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  onFormSubmit = e => {
    e.preventDefault();
    const { registerAccount, firebase } = this.props;
    registerAccount(this.state, firebase);
  };

  render() {
    const { auth, authError } = this.props;

    if (auth.uid) return <Redirect to='/' />;

    return (
      <div className='container'>
        <form onSubmit={this.onFormSubmit} className='white'>
          <h5 className='grey-text text-darken-2'>Register Account</h5>
          <div className='input-field'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              onChange={this.handleInputChange}
              autoComplete='off'
            />
          </div>
          <div className='input-field'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              onChange={this.handleInputChange}
              autoComplete='off'
            />
          </div>
          <div className='input-field'>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              type='password'
              id='confirmPassword'
              onChange={this.handleInputChange}
              autoComplete='off'
            />
          </div>
          <div className='input-field'>
            <label htmlFor='firstname'>First Name</label>
            <input
              type='text'
              id='firstname'
              onChange={this.handleInputChange}
              autoComplete='off'
            />
          </div>
          <div className='input-field'>
            <label htmlFor='lastname'>Last Name</label>
            <input
              type='text'
              id='lastname'
              onChange={this.handleInputChange}
              autoComplete='off'
            />
          </div>
          <div className='input-field'>
            <button className='btn red lighten-1 waves-effect waves-light'>
              Create Account
            </button>
            <div className='red-text center'>
              {authError ? <p>{authError}</p> : null}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registerAccount: (newUser, firebase) =>
      dispatch(registerAccount(newUser, firebase))
  };
};

export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SignUp);
