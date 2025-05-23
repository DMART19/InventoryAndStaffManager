/* 
 * ForgotPasswordPage.js 
 * Component for handling password reset requests
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
  // State for storing email input and status message
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  /**
   * Handles form submission for password reset
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending a password reset request
    // In a real application, this would call an API endpoint
    setMessage('If an account with this email exists, a reset link has been sent.');
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-content">
        {/* Page heading and instructions */}
        <h1>Reset Password</h1>
        <p>Enter your email address to receive a password reset link.</p>
        
        {/* Password reset form */}
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Enter your email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          {/* Submit button */}
          <button type="submit" className="forgot-password-button">
            Send Reset Link
          </button>
        </form>
        
        {/* Status message display */}
        {message && <p className="reset-message">{message}</p>}
        
        {/* Link back to sign in page */}
        <p className="signin-link">
          Remembered your password?{' '}
          <Link to="/authentication/signin">Sign in here</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;