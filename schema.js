const {gql} = require('apollo-server');
const typeDefs = gql`
    type User {
        _id: ID
        username: String!
        email: String!
        avatar: String
        joinDate: String
        favorites: [Post]
    }

    type Post {
        title: String!
        imageUrl: String!
        categories: [String]!
        description: String!
        createdDate: String
        likes: Int
        createBy: User!
        message:[Message]
    }

    type Message {
        _id: ID
        messageBody: String!
        messageDate: String
        messageUser: User!
    }


    type Todo {
        task: String
        completed: Boolean
    }

    type Query {
        getTodos: [Todo]
    }

`;

module.exports = typeDefs;


