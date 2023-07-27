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
    dueDate
    questions {
      question
      answers
    }
  }
}
`;

export const QUERY_STUDENTS = gql`
  query GetStudents {
    students {
      id
      firstName
      lastName
      dateOfBirth
      schoolingLevel
      parentGuardian
      contact
      additionalInfo
    }
  }
`;