import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  QUERY_STUDENTS,
  QUERY_ALLQUIZZES,
  QUERY_GRADES,
} from "../../utils/queries";
import { Collapse } from "antd";

const { Panel } = Collapse;

const Grades = () => {
  const { loading: loadingStudents, data: studentData } =
    useQuery(QUERY_STUDENTS);
  const { loading: loadingQuizzes, data: quizData } =
    useQuery(QUERY_ALLQUIZZES);
  const { loading: loadingGrades, data: gradeData } = useQuery(QUERY_GRADES);

  const findGrade = (studentId, quizId) => {
    const grade = grades.find(
      (grade) => grade.student.id === studentId && grade.quiz.id === quizId
    );
    return grade ? grade.grade : undefined;
  };

  const students = studentData?.students || [];
  const quizzes = quizData?.quizzes || [];
  const grades = gradeData?.grades || [];

  const [openPanel, setOpenPanels] = useState([]);

  const panelChange = (keys) => {
    setOpenPanels(keys);
  };

  if (loadingStudents || loadingQuizzes || loadingGrades) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <h2>Student Grades</h2>
        <div>
          <Collapse defaultActiveKey={openPanel} onChange={panelChange}>
            {students.map((student) => (
              <Panel
                key={student.id}
                header={`${student.firstName} ${student.lastName}`}>
                <ul className="studentInfo">
                  {quizzes.map((quiz) => {
                    const grade = findGrade(student.id, quiz.id);
                    return (
                      <li key={quiz.id}>
                        <p>{quiz.title}</p>
                        <p>
                          {grade !== undefined
                            ? `${grade}/${quiz.length}`
                            : "N/A"}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </Panel>
            ))}
          </Collapse>
        </div>
      </div>
    );
  }
};

export default Grades;
