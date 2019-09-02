import React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class SignIn extends React.Component {
  state = {
    email: '',
    password: ''
  };

  handleInputChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  onFormSubmit = e => {
    e.preventDefault();
    const { firebase } = this.props;
    const credentials = { ...this.state };
    const authData = {
      firebase,
      credentials
    };

    this.props.signIn(authData);
  };

  render() {
    const { authError, auth } = this.props;
    if (!isLoaded(auth)) {
      // if auth status is not yet fetched return nothing
      return null;
    }

    if (auth.uid) return <Redirect to='/' />;

    return (
      <div className='container'>
        <form onSubmit={this.onFormSubmit} className='white'>
          <h5 className='grey-text text-darken-2'>Sign In</h5>
          <div className='input-field'>
            <i className='material-icons prefix grey-text custom-icons'>
              email
            </i>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              onChange={this.handleInputChange}
              autoComplete='off'
            />
          </div>
          <div className='input-field'>
            <i className='material-icons prefix grey-text custom-icons'>
              vpn_key
            </i>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              onChange={this.handleInputChange}
              autoComplete='off'
            />
          </div>
          <div className='input-field'>
            <button className='btn red lighten-1 waves-effect waves-light'>
              Login
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
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: credentials => dispatch(signIn(credentials))
  };
};

export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SignIn);
