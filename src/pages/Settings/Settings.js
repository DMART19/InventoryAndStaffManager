import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../components/SideMenu";
import TopNavBar from "../../components/TopNavBar";
import "./Settings.css";

/**
 * Settings component that allows users to manage their account preferences
 * Includes profile settings, security options, and account management
 */
const Settings = () => {
  // State for theme preference (light/dark mode)
  const [theme, setTheme] = useState("light");
  
  // State for notification preferences
  const [notifications, setNotifications] = useState(true);
  
  // State for two-factor authentication setting
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  
  // State for language preference
  const [language, setLanguage] = useState("en");
  
  // Profile information states
  const [profileName, setProfileName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  
  // Password change state
  const [password, setPassword] = useState("");
  
  // Subscription tier state
  const [selectedTier, setSelectedTier] = useState("Basic");
  
  // Responsive design state
  const [isMobile, setIsMobile] = useState(false);

  // Pricing for different subscription tiers
  const tierPrices = {
    Basic: 10, // Monthly price in USD
    Pro: 20,
    Enterprise: 50,
  };

  const navigate = useNavigate();

  /**
   * Effect to handle window resize and determine if mobile view
   */
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * Handles saving profile information
   */
  const handleSaveProfile = () => {
    alert("Profile Saved!");
    // In a real app, this would call an API to save the profile
  };

  /**
   * Handles password change
   */
  const handlePasswordChange = () => {
    if (password) {
      alert("Password Updated!");
      setPassword(""); // Clear password field after update
    } else {
      alert("Please enter a new password.");
    }
  };

  /**
   * Navigates to data import page
   */
  const handleDataImport = () => {
    navigate("/import-data");
  };

  /**
   * Handles data export
   */
  const handleDataExport = () => {
    alert("Data Exported!");
    // In a real app, this would trigger a file download
  };

  /**
   * Handles account deletion with confirmation
   */
  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      alert("Account Deleted!");
      navigate("/"); // Redirect to home after deletion
    }
  };

  /**
   * Handles subscription tier changes
   * @param {Object} e - The change event from the select input
   */
  const handleTierChange = (e) => {
    const newTier = e.target.value;
    const priceDifference = tierPrices[newTier] - tierPrices[selectedTier];
    const chargeDate = new Date();
    chargeDate.setMonth(chargeDate.getMonth() + 1); // Next charge date (1 month later)

    setSelectedTier(newTier);

    // Show confirmation with pricing details
    alert(`You have changed your tier to ${newTier}. 
      Monthly Charge: $${tierPrices[newTier]} 
      Price Change: $${priceDifference > 0 ? `+${priceDifference}` : priceDifference} 
      Next Charge Date: ${chargeDate.toLocaleDateString()}`);
  };

  return (
    <div className={`settings-page ${theme}`}>
      {/* Render top navigation on mobile, side menu on desktop */}
      {isMobile ? <TopNavBar /> : (
        <div className="side-menu-container">
          <SideMenu />
        </div>
      )}

      <div className="settings-content">
        <h1>Settings</h1>
        
        {/* Profile Settings Section */}
        <div className="settings-section">
          <h3>Profile</h3>
          
          {/* Name Field */}
          <div className="setting-item">
            <label>Name</label>
            <input
              type="text"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              aria-label="Profile name"
            />
          </div>
          
          {/* Email Field */}
          <div className="setting-item">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
            />
          </div>
          
          {/* Phone Field */}
          <div className="setting-item">
            <label>Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-label="Phone number"
            />
          </div>
          
          {/* Address Field */}
          <div className="setting-item">
            <label>Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              aria-label="Address"
            />
          </div>
          
          {/* Bio Field */}
          <div className="setting-item">
            <label>Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              aria-label="Bio"
            />
          </div>
          
          {/* Profile Picture Upload */}
          <div className="setting-item">
            <label>Profile Picture</label>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setProfilePicture(URL.createObjectURL(e.target.files[0]));
                }
              }}
              accept="image/*"
              aria-label="Profile picture upload"
            />
            {profilePicture && (
              <img 
                src={profilePicture} 
                alt="Profile Preview" 
                className="profile-picture-preview" 
              />
            )}
          </div>
          
          {/* Save Profile Button */}
          <button 
            onClick={handleSaveProfile} 
            className="save-button"
            aria-label="Save profile changes"
          >
            Save Profile
          </button>
        </div>

        {/* Subscription Tier Selection Section */}
        <div className="settings-section">
          <h3>Select Your Tier</h3>
          <div className="setting-item">
            <label htmlFor="tier-select">Choose a tier:</label>
            <select
              id="tier-select"
              value={selectedTier}
              onChange={handleTierChange}
              aria-label="Select subscription tier"
            >
              <option value="Basic">Basic</option>
              <option value="Pro">Pro</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>
        </div>
        
        {/* Security Settings Section */}
        <div className="settings-section">
          <h3>Security</h3>
          <div className="setting-item">
            <label>New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="New password"
            />
          </div>
          <button 
            onClick={handlePasswordChange} 
            className="update-password-button"
            aria-label="Update password"
          >
            Update Password
          </button>
        </div>
        
        {/* Data Management Section */}
        <div className="settings-section">
          <h3>Data Import & Export</h3>
          <div className="setting-item">
            <button 
              onClick={handleDataImport} 
              className="import-button"
              aria-label="Import data"
            >
              Import Data
            </button>
            <button 
              onClick={handleDataExport} 
              className="export-button"
              aria-label="Export data"
            >
              Export Data
            </button>
          </div>
        </div>

        {/* Account Deletion Section */}
        <div className="settings-section danger-zone">
          <h3>Delete Account</h3>
          <p className="warning-text">Warning: This action cannot be undone.</p>
          <button 
            onClick={handleDeleteAccount} 
            className="delete-button"
            aria-label="Delete account"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;