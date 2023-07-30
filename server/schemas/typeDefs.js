const { gql } = require('apollo-server-express');

const typeDefs = gql`
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

  type Student {
    id: String!
    firstName: String!
    lastName: String!
    dateOfBirth: String!
    schoolingLevel: String!
    parentGuardian: String!
    contact: String!
    additionalInformation: String
  }

  input QuizInput {
    id: String!
    title: String!
    description: String
    dueDate: String!
    questions: [QuestionInput!]!
  }

  type Grade {
    id: String!
    student: Student!    
    quiz: Quiz!         
    grade: Float!        
}

  input QuestionInput {
    question: String!
    answers: [String!]!
  }

  type Query {
    quizzes: [Quiz]
    quiz(id: String!): Quiz
    students: [Student]
    grades: [Grade]
  }

  type Mutation {
    saveQuiz(quizData: QuizInput!): Quiz
    removeQuiz(id: String!): Quiz
  }
`;

module.exports = typeDefs;
