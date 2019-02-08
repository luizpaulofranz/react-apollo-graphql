import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './index.css';

import App from './components/App';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';

// react - apollo
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
    uri: 'http://localhost:4444/graphql',
    // bellow is to send our token access
    fetchOptions: {
        credentials: 'include'
    },
    request: operation => {
        const token = localStorage.getItem('token');
        operation.setContext({
            headers: {
                authorization: token
            }
        });
    },
    onError: ({networkError}) => {
        if (networkError) {
            console.log('Network Error: ', networkError);

            if (networkError.statusCode === 401) {
                localStorage.removeItem('token');
            }
        }
    }
});

const Root = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={App} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Redirect to="/" />
        </Switch>
    </Router>
)
// to use special tags to handle graphQL
ReactDOM.render(
    <ApolloProvider client={client}>
        <Root />
    </ApolloProvider>, 
    document.getElementById('root')
);

