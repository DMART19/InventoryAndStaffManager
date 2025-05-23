import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import validator from 'validator';
import SideMenu from '../../components/SideMenu';
import TopNavBar from '../../components/TopNavBar';
import DataTable from '../../components/DataTable';
import GraphsSection from '../../components/GraphsSection';
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import './Inventory.css';

/**
 * Sample inventory data for initial state
 * @type {Array<Object>}
 */
const sampleInventoryData = [
  {
    id: 1,
    name: 'Gloves',
    category: 'Medical Supplies',
    quantity: 100,
    vendor: 'HealthCorp',
    purchaseDate: '2023-01-10',
    status: 'In Stock',
    photo: 'https://via.placeholder.com/100',
    minStockLevel: 50,
    maxStockLevel: 200,
    location: 'Warehouse A',
  },
  {
    id: 2,
    name: 'Syringes',
    category: 'Medical Supplies',
    quantity: 200,
    vendor: 'MediEquip',
    purchaseDate: '2023-02-15',
    status: 'Low Stock',
    photo: 'https://via.placeholder.com/100',
    minStockLevel: 100,
    maxStockLevel: 500,
    location: 'Warehouse B',
  },
];

/**
 * Column configurations for the main inventory table
 * @type {Array<Object>}
 */
const allColumns = [
  { 
    Header: 'Photo', 
    accessor: 'photo', 
    Cell: ({ value }) => <img src={value} alt="Item" className="item-photo" /> 
  },
  { Header: 'Name', accessor: 'name' },
  { Header: 'Category', accessor: 'category' },
  { Header: 'Quantity', accessor: 'quantity' },
  { Header: 'Vendor', accessor: 'vendor' },
  { Header: 'Purchase Date', accessor: 'purchaseDate' },
  { Header: 'Status', accessor: 'status' },
  { Header: 'Min Stock Level', accessor: 'minStockLevel' },
  { Header: 'Max Stock Level', accessor: 'maxStockLevel' },
  { Header: 'Location', accessor: 'location' },
];

/**
 * Column configurations for stock alerts table
 * @type {Array<Object>}
 */
const stockAlertColumns = [
  { Header: 'Item ID', accessor: 'itemId' },
  { Header: 'Item Description', accessor: 'itemDescription' },
  { Header: 'Quantity on Hand', accessor: 'quantityOnHand' },
  { Header: 'Alert Level', accessor: 'alertLevel' },
  { Header: 'Restock Priority', accessor: 'restockPriority' },
  { Header: 'Supplier Lead Time', accessor: 'supplierLeadTime' },
  { Header: 'Date', accessor: 'date' },
  { Header: 'Last Restocked', accessor: 'lastRestocked' },
  { Header: 'Stock Value', accessor: 'stockValue' },
];

/**
 * Column configurations for maintenance logs table
 * @type {Array<Object>}
 */
const maintenanceLogColumns = [
  { Header: 'Item ID', accessor: 'itemId' },
  { Header: 'Item Description', accessor: 'itemDescription' },
  { Header: 'Log', accessor: 'log' },
  { Header: 'Date', accessor: 'date' },
  { Header: 'Technician', accessor: 'technician' },
  { Header: 'Maintenance Type', accessor: 'maintenanceType' },
  { Header: 'Maintenance Cost', accessor: 'maintenanceCost' },
  { Header: 'Downtime', accessor: 'downtime' },
  { Header: 'Next Scheduled Maintenance', accessor: 'nextScheduledMaintenance' },
  { Header: 'Warranty Status', accessor: 'warrantyStatus' },
];

/**
 * Column configurations for check-in/out table
 * @type {Array<Object>}
 */
const checkInOutColumns = [
  { Header: 'Item ID', accessor: 'itemId' },
  { Header: 'Action', accessor: 'action' },
  { Header: 'Quantity', accessor: 'quantity' },
  { Header: 'Staff Member', accessor: 'staffMember' },
  { Header: 'Date', accessor: 'date' },
];

/**
 * Column configurations for activity feed table
 * @type {Array<Object>}
 */
const activityFeedColumns = [
  { Header: 'Activity', accessor: 'activity' },
  { Header: 'Date', accessor: 'date' },
  { Header: 'Initiated By', accessor: 'initiatedBy' },
  { Header: 'Details', accessor: 'details' },
];

/**
 * Dummy data for activity feed
 * @type {Array<Object>}
 */
