import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './App.css'
import Dashboard from './components/dashboard/Dashboard';
import Modules from './components/modules/Modules';
import QuizCreator from './components/quizzes/QuizCreator';
import Students from './components/students/Students';
import ModuleCreator from './components/modules/ModuleCreator';
import Grades from './components/students/Grades';
import Navbar from './components/navbar/Navbar';
import Quizzes from './pages/QuizDashboard';
import Quiz from './pages/Quiz';
import LoginPage from './pages/Login'; 
import SignupPage from './pages/Signup'; 
import Calendar from './pages/Calendar'
import LessonCreator from './pages/LessonCreator';
import Lessons from './pages/LessonsDashboard';
import Lesson from './pages/Lesson';
import PostCreator from './pages/PostCreator';
import Posts from './pages/PostDashboard';
import Post from './pages/Post';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="app">
          <header>
            <h1>TUTORIFFIC</h1>
          </header>
          <nav>
            <Navbar />
          </nav>
          <main>
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/modules" element={<Modules/>} />
              <Route path="/modules/add" element={<ModuleCreator />} />
              <Route path="/quizzes" element={<Quizzes/>} />
              <Route path="/quizzes/:quizId" element={<Quiz />} />
              <Route path="/quizzes/add" element={<QuizCreator />} />
              <Route path="/students" element={<Students />} />
              <Route path="/students/grades" element={<Grades />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/lesson/add" element={<LessonCreator />} />
              <Route path="/lessons" element={<Lessons />} />
              <Route path="/lessons/:lessonId" element={<Lesson />} />
              <Route path="/posts/add" element={<PostCreator />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/posts/:postId" element={<Post />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;



