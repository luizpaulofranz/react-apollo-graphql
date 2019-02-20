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

/* RECIPES MUTATIONS */

/* USER QUERIES */

export const GET_CURRENT_USER = gql`
    query{
        getCurrentUser {
            email
            username
            joinDate
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