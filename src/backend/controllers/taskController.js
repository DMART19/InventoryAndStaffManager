// backend/controllers/taskController.js
const pool = require('../db');

const getAllTasks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addTask = async (req, res) => {
  const { title, description, assignedTo, dueDate, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description, assignedTo, dueDate, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, assignedTo, dueDate, status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllTasks,
  addTask,
};