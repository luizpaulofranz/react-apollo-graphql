import React from 'react';
import { Query } from 'react-apollo';
import { GET_USER_RECIPES } from '../../queries/index';
import RecipeItem from '../Recipe/RecipeItem';
import Spinner from '../Spinner';

const UserRecipes = ({username}) => (
    <Query query={GET_USER_RECIPES} variables={{ username }}>

        {({data, loading, error}) => {
            if (loading) return <Spinner />
            if (error) return <div>Error...</div>


            return (
                <ul>
                    <h3>Your Recipes</h3>

                    {!data.getUserRecipes.length && (
                        <p>
                            <strong>You have not added any recipes yet!</strong>
                        </p>
                    )}

                    { data.getUserRecipes.map( recipe => (
                        <RecipeItem key={recipe._id} showLikes="true" showDelete username={username} {...recipe} />
                    ))}
                </ul>
            );
        }}

    </Query>
);

export default UserRecipes;