const dummyActivityFeed = [
  { 
    id: 1, 
    activity: 'Assigned new task: Inventory Review', 
    date: '2024-02-02', 
    initiatedBy: 'Admin', 
    details: 'Review inventory levels for Q1' 
  },
  { 
    id: 2, 
    activity: 'Restocked: Gloves', 
    date: '2024-01-15', 
    initiatedBy: 'System', 
    details: 'Gloves restocked to 200 units' 
  },
];

/**
 * Staff members for dropdown selections
 * @type {Array<Object>}
 */
const staffMembers = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Alice Johnson' },
];

/**
 * Validates inventory input data
 * @param {Object} data - The inventory item data to validate
 * @returns {Object} - Object containing validation errors
 */
const validateInventoryInput = (data) => {
  const errors = {};

  if (!data.name || !validator.isLength(data.name, { min: 2, max: 50 })) {
    errors.name = 'Name must be between 2 and 50 characters.';
  }

  if (!data.category || !validator.isLength(data.category, { min: 2, max: 50 })) {
    errors.category = 'Category must be between 2 and 50 characters.';
  }

  if (!data.quantity || !validator.isInt(data.quantity.toString(), { min: 0 })) {
    errors.quantity = 'Quantity must be a positive number.';
  }

  if (!data.vendor || !validator.isLength(data.vendor, { min: 2, max: 50 })) {
    errors.vendor = 'Vendor must be between 2 and 50 characters.';
  }

  if (!data.purchaseDate || !validator.isDate(data.purchaseDate)) {
    errors.purchaseDate = 'Invalid purchase date.';
  }

  if (!data.status || !['In Stock', 'Low Stock', 'Out of Stock'].includes(data.status)) {
    errors.status = 'Invalid status.';
  }

  if (!data.minStockLevel || !validator.isInt(data.minStockLevel.toString(), { min: 0 })) {
    errors.minStockLevel = 'Min stock level must be a positive number.';
  }

  if (!data.maxStockLevel || !validator.isInt(data.maxStockLevel.toString(), { min: 0 })) {
    errors.maxStockLevel = 'Max stock level must be a positive number.';
  }

  return errors;
};

/**
 * Sanitizes inventory input data to prevent XSS attacks
 * @param {Object} data - The inventory item data to sanitize
 * @returns {Object} - Sanitized inventory item data
 */
const sanitizeInventoryInput = (data) => {
  return {
    name: validator.escape(data.name.trim()),
    category: validator.escape(data.category.trim()),
    quantity: parseInt(data.quantity),
    vendor: validator.escape(data.vendor.trim()),
    purchaseDate: validator.escape(data.purchaseDate.trim()),
    status: validator.escape(data.status.trim()),
    minStockLevel: parseInt(data.minStockLevel),
    maxStockLevel: parseInt(data.maxStockLevel),
    location: validator.escape(data.location.trim()),
  };
};

/**
 * Main Inventory component that manages inventory data and UI
 */
