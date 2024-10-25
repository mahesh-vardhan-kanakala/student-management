import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="active" aria-current="page">Dashboard</Link>
      <Link to="/students">Student List</Link>
      <Link to="/register">Register Student</Link>
    </nav>
  );
};

export default Navigation;


