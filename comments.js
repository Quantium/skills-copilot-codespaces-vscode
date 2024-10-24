// Create web server
const express = require('express');
const app = express();
const port = 3000;

// Read file
const fs = require('fs');

// Parse JSON
app.use(express.json());

// Get comments
app.get('/comments', (req, res) => {
  fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('An error occurred');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// Post comments
app.post('/comments', (req, res) => {
  const newComment = req.body;
  fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('An error occurred');
    } else {
      const comments = JSON.parse(data);
      comments.push(newComment);
      fs.writeFile('comments.json', JSON.stringify(comments, null, 2), (err) => {
        if (err) {
          res.status(500).send('An error occurred');
        } else {
          res.status(201).send(newComment);
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});