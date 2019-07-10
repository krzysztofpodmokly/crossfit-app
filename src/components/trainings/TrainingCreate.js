import React from 'react';
import { connect } from 'react-redux';
import { createTraining } from '../../store/actions/trainingActions';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class TrainingCreate extends React.Component {
    state = {
        title: '',
        content: '',
        img: ''
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.createTraining(this.state);
        this.props.history.push('/'); // redirect to dashboard after new training is submitted
    }

    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to="/signin" />
        return (
            <div className="container">
                <h5 className="grey-text text-darken-3">Create Training</h5>
                <form onSubmit={this.onFormSubmit} className="white">
                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={this.handleInputChange} autoComplete="off" />
                    </div>
                    <div className="input-field">
                        <label htmlFor="img">Image</label>
                        <input type="text" id="img" onChange={this.handleInputChange} autoComplete="off" />
                    </div>
                    <div className="input-field">
                        <label htmlFor="content">Content</label>
                        <textarea className="materialize-textarea" id="content" onChange={this.handleInputChange} />
                    </div>
                    <div className="input-field">
                        <button className="btn red lighten-1 waves-effect waves-light">Create</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createTraining: (training) => dispatch(createTraining(training))
    }
}

export default compose(
    firebaseConnect(),
    connect(mapStateToProps, mapDispatchToProps)
)(TrainingCreate);

