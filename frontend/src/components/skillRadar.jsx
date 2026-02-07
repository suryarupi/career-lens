import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

// Registering the Chart.js modules
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SkillRadar = () => {
  const data = {
    labels: [
      'Data Structures', 
      'Web Development', 
      'Machine Learning', 
      'Cybersecurity', 
      'Cloud Computing', 
      'Soft Skills'
    ],
    datasets: [
      {
        label: 'Your Current Skills',
        data: [85, 60, 40, 30, 50, 75], // These will come from your Backend/AI later
        backgroundColor: 'rgba(59, 130, 246, 0.2)', // Light Blue
        borderColor: '#3b82f6', // Bright Blue
        borderWidth: 3,
        pointBackgroundColor: '#3b82f6',
      },
      {
        label: 'Industry Standard',
        data: [90, 85, 80, 75, 85, 90], // Target benchmarks
        backgroundColor: 'rgba(244, 63, 94, 0.1)', // Light Red/Rose
        borderColor: '#f43f5e', // Rose Red
        borderWidth: 2,
        borderDash: [5, 5], // Dotted line for the "Target"
        pointBackgroundColor: '#f43f5e',
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: { display: true },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: { stepSize: 20, display: false }
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    maintainAspectRatio: false,
  };

  return <Radar data={data} options={options} />;
};

export default SkillRadar;