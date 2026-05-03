 require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
const PORT = 3000;

// === MIDDLEWARE ===
app.use(cors()); 
app.use(express.json());

// === DATABASE CONNECTION ===
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB successfully!'))
  .catch((err) => console.log('❌ MongoDB connection error:', err));

// === ROUTES ===

// 1. Test Route
app.get('/api/test', (req, res) => {
  res.json({ message: "No more zombies, Karan bro!" }); 
});

// 2. Signup Route
app.post('/api/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered on your own DB!" });
  } catch (err) {
    res.status(400).json({ error: "Signup failed: " + err.message });
  }
});

// 3. Login Route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found. Please sign up!" });
    }
    if (password !== user.password) {
      return res.status(400).json({ error: "Incorrect password" });
    }
    res.json({ 
      user: { username: user.username, email: user.email }, 
      token: "secret_karan_token" 
    });
  } catch (err) {
    res.status(500).json({ error: "Server error during login" });
  }
});

// === TASK MODEL SETUP ===
const taskSchema = new mongoose.Schema({
  tasks: { type: String, required: true }
});
const Task = mongoose.model('Task', taskSchema);

// === TASK ROUTES ===

// 4. GET all tasks
app.get('/api/get', async (req, res) => {
  try {
    const allTasks = await Task.find();
    res.json(allTasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// 5. ADD a new task
app.post('/api/add', async (req, res) => {
  try {
    const newTask = await Task.create({ tasks: req.body.tasks });
    res.json(newTask); 
  } catch (err) {
    res.status(500).json({ error: "Failed to add task" });
  }
});

// 6. UPDATE a task
app.put('/api/update/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id, 
      { tasks: req.body.tasks }, 
      { new: true } 
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// 7. DELETE a task
app.delete('/api/delete/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task successfully deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

// === START SERVER ===
app.listen(PORT, () => {
  console.log(`🚀 Server is running live on http://localhost:${PORT}`);
});