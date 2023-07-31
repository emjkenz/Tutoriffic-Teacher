const { gql } = require('apollo-server-express');
const { userData } =require('./resolvers');

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
    date: String!
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
    date: String!
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

  type Lesson {
    id: String!
    title: String!
    date: String!
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
    date: String!
    sections: [SectionInput]!
  }

  input SectionInput {
    heading: String!
    subheading: String
    text: String!
  }

   type Post {
    id: String!
    title: String!
    text: String!
    comments: [Comments]
  }

  type Comments {
    _id: ID!
    text: String!
  }

  input PostInput {
    id: String!
    title: String!
    text: String!
    comments: [CommentInput]
  }

  input CommentInput {
    text: String!
  }

  type Query {
    quizzes: [Quiz]
    quiz(id: String!): Quiz

    lessons: [Lesson]
    lesson(id: String!): Lesson
    posts: [Post]
    post(id: String!): Post
    commentsByPostId(postId: String!): [Comments!]!
    students: [Student]
    grades: [Grade]
  }
  
  type Mutation {
    saveQuiz(quizData: QuizInput!): Quiz
    removeQuiz(id: String!): Quiz
    saveLesson(lessonData: LessonInput!): Lesson
    removeLesson(id: String!): Lesson
    savePost(postData: PostInput!): Post 
    removePost(id: String!): Post
    addCommentToPost(postId: String!, comment: CommentInput!): Post
    removeCommentFromPost(postId: String!, commentId: ID!): Post
    addUser(userData: UserInput!): AuthPayload
  
  }

`;

module.exports = typeDefs;

