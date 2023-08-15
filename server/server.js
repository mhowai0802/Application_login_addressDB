const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

const secretKey = '123456';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'joniwhfe',
  database: 'Testing'
});

app.post('/login', async(req, res) => {
  const { username, password } = req.body;
  const result = await getUserByUsername(username,password);
  if (!result) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  const token = generateToken(username);
  res.json({ token });
});

// Protected route
app.get('/dashboard', verifyToken, (req, res) => {
  const userId = req.userId;
  const user = users.find(user => user.id === userId);
  res.json({ message: `Welcome, ${user.username}! This is your dashboard.` });
});

function generateToken(user) {
  // Replace the following code with your actual token generation logic
  const token = jwt.sign({ id: user.id, username: user.username }, 'your_secret_key', { expiresIn: '1h' });
  return token;
}

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token missing.' });
  }
  // Verify the token
  jwt.verify(token, secretKey, (err, payload) => {
    if (err) {
      return res.status(401).json({ message: 'Access denied. Invalid token.' });
    }
    req.userId = payload.userId;
    next();
  });
}

async function getUserByUsername(username,password) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM login_system WHERE username = ? and password = ?', [username,password], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
}

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});