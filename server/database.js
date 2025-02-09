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
      username TEXT,
      password TEXT,
      firstName TEXT,
      lastName TEXT,
      email TEXT,
      profileIcon TEXT
    )
  `, (err) => {
    if (err) {
      console.error("Error creating users table:", err);
    } else {
      console.log("Users table created or already exists");
    }
  });

  // Create a "timeRequests" table, if it does not exist
  db.run(`
    CREATE TABLE IF NOT EXISTS timeRequests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      body TEXT,
      link TEXT,
      tag TEXT
    )
  `, (err) => {
    if (err) {
      console.error("Error creating timeRequests table:", err);
    } else {
      console.log("timeRequests table created or already exists");
    }
  });

  // Create a "timeSlots" table, if it does not exist
  db.run(`
    CREATE TABLE IF NOT EXISTS timeSlots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      requestId INTEGER,
      start TEXT,
      end TEXT
    )
  `, (err) => {
    if (err) {
      console.error("Error creating timeSlots table:", err);
    } else {
      console.log("timeSlots table created or already exists");
    }
  });

  // Create a "financeRequests" table, if it does not exist
  db.run(`
    CREATE TABLE IF NOT EXISTS financeRequests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      body TEXT,
      link TEXT,
      goal TEXT,
      tag TEXT
    )
  `, (err) => {
    if (err) {
      console.error("Error creating finalRequests table:", err);
    } else {
      console.log("financeRequests table created or already exists");
    }
  });

  // Create a "itemRequests" table, if it does not exist
  db.run(`
    CREATE TABLE IF NOT EXISTS itemRequests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      body TEXT,
      link TEXT,
      tag TEXT
    )
  `, (err) => {
    if (err) {
      console.error("Error creating itemRequests table:", err);
    } else {
      console.log("itemRequests table created or already exists");
    }
  });

  // Create a "items" table, if it does not exist
  db.run(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      requestId INTEGER,
      name TEXT,
      quantity TEXT
    )
  `, (err) => {
    if (err) {
      console.error("Error creating items table:", err);
    } else {
      console.log("items table created or already exists");
    }
  });
}

// DEBUG: Clear all data from the db
const clean = () => {
  db.all("SELECT name FROM sqlite_master WHERE type='table';", (err, tables) => {
    if (err) {
      console.error(err);
      return;
    }

    tables.forEach(table => {
      const tableName = table.name;
      db.run(`DROP TABLE IF EXISTS ${tableName};`, function (err) {
        if (err) {
          console.error(`Error dropping ${tableName}:`, err);
        } else {
          console.log(`Dropped table ${tableName}`);
        }
      });
    });
  });
}

// Add a new user
const addUser = (userData) => {
  console.log("Adding user with data ", userData);
  return new Promise((resolve, reject) => {
    const { username, password, firstName, lastName, email, profileIcon } = userData;
    if (username && password && firstName && lastName) {
      db.run(
        "INSERT INTO users (username, password, firstName, lastName, email, profileIcon) VALUES (?, ?, ?, ?, ?, ?)",
        [username, password, firstName, lastName, email, profileIcon],
        function(err) {
          if (err) {
            console.error('Error inserting user: ', err);
            reject(err);
          } else {
            const addedUserData = getUser(this.lastID);
            resolve(addedUserData);
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

// Add a new time request
const addTimeRequest = (timeRequestData) => {
  console.log("Adding time request with data ", timeRequestData);
  return new Promise((resolve, reject) => {
    const { title, body, link, tag, timeSlots } = timeRequestData;
    if (title && body && link && tag && timeSlots) {
      db.run(
        "INSERT INTO timeRequests (title, body, link, tag) VALUES (?, ?, ?, ?)",
        [title, body, link, tag],
        function(err) {
          if (err) {
            console.error('Error inserting timeRequest: ', err);
            reject(err);
          } else {
            console.log("adding timeslots" + JSON.stringify(timeSlots) + " to request " + this.lastID);
            for (let timeSlot of timeSlots) {
              console.log("adding " + timeSlot.start + " - " + timeSlot.end);
              db.run(
                "INSERT INTO timeSlots (requestId, start, end) VALUES (?, ?, ?)",
                [this.lastID, timeSlot.start, timeSlot.end],
                function(err) {
                  if (err) {
                    console.error('Error inserting timeSlot: ', err);
                    reject(err);
                  }
                }
              );
            }

            const addedRequestData = getTimeRequest(this.lastID);
            resolve(addedRequestData);
          }
        }
      );
    } else {
      reject("Required field(s) not provided");
    }
  });
};

// Get a time request by id
const getTimeRequest = (id) => {
  console.log('Getting time request with id ', id);
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM timeRequests WHERE id = ?', [id], (err, timeRequest) => {
      if (err) {
        console.error('Error getting time request by id:', err);
        reject(err);
      } else {
        console.log('Found time request:', timeRequest);
        resolve(timeRequest);
      }
    });
  });
};

// Get all time request
const getAllTimeRequests = () => {
  console.log('Getting all time requests');
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM timeRequests', (err, timeRequests) => {
      if (err) {
        console.error('Error getting all time requests:', err);
        reject(err);
      } else {
        console.log('Found time requests: ', timeRequests);
        resolve(timeRequests);
      }
    });
  });
};

