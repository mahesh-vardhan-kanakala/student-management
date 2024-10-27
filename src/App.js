import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navigation from './components/Navigation'; 
import Dashboard from './components/Dashboard';
import StudentList from './components/StudentList';
import StudentRegistration from './components/StudentRegistration';
import StudentDetails from './components/StudentDetails';
import StudentEdit from './components/StudentEdit';
import { StudentProvider } from './context/StudentContext'; 

function App() {
  return (
    <StudentProvider>
      <Router>
        <div className="App">
          <Navigation />
          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/register" element={<StudentRegistration />} />
            <Route path="/students/:id" element={<StudentDetails />} />
            <Route path="/edit/:id" element={<StudentEdit />} />
          </Routes>
        </div>
      </Router>
    </StudentProvider>
  );
}

export default App;
