import React from 'react';
import { Link } from 'react-router-dom';
import studentImage from '../images/student.png'; // Adjust this path as needed

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to the Student Management Portal</h1>
      <img src={studentImage} alt="Students" className="home-image" />
      <p>
        This portal allows you to efficiently manage student records, view class distributions, 
        and monitor important statistics. Navigate to the dashboard to explore data insights, 
        or view and manage individual student details.
      </p>

      <div className="navigation-buttons">
        <Link to="/dashboard" className="btn">Go to Dashboard</Link>
        <Link to="/students" className="btn">View Students</Link>
      </div>
    </div>
  );
};

export default Home;

