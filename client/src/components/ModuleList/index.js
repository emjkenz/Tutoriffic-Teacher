import React from 'react';
import { Link } from 'react-router-dom';

const ModuleList = ({ modules, title }) => {
    return (
        <div>
            <h3 className="text-primary">{title}</h3>
            <div className="flex-row justify-space-between my-4">
                { modules &&
                    modules.map((module) => (
                        <div key={module.id} className="col-12 col-xl-6">
                            <div style={{paddingBottom: "1rem"}}>
                                <Link
                                    to={`/modules/${module.id}`}
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