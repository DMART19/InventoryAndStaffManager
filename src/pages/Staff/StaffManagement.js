import React, { useState, useEffect } from 'react';
import validator from 'validator'; // Import validator.js
import { useLocation } from 'react-router-dom'; // Import useLocation to access navigation state
import SideMenu from '../../components/SideMenu';
import TopNavBar from '../../components/TopNavBar';
import DataTable from '../../components/DataTable';
import GraphsSection from '../../components/GraphsSection'; // Import the GraphsSection component
import './StaffManagement.css';
import { Tab } from 'react-bootstrap';

const allColumns = [
  { Header: 'Name', accessor: 'name' },
  { Header: 'Role', accessor: 'role' },
  { Header: 'Department', accessor: 'department' },
  { Header: 'Email', accessor: 'email' },
  { Header: 'Phone', accessor: 'phone' },
  { Header: 'Hire Date', accessor: 'hireDate' },
  { Header: 'Certifications', accessor: 'certifications' },
  { Header: 'Training Status', accessor: 'trainingStatus' },
];

const dummyStaffData = [
  { id: 1, name: 'John Doe', role: 'Manager', department: 'HR', email: 'john@example.com', phone: '123-456-7890', hireDate: '2022-01-15', certifications: 'CPR', trainingStatus: 'Completed' },
  { id: 2, name: 'Jane Smith', role: 'Engineer', department: 'Engineering', email: 'jane@example.com', phone: '123-456-7891', hireDate: '2022-02-15', certifications: 'OSHA', trainingStatus: 'Pending' },
  { id: 3, name: 'Alice Johnson', role: 'Admin', department: 'HR', email: 'alice@example.com', phone: '123-456-7892', hireDate: '2022-03-15', certifications: 'First Aid', trainingStatus: 'Completed' },
  // Add more dummy staff here as needed
];

const dummyTrainingData = [
  { staffId: 1, staff: 'John Doe', training: 'First Aid', status: 'Completed', date: '2024-01-15', instructor: 'Dr. Smith', location: 'Online' },
  { staffId: 2, staff: 'Jane Smith', training: 'OSHA Certification', status: 'Pending', date: '2024-05-30', instructor: 'Dr. Brown', location: 'On-site' },
  // More training data
];

const dummyActivityFeed = [
  { id: 1, activity: 'Assigned new task: Staff Review', date: '2024-02-02', initiatedBy: 'Admin', details: 'Review staff performance for Q1' },
  { id: 2, activity: 'Training Completed: First Aid', date: '2024-01-15', initiatedBy: 'System', details: 'John Doe completed First Aid training' },
  // More activities
];

const dummyNotifications = [
  { id: 1, message: 'Certification expired for John Doe', type: 'Warning', date: '2024-02-01', actionRequired: true, details: 'CPR Certification expired on 2024-01-31' },
  { id: 2, message: 'Upcoming review for Jane Doe', type: 'Reminder', date: '2024-02-05', actionRequired: false, details: 'Annual performance review scheduled for 2024-02-05' },
  // More notifications
];

const dummyUpcomingEvents = [
  { event: 'Certification Expiring', staff: 'John Doe', date: '2024-03-01', details: 'CPR Certification will expire on 2024-03-01', location: 'Online' },
  { event: 'Upcoming Staff Review', staff: 'Jane Doe', date: '2024-02-05', details: 'Annual performance review', location: 'Office' },
  // More events
];

const dummyTeamAssignments = [
  { team: 'HR', members: 'John Doe, Jane Doe', manager: 'Alice Johnson', department: 'Human Resources', details: 'Handles recruitment and employee relations' },
  { team: 'Engineering', members: 'Michael Smith, Sarah Lee', manager: 'Bob Brown', department: 'Product Development', details: 'Responsible for product development and maintenance' },
  // More team assignments
];

