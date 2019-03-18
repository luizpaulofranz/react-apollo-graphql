const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
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
// set cors options, here we use only one allowed origin
const corsOpt = {
    origin: 'http://localhost:3000',
    credentials: true
}
app.use(cors(corsOpt));

// set up JWT authentication middleware
app.use(async (req, res, next) => {
    const token = req.headers['authorization'];
    if (token  !== "null") {
        try {
            const currentUser = await jwt.verify(token, process.env.SECRET);
            req.currentUser = currentUser;
        } catch (err) {
            console.error(err);
        }
    }
    //console.log(token);
    next();
});

// set graphiql tool viwer, wich uses the endpoint seted bellow
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// connect schenas with graphQl
app.use('/graphql', bodyParser.json(), graphqlExpress(({ currentUser }) => ({
        schema: schema,
        // this variables setted here, are visible in our resolver file
        context: {
            Recipe,
            User,
            currentUser
        }
    })
));

// production redirects always to our PWA enter point
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    // to send all requests to client/build/index.html
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 4444;
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}.`);
});