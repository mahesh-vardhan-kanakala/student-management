import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navbar">
      <NavLink 
        to="/" 
        exact 
        className={({ isActive }) => (isActive ? 'active' : '')} 
        aria-current="page"
      >
        Home
      </NavLink>
      <NavLink 
        to="/students" 
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Student List
      </NavLink>
      <NavLink 
        to="/register" 
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Register Student
      </NavLink>
    </nav>
  );
};

export default Navigation;

