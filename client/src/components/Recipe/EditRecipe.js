import React from 'react';
import { withRouter } from 'react-router-dom';
import CKEditor from 'react-ckeditor-component';

import { Query } from 'react-apollo';
import { GET_RECIPE } from '../../queries/index';
import LikeRecipe from './LikeRecipe';
import Spinner from '../Spinner';
import Error from '../Error';

const initialState = {
    name: '',
    imageUrl: '',
    category: 'Breakfast',
    description: '',
    instructions: '',
    username: ''
}

class EditRecipe extends React.Component {
    
    state = { ...initialState }

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

    render() {

        // the match object comes from withRouter, and allow us to get the URL params
        const { _id } = this.props.match.params; // to get the URL params
        
        return (
            <Query query={GET_RECIPE} variables={{_id}}>
                { ({ data }, loading, error) => {
                    if (loading || !data.getRecipe) return <Spinner />

                    if (error) return <div>Error...</div>

                    return (
                        <div className="App">
                            <h2 className="App">Add Recipe</h2>
                            <form className="form" onSubmit={event => this.handleSubmit(event)}>
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
                    );
                }}
            </Query>
        )
    }
}
    

export default withRouter(EditRecipe);