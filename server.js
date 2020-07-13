const {ApolloServer} = require("apollo-server");

const typeDefs = require('./schema')

const mongoose = require('mongoose');



require('dotenv').config({path: 'variables.env'});

const User = require('./models/User');
const Post = require('./models/Post');

mongoose
    .connect(process.env.MONGO_URI,
        {useUnifiedTopology: true}
    )
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));


const server = new ApolloServer({
    typeDefs,
    context: {
        User,
        Post
    }
});

server.listen(4500).then(({url}) => {
    console.log(`Server is listening on ${url}`);
});
