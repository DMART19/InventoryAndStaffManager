import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./TopNavBar.css";
import DavidMartinezPhoto from "../DavidMartinezPhoto.jpg"; // Import the local profile photo
import { FaBell } from "react-icons/fa"; // Import the bell icon

const TopNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New Task Assigned", details: "Review inventory levels for Q1", read: false },
    { id: 2, title: "Training Completed", details: "John Doe completed First Aid training", read: false },
    { id: 3, title: "Inventory Restocked", details: "Gloves restocked to 200 units", read: false },
    { id: 4, title: "Certification Expired", details: "CPR Certification expired for Jane Smith", read: false },
  ]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);
  const notificationsRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setNotifications((prevNotifications) =>
      prevNotifications.map((n) =>
        n.id === notification.id ? { ...n, read: true } : n
      )
    );
  };

  const handleCloseDetails = () => {
    setSelectedNotification(null);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target) &&
        !event.target.closest(".profile-container")
      ) {
        setIsProfileMenuOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target) &&
        !event.target.closest(".notifications-bell")
      ) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = [
    { name: "Dashboard", icon: "🏠", path: "/dashboard" },
    { name: "Staff", icon: "👥", path: "/staff-management" },
    { name: "Inventory", icon: "📦", path: "/inventory" },
    { name: "Tasks", icon: "📝", path: "/tasks" },
    { name: "Calendar", icon: "📅", path: "/calendar" },
    { name: "Settings", icon: "⚙️", path: "/settings" },
  ];

  const profileMenuItems = [
    { name: "Account Settings", path: "/settings" },
    {
      name: "Logout",
      action: () => navigate("/authentication/signin"),
    },
  ];

  return (
    <div className="top-navbar">
      {/* Left Section: Hamburger Menu and Profile Image */}
      <div className="left-section">
        <div className="menu-icon" onClick={toggleMenu}>
          &#9776; {/* Hamburger Icon */}
        </div>
        <div className="profile-container" onClick={toggleProfileMenu}>
          <img
            src={DavidMartinezPhoto} // Use the local profile photo
            alt="User Profile"
            className="profile-image"
          />
        </div>
      </div>

      {/* Notifications Bell */}
      <div
        className="notifications-bell-top-menu"
        onClick={toggleNotifications}
      >
        <FaBell />
        {notifications.some((n) => !n.read) && <span className="notification-dot"></span>}
      </div>

      {/* Notifications Dropdown */}
      {isNotificationsOpen && (
        <div className="notifications-dropdown" ref={notificationsRef}>
          <div className="notifications-list">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-item ${!notification.read ? "unread" : ""}`}
                onClick={() => handleNotificationClick(notification)}
              >
                {notification.title}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notification Details Modal */}
      {selectedNotification && (
        <div className="notification-details-modal">
          <div className="notification-details-content">
            <h3>{selectedNotification.title}</h3>
            <p>{selectedNotification.details}</p>
            <button onClick={handleCloseDetails}>Close</button>
          </div>
        </div>
      )}

      {/* Dropdown Accordion Menu */}
      <div className={`hamburger-menu ${isMenuOpen ? "open" : ""}`}>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="menu-item">
              <Link to={item.path} className="menu-link" onClick={toggleMenu}>
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-text">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Profile Dropdown Menu */}
      {isProfileMenuOpen && (
        <div className="profile-menu" ref={profileMenuRef}>
          <ul>
            {profileMenuItems.map((item, index) => (
              <li key={index} className="profile-menu-item">
                {item.action ? (
                  <button className="menu-link" onClick={item.action}>
                    {item.name}
                  </button>
                ) : (
                  <Link to={item.path} className="menu-link">
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TopNavBar;