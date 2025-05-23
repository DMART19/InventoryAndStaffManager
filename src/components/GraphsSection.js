import React, { useState } from "react";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import { Tooltip } from "react-tooltip";
import './GraphSection.css';


const GraphsSection = ({
  id,
  barChartDataOptions = [],
  lineChartDataOptions = [],
  pieChartDataOptions = [],
  barChartTitle = "Bar Chart",
  lineChartTitle = "Line Chart",
  enabledCharts = { barChart: true, pieChart: true, lineChart: true },
  tooltipsEnabled = true,
}) => {
  const [selectedPieChartData, setSelectedPieChartData] = useState(
    pieChartDataOptions[0] || { title: "", data: [] }
  );

  const [selectedBarChartData, setSelectedBarChartData] = useState(
    barChartDataOptions[0] || { title: "", data: [] }
  );

  const [selectedLineChartData, setSelectedLineChartData] = useState(
    lineChartDataOptions[0] || { 
      title: "", 
      data: { labels: [], datasets: [] }, 
      options: {}
    }
  );

  return (
    <div id={id} className="graphs-section">
      {/* Global tooltip configuration */}
      <Tooltip
        id="graphs-tooltip"
        place="top"
        effect="solid"
        delayShow={300}
        className="custom-tooltip"
        border="1px solid rgba(0,0,0,0.1)"
      />
      <Tooltip
        id="chart-select-tooltip"
        place="top"
        effect="solid"
        delayShow={300}
        className="custom-tooltip"
        border="1px solid rgba(0,0,0,0.1)"
      />

      {/* Bar Chart Section */}
      {enabledCharts.barChart && barChartDataOptions.length > 0 && (
        <div className="graph-container">
          <div className="chart-header">
            <h3
              data-tooltip-id="graphs-tooltip"
              data-tooltip-content="Comparison between different categories"
            >
              {barChartTitle}
            </h3>
          </div>
          <div className="chart-controls">
            <label 
              htmlFor="bar-chart-dropdown"
              data-tooltip-id="chart-select-tooltip"
              data-tooltip-content="Select data to display in the bar chart"
            >
              Dataset:
            </label>
            <select
              id="bar-chart-dropdown"
              onChange={(e) =>
                setSelectedBarChartData(
                  barChartDataOptions.find((option) => option.title === e.target.value)
                )
              }
              data-tooltip-id="chart-select-tooltip"
              data-tooltip-content="Available bar chart datasets"
            >
              {barChartDataOptions.map((option) => (
                <option 
                  key={option.title} 
                  value={option.title}
                >
                  {option.title}
                </option>
              ))}
            </select>
          </div>
          <div 
            className="chart-wrapper"
            data-tooltip-id="graphs-tooltip"
            data-tooltip-content="Hover over bars for detailed values"
          >
            <BarChart
              data={selectedBarChartData.data}
              xKey="label"
              yKey="value"
              title={selectedBarChartData.title}
              tooltipsEnabled={tooltipsEnabled}
            />
          </div>
        </div>
      )}

      {/* Pie Chart Section */}
      {enabledCharts.pieChart && pieChartDataOptions.length > 0 && (
        <div className="graph-container">
          <div className="chart-header">
            <h3
              data-tooltip-id="graphs-tooltip"
              data-tooltip-content="Proportional distribution of data"
            >
              Pie Chart
            </h3>
          </div>
          <div className="chart-controls">
            <label 
              htmlFor="pie-chart-dropdown"
              data-tooltip-id="chart-select-tooltip"
              data-tooltip-content="Select data to display in the pie chart"
            >
              Dataset:
            </label>
            <select
              id="pie-chart-dropdown"
              onChange={(e) =>
                setSelectedPieChartData(
                  pieChartDataOptions.find((option) => option.title === e.target.value)
                )
              }
              data-tooltip-id="chart-select-tooltip"
              data-tooltip-content="Available pie chart datasets"
            >
              {pieChartDataOptions.map((option) => (
                <option 
                  key={option.title} 
                  value={option.title}
                >
                  {option.title}
                </option>
              ))}
            </select>
          </div>
          <div 
            className="chart-wrapper"
            data-tooltip-id="graphs-tooltip"
            data-tooltip-content="Hover over segments for detailed percentages"
          >
            <PieChart
              data={selectedPieChartData.data}
              title={selectedPieChartData.title}
              tooltipsEnabled={tooltipsEnabled}
            />
          </div>
        </div>
      )}

      {/* Line Chart Section */}
      {enabledCharts.lineChart && lineChartDataOptions.length > 0 && (
        <div className="graph-container">
          <div className="chart-header">
            <h3
              data-tooltip-id="graphs-tooltip"
              data-tooltip-content="Trends over time"
            >
              {lineChartTitle}
            </h3>
          </div>
          <div className="chart-controls">
            <label 
              htmlFor="line-chart-dropdown"
              data-tooltip-id="chart-select-tooltip"
              data-tooltip-content="Select data to display in the line chart"
            >
              Dataset:
            </label>
            <select
              id="line-chart-dropdown"
              onChange={(e) =>
                setSelectedLineChartData(
                  lineChartDataOptions.find((option) => option.title === e.target.value)
                )
              }
              data-tooltip-id="chart-select-tooltip"
              data-tooltip-content="Available line chart datasets"
            >
              {lineChartDataOptions.map((option) => (
                <option 
                  key={option.title} 
                  value={option.title}
                >
                  {option.title}
                </option>
              ))}
            </select>
          </div>
          <div 
            className="chart-wrapper"
            data-tooltip-id="graphs-tooltip"
            data-tooltip-content="Hover over points for detailed values"
          >
            <LineChart
              data={selectedLineChartData.data}
              isLoading={false}
              title={selectedLineChartData.title}
              options={selectedLineChartData.options}
              tooltipsEnabled={tooltipsEnabled}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GraphsSection;