import { gql } from 'apollo-boost';
import { recipeFragments } from './fragments';
// queries like in graphiql

/* RECIPES QUERIES */
export const GET_ALL_RECIPES = gql`
    query{
        getAllRecipes {
            _id
            name
            imageUrl
            category
        }
    }
`;

export const GET_RECIPE = gql`
    query($_id: ID!) {
        getRecipe(_id: $_id) {
            ...CompleteRecipe
        }
    }
    ${recipeFragments.recipe}
`;

export const SEARCH_RECIPES = gql`
    query($searchTerm: String) {
        searchRecipes(searchTerm: $searchTerm) {
            ...CompleteRecipe
        }
    }
    ${recipeFragments.recipe}
`;

/* RECIPES MUTATIONS */

export const ADD_RECIPE = gql`
    mutation( $name: String!, $imageUrl: String!, $description: String!, $category: String!, $instructions: String!, $username: String ) {
        addRecipe( name: $name, imageUrl: $imageUrl, description: $description, category: $category, instructions: $instructions username: $username ) {
            ...CompleteRecipe
        }
    }
    ${recipeFragments.recipe}
`;

export const LIKE_RECIPE = gql`
    mutation( $_id: ID!, $email: String! ) {
        likeRecipe( _id: $_id, email: $email ) {
            ...LikeRecipe
        }
    }
    ${recipeFragments.like}
`;

export const UNLIKE_RECIPE = gql`
    mutation( $_id: ID!, $email: String! ) {
        unlikeRecipe( _id: $_id, email: $email ) {
            ...LikeRecipe
        }
    }
    ${recipeFragments.like}
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