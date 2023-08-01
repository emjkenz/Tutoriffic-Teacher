import React from "react";
import UserAvatar from "./Avatar";
import "./dashboard.css";
import "./profileDivider.css"
import { Card } from "antd";
import { CalendarOutlined, MessageOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const ProfileDivider = () => {
  const getCurrentDate = () => {
    const date = new Date();
    const options = { weekday: "long", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-UK", options);
  };

  return (
    <div className="card-container">
          <Card className="card user" title="~username~" style={{ height: "100%"}}>
            <UserAvatar />
          </Card>
          <Card
            className="card image-card"
            cover={
              <img
                alt="online classroom"
                src="../../../assets/profile-image"
                style={{ opacity: 0.7, height: "100%" }}
              />
            }
          ></Card>
            <Link to="/calendar">
          <Card className="card date" href="/calendar" style={{ cursor: 'pointer' }}>
            <CalendarOutlined style={{ fontSize: 20 }} />
            <p className="currentDate">{getCurrentDate()}</p>
          </Card>
          </Link>
             <Link to="/posts">
          <Card className="card" href="/forum" style={{ cursor: 'pointer' }}>
            <MessageOutlined style={{ fontSize: 50, color: "grey" }} />
            </Card>
           </Link>
    </div>
  );
};

export default ProfileDivider;