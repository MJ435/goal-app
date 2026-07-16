const express = require('express');
const router = express.Router();
const { BudgetGoal } = require('../db');

// Get all goals for a user
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const goals = await BudgetGoal.find({ userId }).sort({ createdAt: -1 });
    res.json({ goals });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new goal
router.post('/', async (req, res) => {
  try {
    const { userId, title, targetAmount, currentAmount, deadline, color } = req.body;
    
    if (!userId || !title || targetAmount === undefined || !deadline) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newGoal = await BudgetGoal.create({
      userId,
      title,
      targetAmount,
      currentAmount: currentAmount || 0,
      deadline,
      color
    });
    
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an existing goal
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { title, targetAmount, currentAmount, deadline, color } = req.body;
    
    const updatedGoal = await BudgetGoal.findByIdAndUpdate(
      id,
      { title, targetAmount, currentAmount, deadline, color },
      { new: true, runValidators: true }
    );
    
    if (!updatedGoal) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    
    res.json(updatedGoal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a goal
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedGoal = await BudgetGoal.findByIdAndDelete(id);
    
    if (!deletedGoal) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    
    res.json({ message: 'Goal deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
