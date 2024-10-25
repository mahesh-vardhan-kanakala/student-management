import React, { useContext } from 'react';
import { StudentContext } from '../context/StudentContext'; 
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2'; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register scales and elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { students } = useContext(StudentContext);

  const totalStudents = students.length;
  const classDistribution = students.reduce((acc, student) => {
    acc[student.class] = (acc[student.class] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(classDistribution),
    datasets: [
      {
        label: 'Students per Class',
        data: Object.values(classDistribution),
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  return (
    <div className="dashboard">
      {/* Navigation Bar */}
      <div className="stats">
        <div className="stat-card">
          <h2>Total Students</h2>
          <p>{totalStudents}</p>
        </div>
        <div className="stat-card">
          <h2>Total Classes</h2>
          <p>{Object.keys(classDistribution).length}</p>
        </div>
      </div>
      <div className="chart">
        <h2>Students per Class</h2>
        <Bar data={chartData} />
      </div>
      <Link to="/students" className="btn">View All Students</Link>
    </div>
  );
};

export default Dashboard;
