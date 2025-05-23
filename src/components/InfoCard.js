import React, { useState } from "react";
import "./InfoCard.css";

const InfoCard = ({
  title,
  value,
  description,
  icon,
  bgColor = "#ffffff",
  textColor = "#333",
  onClick,
  isLoading = false, // New loading state
  tooltip, // Tooltip for extra info
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="info-card"
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
      title={tooltip} // Tooltip on hover
    >
      {isLoading ? (
        <div className="info-card-loading">
          <div className="loading-icon" />
          <div className="loading-text" />
        </div>
      ) : (
        <>
          <div className="info-card-icon">{icon}</div>
          <h3>{title}</h3>
          <p className="info-card-value">{value}</p>
          <p className="info-card-description">
            {expanded ? description : `${description.substring(0, 50)}...`}
            {description.length > 50 && (
              <span
                className="expand-toggle"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(!expanded);
                }}
              >
                {expanded ? " Show Less" : " Read More"}
              </span>
            )}
          </p>
        </>
      )}
    </div>
  );
};

export default InfoCard;
