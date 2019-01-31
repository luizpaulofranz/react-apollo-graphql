import { gql } from 'apollo-boost';

// queries like in graphiql
export const GET_ALL_RECIPES = gql`
    query{
        getAllRecipes {
            name
            description
            instructions
            category
            likes
            createdDate
        }
    }
`;