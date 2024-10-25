import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { StudentContext } from '../context/StudentContext';

function StudentList() {
  const { students } = useContext(StudentContext);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter students based on the search term
  const filteredStudents = students.filter(student =>
    student?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group students by class
  const groupedStudents = filteredStudents.reduce((acc, student) => {
    const className = student.class || 'Unassigned'; // Group by class name
    if (!acc[className]) {
      acc[className] = [];
    }
    acc[className].push(student);
    return acc;
  }, {});

  const studentKeys = Object.keys(groupedStudents);

  return (
    <div>
      {/* Removed nav section */}

      <input
        type="text"
        placeholder="Search students..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {studentKeys.length > 0 ? (
        studentKeys.map((className) => (
          <section key={className}>
            <h2>Class: {className}</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {groupedStudents[className].map(student => (
                  <tr key={student.id}>
                    <td>{student.name || 'N/A'}</td>
                    <td>{student.email || 'N/A'}</td>
                    <td>
                      <Link to={`/students/${student.id}`}>View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ))
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
}

export default StudentList;
