// the objects in models and the ones described here, must expose the same object
exports.typeDefs = `
    
    type Recipe {
        _id: ID
        name: String!
        imageUrl: String!
        category: String!
        description: String!
        instructions: String!
        createdDate: String
        likes: Int
        username: String
    }

    type User {
        _id: ID
        username: String!
        password: String!
        email: String!
        joinDate: String
        favorites: [Recipe]
    }

    type Token {
        token: String!
    }

    type Query {
        getAllRecipes: [Recipe]
        getRecipe(_id: ID!): Recipe
        searchRecipes(searchTerm: String): [Recipe]

        getCurrentUser: User
        getUserRecipes(username: String!): [Recipe]
    }

    type Mutation {
        addRecipe(name: String!, imageUrl: String!, description: String!, category: String!, instructions: String!, username: String): Recipe
        updateUserRecipe(_id: ID!, name: String!, imageUrl: String!, description: String!, category: String!, instructions: String!): Recipe
        deleteUserRecipe(_id: ID): Recipe
        likeRecipe(_id: ID!, email: String!): Recipe
        unlikeRecipe(_id: ID!, email: String!): Recipe

        signUpUser(username: String!, email: String!, password: String!): Token
        signInUser(email: String!, password: String): Token
    }

`;