const dummyEngagementSurveys = [
  { id: 1, survey: 'Employee Satisfaction', status: 'Completed', date: '2024-01-15', participants: 50, averageScore: 8.5 },
  { id: 2, survey: 'Workplace Culture', status: 'Pending', date: '2024-06-30', participants: 0, averageScore: 0 },
  // More surveys
];

const dummyCertificationTracking = [
  { id: 1, staff: 'John Doe', certification: 'CPR', expiryDate: '2024-03-01', status: 'Expiring Soon', daysRemaining: 30 },
  { id: 2, staff: 'Jane Smith', certification: 'OSHA', expiryDate: '2025-02-15', status: 'Valid', daysRemaining: 365 },
  // More certifications
];

// Input validation function
const validateStaffInput = (data) => {
  const errors = {};

  // Validate name
  if (!data.name || !validator.isLength(data.name, { min: 2, max: 50 })) {
    errors.name = 'Name must be between 2 and 50 characters.';
  }

  // Validate email
  if (!data.email || !validator.isEmail(data.email)) {
    errors.email = 'Invalid email address.';
  }

  // Validate phone number
  if (!data.phone || !validator.isMobilePhone(data.phone, 'en-US')) {
    errors.phone = 'Invalid phone number.';
  }

  // Validate hire date
  if (!data.hireDate || !validator.isDate(data.hireDate)) {
    errors.hireDate = 'Invalid hire date.';
  }

  // Validate certifications
  if (!data.certifications || !validator.isLength(data.certifications, { min: 2, max: 100 })) {
    errors.certifications = 'Certifications must be between 2 and 100 characters.';
  }

  return errors;
};

// Input sanitization function
const sanitizeStaffInput = (data) => {
  return {
    name: validator.escape(data.name.trim()),
    role: validator.escape(data.role.trim()),
    department: validator.escape(data.department.trim()),
    email: validator.normalizeEmail(data.email.trim()),
    phone: validator.escape(data.phone.trim()),
    hireDate: validator.escape(data.hireDate.trim()),
    certifications: validator.escape(data.certifications.trim()),
  };
};

