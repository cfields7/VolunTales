const express = require('express');
const cors = require('cors');

const app = express();
const router = express.Router();
const database = require('./database');

const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/api', router);

// Initialize Database
database.init();

// ROUTES //

// Add new user
router.route('/users').post(async (req, res) => {
  try {
    // Add user to database
    const userAdded = await database.addUser(req.body);
    res.json(userAdded);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all users
router.route('/users').get(async (req, res) => {
  try {
    const users = await database.getAllUsers();
    res.json(users)
  } catch (error) {
    console.error('Error getting all users:', error);
    res.status(500).json({ error: error.message });
  }
});

//////////

// Serve the app
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
