import { gql } from '@apollo/client';

export const QUERY_ALLQUIZZES = gql`
  query quizzes {
    quizzes {
      id
      title
    }
  }
`;

export const QUERY_QUIZ = gql`
  query quiz($quizId: String!) {
  quiz(id: $quizId) {
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
