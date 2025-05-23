// backend/routes/inventoryRoutes.js
const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.get('/', inventoryController.getAllInventory);
router.post('/', inventoryController.addInventoryItem);

module.exports = router;