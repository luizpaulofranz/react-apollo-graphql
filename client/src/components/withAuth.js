import React from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { GET_CURRENT_USER } from '../queries';

// Query component keeps cache, so we use refetch to force reload the data.
const withAuth = conditionFunc => Component => props => (
    <Query query={GET_CURRENT_USER}>
        { ({data, loading, refetch}) => {
            if (loading) return null;

            return conditionFunc(data) ? <Component {...props} /> : <Redirect to="/signin" />
        } }
    </Query>
);

export default withAuth;