const {ApolloServer, gql} = require("apollo-server");

const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

mongoose
    .connect(process.env.MONGO_URI,
        {useUnifiedTopology: true}
    )
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));


const todos = [
    {task: 'wash car', completed: false},
    {task: 'Clean room', completed: true}
];

const typeDefs = gql`

    type Todo {
        task: String
        completed: Boolean
    }
    type Query {
        getTodos: [Todo]
    }
    type Mutation {
        addTodo(task: String, completed: Boolean): Todo
    }
`;




const server = new ApolloServer({
    typeDefs
});

server.listen(4500).then(({url}) => {
    console.log(`Server is listening on ${url}`);
});
