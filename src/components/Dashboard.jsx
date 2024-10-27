import React, { useContext } from 'react';
import { StudentContext } from '../context/StudentContext';
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


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { students } = useContext(StudentContext);

  // Calculate total students and class distribution
  const totalStudents = students.length;
  const classDistribution = students.reduce((acc, student) => {
    const studentClass = student.class || 'Unassigned';
    acc[studentClass] = (acc[studentClass] || 0) + 1;
    return acc;
  }, {});

  // Define data for Bar chart
  const chartData = {
    labels: Object.keys(classDistribution),
    datasets: [
      {
        label: 'Number of Students',
        data: Object.values(classDistribution),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Student Distribution by Class',
      },
    },
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

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
        <Bar data={chartData} options={chartOptions} />
      </div>

      <div className="button-container">
        <a href="/students" className="btn">View All Students</a>
      </div>
    </div>
  );
};

export default Dashboard;
