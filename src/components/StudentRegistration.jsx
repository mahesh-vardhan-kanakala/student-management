import React, { useState, useContext } from 'react';
import { StudentContext } from '../context/StudentContext'; 
import { useNavigate } from 'react-router-dom'; 
import PropTypes from 'prop-types';

// Error message component
const ErrorMessage = ({ message }) => {
  return <p className="FieldError">{message}</p>;
};

// Prop types validation
ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

const StudentRegistration = () => {
  const { addStudent } = useContext(StudentContext);
  const [student, setStudent] = useState({
    name: '',
    email: '',
    age: '',
    class: '',
    address: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [isTouched, setIsTouched] = useState({
    email: false,
    phone: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({ ...prevStudent, [name]: value }));
    setError(''); // Reset error on input change
  };

  const validateForm = () => {
    const { email, phone } = student;

    if (Object.values(student).some(field => !field)) {
      return 'Please fill in all fields';
    }

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return 'Please enter a valid email';
    }

    // Phone number validation
    const phonePattern = /^\d{10}$/; // Adjust according to your requirements
    if (!phonePattern.test(phone)) {
      return 'Please enter a valid 10-digit phone number';
    }

    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    addStudent(student);
    clearForm();
    navigate('/success'); // Redirect to a success page
  };

  const clearForm = () => {
    setStudent({
      name: '',
      email: '',
      age: '',
      class: '',
      address: '',
      phone: '',
    });
    setIsTouched({ email: false, phone: false });
  };

  return (
    <div className="student-registration">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h2>Register Student</h2>

          {error && <ErrorMessage message={error} />}
          
          {/** Form Fields */}
          {Object.entries(student).map(([key, value]) => (
            <div className="Field" key={key}>
              <label>
                {key.charAt(0).toUpperCase() + key.slice(1)} {key === 'name' && <sup>*</sup>}
              </label>
              <input
                type={key === 'age' ? 'number' : 'text'}
                name={key}
                value={value}
                onChange={handleChange}
                onBlur={() => setIsTouched((prev) => ({ ...prev, [key]: true }))}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              />
              {isTouched.email && key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && (
                <ErrorMessage message="Please enter a valid email" />
              )}
              {isTouched.phone && key === 'phone' && !/^\d{10}$/.test(value) && (
                <ErrorMessage message="Please enter a valid 10-digit phone number" />
              )}
            </div>
          ))}

          <button type="submit">Register Student</button>
        </fieldset>
      </form>
    </div>
  );
};

export default StudentRegistration;

