import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import './App.css'
import Dashboard from './components/dashboard/Dashboard';
import Modules from './components/modules/Modules';
import Quizzes from './components/quizzes/Quizzes';
import QuizCreator from './components/quizzes/QuizCreator';
import Students from './components/students/Students';
import ModuleCreator from './components/modules/ModuleCreator';
import Grades from './components/students/Grades';
import Navbar from './components/navbar/Navbar';

import QuizCreator from './pages/QuizCreator';
import Quizzes from './pages/Quizzes';
import Quiz from './pages/Quiz';
import Login from './pages/login';
import Signup from './pages/signup'; 

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
              <Router>
      <div className='app'>
          <header>
            <h1>TUTORIFFIC</h1>    
          </header>
          <nav><Navbar />            
          </nav>
        <main>
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route path="/modules" element={<Modules/>} />
          <Route path="/modules/add" element={<ModuleCreator />} />
          <Route path="/quizzes" element={<Quizzes/>} />
          <Route path="/quizzes/:quizId" element={<Quiz />} />
          <Route path="/quizzes/add" element={<QuizCreator />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/grades" element={<Grades />} />
          <Route path="/" element={<QuizCreator />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        </main>
      </div>  
    </Router>
    </ApolloProvider>
  );
};

export default App;