const StaffManagement = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [staffData, setStaffData] = useState(dummyStaffData);
  const [selectedStaffMember, setSelectedStaffMember] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);

  // State for collapsible sections
  const [showTrainingSection, setShowTrainingSection] = useState(false);
  const [showActivityFeedSection, setShowActivityFeedSection] = useState(false);
  const [showNotificationsSection, setShowNotificationsSection] = useState(false);
  const [showUpcomingEventsSection, setShowUpcomingEventsSection] = useState(false);
  const [showTeamAssignmentsSection, setShowTeamAssignmentsSection] = useState(false);
  const [showEngagementSurveysSection, setShowEngagementSurveysSection] = useState(false);
  const [showCertificationTrackingSection, setShowCertificationTrackingSection] = useState(false);

  // State for popup forms
  const [popupType, setPopupType] = useState(null);

  // Bar Chart Data Options (Staff Management)
  const [barChartDataOptions] = useState([
    {
      title: "Monthly Staff Hires",
      data: [
        { label: "January", value: 5 },
        { label: "February", value: 8 },
        { label: "March", value: 12 },
        { label: "April", value: 10 },
        { label: "May", value: 7 },
        { label: "June", value: 9 },
      ],
    },
    {
      title: "Monthly Staff Turnover",
      data: [
        { label: "January", value: 2 },
        { label: "February", value: 3 },
        { label: "March", value: 1 },
        { label: "April", value: 4 },
        { label: "May", value: 2 },
        { label: "June", value: 3 },
      ],
    },
  ]);

  // Pie Chart Data Options (Staff Management)
  const [pieChartDataOptions] = useState([
    {
      title: "Staff Roles Distribution",
      data: [
        { label: "Managers", value: 15 },
        { label: "Developers", value: 40 },
        { label: "Designers", value: 20 },
        { label: "Support Staff", value: 25 },
      ],
    },
    {
      title: "Staff Satisfaction Levels",
      data: [
        { label: "Very Satisfied", value: 60 },
        { label: "Satisfied", value: 30 },
        { label: "Neutral", value: 5 },
        { label: "Dissatisfied", value: 5 },
      ],
    },
  ]);

  // Line Chart Data Options (Staff Management)
  const [lineChartDataOptions] = useState([
    {
      title: "Weekly Staff Productivity",
      data: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
        datasets: [
          {
            label: "Tasks Completed",
            data: [45, 50, 60, 55, 70],
            borderColor: "#4e79a7",
            backgroundColor: "#4e79a720",
          },
        ],
      },
    },
    {
      title: "Weekly Training Progress",
      data: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
        datasets: [
          {
            label: "Training Hours Completed",
            data: [10, 15, 20, 25, 30],
            borderColor: "#e15759",
            backgroundColor: "#e1575920",
          },
        ],
      },
    },
  ]);

  // State to manage which charts are enabled
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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const columnsToDisplay = isMobile
    ? allColumns.filter((col) => ['name', 'role', 'hireDate'].includes(col.accessor))
    : allColumns;

  const handleEditClick = (staffMember) => {
    setSelectedStaffMember(staffMember);
    setShowPopup(true);
  };

  const handleDeleteClick = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this staff member?');
    if (confirmDelete) {
      setStaffData(staffData.filter((staff) => staff.id !== id));
      setShowPopup(false);
    }
  };

  const handleAddStaffClick = () => {
    setIsAddFormVisible(!isAddFormVisible);
  };

  const handleAddNewStaff = (newStaff) => {
    setStaffData([...staffData, newStaff]);
    setIsAddFormVisible(false);
  };

  const handleAddTraining = (newTraining) => {
    console.log('New Training:', newTraining);
    setPopupType(null);
  };

  const handleAddActivity = (newActivity) => {
    console.log('New Activity:', newActivity);
    setPopupType(null);
  };

  const handleAddNotification = (newNotification) => {
    console.log('New Notification:', newNotification);
    setPopupType(null);
  };

  const handleAddEvent = (newEvent) => {
    console.log('New Event:', newEvent);
    setPopupType(null);
  };

  const handleAddTeamAssignment = (newTeamAssignment) => {
    console.log('New Team Assignment:', newTeamAssignment);
    setPopupType(null);
  };

  const handleAddEngagementSurvey = (newSurvey) => {
    console.log('New Engagement Survey:', newSurvey);
    setPopupType(null);
  };

  const handleAddCertificationTracking = (newCertification) => {
    console.log('New Certification Tracking:', newCertification);
    setPopupType(null);
  };

  const getFormFields = () => {
    switch (popupType) {
      case 'training':
        return [
          { name: 'staffId', label: 'Staff ID', type: 'text', placeholder: 'Enter Staff ID', required: true },
          { name: 'staff', label: 'Staff Name', type: 'text', placeholder: 'Enter Staff Name', required: true },
          { name: 'training', label: 'Training', type: 'text', placeholder: 'Enter Training', required: true },
          { name: 'status', label: 'Status', type: 'text', placeholder: 'Enter Status', required: true },
          { name: 'date', label: 'Date', type: 'date', placeholder: 'Enter Date', required: true },
          { name: 'instructor', label: 'Instructor', type: 'text', placeholder: 'Enter Instructor', required: true },
          { name: 'location', label: 'Location', type: 'text', placeholder: 'Enter Location', required: true },
        ];
      case 'activity':
        return [
          { name: 'activity', label: 'Activity', type: 'text', placeholder: 'Enter Activity', required: true },
          { name: 'date', label: 'Date', type: 'date', placeholder: 'Enter Date', required: true },
          { name: 'initiatedBy', label: 'Initiated By', type: 'text', placeholder: 'Enter Initiated By', required: true },
          { name: 'details', label: 'Details', type: 'text', placeholder: 'Enter Details', required: true },
        ];
      case 'notification':
        return [
          { name: 'message', label: 'Message', type: 'text', placeholder: 'Enter Message', required: true },
          { name: 'type', label: 'Type', type: 'text', placeholder: 'Enter Type', required: true },
          { name: 'date', label: 'Date', type: 'date', placeholder: 'Enter Date', required: true },
          { name: 'actionRequired', label: 'Action Required', type: 'checkbox', placeholder: 'Action Required', required: false },
          { name: 'details', label: 'Details', type: 'text', placeholder: 'Enter Details', required: true },
        ];
      case 'event':
        return [
          { name: 'event', label: 'Event', type: 'text', placeholder: 'Enter Event', required: true },
          { name: 'staff', label: 'Staff', type: 'text', placeholder: 'Enter Staff', required: true },
          { name: 'date', label: 'Date', type: 'date', placeholder: 'Enter Date', required: true },
          { name: 'details', label: 'Details', type: 'text', placeholder: 'Enter Details', required: true },
          { name: 'location', label: 'Location', type: 'text', placeholder: 'Enter Location', required: true },
        ];
      case 'teamAssignment':
        return [
          { name: 'team', label: 'Team', type: 'text', placeholder: 'Enter Team', required: true },
          { name: 'members', label: 'Members', type: 'text', placeholder: 'Enter Members', required: true },
          { name: 'manager', label: 'Manager', type: 'text', placeholder: 'Enter Manager', required: true },
          { name: 'department', label: 'Department', type: 'text', placeholder: 'Enter Department', required: true },
          { name: 'details', label: 'Details', type: 'text', placeholder: 'Enter Details', required: true },
        ];
      case 'engagementSurvey':
        return [
          { name: 'survey', label: 'Survey', type: 'text', placeholder: 'Enter Survey Name', required: true },
          { name: 'status', label: 'Status', type: 'text', placeholder: 'Enter Status', required: true },
          { name: 'date', label: 'Date', type: 'date', placeholder: 'Enter Date', required: true },
          { name: 'participants', label: 'Participants', type: 'number', placeholder: 'Enter Number of Participants', required: true },
          { name: 'averageScore', label: 'Average Score', type: 'number', placeholder: 'Enter Average Score', required: true },
        ];
      case 'certificationTracking':
        return [
          { name: 'staff', label: 'Staff', type: 'text', placeholder: 'Enter Staff Name', required: true },
          { name: 'certification', label: 'Certification', type: 'text', placeholder: 'Enter Certification', required: true },
          { name: 'expiryDate', label: 'Expiry Date', type: 'date', placeholder: 'Enter Expiry Date', required: true },
          { name: 'status', label: 'Status', type: 'text', placeholder: 'Enter Status', required: true },
          { name: 'daysRemaining', label: 'Days Remaining', type: 'number', placeholder: 'Enter Days Remaining', required: true },
        ];
      default:
        return [];
    }
  };

  const handleFormSubmit = (data) => {
    switch (popupType) {
      case 'training':
        handleAddTraining(data);
        break;
      case 'activity':
        handleAddActivity(data);
        break;
      case 'notification':
        handleAddNotification(data);
        break;
      case 'event':
        handleAddEvent(data);
        break;
      case 'teamAssignment':
        handleAddTeamAssignment(data);
        break;
      case 'engagementSurvey':
        handleAddEngagementSurvey(data);
        break;
      case 'certificationTracking':
        handleAddCertificationTracking(data);
        break;
      default:
        break;
    }
  };

  return (
    <div className="staff-management-container">
      {isMobile ? <TopNavBar /> : <SideMenu />}

      <div className="staff-table-container">
        <h1 className="staff-table-title">Staff Management</h1>

        {/* Toggle Button for Chart Selection Panel */}
        <button
          className="chart-toggle-button"
          onClick={() => setIsChartPanelOpen(!isChartPanelOpen)}
        >
          {isChartPanelOpen ? "Hide Chart Options" : "Show Chart Options"}
        </button>

        {/* Chart Selection Panel */}
        <div className={`chart-selection-panel ${isChartPanelOpen ? "open" : ""}`}>
          <h3>Select Charts to Display:</h3>
          <label>
            <input
              type="checkbox"
              checked={enabledCharts.barChart}
              onChange={() => toggleChart("barChart")}
            />
            Bar Chart
          </label>
          <label>
            <input
              type="checkbox"
              checked={enabledCharts.pieChart}
              onChange={() => toggleChart("pieChart")}
            />
            Pie Chart
          </label>
          <label>
            <input
              type="checkbox"
              checked={enabledCharts.lineChart}
              onChange={() => toggleChart("lineChart")}
            />
            Line Chart
          </label>
        </div>

        {/* Graphs Section */}
        <GraphsSection
          barChartDataOptions={barChartDataOptions}
          pieChartDataOptions={pieChartDataOptions}
          lineChartDataOptions={lineChartDataOptions}
          barChartTitle="Staff Performance"
          lineChartTitle="Weekly Staff Metrics"
          enabledCharts={enabledCharts}
        />

        <DataTable columns={columnsToDisplay} data={staffData} onEdit={handleEditClick} onDelete={handleDeleteClick} />

        <button onClick={handleAddStaffClick} className="add-staff-button">
          {isAddFormVisible ? 'Cancel' : 'Add New Staff'}
        </button>

        {isAddFormVisible && (
          <AddStaffForm onAddStaff={handleAddNewStaff} onCancel={() => setIsAddFormVisible(false)} />
        )}

        {showPopup && selectedStaffMember && (
          <EditStaffPopup staffMember={selectedStaffMember} onClose={() => setShowPopup(false)} />
        )}
        <h2 id="staff-additional-details" className="staff-details-heading">
          Additional Staff Details
        </h2>

        {/* Buttons to toggle section visibility */}
        <div className="section-buttons">
          <button onClick={() => setShowTrainingSection(!showTrainingSection)}>
            {showTrainingSection ? 'Hide Training & Certification' : 'Show Training & Certification'}
          </button>
          <button onClick={() => setShowActivityFeedSection(!showActivityFeedSection)}>
            {showActivityFeedSection ? 'Hide Activity Feed' : 'Show Activity Feed'}
          </button>
          <button onClick={() => setShowNotificationsSection(!showNotificationsSection)}>
            {showNotificationsSection ? 'Hide Notifications & Alerts' : 'Show Notifications & Alerts'}
          </button>
          <button onClick={() => setShowUpcomingEventsSection(!showUpcomingEventsSection)}>
            {showUpcomingEventsSection ? 'Hide Upcoming Events' : 'Show Upcoming Events'}
          </button>
          <button onClick={() => setShowTeamAssignmentsSection(!showTeamAssignmentsSection)}>
            {showTeamAssignmentsSection ? 'Hide Team Assignments' : 'Show Team Assignments'}
          </button>
          <button onClick={() => setShowEngagementSurveysSection(!showEngagementSurveysSection)}>
            {showEngagementSurveysSection ? 'Hide Engagement Surveys' : 'Show Engagement Surveys'}
          </button>
          <button onClick={() => setShowCertificationTrackingSection(!showCertificationTrackingSection)}>
            {showCertificationTrackingSection ? 'Hide Certification Tracking' : 'Show Certification Tracking'}
          </button>
        </div>

        {/* Training & Certification Section */}
        {showTrainingSection && (
          <div className="section">
            <h2>Training & Certification</h2>
            <button onClick={() => setPopupType('training')} className="add-button">
              Add Training
            </button>
            <DataTable
              columns={[
                { Header: 'Staff Name', accessor: 'staff' },
                { Header: 'Training', accessor: 'training' },
                { Header: 'Status', accessor: 'status' },
                { Header: 'Date', accessor: 'date' },
                { Header: 'Instructor', accessor: 'instructor' },
                { Header: 'Location', accessor: 'location' },
              ]}
              data={dummyTrainingData}
            />
          </div>
        )}

        {/* Activity Feed Section */}
        {showActivityFeedSection && (
          <div className="section">
            <h2>Activity Feed</h2>
            <button onClick={() => setPopupType('activity')} className="add-button">
              Add Activity
            </button>
            <DataTable
              columns={[
                { Header: 'Activity', accessor: 'activity' },
                { Header: 'Date', accessor: 'date' },
                { Header: 'Initiated By', accessor: 'initiatedBy' },
                { Header: 'Details', accessor: 'details' },
              ]}
              data={dummyActivityFeed}
            />
          </div>
        )}

        {/* Notifications & Alerts Section */}
        {showNotificationsSection && (
          <div className="section">
            <h2>Notifications & Alerts</h2>
            <button onClick={() => setPopupType('notification')} className="add-button">
              Add Notification
            </button>
            <DataTable
              columns={[
                { Header: 'Message', accessor: 'message' },
                { Header: 'Type', accessor: 'type' },
                { Header: 'Date', accessor: 'date' },
                { Header: 'Action Required', accessor: 'actionRequired', Cell: ({ value }) => (value ? 'Yes' : 'No') },
                { Header: 'Details', accessor: 'details' },
              ]}
              data={dummyNotifications}
            />
          </div>
        )}

        {/* Upcoming Events Section */}
        {showUpcomingEventsSection && (
          <div className="section">
            <h2>Upcoming Events</h2>
            <button onClick={() => setPopupType('event')} className="add-button">
              Add Event
            </button>
            <DataTable
              columns={[
                { Header: 'Event', accessor: 'event' },
                { Header: 'Staff', accessor: 'staff' },
                { Header: 'Date', accessor: 'date' },
                { Header: 'Details', accessor: 'details' },
                { Header: 'Location', accessor: 'location' },
              ]}
              data={dummyUpcomingEvents}
            />
          </div>
        )}

        {/* Team Assignments Section */}
        {showTeamAssignmentsSection && (
          <div className="section">
            <h2>Team Assignments</h2>
            <button onClick={() => setPopupType('teamAssignment')} className="add-button">
              Add Team Assignment
            </button>
            <DataTable
              columns={[
                { Header: 'Team', accessor: 'team' },
                { Header: 'Members', accessor: 'members' },
                { Header: 'Manager', accessor: 'manager' },
                { Header: 'Department', accessor: 'department' },
                { Header: 'Details', accessor: 'details' },
              ]}
              data={dummyTeamAssignments}
            />
          </div>
        )}

        {/* Engagement Surveys Section */}
        {showEngagementSurveysSection && (
          <div className="section">
            <h2>Engagement Surveys</h2>
            <button onClick={() => setPopupType('engagementSurvey')} className="add-button">
              Add Engagement Survey
            </button>
            <DataTable
              columns={[
                { Header: 'Survey', accessor: 'survey' },
                { Header: 'Status', accessor: 'status' },
                { Header: 'Date', accessor: 'date' },
                { Header: 'Participants', accessor: 'participants' },
                { Header: 'Average Score', accessor: 'averageScore' },
              ]}
              data={dummyEngagementSurveys}
            />
          </div>
        )}

        {/* Certification Tracking Section */}
        {showCertificationTrackingSection && (
          <div className="section">
            <h2>Certification Tracking</h2>
            <button onClick={() => setPopupType('certificationTracking')} className="add-button">
              Add Certification Tracking
            </button>
            <DataTable
              columns={[
                { Header: 'Staff', accessor: 'staff' },
                { Header: 'Certification', accessor: 'certification' },
                { Header: 'Expiry Date', accessor: 'expiryDate' },
                { Header: 'Status', accessor: 'status' },
                { Header: 'Days Remaining', accessor: 'daysRemaining' },
              ]}
              data={dummyCertificationTracking}
            />
          </div>
        )}

        {/* Popup Form */}
        <PopupForm
          isVisible={!!popupType}
          onClose={() => setPopupType(null)}
          onSubmit={handleFormSubmit}
          formFields={getFormFields()}
        />
      </div>
    </div>
  );
};

