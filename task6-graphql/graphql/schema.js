const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Article{
        _id: ID!
        name: String!
        description: String!
        price: Float!
        discount: Int
    } 
    input ArticleInputData {
        name: String!
        description: String!
        price: Float!
        discount: Int
    }
    type User{
        _id:ID!
        firstName: String!
        lastName: String!
        discount: Int
    }
    input UserInputData{
        firstName: String!
        lastName: String!
        discount: Int
    }
    type Order{
        _id: ID!
        items: [ID!]!
        userId: ID
    }
    input OrderInputData{
        items: [ID!]!
        userId: ID
    }
    type RootQuery {
        allArticles: [Article!]
        discountArticles: [Article!]
        allUsers: [User!]
        allOrders: [Order!]
    }
    type RootMutation {
        createArticle(articleInput:ArticleInputData): Article!
        updateArticle(id: ID!, articleInput:ArticleInputData): Article!
        deleteArticle(id: ID!): Article!
        createUser(userInput:UserInputData): User!
        updateUser(id: ID!, userInput:UserInputData): User!
        createOrder(orderInput: OrderInputData): Order!
        updateOrder(id: ID!, orderInput: OrderInputData!): Order!
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)