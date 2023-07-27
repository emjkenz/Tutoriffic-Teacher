import { gql } from '@apollo/client';

export const SAVE_QUIZ = gql`
  mutation saveQuiz($quizData: QuizInput!) {
    saveQuiz(quizData: $quizData) {
      id
      title
      description
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
      questions {
        question
        answers
      }
    }
  }
`;
