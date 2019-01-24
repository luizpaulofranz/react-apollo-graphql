const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// to read our env variables file
require('dotenv').config({path: 'variables.env'});

const Recipe = require('./models/Recipe');
const User = require('./models/User');

// graphql express middlewares
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

// connects to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB Successfully connected!"))
    .catch( err => console.log(err));

// initialize application
const app = express();
// set graphiql tool viwer, wich uses the endpoint seted bellow
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
// connect schenas with graphQl
app.use('/graphql', bodyParser.json(), graphqlExpress({
        schema: schema,
        context: {
            Recipe,
            User
        }
    }
));

const PORT = process.env.PORT || 4444;
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}.`);
});