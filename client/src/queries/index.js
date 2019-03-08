import { gql } from 'apollo-boost';
// queries like in graphiql

/* RECIPES QUERIES */
export const GET_ALL_RECIPES = gql`
    query{
        getAllRecipes {
            _id
            name
            category
        }
    }
`;

export const GET_RECIPE = gql`
    query($_id: ID!) {
        getRecipe(_id: $_id) {
            _id
            name
            category
            description
            instructions
            createdDate
            likes
            username
        }
    }
`;

export const SEARCH_RECIPES = gql`
    query($searchTerm: String) {
        searchRecipes(searchTerm: $searchTerm) {
            _id
            name
            category
            description
            instructions
            createdDate
            likes
            username
        }
    }
`;

/* RECIPES MUTATIONS */

export const ADD_RECIPE = gql`
    mutation( $name: String!, $description: String!, $category: String!, $instructions: String!, $username: String ) {
        addRecipe( name: $name, description: $description, category: $category, instructions: $instructions username: $username ) {
            _id
            name
            category
            description
            instructions
            createdDate
            likes
        }
    }
`;

export const LIKE_RECIPE = gql`
    mutation( $_id: ID!, $email: String! ) {
        likeRecipe( _id: $_id, email: $email ) {
            _id
            likes
        }
    }
`;

export const DELETE_USER_RECIPE = gql`
    mutation( $_id: ID! ) {
        deleteUserRecipe( _id: $_id ) {
            _id
            name
            category
            description
            instructions
            createdDate
            likes
        }
    }
`;

/* USER QUERIES */

export const GET_CURRENT_USER = gql`
    query{
        getCurrentUser {
            email
            username
            joinDate
            favorites {
                _id
                name
            }
        }
    }
`;

export const GET_USER_RECIPES = gql`
    query( $username: String! ){
        getUserRecipes(username: $username) {
            _id
            name
            likes
        }
    }
`;

/* USER MUTATIONS */
export const SIGNUP_USER = gql `
    mutation($username: String!, $email: String!, $password: String!){
        signUpUser(username: $username, email: $email, password: $password)
        {token}
    }
`;

export const SIGNIN_USER = gql `
    mutation($email: String!, $password: String!){
        signInUser(email: $email, password: $password) {
        token
        }
    }
`;