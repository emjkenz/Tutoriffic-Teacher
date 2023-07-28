import { gql } from "@apollo/client";

export const SAVE_QUIZ = gql`
  mutation saveQuiz($quizData: QuizInput!) {
    saveQuiz(quizData: $quizData) {
      id
      title
      description
      dueDate
      questions {
        question
        answers
      }
    }
  }
`;

export const DELETE_QUIZ = gql`
  mutation removeQuiz($removeQuizId: String!) {
    removeQuiz(id: $removeQuizId) {
      id
      title
      description
      dueDate
      questions {
        question
        answers
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const SAVE_LESSON = gql `
  mutation saveLesson($lessonData: LessonInput!) {
    saveLesson(lessonData: $lessonData) {
      id
      title
      sections {
        heading
        subheading
        text
      }
    }
  }
`;

export const DELETE_LESSON = gql `
  mutation removeLesson($removeLessonId: String!) {
    removeLesson(id: $removeLessonId) {
      id
      title
      sections {
        heading
        subheading
        text
      }
    }
  }
`;
