// backend/controllers/staffController.js
const pool = require('../db');

const getAllStaff = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM staff');
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No staff members found.' });
    }
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while retrieving staff members. Please try again later.' });
  }
};

const addStaff = async (req, res) => {
  const { name, email, password, position, roleid, status, employmentdate, profileimage, phone, emergencycontact } = req.body;

  // Validate that name is provided (make other fields optional)
  if (!name) {
    return res.status(400).json({ error: 'Name is required.' });
  }

  // Set default values for optional fields if not provided
  const emailValue = email || '';
  const passwordValue = password || '';
  const positionValue = position || '';
  const roleidValue = roleid || 1; // Default to roleid 1 (adjust as necessary)
  const statusValue = status || 'active'; // Default status to 'active'
  const employmentdateValue = employmentdate || new Date().toISOString().split('T')[0]; // Default to today's date
  const profileimageValue = profileimage || null; // Default to null if no image
  const phoneValue = phone || '';
  const emergencycontactValue = emergencycontact || '';

  try {
    // Insert staff into the database with defaults for missing fields
    const result = await pool.query(
      'INSERT INTO staff (name, email, password, position, roleid, status, employmentdate, profileimage, phone, emergencycontact) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [name, emailValue, passwordValue, positionValue, roleidValue, statusValue, employmentdateValue, profileimageValue, phoneValue, emergencycontactValue]
    );

    // Return the newly added staff member
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while adding the staff member. Please try again later.' });
  }
};

const updateStaff = async (req, res) => {
  const { staffid } = req.params;
  const { name, email, password, position, roleid, status, employmentdate, profileimage, phone, emergencycontact } = req.body;

  // Validate input fields
  if (!name || !email || !password || !position || !roleid || !status || !employmentdate || !phone || !emergencycontact) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Update staff details
    const result = await pool.query(
      'UPDATE staff SET name = $1, email = $2, password = $3, position = $4, roleid = $5, status = $6, employmentdate = $7, profileimage = $8, phone = $9, emergencycontact = $10 WHERE staffid = $11 RETURNING *',
      [name, email, password, position, roleid, status, employmentdate, profileimage, phone, emergencycontact, staffid]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Staff member not found.' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while updating the staff member. Please try again later.' });
  }
};

const deleteStaff = async (req, res) => {
  const { staffid } = req.params;

  try {
    // Delete staff member from the database
    const result = await pool.query('DELETE FROM staff WHERE staffid = $1 RETURNING *', [staffid]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Staff member not found.' });
    }

    res.json({ message: 'Staff member deleted successfully.', staff: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while deleting the staff member. Please try again later.' });
  }
};

module.exports = {
  getAllStaff,
  addStaff,
  updateStaff,
  deleteStaff,
};
