import React from 'react';
import Error from '../error/Error';

class SignUp extends React.Component {
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        firstname: '',
        lastname: ''
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    render() {
        const { password, confirmPassword } = this.state;
        const error = password !== confirmPassword ? <Error /> : null;

        return (
            <div className="container">
                <h5 className="grey-text text-darken-3">Register Account</h5>
                <form onSubmit={this.onFormSubmit} className="white">
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleInputChange} autoComplete="off" />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleInputChange} autoComplete="off" />
                    </div>
                    <div className="input-field">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" onChange={this.handleInputChange} autoComplete="off" />
                    </div>
                    <div className="input-field">
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" id="firstname" onChange={this.handleInputChange} autoComplete="off" />
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastname">Last Name</label>
                        <input type="text" id="lastname" onChange={this.handleInputChange} autoComplete="off" />
                    </div>
                    <div className="input-field">
                        <button className="btn red lighten-1 waves-effect waves-light">Create Account</button>
                        <div className="red-text center">
                            {error}
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignUp;
