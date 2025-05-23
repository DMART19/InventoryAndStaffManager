// backend/controllers/inventoryController.js
const pool = require('../db');

const getAllInventory = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inventory');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addInventoryItem = async (req, res) => {
  const { itemName, quantity, category, lastRestocked } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO inventory (itemName, quantity, category, lastRestocked) VALUES ($1, $2, $3, $4) RETURNING *',
      [itemName, quantity, category, lastRestocked]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllInventory,
  addInventoryItem,
};