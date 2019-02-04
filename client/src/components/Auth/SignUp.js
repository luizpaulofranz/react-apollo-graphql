import React from 'react';

class SignUp extends React.Component {

    state = {
        username: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    };

    handleChange = event => {
        // extract name and value from target object
        const { name, value } = event.target;
        this.setState({[name]: value });
    };

    render() {
        return (
            <div className="App">
                <h2 className="App">Sign Up</h2>
                <form className="form">
                    <input type="text" name="username" placeholder="User Name" onChange={this.handleChange} value={this.state.username} />
                    <input type="email" name="email" placeholder="email@address.com" onChange={this.handleChange} value={this.state.email} />
                    <input type="password" name="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} />
                    <input type="password" name="passwordConfirmation" placeholder="Password Confirmation" onChange={this.handleChange} value={this.state.passwordConfirmation} />
                    <button type="submit" className="button-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default SignUp;