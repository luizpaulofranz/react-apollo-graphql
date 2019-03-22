import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './index.css';

import App from './components/App';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import WithSession from './components/withSession';
import Navbar from './components/Navbar';
import Search from './components/Recipe/Search';
import AddRecipe from './components/Recipe/AddRecipe';
import Profile from './components/Profile/Profile';
import RecipePage from './components/Recipe/RecipePage';

// react - apollo
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo';

const apiUrl = 'http://localhost:4444/graphql';
// const apiUrl = 'http://react-appolo-recipes-test.herokuapp.com/graphql';

const client = new ApolloClient({
    uri: apiUrl,
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
            localStorage.setItem('token', '');

            if (networkError.statusCode === 401) {
                localStorage.removeItem('token');
            }
        }
    }
});

// the refetch property comes from withSession Component
// we use it because graphql keep cache, and with this we force to refetch data
const Root = ({refetch, session}) => (
    <Router>
        <Fragment> {/* Fragment is a default react wrapper. Router must have only one child, so we use this fragment. */}
            <Navbar session={session} />
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/search" component={Search} />
                <Route path="/signin" render={() => <SignIn refetch={refetch} />} />
                <Route path="/signup" render={() => <SignUp refetch={refetch} />} />
                <Route path="/recipe/add" render={() => <AddRecipe session={session} />} />
                <Route path="/recipes/:_id" component={RecipePage} />
                <Route path="/profile" render={() => <Profile session={session} />} />
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

