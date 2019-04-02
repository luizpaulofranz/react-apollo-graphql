import React from 'react';
import { withRouter } from 'react-router-dom';

import { Query } from 'react-apollo';
import { GET_RECIPE } from '../../queries/index';
import Spinner from '../Spinner';
import FormRecipe from './FormRecipe';

class EditRecipe extends React.Component {

    render() {

        // the match object comes from withRouter, and allow us to get the URL params
        const { _id } = this.props.match.params; // to get the URL params
        
        return (
            <Query query={GET_RECIPE} variables={{_id}}>
                { ({ data }, loading, error) => {
                    if (loading || !data.getRecipe) return <Spinner />
                    if (error) return <div>Error...</div>

                    return (
                        <FormRecipe recipe={data} loading={loading} error={error} />
                    );
                }}
            </Query>
        )
    }
}
    

export default withRouter(EditRecipe);