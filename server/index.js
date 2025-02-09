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

//////////

// Serve the app
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
