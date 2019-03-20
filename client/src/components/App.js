import React from 'react';
import './App.css';
import posed from 'react-pose';

import { Query } from 'react-apollo';
import { GET_ALL_RECIPES } from '../queries';

import RecipeItem from './Recipe/RecipeItem';

// animated component, posed.ul creates a ul, posed.div creates a div, and so on...
const RecipeList = posed.ul({
  shown: {
    x: '0%',
    staggerChildren: 100
  },
  hidden: {
    x: '-100%'
  }
});

class App extends React.Component{ 
  
  state = {
    on: true
  }

  componentDidMount() {
    setTimeout(this.slideIn, 300);
  }

  slideIn = () => {
    this.setState(
      {on: !this.state.on}
    );
  }

  render() { 
    const { on } = this.state;
    return (
      <div className="App">
        <h1 className="main-title">Find Recipes You <strong>Love</strong></h1>

        {/* that's how we call our queries using react-apollo helper 
        fetchPolicy is to handle the react-appolo cache policies, to force a refetch fetchPolicy={'network-only'} */}
        <Query query={GET_ALL_RECIPES} >
          { ( {data, loading, error} ) => {

              if (loading) return <div>Loading</div>;
              if (error) return <div>Error</div>;


              return (
                <RecipeList 
                  className="cards"
                  pose={ on ? 'hidden' : 'shown' }
                >
                  { data.getAllRecipes.map( recipe => (
                    <RecipeItem key={recipe._id} {...recipe} />
                  ))}
                </RecipeList>
              );
            }
          }
        </Query>
      </div>
    )
  }
}
export default App;
