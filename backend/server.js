const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
app.use(cors());
app.use(express.json());

const DB_FILE = './db.json';

// Simple in-memory auth (like a hardcoded Excel lookup table)
const USERS = { admin: 'password123' };

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (USERS[username] === password) {
    res.json({ token: 'local-fake-token', username });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/tasks', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  res.json(data.tasks);
});

app.post('/tasks', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  const newTask = { id: Date.now().toString(), ...req.body, createdAt: new Date().toISOString() };
  data.tasks.push(newTask);
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  res.json(newTask);
});

app.listen(5000, () => console.log('Backend running on http://localhost:5000'));