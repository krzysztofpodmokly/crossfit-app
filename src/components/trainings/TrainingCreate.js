import React from 'react';
import { connect } from 'react-redux';
import { createTraining } from '../../store/actions/trainingActions';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class TrainingCreate extends React.Component {
    state = {
        title: '',
        description: '',
        img: '',
        contents: [],
        formErrors: {
            title: '',
            description: '',
            img: '',
            contents: []
        }
    }

    validateURL = (url) => {
        const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(url);
    }

    handleInputChange = (e) => {
        e.preventDefault();
        const { id, value } = e.target; // let id = event.target.id
        // this.setState({
        //     [e.target.id]: e.target.value
        // });
        let formErrors = this.state.formErrors;

        switch (id) {
            case 'title':
                formErrors.title = value.length < 3 && value.length > 0 ? 'Title must be at least 3 characters long!' : '';
                break;
            case 'img':
                formErrors.img = !this.validateURL(value) ? 'Enter proper image URL' : '';
                break;
            case 'description':
                formErrors.description = value.length < 10 && value.length > 0 ? 'Description must be at least 10 characters long!' : '';
                break;
            default:
                break;
        }

        this.setState({
                formErrors, [id]: value
            }, () => {
                console.log(formErrors)
            }
        )
    }

    handleInputContentChange = (e, index) => {
        // this.state.contents[index] = e.target.value; // To be improved!
        
        let contents = [ ...this.state.contents];
        contents[index] = !contents[index];
        this.setState({
            contents
        })
        
        // set changed state
        this.setState({
            contents: this.state.contents
        })
    }

    handleAddInput = (e) => {
        e.preventDefault();
        this.setState({
            contents: [...this.state.contents, ""]
        })
    }
    
    handleInputRemove = (index) => {
        this.state.contents.splice(index, 1); // remove input from the array
        this.setState({
            contents: this.state.contents
        })
    }

    

    validateForm = formErrors => {
        let valid = true;
        Object.values(formErrors).forEach(value => {
            return value.length > 0 && (valid = false)
        });

        return valid;
    }

    // validateContents = contents => {
    //     let valid = true;
    //     contents.forEach(content => {
    //         return content.length > 0 && (valid = false)
    //     })
    //     return valid;
    // }
    
    onFormSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        if (this.validateForm(this.state.formErrors) && this.state.title !== "" && this.state.img !== "" && this.state.description !== "") {
            console.log('Form valid');
            this.props.createTraining(this.state);
            this.props.history.push('/'); // redirect to dashboard after new training is submitted
        } else {
            console.log('Invalid Form')
        }

    }

    render() {
        const { formErrors } = this.state;
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to="/signin" />;
        const inputList = this.state.contents.map((content, index) => {
            return (
                <div className="row" key={index}>
                    <div className="col s6">
                        <div className="input-field">
                            <label htmlFor={`content-${index}`}>Content - {index + 1}</label>
                            <input type="text" id={`content-${index}`} onChange={(e) => this.handleInputContentChange(e, index)} value={content} autoComplete="off" />
                        </div>
                    </div>
                    <div className="col s6">
                        <button className="btn-floating btn lighten-1 waves-effect waves-light indigo z-depth-2" onClick={() => this.handleInputRemove(index)}>
                            <i className="material-icons text-white">delete</i>
                        </button>
                    </div>
                </div>
            )
        });

        return (
            <div className="container">
                <form onSubmit={this.onFormSubmit} className="white" noValidate>
                    <h5 className="grey-text text-darken-2">Create Training</h5>
                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={this.handleInputChange} autoComplete="off" noValidate />
                        {formErrors.title.length > 0 && <span className="red-text">{formErrors.title}</span>}
                    </div>
                    <div className="input-field">
                        <label htmlFor="img">Image</label>
                        <input type="text" id="img" onChange={this.handleInputChange} autoComplete="off" noValidate />
                        {formErrors.img.length > 0 && <span className="red-text">{formErrors.img}</span>}
                    </div>
                    <div className="input-field">
                        <label htmlFor="description">Description</label>
                        <textarea className="materialize-textarea" id="description" onChange={this.handleInputChange} noValidate />
                        {formErrors.description.length > 0 && <span className="red-text">{formErrors.description}</span>}
                    </div>
                    { inputList }
                    <div className="row">
                        <div className="col s12 m3">
                            <div className="input-field">
                                <button onClick={this.handleAddInput} className="btn lighten-1 waves-effect waves-light">Add Input Field</button>
                            </div>
                        </div>
                        <div className="col s12 m3">
                            <div className="input-field">
                                <button className="btn red lighten-1 waves-effect waves-light">Create Training</button>
                            </div>
                        </div>
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

