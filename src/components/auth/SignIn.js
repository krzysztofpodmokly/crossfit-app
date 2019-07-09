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
                <h5 className="grey-text text-darken-3">Sign In</h5>
                <form onSubmit={this.onFormSubmit} className="white">
                    <div className="input-field">
                        <i className="material-icons prefix grey-text custom-icons">email</i>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleInputChange} autoComplete="off" />
                    </div>
                    <div className="input-field">
                        <i className="material-icons prefix grey-text custom-icons">vpn_key</i>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleInputChange} autoComplete="off" />
                    </div>
                    <div className="input-field">
                        <button className="btn red lighten-1 waves-effect waves-light">Login</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn
