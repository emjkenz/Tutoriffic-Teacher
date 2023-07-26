import { gql } from '@apollo/client';

export const QUERY_QUIZ = gql`
  query quiz {
    quizzes {
      id
      description
      title
      questions {
        question
        answers
      }
    }
  }
`;
