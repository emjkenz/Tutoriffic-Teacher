import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from "antd";

const ModuleList = ({ modules, title }) => {
    return (

        <div>
        <h3 className="text-primary">Your Modules</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {modules &&
            modules.map((module) => (
                <div key={module.id} className="content-div" style={{ width: '200px', height: '150px', margin: '10px' }}>
                <Card className="card content-card enlarge" style={{ backgroundColor: module.selectedColor, boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px', width: '100%', height: '100%' }}>
                    <Link
                    to={`/modules/${module.id}`}
                    style={{ color: "#fff", fontSize: "1.5rem", display: 'block', width: '100%', height: '100%', padding: '10px' }}
                    >
                    {module.moduleName}
                    </Link>
                </Card>
                </div>
            ))}
        </div>
        </div>
    );
};

export default ModuleList;