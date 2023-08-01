import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  UserOutlined,
  BookOutlined,
  CalendarOutlined,
  TeamOutlined,
  ReadOutlined,
  AppstoreOutlined,
  MessageOutlined 
} from "@ant-design/icons";
import "./Navbar.css";

const { SubMenu } = Menu;


const Navbar = () => {
  return (
    <Menu theme="light" mode="horizontal" style={{ lineHeight: "64px"}}>
      <Menu.Item key="/" icon={<UserOutlined />}>
        <Link to="/">Dashboard</Link>
      </Menu.Item>
      <SubMenu key="modules" icon={<AppstoreOutlined />} title="Modules">
        <Menu.Item key="/modules">
          <Link to="/modules">View Modules</Link>
        </Menu.Item>
        <Menu.Item key="/modules/add">
          <Link to="/modules/add">Add Module</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="lessons" icon={<ReadOutlined />} title="Lessons">
        <Menu.Item key="/lessons">
          <Link to="/lessons">View Lessons</Link>
        </Menu.Item>
        <Menu.Item key="/lesson/add">
          <Link to="/lesson/add">Add Lesson</Link>
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
      </SubMenu>
      <Menu.Item key="forum" icon={<MessageOutlined />} title="Forum">
          <Menu.Item key="/posts">
            <Link to="/posts">Forum</Link>
          </Menu.Item>
      </Menu.Item>
      <Menu.Item key="/calendar" icon={<CalendarOutlined />}>
        <Link to="/calendar">Calendar</Link>
      </Menu.Item>
    </Menu>

  );
};

export default Navbar;
