const express = require('express');
const router = express.Router();
const { Transaction } = require('../db');

// Get all transactions for a user
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });
    res.json({ transactions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new transaction
router.post('/', async (req, res) => {
  try {
    const { userId, type, category, amount, icon, color, time } = req.body;
    
    const newTransaction = await Transaction.create({
      userId,
      type,
      category,
      amount,
      icon,
      color,
      time
    });
    
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a transaction
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    
    if (!deletedTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    
    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
