import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';

const handleSignOut = (client,history) => {
    localStorage.setItem('token', '');
    /* Apollo saves our requests in local cache, so to clear up our data, apollo client offers some functions, like clearStore */
    // client.clearStore();
    // reset will clean cache and refetch it
    client.resetStore();

    history.push('/'); //to redirect
};

const SignOut = ({ history }) => (
    // ApolloConsumer is an way to get access dorectly to our apollo client
    <ApolloConsumer>
        { client => {
            return (
                <button onClick={ () => handleSignOut(client, history) }>SignOut</button>
            );
        }}
    </ApolloConsumer>
);

export default withRouter(SignOut);