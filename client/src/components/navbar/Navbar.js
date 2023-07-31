

import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { UserOutlined , BookOutlined, CalendarOutlined, TeamOutlined, ReadOutlined } from '@ant-design/icons';
import './Navbar.css';

const { SubMenu } = Menu;

const Navbar = () => {
  return (
    <Menu theme="light" mode="horizontal" style={{ lineHeight: '64px' }}>
      <Menu.Item key="/dashboard" icon={<UserOutlined />}>
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <SubMenu key="modules" icon={<ReadOutlined />} title="Modules">
        <Menu.Item key="/modules">
          <Link to="/modules">View Modules</Link>
        </Menu.Item>
        <Menu.Item key="/modules/add">
          <Link to="/modules/add">Add Module</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="quizzes" icon={<BookOutlined />} title="Quizzes">
        <Menu.Item key="/quizzes">
          <Link to="/quizzes">View Quizzes</Link>
        </Menu.Item>
        <Menu.Item key="/quizzes/add">
          <Link to="/quizzes/add">Add Quiz</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="students" icon={<TeamOutlined />} title="Students">
        <Menu.Item key="/students">
          <Link to="/students">View Students</Link>
        </Menu.Item>
        <Menu.Item key="/students/grades">
          <Link to="/students/grades">View Grades</Link>
        </Menu.Item>

      </li>
           <li className='mainNav'>
          Lessons
          <ul className='subList'>
            <li><Link to="/lessons">View Lessons</Link></li>
            <li><Link to="/lesson/add">Add Lesson</Link></li>
            {/* Add more dashboard options */}
          </ul>
        </li>

      <li className='mainNav'>
          Forum
          <ul className='subList'>
            <li><Link to="/posts">View Posts</Link></li>
            {/* Add more dashboard options */}
          </ul>
        </li>

      </SubMenu>
      <Menu.Item key="/calendar" icon={<CalendarOutlined />}>
        <Link to="/calendar">Calendar</Link>
      </Menu.Item>
    </Menu>

  );
};

export default Navbar;