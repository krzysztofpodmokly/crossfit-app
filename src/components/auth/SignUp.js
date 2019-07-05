import React from 'react';
import Error from '../error/Error';

class SignUp extends React.Component {
    state = {
        'email': '',
        'password': '',
        'confirmPassword': '',
        'firstname': '',
        'lastname': ''
    }

    handleInputChange = (e) => {
        // e.preventDefault();
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
                <form onSubmit={this.onFormSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Register Account</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleInputChange} autoComplete="off" />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleInputChange} autoComplete="off" />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Confirm Password</label>
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
                        <button className="btn blue lighten-1">Create Account</button>
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
