import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SideMenu.css";
import DavidMartinezPhoto from "../DavidMartinezPhoto.jpg"; // Adjusted relative path
import { FaBell } from "react-icons/fa"; // Import the bell icon

const SideMenu = ({ closeMenu }) => {
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
        !event.target.closest(".profile-section")
      ) {
        setIsProfileMenuOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target) &&
        !event.target.closest(".notifications-bell-side-menu")
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

  const user = {
    name: "David Martinez",
    profilePhoto: DavidMartinezPhoto, // Use the imported image
    profilePath: "/profile",
  };

  return (
    <div className="side-menu">
      {/* Profile Section */}
      <div className="profile-section" onClick={toggleProfileMenu}>
        <div className="profile-link">
          <img
            src={user.profilePhoto}
            alt="Profile"
            className="profile-photo"
          />
          {/* Notifications Bell */}
          <div className="notifications-bell-side-menu" onClick={toggleNotifications}>
            <FaBell />
            {notifications.some((n) => !n.read) && <span className="notification-dot"></span>}
          </div>
        </div>
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

      <h2>Menu</h2>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index} className="menu-item" onClick={closeMenu}>
            <Link to={item.path} className="menu-link">
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-text">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;