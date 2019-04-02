import React from 'react';
import CKEditor from 'react-ckeditor-component';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import Error from '../Error';
import { ADD_RECIPE, UPDATE_USER_RECIPE, GET_USER_RECIPES, GET_ALL_RECIPES } from '../../queries/index';

const initialState = {
    name: '',
    imageUrl: '',
    category: 'Breakfast',
    description: '',
    instructions: '',
    username: '',
    action: 'add'
}

class FormRecipe extends React.Component {

    state = { ...initialState }

    clearState = () => {
        this.setState({ ...initialState });
    }

    componentDidMount() {
        if (this.props.recipe) {
            this.setState({action: 'edit', ...this.props.recipe.getRecipe})
        } else {
            this.setState({username: this.props.username})
        }
    }

    handleSubmit = (event, addRecipe) => {
        event.preventDefault();
        addRecipe().then(({ data }) => {
            console.log(data);
            this.clearState();
            this.props.history.push('/');
        });
    }

    handleChange = event => {
        const { name, value } = event.target;
        // console.log(name+": "+value);
        this.setState({ [name]: value });
    }

    handleEditorChange = event => {
        const newContent = event.editor.getData();
        this.setState({instructions: newContent});
    }

    validateForm = () => {
        const { name, imageUrl, category, description, instructions, username } = this.state;
        const isInvalid = !name || !imageUrl || !category || !description || !instructions || !username;
        console.log(isInvalid);
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
    
    render(){
        const { username } = this.state;
        { /* we change mutation accrdingly with the current action */ }
        return (
        <Mutation 
            mutation={ this.state.action == 'add' ? ADD_RECIPE : UPDATE_USER_RECIPE} 
            variables={this.state} 
            update={this.updateCache} 
            refetchQueries={() => [
                {query: GET_USER_RECIPES, variables:{ username }} // to keep recipes on profile page up-to-date
            ]}>
            { ( actionRecipe, {data, loading, error}) => (
                <div className="App">
                    <h2 className="App">{ this.state.action == 'add' ? "Add Recipe" : "Edit Recipe" }</h2>
                    <form className="form" onSubmit={event => this.handleSubmit(event, actionRecipe)}>
                        <input type="text" name="name" placeholder="Recipe Name" onChange={this.handleChange} value={this.state.name} />
                        <input type="text" name="imageUrl" placeholder="Recipe Image" onChange={this.handleChange} value={this.state.imageUrl} />
                        <select name="category" onChange={this.handleChange} value={this.state.category}>
                            <option value="Breakfast">Breackfast</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                            <option value="Snack">Snack</option>
                        </select>

                        <input type="text" name="description" placeholder="Add Description" onChange={this.handleChange} value={this.state.description} />
                        <label htmlFor="instructions">Instructions</label>
                        
                        <CKEditor 
                            name="instructions" 
                            content={this.state.instructions}
                            events={{change: this.handleEditorChange}}
                            />

                        {/*<textarea name="instructions" placeholder="Add Instructions" onChange={this.handleChange} value={this.state.instructions}></textarea>*/}
                        <button disabled={loading || this.validateForm()} className="button-primary" type="submit">Submit</button>

                        { error && <Error error={error} /> }

                    </form>
                </div>
                )
            }
        </Mutation>
        );
    }
}

export default withRouter(FormRecipe);