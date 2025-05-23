import React from "react";
import ReactApexChart from "react-apexcharts";

const BarChart = ({
  data,
  title = "",
  xAxisTitle = "X-Axis",
  yAxisTitle = "Y-Axis",
  colors = ["#33b2df", "#546E7A", "#d4526e", "#13d8aa", "#A5978B", "#2b908f", "#f9a3a4", "#90ee7e", "#f48024", "#69d2e7"],
  showLegend = true,
  legendPosition = "top",
  showDataLabels = false,
  tooltipFormat = (value) => value,
  yAxisMin = 0,
  yAxisMax = null,
  yAxisStepSize = null,
  onClickBar,
  width = "100%",
  height = "380px",
  horizontal = false,
  borderRadius = 4,
  borderRadiusApplication = 'end',
}) => {
  // Calculate dynamic axis scaling if not provided
  const maxValue = Math.max(...data.map(item => item.value), 0);
  
  // Function to get the appropriate power-of-5 step
  const getPowerOf5Step = (value) => {
    if (value === 0) return 5;
    const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
    return 5 * (magnitude / 10); // Returns 5, 50, 500, etc.
  };

  // Calculate step size first
  const stepSize = yAxisStepSize !== null ? 
    Math.max(5, Math.round(yAxisStepSize)) : 
    getPowerOf5Step(maxValue);

  // Calculate max value that's just enough to show all data
  const calculateTightMax = () => {
    const rawMax = Math.max(...data.map(item => item.value), 0);
    const stepsAbove = Math.ceil(rawMax / stepSize);
    return stepsAbove * stepSize;
  };

  const calculatedMax = yAxisMax !== null ? yAxisMax : calculateTightMax();

  // Prepare series data
  const series = [{
    name: "Values",
    data: data.map(item => ({
      x: item.label,
      y: item.value
    }))
  }];

  // Chart options
  const options = {
    chart: {
      type: 'bar',
      height: parseInt(height.replace('px', '')), 
      events: {
        click: function(event, chartContext, config) {
          if (onClickBar && config.dataPointIndex !== undefined) {
            onClickBar(data[config.dataPointIndex]);
          }
        }
      }
    },
    plotOptions: {
      bar: {
        horizontal: horizontal,
        borderRadius: borderRadius,
        borderRadiusApplication: borderRadiusApplication,
        dataLabels: {
          position: 'center'
        },
      }
    },
    colors: colors,
    dataLabels: {
      enabled: showDataLabels,
      formatter: function(val) {
        return tooltipFormat(val);
      }
    },
    xaxis: {
      categories: horizontal ? undefined : data.map(item => item.label),
      title: {
        text: horizontal ? yAxisTitle : xAxisTitle
      }
    },
    yaxis: {
      min: yAxisMin,
      max: calculatedMax,
      tickAmount: Math.ceil((calculatedMax - yAxisMin) / stepSize),
      forceNiceScale: true,
      title: {
        text: horizontal ? xAxisTitle : yAxisTitle
      },
      labels: {
        formatter: function(val) {
          return val.toLocaleString();
        }
      },
      categories: horizontal ? data.map(item => item.label) : undefined,
    },
    legend: {
      position: legendPosition,
      show: showLegend
    },
    title: {
      text: title,
      align: 'center',
      style: {
        fontSize: '16px'
      }
    }
  };

  return (
    <div style={{ width, height }}>
      <ReactApexChart 
        options={options} 
        series={series} 
        type="bar" 
        height={height.replace('px', '')} 
      />
    </div>
  );
};

export default BarChart;