import React from 'react';
import { Mutation } from 'react-apollo';
import Error from '../Error';
import { SIGNIN_USER } from '../../queries/index';
import { withRouter } from 'react-router-dom';

const initialState = {
    email: "",
    password: "",
}

class SignIn extends React.Component {

    state = {...initialState};

    clearState = () => {
        this.setState({...initialState});
    }

    handleChange = event => {
        // extract name and value from target object
        const { name, value } = event.target;
        this.setState({[name]: value });
    };

    handleSubmit = (event, signInUser) => {
        event.preventDefault();
        signInUser().then( async ( {data} ) => {
            localStorage.setItem('token', data.signInUser.token);
            // this forces the execution of auth query whenever this method is called, refetch comes from with Session
            await this.props.refetch();
            this.clearState();
            this.props.history.push('/');
        })
    }

    validateForm = () => {
        const {email, password} = this.state;
        const isInvalid = !email || !password;
        return isInvalid;
    }

    render() {
        const { email, password} = this.state;
        return (
            <div className="App">
                <h2 className="App">Sign In</h2>
                {/* mutation component from apollo react needs uses a render function, defined in queries */}
                <Mutation mutation={SIGNIN_USER} variables={{ email, password }}>
                    {
                        // the first argument is our mutation function
                        ( signInUser, {data, loading, error} ) => {
                            return (
                                <form className="form" onSubmit={event => this.handleSubmit(event, signInUser)}>
                                    <input type="email" name="email" placeholder="email@address.com" onChange={this.handleChange} value={email} />
                                    <input type="password" name="password" placeholder="Password" onChange={this.handleChange} value={password} />
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

// withRouter is to be able to use this.props.history.push('/path')
export default withRouter(SignIn);