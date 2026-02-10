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

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// We accept 'data' as a prop now
const SkillRadar = ({ data: apiData }) => {
  
  // Dynamic labels and values from the API, with fallbacks
  const labels = apiData?.labels || [
    'Data Structures', 'Web Dev', 'ML', 'Cybersecurity', 'Cloud', 'Soft Skills'
  ];
  
  const userValues = apiData?.values || [0, 0, 0, 0, 0, 0];
  const industryValues = [90, 85, 80, 75, 85, 90]; // Fixed benchmarks

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Your Current Skills',
        data: userValues,
        backgroundColor: 'rgba(59, 130, 246, 0.2)', 
        borderColor: '#3b82f6', 
        borderWidth: 3,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#3b82f6',
      },
      {
        label: 'Industry Standard',
        data: industryValues,
        backgroundColor: 'rgba(244, 63, 94, 0.05)', 
        borderColor: 'rgba(244, 63, 94, 0.4)', 
        borderWidth: 2,
        borderDash: [5, 5], 
        pointRadius: 0, // Keep it clean
      },
    ],
  };

  const options = {
    scales: {
      r: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' }, // Dark mode grid lines
        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
        pointLabels: {
          color: '#94a3b8', // Slate-400 for better readability
          font: { size: 11, weight: '600' }
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: { display: false }
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#cbd5e1', // Slate-300
          usePointStyle: true,
          padding: 20,
          font: { size: 12 }
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full h-full min-h-[350px]">
      <Radar data={data} options={options} />
    </div>
  );
};

export default SkillRadar;