import React from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import { DELETE_USER_RECIPE } from '../../queries/index';

const handleDelete = deleteUserRecipe => {
    const confimDelete = window.confirm("Are you sure you want to delete this recipe?");
    if (confimDelete) {
        deleteUserRecipe().then(({data}) => {
            console.log(data);
        })
    }
}

const RecipeItem = (recipe) => (
    <li> 
        <Link to={`/recipes/${recipe._id}`}><h4>{recipe.name} </h4></Link>
        <p><strong>{recipe.category}</strong></p>
        {recipe.showLikes ? <p>Likes: {recipe.likes}</p> : null}
        
        {/* here we delete our recipes */}
        {recipe.showDelete ? 
            <Mutation mutation={DELETE_USER_RECIPE} variables={{_id: recipe._id}}>
                {deleteUserRecipe => {
                    return(
                        <p className="delete-button" 
                            onClick={() => handleDelete(deleteUserRecipe)}>
                        x</p> 
                    )
                }}
            </Mutation>
        : null}
    </li> 
);

export default RecipeItem;