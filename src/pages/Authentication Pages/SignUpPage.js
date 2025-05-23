import React, { useState } from 'react'; // Removed unused useEffect
import { Link } from 'react-router-dom'; // Import Link for navigation
import './SignUpPage.css'; // Ensure CSS file for styling

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');  // Default role is 'user'
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation to check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Make an API request or handle the form submission logic here
    const newUser = { email, password, role };
    console.log(newUser);
    // You can send the data to your backend for creating a new user here.
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <h1>Create Account</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="signup-button">
            Create Account
          </button>
        </form>

        {/* Sign-in redirect */}
        <p className="signin-link">
          Already have an account? <Link to="/authentication/signin">Sign in here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;