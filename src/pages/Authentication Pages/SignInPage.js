/**
 * SignInPage.js
 * Component for user authentication/sign-in
 * Manages form state, validation, and submission for user login
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignInPage.css';

const SignInPage = ({ setIsSignedIn }) => {
  // Default developer credentials
  const defaultEmail = 'devuser@example.com';
  const defaultPassword = 'password123';

  // State for form inputs and validation
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState(defaultPassword);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  /**
   * Handles email input changes
   * @param {Object} e - Event object from input change
   */
  const handleEmailChange = (e) => {
    setEmail(e.target.value.trim());
  };

  /**
   * Handles password input changes
   * @param {Object} e - Event object from input change
   */
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  /**
   * Validates form whenever email or password changes
   * Enables submit button only when both fields are filled
   */
  useEffect(() => {
    setIsFormValid(email.trim() !== '' && password !== '');
  }, [email, password]);

  /**
   * Handles form submission
   * @param {Object} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid) {
      // In a real app, this would call an authentication API
      setIsSignedIn(true);
      navigate('/onboarding'); // Redirect after sign-in
    }
  };

  /**
   * Optional: Automatically sign in on mount for developers
   */
  // useEffect(() => {
  //   setIsSignedIn(true);
  //   navigate('/onboarding');
  // }, []);

  return (
    <div className="signin-container">
      <div className="signin-content">
        <h1>Sign In</h1>

        {/* Developer credentials info */}
        <div className="dev-info">
          <p><strong>Dev Login:</strong> Use <code>{defaultEmail}</code> / <code>{defaultPassword}</code></p>
        </div>

        {/* Sign-in form */}
        <form className="signin-form" onSubmit={handleSubmit}>
          {/* Email input */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
              autoComplete="username"
            />
          </div>

          {/* Password input */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              required
              autoComplete="current-password"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className={`signin-button ${!isFormValid ? 'disabled' : ''}`}
            disabled={!isFormValid}
            aria-disabled={!isFormValid}
          >
            Sign In
          </button>
        </form>

        {/* Sign-up and forgot password links */}
        <p className="signup-link">
          Not a user? <Link to="/authentication/signup">Create an account</Link>
        </p>
        <div className="forgot-password-link">
          <Link to="/authentication/forgot-password">Forgot password?</Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
