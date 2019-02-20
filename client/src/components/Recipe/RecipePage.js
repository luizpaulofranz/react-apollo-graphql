import React from 'react';
import { withRouter } from 'react-router-dom';

// the match object comes from withRouter, and allow us to get the URL params
const RecipePage = ({ match }) => {
    const { _id } = match.params; // to get the URL params
    console.log(_id);
    return (
        <div>
            ReecipePage
        </div>
    )
}
    

export default withRouter(RecipePage);