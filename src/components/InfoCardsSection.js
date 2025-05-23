import React, { useState } from "react";
import { FaPlus, FaCheck, FaTrash, FaUndo, FaPalette, FaInfoCircle } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import "./InfoCardsSection.css";

const DEFAULT_CARD_COLORS = {
  onlineStaff: "#4CAF50",
  staffOnLeave: "#F44336",
  trainingCompletion: "#FFEB3B",
  activeCertifications: "#FF9800",
  criticalInventory: "#9C27B0",
  pendingOrders: "#FF5722",
  completedTasks: "#4CAF50",
  inventoryRestocking: "#D32F2F",
  ongoingTraining: "#2196F3",
  totalStaff: "#00BCD4",
  certExpirations: "#FFC107",
  highPriorityTasks: "#F44336",
  openCalendarEvents: "#3F51B5",
  vendorRatings: "#4A148C",
  inventoryAlerts: "#D50000",
  tasksDueToday: "#FF9800",
};

const CARD_TOOLTIPS = {
  onlineStaff: "Number of currently active staff members",
  staffOnLeave: "Staff members currently on approved leave",
  trainingCompletion: "Percentage of completed training programs",
  activeCertifications: "Number of valid staff certifications",
  criticalInventory: "Items with critically low stock levels",
  pendingOrders: "Orders awaiting processing or fulfillment",
  completedTasks: "Tasks marked as completed this period",
  inventoryRestocking: "Items that need to be reordered soon",
  ongoingTraining: "Training programs currently in progress",
  totalStaff: "Total number of staff in the organization",
  certExpirations: "Certifications expiring within the next month",
  highPriorityTasks: "Tasks marked as high priority",
  openCalendarEvents: "Scheduled events in the calendar",
  vendorRatings: "Vendors with excellent performance ratings",
  inventoryAlerts: "Active inventory alerts and notifications",
  tasksDueToday: "Tasks that need to be completed today"
};

const MAX_CARDS = 8;

const getContrastYIQ = (hexcolor) => {
  if (!hexcolor) return "#000000";
  const r = parseInt(hexcolor.slice(1, 3), 16);
  const g = parseInt(hexcolor.slice(3, 5), 16);
  const b = parseInt(hexcolor.slice(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#000000" : "#FFFFFF";
};

const InfoCard = ({ 
  card, 
  isEditing, 
  currentColor, 
  onRemove, 
  onColorChange, 
  onResetColor 
}) => {
  const textColor = getContrastYIQ(currentColor);
  
  return (
    <div 
      className="info-card" 
      style={{ backgroundColor: currentColor, color: textColor }}
      data-tooltip-id="info-cards-tooltip"
      data-tooltip-content={CARD_TOOLTIPS[card.key] || "Key performance indicator"}
    >
      <div className="card-content">
        <span className="card-label">{card.label}</span>
        <span className="card-value">{card.value}</span>
      </div>
      
      {isEditing && (
        <div className="card-actions">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onRemove(card.key);
            }}
            className="card-action-button"
            data-tooltip-id="info-cards-tooltip"
            data-tooltip-content={`Remove ${card.label} from dashboard`}
          >
            <FaTrash />
          </button>
          
          <div className="color-picker-container">
            <input
              type="color"
              value={currentColor}
              onChange={(e) => onColorChange(card.key, e.target.value)}
              className="color-picker"
              data-tooltip-id="info-cards-tooltip"
              data-tooltip-content={`Customize ${card.label} card color`}
            />
            <FaPalette className="color-picker-icon" />
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onResetColor(card.key);
            }}
            className="card-action-button"
            data-tooltip-id="info-cards-tooltip"
            data-tooltip-content={`Reset ${card.label} card color`}
          >
            <FaUndo />
          </button>
        </div>
      )}
    </div>
  );
};

const AvailableCardsPanel = ({ availableCards, selectedCount, onAddCard }) => (
  <div className="available-cards-panel">
    <div className="panel-header">
      <h4>
        Available Cards
        <FaInfoCircle 
          className="info-icon"
          data-tooltip-id="info-cards-tooltip"
          data-tooltip-content="Available metrics to add to your dashboard"
        />
      </h4>
      <div className="card-counter">
        {selectedCount}/{MAX_CARDS} cards used
      </div>
    </div>
    
    <div className="available-cards-grid">
      {availableCards.map((card) => (
        <button
          key={card.key}
          onClick={() => onAddCard(card)}
          disabled={selectedCount >= MAX_CARDS}
          className="available-card-button"
          data-tooltip-id="info-cards-tooltip"
          data-tooltip-content={
            selectedCount >= MAX_CARDS 
              ? `Maximum of ${MAX_CARDS} cards reached` 
              : `Add ${card.label} to dashboard`
          }
        >
          {card.label}
        </button>
      ))}
    </div>
  </div>
);

const InfoCardsSection = ({ 
  id, 
  selectedInfoCards, 
  allInfoCards, 
  onCardRemove, 
  onCardAdd 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cardColors, setCardColors] = useState({});
  
  const availableInfoCards = allInfoCards.filter(
    (card) => !selectedInfoCards.some((selected) => selected.key === card.key)
  );

  const handleColorChange = (key, color) => {
    setCardColors((prev) => ({ ...prev, [key]: color }));
  };

  const resetColorToDefault = (key) => {
    setCardColors((prev) => {
      const newColors = { ...prev };
      delete newColors[key];
      return newColors;
    });
  };

  return (
    <section id={id} className="info-cards-section">
      <Tooltip 
        id="info-cards-tooltip" 
        className="custom-tooltip"
        place="top"
        effect="solid"
        delayShow={300}
        border="1px solid rgba(0,0,0,0.1)"
        offset={10}
      />
      
      <div className="section-header">
        <h3>
          Key Metrics
          <FaInfoCircle 
            className="info-icon"
            data-tooltip-id="info-cards-tooltip"
            data-tooltip-content="View and manage your key performance indicators"
          />
        </h3>
        
        <button
          className="edit-toggle-button"
          onClick={() => setIsEditing((prev) => !prev)}
          data-tooltip-id="info-cards-tooltip"
          data-tooltip-content={
            isEditing 
              ? "Finish customizing cards" 
              : "Add or customize cards"
          }
        >
          {isEditing ? (
            <>
              <FaCheck /> Done
            </>
          ) : (
            <>
              <FaPlus /> Customize
            </>
          )}
        </button>
      </div>
      
      <div className="info-cards-grid">
        {selectedInfoCards.map((card) => (
          <InfoCard
            key={card.key}
            card={card}
            isEditing={isEditing}
            currentColor={cardColors[card.key] || DEFAULT_CARD_COLORS[card.key]}
            onRemove={onCardRemove}
            onColorChange={handleColorChange}
            onResetColor={resetColorToDefault}
          />
        ))}
        
        {selectedInfoCards.length === 0 && (
          <div className="empty-state">
            <p>No cards added yet</p>
            <button
              onClick={() => setIsEditing(true)}
              className="add-first-card-button"
            >
              <FaPlus /> Add your first card
            </button>
          </div>
        )}
      </div>
      
      {isEditing && (
        <AvailableCardsPanel
          availableCards={availableInfoCards}
          selectedCount={selectedInfoCards.length}
          onAddCard={onCardAdd}
        />
      )}
    </section>
  );
};

export default InfoCardsSection;