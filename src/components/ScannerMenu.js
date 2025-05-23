import React from "react";
import "./ScannerMenu.css"; // Add styling as needed

const ScannerMenu = ({ onClose, onHandheldScan, onCameraScan }) => {
  return (
    <div className="scanner-menu-overlay">
      <div className="scanner-menu-content">
        <button onClick={onCameraScan} className="scanner-menu-button">
          Camera Scanner
        </button>
        <button onClick={onClose} className="scanner-menu-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default ScannerMenu;