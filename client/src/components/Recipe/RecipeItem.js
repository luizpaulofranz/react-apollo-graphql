import React from 'react';

const RecipeItem = (recipe) => (
    <li> 
        <h4>{recipe.name} </h4>
        <p><strong>{recipe.category}</strong></p>
    </li> 
);

export default RecipeItem;