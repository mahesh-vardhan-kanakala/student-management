import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StudentContext } from '../context/StudentContext';

const StudentEdit = () => {
  const { id } = useParams();
  const { students, updateStudent } = useContext(StudentContext);
  const navigate = useNavigate();

  const student = students.find(s => s.id === parseInt(id, 10));
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    class: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (student) {
      setFormData({
        id: student.id,
        name: student.name,
        email: student.email,
        class: student.class,
        phone: student.phone,
        address: student.address,
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (student) {
      updateStudent(formData); // Ensure updateStudent is defined correctly in your context
      navigate(`/students/${formData.id}`); // Navigate to the new student ID
    }
  };

  if (!student) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Student</h2>
      <div>
        <label htmlFor="id">ID:</label>
        <input
          type="number"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="class">Class:</label>
        <input
          type="text"
          id="class"
          name="class"
          value={formData.class}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <div className="actions-btn">
        <button type="submit" className="action-btn">Update Student</button>
        <button type="button" onClick={() => navigate(`/students/${formData.id}`)} className="action-btn">Cancel</button>
      </div>
    </form>
  );
};

export default StudentEdit;
