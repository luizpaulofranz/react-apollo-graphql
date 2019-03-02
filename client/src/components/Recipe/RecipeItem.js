import React from 'react';
import { Link } from 'react-router-dom';

const RecipeItem = (recipe) => (
    <li> 
        <Link to={`/recipes/${recipe._id}`}><h4>{recipe.name} </h4></Link>
        <p><strong>{recipe.category}</strong></p>
        {recipe.showLikes ? <p>Likes: {recipe.likes}</p> : null}
    </li> 
);

export default RecipeItem;