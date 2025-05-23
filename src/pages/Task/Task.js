import React, { useState, useEffect } from 'react';
import validator from 'validator'; // Import validator.js
import { useLocation } from 'react-router-dom'; // Import useLocation to access navigation state
import introJs from 'intro.js'; // Import Intro.js
import 'intro.js/introjs.css'; // Import Intro.js CSS
import SideMenu from '../../components/SideMenu';
import TopNavBar from '../../components/TopNavBar';
import DataTable from '../../components/DataTable';
import GraphsSection from '../../components/GraphsSection'; // Import the GraphsSection component
import './Task.css';

// Define tutorial steps
const tutorialSteps = [
  {
    element: '#add-task-button',
    intro: 'Click this button to add a new task.',
  },
  {
    element: '.task-table-container',
    intro: 'This table displays all your tasks. You can edit or delete tasks here.',
  },
  {
    element: '#graphs-section',
    intro: 'This section shows visualizations of your tasks, such as completion status and trends over time.',
  },
  {
    element: '#section-buttons',
    intro: 'Use these buttons to toggle the visibility of the Activity Log and Task Templates sections.',
  },
  {
    element: '#chart-toggle-button',
    intro: 'Click this button to show or hide the chart options panel.',
  },
];

const allColumns = [
  { Header: 'Task Name', accessor: 'taskName' },
  { Header: 'Staff Involved', accessor: 'staffInvolved' },
  { Header: 'Task Details', accessor: 'taskDetails' },
  { Header: 'Task Date', accessor: 'taskDate' },
  { Header: 'Task Priority', accessor: 'taskPriority' },
  { Header: 'Status', accessor: 'status' },
  { Header: 'Time Spent', accessor: 'timeSpent' },
  { Header: 'Comments', accessor: 'comments' },
];

const dummyTaskData = [
  { id: 1, taskName: 'Task 1', staffInvolved: 'John Doe', taskDetails: 'Details for Task 1', taskDate: '2024-01-15', taskPriority: 'High', status: 'Completed', timeSpent: '2 hours', comments: 'Initial setup completed' },
  { id: 2, taskName: 'Task 2', staffInvolved: 'Jane Smith', taskDetails: 'Details for Task 2', taskDate: '2024-02-15', taskPriority: 'Medium', status: 'In Progress', timeSpent: '1 hour', comments: 'Testing in progress' },
  { id: 3, taskName: 'Task 3', staffInvolved: 'Alice Johnson', taskDetails: 'Details for Task 3', taskDate: '2024-03-15', taskPriority: 'Low', status: 'Pending', timeSpent: '0 hours', comments: 'Awaiting approval' },
  // Add more dummy tasks here as needed
];

const dummyStaffData = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Alice Johnson' },
  // Add more dummy staff here as needed
];

const dummyActivityLog = [
  { id: 1, date: '2024-01-15', user: 'Admin', action: 'Created', comments: 'Task 1 created' },
  { id: 2, date: '2024-02-15', user: 'John Doe', action: 'Updated', comments: 'Task 2 updated' },
  // More activities
];

const dummyTaskTemplates = [
  { id: 1, templateName: 'Project Kickoff', description: 'Template for project kickoff tasks', tasks: ['Define scope', 'Assign roles', 'Set deadlines'] },
  { id: 2, templateName: 'Sprint Planning', description: 'Template for sprint planning tasks', tasks: ['Backlog grooming', 'Task assignment', 'Sprint goal setting'] },
  // More templates
];

// Input validation function
const validateTaskInput = (data) => {
  const errors = {};

  // Validate task name
  if (!data.taskName || !validator.isLength(data.taskName, { min: 2, max: 50 })) {
    errors.taskName = 'Task name must be between 2 and 50 characters.';
  }

  // Validate staff involved
  if (!data.staffInvolved || !validator.isLength(data.staffInvolved, { min: 2, max: 100 })) {
    errors.staffInvolved = 'Staff involved must be between 2 and 100 characters.';
  }

  // Validate task details
  if (!data.taskDetails || !validator.isLength(data.taskDetails, { min: 2, max: 500 })) {
    errors.taskDetails = 'Task details must be between 2 and 500 characters.';
  }

  // Validate task date
  if (!data.taskDate || !validator.isDate(data.taskDate)) {
    errors.taskDate = 'Invalid task date.';
  }

  // Validate task priority
  if (!data.taskPriority || !['High', 'Medium', 'Low'].includes(data.taskPriority)) {
    errors.taskPriority = 'Invalid task priority.';
  }

  // Validate status
  if (!data.status || !['Completed', 'In Progress', 'Pending'].includes(data.status)) {
    errors.status = 'Invalid status.';
  }

  return errors;
};

