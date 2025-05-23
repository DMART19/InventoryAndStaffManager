import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./QuickActionsMenu.css";

const QuickActionsMenu = () => {
  const navigate = useNavigate();
  const [showDashboardTutorials, setShowDashboardTutorials] = useState(false);
  const [showInventoryTutorials, setShowInventoryTutorials] = useState(false);
  const [showStaffTutorials, setShowStaffTutorials] = useState(false);
  const [showCalendarTutorials, setShowCalendarTutorials] = useState(false);
  const [showMenuTutorials, setShowMenuTutorials] = useState(false);

  const handleComingSoon = () => {
    alert("Feature Button Coming Soon. Please Try Later");
  };

  const toggleDashboardTutorials = () => {
    setShowDashboardTutorials(!showDashboardTutorials);
    setShowInventoryTutorials(false);
    setShowStaffTutorials(false);
    setShowCalendarTutorials(false);
    setShowMenuTutorials(false);
  };

  const toggleInventoryTutorials = () => {
    setShowInventoryTutorials(!showInventoryTutorials);
    setShowDashboardTutorials(false);
    setShowStaffTutorials(false);
    setShowCalendarTutorials(false);
    setShowMenuTutorials(false);
  };

  const toggleStaffTutorials = () => {
    setShowStaffTutorials(!showStaffTutorials);
    setShowDashboardTutorials(false);
    setShowInventoryTutorials(false);
    setShowCalendarTutorials(false);
    setShowMenuTutorials(false);
  };

  const toggleCalendarTutorials = () => {
    setShowCalendarTutorials(!showCalendarTutorials);
    setShowDashboardTutorials(false);
    setShowInventoryTutorials(false);
    setShowStaffTutorials(false);
    setShowMenuTutorials(false);
  };

  const toggleMenuTutorials = () => {
    setShowMenuTutorials(!showMenuTutorials);
    setShowDashboardTutorials(false);
    setShowInventoryTutorials(false);
    setShowStaffTutorials(false);
    setShowCalendarTutorials(false);
  };

  const quickActions = [
    { id: 1, name: "Button Coming Soon", tutorialPath: "/dashboard", state: { startTutorial: true } },
  ];

  const dashboardTutorials = [
    {
      id: 19,
      name: "Button Coming Soon",
      tutorialPath: "/dashboard",
      state: { startTutorial: true },
    },
  ];

  const inventoryTutorials = [
    {
      id: 5,
      name: "Button Coming Soon",
      tutorialPath: "/inventory",
      state: { startInventoryTutorial: true },
    },
  ];

  const staffTutorials = [
    {
      id: 9,
      name: "Button Coming Soon",
      tutorialPath: "/staff-management",
      state: { startStaffTutorial: true },
    },
  ];

  const calendarTutorials = [
    {
      id: 14,
      name: "Button Coming Soon",
      tutorialPath: "/calendar",
      state: { startCalendarTutorial: true },
    },
  ];

  const menuTutorials = [
    { id: 18, name: "Button Coming Soon", tutorialPath: "/dashboard", state: { startTopNavbarTutorial: true } },
    { id: 19, name: "Button Coming Soon", tutorialPath: "/dashboard", state: { startSideMenuTutorial: true } },
  ];

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="quick-actions-container">
      <div className="quick-actions-menu" id="quick-actions-menu">
        <h1 className="quick-actions-menu__title">Quick Actions</h1>
        <p className="quick-actions-menu__description">Select an option below to learn how to perform specific tasks:</p>
        <ul className="quick-actions-menu__list">
          {quickActions.map((action) => (
            <li key={action.id} className="quick-actions-menu__item">
              <button
                id="run-all-tutorials-button"
                className="quick-actions-menu__button quick-actions-menu__button--primary"
                onClick={handleComingSoon}
              >
                {action.name}
              </button>
            </li>
          ))}
          <li className="quick-actions-menu__item">
            <button
              id="dashboard-tutorials-button"
              onClick={toggleDashboardTutorials}
              className="quick-actions-menu__button quick-actions-menu__button--secondary"
            >
              Button Coming Soon {showDashboardTutorials ? "▲" : "▼"}
            </button>
            {showDashboardTutorials && (
              <ul className="quick-actions-menu__submenu">
                <h2 className="quick-actions-menu__submenu-title">Dashboard Features</h2>
                <p className="quick-actions-menu__submenu-description">Explore tutorials related to dashboard features:</p>
                {dashboardTutorials.map((action) => (
                  <li key={action.id} className="quick-actions-menu__submenu-item">
                    <button
                      className="quick-actions-menu__button quick-actions-menu__button--tertiary"
                      onClick={handleComingSoon}
                    >
                      {action.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li className="quick-actions-menu__item">
            <button
              id="inventory-tutorials-button"
              onClick={toggleInventoryTutorials}
              className="quick-actions-menu__button quick-actions-menu__button--secondary"
            >
              Button Coming Soon {showInventoryTutorials ? "▲" : "▼"}
            </button>
            {showInventoryTutorials && (
              <ul className="quick-actions-menu__submenu">
                <h2 className="quick-actions-menu__submenu-title">Inventory Features</h2>
                <p className="quick-actions-menu__submenu-description">Explore tutorials related to inventory features:</p>
                {inventoryTutorials.map((action) => (
                  <li key={action.id} className="quick-actions-menu__submenu-item">
                    <button
                      className="quick-actions-menu__button quick-actions-menu__button--tertiary"
                      onClick={handleComingSoon}
                    >
                      {action.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li className="quick-actions-menu__item">
            <button
              id="staff-tutorials-button"
              onClick={toggleStaffTutorials}
              className="quick-actions-menu__button quick-actions-menu__button--secondary"
            >
              Button Coming Soon {showStaffTutorials ? "▲" : "▼"}
            </button>
            {showStaffTutorials && (
              <ul className="quick-actions-menu__submenu">
                <h2 className="quick-actions-menu__submenu-title">Staff Features</h2>
                <p className="quick-actions-menu__submenu-description">Explore tutorials related to staff management features:</p>
                {staffTutorials.map((action) => (
                  <li key={action.id} className="quick-actions-menu__submenu-item">
                    <button
                      className="quick-actions-menu__button quick-actions-menu__button--tertiary"
                      onClick={handleComingSoon}
                    >
                      {action.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li className="quick-actions-menu__item">
            <button
              id="calendar-tutorials-button"
              onClick={toggleCalendarTutorials}
              className="quick-actions-menu__button quick-actions-menu__button--secondary"
            >
              Button Coming Soon {showCalendarTutorials ? "▲" : "▼"}
            </button>
            {showCalendarTutorials && (
              <ul className="quick-actions-menu__submenu">
                <h2 className="quick-actions-menu__submenu-title">Calendar Features</h2>
                <p className="quick-actions-menu__submenu-description">Explore tutorials related to calendar features:</p>
                {calendarTutorials.map((action) => (
                  <li key={action.id} className="quick-actions-menu__submenu-item">
                    <button
                      className="quick-actions-menu__button quick-actions-menu__button--tertiary"
                      onClick={handleComingSoon}
                    >
                      {action.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li className="quick-actions-menu__item">
            <button
              id="menu-tutorials-button"
              onClick={toggleMenuTutorials}
              className="quick-actions-menu__button quick-actions-menu__button--secondary"
            >
              Button Coming Soon {showMenuTutorials ? "▲" : "▼"}
            </button>
            {showMenuTutorials && (
              <ul className="quick-actions-menu__submenu">
                <h2 className="quick-actions-menu__submenu-title">Menu Features</h2>
                <p className="quick-actions-menu__submenu-description">Learn how to navigate the application:</p>
                {menuTutorials.map((action) => (
                  <li key={action.id} className="quick-actions-menu__submenu-item">
                    <button
                      className="quick-actions-menu__button quick-actions-menu__button--tertiary"
                      onClick={handleComingSoon}
                    >
                      {action.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>

        <p className="quick-actions-menu__description">Return to the main dashboard at any time:</p>
        <button
          id="go-to-dashboard-button"
          onClick={handleGoToDashboard}
          className="quick-actions-menu__button quick-actions-menu__button--dashboard"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default QuickActionsMenu;