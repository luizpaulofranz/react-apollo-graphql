import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './index.css';

import App from './components/App';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import WithSession from './components/withSession';

// react - apollo
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo';
import Navbar from './components/Navbar';

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

// the refetch property comes from withSession Component
const Root = ({refetch}) => (
    <Router>
        <Fragment> {/* Router must have only one child, so we use this fragment. */}
            <Navbar />
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/signin" render={() => <SignIn refetch={refetch} />} />
                <Route path="/signup" render={() => <SignUp refetch={refetch} />} />
                <Redirect to="/" />
            </Switch>
        </Fragment>
    </Router>
)

// wrapper to control access by token
const RootWithSession = WithSession(Root);

// to use special tags to handle graphQL
ReactDOM.render(
    <ApolloProvider client={client}>
        <RootWithSession />
    </ApolloProvider>, 
    document.getElementById('root')
);

