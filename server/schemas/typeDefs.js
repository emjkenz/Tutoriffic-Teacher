const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Quiz {
    id: String
    title: String
    description: String
    questions: [Questions]!
  }

  type Questions {
    question: String
    answers: [String]!
  }

  input QuizInput {
    id: String!
    title: String!
    description: String!
    questions: [QuestionInput!]!
  }

  input QuestionInput {
    question: String!
    answers: [String!]!
  }

  type Query {
    quizes: [Quiz]!
    quiz(QuizId: ID!): Quiz
  }

  type Mutation {
    saveQuiz(quizData: QuizInput!): Quiz
  }
`;

module.exports = typeDefs;
