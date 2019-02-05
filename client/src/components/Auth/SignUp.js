import React from 'react';
import { Mutation } from 'react-apollo';
import Error from '../Error';
import { SIGNUP_USER } from '../../queries/index';

const initialState = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: ""
}

class SignUp extends React.Component {

    state = {...initialState};

    clearState = () => {
        this.setState({...initialState});
    }

    handleChange = event => {
        // extract name and value from target object
        const { name, value } = event.target;
        this.setState({[name]: value });
    };

    handleSubmit = (event, signUpUser) => {
        event.preventDefault();
        signUpUser().then(data => {
            console.log(data);
            this.clearState();
        })
    }

    validateForm = () => {
        const {username, email, password, passwordConfirmation} = this.state;
        const isInvalid = !username || !email || !password || password !== passwordConfirmation;
        return isInvalid;
    }

    render() {
        const {username, email, password, passwordConfirmation} = this.state;
        return (
            <div className="App">
                <h2 className="App">Sign Up</h2>
                {/* mutation component from apollo react needs uses a render function, defined in queries */}
                <Mutation mutation={SIGNUP_USER} variables={{ username, email, password }}>
                    {
                        // the first argument is our mutation function
                        ( signUpUser, {data, loading, error} ) => {
                            return (
                                <form className="form" onSubmit={event => this.handleSubmit(event, signUpUser)}>
                                    <input type="text" name="username" placeholder="User Name" onChange={this.handleChange} value={username} />
                                    <input type="email" name="email" placeholder="email@address.com" onChange={this.handleChange} value={email} />
                                    <input type="password" name="password" placeholder="Password" onChange={this.handleChange} value={password} />
                                    <input type="password" name="passwordConfirmation" placeholder="Password Confirmation" onChange={this.handleChange} value={passwordConfirmation} />
                                    <button type="submit" className="button-primary" disabled={loading || this.validateForm()}>Submit</button>
                                    {error && <Error error={error}/>}
                                </form>
                            )
                        }
                    }
                </Mutation>
            </div>
        )
    }
}

export default SignUp;