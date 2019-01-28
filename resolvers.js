exports.resolvers = {
    
    Query: {
        getAllRecipes: async ( root, args, { Recipe }) => {
            const recipes = await Recipe.find();
            return recipes;
        }
    },

    Mutation: {
        // last argument is context argument
        addRecipe: async (root, { name, description, category, instructions, username}, { Recipe } ) => 
        {
            const newRecipe = await new Recipe({
                name,
                description,
                category,
                instructions,
                username
            }).save();
            
            return newRecipe;
        }
    }

};