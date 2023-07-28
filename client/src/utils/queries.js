import { gql } from '@apollo/client';

export const QUERY_ALL_QUIZZES = gql`
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

export const GET_DUE_DATES = gql`
  query {
    quizzes {
      title
      dueDate
    }
  }
`;

export const QUERY_ALL_LESSONS = gql `
  query lessons {
    lessons {
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

export const QUERY_LESSON = gql `
  query lesson($lessonId: String!) {
    lesson(id: $lessonId) {
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