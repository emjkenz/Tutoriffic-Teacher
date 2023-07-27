import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import QuizCreator from './pages/QuizCreator';
import Login from './pages/login';
import Signup from './pages/signup'; 

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<QuizCreator />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} /> {/* Add the signup route */}
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;


