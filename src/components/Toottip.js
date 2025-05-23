// src/components/Tooltip.js
import React, { useState } from 'react';
import './Tooltip.css';

const Tooltip = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="tooltip-wrapper">
      <div 
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div className="tooltip">
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;