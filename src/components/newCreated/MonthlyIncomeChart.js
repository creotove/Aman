import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const MonthlyIncomeChart = ({ data }) => {
  const chartRef = useRef(null);
  console.log(data);
  
  useEffect(() => {
    try {
    if (chartRef.current && data) {
      console.log(data);
      const aggregatedData = data.reduce((acc, curr) => {
        const month = curr.month;
        if (!acc[month]) {
          acc[month] = 0;
        }
        acc[month] += curr.income;
        return acc;
      }, {});

      const labels = Object.keys(aggregatedData);
      const values = Object.values(aggregatedData);
      
      const ctx = chartRef.current.getContext('2d');
      // Ensure previous chart instance is destroyed
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
      
      // Render new chart
      chartRef.current.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Income',
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  } catch (error) {
    console.error("Error in useEffect:", error);
  }
}, [data]);
  

  return <canvas id="monthly-income-chart" ref={chartRef} />;
};

export default MonthlyIncomeChart;
