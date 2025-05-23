import React from "react";
import "./Tutorial.css";

const ConnectCalendarTutorial = () => {
  return (
    <div className="tutorial-container">
      <h1>How to Connect External Calendars</h1>
      <p>Follow these steps to connect external calendars like Google Calendar or Outlook:</p>
      <ol>
        <li>Click the <strong>"Connect Calendar"</strong> button on the calendar page.</li>
        <li>Choose the calendar service you want to connect (e.g., Google Calendar or Outlook).</li>
        <li>Follow the prompts to authorize the connection.</li>
        <li>Once connected, your external calendar events will sync with this calendar.</li>
      </ol>
      <p>You can disconnect the calendar at any time from the settings.</p>
    </div>
  );
};

export default ConnectCalendarTutorial;