import React from 'react';
import { Query } from 'react-apollo';
import { GET_USER_RECIPES } from '../../queries/index';
import RecipeItem from '../Recipe/RecipeItem';

const UserRecipes = ({username}) => (
    <Query query={GET_USER_RECIPES} variables={{ username }}>

        {({data, loading, error}) => {
            if (loading) return <div>Loading...</div>
            if (error) return <div>Error...</div>

            console.log(data);

            return (
                <ul>
                    <h3>Your Recipes</h3>
                    { data.getUserRecipes.map( recipe => (
                        <RecipeItem key={recipe._id} showLikes="true" {...recipe} />
                    ))}
                </ul>
            );
        }}

    </Query>
);

export default UserRecipes;