// Input sanitization function
const sanitizeTaskInput = (data) => {
  return {
    taskName: validator.escape(data.taskName.trim()),
    staffInvolved: validator.escape(data.staffInvolved.trim()),
    taskDetails: validator.escape(data.taskDetails.trim()),
    taskDate: validator.escape(data.taskDate.trim()),
    taskPriority: validator.escape(data.taskPriority.trim()),
    status: validator.escape(data.status.trim()),
    timeSpent: validator.escape(data.timeSpent.trim()),
    comments: validator.escape(data.comments.trim()),
  };
};

const Task = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [taskData, setTaskData] = useState(dummyTaskData);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);

  // State for collapsible sections
  const [showActivityLogSection, setShowActivityLogSection] = useState(false);
  const [showTaskTemplatesSection, setShowTaskTemplatesSection] = useState(false);

  // State for popup forms
  const [popupType, setPopupType] = useState(null);

  // State for chart preferences
  const [enabledCharts, setEnabledCharts] = useState({
    barChart: true,
    pieChart: true,
    lineChart: true,
  });

  // State for chart panel visibility
  const [isChartPanelOpen, setIsChartPanelOpen] = useState(false);

  // Bar Chart Data Options (Task Management)
  const [barChartDataOptions] = useState([
    {
      title: "Monthly Tasks Completed",
      data: [
        { label: "January", value: 120 },
        { label: "February", value: 150 },
        { label: "March", value: 180 },
        { label: "April", value: 220 },
        { label: "May", value: 250 },
        { label: "June", value: 270 },
      ],
    },
    {
      title: "Monthly Tasks Assigned",
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

  // Pie Chart Data Options (Task Management)
  const [pieChartDataOptions] = useState([
    {
      title: "Task Status Distribution",
      data: [
        { label: "Completed", value: 60 },
        { label: "In Progress", value: 20 },
        { label: "Pending", value: 10 },
        { label: "Overdue", value: 10 },
      ],
    },
    {
      title: "Tasks by Priority",
      data: [
        { label: "High Priority", value: 40 },
        { label: "Medium Priority", value: 30 },
        { label: "Low Priority", value: 20 },
        { label: "No Priority", value: 10 },
      ],
    },
  ]);

  // Line Chart Data Options (Task Management)
  const [lineChartDataOptions] = useState([
    {
      title: "Weekly Task Completion Rate",
      data: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
        datasets: [
          {
            label: "Tasks Completed",
            data: [10, 30, 50, 70, 90],
            borderColor: "#4e79a7",
            backgroundColor: "#4e79a720",
          },
        ],
      },
    },
    {
      title: "Weekly Task Assignment Rate",
      data: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
        datasets: [
          {
            label: "Tasks Assigned",
            data: [80, 85, 90, 88, 92],
            borderColor: "#e15759",
            backgroundColor: "#e1575920",
          },
        ],
      },
    },
  ]);

  // Info Cards Data (Task Management)
  const [selectedInfoCards, setSelectedInfoCards] = useState([
    { label: "Total Tasks", key: "totalTasks", value: "500" },
    { label: "Tasks Completed", key: "tasksCompleted", value: "400" },
    { label: "Tasks In Progress", key: "tasksInProgress", value: "50" },
    { label: "Tasks Overdue", key: "tasksOverdue", value: "10" },
  ]);

  const allInfoCards = [
    { label: "Total Tasks", key: "totalTasks", value: "500" },
    { label: "Tasks Completed", key: "tasksCompleted", value: "400" },
    { label: "Tasks In Progress", key: "tasksInProgress", value: "50" },
    { label: "Tasks Overdue", key: "tasksOverdue", value: "10" },
    { label: "Tasks Assigned Today", key: "tasksAssignedToday", value: "40" },
    { label: "Tasks Due Today", key: "tasksDueToday", value: "20" },
    { label: "High Priority Tasks", key: "highPriorityTasks", value: "50" },
    { label: "Medium Priority Tasks", key: "mediumPriorityTasks", value: "30" },
    { label: "Low Priority Tasks", key: "lowPriorityTasks", value: "20" },
    { label: "Tasks Awaiting Approval", key: "tasksAwaitingApproval", value: "15" },
    { label: "Tasks Blocked", key: "tasksBlocked", value: "8" },
    { label: "Tasks On Hold", key: "tasksOnHold", value: "5" },
    { label: "Tasks Reopened", key: "tasksReopened", value: "10" },
    { label: "Tasks Cancelled", key: "tasksCancelled", value: "5" },
    { label: "Tasks Archived", key: "tasksArchived", value: "2" },
  ];

  // Table Data (Task Management)
  const [tableData, setTableData] = useState([
    { id: 1, activity: "New Task Created", user: "John Doe", timestamp: "2025-02-20 10:15 AM", category: "Task", status: "Completed" },
    { id: 2, activity: "Task Assigned", user: "Jane Smith", timestamp: "2025-02-19 3:30 PM", category: "Assignment", status: "Scheduled" },
    { id: 3, activity: "Task Updated", user: "Alice Johnson", timestamp: "2025-02-18 9:45 AM", category: "Update", status: "Pending" },
    { id: 4, activity: "Task Completed", user: "Michael Lee", timestamp: "2025-02-17 1:10 PM", category: "Completion", status: "Completed" },
    { id: 5, activity: "Task Overdue", user: "Emma Brown", timestamp: "2025-02-16 4:20 PM", category: "Overdue", status: "Approved" },
  ]);

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

  // Start the tutorial if the startTutorial flag is set
  useEffect(() => {
    if (location.state?.startTaskTutorial) {
      startTutorial();
    }
  }, [location.state]);

  const startTutorial = () => {
    introJs()
      .setOptions({
        steps: tutorialSteps,
        showProgress: true,
        showBullets: false,
        scrollToElement: true,
        disableInteraction: true,
      })
      .onchange((element) => {
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      })
      .onexit(() => {
        document.body.classList.remove('body-no-scroll');
      })
      .start();
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const columnsToDisplay = isMobile
    ? allColumns.filter((col) => ['taskName', 'status', 'taskDate'].includes(col.accessor))
    : allColumns;

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setShowPopup(true);
  };

  const handleDeleteClick = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      setTaskData(taskData.filter((task) => task.id !== id));
      setShowPopup(false);
    }
  };

  const handleAddTaskClick = () => {
    setIsAddFormVisible(!isAddFormVisible);
  };

  const handleAddNewTask = (newTask) => {
    setTaskData([...taskData, newTask]);
    setIsAddFormVisible(false);
  };

  const handleAddTeamAssignment = (newTeamAssignment) => {
    console.log('New Team Assignment:', newTeamAssignment);
    setPopupType(null);
  };

  const handleAddActivityLog = (newActivityLog) => {
    console.log('New Activity Log:', newActivityLog);
    setPopupType(null);
  };

  const handleAddTaskTemplate = (newTaskTemplate) => {
    console.log('New Task Template:', newTaskTemplate);
    setPopupType(null);
  };

  const getFormFields = () => {
    switch (popupType) {
      case 'teamAssignment':
        return [
          { name: 'task', label: 'Task', type: 'text', placeholder: 'Enter Task', required: true },
          { name: 'members', label: 'Members', type: 'text', placeholder: 'Enter Members', required: true },
          { name: 'role', label: 'Role', type: 'text', placeholder: 'Enter Role', required: true },
          { name: 'assignmentDate', label: 'Assignment Date', type: 'date', placeholder: 'Enter Assignment Date', required: true },
          { name: 'status', label: 'Status', type: 'text', placeholder: 'Enter Status', required: true },
          { name: 'workload', label: 'Workload', type: 'text', placeholder: 'Enter Workload', required: true },
        ];
      case 'activityLog':
        return [
          { name: 'date', label: 'Date', type: 'date', placeholder: 'Enter Date', required: true },
          { name: 'user', label: 'User', type: 'text', placeholder: 'Enter User', required: true },
          { name: 'action', label: 'Action', type: 'text', placeholder: 'Enter Action', required: true },
          { name: 'comments', label: 'Comments', type: 'text', placeholder: 'Enter Comments', required: true },
        ];
      case 'taskTemplate':
        return [
          { name: 'templateName', label: 'Template Name', type: 'text', placeholder: 'Enter Template Name', required: true },
          { name: 'description', label: 'Description', type: 'text', placeholder: 'Enter Description', required: true },
          { name: 'tasks', label: 'Tasks', type: 'text', placeholder: 'Enter Tasks (comma separated)', required: true },
        ];
      default:
        return [];
    }
  };

  const handleFormSubmit = (data) => {
    switch (popupType) {
      case 'teamAssignment':
        handleAddTeamAssignment(data);
        break;
      case 'activityLog':
        handleAddActivityLog(data);
        break;
      case 'taskTemplate':
        handleAddTaskTemplate(data);
        break;
      default:
        break;
    }
  };

  // Prepare data for the Pie Chart (Task Completion Status)
  const taskCompletionStatus = taskData.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = Object.keys(taskCompletionStatus).map(status => ({
    label: status,
    value: taskCompletionStatus[status],
  }));

  // Prepare data for the Bar Chart (Tasks by Status)
  const tasksByStatus = taskData.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  const barChartData = Object.keys(tasksByStatus).map(status => ({
    label: status,
    value: tasksByStatus[status],
  }));

  // Line Chart Data (Example: Tasks Over Time)
  const tasksOverTime = taskData.reduce((acc, task) => {
    const date = task.taskDate;
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const lineChartData = {
    labels: Object.keys(tasksOverTime),
    datasets: [
      {
        label: 'Tasks Over Time',
        data: Object.values(tasksOverTime),
        borderColor: '#4e79a7',
        backgroundColor: '#4e79a720',
      },
    ],
  };

  return (
    <div className="task-management-container">
      {isMobile ? <TopNavBar /> : <SideMenu />}

      <div className="task-table-container">
        <h1 className="task-table-title">Task Management</h1>

        {/* Toggle Button for Chart Selection Panel */}
        <button
          id="chart-toggle-button"
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

        {/* Use the GraphsSection component */}
        <GraphsSection
          barChartDataOptions={barChartDataOptions}
          pieChartDataOptions={pieChartDataOptions}
          lineChartDataOptions={lineChartDataOptions}
          barChartTitle="Task Performance"
          lineChartTitle="Weekly Task Metrics"
          enabledCharts={enabledCharts}
          id="graphs-section" // Add ID for tutorial
        />

        <DataTable columns={columnsToDisplay} data={taskData} onEdit={handleEditClick} onDelete={handleDeleteClick} />

        <button id="add-task-button" onClick={handleAddTaskClick} className="add-task-button">
          {isAddFormVisible ? 'Cancel' : 'Add New Task'}
        </button>

        {isAddFormVisible && (
          <AddTaskForm onAddTask={handleAddNewTask} onCancel={() => setIsAddFormVisible(false)} staffData={dummyStaffData} />
        )}

        {showPopup && selectedTask && (
          <EditTaskPopup task={selectedTask} onClose={() => setShowPopup(false)} />
        )}
        <h2 id="task-additional-details" className="task-details-heading">
          Additional Task Details
        </h2>

        {/* Buttons to toggle section visibility */}
        <div className="section-buttons" id="section-buttons">
          <button onClick={() => setShowActivityLogSection(!showActivityLogSection)}>
            {showActivityLogSection ? 'Hide Activity Log' : 'Show Activity Log'}
          </button>
          <button onClick={() => setShowTaskTemplatesSection(!showTaskTemplatesSection)}>
            {showTaskTemplatesSection ? 'Hide Task Templates' : 'Show Task Templates'}
          </button>
        </div>

        {/* Activity Log Section */}
        {showActivityLogSection && (
          <div className="section">
            <h2>Activity Log</h2>
            <button onClick={() => setPopupType('activityLog')} className="add-button">
              Add Activity Log
            </button>
            <DataTable
              columns={[
                { Header: 'Date', accessor: 'date' },
                { Header: 'User', accessor: 'user' },
                { Header: 'Action', accessor: 'action' },
                { Header: 'Comments', accessor: 'comments' },
              ]}
              data={dummyActivityLog}
            />
          </div>
        )}

        {/* Task Templates Section */}
        {showTaskTemplatesSection && (
          <div className="section">
            <h2>Task Templates</h2>
            <button onClick={() => setPopupType('taskTemplate')} className="add-button">
              Add Task Template
            </button>
            <DataTable
              columns={[
                { Header: 'Template Name', accessor: 'templateName' },
                { Header: 'Description', accessor: 'description' },
                { Header: 'Tasks', accessor: 'tasks', Cell: ({ value }) => value.join(', ') },
              ]}
              data={dummyTaskTemplates}
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

// Reusable Add Task Form Component
const AddTaskForm = ({ onAddTask, onCancel, staffData }) => {
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTask = {
      id: Date.now(), // Auto-generated id for simplicity
      taskName: formData.get('taskName'),
      staffInvolved: selectedStaff.join(', '),
      taskDetails: formData.get('taskDetails'),
      taskDate: formData.get('taskDate'),
      taskPriority: formData.get('taskPriority'),
      status: 'Pending',
      timeSpent: '0 hours',
      comments: '',
    };

    // Validate inputs
    const validationErrors = validateTaskInput(newTask);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Sanitize inputs
    const sanitizedTask = sanitizeTaskInput(newTask);

    // Add task
    onAddTask(sanitizedTask);
  };

  const handleStaffSelection = (name) => {
    if (selectedStaff.includes(name)) {
      setSelectedStaff(selectedStaff.filter((staff) => staff !== name));
    } else {
      setSelectedStaff([...selectedStaff, name]);
    }
  };
  
  const filteredStaff = staffData.filter(staff =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="add-task-form">
      <h3>Add New Task</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Task Name</label>
          <input type="text" name="taskName" placeholder="Enter Task Name" required />
          {errors.taskName && <span className="error">{errors.taskName}</span>}
        </div>
        <div className="form-group">
          <label>Staff Involved</label>
          <div className="dropdown-container">
            <div
              className="dropdown-header"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {selectedStaff.length > 0
                ? `Selected: ${selectedStaff.length} staff`
                : 'Select Staff'}
            </div>
            {isDropdownOpen && (
              <div className="dropdown">
                <input
                  type="text"
                  placeholder="Type a name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="dropdown-search"
                />
                <ul className="dropdown-list">
                  {filteredStaff.length > 0 ? (
                    filteredStaff.map((staff) => (
                      <li
                        key={staff.id}
                        className={`dropdown-item ${
                          selectedStaff.includes(staff.name) ? 'selected' : ''
                        }`}
                        onClick={() => handleStaffSelection(staff.name)}
                      >
                        {staff.name}
                      </li>
                    ))
                  ) : (
                    <li className="no-results">No results found</li>
                  )}
                </ul>
              </div>
            )}
          </div>
          {errors.staffInvolved && <span className="error">{errors.staffInvolved}</span>}
        </div>
        <div className="form-group">
          <label>Task Details</label>
          <textarea name="taskDetails" placeholder="Enter Task Details" required />
          {errors.taskDetails && <span className="error">{errors.taskDetails}</span>}
        </div>
        <div className="form-group">
          <label>Task Date</label>
          <input type="date" name="taskDate" required />
          {errors.taskDate && <span className="error">{errors.taskDate}</span>}
        </div>
        <div className="form-group">
          <label>Task Priority</label>
          <select name="taskPriority" required>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          {errors.taskPriority && <span className="error">{errors.taskPriority}</span>}
        </div>
        <div className="form-buttons">
          <button type="submit" className="add-task-button">
            Add Task
          </button>
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// Reusable Edit Task Popup Component
const EditTaskPopup = ({ task, onClose }) => {
  const [formData, setFormData] = useState(task);
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
    const validationErrors = validateTaskInput(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Sanitize inputs
    const sanitizedTask = sanitizeTaskInput(formData);

    // Update task data (you would typically send this to the backend)
    console.log('Updated Task Data:', sanitizedTask);
    onClose();
  };

  return (
    <div className="edit-task-popup">
      <h3>Edit Task</h3>
      <form onSubmit={handleSubmit}>
        {['taskName', 'staffInvolved', 'taskDetails', 'taskDate', 'taskPriority', 'status', 'timeSpent', 'comments'].map((field) => (
          <div className="form-group" key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            {field === 'taskDetails' || field === 'comments' ? (
              <textarea
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            ) : (
              <input
                type={field === 'taskDate' ? 'date' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            )}
            {errors[field] && <span className="error">{errors[field]}</span>}
          </div>
        ))}
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

export default Task;
