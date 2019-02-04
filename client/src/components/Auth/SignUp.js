import React from 'react';

class SignUp extends React.Component {
    render() {
        return (
            <div className="App">
                <h2 className="App">Sign Up</h2>
                <form className="form">
                    <input type="text" name="username" placeholder="User Name" />
                    <input type="email" name="email" placeholder="email@address.com" />
                    <input type="password" name="password" placeholder="Password" />
                    <input type="password" name="passwordConfirmation" placeholder="Password Confirmation" />
                    <button type="submit" className="button-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default SignUp;