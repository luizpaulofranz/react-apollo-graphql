import React from 'react';
import withAuth from '../withAuth';

import FormRecipe from './FormRecipe';

const AddRecipe = (props) => {
    return (
        <FormRecipe username={props.session.getCurrentUser.username} />
    ); 
};

export default withAuth(session => session && session.getCurrentUser)(AddRecipe);