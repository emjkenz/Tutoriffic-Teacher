import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_STUDENTS } from '../../utils/queries';

const Students = () => {
  // const { data } = useQuery(QUERY_STUDENTS);
  
  // const students = data?.students || [];

  // if (!students.length) {
  //       return <h3>No Students Yet</h3>;
  //   }

  // const studentClicked = (student) => {
  //   setSelectedStudent(student);
  // };

  // return (
  //   <div>
  //     <h1>Student List</h1>
  //     <ul>
  //       {students.map((student) => (
  //         <li key={student.id}>
  //           {student.firstName} {student.lastName}
  //             <div className='studentInfo'>
  //               <p>Date of Birth: {student.dateOfBirth}</p>
  //               <p>Schooling Level: {student.schoolingLevel}</p>
  //               <p>Parent/Guardian: {student.parentGuardian}</p>
  //               <p>Parent/Guardian Contact Details: {student.contactNumber}</p>
  //               <p>Additional Student Information: {student.additionalInfo}</p> 
  //             </div>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
};

export default Students;
