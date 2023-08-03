import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from "antd";

const ModuleList = ({ modules, title }) => {
    return (
        <div>
            <h3 className="text-primary">{title}</h3>
            <div className="flex-row justify-space-between my-4">
                { modules &&
                    modules.map((module) => (
                        <div key={module.id} >
                                <div className="content-div">
                                    <Card className="card content-card enlarge" style={{ backgroundColor: module.selectedColor, boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'}}>
                                    <Link
                                        to={`/modules/${module.id}`}
                                        style={{color: "#fff", fontSize: "1.5rem  "}}
                                    >
                                        {module.moduleName}
                                    </Link>
                                    </Card>
                                </div>
                            {/* </div> */}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ModuleList;