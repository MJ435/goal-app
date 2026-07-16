const express = require('express');
const router = express.Router();
const { User } = require('../db');

// Sign up
router.post('/signup', async (req, res) => {
  // Check if database is connected
  const mongoose = require('mongoose');
  if (mongoose.connection.readyState !== 1) {
    return res.status(500).json({ error: 'Database unavailable. Continuing in demo mode.' });
  }

  try {
    const { password, memberSince } = req.body;
    const name = req.body.name?.trim();
    const username = req.body.username?.trim().toLowerCase();
    const email = req.body.email?.trim().toLowerCase();
    const phone = req.body.phone?.trim();
    
    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    
    // Create new user
    const newUser = await User.create({
      name,
      username,
      email,
      phone,
      password, // In a real app, hash this with bcrypt before saving!
      memberSince
    });
    
    // Return user info (excluding password)
    const userResponse = newUser.toObject();
    delete userResponse.password;
    
    res.status(201).json(userResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Sign in
router.post('/signin', async (req, res) => {
  // Check if database is connected
  const mongoose = require('mongoose');
  if (mongoose.connection.readyState !== 1) {
    return res.status(500).json({ error: 'Database unavailable. Continuing in demo mode.' });
  }

  try {
    const { identifier, password } = req.body;
    
    // Find user by email or username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }]
    });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Check password
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.json({ user: userResponse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete account (cascade delete is handled in db.js schema hooks)
router.delete('/users/:userId', async (req, res) => {
  const mongoose = require('mongoose');
  if (mongoose.connection.readyState !== 1) {
    return res.status(500).json({ error: 'Database unavailable. Continuing in demo mode.' });
  }

  try {
    const userId = req.params.userId;
    const deletedUser = await User.findByIdAndDelete(userId);
    
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ message: 'User account and all associated data successfully deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