const Inventory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State for responsive design
  const [isMobile, setIsMobile] = useState(false);
  
  // Core inventory data state
  const [inventoryData, setInventoryData] = useState(sampleInventoryData);
  const [selectedItem, setSelectedItem] = useState(null);
  
  // UI state for popups and forms
  const [showPopup, setShowPopup] = useState(false);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  
  // Section data states
  const [stockAlerts, setStockAlerts] = useState([]);
  const [maintenanceLogs, setMaintenanceLogs] = useState([]);
  const [checkInOutLogs, setCheckInOutLogs] = useState([]);
  
  // UI state for section visibility
  const [popupType, setPopupType] = useState(null);
  const [showActivityFeed, setShowActivityFeed] = useState(false);
  const [showStockAlerts, setShowStockAlerts] = useState(false);
  const [showMaintenanceLogs, setShowMaintenanceLogs] = useState(false);
  const [showCheckInOut, setShowCheckInOut] = useState(false);
  
  // Barcode scanner state
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [scannedData, setScannedData] = useState('Not Found');
  const [multiScanMode, setMultiScanMode] = useState(false);
  const [scannedType, setScannedType] = useState("");
  const [scanHistory, setScanHistory] = useState([]);
  const [manualBarcode, setManualBarcode] = useState("");

  // Chart data and configuration
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
      title: "Monthly Restocking Orders",
      data: [
        { label: "January", value: 50 },
        { label: "February", value: 60 },
        { label: "March", value: 70 },
        { label: "April", value: 80 },
        { label: "May", value: 90 },
        { label: "June", value: 100 },
      ],
    },
  ]);

  const [pieChartDataOptions] = useState([
    {
      title: "Inventory Status Distribution",
      data: [
        { label: "In Stock", value: 60 },
        { label: "Low Stock", value: 20 },
        { label: "Out of Stock", value: 10 },
        { label: "On Order", value: 10 },
      ],
    },
    {
      title: "Inventory by Category",
      data: [
        { label: "Medical Supplies", value: 40 },
        { label: "Pharmaceuticals", value: 30 },
        { label: "Equipment", value: 20 },
        { label: "Consumables", value: 10 },
      ],
    },
  ]);

  const [lineChartDataOptions] = useState([
    {
      title: "Weekly Inventory Turnover",
      data: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
        datasets: [
          {
            label: "Inventory Turnover",
            data: [10, 30, 50, 70, 90],
            borderColor: "#4e79a7",
            backgroundColor: "#4e79a720",
          },
        ],
      },
    },
    {
      title: "Weekly Supplier Performance",
      data: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
        datasets: [
          {
            label: "On-Time Deliveries",
            data: [80, 85, 90, 88, 92],
            borderColor: "#e15759",
            backgroundColor: "#e1575920",
          },
        ],
      },
    },
  ]);

  // Chart visibility state
  const [enabledCharts, setEnabledCharts] = useState({
    barChart: true,
    pieChart: true,
    lineChart: true,
  });

  // Chart panel visibility state
  const [isChartPanelOpen, setIsChartPanelOpen] = useState(false);

  // Info cards state
  const [selectedInfoCards, setSelectedInfoCards] = useState([
    { label: "Total Inventory Items", key: "totalItems", value: "500" },
    { label: "Items in Stock", key: "inStock", value: "400" },
    { label: "Items Low Stock", key: "lowStock", value: "50" },
    { label: "Items Out of Stock", key: "outOfStock", value: "10" },
  ]);

  const allInfoCards = [
    { label: "Total Inventory Items", key: "totalItems", value: "500" },
    { label: "Items in Stock", key: "inStock", value: "400" },
    { label: "Items Low Stock", key: "lowStock", value: "50" },
    { label: "Items Out of Stock", key: "outOfStock", value: "10" },
    { label: "Items on Order", key: "onOrder", value: "40" },
    { label: "Restocking Needed", key: "restockingNeeded", value: "20" },
    { label: "Total Inventory Value", key: "totalValue", value: "$50,000" },
    { label: "Monthly Restocking Cost", key: "restockingCost", value: "$5,000" },
    { label: "Critical Alerts", key: "criticalAlerts", value: "5" },
    { label: "Upcoming Expirations", key: "upcomingExpirations", value: "15" },
    { label: "Items Requiring Maintenance", key: "maintenanceNeeded", value: "8" },
    { label: "Items Under Warranty", key: "underWarranty", value: "200" },
    { label: "Items in Transit", key: "inTransit", value: "30" },
    { label: "Items Damaged", key: "damagedItems", value: "5" },
    { label: "Items Returned", key: "returnedItems", value: "10" },
    { label: "Items Donated", key: "donatedItems", value: "2" },
  ];

  // Activity table data
  const [tableData, setTableData] = useState([
    { id: 1, activity: "New Inventory Added", user: "John Doe", timestamp: "2025-02-20 10:15 AM", category: "Inventory", status: "Completed" },
    { id: 2, activity: "Restocking Order Placed", user: "Jane Smith", timestamp: "2025-02-19 3:30 PM", category: "Restocking", status: "Scheduled" },
    { id: 3, activity: "Inventory Check Completed", user: "Alice Johnson", timestamp: "2025-02-18 9:45 AM", category: "Audit", status: "Pending" },
    { id: 4, activity: "Damaged Items Reported", user: "Michael Lee", timestamp: "2025-02-17 1:10 PM", category: "Maintenance", status: "Completed" },
    { id: 5, activity: "Expired Items Disposed", user: "Emma Brown", timestamp: "2025-02-16 4:20 PM", category: "Disposal", status: "Approved" },
  ]);

  /**
   * Effect to handle window resize and mobile detection
   */
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * Effect to load chart preferences from localStorage on component mount
   */
  useEffect(() => {
    const savedPreferences = JSON.parse(localStorage.getItem("chartPreferences"));
    if (savedPreferences) {
      setEnabledCharts(savedPreferences);
    }
  }, []);

  /**
   * Effect to save chart preferences to localStorage when they change
   */
  useEffect(() => {
    localStorage.setItem("chartPreferences", JSON.stringify(enabledCharts));
  }, [enabledCharts]);

  /**
   * Determines which columns to display based on mobile state
   * @type {Array<Object>}
   */
  const columnsToDisplay = isMobile
    ? allColumns.filter(col => col.accessor === 'name' || col.accessor === 'category' || col.accessor === 'status')
    : allColumns;

  /**
   * Handles editing an inventory item
   * @param {Object} item - The item to edit
   */
  const handleEditClick = (item) => {
    setSelectedItem(item);
    setShowPopup(true);
  };

  /**
   * Handles deleting an inventory item
   * @param {number} id - The ID of the item to delete
   */
  const handleDeleteClick = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      setInventoryData(inventoryData.filter(item => item.id !== id));
      setShowPopup(false);
    }
  };

  /**
   * Toggles the add item form visibility
   */
  const handleAddItemClick = () => {
    setIsAddFormVisible(!isAddFormVisible);
  };

  /**
   * Adds a new item to inventory
   * @param {Object} newItem - The new item to add
   */
  const handleAddNewItem = (newItem) => {
    setInventoryData([...inventoryData, newItem]);
    setIsAddFormVisible(false);
  };

  /**
   * Sets a stock alert
   * @param {Object} data - The alert data containing itemId and alertLevel
   */
  const handleSetStockAlert = (data) => {
    const alert = { 
      itemId: data.itemId, 
      alertLevel: data.alertLevel, 
      date: new Date().toLocaleDateString() 
    };
    setStockAlerts([...stockAlerts, alert]);
    setPopupType(null);
  };

  /**
   * Adds a maintenance log entry
   * @param {Object} data - The maintenance log data
   */
  const handleAddMaintenanceLog = (data) => {
    const maintenanceLog = { 
      itemId: data.itemId, 
      log: data.log, 
      date: new Date().toLocaleDateString() 
    };
    setMaintenanceLogs([...maintenanceLogs, maintenanceLog]);
    setPopupType(null);
  };

  /**
   * Handles check-in/check-out operations
   * @param {Object} data - The check-in/out data
   */
  const handleCheckInOut = (data) => {
    const log = { 
      itemId: data.itemId, 
      action: data.action, 
      quantity: data.quantity, 
      staffMember: data.staffMember, 
      date: new Date().toLocaleDateString() 
    };
    setCheckInOutLogs([...checkInOutLogs, log]);
    setPopupType(null);
  };

  /**
   * Sets stock levels for an item
   * @param {Object} data - Contains itemId, minStockLevel, and maxStockLevel
   */
  const handleSetStockLevel = (data) => {
    const updatedInventoryData = inventoryData.map(item =>
      item.id === parseInt(data.itemId) ? { 
        ...item, 
        minStockLevel: data.minStockLevel, 
        maxStockLevel: data.maxStockLevel 
      } : item
    );
    setInventoryData(updatedInventoryData);
    setPopupType(null);
  };

  /**
   * Gets form fields based on the current popup type
   * @returns {Array<Object>} - Array of form field configurations
   */
  const getFormFields = () => {
    switch (popupType) {
      case 'stockAlert':
        return [
          { name: 'itemId', label: 'Item ID', type: 'text', placeholder: 'Enter Item ID', required: true },
          { name: 'itemDescription', label: 'Item Description', type: 'text', placeholder: 'Enter Item Description', required: true },
          { name: 'quantityOnHand', label: 'Quantity on Hand', type: 'number', placeholder: 'Enter Quantity on Hand', required: true },
          { name: 'alertLevel', label: 'Alert Level', type: 'number', placeholder: 'Enter Alert Level', required: true },
          { name: 'restockPriority', label: 'Restock Priority', type: 'number', placeholder: 'Enter Restock Priority', required: false },
          { name: 'supplierLeadTime', label: 'Supplier Lead Time', type: 'number', placeholder: 'Enter Supplier Lead Time (in days)', required: false },
          { name: 'date', label: 'Date', type: 'date', placeholder: 'Enter Date', required: true },
          { name: 'lastRestocked', label: 'Last Restocked', type: 'date', placeholder: 'Enter Last Restocked Date', required: false },
          { name: 'stockValue', label: 'Stock Value', type: 'number', placeholder: 'Enter Stock Value', required: false },
        ];
      case 'maintenanceLog':
        return [
          { name: 'itemId', label: 'Item ID', type: 'text', placeholder: 'Enter Item ID', required: true },
          { name: 'itemDescription', label: 'Item Description', type: 'text', placeholder: 'Enter Item Description', required: true },
          { name: 'log', label: 'Log', type: 'text', placeholder: 'Enter Maintenance Log', required: true },
          { name: 'date', label: 'Date', type: 'date', placeholder: 'Enter Date', required: true },
          { name: 'technician', label: 'Technician', type: 'text', placeholder: 'Enter Technician Name or ID', required: true },
          { name: 'maintenanceType', label: 'Maintenance Type', type: 'text', placeholder: 'Enter Maintenance Type (e.g., Routine Check, Repair)', required: true },
          { name: 'maintenanceCost', label: 'Maintenance Cost', type: 'number', placeholder: 'Enter Maintenance Cost', required: false },
          { name: 'downtime', label: 'Downtime (hours)', type: 'number', placeholder: 'Enter Downtime (in hours)', required: false },
          { name: 'nextScheduledMaintenance', label: 'Next Scheduled Maintenance', type: 'date', placeholder: 'Enter Next Scheduled Maintenance Date', required: false },
          { name: 'warrantyStatus', label: 'Warranty Status', type: 'text', placeholder: 'Enter Warranty Status', required: false },
        ];
      case 'checkInOut':
        return [
          { name: 'action', label: 'Action', type: 'select', options: [{ id: 1, name: 'Check-in' }, { id: 2, name: 'Check-out' }], required: true },
          { name: 'quantity', label: 'Quantity', type: 'number', placeholder: 'Enter Quantity', required: true },
          { name: 'staffMember', label: 'Staff Member', type: 'select', options: staffMembers, required: true },
        ];
      case 'stockLevel':
        return [
          { name: 'minStockLevel', label: 'Min Stock Level', type: 'number', placeholder: 'Enter Min Stock Level', required: true },
          { name: 'maxStockLevel', label: 'Max Stock Level', type: 'number', placeholder: 'Enter Max Stock Level', required: true },
        ];
      default:
        return [];
    }
  };

  /**
   * Handles form submission based on popup type
   * @param {Object} data - The form data
   */
  const handleFormSubmit = (data) => {
    switch (popupType) {
      case 'stockAlert':
        handleSetStockAlert(data);
        break;
      case 'maintenanceLog':
        handleAddMaintenanceLog(data);
        break;
      case 'checkInOut':
        handleCheckInOut(data);
        break;
      case 'stockLevel':
        handleSetStockLevel(data);
        break;
      default:
        break;
    }
  };

  /**
   * Plays a beep sound when a barcode is scanned
   */
  const playBeep = () => {
    const audio = new Audio("/beep.mp3");
    audio.play();
  };

  /**
   * Vibrates the device when a barcode is scanned (if supported)
   */
  const vibrateDevice = () => {
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
  };

  /**
   * Searches the database for a scanned barcode
   * @param {string} barcode - The scanned barcode
   */
  const searchDatabase = (barcode) => {
    console.log(`Searching database for barcode: ${barcode}`);
    // In a real app, this would query your backend API
    const foundItem = inventoryData.find(item => item.id.toString() === barcode);
    if (foundItem) {
      console.log('Found item:', foundItem);
      setSelectedItem(foundItem);
      setShowPopup(true);
    }
  };

  /**
   * Handles quick actions after scanning a barcode
   * @param {string} barcode - The scanned barcode
   */
  const handleQuickActions = (barcode) => {
    console.log(`Handling quick actions for: ${barcode}`);
    // Could implement actions like auto-check-in/out here
  };

  /**
   * Handles manual barcode entry
   * @param {string} barcode - The manually entered barcode
   */
  const handleManualEntry = (barcode) => {
    if (!barcode) return;
    console.log(`Manual entry: ${barcode}`);

    // Add to scan history
    setScanHistory((prev) => [...prev, { code: barcode, type: "Manual" }]);

    // Search Database
    searchDatabase(barcode);

    // Handle quick actions
    handleQuickActions(barcode);

    // Clear manual barcode input
    setManualBarcode("");
  };

  /**
   * Toggles chart visibility
   * @param {string} chart - The chart type to toggle ('barChart', 'pieChart', 'lineChart')
   */
  const toggleChart = (chart) => {
    setEnabledCharts((prev) => ({
      ...prev,
      [chart]: !prev[chart],
    }));
  };

  return (
    <div className="inventory-container">
      {/* Render top navigation on mobile, side menu on desktop */}
      {isMobile ? <TopNavBar /> : <SideMenu />}

      <div className="inventory-table-container">
        <h1 className="inventory-table-title">Inventory Management</h1>

        {/* Chart controls */}
        <button
          className="chart-toggle-button"
          onClick={() => setIsChartPanelOpen(!isChartPanelOpen)}
          aria-expanded={isChartPanelOpen}
          aria-controls="chart-selection-panel"
        >
          {isChartPanelOpen ? "Hide Chart Options" : "Show Chart Options"}
        </button>

        {/* Chart selection panel */}
        <div 
          id="chart-selection-panel"
          className={`chart-selection-panel ${isChartPanelOpen ? "open" : ""}`}
        >
          <h3>Select Charts to Display:</h3>
          <label className="chart-option">
            <input
              type="checkbox"
              checked={enabledCharts.barChart}
              onChange={() => toggleChart("barChart")}
            />
            Bar Chart
          </label>
          <label className="chart-option">
            <input
              type="checkbox"
              checked={enabledCharts.pieChart}
              onChange={() => toggleChart("pieChart")}
            />
            Pie Chart
          </label>
          <label className="chart-option">
            <input
              type="checkbox"
              checked={enabledCharts.lineChart}
              onChange={() => toggleChart("lineChart")}
            />
            Line Chart
          </label>
        </div>

        {/* Charts section */}
        <GraphsSection
          barChartDataOptions={barChartDataOptions}
          pieChartDataOptions={pieChartDataOptions}
          lineChartDataOptions={lineChartDataOptions}
          barChartTitle="Inventory Performance"
          lineChartTitle="Weekly Inventory Metrics"
          enabledCharts={enabledCharts}
        />

        {/* Main inventory table */}
        <DataTable 
          columns={columnsToDisplay} 
          data={inventoryData} 
          onEdit={handleEditClick} 
          onDelete={handleDeleteClick} 
        />

        {/* Action buttons */}
        <div className="button-container">
          <button 
            onClick={handleAddItemClick} 
            className="add-item-button"
            aria-expanded={isAddFormVisible}
          >
            {isAddFormVisible ? 'Cancel' : 'Add New Item'}
          </button>
          <button 
            onClick={() => setShowBarcodeScanner(!showBarcodeScanner)} 
            className="barcode-button"
          >
            {showBarcodeScanner ? 'Close Scanner' : 'Scan Barcode'}
          </button>
        </div>

        {/* Add item form */}
        {isAddFormVisible && (
          <AddItemForm 
            onAddItem={handleAddNewItem} 
            onCancel={() => setIsAddFormVisible(false)} 
          />
        )}

        {/* Edit item popup */}
        {showPopup && selectedItem && (
          <EditItemPopup 
            item={selectedItem} 
            onClose={() => setShowPopup(false)} 
          />
        )}

        {/* Barcode scanner modal */}
        {showBarcodeScanner && (
          <div className="scanner-modal">
            <div className="scanner-content">
              <h2 className="scanner-title">Scan a Barcode</h2>
              <p className="scanner-instructions">
                Align the barcode within the frame below.
              </p>

              {/* Multi-Scan Mode Toggle */}
              <div className="scanner-options">
                <button
                  onClick={() => setMultiScanMode(!multiScanMode)}
                  className={`mode-toggle ${multiScanMode ? 'active' : ''}`}
                >
                  {multiScanMode ? "Disable Multi-Scan" : "Enable Multi-Scan"}
                </button>
              </div>

              {/* Barcode Scanner */}
              <div className="scanner-viewfinder">
                <BarcodeScannerComponent
                  width={400}
                  height={300}
                  onUpdate={(err, result) => {
                    if (err) {
                      console.error('Scanner error:', err);
                      return;
                    }

                    if (result?.text && result.text !== scannedData) {
                      const scannedBarcode = result.text;
                      const barcodeType = result.format || "Unknown";

                      // Store scanned data
                      setScannedData(scannedBarcode);
                      setScannedType(barcodeType);

                      // Play sound & vibration
                      playBeep();
                      vibrateDevice();

                      // Save scan to history
                      setScanHistory(prev => [...prev, { 
                        code: scannedBarcode, 
                        type: barcodeType,
                        timestamp: new Date().toISOString()
                      }]);

                      // Store offline if no internet
                      if (!navigator.onLine) {
                        const offlineScans = JSON.parse(localStorage.getItem("offlineScans")) || [];
                        offlineScans.push({
                          code: scannedBarcode,
                          type: barcodeType,
                          timestamp: new Date().toISOString()
                        });
                        localStorage.setItem("offlineScans", JSON.stringify(offlineScans));
                      }

                      // Search Inventory or Staff
                      searchDatabase(scannedBarcode);

                      // Auto-submit actions
                      handleQuickActions(scannedBarcode);

                      // If multi-scan is disabled, close scanner
                      if (!multiScanMode) {
                        setShowBarcodeScanner(false);
                      }
                    }
                  }}
                />
              </div>

              {/* Display Scanned Data */}
              <div className="scanner-result">
                <p className={`scan-status ${scannedData === 'Not Found' ? 'empty' : 'success'}`}>
                  {scannedData
                    ? `Scanned: ${scannedData} (${scannedType})`
                    : "Waiting for scan..."}
                </p>
              </div>

              {/* Manual Barcode Entry */}
              <div className="manual-entry">
                <input
                  type="text"
                  placeholder="Enter barcode manually"
                  className="barcode-input"
                  value={manualBarcode}
                  onChange={(e) => setManualBarcode(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleManualEntry(manualBarcode)}
                />
                <button
                  onClick={() => handleManualEntry(manualBarcode)}
                  className="submit-button"
                  disabled={!manualBarcode}
                >
                  Submit
                </button>
              </div>

              {/* Scan History */}
              {scanHistory.length > 0 && (
                <div className="scan-history">
                  <h3 className="history-title">Scan History:</h3>
                  <div className="history-items">
                    {scanHistory.slice().reverse().map((item, index) => (
                      <div key={`${item.code}-${index}`} className="history-item">
                        <span className="history-code">{item.code}</span>
                        <span className="history-type">({item.type})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={() => {
                  setShowBarcodeScanner(false);
                  setScannedData('Not Found');
                }}
                className="close-button"
              >
                Close Scanner
              </button>
            </div>
          </div>
        )}

        {/* Additional inventory sections */}
        <h2 id="inventory-additional-details" className="inventory-details-heading">
          Additional Inventory Details
        </h2>

        {/* Section toggle buttons */}
        <div className="section-buttons">
          <button 
            onClick={() => setShowStockAlerts(!showStockAlerts)}
            className={`section-toggle ${showStockAlerts ? 'active' : ''}`}
          >
            {showStockAlerts ? 'Hide Stock Alerts' : 'Show Stock Alerts'}
          </button>
          <button 
            onClick={() => setShowMaintenanceLogs(!showMaintenanceLogs)}
            className={`section-toggle ${showMaintenanceLogs ? 'active' : ''}`}
          >
            {showMaintenanceLogs ? 'Hide Maintenance Logs' : 'Show Maintenance Logs'}
          </button>
          <button 
            onClick={() => setShowCheckInOut(!showCheckInOut)}
            className={`section-toggle ${showCheckInOut ? 'active' : ''}`}
          >
            {showCheckInOut ? 'Hide Check-in/Check-out' : 'Show Check-in/Check-out'}
          </button>
          <button 
            onClick={() => setShowActivityFeed(!showActivityFeed)}
            className={`section-toggle ${showActivityFeed ? 'active' : ''}`}
          >
            {showActivityFeed ? 'Hide Activity Feed' : 'Show Activity Feed'}
          </button>
        </div>

        {/* Stock Alerts section */}
        {showStockAlerts && (
          <div className="inventory-section">
            <div className="section-header">
              <h2>Stock Alerts</h2>
              <button 
                onClick={() => setPopupType('stockAlert')} 
                className="add-button"
              >
                Add Stock Alert
              </button>
            </div>
            <DataTable columns={stockAlertColumns} data={stockAlerts} />
          </div>
        )}

        {/* Maintenance Logs section */}
        {showMaintenanceLogs && (
          <div className="inventory-section">
            <div className="section-header">
              <h2>Maintenance Logs</h2>
              <button 
                onClick={() => setPopupType('maintenanceLog')} 
                className="add-button"
              >
                Add Maintenance Log
              </button>
            </div>
            <DataTable columns={maintenanceLogColumns} data={maintenanceLogs} />
          </div>
        )}

        {/* Check-in/Check-out Section */}
        {showCheckInOut && (
          <div className="section">
            <h2>Check-in/Check-out</h2>
            <button onClick={() => setPopupType('checkInOut')} className="add-button">
              Add Check-in/Check-out
            </button>
            <DataTable columns={checkInOutColumns} data={checkInOutLogs} />
          </div>
        )}

        {/* Activity Feed Section */}
        {showActivityFeed && (
          <div className="section">
            <h2>Activity Feed</h2>
            <button onClick={() => setPopupType('activity')} className="add-button">
              Add Activity
            </button>
            <DataTable columns={activityFeedColumns} data={dummyActivityFeed} />
          </div>
        )}

        {/* Popup Form */}
        <PopupForm
          isVisible={!!popupType}
          onClose={() => setPopupType(null)}
          onSubmit={handleFormSubmit}
          formFields={getFormFields()}
          inventoryData={inventoryData}
        />
      </div>
    </div>
  );
};

// Reusable Add Item Form Component
const AddItemForm = ({ onAddItem, onCancel }) => {
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newItem = {
      id: Date.now(),
      name: formData.get('name'),
      category: formData.get('category'),
      quantity: formData.get('quantity'),
      vendor: formData.get('vendor'),
      purchaseDate: formData.get('purchaseDate'),
      status: formData.get('status'),
      photo: 'https://via.placeholder.com/100',
      minStockLevel: formData.get('minStockLevel'),
      maxStockLevel: formData.get('maxStockLevel'),
      location: formData.get('location'),
    };

    const validationErrors = validateInventoryInput(newItem);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const sanitizedItem = sanitizeInventoryInput(newItem);
    onAddItem(sanitizedItem);
  };

  return (
    <div className="add-form">
      <h3>Add New Item</h3>
      <form onSubmit={handleSubmit}>
        {['name', 'category', 'quantity', 'vendor', 'purchaseDate', 'status', 'minStockLevel', 'maxStockLevel', 'location'].map((field) => (
          <div className="form-group" key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === 'quantity' || field === 'minStockLevel' || field === 'maxStockLevel' ? 'number' : 'text'}
              name={field}
              placeholder={`Enter ${field}`}
              required
            />
            {errors[field] && <span className="error">{errors[field]}</span>}
          </div>
        ))}
        <div className="form-buttons">
          <button type="submit" className="add-button">
            Add Item
          </button>
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// Reusable Edit Item Popup Component
const EditItemPopup = ({ item, onClose }) => {
  const [formData, setFormData] = useState(item);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateInventoryInput(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const sanitizedItem = sanitizeInventoryInput(formData);
    console.log('Updated Item Data:', sanitizedItem);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Edit Item Details</h2>
        <form onSubmit={handleSubmit}>
          {['name', 'category', 'quantity', 'vendor', 'purchaseDate', 'status', 'minStockLevel', 'maxStockLevel', 'location'].map((field) => (
            <div className="form-group" key={field}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field === 'quantity' || field === 'minStockLevel' || field === 'maxStockLevel' ? 'number' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
              {errors[field] && <span className="error">{errors[field]}</span>}
            </div>
          ))}
          <div className="popup-buttons">
            <button type="submit" className="save-button">
              Save Changes
            </button>
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable Popup Form Component
const PopupForm = ({ isVisible, onClose, onSubmit, formFields, inventoryData }) => {
  if (!isVisible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    formFields.forEach(field => {
      data[field.name] = formData.get(field.name);
    });
    onSubmit(data);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Item</label>
            <select name="itemId" required>
              {inventoryData.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          {formFields.map(field => (
            <div className="form-group" key={field.name}>
              <label>{field.label}</label>
              {field.type === 'select' ? (
                <select name={field.name} required={field.required}>
                  {field.options.map(option => (
                    <option key={option.id} value={option.name}>{option.name}</option>
                  ))}
                </select>
              ) : (
                <input type={field.type} name={field.name} placeholder={field.placeholder} required={field.required} />
              )}
            </div>
          ))}
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default Inventory;