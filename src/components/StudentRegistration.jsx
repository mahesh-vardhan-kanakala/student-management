import React, { useState, useContext } from 'react';
import { StudentContext } from '../context/StudentContext'; 
import { useNavigate } from 'react-router-dom'; 
import PropTypes from 'prop-types';

const ErrorMessage = ({ message }) => {
  return <p className="FieldError">{message}</p>;
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

const StudentRegistration = () => {
  const { addStudent } = useContext(StudentContext);
  const [student, setStudent] = useState({
    ID:'',
    name: '',
    email: '',
    age: '',
    class: '',
    address: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isTouched, setIsTouched] = useState({
    email: false,
    phone: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({ ...prevStudent, [name]: value }));
    setError(''); 
  };

  const validateForm = () => {
    const { email, phone } = student;

    if (Object.values(student).some(field => !field)) {
      return 'Please fill in all fields';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return 'Please enter a valid email';
    }

    const phonePattern = /^\d{10}$/;
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

    addStudent({ ...student });
    clearForm();
    setSuccess('Student registered successfully!');
    setTimeout(() => {
      setSuccess('');
      navigate('/students');
    }, 3000);
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
          {success && <p className="successMessage">{success}</p>}
          
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
                onBlur={() => setIsTouched({ ...isTouched, [key]: true })}
                required={key === 'name'}
              />
              {isTouched[key] && value.length === 0 && <ErrorMessage message="This field is required" />}
            </div>
          ))}

          <div className="button-container" style={{ textAlign: 'right' }}>
            <button type="submit" className="action-btn">Register</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default StudentRegistration;
