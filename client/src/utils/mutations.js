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


export const CREATE_MATCHUP = gql`
  mutation createMatchup($tech1: String!, $tech2: String!) {
    createMatchup(tech1: $tech1, tech2: $tech2) {
      _id
      tech1
      tech2
    }
  }
`;

export const CREATE_VOTE = gql`
  mutation createVote($_id: String!, $techNum: Int!) {
    createVote(_id: $_id, techNum: $techNum) {
      _id
      tech1
      tech2
      tech1_votes
      tech2_votes
    }
  }
`;
