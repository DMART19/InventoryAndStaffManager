import React, { useState, useEffect } from "react";
import SideMenu from "../../components/SideMenu";
import TopNavBar from "../../components/TopNavBar";
import "./Dashboard.css";
import InfoCardsSection from "../../components/InfoCardsSection";
import GraphsSection from "../../components/GraphsSection";
import DataTableSection from "../../components/DataTableSection";
import { Tooltip } from "react-tooltip";
import { FaQuestionCircle } from "react-icons/fa";

const Dashboard = () => {
  // Bar Chart Data Options - Static data for bar charts
  const [barChartDataOptions] = useState([
    {
      title: "Monthly Inventory Levels",
      data: [
        { label: "January", value: 1200 },
        { label: "February", value: 1500 },
        { label: "March", value: 1800 },
        { label: "April", value: 2200 },
        { label: "May", value: 2500 },
        { label: "June", value: 2700 },
      ],
    },
    {
      title: "Monthly Sales Revenue",
      data: [
        { label: "January", value: 50000 },
        { label: "February", value: 55000 },
        { label: "March", value: 62000 },
        { label: "April", value: 57000 },
        { label: "May", value: 90000 },
        { label: "June", value: 85000 },
      ],
    },
  ]);

  // Pie Chart Data Options - Static data for pie charts
  const [pieChartDataOptions] = useState([
    {
      title: "Inventory Status",
      data: [
        { label: "In Stock", value: 60 },
        { label: "Low Stock", value: 20 },
        { label: "Out of Stock", value: 10 },
        { label: "On Order", value: 10 },
      ],
    },
    {
      title: "Order Status",
      data: [
        { label: "Completed", value: 70 },
        { label: "Pending", value: 20 },
        { label: "Cancelled", value: 10 },
      ],
    },
  ]);

  // Line Chart Data Options - Static data for line charts with chart.js configuration
  const [lineChartDataOptions] = useState([
    {
      title: "Weekly Inventory Turnover",
      data: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
        datasets: [
          {
            label: "Inventory Turnover",
            data: [10, 310, 532, 76, 143],
            borderColor: "#4e79a7",
            backgroundColor: "#4e79a720",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 10,
              callback: function (value) {
                return value + "%";
              },
            },
          },
        },
      },
    },
    {
      title: "Weekly Supplier Performance",
      data: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
        datasets: [
          {
            label: "On-Time Deliveries",
            data: [800, 315, 90, 188, 362],
            borderColor: "#e15759",
            backgroundColor: "#e1575920",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              callback: function (value) {
                return value + "%";
              },
            },
          },
        },
      },
    },
  ]);

  // State to manage which charts are enabled/visible
  const [enabledCharts, setEnabledCharts] = useState({
    barChart: true,
    pieChart: true,
    lineChart: true,
  });

  // State to manage the visibility of the chart selection panel
  const [isChartPanelOpen, setIsChartPanelOpen] = useState(false);

  // Load user preferences from local storage on component mount
  useEffect(() => {
    const savedPreferences = JSON.parse(localStorage.getItem("chartPreferences"));
    if (savedPreferences) {
      setEnabledCharts(savedPreferences);
    }
  }, []);

  // Save user preferences to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("chartPreferences", JSON.stringify(enabledCharts));
  }, [enabledCharts]);

  // Toggle chart visibility
  const toggleChart = (chart) => {
    setEnabledCharts((prev) => ({
      ...prev,
      [chart]: !prev[chart],
    }));
  };

  // State to track if the view is mobile
  const [isMobile, setIsMobile] = useState(false);
  
  // State for currently displayed info cards (limited to 8)
  const [selectedInfoCards, setSelectedInfoCards] = useState([
    { label: "Online Staff", key: "onlineStaff", value: "15" },
    { label: "Staff On Leave", key: "staffOnLeave", value: "5" },
    { label: "Training Completion", key: "trainingCompletion", value: "76%" },
    { label: "Active Certifications", key: "activeCertifications", value: "22" },
  ]);

  // All available info cards that can be selected
  const allInfoCards = [
    { label: "Online Staff", key: "onlineStaff", value: "15" },
    { label: "Staff On Leave", key: "staffOnLeave", value: "5" },
    { label: "Training Completion", key: "trainingCompletion", value: "76%" },
    { label: "Active Certifications", key: "activeCertifications", value: "22" },
    { label: "Critical Inventory", key: "criticalInventory", value: "8 Items" },
    { label: "Pending Orders", key: "pendingOrders", value: "3" },
    { label: "Completed Tasks", key: "completedTasks", value: "45" },
    { label: "Inventory Restocking Needed", key: "inventoryRestocking", value: "6 Items" },
    { label: "Ongoing Training Programs", key: "ongoingTraining", value: "3 Programs" },
    { label: "Total Staff", key: "totalStaff", value: "50" },
    { label: "Upcoming Certification Expirations", key: "certExpirations", value: "4 in 30 days" },
    { label: "High-Priority Tasks", key: "highPriorityTasks", value: "7" },
    { label: "Open Calendar Events", key: "openCalendarEvents", value: "10 Events" },
    { label: "Vendor Ratings Above 4.5", key: "vendorRatings", value: "5 Vendors" },
    { label: "Inventory Alerts", key: "inventoryAlerts", value: "12 Alerts" },
    { label: "Tasks Due Today", key: "tasksDueToday", value: "9" },
  ];

  // State for table data
  const [tableData, setTableData] = useState([
    { id: 1, activity: "New staff added", user: "John Doe", timestamp: "2025-02-20 10:15 AM", category: "Staff", status: "Completed" },
    { id: 2, activity: "Inventory restocked", user: "Jane Smith", timestamp: "2025-02-19 3:30 PM", category: "Inventory", status: "Completed" },
    { id: 3, activity: "Training assigned", user: "Alice Johnson", timestamp: "2025-02-18 9:45 AM", category: "Training", status: "Pending" },
    { id: 4, activity: "Task marked as done", user: "Michael Lee", timestamp: "2025-02-17 1:10 PM", category: "Tasks", status: "Completed" },
    { id: 5, activity: "Meeting scheduled", user: "Emma Brown", timestamp: "2025-02-16 4:20 PM", category: "Calendar", status: "Scheduled" },
  ]);

  // Table column configuration
  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Activity", accessor: "activity" },
    { Header: "User", accessor: "user" },
    { Header: "Timestamp", accessor: "timestamp" },
    { Header: "Category", accessor: "category" },
    { 
      Header: "Status", 
      accessor: "status",
      // Custom cell renderer with tooltip
      Cell: ({ value }) => (
        <div className="status-cell-container">
          <span className="status-cell">{value}</span>
          <FaQuestionCircle 
            className="tooltip-icon"
            data-tooltip-id="status-tooltip"
            data-tooltip-content={`Click to change status from ${value}`}
          />
        </div>
      )
    },
  ];

  // Update a row in the table data
  const handleUpdateRow = (row) => {
    const updatedData = tableData.map((item) =>
      item.id === row.id ? row : item
    );
    setTableData(updatedData);
  };

  // Delete a row from the table data
  const handleDeleteRow = (rowId) => {
    const updatedData = tableData.filter((item) => item.id !== rowId);
    setTableData(updatedData);
  };

  // Add an info card to the selected cards (max 8)
  const handleInfoCardSelection = (card) => {
    setSelectedInfoCards((prevCards) => {
      if (prevCards.length < 8) {
        return [...prevCards, card];
      }
      return prevCards;
    });
  };

  // Remove an info card from the selected cards
  const handleInfoCardRemoval = (cardKey) => {
    setSelectedInfoCards((prevCards) =>
      prevCards.filter((card) => card.key !== cardKey)
    );
  };

  // Effect to handle window resize and detect mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="dashboard-container">
      {isMobile ? <TopNavBar /> : <SideMenu />}

      <div className="dashboard-content">
        {/* Global Tooltip Configuration */}
        <Tooltip
          id="dashboard-tooltip"
          place="top"
          effect="solid"
          delayShow={500}
          delayHide={200}
          className="custom-tooltip"
          border="1px solid rgba(0,0,0,0.1)"
        />

        {/* Info Cards Section */}
        <InfoCardsSection
          selectedInfoCards={selectedInfoCards}
          allInfoCards={allInfoCards}
          onCardRemove={handleInfoCardRemoval}
          onCardAdd={handleInfoCardSelection}
        />

        {/* Toggle Button for Chart Selection Panel */}
        <div className="section-header">
          <button
            className="chart-toggle-button"
            onClick={() => setIsChartPanelOpen(!isChartPanelOpen)}
          >
            {isChartPanelOpen ? "Hide Chart Options" : "Show Chart Options"}
          </button>
          <FaQuestionCircle 
            className="tooltip-icon"
            data-tooltip-id="dashboard-tooltip"
            data-tooltip-content="Toggle visibility of chart options panel"
          />
        </div>

        {/* Chart Selection Panel - Conditionally rendered based on isChartPanelOpen */}
        <div className={`chart-selection-panel ${isChartPanelOpen ? "open" : ""}`}>
          <div className="section-header">
            <h3>Select Charts to Display:</h3>
            <FaQuestionCircle 
              className="tooltip-icon"
              data-tooltip-id="dashboard-tooltip"
              data-tooltip-content="Choose which charts to display on your dashboard"
            />
          </div>
          
          {/* Bar Chart Toggle Option */}
          <div className="chart-option">
            <input
              type="checkbox"
              checked={enabledCharts.barChart}
              onChange={() => toggleChart("barChart")}
              id="bar-chart-checkbox"
            />
            <label htmlFor="bar-chart-checkbox">
              Bar Chart
              <FaQuestionCircle 
                className="tooltip-icon"
                data-tooltip-id="dashboard-tooltip"
                data-tooltip-content="Toggle Bar Chart visibility on dashboard"
              />
            </label>
          </div>

          {/* Pie Chart Toggle Option */}
          <div className="chart-option">
            <input
              type="checkbox"
              checked={enabledCharts.pieChart}
              onChange={() => toggleChart("pieChart")}
              id="pie-chart-checkbox"
            />
            <label htmlFor="pie-chart-checkbox">
              Pie Chart
              <FaQuestionCircle 
                className="tooltip-icon"
                data-tooltip-id="dashboard-tooltip"
                data-tooltip-content="Toggle Pie Chart visibility on dashboard"
              />
            </label>
          </div>

          {/* Line Chart Toggle Option */}
          <div className="chart-option">
            <input
              type="checkbox"
              checked={enabledCharts.lineChart}
              onChange={() => toggleChart("lineChart")}
              id="line-chart-checkbox"
            />
            <label htmlFor="line-chart-checkbox">
              Line Chart
              <FaQuestionCircle 
                className="tooltip-icon"
                data-tooltip-id="dashboard-tooltip"
                data-tooltip-content="Toggle Line Chart visibility on dashboard"
              />
            </label>
          </div>
        </div>

        {/* Graphs Section - Displays enabled charts */}
        <div className="section-header">
          <h3>Data Visualization</h3>
          <FaQuestionCircle 
            className="tooltip-icon"
            data-tooltip-id="dashboard-tooltip"
            data-tooltip-content="Interactive charts showing key metrics. Hover over data points for details."
          />
        </div>
        <GraphsSection
          barChartDataOptions={barChartDataOptions}
          pieChartDataOptions={pieChartDataOptions}
          lineChartDataOptions={lineChartDataOptions}
          barChartTitle="Monthly Performance"
          lineChartTitle="Weekly Progress"
          enabledCharts={enabledCharts}
        />

        {/* Data Table Section - Displays recent activities */}
        <div className="section-header">
          <h3>Recent Activities</h3>
          <FaQuestionCircle 
            className="tooltip-icon"
            data-tooltip-id="dashboard-tooltip"
            data-tooltip-content="Recent activities log. Click on rows to edit or delete entries."
          />
        </div>
        <DataTableSection
          columns={columns}
          tableData={tableData}
          onUpdateRow={handleUpdateRow}
          onDeleteRow={handleDeleteRow}
        />
      </div>
    </div>
  );
};

export default Dashboard;