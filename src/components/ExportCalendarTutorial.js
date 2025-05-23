import React from "react";
import "./Tutorial.css";

const ExportCalendarTutorial = () => {
  return (
    <div className="tutorial-container">
      <h1>How to Export the Calendar</h1>
      <p>Follow these steps to export your calendar:</p>
      <ol>
        <li>Click the <strong>"Export"</strong> button on the calendar page.</li>
        <li>Choose the export format: <strong>CSV</strong> or <strong>PDF</strong>.</li>
        <li>Click <strong>"Export"</strong> to download the file.</li>
      </ol>
      <p>You can export all events, including holidays, leaves, and custom events.</p>
    </div>
  );
};

export default ExportCalendarTutorial;