// Get a time slot by id
const getTimeSlot = (id) => {
  console.log('Getting time slot with id ', id);
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM timeSlots WHERE id = ?', [id], (err, timeSlot) => {
      if (err) {
        console.error('Error getting time slot by id:', err);
        reject(err);
      } else {
        console.log('Found time slot:', timeSlot);
        resolve(timeSlot);
      }
    });
  });
};

// Get a time slots by request id
const getTimeSlotsByRequest = (id) => {
  console.log('Getting time slot with request id ', id);
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM timeSlots WHERE requestId = ?', [id], (err, timeSlots) => {
      if (err) {
        console.error('Error getting time slots by request id:', err);
        reject(err);
      } else {
        console.log('Found time slots:', timeSlots);
        resolve(timeSlots);
      }
    });
  });
};

// Add a new finance request
const addFinanceRequest = (financeRequestData) => {
  console.log("Adding finance request with data ", financeRequestData);
  return new Promise((resolve, reject) => {
    const { title, body, link, tag, goal } = financeRequestData;
    if (title && body && link && tag && goal) {
      db.run(
        "INSERT INTO financeRequests (title, body, link, tag, goal) VALUES (?, ?, ?, ?, ?)",
        [title, body, link, tag, goal],
        function(err) {
          if (err) {
            console.error('Error inserting financeRequest: ', err);
            reject(err);
          } else {
            const addedRequestData = getFinanceRequest(this.lastID);
            resolve(addedRequestData);
          }
        }
      );
    } else {
      reject("Required field(s) not provided");
    }
  });
};

// Get a finance request by id
const getFinanceRequest = (id) => {
  console.log('Getting finance request with id ', id);
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM financeRequests WHERE id = ?', [id], (err, financeRequest) => {
      if (err) {
        console.error('Error getting finance request by id:', err);
        reject(err);
      } else {
        console.log('Found finance request:', financeRequest);
        resolve(financeRequest);
      }
    });
  });
};

// Get a finance by id
const getAllFinanceRequests = () => {
  console.log('Getting all finance requests');
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM financeRequests', (err, financeRequests) => {
      if (err) {
        console.error('Error getting all finance requests:', err);
        reject(err);
      } else {
        console.log('Found finance requests: ', financeRequests);
        resolve(financeRequests);
      }
    });
  });
};

// Add a new item request
const addItemRequest = (itemRequestData) => {
  console.log("Adding item request with data ", itemRequestData);
  return new Promise((resolve, reject) => {
    const { title, body, link, tag, items } = itemRequestData;
    if (title && body && link && tag && items) {
      db.run(
        "INSERT INTO itemRequests (title, body, link, tag) VALUES (?, ?, ?, ?)",
        [title, body, link, tag],
        function(err) {
          if (err) {
            console.error('Error inserting itemRequest: ', err);
            reject(err);
          } else {
            console.log("adding items" + JSON.stringify(items) + " to request " + this.lastID);
            for (let item of items) {
              console.log("adding " + item.name + " (" + item.quantity + ")");
              db.run(
                "INSERT INTO items (requestId, name, quantity) VALUES (?, ?, ?)",
                [this.lastID, item.name, item.quantity],
                function(err) {
                  if (err) {
                    console.error('Error inserting item: ', err);
                    reject(err);
                  }
                }
              );
            }

            const addedRequestData = getItemRequest(this.lastID);
            resolve(addedRequestData);
          }
        }
      );
    } else {
      reject("Required field(s) not provided");
    }
  });
};

// Get an item request by id
const getItemRequest = (id) => {
  console.log('Getting item request with id ', id);
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM itemRequests WHERE id = ?', [id], (err, itemRequest) => {
      if (err) {
        console.error('Error getting item request by id:', err);
        reject(err);
      } else {
        console.log('Found item request:', itemRequest);
        resolve(itemRequest);
      }
    });
  });
};

// Get all item requests
const getAllItemRequests = () => {
  console.log('Getting all item requests');
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM itemRequests', (err, itemRequests) => {
      if (err) {
        console.error('Error getting all item requests:', err);
        reject(err);
      } else {
        console.log('Found item requests: ', itemRequests);
        resolve(itemRequests);
      }
    });
  });
};

// Get an item by id
const getItem = (id) => {
  console.log('Getting item with id ', id);
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM items WHERE id = ?', [id], (err, item) => {
      if (err) {
        console.error('Error getting item by id:', err);
        reject(err);
      } else {
        console.log('Found item:', item);
        resolve(item);
      }
    });
  });
};

// Get items by request id
const getItemsByRequest = (id) => {
  console.log('Getting items with request id ', id);
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM items WHERE requestId = ?', [id], (err, items) => {
      if (err) {
        console.error('Error getting items by request id:', err);
        reject(err);
      } else {
        console.log('Found items:', items);
        resolve(items);
      }
    });
  });
};

module.exports = {
  init,
  clean,
  addUser,
  getUser,
  getUserByUsername,
  getAllUsers,
  addTimeRequest,
  getTimeRequest,
  getAllTimeRequests,
  getTimeSlot,
  getTimeSlotsByRequest,
  addFinanceRequest,
  getFinanceRequest,
  getAllFinanceRequests,
  addItemRequest,
  getItemRequest,
  getAllItemRequests,
  getItem,
  getItemsByRequest
};