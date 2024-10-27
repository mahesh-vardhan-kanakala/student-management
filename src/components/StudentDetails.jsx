import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { StudentContext } from '../context/StudentContext';

const StudentDetails = () => {
  const { id } = useParams(); 
  const { students, deleteStudent } = useContext(StudentContext); 
  const [student, setStudent] = useState(null); 
  const navigate = useNavigate(); 
  const [responseMessage, setResponseMessage] = useState(""); 


  useEffect(() => {
    const foundStudent = students.find(s => s.id === parseInt(id, 10)); 
    setStudent(foundStudent); 
  }, [id, students]);


  const handleDelete = () => {
    deleteStudent(parseInt(id, 10));
    setResponseMessage("Student deleted successfully!");
    navigate('/students'); 
  };

  if (!student) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="student-details">
      <h1>Student Details</h1>
      <div className="details-card">
        <h2>{student.name}</h2>
        <p><strong>ID:</strong> {student.id}</p>
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Age:</strong> {student.age}</p>
        <p><strong>Class:</strong> {student.class}</p>
        <p><strong>Address:</strong> {student.address}</p>
        <p><strong>Phone Number:</strong> {student.phone}</p>
      </div>
      <div className="actions">
        <Link to="/students" className="action-btn" style={{ marginRight: '10px' }}>Back to List</Link>
        <button onClick={handleDelete} className="action-btn delete-btn">Delete</button>
      </div>
      <h4>{responseMessage}</h4> 
    </div>
  );
};

export default StudentDetails;
