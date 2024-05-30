"use client";
import { useEffect } from 'react';
import Chart from 'chart.js/auto';

const ChartScript = () => {
  useEffect(() => {
    const loadChart = () => {
      const ctx1 = document.getElementById("chart-line").getContext("2d");
    
      if (!ctx1) return;
    
      // Destroy previous chart instance if it exists
      if (window.myChart) {
        window.myChart.destroy();
      }
    
      const gradientStroke1 = ctx1.createLinearGradient(0, 230, 0, 50);
      gradientStroke1.addColorStop(1, 'rgba(94, 114, 228, 0.2)');
      gradientStroke1.addColorStop(0.2, 'rgba(94, 114, 228, 0.0)');
      gradientStroke1.addColorStop(0, 'rgba(94, 114, 228, 0)');
    
      window.myChart = new Chart(ctx1, {
        type: 'line',
        data: {
          labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Mobile apps',
              tension: 0.4,
              borderWidth: 0,
              pointRadius: 0,
              borderColor: '#5e72e4',
              backgroundColor: gradientStroke1,
              borderWidth: 3,
              fill: true,
              data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
              maxBarThickness: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          interaction: {
            intersect: false,
            mode: 'index',
          },
          scales: {
            y: {
              grid: {
                drawBorder: false,
                display: true,
                drawOnChartArea: true,
                drawTicks: false,
                borderDash: [5, 5],
              },
              ticks: {
                display: true,
                padding: 10,
                color: '#fbfbfb',
                font: {
                  size: 11,
                  family: 'Open Sans',
                  style: 'normal',
                  lineHeight: 2,
                },
              },
            },
            x: {
              grid: {
                drawBorder: false,
                display: false,
                drawOnChartArea: false,
                drawTicks: false,
                borderDash: [5, 5],
              },
              ticks: {
                display: true,
                color: '#ccc',
                padding: 20,
                font: {
                  size: 11,
                  family: 'Open Sans',
                  style: 'normal',
                  lineHeight: 2,
                },
              },
            },
          },
        },
      });
    };
    

    // Check if window is defined before executing client-side code
    if (typeof window !== 'undefined') {
      loadChart();

      // Initialize scrollbar if applicable
      const win = navigator.platform.indexOf('Win') > -1;
      if (win && document.querySelector('#sidenav-scrollbar')) {
        const options = {
          damping: '0.5',
        };
        Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options);
      }
    }
  }, []); // No dependencies, runs only once after initial render

  return null; // Return null since this component doesn't render any DOM elements
};

export default ChartScript;
