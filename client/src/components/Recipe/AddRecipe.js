import React from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import withAuth from '../withAuth';

import { ADD_RECIPE, GET_ALL_RECIPES, GET_USER_RECIPES } from '../../queries/index';
import Error from '../Error';

const initialState = {
    name: '',
    imageUrl: '',
    category: 'Breackfast',
    description: '',
    instructions: '',
    username: ''
}

class AddRecipe extends React.Component {

    state = { ...initialState }

    clearState = () => {
        this.setState({ ...initialState });
    }

    componentDidMount() {
        this.setState({ 
            username: this.props.session.getCurrentUser.username
         });
         //console.log(this.state);
    }

    handleChange = event => {
        const { name, value } = event.target;
        // console.log(name+": "+value);
        this.setState({ [name]: value });
    }

    handleSubmit = (event, addRecipe) => {
        event.preventDefault();
        addRecipe().then(({ data }) => {
            console.log(data);
            this.clearState();
            this.props.history.push('/');
        });
    }

    validateForm = () => {
        const { name, imageUrl, category, description, instructions, username } = this.state;
        const isInvalid = !name || !imageUrl || !category || !description || !instructions || !username;
        return isInvalid;
    }

    // with this, we add our new inserted recipe to the apollo client cache manually, and then we are able to use this data
    updateCache = (cache, { data: { addRecipe } }) => {
        const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });
        cache.writeQuery({
            query: GET_ALL_RECIPES,
            data: {
                getAllRecipes: [addRecipe, ...getAllRecipes]
            }
        });
    }
    
    render() {
        const { username } = this.state;
        return (
            <Mutation 
                mutation={ADD_RECIPE} 
                variables={this.state} 
                update={this.updateCache} 
                refetchQueries={() => [
                    {query: GET_USER_RECIPES, variables:{ username }} // to keep recipes on profile page up-to-date
                ]}>

                { ( addRecipe, {data, loading, error}) => (
                        <div className="App">
                            <h2 className="App">Add Recipe</h2>
                            <form className="form" onSubmit={event => this.handleSubmit(event, addRecipe)}>
                                <input type="text" name="name" placeholder="Recipe Name" onChange={this.handleChange} value={this.state.name} />
                                <input type="text" name="imageUrl" placeholder="Recipe Image" onChange={this.handleChange} value={this.state.imageUrl} />
                                <select name="category" onChange={this.handleChange} value={this.state.category}>
                                    <option value="Breackfast">Breackfast</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Dinner">Dinner</option>
                                    <option value="Snack">Snack</option>
                                </select>
            
                                <input type="text" name="description" placeholder="Add Description" onChange={this.handleChange} value={this.state.description} />
                                <textarea name="instructions" placeholder="Add Instructions" onChange={this.handleChange} value={this.state.instructions}></textarea>
                                <button disabled={loading || this.validateForm()} className="button-primary" type="submit">Submit</button>

                                { error && <Error error={error} /> }

                            </form>
                        </div>
                    )
                }
            </Mutation>
        );
    }
   
};

export default withAuth(session => session && session.getCurrentUser)(withRouter(AddRecipe));