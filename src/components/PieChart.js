import React from 'react';
import ReactApexChart from 'react-apexcharts';

const PieChart = ({
  data,
  title = 'Inventory Status',
  colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF5733"],
  showLegend = true,
  exportFileName = 'pie-chart'
}) => {
  // Convert data to ApexCharts format
  const series = data.map(item => item.value);
  const labels = data.map(item => item.label);

  // Calculate total for percentage calculations
  const total = series.reduce((sum, value) => sum + value, 0);

  const options = {
    series: series,
    chart: {
      type: 'pie',
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: true
        },
        export: {
          csv: {
            filename: exportFileName,
            headerCategory: 'Category',
            headerValue: 'Value'
          },
          svg: {
            filename: exportFileName,
          },
          png: {
            filename: exportFileName,
          }
        }
      }
    },
    colors: colors,
    labels: labels,
    dataLabels: {
      enabled: true,
      formatter: function(val, { seriesIndex, w }) {
        const percentage = (w.config.series[seriesIndex] / total) * 100;
        return `${Math.round(percentage)}%`;
      },
      style: {
        fontSize: '12px',
        fontWeight: 'bold',
        colors: ['#fff']
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: '#000',
        opacity: 0.45
      }
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      show: showLegend,
      formatter: function(seriesName, opts) {
        const percentage = (opts.w.config.series[opts.seriesIndex] / total) * 100;
        return `${seriesName} - ${Math.round(percentage)}%`;
      },
      itemMargin: {
        horizontal: 8,
        vertical: 4
      },
      markers: {
        width: 12,
        height: 12
      }
    },
    title: {
      text: title,
      align: 'center',
      offsetY: 10,
      style: {
        fontSize: '16px',
        fontWeight: 'bold'
      }
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 300
          },
          legend: {
            position: 'bottom',
            fontSize: '10px',
            markers: {
              width: 8,
              height: 8
            }
          },
          dataLabels: {
            style: {
              fontSize: '10px'
            }
          }
        }
      },
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 250
          },
          legend: {
            fontSize: '8px',
            itemMargin: {
              horizontal: 4,
              vertical: 2
            }
          },
          title: {
            style: {
              fontSize: '14px'
            }
          }
        }
      }
    ],
    tooltip: {
      y: {
        formatter: function(value) {
          const percentage = ((value / total) * 100).toFixed(1);
          return `${value} (${percentage}%)`;
        }
      }
    }
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '300px',
      position: 'relative'
    }}>
      <ReactApexChart 
        options={options} 
        series={options.series} 
        type="pie" 
        height="100%"
      />
    </div>
  );
};

export default PieChart;