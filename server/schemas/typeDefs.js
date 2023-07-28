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

  type Lesson {
    id: String!
    title: String!
    sections: [Sections]!
  }

  type Sections {
    heading: String!
    subheading: String
    text: String!
  }

  input LessonInput {
    id: String!
    title: String!
    sections: [SectionInput]!
  }

  input SectionInput {
    heading: String!
    subheading: String
    text: String!
  }

  type Query {
    quizzes: [Quiz]
    quiz(id: String!): Quiz
    lessons: [Lesson]
    lesson(id: String!): Lesson
  }

  type Mutation {
    saveQuiz(quizData: QuizInput!): Quiz
    removeQuiz(id: String!): Quiz
    saveLesson(lessonData: LessonInput!): Lesson
  }
`;

module.exports = typeDefs;
