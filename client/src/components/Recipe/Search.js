import React from 'react';
import { Query } from 'react-apollo';

import { SEARCH_RECIPES } from '../../queries/index';
import RecipeItem from '../Recipe/RecipeItem';

const Search = () => (
    <Query query={SEARCH_RECIPES} variables={{searchTerm: ""}}>
        { ( {data, loading, error} ) => {

            if (loading) return <div>Loading</div>;
            if (error) {
                console.log(error);
                return <div>Error</div>;
            }

            return (
                <div className="App">
                    <input type="search" name="search" />
                    <ul>
                        { data.searchRecipes.map( recipe => (
                            <RecipeItem key={recipe._id} {...recipe} />
                        ))}
                    </ul>
                </div>
            );
        }}
    </Query>
);

export default Search;