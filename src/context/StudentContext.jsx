import React, { createContext, useState, useEffect } from 'react';
import studentData from '../students.json'; 
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid'; 

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState(() => {

    const savedStudents = localStorage.getItem('students');
    return savedStudents ? JSON.parse(savedStudents) : studentData;
  });

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const addStudent = (newStudent) => {
    const studentWithId = { id: uuidv4(), ...newStudent }; 
    setStudents((prevStudents) => [...prevStudents, studentWithId]);
  };

  const updateStudent = (id, updatedInfo) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, ...updatedInfo } : student
      )
    );
  };

  const deleteStudent = (id) => {
    setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
  };

  return (
    <StudentContext.Provider value={{ students, addStudent, updateStudent, deleteStudent }}>
      {children}
    </StudentContext.Provider>
  );
};

StudentProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
