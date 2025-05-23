import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Spinner } from "react-bootstrap";

const LineChart = ({ data, isLoading, title }) => {
  // Color palette for the chart
  const colorPalette = [
    "#4e79a7", // Blue
    "#f28e2c", // Orange
    "#e15759", // Red
    "#76b7b2", // Teal
    "#59a14f", // Green
    "#edc949", // Yellow
    "#af7aa1", // Purple
    "#ff9da7", // Pink
    "#9c755f", // Brown
    "#bab0ab", // Gray
  ];

  // Prepare series data for ApexCharts
  const series = data.datasets.map((dataset, index) => ({
    name: dataset.label,
    data: dataset.data,
    color: dataset.borderColor || colorPalette[index % colorPalette.length],
  }));

  // ApexCharts configuration
  const chartOptions = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false
        }
      }
    },
    colors: colorPalette,
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    markers: {
      size: 6,
      strokeWidth: 0,
      hover: {
        size: 8
      }
    },
    dataLabels: {
      enabled: false
    },
    title: {
      text: title || "Trend Analysis",
      align: 'left',
      style: {
        fontSize: '18px',
        fontFamily: 'Arial, sans-serif',
        color: '#333'
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
      fontSize: '14px',
      fontFamily: 'Arial, sans-serif',
      labels: {
        colors: '#333',
        useSeriesColors: false
      },
      markers: {
        width: 12,
        height: 12,
        radius: 12,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5
      }
    },
    xaxis: {
      categories: data.labels,
      labels: {
        style: {
          colors: '#666',
          fontSize: '12px',
          fontFamily: 'Arial, sans-serif',
        }
      },
      title: {
        text: 'Time',
        style: {
          color: '#333',
          fontSize: '14px',
          fontFamily: 'Arial, sans-serif',
        }
      },
      axisBorder: {
        show: true,
        color: '#e9e9e9',
      },
      axisTicks: {
        show: true,
        color: '#e9e9e9',
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#666',
          fontSize: '12px',
          fontFamily: 'Arial, sans-serif',
        },
        formatter: function(value) {
          return value + "%";
        }
      },
      title: {
        text: 'Progress (%)',
        style: {
          color: '#333',
          fontSize: '14px',
          fontFamily: 'Arial, sans-serif',
        }
      },
      min: 0,
      tickAmount: 10,
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      },
      borderColor: '#e9e9e9'
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
      },
      y: {
        formatter: function(value) {
          return value + "%";
        }
      }
    },
    responsive: [{
      breakpoint: 768,
      options: {
        chart: {
          height: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  return (
    <div className="line-chart-container" style={{ width: "100%", height: "100%", position: "relative" }}>
      {isLoading ? (
        <div className="loading-spinner">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <ReactApexChart 
          options={chartOptions} 
          series={series} 
          type="line" 
          height={350} 
        />
      )}
    </div>
  );
};

export default LineChart;