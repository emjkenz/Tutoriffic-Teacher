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
    date
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
      additionalInformation
    }
  }
`;

export const QUERY_GRADES = gql`
query GetGrades {
  grades {
    id
    student {
      id
      firstName
      lastName
    }
    quiz {
      id
      title
    }
    grade
  }
}
`;

export const GET_DUE_DATES = gql`
  query {
    quizzes {
      title
      date
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

export const GET_LESSON_DATES = gql `
  query lessons {
    lessons {
      title
      date
    }
  }
`;

export const QUERY_ALL_POSTS = gql `
  query posts {
    posts {
      id
      title
      text
    }
  } 
`;

export const QUERY_POST = gql `
  query post($postId: String!) {
    post(id: $postId) {
      id
      title
      text
      comments {
        _id
        text
      }
    }
  }
`;

export const QUERY_COMMENTS_BY_POST = gql`
  query post($postId: String!) {
    post(id: $postId) {
      comments {
        _id
        text
      }
    }
  }
`;

export const QUERY_LOGEDIN = gql `
  query loggedInUser {
    loggedInUser {
      firstName
      lastName
    }
  }
`;