/**
 * CalendarPage.js
 * 
 * A comprehensive calendar component with event management capabilities including:
 * - Event creation with recurrence options
 * - Holiday and absence integration
 * - Multiple calendar views (month, week, day)
 * - Event filtering and searching
 * - Export functionality (CSV and PDF)
 * - External calendar integration
 * 
 * Dependencies:
 * - react-big-calendar: Main calendar component
 * - moment: Date handling
 * - rrule: Recurring event generation
 * - react-toastify: Notification system
 * - jspdf/html2canvas: PDF export functionality
 * 
 * Props: None
 * 
 * State Management:
 * - Manages events, holidays, absences, and UI state internally
 * - Uses React component state (consider Redux for larger applications)
 */

import React, { Component } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { CSSTransition } from 'react-transition-group';
import { RRule } from 'rrule';
import { toast } from 'react-toastify';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-toastify/dist/ReactToastify.css';
import './Calendar.css';
import SideMenu from "../../components/SideMenu";
import TopNavBar from "../../components/TopNavBar";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Initialize calendar localizer with moment.js
const localizer = momentLocalizer(moment);

class CalendarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // List of holidays to display on calendar
      holidaysList: [],
      
      // List of employee absences
      absentiesList: [],
      
      // Custom events created by users
      customEvents: [],
      
      // Currently selected event for details view
      selectedEvent: null,
      
      // Modal visibility states
      showAddEventModal: false,
      showConnectCalendarModal: false,
      showExportOptionsModal: false,
      
      // New event form data
      newEvent: {
        title: '',
        start: '',
        end: '',
        color: '#007bff', // Default blue color
        teamAssignment: '',
        reminder: '',
        recurrence: 'none', // Options: none, daily, weekly, monthly, yearly
        category: 'work', // Default category
        attachments: [], // Array of file objects
      },
      
      // Responsive design state
      isMobile: false,
      sideMenuVisible: true,
      
      // Connected external calendars
      connectedCalendars: [],
      
      // Filtering states
      searchTerm: '',
      filterCategory: 'all',
      filterTeam: 'all',
    };
  }

  /**
   * Lifecycle Methods
   */

  componentDidMount() {
    // Load initial data and setup responsive behavior
    this.fetchInitialData();
    this.setupResponsiveBehavior();
  }

  /**
   * Data Loading Methods
   */

  // Fetch all initial data needed for the calendar
  fetchInitialData = () => {
    this.getHolidaysList();
    this.getAbsentiesList();
  };

  // Setup window resize listener for responsive behavior
  setupResponsiveBehavior = () => {
    const handleResize = () => this.setState({ 
      isMobile: window.innerWidth <= 768 
    });
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
  };

  // Load predefined holidays (in a real app, this would be an API call)
  getHolidaysList = () => {
    const holidays = [
      { id: 1, occasion: 'Christmas', for_date: '2024-12-25', color: '#ff0000' },
      { id: 2, occasion: 'New Year', for_date: '2025-01-01', color: '#ff0000' },
    ];
    this.setState({ holidaysList: holidays });
  };

  // Load predefined absences (in a real app, this would be an API call)
  getAbsentiesList = () => {
    const leaves = [
      { id: 1, username: 'John Doe', start_at: '2024-12-15T00:00:00', end_at: '2024-12-16T00:00:00', color: '#00ff00' },
      { id: 2, username: 'Jane Smith', start_at: '2024-12-18T00:00:00', end_at: '2024-12-20T00:00:00', color: '#00ff00' },
    ];
    this.setState({ absentiesList: leaves });
  };

  /**
   * Event Handlers
   */

  // Handle clicking on a calendar event
  handleEventClick = (event) => {
    this.setState({ selectedEvent: event });
  };

  // Close the event details popup
  closeEventDetails = () => {
    this.setState({ selectedEvent: null });
  };

  // Toggle modal visibility
  toggleAddEventModal = () => this.setState(prev => ({ showAddEventModal: !prev.showAddEventModal }));
  toggleConnectCalendarModal = () => this.setState(prev => ({ showConnectCalendarModal: !prev.showConnectCalendarModal }));
  toggleExportOptionsModal = () => this.setState(prev => ({ showExportOptionsModal: !prev.showExportOptionsModal }));

  // Handle form input changes
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      newEvent: { ...prevState.newEvent, [name]: value }
    }));
  };

  // Handle file uploads for event attachments
  handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    this.setState(prevState => ({
      newEvent: {
        ...prevState.newEvent,
        attachments: [...prevState.newEvent.attachments, ...files]
      }
    }));
  };

  /**
   * Event Management Methods
   */

  // Validate and add a new event to the calendar
  addNewEvent = () => {
    const { title, start, end } = this.state.newEvent;
    
    // Basic validation
    if (!title || !start || !end) {
      toast.error('Please fill out all required fields!');
      return;
    }

    const newEvent = this.createEventObject();
    const eventsToAdd = this.state.newEvent.recurrence === 'none' 
      ? [newEvent] 
      : this.generateRecurringEvents(newEvent);

    this.updateCalendarWithNewEvents(eventsToAdd);
  };

  // Create a properly formatted event object
  createEventObject = () => {
    const { newEvent } = this.state;
    return {
      id: Date.now(), // Simple unique ID generation
      title: newEvent.title,
      start: new Date(newEvent.start),
      end: new Date(newEvent.end),
      color: newEvent.color,
      teamAssignment: newEvent.teamAssignment,
      reminder: newEvent.reminder,
      category: newEvent.category,
      attachments: newEvent.attachments,
      allDay: true // Currently all events are treated as all-day
    };
  };

  // Update state with new events and handle reminders
  updateCalendarWithNewEvents = (eventsToAdd) => {
    this.setState(prevState => ({
      customEvents: [...prevState.customEvents, ...eventsToAdd],
      newEvent: { 
        title: '', 
        start: '', 
        end: '', 
        color: '#007bff', 
        teamAssignment: '', 
        reminder: '', 
        recurrence: 'none', 
        category: 'work', 
        attachments: [] 
      },
      showAddEventModal: false
    }));

    // Schedule reminder if set
    if (this.state.newEvent.reminder) {
      this.scheduleReminder(eventsToAdd[0]);
    }
  };

  // Generate recurring events using RRule
  generateRecurringEvents = (event) => {
    const rule = new RRule({
      freq: RRule[event.recurrence.toUpperCase()],
      dtstart: new Date(event.start),
      until: new Date(event.end),
    });

    return rule.all().map(date => ({
      ...event,
      start: date,
      end: date,
    }));
  };

  // Schedule a reminder notification
  scheduleReminder = (event) => {
    const timeUntilEvent = new Date(event.start) - new Date();
    if (timeUntilEvent > 0) {
      setTimeout(() => {
        toast.info(`Reminder: ${event.title} is starting soon!`);
      }, timeUntilEvent);
    }
  };

  // Handle event drag-and-drop rescheduling
  handleEventDrop = ({ event, start, end }) => {
    this.updateEvent(event.id, { start, end });
  };

  // Handle event duration resizing
  handleEventResize = ({ event, start, end }) => {
    this.updateEvent(event.id, { start, end });
  };

  // Update an existing event's properties
  updateEvent = (eventId, updates) => {
    this.setState(prevState => ({
      customEvents: prevState.customEvents.map(evt =>
        evt.id === eventId ? { ...evt, ...updates } : evt
      )
    }));
  };

  /**
   * Export Methods
   */

  // Export all events to CSV format
  exportToCSV = () => {
    const { customEvents, holidaysList, absentiesList } = this.state;
    const events = [...holidaysList, ...absentiesList, ...customEvents];
    const headers = "Title,Start Date,End Date,Category,Team Assignment";
    
    // Format each event as a CSV row
    const csvRows = events.map(event => 
      `"${event.title}","${moment(event.start).format("YYYY-MM-DD HH:mm")}",` +
      `"${moment(event.end).format("YYYY-MM-DD HH:mm")}","${event.category || "N/A"}","${event.teamAssignment || "N/A"}"`
    );

    this.downloadFile(
      "data:text/csv;charset=utf-8," + [headers, ...csvRows].join("\n"),
      "calendar_events.csv"
    );
  };

  // Export calendar view to PDF
  exportToPDF = () => {
    const input = document.getElementById("calendar-container");
    const pdf = new jsPDF("landscape");

    // Convert calendar to image and add to PDF
    html2canvas(input, { scale: 3, useCORS: true })
      .then(canvas => {
        const imgData = canvas.toDataURL("image/png", 1.0);
        const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
        const pdfHeight = pdf.internal.pageSize.getHeight() - 20;
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, "PNG", 10, 10, pdfWidth, Math.min(imgHeight, pdfHeight));
        pdf.save("calendar_events.pdf");
      });
  };

  // Helper function to trigger file downloads
  downloadFile = (content, filename) => {
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(content));
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /**
   * Filter Methods
   */

  handleSearchChange = (e) => this.setState({ searchTerm: e.target.value });
  handleCategoryFilterChange = (e) => this.setState({ filterCategory: e.target.value });
  handleTeamFilterChange = (e) => this.setState({ filterTeam: e.target.value });

  /**
   * External Calendar Integration
   */

  connectCalendar = (service) => {
    toast.success(`Connecting to ${service}...`);
    // In a real implementation, this would connect to the actual calendar API
    this.setState(prev => ({
      connectedCalendars: [...prev.connectedCalendars, service],
      showConnectCalendarModal: false
    }));
  };

  /**
   * Rendering Helper Methods
   */

  // Get style properties for calendar events based on category
  getEventStyle = (event) => ({
    style: {
      backgroundColor: event.category === 'work' ? '#007bff' : 
                     event.category === 'personal' ? '#28a745' : '#dc3545',
      borderRadius: '4px',
      padding: '5px',
      color: '#fff',
    }
  });

  // Render event details for the popup
  renderEventDetails = (event) => (
    <>
      <p><strong>Title:</strong> {event.title}</p>
      <p><strong>Start:</strong> {moment(event.start).format('MMMM Do YYYY, h:mm a')}</p>
      <p><strong>End:</strong> {moment(event.end).format('MMMM Do YYYY, h:mm a')}</p>
      {event.teamAssignment && <p><strong>Team:</strong> {event.teamAssignment}</p>}
      {event.reminder && <p><strong>Reminder:</strong> {event.reminder}</p>}
      {this.renderAttachments(event.attachments)}
    </>
  );

  // Render attachment links if they exist
  renderAttachments = (attachments) => (
    attachments?.length > 0 && (
      <div className="event-attachments">
        <strong>Attachments:</strong>
        {attachments.map((file, index) => (
          <div key={index}>
            <a href={URL.createObjectURL(file)} download={file.name}>
              {file.name}
            </a>
          </div>
        ))}
      </div>
    )
  );

  // Render the event creation form
  renderEventForm = () => {
    const { newEvent } = this.state;
    return (
      <form onSubmit={(e) => { e.preventDefault(); this.addNewEvent(); }}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={newEvent.title}
            onChange={this.handleInputChange}
            required
            aria-required="true"
          />
        </label>
        <label>
          Start Date:
          <input
            type="datetime-local"
            name="start"
            value={newEvent.start}
            onChange={this.handleInputChange}
            required
          />
        </label>
        <label>
          End Date:
          <input
            type="datetime-local"
            name="end"
            value={newEvent.end}
            onChange={this.handleInputChange}
            required
          />
        </label>
        <label>
          Color:
          <input
            type="color"
            name="color"
            value={newEvent.color}
            onChange={this.handleInputChange}
          />
        </label>
        <label>
          Team Assignment:
          <input
            type="text"
            name="teamAssignment"
            value={newEvent.teamAssignment}
            onChange={this.handleInputChange}
          />
        </label>
        <label>
          Reminder:
          <select
            name="reminder"
            value={newEvent.reminder}
            onChange={this.handleInputChange}
          >
            <option value="">No Reminder</option>
            <option value="Email">Email</option>
            <option value="SMS">SMS</option>
            <option value="In-App">In-App Notification</option>
          </select>
        </label>
        <label>
          Recurrence:
          <select
            name="recurrence"
            value={newEvent.recurrence}
            onChange={this.handleInputChange}
          >
            <option value="none">None</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </label>
        <label>
          Category:
          <select
            name="category"
            value={newEvent.category}
            onChange={this.handleInputChange}
          >
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="team">Team</option>
          </select>
        </label>
        <label>
          Attachments:
          <input
            type="file"
            multiple
            onChange={this.handleFileUpload}
          />
        </label>
      </form>
    );
  };

  /**
   * Main Render Method
   */

  render() {
    const {
      holidaysList,
      absentiesList,
      customEvents,
      selectedEvent,
      showAddEventModal,
      showConnectCalendarModal,
      showExportOptionsModal,
      isMobile,
      searchTerm,
      filterCategory,
      filterTeam
    } = this.state;

    // Transform holidays data for calendar display
    const holidays = holidaysList.map(holiday => ({
      id: holiday.id,
      title: holiday.occasion,
      start: moment(holiday.for_date).toDate(),
      end: moment(holiday.for_date).toDate(),
      color: holiday.color,
      allDay: true,
    }));

    // Transform absences data for calendar display
    const leaves = absentiesList.map(leave => ({
      id: leave.id,
      title: leave.username,
      start: moment(leave.start_at).toDate(),
      end: moment(leave.end_at).toDate(),
      color: leave.color,
      allDay: true,
    }));

    // Combine all events and apply filters
    const events = [...holidays, ...leaves, ...customEvents];
    const filteredEvents = events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
      const matchesTeam = filterTeam === 'all' || event.teamAssignment === filterTeam;
      return matchesSearch && matchesCategory && matchesTeam;
    });

    return (
      <div className="calendar-page">
        {/* Responsive navigation - shows TopNavBar on mobile, SideMenu on desktop */}
        {isMobile ? <TopNavBar /> : <SideMenu />}

        <div className="calendar-content">
          <h2>Interactive Calendar</h2>
          
          {/* Main action buttons */}
          <div className="calendar-actions">
            <button className="add-event-button" onClick={this.toggleAddEventModal}>
              Add Event
            </button>
            <button className="connect-calendar-button" onClick={this.toggleConnectCalendarModal}>
              Connect Calendar
            </button>
            <button className="export-button" onClick={this.toggleExportOptionsModal}>
              Export
            </button>
          </div>

          {/* Search and filter controls */}
          <div className="search-and-filter">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={this.handleSearchChange}
              aria-label="Search events"
            />
            
            <select 
              value={filterCategory} 
              onChange={this.handleCategoryFilterChange}
              aria-label="Filter by category"
            >
              <option value="all">All Categories</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="team">Team</option>
            </select>
            
            <select 
              value={filterTeam} 
              onChange={this.handleTeamFilterChange}
              aria-label="Filter by team"
            >
              <option value="all">All Teams</option>
              <option value="Team A">Team A</option>
              <option value="Team B">Team B</option>
              <option value="Team C">Team C</option>
            </select>
          </div>

          {/* Export Options Modal */}
          <CSSTransition 
            in={showExportOptionsModal} 
            timeout={300} 
            classNames="fade" 
            unmountOnExit
          >
            <div className="export-options-modal" role="dialog" aria-labelledby="export-modal-title">
              <div className="modal-content">
                <h3 id="export-modal-title">Export Options</h3>
                <button onClick={this.exportToCSV}>Export to CSV</button>
                <button onClick={this.exportToPDF}>Export to PDF</button>
                <button onClick={this.toggleExportOptionsModal}>Cancel</button>
              </div>
            </div>
          </CSSTransition>

          {/* Main Calendar Component */}
          <div id="calendar-container">
            <BigCalendar
              localizer={localizer}
              events={filteredEvents}
              startAccessor="start"
              endAccessor="end"
              defaultDate={moment().toDate()}
              style={{ height: '80vh' }}
              eventPropGetter={this.getEventStyle}
              onSelectEvent={this.handleEventClick}
              onEventDrop={this.handleEventDrop}
              onEventResize={this.handleEventResize}
              resizable
              selectable
              views={['month', 'week', 'day']}
            />
          </div>

          {/* Event Details Popup */}
          <CSSTransition 
            in={!!selectedEvent} 
            timeout={300} 
            classNames="fade" 
            unmountOnExit
          >
            <div className="event-details-popup" role="dialog" aria-labelledby="event-details-title">
              <div className="popup-content">
                <h3 id="event-details-title">Event Details</h3>
                {selectedEvent && this.renderEventDetails(selectedEvent)}
                <button onClick={this.closeEventDetails}>Close</button>
              </div>
            </div>
          </CSSTransition>

          {/* Add Event Modal */}
          <CSSTransition 
            in={showAddEventModal} 
            timeout={300} 
            classNames="fade" 
            unmountOnExit
          >
            <div className="add-event-modal" role="dialog" aria-labelledby="add-event-title">
              <div className="modal-content">
                <h3 id="add-event-title">Add New Event</h3>
                {this.renderEventForm()}
                <div className="modal-buttons">
                  <button onClick={this.addNewEvent}>Add</button>
                  <button onClick={this.toggleAddEventModal}>Cancel</button>
                </div>
              </div>
            </div>
          </CSSTransition>

          {/* Connect Calendar Modal */}
          <CSSTransition 
            in={showConnectCalendarModal} 
            timeout={300} 
            classNames="fade" 
            unmountOnExit
          >
            <div className="connect-calendar-modal" role="dialog" aria-labelledby="connect-calendar-title">
              <div className="modal-content">
                <h3 id="connect-calendar-title">Connect External Calendar</h3>
                <button onClick={() => this.connectCalendar('Google Calendar')}>
                  Connect Google Calendar
                </button>
                <button onClick={() => this.connectCalendar('Outlook')}>
                  Connect Outlook
                </button>
                <button onClick={this.toggleConnectCalendarModal}>Cancel</button>
              </div>
            </div>
          </CSSTransition>
        </div>
      </div>
    );
  }
}

export default CalendarPage;