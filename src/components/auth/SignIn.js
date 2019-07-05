import React from 'react';

class SignIn extends React.Component {
    state = {
        'email': '',
        'password': ''
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
        return (
            <div className="container">
                <form onSubmit={this.onFormSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Sign In</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleInputChange} autoComplete="off" />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleInputChange} autoComplete="off" />
                    </div>
                    <div className="input-field">
                        <button className="btn blue lighten-1">Login</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn