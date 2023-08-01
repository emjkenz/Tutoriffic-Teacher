import React from "react";
import "./dashboard.css";
import "./contentDivider.css";
import { Card } from "antd";
import onlineClassroomContent from '../../assets/content-image.jpg'

const ContentDivider = () => {
  return (
    <div className="card-container">
      <Card
        className="card image-card"
        cover={
          <img
            alt="online classroom"
            src={onlineClassroomContent}
            style={{ opacity: 0.7 }}></img>
        }></Card>
      <Card className="heading-card">
        <h2>Your Lessons</h2>
      </Card>
      <div className="content-div">
        <Card className="card content-card">
          <h3>lesson 1</h3>
        </Card>
        <Card className="card content-card">
          <h3>lesson 2</h3>
        </Card>
      </div>
      <Card className="heading-card">
        <h2>Your Quizzes</h2>
      </Card>
      <div className="content-div">
      <Card className="card content-card">
        <h3>quiz 1</h3>
      </Card>
      <Card className="card content-card">
        <h3>quiz 2</h3>
      </Card>
      </div>
    </div>
  );
};

export default ContentDivider;
