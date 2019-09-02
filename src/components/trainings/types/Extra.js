import React from 'react';

class Extra extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col s6">
                    <div className="input-field">
                        <label htmlFor={`content-${this.props.index}`}>Content - {this.props.index + 1}</label>
                        <input type="text" id={`content-${this.props.index}`}  value={this.props.extra} autoComplete="off" onChange={(e) => this.props.handleInputContentChange(e, this.props.index)}/>
                    </div>
                </div>
                <div className="col s6">
                    <button className="btn-floating btn lighten-1 waves-effect waves-light indigo z-depth-2" onClick={() => this.props.handleInputRemove(this.props.index)}>
                        <i className="material-icons text-white">delete</i>
                    </button>
                </div>
            </div>
        )
    }
}

export default Extra;