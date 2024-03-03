const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname,'/public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'))

mongoose.connect('mongodb+srv://admin1:atlasadmin@cluster0.bxwjp6i.mongodb.net/resourceLibrary')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

const Resource = mongoose.model('Resource',{ category : String, author : String,title : String,description : String })
// Routes

app.get('/resources', (req, res) => {
  // Fetch resources from the database
  // Render a view displaying the list of resources
  res.render("resources/resources.ejs");
});

app.get('/', async (req, res) => {
  try {
      const resources = await Resource.find();
      res.render('resources/index', { resources });
  } catch (err) {
      res.status(500).send('Error fetching resources');
  }
});

app.get('/:id', async (req, res) => {
  try {
      const resource = await Resource.findById(req.params.id);
      if (!resource) return res.status(404).send('Resource not found');
      res.render('resources/show', { resource });
  } catch (err) {
      res.status(500).send('Error fetching resource');
  }
});
// Example route for user account management
app.get('/account', (req, res) => {
  // Display user account information
});

// Example route for managing user accounts
app.post('/account', (req, res) => {
  // Handle user account updates (e.g., profile information, password changes)
});

// Start the server
app.listen(3002, () => {
  console.log(`Server is running on port 3001`);
});
