import React, { useState, useEffect } from 'react';
import { Avatar, Button, Row, Col } from 'antd';
import { UserOutlined, EditTwoTone } from '@ant-design/icons';
import { SketchPicker } from 'react-color';


const UserAvatar = () => {
  const storedColor = localStorage.getItem('avatarColor') || '#1890ff';
  const [avatarColor, setAvatarColor] = useState(storedColor);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleColorChange = (color) => {
    setAvatarColor(color.hex);
  };

  const handleColorPickerVisible = () => {
    setShowColorPicker((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem('avatarColor', avatarColor);
  }, [avatarColor]);

  return (
    <div>
      <Row justify="center" gutter={[16, 16]}>
        <Col>
          <Avatar
            size={100}
            style={{ backgroundColor: avatarColor}}
            icon={<UserOutlined style={{ fontSize: 50, color: 'white', cursor: "pointer" }} />}
            onClick={handleColorPickerVisible}
          />
        </Col>
      </Row>
      {showColorPicker && (
        <Row justify="center">
          <Col>
            <SketchPicker color={avatarColor} onChange={handleColorChange} />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default UserAvatar;