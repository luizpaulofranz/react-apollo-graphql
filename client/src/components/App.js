import React from 'react';
import './App.css';

import { Query } from 'react-apollo';
import { GET_ALL_RECIPES } from '../queries';

import RecipeItem from './Recipe/RecipeItem';


const App = () => (
  <div className="App">
    <h1>Home</h1>

    {/* that's how we call our queries using react-apollo helper 
    fetchPolicy is to handle the react-appolo cache policies, to force a refetch*/}
    <Query query={GET_ALL_RECIPES} fetchPolicy={'network-only'}>
      { ( {data, loading, error} ) => {

          if (loading) return <div>Loading</div>;
          if (error) return <div>Error</div>;

          console.log(data);

          return (
            <ul>
              { data.getAllRecipes.map( recipe => (
                <RecipeItem key={recipe._id} {...recipe} />
              ))}
            </ul>
          );
        }
      }
    </Query>
  </div>
)


export default App;
