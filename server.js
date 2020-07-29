const {ApolloServer} = require("apollo-server");

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');


require('dotenv').config({path: 'variables.env'});

const User = require('./models/User');
const Post = require('./models/Post');

mongoose
    .connect(process.env.MONGO_URI,
        {useUnifiedTopology: true}
    )
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));

const getUser = async token => {
    if (token) {
        try {
            return await jwt.verify(token, process.env.SECRET);
        } catch (err) {
            console.log(err);

        }

    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
        const token = req.headers["authorization"];
        return {User, Post, currentUser: await getUser(token)};
    }
});

server.listen(4500).then(({url}) => {
    console.log(`Server is listening on ${url}`);
});
