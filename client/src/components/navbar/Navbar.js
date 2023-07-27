// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import './Navbar.css'

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li className='mainNav'>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className='mainNav'>
          Modules
          <ul className='subList'>
            <li><Link to="/modules">View Modules</Link></li>
            <li><Link to="/modules/add">Add Module</Link></li>
            {/* Add more module options */}
          </ul>
        </li>
        <li className='mainNav'>
          Quizzes
          <ul className='subList'>
            <li><Link to="/quizzes">View Quizzes</Link></li>
            <li><Link to="/quizzes/add">Add Quiz</Link></li>
            {/* Add more dashboard options */}
          </ul>
        </li>
        <li className='mainNav'>
          Students
          <ul className='subList'>
            <li><Link to="/students">View Students</Link></li>
            <li><Link to="/students/grades">View Grades</Link></li>
            {/* Add more dashboard options */}
          </ul>
        </li>
        <li className='mainNav'>
          <Link to="/calendar">Calendar</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;