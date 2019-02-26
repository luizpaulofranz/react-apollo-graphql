import React from 'react';
import { Mutation } from 'react-apollo';

import { ADD_RECIPE } from '../../queries/index';
import Error from '../Error';

class AddRecipe extends React.Component {

    state = {
        name: '',
        category: 'Breackfast',
        description: '',
        instructions: '',
        username: ''
    }

    componentDidMount() {
        this.setState({ 
            username: this.props.session.getCurrentUser.username
         });
    }

    handleChange = event => {
        const { name, value } = event.target;
        console.log(name+": "+value);
        this.setState({ [name]: value });
    }

    handleSubmit = (event, addRecipe) => {
        event.preventDefault();
        addRecipe().then(({ data }) => {
            console.log(data)
        });
    }

    validateForm = () => {
        const { name, category, description, instructions, username } = this.state;
        const isInvalid = !name || !category || !description || !instructions || !username;
        return isInvalid;
    }
    
    render() {
        return (
            <Mutation mutation={ADD_RECIPE} variables={this.state}>
                { ( addRecipe, {data, loading, error}) => (
                        <div className="App">
                            <h2 className="App">Add Recipe</h2>
                            <form className="form" onSubmit={event => this.handleSubmit(event, addRecipe)}>
                                <input type="text" name="name" placeholder="Recipe Name" onChange={this.handleChange} value={this.state.name} />
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

export default AddRecipe;