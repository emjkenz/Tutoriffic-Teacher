const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Quiz {
    id: String!
    title: String!
    description: String
    dueDate: String!
    questions: [Questions]!
  }

  type Questions {
    question: String!
    answers: [String]!
  }

  input QuizInput {
    id: String!
    title: String!
    description: String
    dueDate: String!
    questions: [QuestionInput!]!
  }

  input QuestionInput {
    question: String!
    answers: [String!]!
  }

  type Query {
    quizzes: [Quiz]
    quiz(id: String!): Quiz
  }

  type Mutation {
    saveQuiz(quizData: QuizInput!): Quiz
    removeQuiz(id: String!): Quiz
    addUser(userData: UserInput!): AuthPayload
  }
`;

module.exports = typeDefs;

