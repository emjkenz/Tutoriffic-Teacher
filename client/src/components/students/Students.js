import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_STUDENTS } from '../../utils/queries';
import { Collapse } from "antd"; 

const { Panel } = Collapse;

const Students = () => {
  const { data } = useQuery(QUERY_STUDENTS);
  
  const students = data?.students || [];

  const [openPanels, setOpenPanels] = useState([]);

   const panelChange = (keys) => {
    setOpenPanels(keys);


  if (!students.length) {
        return <h3>No Students Yet</h3>;
    }
  };

  return (
    <div>
      <h1>Student List</h1>
      <div>
        <Collapse defaultActiveKey={['0']} onChange={panelChange}>
        {students.map((student) => (
           <Panel key={student.id} header={`${student.firstName} ${student.lastName}`}>
              <ul className='studentInfo'>
                <li>Date of Birth: {student.dateOfBirth}</li>
                <li>Schooling Level: {student.schoolingLevel}</li>
                <li>Parent/Guardian: {student.parentGuardian}</li>
                <li>Parent/Guardian Contact Details: {student.contactNumber}</li>
                <li>Additional Student Information: {student.additionalInformation}</li> 
              </ul>
          </Panel>
        ))}
        </Collapse>
      </div>
    </div>
  );

};

export default Students;
