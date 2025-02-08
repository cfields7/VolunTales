const sqlite3 = require('sqlite3').verbose();

const DB_FILE = "/data/test.db";

// Sqlite 3 Database
let db;

// Initialize Database from File
const init = () => {
  console.log("Initializing Database...");

  // Connect to database file
  console.log("Connecting to database file " + DB_FILE);
  db = new sqlite3.Database(DB_FILE, (err) => {
    if (err) {
      console.error("Error opening database from file: ", err);
    } else {
      console.log("Connected to database file successfully");
    }
  });

  // Create a "users" table, if it does not exist
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      lastName TEXT
    )
  `, (err) => {
    if (err) {
      console.error("Error creating users table:", err);
    } else {
      console.log("Users table created or already exists");
    }
  });
}

// Add a new user
const addUser = (userData) => {
  console.log("Adding user with data ", userData);
  return new Promise((resolve, reject) => {
    const { firstName, lastName } = userData;
    db.run(
      "INSERT INTO users (firstName, lastName) VALUES (?, ?)",
      [firstName, lastName],
      function(err) {
        if (err) {
          console.error('Error inserting user: ', err);
          reject(err);
        } else {
          const updatedUserData = getUser(this.lastID);
          resolve(updatedUserData);
        }
      }
    );
  });
};

// Get a user by id
const getUser = (id) => {
  console.log('Getting user with id ', id);
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, user) => {
      if (err) {
        console.error('Error getting user by id:', err);
        reject(err);
      } else {
        console.log('Found user:', user);
        resolve(user);
      }
    });
  });
};

// Get a user by id
const getAllUsers = () => {
  console.log('Getting all users');
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM users', (err, users) => {
      if (err) {
        console.error('Error all users:', err);
        reject(err);
      } else {
        console.log('Found users: ', users);
        resolve(users);
      }
    });
  });
};

module.exports = {
  init,
  addUser,
  getUser,
  getAllUsers
};