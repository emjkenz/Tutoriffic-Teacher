import React, { useState } from 'react';
import { Avatar, Button } from 'antd';
import { UserOutlined, EditTwoTone } from '@ant-design/icons';
import { SketchPicker } from 'react-color';

const Dashboard = () => {
  const [avatarColor, setAvatarColor] = useState('#1890ff'); // Initial color is set to Ant Design primary color
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleColorChange = (color) => {
    setAvatarColor(color.hex);
  };

  const handleColorPickerVisible = () => {
    setShowColorPicker((prev) => !prev);
  };

  return (
    <div>
      <h2>Dashboard Page</h2>
      <div style={{ marginBottom: 16, position: 'relative', textAlign: 'center'}}>
        <Avatar
          size={100}
          style={{ backgroundColor: avatarColor, cursor: 'pointer' }}
          onClick={handleColorPickerVisible}
          icon={<UserOutlined style={{ fontSize: 64, color: 'white' }} />}
        />
        <div style={{ position: 'absolute', top: 4, right: 4, zIndex: 1 }}>
           <Button
          type="text"
          icon={<EditTwoTone style={{ fontSize: 25, color: '#1890ff' }} />}
          onClick={handleColorPickerVisible}
          style={{ position: 'absolute', top: '30px', right: '30px', zIndex: 1 }}
        />
        </div>
      </div>
      {showColorPicker && (
        <div style={{ width: 200, marginBottom: 16 }}>
          <SketchPicker color={avatarColor} onChange={handleColorChange} />
        </div>
      )}
    </div>

  );
};

export default Dashboard;
