import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { StudentContext } from '../context/StudentContext';

function StudentList() {
  const { students, deleteStudent } = useContext(StudentContext);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toString().includes(searchTerm)
  );

  const groupedStudents = filteredStudents.reduce((acc, student) => {
    const className = student.class || 'Unassigned';
    if (!acc[className]) {
      acc[className] = [];
    }
    acc[className].push(student);
    return acc;
  }, {});

  const studentKeys = Object.keys(groupedStudents);

  return (
    <div>
      <input
        type="text"
        placeholder="Search students by name or ID..."
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
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {groupedStudents[className].map(student => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>
                      <Link to={`/students/${student.id}`} className="action-btn">View</Link>
                      <Link to={`/edit/${student.id}`} className="action-btn">Edit</Link>
                      <button onClick={() => deleteStudent(student.id)} className="action-btn delete-btn">Delete</button>
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
