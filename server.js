const {ApolloServer, gql} = require("apollo-server");

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

const resolvers = {
    Query: {
        getTodos: function () {
            return todos
        }
    },
    Mutation: {
        addTodo: (_, args) => {
            const todo = {task: args.task, completed: args.completed};
            todos.push(todo);
            return todo;
        }
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen(4500).then(({url}) => {
    console.log(`Server is listening on ${url}`);
});
