const jwt = require('jsonwebtoken');

const createToken = (user, secret, expiresIn) => {
    const { username, email } = user;
    return jwt.sign({ username, email }, secret, { expiresIn });
}

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
        },

        signUpUser: async (root, { username, email, password }, { User } ) => {
            const user = await User.findOne({ email });
            // if already exists
            if (user) {
                throw new Error('User already exists!')
            }
            // create new user
            const newUser = await new User({
                username,
                email,
                password
            }).save();

            return { token: createToken(newUser, process.env.SECRET, "1hr") }
        }
    }

};