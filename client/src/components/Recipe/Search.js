import React from 'react';
import { ApolloConsumer } from 'react-apollo';

import { SEARCH_RECIPES } from '../../queries/index';
import RecipeItem from '../Recipe/RecipeItem';

class Search extends React.Component{

    state = {
        searchResults: []
    }

    handleChange = ({searchRecipes}) => {
        this.setState({
            searchResults: searchRecipes
        });
    }

    render() {
        return(
            <ApolloConsumer>

                { client => {

                    return (
                        <div className="App">
                            <input type="search" name="search" 
                                placeholder="Search for recipes" 
                                onChange={ async event => {
                                    event.persist();
                                    const {data} = await client.query({
                                        query: SEARCH_RECIPES,
                                        variables: { searchTerm: event.target.value }
                                    });
                                    this.handleChange(data);
                                }} 
                            />

                            <ul>
                                { this.state.searchResults.map( recipe => (
                                    <RecipeItem key={recipe._id} {...recipe} />
                                ))}
                            </ul>
                        </div>
                    );
                }}
            </ApolloConsumer>
        );
    }
}

export default Search;