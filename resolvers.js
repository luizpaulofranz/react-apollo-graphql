const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (user, secret, expiresIn) => {
    const { username, email } = user;
    return jwt.sign({ username, email }, secret, { expiresIn });
}

exports.resolvers = {
    
    Query: {
        getAllRecipes: async ( root, args, { Recipe }) => {
            const recipes = await Recipe.find();
            return recipes;
        },

        getRecipe: async (root, { _id }, { Recipe }) => {
            const recipe = await Recipe.findOne({ _id }).exec(); 
            return recipe;
        },
        
        getCurrentUser: async (root, args, { currentUser, User }) => {
            if (!currentUser) {
                return null;
            }
            const user = await User.findOne({email: currentUser.email})
            // to populate the Favorite field of this user
            .populate({
                path: 'favorites',
                model: 'Recipe'
            });
            return user;
        }
    },

    Mutation: {
        // first argument is always root, second is our variables and last argument is context argument, Context is a model
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
        },

        signInUser: async (root, { email, password }, { User } ) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('User not found!')
            }
            // to check encrypted password
            const isValidPass = await bcrypt.compare(password, user.password);
            if (!isValidPass) {
                throw new Error('Invalid password!');
            }
            return { token: createToken(user, process.env.SECRET, "1hr") }
        }
    }

};