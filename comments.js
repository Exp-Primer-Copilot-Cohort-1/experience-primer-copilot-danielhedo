// Create web server
// Load the express library
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Load the comments.json file
let comments = [];
fs.readFile('comments.json', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    comments = JSON.parse(data);
  }
});

// Serve files from the public directory
app.use(express.static('public'));

// Parse POST requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Listen for GET requests on the /comments path
app.get('/comments', (req, res) => {
  res.send(comments);
});

// Listen for POST requests on the /comments path
app.post('/comments', (req, res) => {
  const comment = req.body;
  comments.push(comment);
  fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
    if (err) {
      console.log(err);
    }
  });
  res.send('Comment added');
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
