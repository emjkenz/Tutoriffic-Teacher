import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import QuizCreator from './pages/QuizCreator';
import Quizzes from './pages/Quizzes';
import Quiz from './pages/Quiz'

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<QuizCreator />}
          />
          <Route
            path="/quizzes"
            element={<Quizzes />}
          />
          <Route
            path="/quizzes/:quizId"
            element={<Quiz />}
          />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
