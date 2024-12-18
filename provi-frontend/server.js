const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware

// MongoDB Atlas connection
const mongoURI = 'mongodb+srv://loy6532:123456ht@cluster0.ag7c5.mongodb.net/userlogs?retryWrites=true&w=majority'; 
mongoose.connect(mongoURI);

const logSchema = new mongoose.Schema({
  activity: String,
  uiGroup: String,
  value: String,
  timestamp: String,
});

const Log = mongoose.model('Log', logSchema);

// API endpoint to receive logs
app.post('/api/log', async (req, res) => {
  console.log('Received request body:', req.body); // Log the request body
  const { activity, uiGroup, value, timestamp } = req.body;
  const log = new Log({ activity, uiGroup, value, timestamp });
  try {
    await log.save();
    res.status(201).send(log);
  } catch (error) {
    console.error('Error saving log:', error); // Log the error
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});