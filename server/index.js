const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

require('dotenv').config()

const app = express();
const router = express.Router();
const database = require('./database');

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api', router);

// Initialize Database
database.init();

// ROUTES //

// Add new user
router.route('/users').post(async (req, res) => {
  const loginUser = req.body;
  try {
    let dbUser;
    if (loginUser.username) {
      dbUser = await database.getUserByUsername(loginUser.username);
    }
    if (dbUser) {
      res.status(400).json({ error: "User already exists" });
      return
    }
    // Add user to database
    const userAdded = await database.addUser(req.body);
    res.json(userAdded);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: error });
  }
});

// Login user
router.route('/login').post(async (req, res) => {
  const loginUser = req.body;
  try {
    let dbUser;
    if (loginUser.username) {
      dbUser = await database.getUserByUsername(loginUser.username);
    }
    if (dbUser && loginUser.password && dbUser.password == loginUser.password) {
      res.json({
        success: true
      });
    } else {
      res.status(500).json({ error: "Invalid login information" });
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: error });
  }
});

// Get all users
router.route('/users').get(async (req, res) => {
  try {
    const users = await database.getAllUsers();
    res.json(users)
  } catch (error) {
    console.error('Error getting all users:', error);
    res.status(500).json({ error: error });
  }
});

// Add new time request
router.route('/requests/time').post(async (req, res) => {
  try {
    // Add time request to database
    const timeRequestAdded = await database.addTimeRequest(req.body);
    res.json(timeRequestAdded);
  } catch (error) {
    console.error('Error adding time request:', error);
    res.status(500).json({ error: error });
  }
});

// Get all time requests
router.route('/requests/time').get(async (req, res) => {
  try {
    const timeRequests = await database.getAllTimeRequests();
    for (const timeRequest of timeRequests) {
      timeRequest.timeSlots = await database.getTimeSlotsByRequest(timeRequest.id);
      console.log("timeSlots: " + JSON.stringify(timeRequest.timeSlots));
    }
    res.json(timeRequests)
  } catch (error) {
    console.error('Error getting all time requests:', error);
    res.status(500).json({ error: error });
  }
});

// Add new finance request
router.route('/requests/finance').post(async (req, res) => {
  try {
    // Add finance request to database
    const financeRequestAdded = await database.addFinanceRequest(req.body);
    res.json(financeRequestAdded);
  } catch (error) {
    console.error('Error adding finance request:', error);
    res.status(500).json({ error: error });
  }
});

// Get all finance requests
router.route('/requests/finance').get(async (req, res) => {
  try {
    const financeRequests = await database.getAllFinanceRequests();
    res.json(financeRequests)
  } catch (error) {
    console.error('Error getting all finance requests:', error);
    res.status(500).json({ error: error });
  }
});

//////////

// Serve the app
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
