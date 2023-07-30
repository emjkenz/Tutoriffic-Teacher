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
  }

  type Mutation {
    saveQuiz(quizData: QuizInput!): Quiz
    removeQuiz(id: String!): Quiz
    saveLesson(lessonData: LessonInput!): Lesson
    removeLesson(id: String!): Lesson
    savePost(postData: PostInput!): Post 
    removePost(id: String!): Post
    addCommentToPost(postId: String!, comment: CommentInput!): Post
  }
`;

module.exports = typeDefs;
