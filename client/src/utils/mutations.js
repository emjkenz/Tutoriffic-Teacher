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