// Reusable Add Staff Form Component
const AddStaffForm = ({ onAddStaff, onCancel }) => {
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newStaff = {
      id: Date.now(), // Auto-generated id for simplicity
      name: formData.get('name'),
      role: formData.get('role'),
      department: formData.get('department'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      hireDate: formData.get('hireDate'),
      certifications: formData.get('certifications').split(','),
      trainingStatus: 'Pending',
    };

    // Validate inputs
    const validationErrors = validateStaffInput(newStaff);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Sanitize inputs
    const sanitizedStaff = sanitizeStaffInput(newStaff);

    // Add staff
    onAddStaff(sanitizedStaff);
  };

  return (
    <div className="add-staff-form">
      <h3>Add New Staff</h3>
      <form onSubmit={handleSubmit}>
        {['name', 'role', 'department', 'email', 'phone'].map((field) => (
          <div className="form-group" key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              placeholder={`Enter ${field}`}
              required
            />
            {errors[field] && <span className="error">{errors[field]}</span>}
          </div>
        ))}
        <div className="form-group">
          <label>Hire Date</label>
          <input type="date" name="hireDate" required />
          {errors.hireDate && <span className="error">{errors.hireDate}</span>}
        </div>
        <div className="form-group">
          <label>Certifications</label>
          <input
            type="text"
            name="certifications"
            placeholder="Enter certifications (comma separated)"
            required
          />
          {errors.certifications && <span className="error">{errors.certifications}</span>}
        </div>
        <div className="form-buttons">
          <button type="submit" className="add-staff-button">
            Add Staff
          </button>
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// Reusable Edit Staff Popup Component
const EditStaffPopup = ({ staffMember, onClose }) => {
  const [formData, setFormData] = useState(staffMember);
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

    // Validate inputs
    const validationErrors = validateStaffInput(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Sanitize inputs
    const sanitizedStaff = sanitizeStaffInput(formData);

    // Update staff data (you would typically send this to the backend)
    console.log('Updated Staff Data:', sanitizedStaff);
    onClose();
  };

  return (
    <div className="edit-staff-popup">
      <h3>Edit Staff Member</h3>
      <form onSubmit={handleSubmit}>
        {['name', 'role', 'department', 'email', 'phone'].map((field) => (
          <div className="form-group" key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
            />
            {errors[field] && <span className="error">{errors[field]}</span>}
          </div>
        ))}
        <div className="form-group">
          <label>Hire Date</label>
          <input
            type="date"
            name="hireDate"
            value={formData.hireDate}
            onChange={handleChange}
            required
          />
          {errors.hireDate && <span className="error">{errors.hireDate}</span>}
        </div>
        <div className="form-group">
          <label>Certifications</label>
          <input
            type="text"
            name="certifications"
            value={formData.certifications}
            onChange={handleChange}
            required
          />
          {errors.certifications && <span className="error">{errors.certifications}</span>}
        </div>
        <div className="form-buttons">
          <button type="submit" className="save-button">
            Save Changes
          </button>
          <button type="button" className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// Reusable Popup Form Component
const PopupForm = ({ isVisible, onClose, onSubmit, formFields }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({});
  };

  if (!isVisible) return null;

  return (
    <div className="popup-form-overlay">
      <div className="popup-form">
        <form onSubmit={handleSubmit}>
          {formFields.map((field) => (
            <div className="form-group" key={field.name}>
              <label>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                placeholder={field.placeholder}
                required={field.required}
              />
            </div>
          ))}
          <div className="form-buttons">
            <button type="submit" className="add-button">
              Add
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

export default StaffManagement;