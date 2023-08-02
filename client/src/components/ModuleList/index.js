import React from 'react';
import { Link } from 'react-router-dom';

const ModuleList = ({ modules, title }) => {
    return (
        <div>
            <h3 className="text-primary">{title}</h3>
            <div className="flex-row justify-space-between my-4">
                { modules &&
                    modules.map((module) => (
                        <div key={module.id} className="col-12 col-xl-6"style={{ backgroundColor: module.selectedColor, margin: '0.5rem', border: "1.5px solid black" }}>
                            <div style={{padding: "1rem 0"}}>
                                <Link
                                    to={`/modules/${module.id}`}
                                    style={{color: "black"}}
                                >
                                    {module.moduleName}
                                </Link>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ModuleList;