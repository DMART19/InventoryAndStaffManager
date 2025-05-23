// backend/routes/staffRoutes.js
const express = require('express');
const router = express.Router();

// Import staffController, passing pool as an argument
const staffController = require('../controllers/staffController');

// Route to get all staff members
router.get('/', (req, res) => {
  staffController.getAllStaff(req, res);
});

// Route to add a new staff member
// This expects a POST request with staff details. 'name' is required.
router.post('/', (req, res) => {
  staffController.addStaff(req, res);
});

// Route to update an existing staff member by their ID
// This expects a PUT request with updated staff details.
router.put('/:staffid', (req, res) => {
  staffController.updateStaff(req, res);
});

// Route to delete a staff member by their ID
// This expects a DELETE request to remove the staff member.
router.delete('/:staffid', (req, res) => {
  staffController.deleteStaff(req, res);
});

module.exports = (pool) => {
  // Pass pool to the staffController methods
  staffController.setPool(pool); // Make sure to set the pool in the controller
  return router;
};
