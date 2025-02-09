const sqlite3 = require('sqlite3').verbose();

const DB_FILE = "./data/test.db";

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
      username TEXT,
      password TEXT,
      firstName TEXT,
      lastName TEXT,
      email TEXT
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
    const { username, password, firstName, lastName, email } = userData;
    if (username && password && firstName && lastName) {
      db.run(
        "INSERT INTO users (username, password, firstName, lastName, email) VALUES (?, ?, ?, ?, ?)",
        [username, password, firstName, lastName, email],
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
    } else {
      reject("Required field(s) not provided");
    }
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

// Get a user by username
const getUserByUsername = (username) => {
  console.log('Getting user with username ', username);
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
      if (err) {
        console.error('Error getting user by username:', err);
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
  getUserByUsername,
  getAllUsers
};