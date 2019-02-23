import React from 'react';

class AddRecipe extends React.Component {
    
    render() {
        return (
            <div className="App">
                <h2 className="App">Add Recipe</h2>
                <form className="form">
                    <input type="text" name="name" placeholder="Recipe Name" onChange={this.handleChange} />
                    
                    <select name="category" onChange={this.handleChange}>
                        <option value="Breackfast">Breackfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Snack">Snack</option>
                    </select>

                    <input type="text" name="description" placeholder="Add Description" onChange={this.handleChange} />
                    <textarea name="instructions" placeholder="Add Instructions" onChange={this.handleChange}></textarea>
                    <button className="button-primary" type="submit">Submit</button>
                </form>
            </div>
        )
    }
   
};

export default AddRecipe;