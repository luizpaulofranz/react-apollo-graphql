import React from 'react';
import { withRouter } from 'react-router-dom';

import { Query } from 'react-apollo';
import { GET_RECIPE } from '../../queries/index';

// the match object comes from withRouter, and allow us to get the URL params
const RecipePage = ({ match }) => {
    const { _id } = match.params; // to get the URL params
    console.log(_id);
    return (
        <Query query={GET_RECIPE} variables={{_id}}>
            { (data, loading, error) => {
                if (loading) return <div>Loading...</div>
                if (error) return <div>Error...</div>
                console.log(data);
                return (
                    <div>
                        ReecipePage
                    </div>
                );
            }}
        </Query>
    )
}
    

export default withRouter(RecipePage);