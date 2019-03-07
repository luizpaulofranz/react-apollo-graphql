import React from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import { DELETE_USER_RECIPE, GET_USER_RECIPES } from '../../queries/index';

const handleDelete = deleteUserRecipe => {
    const confimDelete = window.confirm("Are you sure you want to delete this recipe?");
    if (confimDelete) {
        deleteUserRecipe()
    }
}

const RecipeItem = (recipe) => (
    <li> 
        <Link to={`/recipes/${recipe._id}`}><h4>{recipe.name} </h4></Link>
        <p><strong>{recipe.category}</strong></p>
        {recipe.showLikes ? <p>Likes: {recipe.likes}</p> : null}
        
        {/* here we delete our recipes */}
        {recipe.showDelete ? 
            <Mutation mutation={DELETE_USER_RECIPE} variables={{_id: recipe._id}} update={ (cache, {data: { deleteUserRecipe } }) => {
                // here we read from cache and destructure the variable getUserQuery from cache, 
                // so we remove on backend and remove locally from cache, with this, the UI is correct updated
                const { username } = recipe;
                const { getUserRecipes } = cache.readQuery({
                    query: GET_USER_RECIPES,
                    variables: { username }
                });
                // and here we re-write the cache
                cache.writeQuery({
                    query: GET_USER_RECIPES,
                    variables: { username },
                    data: {
                        getUserRecipes: getUserRecipes.filter( recipe => recipe._id !== deleteUserRecipe._id )
                    }
                })
            }}>
                {(deleteUserRecipe, attrs = {} ) => {
                    return(
                        <p className="delete-button" 
                            onClick={() => handleDelete(deleteUserRecipe)}>
                            {attrs.loading? 'loading...': 'x'}
                        </p> 
                    )
                }}
            </Mutation>
        : null}
    </li> 
);

export default RecipeItem;