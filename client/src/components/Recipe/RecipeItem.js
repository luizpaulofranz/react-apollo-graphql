import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import posed from 'react-pose';

import { DELETE_USER_RECIPE, GET_USER_RECIPES, GET_ALL_RECIPES, GET_CURRENT_USER } from '../../queries/index';

const handleDelete = deleteUserRecipe => {
    const confimDelete = window.confirm("Are you sure you want to delete this recipe?");
    if (confimDelete) {
        deleteUserRecipe()
    }
}

const RecipeLi = posed.li({
    shown: { opacity: 1 },
    hidden: { opacity: 0 }
});

const RecipeItem = (recipe) => (
    <RecipeLi className={recipe.showDelete ? "" : "card"}
        style={{background: `url(${recipe.imageUrl}) center center / cover no-repeat`}}
    > 
    <span className={ recipe.showDelete ? "" : recipe.category}>{recipe.category}</span>
    <div className={recipe.showDelete ? "" : "card-text"}>
        <Link to={`/recipes/${recipe._id}`}><h4>{recipe.name} </h4></Link>
        {recipe.showLikes ? <p>Likes: {recipe.likes}</p> : null}
    </div>
        
        {/* here we delete our recipes */}
        {recipe.showDelete ? 
            <Fragment>
            <button className="button-primary">Update</button>
            <Mutation 
                mutation={DELETE_USER_RECIPE} 
                variables={{_id: recipe._id}} 
                // here we refetch this other queries to keep all local cache ok
                refetchQueries={() => [
                    {query: GET_ALL_RECIPES},
                    {query: GET_CURRENT_USER}
                ]}
                update={ (cache, {data: { deleteUserRecipe } }) => {
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
            </Fragment>
        : null}
    </RecipeLi> 
);

export default RecipeItem;